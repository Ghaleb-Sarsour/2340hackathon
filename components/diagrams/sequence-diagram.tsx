"use client";

import { useEffect, useRef, useState } from "react";

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
  1: { lifelines: [] as string[], messages: [] as number[], activations: [] as number[], fragments: false },
  // Step 2: start with the external actors only
  2: { lifelines: ["daniel", "students"], messages: [] as number[], activations: [] as number[], fragments: false },
  // Step 3: add system/internal participants
  3: { lifelines: ["daniel", "ui", "controller", "org", "event", "student", "students"], messages: [] as number[], activations: [] as number[], fragments: false },
  // Step 4: add primary messages (leave returns/activations for later)
  4: { lifelines: ["daniel", "ui", "controller", "org", "event", "student", "students"], messages: [1, 2, 3, 4, 5, 7, 8, 10, 11, 12, 13], activations: [] as number[], fragments: false },
  // Step 5: add returns + activation bars
  5: { lifelines: ["daniel", "ui", "controller", "org", "event", "student", "students"], messages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], activations: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], fragments: false },
  6: { lifelines: ["daniel", "ui", "controller", "org", "event", "student", "students"], messages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], activations: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], fragments: true },
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
  { id: 1, lifelineId: "daniel", startY: 125, endY: 145 },
  { id: 2, lifelineId: "daniel", startY: 195, endY: 215 },
  { id: 3, lifelineId: "ui", startY: 125, endY: 175 },
  { id: 4, lifelineId: "ui", startY: 195, endY: 400 },
  { id: 5, lifelineId: "controller", startY: 155, endY: 175 },
  { id: 6, lifelineId: "controller", startY: 230, endY: 395 },
  { id: 7, lifelineId: "org", startY: 265, endY: 300 },
  { id: 8, lifelineId: "org", startY: 355, endY: 370 },
  { id: 9, lifelineId: "event", startY: 325, endY: 345 },
  { id: 10, lifelineId: "event", startY: 480, endY: 565 },
  { id: 11, lifelineId: "student", startY: 450, endY: 590 },
  { id: 12, lifelineId: "students", startY: 450, endY: 465 },
  { id: 13, lifelineId: "students", startY: 575, endY: 590 },
];

