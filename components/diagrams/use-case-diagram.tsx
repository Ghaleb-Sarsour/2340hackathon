"use client";

interface UseCaseDiagramProps {
  currentStep: number | null;
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
  1: { actors: [], useCases: [], associations: false, boundary: false }, // Identify actors
  2: { actors: ["student", "president", "officer"], useCases: [], associations: false, boundary: false }, // Draw actors
  3: { actors: ["student", "president", "officer"], useCases: [], associations: false, boundary: true }, // System boundary
  4: { actors: ["student", "president", "officer"], useCases: ["login", "searchOrg", "requestMembership", "viewOrgs", "viewEvents", "rsvpEvent", "approveReject", "createEvent", "manageEvent"], associations: false, boundary: true }, // Add use cases
  5: { actors: ["student", "president", "officer", "authSystem"], useCases: ["login", "searchOrg", "requestMembership", "viewOrgs", "viewEvents", "rsvpEvent", "approveReject", "createEvent", "manageEvent"], associations: true, boundary: true }, // Add associations
  6: { actors: ["student", "president", "officer", "authSystem"], useCases: ["login", "searchOrg", "requestMembership", "viewOrgs", "viewEvents", "rsvpEvent", "approveReject", "createEvent", "manageEvent"], associations: true, boundary: true, showRelations: true }, // Include/extend
};

