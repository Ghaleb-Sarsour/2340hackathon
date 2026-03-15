"use client";

import { useEffect, useRef, useState } from "react";

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
  1: { actor: false, system: false, messages: [] as number[], showResponses: false, fragment: false },
  2: { actor: true, system: false, messages: [] as number[], showResponses: false, fragment: false },
  3: { actor: true, system: true, messages: [] as number[], showResponses: false, fragment: false },
  4: { actor: true, system: true, messages: [1, 2, 3, 4, 5], showResponses: false, fragment: false },
  5: { actor: true, system: true, messages: [1, 2, 3, 4, 5], showResponses: true, fragment: false },
  6: { actor: true, system: true, messages: [1, 2, 3, 4, 5], showResponses: true, fragment: true },
};

export function SystemSequenceDiagram({ currentStep }: SystemSequenceDiagramProps) {
  const step = currentStep as keyof typeof stepVisibility | null;
  const visibility = step ? stepVisibility[step] : null;
  const showAll = visibility === null;

  // Track visible elements
  const [showActor, setShowActor] = useState(false);
  const [showSystem, setShowSystem] = useState(false);
  const [visibleMessages, setVisibleMessages] = useState<Set<number>>(new Set());
  const [visibleResponses, setVisibleResponses] = useState<Set<number>>(new Set());
  const [showFragment, setShowFragment] = useState(false);
  
  // Track which elements are currently animating
  const [animatingActor, setAnimatingActor] = useState(false);
  const [animatingSystem, setAnimatingSystem] = useState(false);
  const [animatingMessages, setAnimatingMessages] = useState<Set<number>>(new Set());
  const [animatingResponses, setAnimatingResponses] = useState<Set<number>>(new Set());
  const [animatingFragment, setAnimatingFragment] = useState(false);
  
  // Track previous step
  const prevStepRef = useRef<number | null>(null);
  const timeoutsRef = useRef<number[]>([]);

  useEffect(() => {
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];

    const schedule = (fn: () => void, delayMs: number) => {
      const id = window.setTimeout(fn, delayMs);
      timeoutsRef.current.push(id);
      return id;
    };

    if (showAll) {
      // Show all immediately without animation
      setShowActor(true);
      setShowSystem(true);
      setVisibleMessages(new Set(messages.map(m => m.id)));
      setVisibleResponses(new Set(messages.map(m => m.id)));
      setShowFragment(true);
      setAnimatingActor(false);
      setAnimatingSystem(false);
      setAnimatingMessages(new Set());
      setAnimatingResponses(new Set());
      setAnimatingFragment(false);
      prevStepRef.current = null;
      return;
    }

    if (!visibility) {
      // Hide all
      setShowActor(false);
      setShowSystem(false);
      setVisibleMessages(new Set());
      setVisibleResponses(new Set());
      setShowFragment(false);
      setAnimatingActor(false);
      setAnimatingSystem(false);
      setAnimatingMessages(new Set());
      setAnimatingResponses(new Set());
      setAnimatingFragment(false);
      prevStepRef.current = null;
      return;
    }

    const prevStep = prevStepRef.current;
    const prevVisibility = prevStep ? stepVisibility[prevStep as keyof typeof stepVisibility] : null;
    
    // Determine what's new in this step
    const prevActor = prevVisibility?.actor || false;
    const prevSystem = prevVisibility?.system || false;
    const prevFragment = prevVisibility?.fragment || false;
    const prevMessages = new Set(prevVisibility?.messages || []);
    const prevResponses = prevVisibility?.showResponses ? new Set(prevVisibility.messages) : new Set<number>();

    const newActor = visibility.actor && !prevActor;
    const newSystem = visibility.system && !prevSystem;
    const newFragment = visibility.fragment && !prevFragment;
    const newMessages = visibility.messages.filter(id => !prevMessages.has(id));
    const newResponses = visibility.showResponses ? visibility.messages.filter(id => !prevResponses.has(id)) : [];

    // Set previous state immediately (no animation)
    setShowActor(prevActor);
    setShowSystem(prevSystem);
    setVisibleMessages(new Set(prevVisibility?.messages || []));
    setVisibleResponses(prevVisibility?.showResponses ? new Set(prevVisibility.messages) : new Set());
    setShowFragment(prevFragment);
    
    // Clear animating sets
    setAnimatingActor(false);
    setAnimatingSystem(false);
    setAnimatingMessages(new Set());
    setAnimatingResponses(new Set());
    setAnimatingFragment(false);

    // Animate actor if new
    if (newActor) {
      schedule(() => {
        setAnimatingActor(true);
        setShowActor(true);
      }, 100);
      schedule(() => setAnimatingActor(false), 600);
    }

    // Animate system if new
    if (newSystem) {
      schedule(() => {
        setAnimatingSystem(true);
        setShowSystem(true);
      }, newActor ? 300 : 100);
      schedule(() => setAnimatingSystem(false), newActor ? 800 : 600);
    }

    // Stagger new messages
    const messageDelay = (newActor ? 300 : 0) + (newSystem ? 300 : 0) + 200;
    newMessages.forEach((id, index) => {
      schedule(() => {
        setAnimatingMessages(prev => new Set([...prev, id]));
        setVisibleMessages(prev => new Set([...prev, id]));
      }, messageDelay + index * 180);
    });

    // Remove message animation class after animation completes
    schedule(() => {
      setAnimatingMessages(new Set());
    }, messageDelay + newMessages.length * 180 + 700);

    // Stagger new responses after messages
    if (newResponses.length > 0) {
      const responseDelay = messageDelay + newMessages.length * 180 + 300;
      newResponses.forEach((id, index) => {
        schedule(() => {
          setAnimatingResponses(prev => new Set([...prev, id]));
          setVisibleResponses(prev => new Set([...prev, id]));
        }, responseDelay + index * 150);
      });

      // Remove response animation class after animation completes
      schedule(() => {
        setAnimatingResponses(new Set());
      }, responseDelay + newResponses.length * 150 + 700);
    }

    if (newFragment) {
      const fragmentDelay = messageDelay + newMessages.length * 180 + (newResponses.length > 0 ? (300 + newResponses.length * 150) : 0) + 150;
      schedule(() => {
        setAnimatingFragment(true);
        setShowFragment(true);
      }, fragmentDelay);
      schedule(() => setAnimatingFragment(false), fragmentDelay + 600);
    }

    prevStepRef.current = step;
    return () => {
      timeoutsRef.current.forEach((t) => clearTimeout(t));
      timeoutsRef.current = [];
    };
  }, [step, showAll, visibility]);

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
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-slide {
          will-change: transform, opacity;
          animation: fadeSlideIn 0.52s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .animate-draw {
          stroke-dasharray: 500;
          will-change: stroke-dashoffset;
          animation: drawLine 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .animate-fade {
          will-change: opacity;
          animation: fadeIn 0.46s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-slide,
          .animate-draw,
          .animate-fade {
            animation: none !important;
          }
          .animate-draw {
            stroke-dasharray: none !important;
          }
        }
      `}</style>
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
          {showActor && (
            <g className={animatingActor ? "animate-fade-slide" : ""}>
              <circle 
                cx="100" cy="70" r="15" 
                fill="none"
                stroke="#3b82f6" 
                strokeWidth="2"
              />
              <line x1="100" y1="85" x2="100" y2="115" stroke="#3b82f6" strokeWidth="2" />
              <line x1="80" y1="95" x2="120" y2="95" stroke="#3b82f6" strokeWidth="2" />
              <line x1="100" y1="115" x2="80" y2="140" stroke="#3b82f6" strokeWidth="2" />
              <line x1="100" y1="115" x2="120" y2="140" stroke="#3b82f6" strokeWidth="2" />
              <text x="100" y="158" textAnchor="middle" className="fill-foreground text-sm">Priya</text>
              <line x1="100" y1="165" x2="100" y2="500" stroke="#3b82f6" strokeDasharray="6,4" strokeWidth="1.5" />
            </g>
          )}

          {/* System - CampusConnect */}
          {showSystem && (
            <g className={animatingSystem ? "animate-fade-slide" : ""}>
              <rect 
                x="450" y="60" width="130" height="45" rx="4" 
                fill="#1e1e26"
                stroke="#22d3ee" 
                strokeWidth="2"
              />
              <text x="515" y="87" textAnchor="middle" className="fill-foreground text-sm">:CampusConnect</text>
              <line x1="515" y1="105" x2="515" y2="500" stroke="#22d3ee" strokeDasharray="6,4" strokeWidth="1.5" />
            </g>
          )}

          {/* Fragment (optional behavior) */}
          {showFragment && (
            <g className={animatingFragment ? "animate-fade" : ""}>
              <rect 
                x="55" y="345" width="540" height="120" 
                fill="none" 
                stroke="#71717a"
                strokeWidth="1.5"
                rx="4" 
              />
              <rect 
                x="55" y="345" width="60" height="20" 
                fill="#27272a" 
                stroke="#71717a"
                strokeWidth="1.5"
              />
              <text x="85" y="359" textAnchor="middle" className="fill-muted-foreground text-xs font-semibold">opt</text>
              <text x="125" y="359" className="fill-muted-foreground text-xs">[event selected]</text>
            </g>
          )}

          {/* Messages */}
          {messages.map((msg) => {
            const msgVisible = visibleMessages.has(msg.id);
            const respVisible = visibleResponses.has(msg.id);
            const msgAnimating = animatingMessages.has(msg.id);
            const respAnimating = animatingResponses.has(msg.id);

            return (
              <g key={msg.id}>
                {/* Request arrow */}
                {msgVisible && (
                  <g>
                    <line 
                      x1="105" y1={msg.y} x2="510" y2={msg.y} 
                      stroke="#e4e4e7"
                      strokeWidth="1.5"
                      strokeDasharray={msgAnimating ? "500" : "none"}
                      markerEnd="url(#arrowhead-ssd)"
                      className={msgAnimating ? "animate-draw" : ""}
                    />
                    <text 
                      x="307" y={msg.y - 8} 
                      textAnchor="middle" 
                      className={`text-sm fill-foreground ${msgAnimating ? "animate-fade" : ""}`}
                    >
                      {msg.id}: {msg.label}
                    </text>
                  </g>
                )}

                {/* Response arrow */}
                {respVisible && (
                  <g>
                    <line 
                      x1="510" y1={msg.y + 25} x2="105" y2={msg.y + 25} 
                      stroke="#e4e4e7"
                      strokeWidth="1.5"
                      strokeDasharray={respAnimating ? "500" : "4,2"}
                      markerEnd="url(#arrowhead-ssd)"
                      className={respAnimating ? "animate-draw" : ""}
                    />
                    <text 
                      x="307" y={msg.y + 42} 
                      textAnchor="middle" 
                      className={`text-xs fill-muted-foreground ${respAnimating ? "animate-fade" : ""}`}
                    >
                      {msg.response}
                    </text>
                  </g>
                )}
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
