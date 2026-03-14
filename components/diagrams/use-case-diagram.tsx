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
  { actorId: "president", useCaseId: "approveReject" },
  { actorId: "officer", useCaseId: "createEvent" },
  { actorId: "officer", useCaseId: "manageEvent" },
  { actorId: "authSystem", useCaseId: "login" },
];

// Map building process steps
const stepVisibility = {
  1: { actors: [], useCases: [], associations: false, boundary: false, showRelations: false },
  2: { actors: ["student", "president", "officer"], useCases: [], associations: false, boundary: false, showRelations: false },
  3: { actors: ["student", "president", "officer"], useCases: [], associations: false, boundary: true, showRelations: false },
  4: { actors: ["student", "president", "officer"], useCases: ["login", "searchOrg", "requestMembership", "viewOrgs", "viewEvents", "rsvpEvent", "approveReject", "createEvent", "manageEvent"], associations: false, boundary: true, showRelations: false },
  5: { actors: ["student", "president", "officer", "authSystem"], useCases: ["login", "searchOrg", "requestMembership", "viewOrgs", "viewEvents", "rsvpEvent", "approveReject", "createEvent", "manageEvent"], associations: true, boundary: true, showRelations: false },
  6: { actors: ["student", "president", "officer", "authSystem"], useCases: ["login", "searchOrg", "requestMembership", "viewOrgs", "viewEvents", "rsvpEvent", "approveReject", "createEvent", "manageEvent"], associations: true, boundary: true, showRelations: true },
};

