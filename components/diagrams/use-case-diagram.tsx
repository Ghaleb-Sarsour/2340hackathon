"use client";

import { useState } from "react";

interface Actor {
  id: string;
  name: string;
  description: string;
  x: number;
  y: number;
  color: string;
  isSystem?: boolean;
}

interface UseCase {
  id: string;
  name: string;
  description: string;
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
  { id: "student", name: "Student", description: "Any GT student who can search organizations, request membership, view events, and RSVP.", x: 80, y: 180, color: "#22d3ee" },
  { id: "president", name: "President", description: "A student who leads an organization. Can approve/reject membership requests. Inherits all Student capabilities.", x: 80, y: 400, color: "#f59e0b" },
  { id: "officer", name: "Officer", description: "A student with elevated privileges in an organization. Can create and manage events.", x: 80, y: 550, color: "#10b981" },
  { id: "authSystem", name: "External Auth", description: "External authentication system (GT Login) that validates user credentials.", x: 820, y: 150, color: "#ec4899", isSystem: true },
];

const useCases: UseCase[] = [
  { id: "login", name: "Login", description: "Authenticate with GT credentials to access the system.", x: 350, y: 130, rx: 70 },
  { id: "searchOrg", name: "Search Organization", description: "Search for campus organizations by name or category.", x: 350, y: 200, rx: 85, scenario: 1 },
  { id: "requestMembership", name: "Request Membership", description: "Submit a request to join an organization.", x: 350, y: 270, rx: 90, scenario: 1 },
  { id: "viewOrgs", name: "View Organizations", description: "View list of organizations the student is a member of.", x: 550, y: 200, rx: 85, scenario: 3 },
  { id: "viewEvents", name: "View Events", description: "Browse upcoming events from joined organizations.", x: 550, y: 270, rx: 70, scenario: 3 },
  { id: "rsvpEvent", name: "RSVP to Event", description: "Register to attend an upcoming event.", x: 550, y: 340, rx: 75, scenario: 3 },
  { id: "cancelRsvp", name: "Cancel RSVP", description: "Cancel a previously made RSVP.", x: 550, y: 410, rx: 70 },
  { id: "approveReject", name: "Approve/Reject Request", description: "Review and approve or reject membership requests.", x: 350, y: 420, rx: 100, scenario: 1 },
  { id: "createEvent", name: "Create Event", description: "Create a new event for the organization.", x: 350, y: 550, rx: 70, scenario: 2 },
  { id: "manageEvent", name: "Manage Event", description: "Edit or delete existing events.", x: 550, y: 550, rx: 70, scenario: 2 },
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

export function UseCaseDiagram() {
  const [selectedActor, setSelectedActor] = useState<string | null>(null);
  const [selectedUseCase, setSelectedUseCase] = useState<string | null>(null);
  const [filterScenario, setFilterScenario] = useState<number | null>(null);

  const getConnectedUseCases = (actorId: string) => {
    return associations.filter(a => a.actorId === actorId).map(a => a.useCaseId);
  };

  const getConnectedActors = (useCaseId: string) => {
    return associations.filter(a => a.useCaseId === useCaseId).map(a => a.actorId);
  };

  const highlightedUseCases = selectedActor ? getConnectedUseCases(selectedActor) : [];
  const highlightedActors = selectedUseCase ? getConnectedActors(selectedUseCase) : [];

  return (
    <div className="w-full space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4 rounded-lg bg-card p-4 border border-border">
        <span className="text-sm text-muted-foreground">Filter by scenario:</span>
        <div className="flex gap-2">
          {[
            { value: null, label: "All", color: "bg-muted" },
            { value: 1, label: "Scenario 1: Join Org", color: "bg-cyan-500" },
            { value: 2, label: "Scenario 2: Create Event", color: "bg-emerald-500" },
            { value: 3, label: "Scenario 3: View Events", color: "bg-amber-500" },
          ].map((scenario) => (
            <button
              key={scenario.value ?? "all"}
              onClick={() => setFilterScenario(scenario.value)}
              className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
                filterScenario === scenario.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${scenario.color}`} />
              {scenario.label}
            </button>
          ))}
        </div>
      </div>

      {/* Info Panel */}
      {(selectedActor || selectedUseCase) && (
        <div className="rounded-lg bg-accent/50 border border-accent p-4 transition-all">
          {selectedActor && (
            <div>
              <h4 className="font-semibold text-foreground mb-1">
                {actors.find(a => a.id === selectedActor)?.name}
              </h4>
              <p className="text-sm text-muted-foreground">
                {actors.find(a => a.id === selectedActor)?.description}
              </p>
              <p className="text-xs text-accent mt-2">
                Connected to {highlightedUseCases.length} use case(s)
              </p>
            </div>
          )}
          {selectedUseCase && (
            <div>
              <h4 className="font-semibold text-foreground mb-1">
                {useCases.find(u => u.id === selectedUseCase)?.name}
                {useCases.find(u => u.id === selectedUseCase)?.scenario && (
                  <span className="ml-2 text-xs text-accent">
                    (Scenario {useCases.find(u => u.id === selectedUseCase)?.scenario})
                  </span>
                )}
              </h4>
              <p className="text-sm text-muted-foreground">
                {useCases.find(u => u.id === selectedUseCase)?.description}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Diagram */}
      <div className="w-full overflow-x-auto">
        <svg
          viewBox="0 0 900 700"
          className="w-full min-w-[700px] h-auto"
          style={{ minHeight: "550px" }}
        >
          <rect width="900" height="700" fill="#131318" rx="8" />

          <text x="450" y="35" textAnchor="middle" className="fill-foreground text-base font-semibold">
            Use Case Diagram: CampusConnect (Scenarios 1, 2, 3)
          </text>

          {/* System Boundary */}
          <rect x="200" y="55" width="500" height="580" rx="8" fill="none" stroke="#3b82f6" strokeWidth="2" />
          <text x="450" y="85" textAnchor="middle" className="fill-primary text-sm font-semibold">CampusConnect System</text>

          {/* Associations (draw first) */}
          {associations.map((assoc, index) => {
            const actor = actors.find(a => a.id === assoc.actorId)!;
            const useCase = useCases.find(u => u.id === assoc.useCaseId)!;
            const isHighlighted = 
              selectedActor === assoc.actorId || 
              selectedUseCase === assoc.useCaseId ||
              (filterScenario !== null && useCase.scenario === filterScenario);

            // Calculate connection points
            const actorX = actor.x;
            const actorY = actor.y;
            const ucX = useCase.x;
            const ucY = useCase.y;

            return (
              <line
                key={index}
                x1={actorX + (actor.isSystem ? -30 : 20)}
                y1={actorY}
                x2={ucX - useCase.rx + 10}
                y2={ucY}
                stroke={actor.color}
                strokeWidth={isHighlighted ? 2 : 1.5}
                opacity={filterScenario !== null && useCase.scenario !== filterScenario ? 0.15 : isHighlighted ? 1 : 0.5}
                className="transition-all duration-200"
              />
            );
          })}

          {/* Inheritance line (President extends Student) */}
          <g>
            <line x1="80" y1="385" x2="80" y2="285" stroke="#e4e4e7" strokeWidth="1.5" />
            <polygon points="80,285 73,298 87,298" fill="none" stroke="#e4e4e7" strokeWidth="1.5" />
          </g>

          {/* Include relationship */}
          <g>
            <line x1="420" y1="130" x2="700" y2="130" stroke="#e4e4e7" strokeWidth="1.5" strokeDasharray="4,2" />
            <text x="560" y="120" textAnchor="middle" className="fill-muted-foreground text-xs">{"<<include>>"}</text>
          </g>

          {/* Extend relationship */}
          <g>
            <line x1="550" y1="385" x2="550" y2="365" stroke="#e4e4e7" strokeWidth="1.5" strokeDasharray="4,2" />
            <text x="600" y="380" className="fill-muted-foreground text-xs">{"<<extend>>"}</text>
          </g>

          {/* Actors */}
          {actors.map((actor) => {
            const isHighlighted = selectedActor === actor.id || highlightedActors.includes(actor.id);

            if (actor.isSystem) {
              return (
                <g
                  key={actor.id}
                  onMouseEnter={() => { setSelectedActor(actor.id); setSelectedUseCase(null); }}
                  onMouseLeave={() => setSelectedActor(null)}
                  className="cursor-pointer"
                >
                  <rect
                    x={actor.x - 30}
                    y={actor.y - 20}
                    width="60"
                    height="40"
                    rx="4"
                    fill={isHighlighted ? actor.color : "#1e1e26"}
                    fillOpacity={isHighlighted ? 0.3 : 1}
                    stroke={actor.color}
                    strokeWidth={isHighlighted ? 3 : 2}
                    className="transition-all duration-200"
                  />
                  <text x={actor.x} y={actor.y + 5} textAnchor="middle" className="fill-foreground text-xs pointer-events-none">Auth</text>
                  <text x={actor.x} y={actor.y + 40} textAnchor="middle" className="fill-foreground text-sm pointer-events-none">{actor.name}</text>
                  <text x={actor.x} y={actor.y + 55} textAnchor="middle" className="fill-muted-foreground text-xs pointer-events-none">System</text>
                </g>
              );
            }

            return (
              <g
                key={actor.id}
                transform={`translate(${actor.x}, ${actor.y})`}
                onMouseEnter={() => { setSelectedActor(actor.id); setSelectedUseCase(null); }}
                onMouseLeave={() => setSelectedActor(null)}
                className="cursor-pointer"
              >
                {/* Highlight glow */}
                {isHighlighted && (
                  <circle cx="0" cy="0" r="35" fill={actor.color} fillOpacity="0.2" className="animate-pulse" />
                )}
                {/* Stick figure */}
                <circle
                  cx="0"
                  cy="-20"
                  r="15"
                  fill={isHighlighted ? actor.color : "none"}
                  fillOpacity={isHighlighted ? 0.3 : 0}
                  stroke={actor.color}
                  strokeWidth={isHighlighted ? 3 : 2}
                  className="transition-all duration-200"
                />
                <line x1="0" y1="-5" x2="0" y2="25" stroke={actor.color} strokeWidth="2" />
                <line x1="-20" y1="5" x2="20" y2="5" stroke={actor.color} strokeWidth="2" />
                <line x1="0" y1="25" x2="-15" y2="50" stroke={actor.color} strokeWidth="2" />
                <line x1="0" y1="25" x2="15" y2="50" stroke={actor.color} strokeWidth="2" />
                <text x="0" y="70" textAnchor="middle" className="fill-foreground text-sm pointer-events-none">{actor.name}</text>
              </g>
            );
          })}

          {/* Use Cases */}
          {useCases.map((useCase) => {
            const isHighlighted = 
              selectedUseCase === useCase.id || 
              highlightedUseCases.includes(useCase.id) ||
              (filterScenario !== null && useCase.scenario === filterScenario);
            const isFiltered = filterScenario !== null && useCase.scenario !== filterScenario;

            const scenarioColor = useCase.scenario === 1 ? "#22d3ee" : useCase.scenario === 2 ? "#10b981" : useCase.scenario === 3 ? "#f59e0b" : "#e4e4e7";

            return (
              <g
                key={useCase.id}
                onMouseEnter={() => { setSelectedUseCase(useCase.id); setSelectedActor(null); }}
                onMouseLeave={() => setSelectedUseCase(null)}
                className="cursor-pointer"
                opacity={isFiltered ? 0.2 : 1}
              >
                {/* Highlight glow */}
                {isHighlighted && !isFiltered && (
                  <ellipse
                    cx={useCase.x}
                    cy={useCase.y}
                    rx={useCase.rx + 5}
                    ry="30"
                    fill={scenarioColor}
                    fillOpacity="0.2"
                    className="animate-pulse"
                  />
                )}
                <ellipse
                  cx={useCase.x}
                  cy={useCase.y}
                  rx={useCase.rx}
                  ry="25"
                  fill={isHighlighted && !isFiltered ? scenarioColor : "#1e1e26"}
                  fillOpacity={isHighlighted && !isFiltered ? 0.2 : 1}
                  stroke={useCase.scenario ? scenarioColor : "#e4e4e7"}
                  strokeWidth={isHighlighted && !isFiltered ? 3 : 1.5}
                  className="transition-all duration-200"
                />
                <text
                  x={useCase.x}
                  y={useCase.y + 5}
                  textAnchor="middle"
                  className="fill-foreground text-xs pointer-events-none"
                >
                  {useCase.name}
                </text>
              </g>
            );
          })}

          {/* Legend */}
          <g transform="translate(220, 650)">
            <circle cx="6" cy="6" r="5" fill="none" stroke="#22d3ee" strokeWidth="1.5" />
            <text x="18" y="10" className="fill-muted-foreground text-xs">Actor</text>
            <ellipse cx="90" cy="6" rx="20" ry="8" fill="#1e1e26" stroke="#e4e4e7" strokeWidth="1" />
            <text x="120" y="10" className="fill-muted-foreground text-xs">Use Case</text>
            <line x1="200" y1="6" x2="230" y2="6" stroke="#e4e4e7" strokeWidth="1.5" />
            <text x="240" y="10" className="fill-muted-foreground text-xs">Association</text>
            <line x1="330" y1="6" x2="360" y2="6" stroke="#e4e4e7" strokeWidth="1.5" strokeDasharray="4,2" />
            <text x="370" y="10" className="fill-muted-foreground text-xs">Include/Extend</text>
            <line x1="480" y1="15" x2="480" y2="0" stroke="#e4e4e7" strokeWidth="1.5" />
            <polygon points="480,0 475,10 485,10" fill="none" stroke="#e4e4e7" strokeWidth="1" />
            <text x="495" y="10" className="fill-muted-foreground text-xs">Generalization</text>
          </g>

          {/* Scenario color key */}
          <g transform="translate(720, 280)">
            <rect x="0" y="0" width="100" height="80" rx="4" fill="#27272a" stroke="#71717a" strokeWidth="1" />
            <text x="50" y="20" textAnchor="middle" className="fill-muted-foreground text-xs font-semibold">Scenarios</text>
            <circle cx="15" cy="38" r="4" fill="#22d3ee" />
            <text x="25" y="42" className="fill-foreground text-xs">1: Join Org</text>
            <circle cx="15" cy="53" r="4" fill="#10b981" />
            <text x="25" y="57" className="fill-foreground text-xs">2: Create Event</text>
            <circle cx="15" cy="68" r="4" fill="#f59e0b" />
            <text x="25" y="72" className="fill-foreground text-xs">3: View Events</text>
          </g>
        </svg>
      </div>
    </div>
  );
}
