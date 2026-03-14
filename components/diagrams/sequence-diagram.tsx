"use client";

import { useState } from "react";

interface Message {
  id: number;
  from: string;
  to: string;
  label: string;
  description: string;
  y: number;
  isReturn?: boolean;
}

const messages: Message[] = [
  { id: 1, from: "daniel", to: "ui", label: "navigateToEventPage()", description: "Daniel opens the event creation page in the UI", y: 130 },
  { id: 2, from: "ui", to: "controller", label: "getEventForm()", description: "UI requests the event creation form from EventController", y: 160 },
  { id: 3, from: "daniel", to: "ui", label: "enterEventDetails()", description: "Daniel fills in event details: title, description, date, location, capacity", y: 210 },
  { id: 4, from: "ui", to: "controller", label: "createEvent(details)", description: "UI sends the event creation request with all details to the controller", y: 250 },
  { id: 5, from: "controller", to: "org", label: "validateOfficer(daniel)", description: "Controller checks if Daniel is an officer of the organization", y: 285 },
  { id: 6, from: "org", to: "controller", label: "isValid", description: "Organization confirms Daniel has permission to create events", y: 310, isReturn: true },
  { id: 7, from: "controller", to: "event", label: "new Event(...)", description: "Controller creates a new Event object with all the provided details", y: 355 },
  { id: 8, from: "controller", to: "org", label: "addEvent(event)", description: "The new event is added to the organization's event list", y: 385 },
  { id: 9, from: "controller", to: "ui", label: "eventCreated", description: "Controller confirms successful event creation back to the UI", y: 415, isReturn: true },
  { id: 10, from: "students", to: "student", label: "viewEvent()", description: "Students browse and view the newly created event", y: 495 },
  { id: 11, from: "student", to: "event", label: "rsvp(student)", description: "A student sends an RSVP request to attend the event", y: 530 },
  { id: 12, from: "event", to: "event", label: "checkCapacity()", description: "Event checks if there's still room for more attendees", y: 555 },
  { id: 13, from: "event", to: "student", label: "addAttendee()", description: "If capacity allows, student is added to the attendee list", y: 620 },
  { id: 14, from: "student", to: "students", label: "rsvpConfirmed", description: "Student receives confirmation of successful RSVP", y: 640, isReturn: true },
];

const lifelines = [
  { id: "daniel", label: "Daniel", x: 90, color: "#3b82f6", isActor: true },
  { id: "ui", label: ":UI", x: 210, color: "#22d3ee", isActor: false },
  { id: "controller", label: ":EventController", x: 350, color: "#22d3ee", isActor: false },
  { id: "org", label: ":Organization", x: 500, color: "#22d3ee", isActor: false },
  { id: "event", label: ":Event", x: 630, color: "#22d3ee", isActor: false },
  { id: "student", label: ":Student", x: 750, color: "#22d3ee", isActor: false },
  { id: "students", label: "Students", x: 890, color: "#3b82f6", isActor: true },
];

