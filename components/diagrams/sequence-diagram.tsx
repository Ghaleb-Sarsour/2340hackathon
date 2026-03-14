"use client";

interface SequenceDiagramProps {
  currentStep: number | null;
}

const lifelines = [
  { id: "daniel", label: "Daniel", x: 80, color: "#3b82f6", isActor: true },
  { id: "ui", label: ":UI", x: 180, color: "#22d3ee" },
  { id: "controller", label: ":EventController", x: 310, color: "#22d3ee" },
  { id: "org", label: ":Organization", x: 450, color: "#22d3ee" },
  { id: "event", label: ":Event", x: 570, color: "#22d3ee" },
  { id: "student", label: ":Student", x: 680, color: "#22d3ee" },
  { id: "students", label: "Students", x: 800, color: "#3b82f6", isActor: true },
];

// Map building process steps to what elements should be visible
const stepVisibility = {
  1: { lifelines: [], messages: [], fragments: false }, // Just identify scenario
  2: { lifelines: ["daniel", "ui", "controller", "org", "event", "student", "students"], messages: [], fragments: false }, // Show participants
  3: { lifelines: ["daniel", "ui", "controller", "org", "event", "student", "students"], messages: [], fragments: false }, // Lifelines drawn
  4: { lifelines: ["daniel", "ui", "controller", "org", "event", "student", "students"], messages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], fragments: false }, // Add messages
  5: { lifelines: ["daniel", "ui", "controller", "org", "event", "student", "students"], messages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], fragments: false }, // Activation & returns
  6: { lifelines: ["daniel", "ui", "controller", "org", "event", "student", "students"], messages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], fragments: true }, // Add loop fragment
};

interface Message {
  id: number;
  from: string;
  to: string;
  label: string;
  y: number;
  isReturn?: boolean;
}

const messages: Message[] = [
  { id: 1, from: "daniel", to: "ui", label: "navigateToEventPage()", y: 130 },
  { id: 2, from: "ui", to: "controller", label: "getEventForm()", y: 160 },
  { id: 3, from: "daniel", to: "ui", label: "enterEventDetails()", y: 200 },
  { id: 4, from: "ui", to: "controller", label: "createEvent(details)", y: 235 },
  { id: 5, from: "controller", to: "org", label: "validateOfficer(daniel)", y: 270 },
  { id: 6, from: "org", to: "controller", label: "isValid", y: 295, isReturn: true },
  { id: 7, from: "controller", to: "event", label: "new Event(...)", y: 330 },
  { id: 8, from: "controller", to: "org", label: "addEvent(event)", y: 360 },
  { id: 9, from: "controller", to: "ui", label: "eventCreated", y: 390, isReturn: true },
  { id: 10, from: "students", to: "student", label: "viewEvent()", y: 455 },
  { id: 11, from: "student", to: "event", label: "rsvp(student)", y: 485 },
  { id: 12, from: "event", to: "event", label: "checkCapacity()", y: 510 },
  { id: 13, from: "event", to: "student", label: "addAttendee()", y: 555 },
  { id: 14, from: "student", to: "students", label: "rsvpConfirmed", y: 580, isReturn: true },
];