export function UseCaseDiagram({ currentStep }: UseCaseDiagramProps) {
  const step = currentStep as keyof typeof stepVisibility | null;
  const visibility = step ? stepVisibility[step] : null;
  const showAll = visibility === null;

  const isActorVisible = (id: string) => showAll || (visibility?.actors.includes(id) ?? false);
  const isUseCaseVisible = (id: string) => showAll || (visibility?.useCases.includes(id) ?? false);
  const showAssociations = showAll || (visibility?.associations ?? false);
  const showBoundary = showAll || (visibility?.boundary ?? false);
  const showRelations = showAll || ((visibility as { showRelations?: boolean })?.showRelations ?? false);

  const isNewlyAdded = (type: "actor" | "useCase" | "association" | "boundary" | "relations", id?: string) => {
    if (!step || step === 1) return false;
    const prevStep = (step - 1) as keyof typeof stepVisibility;
    const prev = stepVisibility[prevStep];
    if (type === "actor" && id) return !prev.actors.includes(id) && visibility?.actors.includes(id);
    if (type === "useCase" && id) return !prev.useCases.includes(id) && visibility?.useCases.includes(id);
    if (type === "association") return !prev.associations && visibility?.associations;
    if (type === "boundary") return !prev.boundary && visibility?.boundary;
    if (type === "relations") return !(prev as { showRelations?: boolean }).showRelations && (visibility as { showRelations?: boolean })?.showRelations;
    return false;
  };

  const getScenarioColor = (scenario?: number) => {
    if (scenario === 1) return "#22d3ee";
    if (scenario === 2) return "#10b981";
    if (scenario === 3) return "#f59e0b";
    return "#71717a";
  };

  return (
    <div className="w-full">
      <div className="w-full overflow-x-auto">
        <svg
          viewBox="0 0 800 580"
          className="w-full min-w-[600px] h-auto"
          style={{ minHeight: "460px" }}
        >
          <rect width="800" height="580" fill="#000000" rx="8" />

          <text x="400" y="30" textAnchor="middle" className="fill-foreground text-sm font-semibold">
            Use Case Diagram: CampusConnect
          </text>

          {/* System Boundary */}
          <g 
            opacity={showBoundary ? 1 : 0.08}
            className={isNewlyAdded("boundary") ? "animate-pulse" : "transition-opacity duration-500"}
          >
            <rect 
              x="180" y="50" width="440" height="460" rx="8" 
              fill="none" 
              stroke={isNewlyAdded("boundary") ? "#3b82f6" : "#3b82f6"} 
              strokeWidth={isNewlyAdded("boundary") ? 3 : 2} 
            />
            <text x="400" y="75" textAnchor="middle" className="fill-primary text-sm font-semibold">CampusConnect</text>
          </g>

          {/* Associations */}
          {associations.map((assoc, index) => {
            const actor = actors.find(a => a.id === assoc.actorId)!;
            const useCase = useCases.find(u => u.id === assoc.useCaseId)!;
            const visible = showAssociations && isActorVisible(assoc.actorId) && isUseCaseVisible(assoc.useCaseId);
            const isNew = isNewlyAdded("association");

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
                strokeWidth={isNew ? 2.5 : 1.5}
                opacity={visible ? 1 : 0.05}
                className={isNew ? "animate-pulse" : "transition-opacity duration-500"}
              />
            );
          })}

          {/* Inheritance line (President extends Student) */}
          <g opacity={showAssociations ? 1 : 0.08}>
            <line x1="70" y1="320" x2="70" y2="240" stroke="#71717a" strokeWidth="1.5" />
            <polygon points="70,240 63,253 77,253" fill="none" stroke="#71717a" strokeWidth="1.5" />
          </g>

          {/* Include relationship */}
          <g 
            opacity={showRelations ? 1 : 0.08}
            className={isNewlyAdded("relations") ? "animate-pulse" : "transition-opacity duration-500"}
          >
            <line x1="375" y1="100" x2="620" y2="100" stroke="#71717a" strokeWidth="1.5" strokeDasharray="4,2" />
            <text x="500" y="90" textAnchor="middle" className="fill-muted-foreground text-xs">{"<<include>>"}</text>
          </g>

          {/* Actors */}
          {actors.map((actor) => {
            const visible = isActorVisible(actor.id);
            const isNew = isNewlyAdded("actor", actor.id);

            if (actor.isSystem) {
              return (
                <g
                  key={actor.id}
                  opacity={visible ? 1 : 0.08}
                  className={isNew ? "animate-pulse" : "transition-opacity duration-500"}
                >
                  <rect
                    x={actor.x - 40}
                    y={actor.y - 20}
                    width="80"
                    height="40"
                    rx="4"
                    fill={isNew ? actor.color : "#0a0a0a"}
                    fillOpacity={isNew ? 0.3 : 1}
                    stroke={actor.color}
                    strokeWidth={isNew ? 3 : 2}
                  />
                  <text x={actor.x} y={actor.y + 5} textAnchor="middle" className="fill-foreground text-xs">{actor.name}</text>
                </g>
              );
            }

            return (
              <g
                key={actor.id}
                transform={`translate(${actor.x}, ${actor.y})`}
                opacity={visible ? 1 : 0.08}
                className={isNew ? "animate-pulse" : "transition-opacity duration-500"}
              >
                {/* Stick figure */}
                <circle
                  cx="0"
                  cy="-20"
                  r="12"
                  fill={isNew ? actor.color : "none"}
                  fillOpacity={isNew ? 0.3 : 0}
                  stroke={actor.color}
                  strokeWidth={isNew ? 3 : 2}
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
          {useCases.map((useCase) => {
            const visible = isUseCaseVisible(useCase.id);
            const isNew = isNewlyAdded("useCase", useCase.id);
            const color = getScenarioColor(useCase.scenario);

            return (
              <g
                key={useCase.id}
                opacity={visible ? 1 : 0.08}
                className={isNew ? "animate-pulse" : "transition-opacity duration-500"}
              >
                <ellipse
                  cx={useCase.x}
                  cy={useCase.y}
                  rx={useCase.rx}
                  ry="22"
                  fill={isNew ? color : "#0a0a0a"}
                  fillOpacity={isNew ? 0.2 : 1}
                  stroke={color}
                  strokeWidth={isNew ? 3 : 1.5}
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
            <ellipse cx="90" cy="6" rx="18" ry="8" fill="#0a0a0a" stroke="#71717a" strokeWidth="1" />
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
