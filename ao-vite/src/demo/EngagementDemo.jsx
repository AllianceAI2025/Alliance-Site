import React, { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { capture, useVisualDwell } from "../analytics";
import DemoArtifact from "./LegalDemoArtifacts.jsx";
import { legalContexts as contexts, resolveLegalSource as resolveDemoSource, legalStories as stories, priorMatters } from "./litigation.js";
import { activityAt, advanceScrollTop, conversationAt, demoPlaybackReadyAt, demoVisibleAt, followScrollTop, playbackFrameAt, playbackRate, textAt } from "./demoPlayback.js";
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

function usePlaybackWatchability(demoRef, feed, requiresComposer) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let frame = null, active = true;
    const measure = () => {
      frame = null;
      if (!active) return;
      const composer = demoRef.current.querySelector(".demo-composer");
      const viewport = window.visualViewport;
      setReady(current => demoPlaybackReadyAt(current, {
        top: feed.current.getBoundingClientRect().top,
        // A response-only opening can play when the full reading pane fits.
        // Later scenes wait for the composer too, so typed instructions are seen.
        bottom: (requiresComposer ? composer : feed.current).getBoundingClientRect().bottom,
        viewportTop: viewport?.offsetTop ?? 0,
        viewportHeight: viewport?.height ?? window.innerHeight,
      }));
    };
    const schedule = () => { if (active && frame === null) frame = requestAnimationFrame(measure); };
    const observer = new ResizeObserver(schedule);
    for (const node of [demoRef.current, demoRef.current.parentElement.parentElement, feed.current, demoRef.current.querySelector(".demo-composer")]) observer.observe(node);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const viewport = window.visualViewport;
    viewport?.addEventListener("resize", schedule);
    viewport?.addEventListener("scroll", schedule);
    document.fonts.ready.then(schedule);
    measure();
    return () => {
      active = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      viewport?.removeEventListener("resize", schedule);
      viewport?.removeEventListener("scroll", schedule);
    };
  }, [demoRef, feed, requiresComposer]);
  return ready;
}

