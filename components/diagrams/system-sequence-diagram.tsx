"use client";

import { useState } from "react";

interface SystemMessage {
  id: number;
  label: string;
  response: string;
  description: string;
  y: number;
}

const messages: SystemMessage[] = [
  { 
    id: 1, 
    label: "login(credentials)", 
    response: "authenticationSuccess, userProfile",
    description: "Priya enters her GT credentials. The system validates them and returns her profile with authentication token.",
    y: 210 
  },
  { 
    id: 2, 
    label: "viewMyOrganizations()", 
    response: "organizationList[3]",
    description: "Priya requests to see her organizations. System returns a list of 3 orgs she's a member of (Robotics Club, CS Club, Music Society).",
    y: 285 
  },
  { 
    id: 3, 
    label: "viewUpcomingEvents()", 
    response: "eventList with details",
    description: "Priya asks to see upcoming events. System aggregates and returns all events from her organizations with dates and details.",
    y: 360 
  },
  { 
    id: 4, 
    label: "viewEventDetails(eventId)", 
    response: "eventDetails, registeredCount, capacity",
    description: "Priya selects a specific event to see more info. System returns full details including how many spots are left.",
    y: 435 
  },
  { 
    id: 5, 
    label: "logout()", 
    response: "logoutConfirmation",
    description: "Priya ends her session. System invalidates her token and confirms successful logout.",
    y: 510 
  },
];

