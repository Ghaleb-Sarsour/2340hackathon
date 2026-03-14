"use client";

interface SystemSequenceDiagramProps {
  currentStep?: number | null;
}

interface SystemMessage {
  id: number;
  label: string;
  response: string;
  y: number;
}

const messages: SystemMessage[] = [
  { id: 1, label: "login(credentials)", response: "authSuccess, profile", y: 180 },
  { id: 2, label: "viewMyOrganizations()", response: "organizationList[3]", y: 250 },
  { id: 3, label: "viewUpcomingEvents()", response: "eventList", y: 320 },
  { id: 4, label: "viewEventDetails(eventId)", response: "eventDetails, capacity", y: 390 },
  { id: 5, label: "logout()", response: "logoutConfirmed", y: 460 },
];

// Map building process steps to visibility
const stepVisibility = {
  1: { actor: false, system: false, messages: [] }, // Identify scenario
  2: { actor: true, system: false, messages: [] }, // Identify actor
  3: { actor: true, system: true, messages: [] }, // Draw actor and system
  4: { actor: true, system: true, messages: [1, 2, 3, 4, 5] }, // Add system events
  5: { actor: true, system: true, messages: [1, 2, 3, 4, 5], showResponses: true }, // Add responses
  6: { actor: true, system: true, messages: [1, 2, 3, 4, 5], showResponses: true, showFragments: true }, // Add fragments
};