function useConversationFollow(feed, elapsed, enabled, complete) {
  const current = useRef({ elapsed, enabled, complete });
  current.current = { elapsed, enabled, complete };
  const motion = useRef({ frame: null, goal: 0, at: 0, target: null });
  const stop = () => {
    cancelAnimationFrame(motion.current.frame);
    Object.assign(motion.current, { frame: null, goal: feed.current?.scrollTop || 0, at: 0, target: null });
  };
  const animate = (now) => {
    const element = feed.current;
    const state = motion.current;
    if (!element || !current.current.enabled) { stop(); return; }
    const goal = Math.max(0, Math.min(state.goal, element.scrollHeight - element.clientHeight));
    const top = advanceScrollTop(element.scrollTop, goal, state.at ? now - state.at : 16);
    state.at = now;
    element.scrollTo({ top, behavior: "instant" });
    if (Math.abs(element.scrollTop - goal) <= 1) {
      element.scrollTo({ top: goal, behavior: "instant" });
      state.frame = null;
      state.at = 0;
    } else state.frame = requestAnimationFrame(animate);
  };
  const moveTo = (top) => {
    const state = motion.current;
    state.goal = top;
    if (state.frame === null && Math.abs(feed.current.scrollTop - top) > .5) state.frame = requestAnimationFrame(animate);
  };
  const follow = () => {
    const element = feed.current;
    if (!element || !current.current.enabled) return;
    if (current.current.complete) {
      moveTo(followScrollTop({ complete: true, maxScrollTop: element.scrollHeight - element.clientHeight }));
      return;
    }
    // Past exchanges and their frozen artifacts cannot reclaim the scroll.
    const exchange = element.querySelector(".demo-conversation > .demo-exchange:last-child");
    let target = null, latestAt = -Infinity;
    for (const node of exchange?.querySelectorAll("[data-follow-at]") || []) {
      const at = Number(node.dataset.followAt);
      if (at <= current.current.elapsed && at >= latestAt && node.textContent.trim()) { target = node; latestAt = at; }
    }
    if (!target) return;
    const bounds = element.getBoundingClientRect();
    const content = target.getBoundingClientRect();
    // An artifact's first frame reveals its opening, rather than all its reserved
    // document space. Subsequent timestamps follow the actual text/rows growing.
    const height = target.dataset.followKind === "entry" ? Math.min(content.height, element.clientHeight * .45) : content.height;
    const state = motion.current;
    const top = followScrollTop({ scrollTop: state.frame === null ? element.scrollTop : state.goal, viewportHeight: element.clientHeight, targetTop: content.top - bounds.top + element.scrollTop, targetBottom: content.top - bounds.top + element.scrollTop + height, maxScrollTop: element.scrollHeight - element.clientHeight, newTarget: target !== state.target });
    state.target = target;
    moveTo(top);
  };
  const followRef = useRef(follow);
  followRef.current = follow;
  useLayoutEffect(() => followRef.current(), [elapsed, enabled, complete]);
  useEffect(() => {
    if (enabled) followRef.current();
    else stop();
    return stop;
  }, [enabled]);
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
    <footer>Fictional matter records and people · not legal authorities or actual client work</footer>
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
  const watchable = usePlaybackWatchability(demoRef, feed, story.commands.length > 0);
  const id = useId();
  const conversation = conversationAt(story, elapsed);
  const complete = elapsed >= story.duration;
  useConversationFollow(feed, elapsed, (playing || complete) && visible && watchable && tabVisible && !reduced, complete);

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
    if (!playing || !visible || !watchable || !tabVisible || reduced) return;
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
  }, [playing, visible, watchable, tabVisible, reduced, story.duration, story.summary, phase]);

  const toggle = () => {
    if (playing) { pause(); setAnnouncement(`${story.label} demonstration paused.`); }
    else resume();
  };

  return <div className={`engagement-demo engagement-demo--${phase}${primary ? " engagement-demo--primary" : ""}`} ref={demoRef} id={primary ? "demo" : `${phase}-demo`} data-phase={phase} data-attorney={story.actor} data-elapsed={Math.round(elapsed)} data-complete={complete} data-watchable={watchable}>
    <section className="demo-stage" aria-label={`${story.label} demonstration`}>
      <div className={`demo-window demo-window--with-sidebar${sidebarOpen ? " demo-window--navigation-open" : ""}`}>
        <>
          {sidebarOpen && <button className="demo-sidebar-scrim" aria-label="Close matter navigation" onClick={() => setSidebarOpen(false)} />}
          <aside className="demo-sidebar" id={`${id}-sidebar`} aria-label="Demo matters">
            <div className="demo-sidebar-brand"><img src="/brand/logo-mark.svg" alt="" /><span>AllianceOne</span><button className="demo-sidebar-close" aria-label="Close matter sidebar" onClick={() => setSidebarOpen(false)}><Icon name="close" /></button></div>
            <p className="demo-sidebar-label">Matters</p>
            <div className="demo-northstar-row"><button className="demo-engagement-name" onClick={() => inspect("discovery")}><Icon name="folder" />Northstar Foods</button><button className="demo-thread-toggle" aria-label="Toggle Northstar Foods threads" aria-expanded={threadsOpen} aria-controls={`${id}-threads`} onClick={() => setThreadsOpen(!threadsOpen)}><Icon name="chevron" className={threadsOpen ? "is-expanded" : ""} /></button></div>
            {threadsOpen && <nav className="demo-thread-list" id={`${id}-threads`} aria-label="Northstar Foods threads">{Object.entries(stories).filter(([key]) => !story.threads || story.threads.includes(key)).map(([key, item]) => <a key={key} href={`#${key}`} aria-current={key === phase ? "page" : undefined} onClick={() => setSidebarOpen(false)}>{item.thread}</a>)}</nav>}
            {phase !== "deliver" && priorMatters.map(matter => <button key={matter.id} className="demo-engagement-reference" onClick={() => inspect(matter.id)}><Icon name="folder" />{matter.client}</button>)}
          </aside>
        </>
        <div className="demo-main">
          <header className="demo-player-header"><div><button className="demo-sidebar-toggle" aria-label="Toggle matter sidebar" aria-controls={`${id}-sidebar`} aria-expanded={sidebarOpen} onClick={() => setSidebarOpen(!sidebarOpen)}><Icon name="menu" /></button><strong>Northstar Foods</strong><span>{story.thread}</span></div>{!reduced && !complete && <div className="demo-controls"><button onClick={toggle} aria-label={`${playing ? "Pause" : "Play"} ${story.label} demo`} title={playing ? "Pause animation" : "Resume animation"}><Icon name={playing ? "pause" : "play"} /></button></div>}</header>
          <div className="demo-feed" ref={feed} role="log" aria-label={`${story.label} conversation`} aria-live="off">
            <div className="demo-conversation">
              {conversation.exchanges.map(exchange => <div className="demo-exchange" key={exchange.key} data-exchange={exchange.key} data-exchange-kind={exchange.kind || "conversation"}>
                {exchange.prompt && <div className="demo-user-message" aria-label={`${story.actor}: ${exchange.prompt}`} data-follow-at={exchange.sentAt}>{exchange.prompt}</div>}{elapsed >= exchange.answerAt && <div className="demo-agent-response"><div className="demo-agent-name"><img src="/brand/logo-mark.svg" alt="" />{exchange.agent || "AllianceOne"}{exchange.label && <small className="demo-agent-context">{exchange.label}</small>}</div><p data-follow-at={exchange.answerAt}>{textAt(exchange.answer, elapsed, exchange.answerAt, exchange.answerDuration || 1100) || <span className="demo-working"><i className="build-pulse" />{activityAt(story, elapsed)}</span>}</p></div>}
                {exchange.sources && elapsed >= exchange.answerAt + exchange.answerDuration && <div className="demo-response-sources" data-follow-at={exchange.answerAt + exchange.answerDuration}>{exchange.sources.map(item => <button key={item.key} onClick={() => inspect(item.key)}>{item.label} <span aria-hidden="true">↗</span></button>)}</div>}
                {exchange.artifact && elapsed >= exchange.artifactAt && <div className="demo-artifact-container" data-follow-at={exchange.artifactAt} data-follow-kind="entry"><DemoArtifact type={exchange.artifact} elapsed={exchange.artifactElapsed} onInspect={inspect} /></div>}
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