export function SequenceDiagram({ currentStep }: SequenceDiagramProps) {
  const step = currentStep as keyof typeof stepVisibility | null;
  const visibility = step ? stepVisibility[step] : null;
  const showAll = visibility === null;

  // Track visible elements
  const [visibleLifelines, setVisibleLifelines] = useState<Set<string>>(new Set());
  const [visibleMessages, setVisibleMessages] = useState<Set<number>>(new Set());
  const [visibleActivations, setVisibleActivations] = useState<Set<number>>(new Set());
  const [showFragment, setShowFragment] = useState(false);
  
  // Track which elements are currently animating (newly added this step)
  const [animatingLifelines, setAnimatingLifelines] = useState<Set<string>>(new Set());
  const [animatingMessages, setAnimatingMessages] = useState<Set<number>>(new Set());
  const [animatingActivations, setAnimatingActivations] = useState<Set<number>>(new Set());
  const [animatingFragment, setAnimatingFragment] = useState(false);
  
  // Track previous step to know what was already visible
  const prevStepRef = useRef<number | null>(null);
  const timeoutsRef = useRef<number[]>([]);

  useEffect(() => {
    // Clear any previously scheduled animations when the step changes quickly
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];

    const schedule = (fn: () => void, delayMs: number) => {
      const id = window.setTimeout(fn, delayMs);
      timeoutsRef.current.push(id);
      return id;
    };

    if (showAll) {
      // Show all immediately without animation
      setVisibleLifelines(new Set(lifelines.map(l => l.id)));
      setVisibleMessages(new Set(messages.map(m => m.id)));
      setVisibleActivations(new Set(activationBars.map(a => a.id)));
      setShowFragment(true);
      setAnimatingLifelines(new Set());
      setAnimatingMessages(new Set());
      setAnimatingActivations(new Set());
      setAnimatingFragment(false);
      prevStepRef.current = null;
      return;
    }

    if (!visibility) {
      // Hide all
      setVisibleLifelines(new Set());
      setVisibleMessages(new Set());
      setVisibleActivations(new Set());
      setShowFragment(false);
      setAnimatingLifelines(new Set());
      setAnimatingMessages(new Set());
      setAnimatingActivations(new Set());
      setAnimatingFragment(false);
      prevStepRef.current = null;
      return;
    }

    const prevStep = prevStepRef.current;
    const prevVisibility = prevStep ? stepVisibility[prevStep as keyof typeof stepVisibility] : null;
    
    // Determine what's new in this step
    const prevLifelines = new Set(prevVisibility?.lifelines || []);
    const prevMessages = new Set(prevVisibility?.messages || []);
    const prevActivations = new Set(prevVisibility?.activations || []);
    const prevFragment = prevVisibility?.fragments || false;

    const newLifelines = visibility.lifelines.filter(id => !prevLifelines.has(id));
    const newMessages = visibility.messages.filter(id => !prevMessages.has(id));
    const newActivations = visibility.activations.filter(id => !prevActivations.has(id));
    const newFragment = visibility.fragments && !prevFragment;

    // Immediately show elements from previous steps (no animation)
    setVisibleLifelines(new Set(prevVisibility?.lifelines || []));
    setVisibleMessages(new Set(prevVisibility?.messages || []));
    setVisibleActivations(new Set(prevVisibility?.activations || []));
    setShowFragment(prevFragment);
    
    // Clear animating sets
    setAnimatingLifelines(new Set());
    setAnimatingMessages(new Set());
    setAnimatingActivations(new Set());
    setAnimatingFragment(false);

    // Animate new lifelines one by one
    newLifelines.forEach((id, index) => {
      schedule(() => {
        setAnimatingLifelines(prev => new Set([...prev, id]));
        setVisibleLifelines(prev => new Set([...prev, id]));
      }, index * 100);
    });

    // Remove lifeline animation class after animation completes
    schedule(() => {
      setAnimatingLifelines(new Set());
    }, newLifelines.length * 100 + 500);

    // Animate new messages after lifelines
    const messageDelay = newLifelines.length * 100 + 200;
    newMessages.forEach((id, index) => {
      schedule(() => {
        setAnimatingMessages(prev => new Set([...prev, id]));
        setVisibleMessages(prev => new Set([...prev, id]));
      }, messageDelay + index * 150);
    });

    // Remove message animation class after animation completes
    schedule(() => {
      setAnimatingMessages(new Set());
    }, messageDelay + newMessages.length * 150 + 600);

    // Animate new activations alongside messages
    newActivations.forEach((id, index) => {
      schedule(() => {
        setAnimatingActivations(prev => new Set([...prev, id]));
        setVisibleActivations(prev => new Set([...prev, id]));
      }, messageDelay + index * 120);
    });

    // Remove activation animation class after animation completes
    schedule(() => {
      setAnimatingActivations(new Set());
    }, messageDelay + newActivations.length * 120 + 400);

    // Animate fragment if new
    if (newFragment) {
      const fragmentDelay = messageDelay + Math.max(newMessages.length * 150, newActivations.length * 120) + 200;
      schedule(() => {
        setAnimatingFragment(true);
        setShowFragment(true);
      }, fragmentDelay);
      
      schedule(() => {
        setAnimatingFragment(false);
      }, fragmentDelay + 500);
    }

    prevStepRef.current = step;
    return () => {
      timeoutsRef.current.forEach((t) => clearTimeout(t));
      timeoutsRef.current = [];
    };
  }, [step, showAll, visibility]);

  const getLifelineX = (id: string) => lifelines.find(l => l.id === id)?.x || 0;
  const getLifelineColor = (id: string) => lifelines.find(l => l.id === id)?.color || "#22d3ee";

  return (
    <div className="w-full">
      <style jsx>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(-15px);
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
            opacity: 0;
          }
          to {
            transform: scaleY(1);
            opacity: 0.6;
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
        .animate-fade-slide {
          animation: fadeSlideIn 0.5s ease-out forwards;
        }
        .animate-draw {
          stroke-dasharray: 500;
          animation: drawLine 0.6s ease-out forwards;
        }
        .animate-grow {
          transform-origin: top;
          animation: growBar 0.4s ease-out forwards;
        }
        .animate-fade {
          animation: fadeIn 0.4s ease-out forwards;
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
            const visible = visibleLifelines.has(lifeline.id);
            const animating = animatingLifelines.has(lifeline.id);
            const boxWidth = lifeline.id === "controller" ? 100 : 70;

            if (!visible) return null;

            return (
              <g
                key={lifeline.id}
                className={animating ? "animate-fade-slide" : ""}
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
            const visible = visibleActivations.has(bar.id);
            const animating = animatingActivations.has(bar.id);
            const x = getLifelineX(bar.lifelineId);
            const color = getLifelineColor(bar.lifelineId);
            const height = bar.endY - bar.startY;

            if (!visible) return null;

            return (
              <rect
                key={`activation-${bar.id}`}
                x={x - 5}
                y={bar.startY}
                width={10}
                height={height}
                fill={color}
                opacity={animating ? undefined : 0.6}
                className={animating ? "animate-grow" : ""}
              />
            );
          })}

          {/* Messages */}
          {messages.map((msg) => {
            const fromX = getLifelineX(msg.from);
            const toX = getLifelineX(msg.to);
            const visible = visibleMessages.has(msg.id);
            const animating = animatingMessages.has(msg.id);
            const isSelfCall = msg.from === msg.to;

            if (!visible) return null;

            return (
              <g key={msg.id}>
                {isSelfCall ? (
                  <>
                    <path
                      d={`M ${fromX + 5} ${msg.y} L ${fromX + 35} ${msg.y} L ${fromX + 35} ${msg.y + 20} L ${fromX + 5} ${msg.y + 20}`}
                      fill="none"
                      stroke="#e4e4e7"
                      strokeWidth="1.5"
                      markerEnd="url(#arrowhead)"
                      className={animating ? "animate-draw" : ""}
                      style={!animating ? { strokeDasharray: "none" } : undefined}
                    />
                    <text
                      x={fromX + 45}
                      y={msg.y + 5}
                      className={`text-xs fill-muted-foreground ${animating ? "animate-fade" : ""}`}
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
                      strokeDasharray={animating ? "500" : (msg.isReturn ? "4,2" : "none")}
                      markerEnd="url(#arrowhead)"
                      className={animating ? "animate-draw" : ""}
                    />
                    <text
                      x={(fromX + toX) / 2}
                      y={msg.y - 6}
                      textAnchor="middle"
                      className={`text-xs fill-muted-foreground ${animating ? "animate-fade" : ""}`}
                    >
                      {msg.label}
                    </text>
                  </>
                )}
              </g>
            );
          })}

          {/* Loop Fragment */}
          {showFragment && (
            <g className={animatingFragment ? "animate-fade" : ""}>
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
          )}

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
