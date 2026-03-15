"use client";

import { useRef, useEffect, useState } from "react";

interface UseCaseDiagramProps {
  currentStep?: number | null;
}

interface Actor {
  id: string;
  name: string;
  x: number;
  y: number;
  color: string;
  isSystem?: boolean;
}

interface UseCase {
  id: string;
  name: string;
  x: number;
  y: number;
  rx: number;
  scenario?: number;
}

interface Association {
  actorId: string;
  useCaseId: string;
}

const actors: Actor[] = [
  { id: "student", name: "Student", x: 70, y: 160, color: "#22d3ee" },
  { id: "president", name: "President", x: 70, y: 340, color: "#f59e0b" },
  { id: "officer", name: "Officer", x: 70, y: 470, color: "#10b981" },
  { id: "authSystem", name: "Auth System", x: 720, y: 120, color: "#ec4899", isSystem: true },
];

const useCases: UseCase[] = [
  { id: "login", name: "Login", x: 320, y: 100, rx: 55 },
  { id: "searchOrg", name: "Search Org", x: 320, y: 160, rx: 60, scenario: 1 },
  { id: "requestMembership", name: "Request Membership", x: 320, y: 220, rx: 85, scenario: 1 },
  { id: "viewOrgs", name: "View Orgs", x: 520, y: 160, rx: 55, scenario: 3 },
  { id: "viewEvents", name: "View Events", x: 520, y: 220, rx: 60, scenario: 3 },
  { id: "rsvpEvent", name: "RSVP Event", x: 520, y: 280, rx: 60, scenario: 3 },
  // Optional extension use case (shown later in the step-by-step build)
  { id: "cancelRsvp", name: "Cancel RSVP", x: 520, y: 340, rx: 70, scenario: 3 },
  { id: "approveReject", name: "Approve/Reject", x: 320, y: 360, rx: 70, scenario: 1 },
  { id: "createEvent", name: "Create Event", x: 320, y: 470, rx: 65, scenario: 2 },
  { id: "manageEvent", name: "Manage Event", x: 520, y: 470, rx: 65, scenario: 2 },
];

const associations: Association[] = [
  { actorId: "student", useCaseId: "login" },
  { actorId: "student", useCaseId: "searchOrg" },
  { actorId: "student", useCaseId: "requestMembership" },
  { actorId: "student", useCaseId: "viewOrgs" },
  { actorId: "student", useCaseId: "viewEvents" },
  { actorId: "student", useCaseId: "rsvpEvent" },
  { actorId: "student", useCaseId: "cancelRsvp" },
  { actorId: "president", useCaseId: "approveReject" },
  { actorId: "officer", useCaseId: "createEvent" },
  { actorId: "officer", useCaseId: "manageEvent" },
  { actorId: "authSystem", useCaseId: "login" },
];

// Map building process steps
const stepVisibility = {
  1: { actors: ["student", "president", "officer", "authSystem"], useCases: [] as string[], associations: false, boundary: false, include: false, extend: false },
  2: { actors: ["student", "president", "officer", "authSystem"], useCases: ["login", "searchOrg", "requestMembership", "viewOrgs", "viewEvents", "rsvpEvent", "approveReject", "createEvent", "manageEvent"], associations: false, boundary: false, include: false, extend: false },
  3: { actors: ["student", "president", "officer", "authSystem"], useCases: ["login", "searchOrg", "requestMembership", "viewOrgs", "viewEvents", "rsvpEvent", "approveReject", "createEvent", "manageEvent"], associations: false, boundary: true, include: false, extend: false },
  4: { actors: ["student", "president", "officer", "authSystem"], useCases: ["login", "searchOrg", "requestMembership", "viewOrgs", "viewEvents", "rsvpEvent", "approveReject", "createEvent", "manageEvent"], associations: true, boundary: true, include: false, extend: false },
  5: { actors: ["student", "president", "officer", "authSystem"], useCases: ["login", "searchOrg", "requestMembership", "viewOrgs", "viewEvents", "rsvpEvent", "approveReject", "createEvent", "manageEvent"], associations: true, boundary: true, include: true, extend: false },
  6: { actors: ["student", "president", "officer", "authSystem"], useCases: ["login", "searchOrg", "requestMembership", "viewOrgs", "viewEvents", "rsvpEvent", "cancelRsvp", "approveReject", "createEvent", "manageEvent"], associations: true, boundary: true, include: true, extend: true },
};

