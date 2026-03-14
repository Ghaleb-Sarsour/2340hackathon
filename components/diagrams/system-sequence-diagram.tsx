"use client";

import { useEffect, useState } from "react";

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
  1: { actor: false, system: false, messages: [], showResponses: false },
  2: { actor: true, system: false, messages: [], showResponses: false },
  3: { actor: true, system: true, messages: [], showResponses: false },
  4: { actor: true, system: true, messages: [1, 2, 3, 4, 5], showResponses: false },
  5: { actor: true, system: true, messages: [1, 2, 3, 4, 5], showResponses: true },
  6: { actor: true, system: true, messages: [1, 2, 3, 4, 5], showResponses: true },
};

export function SystemSequenceDiagram({ currentStep }: SystemSequenceDiagramProps) {
  const step = currentStep as keyof typeof stepVisibility | null;
  const visibility = step ? stepVisibility[step] : null;
  const showAll = visibility === null;

  // Track visible elements with staggered animation
  const [showActor, setShowActor] = useState(false);
  const [showSystem, setShowSystem] = useState(false);
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [visibleResponses, setVisibleResponses] = useState<number[]>([]);

  useEffect(() => {
    if (showAll) {
      // Show all immediately
      setShowActor(true);
      setShowSystem(true);
      setVisibleMessages(messages.map(m => m.id));
      setVisibleResponses(messages.map(m => m.id));
      return;
    }

    if (!visibility) {
      setShowActor(false);
      setShowSystem(false);
      setVisibleMessages([]);
      setVisibleResponses([]);
      return;
    }

    // Reset
    setShowActor(false);
    setShowSystem(false);
    setVisibleMessages([]);
    setVisibleResponses([]);

    // Animate actor
    if (visibility.actor) {
      setTimeout(() => setShowActor(true), 100);
    }

    // Animate system after actor
    if (visibility.system) {
      setTimeout(() => setShowSystem(true), 300);
    }

    // Stagger messages
    const messageDelay = 500;
    visibility.messages.forEach((id, index) => {
      setTimeout(() => {
        setVisibleMessages(prev => [...prev, id]);
      }, messageDelay + index * 150);
    });

    // Stagger responses after messages
    if (visibility.showResponses) {
      const responseDelay = messageDelay + visibility.messages.length * 150 + 200;
      visibility.messages.forEach((id, index) => {
        setTimeout(() => {
          setVisibleResponses(prev => [...prev, id]);
        }, responseDelay + index * 100);
      });
    }
  }, [step, showAll, visibility]);

  const isMessageVisible = (id: number) => visibleMessages.includes(id);
  const isResponseVisible = (id: number) => visibleResponses.includes(id);

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
        .animate-fade-in {
          animation: fadeSlideIn 0.4s ease-out forwards;
        }
        .animate-draw {
          stroke-dasharray: 500;
          animation: drawLine 0.6s ease-out forwards;
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
          <g
            style={{ opacity: showActor ? 1 : 0.08 }}
            className={showActor ? "animate-fade-in" : ""}
          >
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

          {/* System - CampusConnect */}
          <g
            style={{ opacity: showSystem ? 1 : 0.08 }}
            className={showSystem ? "animate-fade-in" : ""}
          >
            <rect 
              x="450" y="60" width="130" height="45" rx="4" 
              fill="#1e1e26"
              stroke="#22d3ee" 
              strokeWidth="2"
            />
            <text x="515" y="87" textAnchor="middle" className="fill-foreground text-sm">:CampusConnect</text>
            <line x1="515" y1="105" x2="515" y2="500" stroke="#22d3ee" strokeDasharray="6,4" strokeWidth="1.5" />
          </g>

          {/* Messages */}
          {messages.map((msg) => {
            const msgVisible = isMessageVisible(msg.id);
            const respVisible = isResponseVisible(msg.id);

            return (
              <g key={msg.id}>
                {/* Request arrow */}
                <g style={{ opacity: msgVisible ? 1 : 0.05 }}>
                  <line 
                    x1="105" y1={msg.y} x2="510" y2={msg.y} 
                    stroke="#e4e4e7"
                    strokeWidth="1.5"
                    markerEnd="url(#arrowhead-ssd)"
                    className={msgVisible ? "animate-draw" : ""}
                  />
                  <text 
                    x="307" y={msg.y - 8} 
                    textAnchor="middle" 
                    className={`text-sm fill-foreground ${msgVisible ? "animate-fade-in" : ""}`}
                    style={{ opacity: msgVisible ? 1 : 0 }}
                  >
                    {msg.id}: {msg.label}
                  </text>
                </g>

                {/* Response arrow */}
                <g style={{ opacity: respVisible ? 1 : 0.05 }}>
                  <line 
                    x1="510" y1={msg.y + 25} x2="105" y2={msg.y + 25} 
                    stroke="#e4e4e7"
                    strokeWidth="1.5"
                    strokeDasharray="4,2" 
                    markerEnd="url(#arrowhead-ssd)"
                    className={respVisible ? "animate-draw" : ""}
                  />
                  <text 
                    x="307" y={msg.y + 42} 
                    textAnchor="middle" 
                    className={`text-xs fill-muted-foreground ${respVisible ? "animate-fade-in" : ""}`}
                    style={{ opacity: respVisible ? 1 : 0 }}
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
