import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { capture, useVisualDwell } from "../analytics";
import DemoArtifact from "./DemoArtifacts.jsx";
import { chapters, scenes } from "./northstar.js";
import "./engagement-demo.css";

export function DemoIcon({ name, ...props }) {
  const paths = { play: "m8 5 11 7-11 7Z", pause: "M8 5v14M16 5v14", replay: "M3 10a9 9 0 1 1 2 9M3 4v6h6", next: "M5 12h14m-6-6 6 6-6 6", close: "m6 6 12 12M18 6 6 18", document: "M14 3H5v18h14V8Zm0 0v5h5M8 12h8M8 16h8", arrow: "M12 19V5m-6 6 6-6 6 6" };
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
function timing(scene, reduced) {
  const promptEnd = reduced ? 0 : Math.max(1100, scene.prompt.length * 15);
  const activityEnd = promptEnd + (reduced ? 0 : scene.activity.length * 620);
  const answerEnd = activityEnd + (reduced ? 0 : scene.answer.join("\n\n").length * 8);
  return { promptEnd, activityEnd, answerEnd, duration: answerEnd + (reduced ? 2800 : 2200) };
}

function ConversationTurn({ scene, answer, complete, preparing, activityProgress, onSource, onArtifact }) {
  return <div className="demo-turn">
    {scene.signal && <p className="demo-signal">{scene.signal}</p>}
    <div className="demo-user-message">{scene.prompt}</div>
    <div className="demo-agent-message"><div className="demo-agent-name"><img src="/brand/logo-mark.svg" alt="" />AllianceOne</div>
      {preparing && <div className="demo-agent-working" role="status"><span className="demo-working-dot" />{scene.activity[Math.min(activityProgress, scene.activity.length - 1)]}</div>}
      {answer && <div className="demo-response">{answer.split("\n\n").map((paragraph, i) => <p key={i}>{paragraph}</p>)}</div>}
      {complete && <><div className="demo-source-links">{scene.sources.map(source => <button key={source.label} onClick={() => onSource(source)}>{source.label}</button>)}</div>
        {scene.artifact && <button className="demo-artifact-reference" onClick={() => onArtifact(scene.artifact)}><DemoIcon name="document" />{artifactNames[scene.artifact]}<span aria-hidden="true">↗</span></button>}
        <details className="demo-activity-detail"><summary>Agent activity</summary><ol>{scene.activity.map(activity => <li key={activity}>{activity}</li>)}</ol></details></>}
    </div>
  </div>;
}

export default function EngagementDemo() {
  const [cursor, setCursor] = useState(0);
  const [elapsed, setElapsed] = useState(Infinity);
  const [playing, setPlaying] = useState(false);
  const [selectedSource, setSelectedSource] = useState(null);
  const [manualArtifact, setManualArtifact] = useState(null);
  const [artifactHidden, setArtifactHidden] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const reduced = useReducedMotion();
  const log = useRef(null);
  const demoRef = useVisualDwell("northstar-engagement");
  const scene = scenes[cursor];
  const chapter = chapters.find(item => item.id === scene.chapter);
  const times = timing(scene, reduced);
  const promptSent = elapsed >= times.promptEnd;
  const answerStarted = elapsed >= times.activityEnd;
  const complete = elapsed >= times.answerEnd;
  const answer = scene.answer.join("\n\n");
  const response = complete ? answer : answerStarted ? answer.slice(0, Math.floor((elapsed - times.activityEnd) / 8)) : "";
  const activityProgress = complete ? scene.activity.length : Math.max(0, Math.floor((elapsed - times.promptEnd) / 620));
  const history = useMemo(() => scenes.slice(0, cursor).filter(item => item.chapter === scene.chapter), [cursor, scene.chapter]);
  const earlierArtifact = [...history].reverse().find(item => item.artifact)?.artifact;
  const naturalArtifact = scene.artifact && (answerStarted || (scene.artifact === "handoff" && promptSent)) ? scene.artifact : earlierArtifact;
  const artifact = manualArtifact || naturalArtifact;
  const showPane = Boolean(selectedSource || (artifact && !artifactHidden));
  const atEnd = cursor === scenes.length - 1 && complete;

  useEffect(() => {
    setSelectedSource(null); setManualArtifact(null); setArtifactHidden(false);
  }, [cursor]);

  useEffect(() => {
    if (!playing) return;
    let frame;
    const start = performance.now() - (Number.isFinite(elapsed) ? elapsed : 0);
    const tick = (now) => {
      const next = now - start;
      if (next >= times.duration) {
        setAnnouncement(`${chapter.label}: ${scene.prompt}`);
        if (cursor === scenes.length - 1) { setElapsed(Infinity); setPlaying(false); capture("demo_completed"); }
        else { setCursor(cursor + 1); setElapsed(0); }
        return;
      }
      setElapsed(next);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // Elapsed is deliberately captured at start/resume, not on every animation frame.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, cursor, reduced]);

  useLayoutEffect(() => { if (log.current) log.current.scrollTop = log.current.scrollHeight; }, [cursor, promptSent, response.length, showPane]);

  const seek = (index) => {
    const bounded = Math.max(0, Math.min(scenes.length - 1, index));
    setPlaying(false); setCursor(bounded); setElapsed(Infinity);
    setAnnouncement(`${scenes[bounded].chapter}: ${scenes[bounded].prompt}`);
    capture("demo_scene_selected", { scene: scenes[bounded].id });
  };
  const play = () => {
    if (playing) { setPlaying(false); return; }
    if (complete) { setCursor(atEnd || cursor === 0 ? 0 : cursor + 1); setElapsed(0); }
    setPlaying(true); capture("demo_played", { scene: scene.id });
  };
  const next = scenes[cursor + 1];
  const nextLabel = !next ? "Replay" : next.chapter !== scene.chapter ? `Next: ${chapters.find(item => item.id === next.chapter).label}` : scene.chapter === "plan" ? "Continue planning" : "Continue conversation";
  const openSource = (source) => { setPlaying(false); setSelectedSource(source); };
  const openArtifact = (kind) => { setSelectedSource(null); setManualArtifact(kind); setArtifactHidden(false); };
  return <div className="engagement-demo" ref={demoRef} id="demo">
    <section className="demo-player" aria-label="Northstar Foods illustrative product demo">
      <header className="demo-player-header"><strong>Northstar Foods</strong><span>{scene.chapter === "scope" ? "Understanding the engagement" : scene.chapter === "plan" ? "Engagement planning and staffing" : "Data-readiness assessment · Avery Ross"}</span></header>
      <div className={`demo-workspace${showPane ? " demo-workspace--split" : ""}`}>
        <div className="demo-conversation"><div className="demo-chat-log" ref={log} role="log" aria-label="Engagement conversation" aria-live="off" aria-busy={!complete}>
          {history.map(turn => <ConversationTurn key={turn.id} scene={turn} answer={turn.answer.join("\n\n")} complete onSource={openSource} onArtifact={openArtifact} />)}
          {promptSent && <ConversationTurn scene={scene} answer={response} complete={complete} preparing={!answerStarted} activityProgress={activityProgress} onSource={openSource} onArtifact={openArtifact} />}
        </div><div className="demo-composer" aria-label="Simulated message composer"><span>{!promptSent ? scene.prompt.slice(0, Math.floor(elapsed / 15)) : "Message AllianceOne…"}{!promptSent && <i className="demo-type-cursor" />}</span><DemoIcon name="arrow" /></div></div>
        {showPane && <aside className="demo-artifact-pane" aria-label={selectedSource ? "Supporting source" : artifactNames[artifact]}><div className="demo-pane-toolbar"><span>{selectedSource ? "Supporting context" : artifactNames[artifact]}</span><button aria-label="Close side pane" onClick={() => { setSelectedSource(null); setArtifactHidden(true); }}><DemoIcon name="close" /></button></div>
          <div className="demo-pane-content">{selectedSource ? <article className="demo-source-document"><p>Northstar demonstration · source context</p><h3>{selectedSource.label}</h3><p>{selectedSource.text}</p><button onClick={() => setSelectedSource(null)}>Back to the work <span aria-hidden="true">↗</span></button></article> : <DemoArtifact key={artifact} kind={artifact} progress={artifact === "handoff" ? activityProgress : undefined} />}</div>
        </aside>}
      </div>
      <div className="demo-player-controls"><button className="demo-play" onClick={play} aria-label={playing ? "Pause demo" : "Play demo"}><DemoIcon name={playing ? "pause" : "play"} /><span>{playing ? "Pause" : "Play demo"}</span></button><button className="demo-replay" onClick={() => seek(0)} aria-label="Replay demo"><DemoIcon name="replay" /></button><label className="demo-progress"><span className="demo-sr-only">Demo progress</span><input type="range" min="0" max={scenes.length - 1} step="1" value={cursor} onChange={event => seek(Number(event.target.value))} aria-valuetext={`${chapter.label}: ${scene.prompt}`} /></label><button className="demo-continue" onClick={() => seek(next ? cursor + 1 : 0)}>{nextLabel}<DemoIcon name="next" /></button></div>
    </section>
    <nav className="demo-chapters" aria-label="Demo chapters">{chapters.map(item => <button key={item.id} aria-pressed={item.id === chapter.id} onClick={() => seek(scenes.findIndex(turn => turn.chapter === item.id))}>{item.label}</button>)}</nav>
    <p className="demo-caption">{chapter.description}<span>Illustrative demo · fictional engagement</span></p>
    <div className="demo-sr-only" role="status" aria-live="polite">{announcement}</div>
  </div>;
}
