import React, { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { capture, useVisualDwell } from "../analytics";
import DemoArtifact from "./DemoArtifacts.jsx";
import { contexts, stories } from "./northstar.js";
import { activityAt, commonTiming, deliveryStateAt, deliveryTiming, loopFrameAt, planTiming, playbackRate, textAt } from "./demoPlayback.js";
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
  const [playing, setPlaying] = useState(!reduced);
  const [visible, setVisible] = useState(false);
  const [tabVisible, setTabVisible] = useState(() => document.visibilityState !== "hidden");
  const [epoch, setEpoch] = useState(0);
  const [source, setSource] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [threadsOpen, setThreadsOpen] = useState(true);
  const [announcement, setAnnouncement] = useState("");
  const feed = useRef(null);
  const autoFollow = useRef(true);
  const tracked = useRef(false);
  const completionTracked = useRef(false);
  const demoRef = useVisualDwell(`northstar-${phase}`);
  const id = useId();
  const promptSent = elapsed >= commonTiming.promptEnd;
  const artifactVisible = elapsed >= commonTiming.artifactAt;
  const buildBeat = Math.floor(elapsed / 600);
  const workflowBeat = Object.values(phase === "deliver" ? deliveryTiming : phase === "plan" ? planTiming : {}).filter(at => elapsed >= at).length;

  const updateClock = (value) => { clockRef.current = value / playbackRate; setElapsed(value); };
  const pause = () => { setPlaying(false); autoFollow.current = false; };
  const resume = () => { autoFollow.current = true; setPlaying(!reduced); };
  const inspect = (key) => { pause(); setSidebarOpen(false); setSource(key); capture("demo_source_opened", { phase, source: key }); };

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting && entry.intersectionRatio >= .18), { threshold: .18, rootMargin: "-70px 0px -5% 0px" });
    observer.observe(demoRef.current);
    const onVisibility = () => setTabVisible(document.visibilityState !== "hidden");
    document.addEventListener("visibilitychange", onVisibility);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", onVisibility); };
  }, [demoRef]);

  useEffect(() => {
    updateClock(reduced ? story.duration : 0);
    setPlaying(!reduced);
  }, [reduced, story.duration]);

  useEffect(() => {
    if (!playing || !visible || !tabVisible || reduced) return;
    if (!tracked.current) { capture("demo_played", { phase, trigger: "autoplay" }); tracked.current = true; }
    let frame, paintedAt = 0;
    const start = performance.now() - clockRef.current;
    let cycle = loopFrameAt(clockRef.current, story.duration).cycle;
    const tick = (now) => {
      clockRef.current = now - start;
      const next = loopFrameAt(clockRef.current, story.duration);
      if (next.cycle !== cycle) {
        cycle = next.cycle;
        autoFollow.current = true;
        if (feed.current) feed.current.scrollTop = 0;
      }
      if (next.elapsed >= story.duration && !completionTracked.current) {
        completionTracked.current = true;
        setAnnouncement(story.summary);
        capture("demo_completed", { phase });
      }
      if (now - paintedAt >= 30) { setElapsed(next.elapsed); paintedAt = now; }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing, visible, tabVisible, reduced, story.duration, story.summary, phase, epoch]);

  useLayoutEffect(() => {
    if (!autoFollow.current || !feed.current || !artifactVisible) return;
    const element = feed.current;
    const built = [...element.querySelectorAll(".build-slot")].filter(node => node.dataset.built !== "false" && node.textContent.trim());
    const target = built[built.length - 1] || element.querySelector(".artifact-head");
    if (!target) return;
    const excess = target.getBoundingClientRect().bottom - element.getBoundingClientRect().bottom + 20;
    if (excess > 0) element.scrollBy({ top: excess, behavior: reduced ? "instant" : "smooth" });
  }, [artifactVisible, buildBeat, workflowBeat, reduced]);

  const toggle = () => {
    if (playing) { pause(); setAnnouncement(`${story.label} demonstration paused.`); }
    else resume();
  };
  const submitPlan = () => {
    autoFollow.current = true; updateClock(planTiming.approved); setPlaying(true); setEpoch(value => value + 1);
    capture("demo_plan_submitted", { phase, actor: "Margaret Whitfield", destination: "Dynamics 365 Project Operations", illustrative: true });
  };
  const deliveryAction = (action) => {
    const state = deliveryStateAt(elapsed);
    const allowed = action === "send" ? state.draftReady && !state.sentForReview : action === "revise" ? state.feedbackReceived && !state.revising : action === "export" && state.approved;
    if (!allowed) return;
    if (action === "export" && state.exportReady) { resume(); return; }
    const at = { send: deliveryTiming.sentForReview, revise: deliveryTiming.revising, export: deliveryTiming.exportStarted }[action];
    autoFollow.current = true; updateClock(at); setPlaying(!reduced); setEpoch(value => value + 1);
    capture(`demo_assessment_${action}`, { phase, actor: "Avery Ross", reviewer: "Sofia Patel", illustrative: true });
  };

  return <div className={`engagement-demo engagement-demo--${phase}${primary ? " engagement-demo--primary" : ""}`} ref={demoRef} id={primary ? "demo" : `${phase}-demo`} data-phase={phase} data-elapsed={Math.round(elapsed)}>
    <section className="demo-stage" aria-label={`${story.label} demonstration`}>
      <div className={`demo-window${primary ? " demo-window--with-sidebar" : ""}${sidebarOpen ? " demo-window--navigation-open" : ""}`}>
        {primary && <>
          {sidebarOpen && <button className="demo-sidebar-scrim" aria-label="Close engagement navigation" onClick={() => setSidebarOpen(false)} />}
          <aside className="demo-sidebar" id={`${id}-sidebar`} aria-label="Demo engagements">
            <div className="demo-sidebar-brand"><img src="/brand/logo-mark-dark.svg" alt="" /><span>AllianceOne</span><button className="demo-sidebar-close" aria-label="Close engagement sidebar" onClick={() => setSidebarOpen(false)}><Icon name="close" /></button></div>
            <p className="demo-sidebar-label">Engagements</p>
            <div className="demo-northstar-row"><button className="demo-engagement-name" onClick={() => inspect("discovery")}><Icon name="folder" />Northstar Foods</button><button className="demo-thread-toggle" aria-label="Toggle Northstar Foods threads" aria-expanded={threadsOpen} aria-controls={`${id}-threads`} onClick={() => setThreadsOpen(!threadsOpen)}><Icon name="chevron" className={threadsOpen ? "is-expanded" : ""} /></button></div>
            {threadsOpen && <nav className="demo-thread-list" id={`${id}-threads`} aria-label="Northstar Foods threads">{Object.entries(stories).map(([key, item]) => <a key={key} href={`#${key}`} aria-current={key === phase ? "page" : undefined} onClick={() => setSidebarOpen(false)}>{item.thread}</a>)}</nav>}
            <button className="demo-engagement-reference" onClick={() => inspect("harbor")}><Icon name="folder" />Harbor Grain</button><button className="demo-engagement-reference" onClick={() => inspect("meridian")}><Icon name="folder" />Meridian</button>
            <div className="demo-profile"><span>MW</span><div>Margaret Whitfield<small>Engagement manager</small></div></div>
          </aside>
        </>}
        <div className="demo-main">
          <header className="demo-player-header"><div>{primary && <button className="demo-sidebar-toggle" aria-label="Toggle engagement sidebar" aria-controls={`${id}-sidebar`} aria-expanded={sidebarOpen} onClick={() => setSidebarOpen(!sidebarOpen)}><Icon name="menu" /></button>}<strong>Northstar Foods</strong><span>{story.thread}{phase === "deliver" ? " · Avery Ross" : ""}</span></div>{!reduced && <div className="demo-controls"><button onClick={toggle} aria-label={`${playing ? "Pause" : "Play"} ${story.label} demo`} title={playing ? "Pause animation" : "Resume animation"}><Icon name={playing ? "pause" : "play"} /></button></div>}</header>
          <div className="demo-feed" ref={feed} role="log" aria-label={`${story.label} conversation`} aria-live="off" onWheel={pause} onTouchStart={pause}>
            <div className="demo-conversation">
              {promptSent && <div className="demo-exchange"><div className="demo-user-message">{story.prompt}</div><div className="demo-agent-response"><div className="demo-agent-name"><img src="/brand/logo-mark.svg" alt="" />AllianceOne</div><p>{textAt(story.answer, elapsed, commonTiming.answerAt, 1100) || <span className="demo-working"><i className="build-pulse" />{activityAt(story, elapsed)}</span>}</p></div>
                {artifactVisible && <div className="demo-artifact-container" onPointerDown={pause} onFocusCapture={pause}><DemoArtifact phase={phase} elapsed={elapsed} onInspect={inspect} onSubmit={submitPlan} onDeliveryAction={deliveryAction} /></div>}
              </div>}
            </div>
          </div>
          <div className="demo-composer"><span>{!promptSent ? textAt(story.prompt, elapsed, 0, commonTiming.promptEnd) : "Ask AllianceOne…"}{!promptSent && <i className="demo-typing-cursor" />}</span><Icon name="arrow" /></div>
        </div>
      </div>
    </section>
    {source && <ContextDialog source={source} onClose={() => { setSource(null); resume(); }} />}
    <div className="demo-sr-only" role="status" aria-live="polite">{announcement}</div>
  </div>;
}