export function SequenceDiagram({ currentStep }: SequenceDiagramProps) {
  const step = currentStep as keyof typeof stepVisibility | null;
  const visibility = step ? stepVisibility[step] : null;
  const showAll = visibility === null;

  const getLifelineX = (id: string) => lifelines.find(l => l.id === id)?.x || 0;

  const isLifelineVisible = (id: string) => {
    if (showAll) return true;
    return visibility?.lifelines.includes(id) ?? false;
  };

  const isMessageVisible = (id: number) => {
    if (showAll) return true;
    return visibility?.messages.includes(id) ?? false;
  };

  const showFragments = showAll || (visibility?.fragments ?? false);

  // Highlight newly added elements
  const isNewlyAdded = (type: "lifeline" | "message" | "fragment", id?: string | number) => {
    if (!step || step === 1) return false;
    const prevStep = (step - 1) as keyof typeof stepVisibility;
    const prevVisibility = stepVisibility[prevStep];
    
    if (type === "lifeline" && id) {
      return !prevVisibility.lifelines.includes(id as string) && visibility?.lifelines.includes(id as string);
    }
    if (type === "message" && id) {
      return !prevVisibility.messages.includes(id as number) && visibility?.messages.includes(id as number);
    }
    if (type === "fragment") {
      return !prevVisibility.fragments && visibility?.fragments;
    }
    return false;
  };

  return (
    <div className="w-full">
      <div className="w-full overflow-x-auto">
        <svg
          viewBox="0 0 900 680"
          className="w-full min-w-[700px] h-auto"
          style={{ minHeight: "550px" }}
        >
          <rect width="900" height="680" fill="#000000" rx="8" />

          <text x="450" y="30" textAnchor="middle" className="fill-foreground text-sm font-semibold">
            Sequence Diagram: Event Creation and RSVP (Scenario 2)
          </text>

          {/* Lifelines */}
          {lifelines.map((lifeline) => {
            const visible = isLifelineVisible(lifeline.id);
            const isNew = isNewlyAdded("lifeline", lifeline.id);
            const boxWidth = lifeline.id === "controller" ? 100 : 70;

            return (
              <g
                key={lifeline.id}
                opacity={visible ? 1 : 0.1}
                className={isNew ? "animate-pulse" : "transition-opacity duration-500"}
              >
                <rect
                  x={lifeline.x - boxWidth / 2}
                  y="50"
                  width={boxWidth}
                  height="36"
                  rx="4"
                  fill={isNew ? lifeline.color : "#0a0a0a"}
                  fillOpacity={isNew ? 0.3 : 1}
                  stroke={lifeline.color}
                  strokeWidth={isNew ? 3 : 2}
                />
                <text
                  x={lifeline.x}
                  y="73"
                  textAnchor="middle"
                  className="fill-foreground text-xs"
                >
                  {lifeline.label}
                </text>
                <line
                  x1={lifeline.x}
                  y1="86"
                  x2={lifeline.x}
                  y2="620"
                  stroke={lifeline.color}
                  strokeDasharray="6,4"
                  strokeWidth="1.5"
                  opacity={0.7}
                />
              </g>
            );
          })}

          {/* Messages */}
          {messages.map((msg) => {
            const fromX = getLifelineX(msg.from);
            const toX = getLifelineX(msg.to);
            const visible = isMessageVisible(msg.id);
            const isNew = isNewlyAdded("message", msg.id);
            const isSelfCall = msg.from === msg.to;

            return (
              <g
                key={msg.id}
                opacity={visible ? 1 : 0.08}
                className={isNew ? "animate-pulse" : "transition-opacity duration-500"}
              >
                {isSelfCall ? (
                  <>
                    <path
                      d={`M ${fromX + 5} ${msg.y} L ${fromX + 35} ${msg.y} L ${fromX + 35} ${msg.y + 20} L ${fromX + 5} ${msg.y + 20}`}
                      fill="none"
                      stroke={isNew ? "#22d3ee" : "#e4e4e7"}
                      strokeWidth={isNew ? 2.5 : 1.5}
                      markerEnd="url(#arrowhead)"
                    />
                    <text
                      x={fromX + 45}
                      y={msg.y + 5}
                      className={`text-xs ${isNew ? "fill-accent" : "fill-muted-foreground"}`}
                    >
                      {msg.label}
                    </text>
                  </>
                ) : (
                  <>
                    <line
                      x1={fromX + (fromX < toX ? 5 : -5)}
                      y1={msg.y}
                      x2={toX + (fromX < toX ? -5 : 5)}
                      y2={msg.y}
                      stroke={isNew ? "#22d3ee" : "#e4e4e7"}
                      strokeWidth={isNew ? 2.5 : 1.5}
                      strokeDasharray={msg.isReturn ? "4,2" : "none"}
                      markerEnd="url(#arrowhead)"
                    />
                    <text
                      x={(fromX + toX) / 2}
                      y={msg.y - 6}
                      textAnchor="middle"
                      className={`text-xs ${isNew ? "fill-accent" : "fill-muted-foreground"}`}
                    >
                      {msg.label}
                    </text>
                  </>
                )}
              </g>
            );
          })}

          {/* Loop Fragment */}
          <g 
            opacity={showFragments ? 1 : 0.08}
            className={isNewlyAdded("fragment") ? "animate-pulse" : "transition-opacity duration-500"}
          >
            <rect 
              x="35" y="420" width="830" height="190" 
              fill="none" 
              stroke={isNewlyAdded("fragment") ? "#22d3ee" : "#71717a"} 
              strokeWidth={isNewlyAdded("fragment") ? 2.5 : 1.5} 
              rx="4" 
            />
            <rect 
              x="35" y="420" width="60" height="20" 
              fill="#111111" 
              stroke={isNewlyAdded("fragment") ? "#22d3ee" : "#71717a"} 
              strokeWidth={isNewlyAdded("fragment") ? 2 : 1.5} 
            />
            <text x="65" y="434" textAnchor="middle" className="fill-muted-foreground text-xs font-semibold">loop</text>
            <text x="110" y="434" className="fill-muted-foreground text-xs">[for each student]</text>
          </g>

          {/* Legend */}
          <g transform="translate(50, 640)">
            <rect x="0" y="0" width="12" height="12" fill="#3b82f6" rx="2" />
            <text x="18" y="10" className="fill-muted-foreground text-xs">Actor</text>
            <rect x="80" y="0" width="12" height="12" fill="#22d3ee" rx="2" />
            <text x="98" y="10" className="fill-muted-foreground text-xs">Object</text>
            <line x1="160" y1="6" x2="190" y2="6" stroke="#e4e4e7" strokeWidth="1.5" />
            <text x="198" y="10" className="fill-muted-foreground text-xs">Message</text>
            <line x1="270" y1="6" x2="300" y2="6" stroke="#e4e4e7" strokeWidth="1.5" strokeDasharray="4,2" />
            <text x="308" y="10" className="fill-muted-foreground text-xs">Return</text>
            <rect x="370" y="0" width="40" height="12" fill="none" stroke="#71717a" strokeWidth="1" rx="2" />
            <text x="418" y="10" className="fill-muted-foreground text-xs">Fragment</text>
          </g>

          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#e4e4e7" />
            </marker>
          </defs>
        </svg>
      </div>
    </div>
  );
}