export function SystemSequenceDiagram({ currentStep }: SystemSequenceDiagramProps) {
  const step = currentStep as keyof typeof stepVisibility | null;
  const visibility = step ? stepVisibility[step] : null;
  const showAll = visibility === null;

  const showActor = showAll || (visibility?.actor ?? false);
  const showSystem = showAll || (visibility?.system ?? false);
  const showResponses = showAll || ((visibility as { showResponses?: boolean })?.showResponses ?? false);

  const isMessageVisible = (id: number) => {
    if (showAll) return true;
    return visibility?.messages.includes(id) ?? false;
  };

  const isNewlyAdded = (type: "actor" | "system" | "message" | "response", id?: number) => {
    if (!step || step === 1) return false;
    const prevStep = (step - 1) as keyof typeof stepVisibility;
    const prevVisibility = stepVisibility[prevStep];
    
    if (type === "actor") return !prevVisibility.actor && visibility?.actor;
    if (type === "system") return !prevVisibility.system && visibility?.system;
    if (type === "message" && id) {
      return !prevVisibility.messages.includes(id) && visibility?.messages.includes(id);
    }
    if (type === "response") {
      return !(prevVisibility as { showResponses?: boolean }).showResponses && (visibility as { showResponses?: boolean })?.showResponses;
    }
    return false;
  };

  return (
    <div className="w-full">
      <div className="w-full overflow-x-auto">
        <svg
          viewBox="0 0 650 560"
          className="w-full min-w-[500px] h-auto"
          style={{ minHeight: "450px" }}
        >
          <rect width="650" height="560" fill="#131318" rx="8" />

          <text x="325" y="30" textAnchor="middle" className="fill-foreground text-sm font-semibold">
            System Sequence Diagram: View Organizations & Events (Scenario 3)
          </text>

          {/* Actor - Priya */}
          <g
            opacity={showActor ? 1 : 0.1}
            className={isNewlyAdded("actor") ? "animate-pulse" : "transition-opacity duration-500"}
          >
            <circle 
              cx="100" cy="70" r="15" 
              fill={isNewlyAdded("actor") ? "#3b82f6" : "none"}
              fillOpacity={isNewlyAdded("actor") ? 0.3 : 0}
              stroke="#3b82f6" 
              strokeWidth={isNewlyAdded("actor") ? 3 : 2}
            />
            <line x1="100" y1="85" x2="100" y2="115" stroke="#3b82f6" strokeWidth="2" />
            <line x1="80" y1="95" x2="120" y2="95" stroke="#3b82f6" strokeWidth="2" />
            <line x1="100" y1="115" x2="80" y2="140" stroke="#3b82f6" strokeWidth="2" />
            <line x1="100" y1="115" x2="120" y2="140" stroke="#3b82f6" strokeWidth="2" />
            <text x="100" y="158" textAnchor="middle" className="fill-foreground text-sm">Priya</text>
            <line x1="100" y1="165" x2="100" y2="500" stroke="#3b82f6" strokeDasharray="6,4" strokeWidth="1.5" />
          </g>

          {/* System - CampusConnect */}
          <g
            opacity={showSystem ? 1 : 0.1}
            className={isNewlyAdded("system") ? "animate-pulse" : "transition-opacity duration-500"}
          >
            <rect 
              x="450" y="60" width="130" height="45" rx="4" 
              fill={isNewlyAdded("system") ? "#22d3ee" : "#1e1e26"}
              fillOpacity={isNewlyAdded("system") ? 0.2 : 1}
              stroke="#22d3ee" 
              strokeWidth={isNewlyAdded("system") ? 3 : 2}
            />
            <text x="515" y="87" textAnchor="middle" className="fill-foreground text-sm">:CampusConnect</text>
            <line x1="515" y1="105" x2="515" y2="500" stroke="#22d3ee" strokeDasharray="6,4" strokeWidth="1.5" />
          </g>

          {/* Messages */}
          {messages.map((msg) => {
            const visible = isMessageVisible(msg.id);
            const isNew = isNewlyAdded("message", msg.id);
            const responseNew = isNewlyAdded("response");

            return (
              <g 
                key={msg.id}
                opacity={visible ? 1 : 0.08}
                className={isNew ? "animate-pulse" : "transition-opacity duration-500"}
              >
                {/* Activation bars */}
                <rect 
                  x="95" y={msg.y - 5} width="10" height="30" 
                  fill="#3b82f6" 
                  opacity={isNew ? 0.8 : 0.5}
                />
                <rect 
                  x="510" y={msg.y - 5} width="10" height="40" 
                  fill="#22d3ee" 
                  opacity={isNew ? 0.8 : 0.5}
                />

                {/* Request arrow */}
                <line 
                  x1="105" y1={msg.y} x2="510" y2={msg.y} 
                  stroke={isNew ? "#22d3ee" : "#e4e4e7"} 
                  strokeWidth={isNew ? 2.5 : 1.5}
                  markerEnd="url(#arrowhead-ssd)"
                />
                <text 
                  x="307" y={msg.y - 8} 
                  textAnchor="middle" 
                  className={`text-sm ${isNew ? "fill-foreground font-medium" : "fill-foreground"}`}
                >
                  {msg.id}: {msg.label}
                </text>

                {/* Response arrow */}
                <g opacity={showResponses ? 1 : 0.1} className={responseNew && visible ? "animate-pulse" : ""}>
                  <line 
                    x1="510" y1={msg.y + 25} x2="105" y2={msg.y + 25} 
                    stroke={responseNew ? "#22d3ee" : "#e4e4e7"} 
                    strokeWidth={responseNew ? 2.5 : 1.5}
                    strokeDasharray="4,2" 
                    markerEnd="url(#arrowhead-ssd)"
                  />
                  <text 
                    x="307" y={msg.y + 42} 
                    textAnchor="middle" 
                    className={`text-xs ${responseNew ? "fill-accent" : "fill-muted-foreground"}`}
                  >
                    {msg.response}
                  </text>
                </g>
              </g>
            );
          })}

          {/* Legend */}
          <g transform="translate(50, 520)">
            <circle cx="6" cy="6" r="5" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="18" y="10" className="fill-muted-foreground text-xs">Actor</text>
            <rect x="80" y="1" width="12" height="12" fill="#1e1e26" stroke="#22d3ee" strokeWidth="1" rx="2" />
            <text x="98" y="10" className="fill-muted-foreground text-xs">System</text>
            <line x1="160" y1="6" x2="190" y2="6" stroke="#e4e4e7" strokeWidth="1.5" />
            <text x="198" y="10" className="fill-muted-foreground text-xs">System Event</text>
            <line x1="295" y1="6" x2="325" y2="6" stroke="#e4e4e7" strokeWidth="1.5" strokeDasharray="4,2" />
            <text x="333" y="10" className="fill-muted-foreground text-xs">Response</text>
          </g>

          <defs>
            <marker id="arrowhead-ssd" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#e4e4e7" />
            </marker>
          </defs>
        </svg>
      </div>
    </div>
  );
}