export function SequenceDiagram() {
  const [currentStep, setCurrentStep] = useState<number | null>(null);
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playAnimation = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step >= messages.length) {
        clearInterval(interval);
        setIsPlaying(false);
        setCurrentStep(null);
      } else {
        setCurrentStep(step);
      }
    }, 1200);
  };

  const getLifelineX = (id: string) => lifelines.find(l => l.id === id)?.x || 0;

  return (
    <div className="w-full space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4 rounded-lg bg-card p-4 border border-border">
        <button
          onClick={playAnimation}
          disabled={isPlaying}
          className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
          </svg>
          Play Animation
        </button>
        <button
          onClick={() => setCurrentStep(null)}
          className="rounded-md border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
        >
          Reset
        </button>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Step:</span>
          <select
            value={currentStep ?? ""}
            onChange={(e) => setCurrentStep(e.target.value ? Number(e.target.value) : null)}
            className="rounded-md border border-border bg-background px-2 py-1 text-sm"
          >
            <option value="">All</option>
            {messages.map((m) => (
              <option key={m.id} value={m.id - 1}>
                {m.id}: {m.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Info Panel */}
      {(hoveredElement || currentStep !== null) && (
        <div className="rounded-lg bg-accent/50 border border-accent p-4 transition-all">
          <p className="text-sm text-foreground">
            {hoveredElement
              ? lifelines.find(l => l.id === hoveredElement)
                ? `${lifelines.find(l => l.id === hoveredElement)?.label} - ${lifelines.find(l => l.id === hoveredElement)?.isActor ? "Actor (external entity interacting with system)" : "Object (system component)"}`
                : messages.find(m => `msg-${m.id}` === hoveredElement)?.description
              : currentStep !== null
              ? messages[currentStep]?.description
              : ""}
          </p>
        </div>
      )}

      {/* Diagram */}
      <div className="w-full overflow-x-auto">
        <svg
          viewBox="0 0 1000 750"
          className="w-full min-w-[800px] h-auto"
          style={{ minHeight: "600px" }}
        >
          <rect width="1000" height="750" fill="#131318" rx="8" />

          <text x="500" y="35" textAnchor="middle" className="fill-foreground text-base font-semibold">
            Sequence Diagram: Event Creation and RSVP (Scenario 2)
          </text>

          {/* Lifelines */}
          {lifelines.map((lifeline) => (
            <g
              key={lifeline.id}
              onMouseEnter={() => setHoveredElement(lifeline.id)}
              onMouseLeave={() => setHoveredElement(null)}
              className="cursor-pointer"
            >
              <rect
                x={lifeline.x - 40}
                y="60"
                width={lifeline.id === "controller" ? 120 : 80}
                height="40"
                rx="4"
                fill={hoveredElement === lifeline.id ? lifeline.color : "#1e1e26"}
                fillOpacity={hoveredElement === lifeline.id ? 0.3 : 1}
                stroke={lifeline.color}
                strokeWidth={hoveredElement === lifeline.id ? 3 : 2}
                className="transition-all duration-200"
              />
              <text
                x={lifeline.x}
                y="85"
                textAnchor="middle"
                className="fill-foreground text-sm pointer-events-none"
              >
                {lifeline.label}
              </text>
              <line
                x1={lifeline.x}
                y1="100"
                x2={lifeline.x}
                y2="700"
                stroke={lifeline.color}
                strokeDasharray="6,4"
                strokeWidth="1.5"
                opacity={hoveredElement === lifeline.id ? 1 : 0.7}
              />
            </g>
          ))}

          {/* Messages */}
          {messages.map((msg, index) => {
            const fromX = getLifelineX(msg.from);
            const toX = getLifelineX(msg.to);
            const isVisible = currentStep === null || index <= currentStep;
            const isActive = currentStep === index;
            const isSelfCall = msg.from === msg.to;

            return (
              <g
                key={msg.id}
                onMouseEnter={() => setHoveredElement(`msg-${msg.id}`)}
                onMouseLeave={() => setHoveredElement(null)}
                className="cursor-pointer"
                opacity={isVisible ? 1 : 0.2}
              >
                {isSelfCall ? (
                  <>
                    <line
                      x1={fromX + 5}
                      y1={msg.y}
                      x2={fromX + 40}
                      y2={msg.y}
                      stroke={isActive ? "#22d3ee" : "#e4e4e7"}
                      strokeWidth={isActive ? 2.5 : 1.5}
                      className="transition-all duration-300"
                    />
                    <line
                      x1={fromX + 40}
                      y1={msg.y}
                      x2={fromX + 40}
                      y2={msg.y + 20}
                      stroke={isActive ? "#22d3ee" : "#e4e4e7"}
                      strokeWidth={isActive ? 2.5 : 1.5}
                    />
                    <line
                      x1={fromX + 40}
                      y1={msg.y + 20}
                      x2={fromX + 5}
                      y2={msg.y + 20}
                      stroke={isActive ? "#22d3ee" : "#e4e4e7"}
                      strokeWidth={isActive ? 2.5 : 1.5}
                      markerEnd="url(#arrowhead)"
                    />
                    <text
                      x={fromX + 50}
                      y={msg.y + 5}
                      className={`text-xs pointer-events-none ${isActive ? "fill-accent" : "fill-muted-foreground"}`}
                    >
                      {msg.id}: {msg.label}
                    </text>
                  </>
                ) : (
                  <>
                    <line
                      x1={fromX + (fromX < toX ? 5 : -5)}
                      y1={msg.y}
                      x2={toX + (fromX < toX ? -5 : 5)}
                      y2={msg.y}
                      stroke={isActive ? "#22d3ee" : "#e4e4e7"}
                      strokeWidth={isActive ? 2.5 : 1.5}
                      strokeDasharray={msg.isReturn ? "4,2" : "none"}
                      markerEnd="url(#arrowhead)"
                      className="transition-all duration-300"
                    />
                    <text
                      x={(fromX + toX) / 2}
                      y={msg.y - 8}
                      textAnchor="middle"
                      className={`text-xs pointer-events-none ${isActive ? "fill-accent" : "fill-muted-foreground"}`}
                    >
                      {msg.id}: {msg.label}
                    </text>
                  </>
                )}
                
                {/* Hover highlight */}
                {hoveredElement === `msg-${msg.id}` && (
                  <rect
                    x={Math.min(fromX, toX) - 10}
                    y={msg.y - 20}
                    width={Math.abs(toX - fromX) + 20}
                    height="30"
                    fill="#22d3ee"
                    fillOpacity="0.1"
                    rx="4"
                  />
                )}
              </g>
            );
          })}

          {/* Loop Fragment */}
          <rect x="40" y="455" width="920" height="200" fill="none" stroke="#71717a" strokeWidth="1.5" rx="4" />
          <rect x="40" y="455" width="80" height="22" fill="#27272a" stroke="#71717a" strokeWidth="1.5" />
          <text x="80" y="470" textAnchor="middle" className="fill-muted-foreground text-xs font-semibold">loop</text>
          <text x="140" y="470" className="fill-muted-foreground text-xs">[for each student until full]</text>

          {/* Alt fragment */}
          <rect x="580" y="590" width="340" height="55" fill="none" stroke="#71717a" strokeWidth="1" strokeDasharray="4,2" rx="2" />
          <text x="595" y="605" className="fill-muted-foreground text-xs">[if capacity available]</text>

          {/* Legend */}
          <g transform="translate(50, 710)">
            <rect x="0" y="0" width="12" height="12" fill="#3b82f6" rx="2" />
            <text x="18" y="10" className="fill-muted-foreground text-xs">Actor</text>
            <rect x="80" y="0" width="12" height="12" fill="#22d3ee" rx="2" />
            <text x="98" y="10" className="fill-muted-foreground text-xs">Object</text>
            <line x1="170" y1="6" x2="200" y2="6" stroke="#e4e4e7" strokeWidth="1.5" />
            <text x="208" y="10" className="fill-muted-foreground text-xs">Message</text>
            <line x1="280" y1="6" x2="310" y2="6" stroke="#e4e4e7" strokeWidth="1.5" strokeDasharray="4,2" />
            <text x="318" y="10" className="fill-muted-foreground text-xs">Return</text>
            <text x="400" y="10" className="fill-accent text-xs">Click elements to learn more!</text>
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
