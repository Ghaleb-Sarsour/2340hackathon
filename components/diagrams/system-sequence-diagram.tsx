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
  1: { actor: false, system: false, messages: [] as number[], showResponses: false },
  2: { actor: true, system: false, messages: [] as number[], showResponses: false },
  3: { actor: true, system: true, messages: [] as number[], showResponses: false },
  4: { actor: true, system: true, messages: [1, 2, 3, 4, 5], showResponses: false },
  5: { actor: true, system: true, messages: [1, 2, 3, 4, 5], showResponses: true },
  6: { actor: true, system: true, messages: [1, 2, 3, 4, 5], showResponses: true },
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
  
  // Track which elements are currently animating
  const [animatingActor, setAnimatingActor] = useState(false);
  const [animatingSystem, setAnimatingSystem] = useState(false);
  const [animatingMessages, setAnimatingMessages] = useState<Set<number>>(new Set());
  const [animatingResponses, setAnimatingResponses] = useState<Set<number>>(new Set());
  
  // Track previous step
  const prevStepRef = useRef<number | null>(null);

  useEffect(() => {
    if (showAll) {
      // Show all immediately without animation
      setShowActor(true);
      setShowSystem(true);
      setVisibleMessages(new Set(messages.map(m => m.id)));
      setVisibleResponses(new Set(messages.map(m => m.id)));
      setAnimatingActor(false);
      setAnimatingSystem(false);
      setAnimatingMessages(new Set());
      setAnimatingResponses(new Set());
      prevStepRef.current = null;
      return;
    }

    if (!visibility) {
      // Hide all
      setShowActor(false);
      setShowSystem(false);
      setVisibleMessages(new Set());
      setVisibleResponses(new Set());
      setAnimatingActor(false);
      setAnimatingSystem(false);
      setAnimatingMessages(new Set());
      setAnimatingResponses(new Set());
      prevStepRef.current = null;
      return;
    }

    const prevStep = prevStepRef.current;
    const prevVisibility = prevStep ? stepVisibility[prevStep as keyof typeof stepVisibility] : null;
    
    // Determine what's new in this step
    const prevActor = prevVisibility?.actor || false;
    const prevSystem = prevVisibility?.system || false;
    const prevMessages = new Set(prevVisibility?.messages || []);
    const prevResponses = prevVisibility?.showResponses ? new Set(prevVisibility.messages) : new Set<number>();

    const newActor = visibility.actor && !prevActor;
    const newSystem = visibility.system && !prevSystem;
    const newMessages = visibility.messages.filter(id => !prevMessages.has(id));
    const newResponses = visibility.showResponses ? visibility.messages.filter(id => !prevResponses.has(id)) : [];

    // Set previous state immediately (no animation)
    setShowActor(prevActor);
    setShowSystem(prevSystem);
    setVisibleMessages(new Set(prevVisibility?.messages || []));
    setVisibleResponses(prevVisibility?.showResponses ? new Set(prevVisibility.messages) : new Set());
    
    // Clear animating sets
    setAnimatingActor(false);
    setAnimatingSystem(false);
    setAnimatingMessages(new Set());
    setAnimatingResponses(new Set());

    // Animate actor if new
    if (newActor) {
      setTimeout(() => {
        setAnimatingActor(true);
        setShowActor(true);
      }, 100);
      setTimeout(() => setAnimatingActor(false), 600);
    }

    // Animate system if new
    if (newSystem) {
      setTimeout(() => {
        setAnimatingSystem(true);
        setShowSystem(true);
      }, newActor ? 300 : 100);
      setTimeout(() => setAnimatingSystem(false), newActor ? 800 : 600);
    }

    // Stagger new messages
    const messageDelay = (newActor ? 300 : 0) + (newSystem ? 300 : 0) + 200;
    newMessages.forEach((id, index) => {
      setTimeout(() => {
        setAnimatingMessages(prev => new Set([...prev, id]));
        setVisibleMessages(prev => new Set([...prev, id]));
      }, messageDelay + index * 180);
    });

    // Remove message animation class after animation completes
    setTimeout(() => {
      setAnimatingMessages(new Set());
    }, messageDelay + newMessages.length * 180 + 700);

    // Stagger new responses after messages
    if (newResponses.length > 0) {
      const responseDelay = messageDelay + newMessages.length * 180 + 300;
      newResponses.forEach((id, index) => {
        setTimeout(() => {
          setAnimatingResponses(prev => new Set([...prev, id]));
          setVisibleResponses(prev => new Set([...prev, id]));
        }, responseDelay + index * 150);
      });

      // Remove response animation class after animation completes
      setTimeout(() => {
        setAnimatingResponses(new Set());
      }, responseDelay + newResponses.length * 150 + 700);
    }

    prevStepRef.current = step;
  }, [step, showAll, visibility]);

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
        .animate-fade {
          animation: fadeIn 0.4s ease-out forwards;
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
