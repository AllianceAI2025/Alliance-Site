import React, { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import { capture, useVisualDwell } from "../analytics";
import DemoArtifact from "./DemoArtifacts.jsx";
import { chapters, scenes, engagementReferences, presentations } from "./northstar.js";
import "./engagement-demo.css";

export function DemoIcon({ name, ...props }) {
  const paths = { play: "m8 5 11 7-11 7Z", pause: "M8 5v14M16 5v14", replay: "M3 10a9 9 0 1 1 2 9M3 4v6h6", next: "M5 12h14m-6-6 6 6-6 6", close: "m6 6 12 12M18 6 6 18", document: "M14 3H5v18h14V8Zm0 0v5h5M8 12h8M8 16h8", arrow: "M12 19V5m-6 6 6-6 6 6", folder: "M3 7V5h6l2 2h10v12H3Zm0 3h18", chevron: "m9 6 6 6-6 6", menu: "M4 6h16M4 12h16M4 18h16" };
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d={paths[name] || paths.document} /></svg>;
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

const artifactNames = { scope: "Engagement scope", pricing: "Staffing and pricing basis", proposal: "Engagement proposal", accepted: "Accepted proposal v5", plan: "Working engagement plan", approved: "Reviewed plan v1", handoff: "Application records", assessment: "Data-readiness assessment", "assessment-draft": "Assessment and evidence workbook", "assessment-reviewed": "Revised assessment and review" };
const threadNames = { scope: "Understanding the engagement", plan: "Engagement planning and staffing", deliver: "Data-readiness assessment" };
function timing(scene, reduced) {
  const promptEnd = reduced ? 0 : Math.max(1100, scene.prompt.length * 17);
  const activityEnd = promptEnd + (reduced ? 0 : scene.activity.length * 700);
  const answerEnd = activityEnd + (reduced ? 0 : scene.answer.join("\n\n").length * 9);
  return { promptEnd, activityEnd, answerEnd, duration: answerEnd + (reduced ? 6500 : 5500) };
}

function ConversationTurn({ scene, answer, complete, preparing, activityProgress, onSource, onArtifact, onPause }) {
  return <div className="demo-turn">
    {scene.signal && <p className="demo-signal">{scene.signal}</p>}
    <div className="demo-user-message">{scene.prompt}</div>
    <div className="demo-agent-message"><div className="demo-agent-name"><img src="/brand/logo-mark.svg" alt="" />AllianceOne</div>
      {preparing && <div className="demo-agent-working" role="status"><span className="demo-working-dot" />{scene.activity[Math.min(activityProgress, scene.activity.length - 1)]}</div>}
      {answer && <div className="demo-response">{answer.split("\n\n").map((paragraph, i) => <p key={i}>{paragraph}</p>)}</div>}
      {complete && <><div className="demo-source-links">{scene.sources.map(source => <button key={source.label} onClick={() => onSource(source)}>{source.label}</button>)}</div>
        {scene.artifact && <button className="demo-artifact-reference" onClick={() => onArtifact(scene.artifact)}><DemoIcon name="document" />{artifactNames[scene.artifact]}<span aria-hidden="true">↗</span></button>}
        <details className="demo-activity-detail" onToggle={event => { if (event.currentTarget.open) onPause(); }}><summary>Agent activity</summary><ol>{scene.activity.map(activity => <li key={activity}>{activity}</li>)}</ol></details></>}
    </div>
  </div>;
}

export default function EngagementDemo({ presentation = "opening" }) {
  const examples = presentations[presentation];
  const sequence = useMemo(() => examples.map(example => ({ ...scenes.find(scene => scene.id === example.id), ...example })), [examples]);
  const compact = presentation !== "opening";
  const instanceId = useId();
  const [cursor, setCursor] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [visible, setVisible] = useState(false);
  const [tabVisible, setTabVisible] = useState(() => document.visibilityState !== "hidden");
  const [playbackEpoch, setPlaybackEpoch] = useState(0);
  const [northstarExpanded, setNorthstarExpanded] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedSource, setSelectedSource] = useState(null);
  const [manualArtifact, setManualArtifact] = useState(null);
  const [artifactHidden, setArtifactHidden] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const reduced = useReducedMotion();
  const log = useRef(null);
  const autoplayTracked = useRef(false);
  const demoRef = useVisualDwell(`northstar-${presentation}`);
  const scene = sequence[cursor];
  const times = timing(scene, reduced);
  const promptSent = elapsed >= times.promptEnd;
  const answerStarted = elapsed >= times.activityEnd;
  const complete = elapsed >= times.answerEnd;
  const answer = scene.answer.join("\n\n");
  const response = complete ? answer : answerStarted ? answer.slice(0, Math.floor((elapsed - times.activityEnd) / 9)) : "";
  const activityProgress = complete ? scene.activity.length : Math.max(0, Math.floor((elapsed - times.promptEnd) / 700));
  const artifact = manualArtifact || (scene.artifact && (answerStarted || (scene.artifact === "handoff" && promptSent)) ? scene.artifact : null);
  const showPane = Boolean(selectedSource || (artifact && !artifactHidden));
  const atEnd = cursor === sequence.length - 1 && complete;

  useEffect(() => {
    const node = demoRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting && entry.intersectionRatio >= .2), { threshold: .2, rootMargin: "-78px 0px -6% 0px" });
    observer.observe(node);
    const onVisibility = () => setTabVisible(document.visibilityState !== "hidden");
    document.addEventListener("visibilitychange", onVisibility);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", onVisibility); };
  }, [demoRef]);

  useEffect(() => {
    if (!playing || !visible || !tabVisible || autoplayTracked.current) return;
    autoplayTracked.current = true;
    capture("demo_played", { scene: scene.id, presentation, trigger: "autoplay" });
  }, [playing, visible, tabVisible, scene.id, presentation]);

  useEffect(() => {
    setSelectedSource(null); setManualArtifact(null); setArtifactHidden(false);
  }, [cursor]);

  useEffect(() => {
    if (!playing || !visible || !tabVisible) return;
    let frame;
    const start = performance.now() - (Number.isFinite(elapsed) ? elapsed : 0);
    const tick = (now) => {
      const next = now - start;
      if (next >= times.duration) {
        setAnnouncement(`${scene.label}: ${scene.prompt}`);
        if (cursor === sequence.length - 1) { setElapsed(Infinity); setPlaying(false); capture("demo_completed", { presentation }); }
        else { setCursor(cursor + 1); setElapsed(0); }
        return;
      }
      setElapsed(next);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // Capture elapsed at start/resume so visibility changes preserve the current exchange.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, visible, tabVisible, cursor, reduced, playbackEpoch]);

  useLayoutEffect(() => { if (log.current) log.current.scrollTop = 0; }, [cursor, showPane]);

  const seek = (index) => {
    const bounded = Math.max(0, Math.min(sequence.length - 1, index));
    setPlaying(false); setCursor(bounded); setElapsed(Infinity); setSidebarOpen(false);
    setAnnouncement(`${sequence[bounded].label}: ${sequence[bounded].prompt}`);
    capture("demo_scene_selected", { scene: sequence[bounded].id, presentation });
  };
  const replay = () => {
    setCursor(0); setElapsed(0); setPlaying(true); setSidebarOpen(false);
    setPlaybackEpoch(epoch => epoch + 1);
    setSelectedSource(null); setManualArtifact(null); setArtifactHidden(false);
    capture("demo_played", { scene: sequence[0].id, presentation, trigger: "replay" });
  };
  const play = () => {
    if (playing) { setPlaying(false); return; }
    if (complete) { if (atEnd) { replay(); return; } setCursor(cursor + 1); setElapsed(0); }
    setPlaying(true); capture("demo_played", { scene: scene.id, presentation });
  };
  const openSource = (source) => { setPlaying(false); setSidebarOpen(false); setSelectedSource(source); };
  const openArtifact = (kind) => { setPlaying(false); setSelectedSource(null); setManualArtifact(kind); setArtifactHidden(false); };
  return <div className={`engagement-demo${compact ? " engagement-demo--feature" : ""}`} ref={demoRef} id={compact ? undefined : "demo"} data-presentation={presentation} data-scene={scene.id}>
    <section className="demo-player" aria-label={`Northstar Foods ${compact ? presentation : "opening"} demonstration`}>
      <div className={`demo-app${sidebarOpen ? " demo-app--navigation-open" : ""}`} onKeyDown={event => { if (event.key === "Escape") setSidebarOpen(false); }}>
        {!compact && <>
          {sidebarOpen && <button className="demo-nav-scrim" aria-label="Close engagement navigation" onClick={() => setSidebarOpen(false)} />}
          <aside className="demo-sidebar" id={`${instanceId}-sidebar`} aria-label="Demo engagements">
            <div className="demo-sidebar-brand"><img src="/brand/logo-mark.svg" alt="" /><span>AllianceOne</span><button className="demo-sidebar-close" aria-label="Close engagement sidebar" onClick={() => setSidebarOpen(false)}><DemoIcon name="close" /></button></div>
            <p className="demo-sidebar-label">Engagements</p>
            <button className="demo-engagement-row" aria-expanded={northstarExpanded} aria-controls={`${instanceId}-threads`} onClick={() => setNorthstarExpanded(!northstarExpanded)}><DemoIcon name="folder" /><span>Northstar Foods</span><DemoIcon name="chevron" className={northstarExpanded ? "demo-chevron--open" : ""} /></button>
            {northstarExpanded && <nav className="demo-thread-list" id={`${instanceId}-threads`} aria-label="Northstar Foods threads">{chapters.map(item => <a key={item.id} href={`#${item.id}`} aria-current={item.id === scene.chapter ? "page" : undefined} onClick={() => { setPlaying(false); setSidebarOpen(false); }}>{threadNames[item.id]}</a>)}</nav>}
            {engagementReferences.map(item => <button key={item.engagement} className="demo-engagement-row demo-engagement-reference" onClick={() => openSource(item)}><DemoIcon name="folder" /><span>{item.engagement}</span></button>)}
          </aside>
        </>}
        <div className="demo-main">
          <header className="demo-player-header">{!compact && <button className="demo-sidebar-toggle" aria-label="Toggle engagement sidebar" aria-controls={`${instanceId}-sidebar`} aria-expanded={sidebarOpen} onClick={() => setSidebarOpen(!sidebarOpen)}><DemoIcon name="menu" /></button>}<strong>Northstar Foods</strong><span>{threadNames[scene.chapter]}{scene.chapter === "deliver" ? " · Avery Ross" : ""}</span></header>
          <div className={`demo-workspace${showPane ? " demo-workspace--split" : ""}`}>
            <div className="demo-conversation"><div className="demo-chat-log" ref={log} role="log" aria-label="Engagement conversation" aria-live="off" aria-busy={!complete}>
              {promptSent && <ConversationTurn key={scene.id} scene={scene} answer={response} complete={complete} preparing={!answerStarted} activityProgress={activityProgress} onSource={openSource} onArtifact={openArtifact} onPause={() => setPlaying(false)} />}
            </div><div className="demo-composer" aria-label="Simulated message composer"><span>{!promptSent ? scene.prompt.slice(0, Math.floor(elapsed / 17)) : "Message AllianceOne…"}{!promptSent && <i className="demo-type-cursor" />}</span><DemoIcon name="arrow" /></div></div>
            {showPane && <aside className="demo-artifact-pane" aria-label={selectedSource ? "Supporting source" : artifactNames[artifact]} onPointerDown={() => setPlaying(false)} onWheel={() => setPlaying(false)} onFocusCapture={() => setPlaying(false)}><div className="demo-pane-toolbar"><span>{selectedSource ? "Supporting context" : artifactNames[artifact]}</span><button aria-label="Close side pane" onClick={() => { setSelectedSource(null); setArtifactHidden(true); }}><DemoIcon name="close" /></button></div>
              <div className="demo-pane-content">{selectedSource ? <article className="demo-source-document"><p>{selectedSource.engagement ? "Firm engagement history" : "Northstar demonstration · source context"}</p><h3>{selectedSource.label}</h3><p>{selectedSource.text}</p><button onClick={() => setSelectedSource(null)}>Back to the work <span aria-hidden="true">↗</span></button></article> : <DemoArtifact key={`${scene.id}-${artifact}`} kind={artifact} progress={artifact === "handoff" ? activityProgress : undefined} />}</div>
            </aside>}
          </div>
          <div className="demo-player-controls"><button className="demo-play" onClick={play} aria-label={playing ? "Pause demo" : "Play demo"}><DemoIcon name={playing ? "pause" : "play"} /><span>{playing ? "Pause" : "Play demo"}</span></button><button className="demo-replay" onClick={replay} aria-label="Replay demo"><DemoIcon name="replay" /></button><span className="demo-scene-position">{cursor + 1} / {sequence.length}</span><button className="demo-continue" onClick={() => cursor < sequence.length - 1 ? seek(cursor + 1) : replay()}>{cursor < sequence.length - 1 ? "Next example" : "Replay"}<DemoIcon name="next" /></button></div>
        </div>
      </div>
    </section>
    <nav className="demo-examples" aria-label={`${compact ? presentation : "Opening"} examples`}>{sequence.map((example, index) => <button key={example.id} aria-pressed={index === cursor} onClick={() => seek(index)}>{example.label}</button>)}</nav>
    {!compact && <p className="demo-caption">Illustrative engagement · fictional client data</p>}
    <div className="demo-sr-only" role="status" aria-live="polite">{announcement}</div>
  </div>;
}
