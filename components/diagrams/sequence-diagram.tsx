"use client";

import { useEffect, useState } from "react";

interface SequenceDiagramProps {
  currentStep?: number | null;
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
  1: { lifelines: [], messages: [], activations: [], fragments: false },
  2: { lifelines: ["daniel", "ui", "controller", "org", "event", "student", "students"], messages: [], activations: [], fragments: false },
  3: { lifelines: ["daniel", "ui", "controller", "org", "event", "student", "students"], messages: [], activations: [], fragments: false },
  4: { lifelines: ["daniel", "ui", "controller", "org", "event", "student", "students"], messages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], activations: [1, 2, 3, 4, 5, 6, 7, 8, 9], fragments: false },
  5: { lifelines: ["daniel", "ui", "controller", "org", "event", "student", "students"], messages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], activations: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], fragments: false },
  6: { lifelines: ["daniel", "ui", "controller", "org", "event", "student", "students"], messages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], activations: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], fragments: true },
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

// Activation bars showing when objects are active
interface ActivationBar {
  id: number;
  lifelineId: string;
  startY: number;
  endY: number;
}

const activationBars: ActivationBar[] = [
  // Daniel's activations
  { id: 1, lifelineId: "daniel", startY: 125, endY: 145 },
  { id: 2, lifelineId: "daniel", startY: 195, endY: 215 },
  // UI activations
  { id: 3, lifelineId: "ui", startY: 125, endY: 175 },
  { id: 4, lifelineId: "ui", startY: 195, endY: 400 },
  // Controller activation
  { id: 5, lifelineId: "controller", startY: 155, endY: 175 },
  { id: 6, lifelineId: "controller", startY: 230, endY: 395 },
  // Organization activations
  { id: 7, lifelineId: "org", startY: 265, endY: 300 },
  { id: 8, lifelineId: "org", startY: 355, endY: 370 },
  // Event activations
  { id: 9, lifelineId: "event", startY: 325, endY: 345 },
  { id: 10, lifelineId: "event", startY: 480, endY: 565 },
  // Student activations
  { id: 11, lifelineId: "student", startY: 450, endY: 590 },
  // Students actor activation
  { id: 12, lifelineId: "students", startY: 450, endY: 465 },
];