export function UseCaseDiagram({ currentStep }: UseCaseDiagramProps) {
  const step = currentStep as keyof typeof stepVisibility | null;
  const visibility = step ? stepVisibility[step] : null;
  const showAll = visibility === null;
  const prevStepRef = useRef<number | null>(null);
  const [animatingElements, setAnimatingElements] = useState<Set<string>>(new Set());
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (step === null) {
      setAnimatingElements(new Set());
      prevStepRef.current = null;
      return;
    }

    const prevStep = prevStepRef.current;
    const newAnimating = new Set<string>();

    if (prevStep === null || step > prevStep) {
      const current = stepVisibility[step];
      const prev = prevStep ? stepVisibility[prevStep as keyof typeof stepVisibility] : { actors: [], useCases: [] as string[], associations: false, boundary: false, include: false, extend: false };

      current.actors.forEach(id => {
        if (!prev.actors.includes(id)) newAnimating.add(`actor-${id}`);
      });
      current.useCases.forEach(id => {
        if (!prev.useCases.includes(id)) newAnimating.add(`usecase-${id}`);
      });
      if (current.boundary && !prev.boundary) newAnimating.add("boundary");

      // Animate association lines when they first become visible (including when a new use case appears later)
      const prevVisibleAssocs = new Set<string>();
      if (prev.associations) {
        associations.forEach((assoc, index) => {
          if (prev.actors.includes(assoc.actorId) && prev.useCases.includes(assoc.useCaseId)) {
            prevVisibleAssocs.add(`assoc-${index}`);
          }
        });
      }

      if (current.associations) {
        associations.forEach((assoc, index) => {
          if (current.actors.includes(assoc.actorId) && current.useCases.includes(assoc.useCaseId)) {
            const key = `assoc-${index}`;
            if (!prevVisibleAssocs.has(key)) newAnimating.add(key);
          }
        });

        if (!prev.associations) newAnimating.add("generalization");
      }

      if (current.include && !prev.include) newAnimating.add("include");
      if (current.extend && !prev.extend) newAnimating.add("extend");
    }

    setAnimatingElements(newAnimating);
    prevStepRef.current = step;

    if (newAnimating.size > 0) {
      // Clear "animating" state only after the slowest staggered animation finishes
      const ACTOR_MS = 520;
      const USECASE_MS = 520;
      const LINE_MS = 700;
      const BOUNDARY_MS = 950;
      const ACTOR_STAGGER = 100;
      const USECASE_STAGGER = 60;
      const ASSOC_STAGGER = 50;
      const RELATION_DELAY = { include: 120, extend: 240 };

      let maxMs = 0;

      for (const key of newAnimating) {
        if (key.startsWith("actor-")) {
          const id = key.slice("actor-".length);
          const idx = actors.findIndex(a => a.id === id);
          const delay = Math.max(0, idx) * ACTOR_STAGGER;
          maxMs = Math.max(maxMs, delay + ACTOR_MS);
          continue;
        }

        if (key.startsWith("usecase-")) {
          const id = key.slice("usecase-".length);
          const idx = useCases.findIndex(u => u.id === id);
          const delay = Math.max(0, idx) * USECASE_STAGGER;
          maxMs = Math.max(maxMs, delay + USECASE_MS);
          continue;
        }

        if (key === "boundary") {
          maxMs = Math.max(maxMs, BOUNDARY_MS);
          continue;
        }

        if (key.startsWith("assoc-")) {
          const idx = Number(key.slice("assoc-".length));
          const delay = (Number.isFinite(idx) ? idx : 0) * ASSOC_STAGGER;
          maxMs = Math.max(maxMs, delay + LINE_MS);
          continue;
        }

        if (key === "generalization") {
          maxMs = Math.max(maxMs, 500 + LINE_MS);
          continue;
        }

        if (key === "include") {
          maxMs = Math.max(maxMs, RELATION_DELAY.include + LINE_MS);
          continue;
        }

        if (key === "extend") {
          maxMs = Math.max(maxMs, RELATION_DELAY.extend + LINE_MS);
          continue;
        }
      }

      timerRef.current = window.setTimeout(() => {
        setAnimatingElements(new Set());
        timerRef.current = null;
      }, Math.max(650, maxMs + 80));
    }
  }, [step]);

  const isActorVisible = (id: string) => showAll || (visibility?.actors.includes(id) ?? false);
  const isUseCaseVisible = (id: string) => showAll || (visibility?.useCases.includes(id) ?? false);
  const showAssociations = showAll || (visibility?.associations ?? false);
  const showBoundary = showAll || (visibility?.boundary ?? false);
  const showInclude = showAll || (visibility?.include ?? false);
  const showExtend = showAll || (visibility?.extend ?? false);
  const isAnimating = (key: string) => animatingElements.has(key);

  const getScenarioColor = (scenario?: number) => {
    if (scenario === 1) return "#22d3ee";
    if (scenario === 2) return "#10b981";
    if (scenario === 3) return "#f59e0b";
    return "#71717a";
  };

  return (
    <div className="w-full">
      <style jsx>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes drawLine {
          from {
            stroke-dashoffset: 500;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes drawBoundary {
          from {
            stroke-dashoffset: 2000;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        .animate-fade-slide {
          will-change: transform, opacity;
          animation: fadeSlideIn 0.52s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .animate-fade {
          will-change: opacity;
          animation: fadeIn 0.46s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .animate-draw {
          stroke-dasharray: 500;
          will-change: stroke-dashoffset;
          animation: drawLine 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .animate-draw-slow {
          stroke-dasharray: 2000;
          will-change: stroke-dashoffset;
          animation: drawBoundary 0.95s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-slide,
          .animate-fade,
          .animate-draw,
          .animate-draw-slow {
            animation: none !important;
          }
          .animate-draw,
          .animate-draw-slow {
            stroke-dasharray: none !important;
          }
        }
      `}</style>
      <div className="w-full overflow-x-auto">
        <svg
          viewBox="0 0 800 580"
          className="w-full min-w-[600px] h-auto"
          style={{ minHeight: "460px" }}
        >
          <rect width="800" height="580" fill="#131318" rx="8" />

          <text x="400" y="30" textAnchor="middle" className="fill-foreground text-sm font-semibold">
            Use Case Diagram: CampusConnect
          </text>

          {/* System Boundary */}
          {showBoundary && (
            <g>
              <rect 
                x="180" y="50" width="440" height="460" rx="8" 
                fill="none" 
                stroke="#3b82f6"
                strokeWidth="2" 
                strokeDasharray={isAnimating("boundary") ? "2000" : "none"}
                className={isAnimating("boundary") ? "animate-draw-slow" : ""}
              />
              <text x="400" y="75" textAnchor="middle" className="fill-primary text-sm font-semibold">CampusConnect</text>
            </g>
          )}

          {/* Associations */}
          {associations.map((assoc, index) => {
            const actor = actors.find(a => a.id === assoc.actorId)!;
            const useCase = useCases.find(u => u.id === assoc.useCaseId)!;
            const visible = showAssociations && isActorVisible(assoc.actorId) && isUseCaseVisible(assoc.useCaseId);
            const animating = isAnimating(`assoc-${index}`);

            if (!visible) return null;

            const actorX = actor.x + (actor.isSystem ? -30 : 20);
            const ucX = useCase.x - useCase.rx + 10;

            return (
              <line
                key={index}
                x1={actorX}
                y1={actor.y}
                x2={actor.isSystem ? ucX + 140 : ucX}
                y2={useCase.y}
                stroke={actor.color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray={animating ? "500" : "none"}
                className={animating ? "animate-draw" : ""}
                style={animating ? { animationDelay: `${index * 50}ms` } : undefined}
              />
            );
          })}

          {/* Inheritance line (President extends Student) */}
          {showAssociations && isActorVisible("student") && isActorVisible("president") && (
            <g>
              <line 
                x1="70" y1="320" x2="70" y2="240" 
                stroke="#71717a" strokeWidth="1.5" 
                strokeLinecap="round"
                strokeDasharray={isAnimating("generalization") ? "500" : "none"}
                className={isAnimating("generalization") ? "animate-draw" : ""}
                style={isAnimating("generalization") ? { animationDelay: "500ms" } : undefined}
              />
              <polygon points="70,240 63,253 77,253" fill="none" stroke="#71717a" strokeWidth="1.5" />
            </g>
          )}

          {/* Include relationship (dashed, open arrow) */}
          {showInclude && isUseCaseVisible("login") && isUseCaseVisible("viewEvents") && (
            <g>
              <path
                d="M 520 198 L 420 198 L 420 122 L 320 122"
                stroke="#71717a" 
                strokeWidth="1.5" 
                strokeDasharray={isAnimating("include") ? "500" : "4,2"}
                markerEnd="url(#open-arrow-ucd)"
                className={isAnimating("include") ? "animate-draw" : ""}
                style={isAnimating("include") ? { animationDelay: "120ms" } : undefined}
                fill="none"
              />
              <text
                x="420"
                y="150"
                textAnchor="middle"
                className={`fill-muted-foreground text-xs ${isAnimating("include") ? "animate-fade" : ""}`}
                style={isAnimating("include") ? { animationDelay: "220ms" } : undefined}
              >
                {"<<include>>"}
              </text>
            </g>
          )}

          {/* Extend relationship (dashed, open arrow) */}
          {showExtend && isUseCaseVisible("cancelRsvp") && isUseCaseVisible("rsvpEvent") && (
            <g>
              <path
                d="M 600 340 L 630 340 L 630 280 L 590 280"
                stroke="#71717a" 
                strokeWidth="1.5"
                strokeDasharray={isAnimating("extend") ? "500" : "4,2"}
                markerEnd="url(#open-arrow-ucd)"
                className={isAnimating("extend") ? "animate-draw" : ""}
                style={isAnimating("extend") ? { animationDelay: "240ms" } : undefined}
                fill="none"
              />
              <text
                x="645"
                y="312"
                className={`fill-muted-foreground text-xs ${isAnimating("extend") ? "animate-fade" : ""}`}
                style={isAnimating("extend") ? { animationDelay: "340ms" } : undefined}
              >
                {"<<extend>>"}
              </text>
            </g>
          )}

          {/* Actors */}
          {actors.map((actor, index) => {
            const visible = isActorVisible(actor.id);
            const animating = isAnimating(`actor-${actor.id}`);

            if (!visible) return null;

            if (actor.isSystem) {
              return (
                <g
                  key={actor.id}
                  className={animating ? "animate-fade-slide" : ""}
                  style={animating ? { animationDelay: `${index * 100}ms` } : undefined}
                >
                  <rect
                    x={actor.x - 40}
                    y={actor.y - 20}
                    width="80"
                    height="40"
                    rx="4"
                    fill="#1e1e26"
                    stroke={actor.color}
                    strokeWidth="2"
                  />
                  <text x={actor.x} y={actor.y + 5} textAnchor="middle" className="fill-foreground text-xs">{actor.name}</text>
                </g>
              );
            }

            return (
              <g
                key={actor.id}
                transform={`translate(${actor.x}, ${actor.y})`}
              >
                <g
                  className={animating ? "animate-fade-slide" : ""}
                  style={animating ? { animationDelay: `${index * 100}ms` } : undefined}
                >
                  {/* Stick figure */}
                  <circle
                    cx="0"
                    cy="-20"
                    r="12"
                    fill="none"
                    stroke={actor.color}
                    strokeWidth="2"
                  />
                  <line x1="0" y1="-8" x2="0" y2="18" stroke={actor.color} strokeWidth="2" strokeLinecap="round" />
                  <line x1="-15" y1="0" x2="15" y2="0" stroke={actor.color} strokeWidth="2" strokeLinecap="round" />
                  <line x1="0" y1="18" x2="-12" y2="38" stroke={actor.color} strokeWidth="2" strokeLinecap="round" />
                  <line x1="0" y1="18" x2="12" y2="38" stroke={actor.color} strokeWidth="2" strokeLinecap="round" />
                  <text x="0" y="55" textAnchor="middle" className="fill-foreground text-xs">{actor.name}</text>
                </g>
              </g>
            );
          })}

          {/* Use Cases */}
          {useCases.map((useCase, index) => {
            const visible = isUseCaseVisible(useCase.id);
            const animating = isAnimating(`usecase-${useCase.id}`);
            const color = getScenarioColor(useCase.scenario);

            if (!visible) return null;

            return (
              <g
                key={useCase.id}
                className={animating ? "animate-fade-slide" : ""}
                style={animating ? { animationDelay: `${index * 60}ms` } : undefined}
              >
                <ellipse
                  cx={useCase.x}
                  cy={useCase.y}
                  rx={useCase.rx}
                  ry="22"
                  fill="#1e1e26"
                  stroke={color}
                  strokeWidth="1.5"
                />
                <text
                  x={useCase.x}
                  y={useCase.y + 4}
                  textAnchor="middle"
                  className="fill-foreground text-xs"
                >
                  {useCase.name}
                </text>
              </g>
            );
          })}

          {/* Legend */}
          <g transform="translate(200, 530)">
            <circle cx="6" cy="6" r="5" fill="none" stroke="#22d3ee" strokeWidth="1.5" />
            <text x="18" y="10" className="fill-muted-foreground text-xs">Actor</text>
            <ellipse cx="90" cy="6" rx="18" ry="8" fill="#1e1e26" stroke="#71717a" strokeWidth="1" />
            <text x="118" y="10" className="fill-muted-foreground text-xs">Use Case</text>
            <circle cx="195" cy="6" r="4" fill="#22d3ee" />
            <text x="205" y="10" className="fill-muted-foreground text-xs">Scenario 1</text>
            <circle cx="280" cy="6" r="4" fill="#10b981" />
            <text x="290" y="10" className="fill-muted-foreground text-xs">Scenario 2</text>
            <circle cx="365" cy="6" r="4" fill="#f59e0b" />
            <text x="375" y="10" className="fill-muted-foreground text-xs">Scenario 3</text>
          </g>

          <defs>
            {/* Open arrow marker for <<include>> / <<extend>> */}
            <marker id="open-arrow-ucd" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
              <polyline points="0,0 9,5 0,10" fill="none" stroke="#71717a" strokeWidth="1.5" strokeLinejoin="round" />
            </marker>
          </defs>
        </svg>
      </div>
    </div>
  );
}