export function SystemSequenceDiagram() {
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
    }, 1500);
  };

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
        <div className="flex gap-1">
          {messages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`h-3 w-3 rounded-full transition-all ${
                currentStep === index 
                  ? "bg-primary scale-125" 
                  : currentStep !== null && index < currentStep 
                  ? "bg-primary/50" 
                  : "bg-muted"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Info Panel */}
      {(hoveredElement || currentStep !== null) && (
        <div className="rounded-lg bg-accent/50 border border-accent p-4 transition-all">
          <h4 className="font-medium text-foreground mb-1">
            {currentStep !== null ? `Step ${currentStep + 1}: ${messages[currentStep]?.label}` : ""}
          </h4>
          <p className="text-sm text-muted-foreground">
            {hoveredElement === "actor" 
              ? "Priya (Student) - The external actor initiating system operations. In SSDs, actors represent users outside the system boundary."
              : hoveredElement === "system"
              ? "CampusConnect (System) - The software system being designed. It's treated as a black box - we only show inputs and outputs."
              : currentStep !== null
              ? messages[currentStep]?.description
              : ""}
          </p>
        </div>
      )}

      {/* Diagram */}
      <div className="w-full overflow-x-auto">
        <svg
          viewBox="0 0 700 600"
          className="w-full min-w-[500px] h-auto"
          style={{ minHeight: "500px" }}
        >
          <rect width="700" height="600" fill="#131318" rx="8" />

          <text x="350" y="35" textAnchor="middle" className="fill-foreground text-base font-semibold">
            System Sequence Diagram: View Organizations & Events (Scenario 3)
          </text>

          {/* Actor - Priya */}
          <g
            onMouseEnter={() => setHoveredElement("actor")}
            onMouseLeave={() => setHoveredElement(null)}
            className="cursor-pointer"
          >
            <circle 
              cx="120" cy="70" r="15" 
              fill={hoveredElement === "actor" ? "#3b82f6" : "none"}
              fillOpacity={hoveredElement === "actor" ? 0.3 : 0}
              stroke="#3b82f6" 
              strokeWidth={hoveredElement === "actor" ? 3 : 2}
              className="transition-all duration-200"
            />
            <line x1="120" y1="85" x2="120" y2="115" stroke="#3b82f6" strokeWidth="2" />
            <line x1="100" y1="95" x2="140" y2="95" stroke="#3b82f6" strokeWidth="2" />
            <line x1="120" y1="115" x2="100" y2="140" stroke="#3b82f6" strokeWidth="2" />
            <line x1="120" y1="115" x2="140" y2="140" stroke="#3b82f6" strokeWidth="2" />
            <text x="120" y="160" textAnchor="middle" className="fill-foreground text-sm">Priya</text>
            <text x="120" y="175" textAnchor="middle" className="fill-muted-foreground text-xs">(Student)</text>
            <line x1="120" y1="185" x2="120" y2="550" stroke="#3b82f6" strokeDasharray="6,4" strokeWidth="1.5" />
          </g>

          {/* System - CampusConnect */}
          <g
            onMouseEnter={() => setHoveredElement("system")}
            onMouseLeave={() => setHoveredElement(null)}
            className="cursor-pointer"
          >
            <rect 
              x="480" y="60" width="140" height="50" rx="4" 
              fill={hoveredElement === "system" ? "#22d3ee" : "#1e1e26"}
              fillOpacity={hoveredElement === "system" ? 0.2 : 1}
              stroke="#22d3ee" 
              strokeWidth={hoveredElement === "system" ? 3 : 2}
              className="transition-all duration-200"
            />
            <text x="550" y="90" textAnchor="middle" className="fill-foreground text-sm pointer-events-none">:CampusConnect</text>
            <text x="550" y="105" textAnchor="middle" className="fill-muted-foreground text-xs pointer-events-none">(System)</text>
            <line x1="550" y1="110" x2="550" y2="550" stroke="#22d3ee" strokeDasharray="6,4" strokeWidth="1.5" />
          </g>

          {/* Messages */}
          {messages.map((msg, index) => {
            const isVisible = currentStep === null || index <= currentStep;
            const isActive = currentStep === index;

            return (
              <g 
                key={msg.id}
                onMouseEnter={() => setHoveredElement(`msg-${msg.id}`)}
                onMouseLeave={() => setHoveredElement(null)}
                className="cursor-pointer"
                opacity={isVisible ? 1 : 0.15}
              >
                {/* Activation bars */}
                <rect 
                  x="115" y={msg.y - 5} width="10" height="25" 
                  fill="#3b82f6" 
                  opacity={isActive ? 0.8 : 0.5}
                  className="transition-all duration-300"
                />
                <rect 
                  x="545" y={msg.y - 5} width="10" height="35" 
                  fill="#22d3ee" 
                  opacity={isActive ? 0.8 : 0.5}
                  className="transition-all duration-300"
                />

                {/* Request arrow */}
                <line 
                  x1="125" y1={msg.y} x2="545" y2={msg.y} 
                  stroke={isActive ? "#22d3ee" : "#e4e4e7"} 
                  strokeWidth={isActive ? 2.5 : 1.5}
                  markerEnd="url(#arrowhead-ssd)"
                  className="transition-all duration-300"
                />
                <text 
                  x="335" y={msg.y - 10} 
                  textAnchor="middle" 
                  className={`text-sm pointer-events-none transition-all ${isActive ? "fill-foreground" : "fill-foreground"}`}
                >
                  {msg.id}: {msg.label}
                </text>

                {/* Response arrow */}
                <line 
                  x1="545" y1={msg.y + 25} x2="125" y2={msg.y + 25} 
                  stroke={isActive ? "#22d3ee" : "#e4e4e7"} 
                  strokeWidth={isActive ? 2.5 : 1.5}
                  strokeDasharray="4,2" 
                  markerEnd="url(#arrowhead-ssd)"
                  className="transition-all duration-300"
                />
                <text 
                  x="335" y={msg.y + 42} 
                  textAnchor="middle" 
                  className={`text-xs pointer-events-none ${isActive ? "fill-accent" : "fill-muted-foreground"}`}
                >
                  {msg.response}
                </text>

                {/* Hover highlight */}
                {(hoveredElement === `msg-${msg.id}` || isActive) && (
                  <rect
                    x="110"
                    y={msg.y - 20}
                    width="450"
                    height="70"
                    fill={isActive ? "#22d3ee" : "#3b82f6"}
                    fillOpacity="0.1"
                    rx="4"
                    className="pointer-events-none"
                  />
                )}
              </g>
            );
          })}

          {/* Legend */}
          <g transform="translate(50, 565)">
            <circle cx="6" cy="6" r="5" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="18" y="10" className="fill-muted-foreground text-xs">Actor</text>
            <rect x="80" y="1" width="12" height="12" fill="#1e1e26" stroke="#22d3ee" strokeWidth="1" rx="2" />
            <text x="98" y="10" className="fill-muted-foreground text-xs">System</text>
            <line x1="170" y1="6" x2="200" y2="6" stroke="#e4e4e7" strokeWidth="1.5" />
            <text x="208" y="10" className="fill-muted-foreground text-xs">System Event</text>
            <line x1="310" y1="6" x2="340" y2="6" stroke="#e4e4e7" strokeWidth="1.5" strokeDasharray="4,2" />
            <text x="348" y="10" className="fill-muted-foreground text-xs">System Response</text>
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
