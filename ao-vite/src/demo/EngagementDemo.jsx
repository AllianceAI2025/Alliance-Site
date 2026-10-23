import React, { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { capture, useVisualDwell } from "../analytics";
import DemoArtifact from "./DemoArtifacts.jsx";
import { contexts, resolveDemoSource, stories } from "./northstar.js";
import { activityAt, conversationAt, demoVisibleAt, followScrollTop, playbackFrameAt, playbackRate, textAt } from "./demoPlayback.js";
import "./engagement-demo.css";

function Icon({ name, ...props }) {
  const paths = { play: "m8 5 11 7-11 7Z", pause: "M8 5v14M16 5v14", close: "m6 6 12 12M18 6 6 18", arrow: "M12 19V5m-6 6 6-6 6 6", folder: "M3 7V5h6l2 2h10v12H3Zm0 3h18", chevron: "m9 6 6 6-6 6", menu: "M4 6h16M4 12h16M4 18h16" };
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d={paths[name]} /></svg>;
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return reduced;
}

function useConversationFollow(feed, elapsed, enabled, complete) {
  const current = useRef({ elapsed, enabled, complete });
  current.current = { elapsed, enabled, complete };
  const follow = () => {
    const element = feed.current;
    if (!element || !current.current.enabled) return;
    if (current.current.complete) {
      // Include the artifact footer and feed padding, beyond the last timed row.
      const top = followScrollTop({ complete: true, maxScrollTop: element.scrollHeight - element.clientHeight });
      element.scrollTo({ top, behavior: "smooth" });
      return;
    }
    // Explicit narrative timestamps follow the content actually being developed.
    // DOM order alone is misleading in columns and in reserved, still-empty slots.
    const target = [...element.querySelectorAll("[data-follow-at]")]
      .filter(node => Number(node.dataset.followAt) <= current.current.elapsed && node.textContent.trim())
      .sort((a, b) => Number(b.dataset.followAt) - Number(a.dataset.followAt))[0];
    if (!target) return;
    const bounds = element.getBoundingClientRect();
    const content = target.getBoundingClientRect();
    const top = followScrollTop({ scrollTop: element.scrollTop, viewportHeight: element.clientHeight, targetTop: content.top - bounds.top + element.scrollTop, targetBottom: content.bottom - bounds.top + element.scrollTop, maxScrollTop: element.scrollHeight - element.clientHeight });
    if (Math.abs(top - element.scrollTop) > 2) element.scrollTo({ top, behavior: "smooth" });
  };
  const followRef = useRef(follow);
  followRef.current = follow;
  const beat = Math.floor(elapsed / 160);
  useLayoutEffect(() => followRef.current(), [beat, enabled, complete]);
  useEffect(() => {
    const observer = new ResizeObserver(() => followRef.current());
    observer.observe(feed.current);
    observer.observe(feed.current.firstElementChild);
    return () => observer.disconnect();
  }, [feed]);
}

function ContextDialog({ source, onClose }) {
  const dialog = useRef(null);
  const id = useId();
  const context = contexts[source];
  useEffect(() => {
    const element = dialog.current;
    // Removing the element closes the native dialog. Keeping setup idempotent
    // avoids a queued cleanup close dismissing it during React's dev replay.
    if (!element.open) element.showModal();
  }, []);
  return <dialog ref={dialog} className="demo-context-dialog" aria-labelledby={`${id}-title`} onClose={onClose} onClick={event => { if (event.target === event.currentTarget) dialog.current.close(); }}>
    <div className="context-dialog-heading"><p>{context.label}</p><button aria-label="Close supporting context" onClick={() => dialog.current.close()}><Icon name="close" /></button></div>
    <h3 id={`${id}-title`}>{context.title}</h3><p className="context-reference">{context.reference}</p><p className="context-description">{context.text}</p>
    {context.access && <p className="context-access">{context.access.label}</p>}
    {context.facts && <dl className="context-facts">{context.facts.map(([label, text]) => <div key={label}><dt>{label}</dt><dd>{text}</dd></div>)}</dl>}
    {context.carry && <section className="context-carry"><h4>Carried into Northstar</h4>{context.carry.map(([label, text]) => <div key={label}><strong>{label}</strong><p>{text}</p></div>)}</section>}
    <footer>Illustrative engagement records · fictional client and practitioner data</footer>
  </dialog>;
}

export default function EngagementDemo({ phase = "scope", primary = false }) {
  const story = stories[phase];
  const reduced = useReducedMotion();
  const [elapsed, setElapsed] = useState(() => reduced ? story.duration : 0);
  const clockRef = useRef(elapsed / playbackRate);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tabVisible, setTabVisible] = useState(() => document.visibilityState !== "hidden");
  const [source, setSource] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [threadsOpen, setThreadsOpen] = useState(true);
  const [announcement, setAnnouncement] = useState("");
  const feed = useRef(null);
  const tracked = useRef(false);
  const completionTracked = useRef(false);
  const demoRef = useVisualDwell(`northstar-${phase}`);
  const id = useId();
  const conversation = conversationAt(story, elapsed);
  const complete = elapsed >= story.duration;
  useConversationFollow(feed, elapsed, (playing || complete) && visible && tabVisible && !reduced, complete);

  const updateClock = (value) => { clockRef.current = value / playbackRate; setElapsed(value); };
  const pause = () => setPlaying(false);
  const resume = () => setPlaying(!reduced && clockRef.current < story.duration / playbackRate);
  const inspect = (key) => {
    const contextKey = resolveDemoSource(phase, key);
    if (!contextKey) return;
    pause(); setSidebarOpen(false); setSource(contextKey); capture("demo_source_opened", { phase, source: contextKey });
  };

  useEffect(() => {
    let inView = false, arrival;
    const observer = new IntersectionObserver(([entry]) => {
      const next = entry.isIntersecting && demoVisibleAt(inView, {
        visibleHeight: entry.intersectionRect.height,
        windowHeight: entry.boundingClientRect.height,
        viewportHeight: entry.rootBounds?.height ?? window.innerHeight,
      });
      if (next === inView) return;
      inView = next;
      clearTimeout(arrival);
      // Let an anchor scroll settle before typing the opening request.
      if (next) arrival = setTimeout(() => setVisible(true), 200);
      else setVisible(false);
    }, { threshold: Array.from({ length: 21 }, (_, index) => index / 20), rootMargin: "-70px 0px -5% 0px" });
    observer.observe(demoRef.current);
    const onVisibility = () => setTabVisible(document.visibilityState !== "hidden");
    document.addEventListener("visibilitychange", onVisibility);
    return () => { clearTimeout(arrival); observer.disconnect(); document.removeEventListener("visibilitychange", onVisibility); };
  }, [demoRef]);

  useLayoutEffect(() => {
    // Every visit is a new viewing session, including returning after a pause.
    // Reset before painting so a previous artifact never flashes on arrival.
    updateClock(reduced ? story.duration : 0);
    setPlaying(visible && !reduced);
    setAnnouncement("");
    if (feed.current) feed.current.scrollTo({ top: 0, behavior: "instant" });
  }, [visible, reduced, story.duration]);

  useEffect(() => {
    if (!playing || !visible || !tabVisible || reduced) return;
    if (!tracked.current) { capture("demo_played", { phase, trigger: "autoplay" }); tracked.current = true; }
    let frame, paintedAt = 0;
    const start = performance.now() - clockRef.current;
    const tick = (now) => {
      clockRef.current = Math.min(now - start, story.duration / playbackRate);
      const next = playbackFrameAt(clockRef.current, story.duration);
      if (next.complete && !completionTracked.current) {
        completionTracked.current = true;
        setAnnouncement(story.summary);
        capture("demo_completed", { phase });
      }
      if (next.complete) {
        setElapsed(story.duration);
        setPlaying(false);
        return;
      }
      if (now - paintedAt >= 30) { setElapsed(next.elapsed); paintedAt = now; }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing, visible, tabVisible, reduced, story.duration, story.summary, phase]);

  const toggle = () => {
    if (playing) { pause(); setAnnouncement(`${story.label} demonstration paused.`); }
    else resume();
  };

  return <div className={`engagement-demo engagement-demo--${phase}${primary ? " engagement-demo--primary" : ""}`} ref={demoRef} id={primary ? "demo" : `${phase}-demo`} data-phase={phase} data-elapsed={Math.round(elapsed)} data-complete={complete}>
    <section className="demo-stage" aria-label={`${story.label} demonstration`}>
      <div className={`demo-window demo-window--with-sidebar${sidebarOpen ? " demo-window--navigation-open" : ""}`}>
        <>
          {sidebarOpen && <button className="demo-sidebar-scrim" aria-label="Close engagement navigation" onClick={() => setSidebarOpen(false)} />}
          <aside className="demo-sidebar" id={`${id}-sidebar`} aria-label="Demo engagements">
            <div className="demo-sidebar-brand"><img src="/brand/logo-mark-dark.svg" alt="" /><span>AllianceOne</span><button className="demo-sidebar-close" aria-label="Close engagement sidebar" onClick={() => setSidebarOpen(false)}><Icon name="close" /></button></div>
            <p className="demo-sidebar-label">Engagements</p>
            <div className="demo-northstar-row"><button className="demo-engagement-name" onClick={() => inspect("discovery")}><Icon name="folder" />Northstar Foods</button><button className="demo-thread-toggle" aria-label="Toggle Northstar Foods threads" aria-expanded={threadsOpen} aria-controls={`${id}-threads`} onClick={() => setThreadsOpen(!threadsOpen)}><Icon name="chevron" className={threadsOpen ? "is-expanded" : ""} /></button></div>
            {threadsOpen && <nav className="demo-thread-list" id={`${id}-threads`} aria-label="Northstar Foods threads">{Object.entries(stories).filter(([key]) => !story.threads || story.threads.includes(key)).map(([key, item]) => <a key={key} href={`#${key}`} aria-current={key === phase ? "page" : undefined} onClick={() => setSidebarOpen(false)}>{item.thread}</a>)}</nav>}
            {phase !== "deliver" && <><button className="demo-engagement-reference" onClick={() => inspect("harbor")}><Icon name="folder" />Harbor Grain</button><button className="demo-engagement-reference" onClick={() => inspect("meridian")}><Icon name="folder" />Meridian</button></>}
            <div className="demo-profile"><span>{phase === "deliver" ? "AR" : "MW"}</span><div>{story.person}<small>{phase === "deliver" ? "Consultant" : "Engagement manager"}</small></div></div>
          </aside>
        </>
        <div className="demo-main">
          <header className="demo-player-header"><div><button className="demo-sidebar-toggle" aria-label="Toggle engagement sidebar" aria-controls={`${id}-sidebar`} aria-expanded={sidebarOpen} onClick={() => setSidebarOpen(!sidebarOpen)}><Icon name="menu" /></button><strong>Northstar Foods</strong><span>{story.thread}{phase === "deliver" ? " · Avery Ross" : ""}</span></div>{!reduced && !complete && <div className="demo-controls"><button onClick={toggle} aria-label={`${playing ? "Pause" : "Play"} ${story.label} demo`} title={playing ? "Pause animation" : "Resume animation"}><Icon name={playing ? "pause" : "play"} /></button></div>}</header>
          <div className="demo-feed" ref={feed} role="log" aria-label={`${story.label} conversation`} aria-live="off">
            <div className="demo-conversation">
              {conversation.exchanges.map(exchange => <div className="demo-exchange" key={exchange.key} data-exchange={exchange.key}>
                <div className="demo-user-message" data-follow-at={exchange.sentAt}>{exchange.prompt}</div><div className="demo-agent-response"><div className="demo-agent-name"><img src="/brand/logo-mark.svg" alt="" />AllianceOne</div><p data-follow-at={exchange.answerAt}>{textAt(exchange.answer, elapsed, exchange.answerAt, exchange.answerDuration || 1100) || <span className="demo-working"><i className="build-pulse" />{activityAt(story, elapsed)}</span>}</p></div>
                {exchange.sources && elapsed >= exchange.answerAt + exchange.answerDuration && <div className="demo-response-sources" data-follow-at={exchange.answerAt + exchange.answerDuration}>{exchange.sources.map(item => <button key={item.key} onClick={() => inspect(item.key)}>{item.label} <span aria-hidden="true">↗</span></button>)}</div>}
                {exchange.artifact && elapsed >= exchange.artifactAt && <div className="demo-artifact-container"><DemoArtifact type={exchange.artifact} elapsed={exchange.artifactElapsed} onInspect={inspect} /></div>}
              </div>)}
            </div>
          </div>
          <div className={`demo-composer${conversation.typing ? " is-typing" : ""}`}><span>{conversation.composer}{conversation.typing && <i className="demo-typing-cursor" />}</span><Icon name="arrow" /></div>
        </div>
      </div>
    </section>
    {source && <ContextDialog source={source} onClose={() => { setSource(null); resume(); }} />}
    <div className="demo-sr-only" role="status" aria-live="polite">{announcement}</div>
  </div>;
}