export function UseCaseDiagram({ currentStep }: UseCaseDiagramProps) {
  const step = currentStep as keyof typeof stepVisibility | null;
  const visibility = step ? stepVisibility[step] : null;
  const showAll = visibility === null;
  const prevStepRef = useRef<number | null>(null);
  const [animatingElements, setAnimatingElements] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (step === null) {
      setAnimatingElements(new Set());
      prevStepRef.current = null;
      return;
    }

    const prevStep = prevStepRef.current;
    const newAnimating = new Set<string>();

    if (prevStep === null || step > prevStep) {
      const current = stepVisibility[step];
      const prev = prevStep ? stepVisibility[prevStep as keyof typeof stepVisibility] : { actors: [], useCases: [], associations: false, boundary: false, showRelations: false };

      current.actors.forEach(id => {
        if (!prev.actors.includes(id)) newAnimating.add(`actor-${id}`);
      });
      current.useCases.forEach(id => {
        if (!prev.useCases.includes(id)) newAnimating.add(`usecase-${id}`);
      });
      if (current.boundary && !prev.boundary) newAnimating.add("boundary");
      if (current.associations && !prev.associations) newAnimating.add("associations");
      if (current.showRelations && !prev.showRelations) newAnimating.add("relations");
    }

    setAnimatingElements(newAnimating);
    prevStepRef.current = step;

    if (newAnimating.size > 0) {
      const timer = setTimeout(() => setAnimatingElements(new Set()), 700);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const isActorVisible = (id: string) => showAll || (visibility?.actors.includes(id) ?? false);
  const isUseCaseVisible = (id: string) => showAll || (visibility?.useCases.includes(id) ?? false);
  const showAssociations = showAll || (visibility?.associations ?? false);
  const showBoundary = showAll || (visibility?.boundary ?? false);
  const showRelations = showAll || (visibility?.showRelations ?? false);
  const isAnimating = (key: string) => animatingElements.has(key);

  const getScenarioColor = (scenario?: number) => {
    if (scenario === 1) return "#22d3ee";
    if (scenario === 2) return "#10b981";
    if (scenario === 3) return "#f59e0b";
    return "#71717a";
  };

  return (
    <div className="w-full">
      <style>{`
        @keyframes actorFadeIn {
          0% { 
            opacity: 0; 
            transform: translateY(-15px);
          }
          100% { 
            opacity: 1; 
            transform: translateY(0);
          }
        }
        @keyframes useCasePopIn {
          0% { 
            opacity: 0; 
            transform: scale(0.7);
          }
          70% { 
            transform: scale(1.05);
          }
          100% { 
            opacity: 1; 
            transform: scale(1);
          }
        }
        @keyframes boundaryDraw {
          0% { 
            opacity: 0;
            stroke-dashoffset: 2000;
          }
          100% { 
            opacity: 1;
            stroke-dashoffset: 0;
          }
        }
        @keyframes lineDraw {
          0% { 
            stroke-dashoffset: 1000;
            opacity: 0.3;
          }
          100% { 
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }
        .actor-animate {
          animation: actorFadeIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .usecase-animate {
          animation: useCasePopIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .boundary-animate {
          stroke-dasharray: 2000;
          animation: boundaryDraw 1s ease-out forwards;
        }
        .line-animate { 
          stroke-dasharray: 1000; 
          animation: lineDraw 0.6s ease-out forwards; 
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
                stroke={isAnimating("boundary") ? "#3b82f6" : "#3b82f6"} 
                strokeWidth={isAnimating("boundary") ? 3 : 2} 
                className={isAnimating("boundary") ? "boundary-animate" : ""}
              />
              <text x="400" y="75" textAnchor="middle" className="fill-primary text-sm font-semibold">CampusConnect</text>
            </g>
          )}

          {/* Associations */}
          {associations.map((assoc, index) => {
            const actor = actors.find(a => a.id === assoc.actorId)!;
            const useCase = useCases.find(u => u.id === assoc.useCaseId)!;
            const visible = showAssociations && isActorVisible(assoc.actorId) && isUseCaseVisible(assoc.useCaseId);
            const animating = isAnimating("associations");

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
                strokeWidth={animating ? 2.5 : 1.5}
                className={animating ? "line-animate" : ""}
                style={{ animationDelay: `${index * 50}ms` }}
              />
            );
          })}

          {/* Inheritance line (President extends Student) */}
          {showAssociations && isActorVisible("student") && isActorVisible("president") && (
            <g>
              <line 
                x1="70" y1="320" x2="70" y2="240" 
                stroke="#71717a" strokeWidth="1.5" 
                className={isAnimating("associations") ? "line-animate" : ""}
                style={{ animationDelay: "500ms" }}
              />
              <polygon points="70,240 63,253 77,253" fill="none" stroke="#71717a" strokeWidth="1.5" />
            </g>
          )}

          {/* Include relationship */}
          {showRelations && (
            <g>
              <line 
                x1="375" y1="100" x2="620" y2="100" 
                stroke="#71717a" strokeWidth="1.5" strokeDasharray="4,2" 
                className={isAnimating("relations") ? "line-animate" : ""}
              />
              <text x="500" y="90" textAnchor="middle" className="fill-muted-foreground text-xs">{"<<include>>"}</text>
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
                  className={animating ? "actor-animate" : ""}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <rect
                    x={actor.x - 40}
                    y={actor.y - 20}
                    width="80"
                    height="40"
                    rx="4"
                    fill={animating ? actor.color : "#1e1e26"}
                    fillOpacity={animating ? 0.2 : 1}
                    stroke={actor.color}
                    strokeWidth={animating ? 3 : 2}
                  />
                  <text x={actor.x} y={actor.y + 5} textAnchor="middle" className="fill-foreground text-xs">{actor.name}</text>
                </g>
              );
            }

            return (
              <g
                key={actor.id}
                transform={`translate(${actor.x}, ${actor.y})`}
                className={animating ? "actor-animate" : ""}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Stick figure */}
                <circle
                  cx="0"
                  cy="-20"
                  r="12"
                  fill={animating ? actor.color : "none"}
                  fillOpacity={animating ? 0.2 : 0}
                  stroke={actor.color}
                  strokeWidth={animating ? 3 : 2}
                />
                <line x1="0" y1="-8" x2="0" y2="18" stroke={actor.color} strokeWidth="2" />
                <line x1="-15" y1="0" x2="15" y2="0" stroke={actor.color} strokeWidth="2" />
                <line x1="0" y1="18" x2="-12" y2="38" stroke={actor.color} strokeWidth="2" />
                <line x1="0" y1="18" x2="12" y2="38" stroke={actor.color} strokeWidth="2" />
                <text x="0" y="55" textAnchor="middle" className="fill-foreground text-xs">{actor.name}</text>
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
                className={animating ? "usecase-animate" : ""}
                style={{ 
                  animationDelay: `${index * 60}ms`,
                  transformOrigin: `${useCase.x}px ${useCase.y}px`
                }}
              >
                <ellipse
                  cx={useCase.x}
                  cy={useCase.y}
                  rx={useCase.rx}
                  ry="22"
                  fill={animating ? color : "#1e1e26"}
                  fillOpacity={animating ? 0.15 : 1}
                  stroke={color}
                  strokeWidth={animating ? 3 : 1.5}
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
        </svg>
      </div>
    </div>
  );
}