export function SequenceDiagram({ currentStep }: SequenceDiagramProps) {
  const step = currentStep as keyof typeof stepVisibility | null;
  const visibility = step ? stepVisibility[step] : null;
  const showAll = visibility === null;

  // Track visible elements with staggered animation
  const [visibleLifelines, setVisibleLifelines] = useState<string[]>([]);
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [visibleActivations, setVisibleActivations] = useState<number[]>([]);
  const [showFragment, setShowFragment] = useState(false);

  useEffect(() => {
    if (showAll) {
      // Show all immediately
      setVisibleLifelines(lifelines.map(l => l.id));
      setVisibleMessages(messages.map(m => m.id));
      setVisibleActivations(activationBars.map(a => a.id));
      setShowFragment(true);
      return;
    }

    if (!visibility) {
      setVisibleLifelines([]);
      setVisibleMessages([]);
      setVisibleActivations([]);
      setShowFragment(false);
      return;
    }

    // Reset and animate in sequence
    setVisibleLifelines([]);
    setVisibleMessages([]);
    setVisibleActivations([]);
    setShowFragment(false);

    // Stagger lifelines
    visibility.lifelines.forEach((id, index) => {
      setTimeout(() => {
        setVisibleLifelines(prev => [...prev, id]);
      }, index * 80);
    });

    // Stagger messages after lifelines
    const messageDelay = visibility.lifelines.length * 80 + 200;
    visibility.messages.forEach((id, index) => {
      setTimeout(() => {
        setVisibleMessages(prev => [...prev, id]);
      }, messageDelay + index * 120);
    });

    // Stagger activations with messages
    visibility.activations.forEach((id, index) => {
      setTimeout(() => {
        setVisibleActivations(prev => [...prev, id]);
      }, messageDelay + index * 100);
    });

    // Show fragment last
    if (visibility.fragments) {
      setTimeout(() => {
        setShowFragment(true);
      }, messageDelay + visibility.messages.length * 120 + 200);
    }
  }, [step, showAll, visibility]);

  const getLifelineX = (id: string) => lifelines.find(l => l.id === id)?.x || 0;
  const getLifelineColor = (id: string) => lifelines.find(l => l.id === id)?.color || "#22d3ee";

  const isLifelineVisible = (id: string) => visibleLifelines.includes(id);
  const isMessageVisible = (id: number) => visibleMessages.includes(id);
  const isActivationVisible = (id: number) => visibleActivations.includes(id);

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
        @keyframes drawLine {
          from {
            stroke-dashoffset: 500;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes growBar {
          from {
            transform: scaleY(0);
          }
          to {
            transform: scaleY(1);
          }
        }
        .animate-fade-in {
          animation: fadeSlideIn 0.4s ease-out forwards;
        }
        .animate-draw {
          stroke-dasharray: 500;
          animation: drawLine 0.5s ease-out forwards;
        }
        .animate-grow {
          transform-origin: top;
          animation: growBar 0.3s ease-out forwards;
        }
      `}</style>
      <div className="w-full overflow-x-auto">
        <svg
          viewBox="0 0 900 680"
          className="w-full min-w-[700px] h-auto"
          style={{ minHeight: "550px" }}
        >
          <rect width="900" height="680" fill="#131318" rx="8" />

          <text x="450" y="30" textAnchor="middle" className="fill-foreground text-sm font-semibold">
            Sequence Diagram: Event Creation and RSVP (Scenario 2)
          </text>

          {/* Lifelines */}
          {lifelines.map((lifeline) => {
            const visible = isLifelineVisible(lifeline.id);
            const boxWidth = lifeline.id === "controller" ? 100 : 70;

            return (
              <g
                key={lifeline.id}
                className={visible ? "animate-fade-in" : ""}
                style={{ opacity: visible ? 1 : 0.08 }}
              >
                <rect
                  x={lifeline.x - boxWidth / 2}
                  y="50"
                  width={boxWidth}
                  height="36"
                  rx="4"
                  fill="#1e1e26"
                  stroke={lifeline.color}
                  strokeWidth="2"
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

          {/* Activation Bars */}
          {activationBars.map((bar) => {
            const visible = isActivationVisible(bar.id);
            const x = getLifelineX(bar.lifelineId);
            const color = getLifelineColor(bar.lifelineId);
            const height = bar.endY - bar.startY;

            return (
              <rect
                key={`activation-${bar.id}`}
                x={x - 5}
                y={bar.startY}
                width={10}
                height={height}
                fill={color}
                opacity={visible ? 0.6 : 0.05}
                className={visible ? "animate-grow" : ""}
                style={{
                  transition: "opacity 0.3s ease-out",
                }}
              />
            );
          })}

          {/* Messages */}
          {messages.map((msg) => {
            const fromX = getLifelineX(msg.from);
            const toX = getLifelineX(msg.to);
            const visible = isMessageVisible(msg.id);
            const isSelfCall = msg.from === msg.to;

            return (
              <g
                key={msg.id}
                style={{ opacity: visible ? 1 : 0.05 }}
              >
                {isSelfCall ? (
                  <>
                    <path
                      d={`M ${fromX + 5} ${msg.y} L ${fromX + 35} ${msg.y} L ${fromX + 35} ${msg.y + 20} L ${fromX + 5} ${msg.y + 20}`}
                      fill="none"
                      stroke="#e4e4e7"
                      strokeWidth="1.5"
                      markerEnd="url(#arrowhead)"
                      className={visible ? "animate-draw" : ""}
                    />
                    <text
                      x={fromX + 45}
                      y={msg.y + 5}
                      className={`text-xs fill-muted-foreground ${visible ? "animate-fade-in" : ""}`}
                      style={{ opacity: visible ? 1 : 0 }}
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
                      stroke="#e4e4e7"
                      strokeWidth="1.5"
                      strokeDasharray={msg.isReturn ? "4,2" : "none"}
                      markerEnd="url(#arrowhead)"
                      className={visible ? "animate-draw" : ""}
                    />
                    <text
                      x={(fromX + toX) / 2}
                      y={msg.y - 6}
                      textAnchor="middle"
                      className={`text-xs fill-muted-foreground ${visible ? "animate-fade-in" : ""}`}
                      style={{ opacity: visible ? 1 : 0 }}
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
            style={{ opacity: showFragment ? 1 : 0.05 }}
            className={showFragment ? "animate-fade-in" : ""}
          >
            <rect 
              x="35" y="420" width="830" height="190" 
              fill="none" 
              stroke="#71717a"
              strokeWidth="1.5"
              rx="4" 
            />
            <rect 
              x="35" y="420" width="60" height="20" 
              fill="#27272a" 
              stroke="#71717a"
              strokeWidth="1.5"
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
            <rect x="160" y="2" width="8" height="10" fill="#22d3ee" opacity="0.6" />
            <text x="175" y="10" className="fill-muted-foreground text-xs">Activation</text>
            <line x1="260" y1="6" x2="290" y2="6" stroke="#e4e4e7" strokeWidth="1.5" />
            <text x="298" y="10" className="fill-muted-foreground text-xs">Message</text>
            <line x1="370" y1="6" x2="400" y2="6" stroke="#e4e4e7" strokeWidth="1.5" strokeDasharray="4,2" />
            <text x="408" y="10" className="fill-muted-foreground text-xs">Return</text>
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
