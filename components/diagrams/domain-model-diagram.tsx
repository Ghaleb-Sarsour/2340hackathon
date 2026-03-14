"use client";

import { useRef, useEffect, useState } from "react";

interface DomainModelDiagramProps {
  currentStep?: number | null;
}

interface Concept {
  id: string;
  name: string;
  attributes: string[];
  x: number;
  y: number;
  width: number;
  color: string;
}

interface Association {
  id: string;
  from: string;
  to: string;
  label: string;
  fromMult: string;
  toMult: string;
}

const concepts: Concept[] = [
  { id: "student", name: "Student", attributes: ["name", "gtId", "email"], x: 50, y: 80, width: 120, color: "#3b82f6" },
  { id: "organization", name: "Organization", attributes: ["name", "orgId", "description"], x: 330, y: 80, width: 120, color: "#22d3ee" },
  { id: "event", name: "Event", attributes: ["title", "date", "location", "capacity"], x: 610, y: 80, width: 120, color: "#10b981" },
  { id: "membershipRequest", name: "MembershipRequest", attributes: ["requestDate", "status"], x: 50, y: 300, width: 140, color: "#f59e0b" },
  { id: "membership", name: "Membership", attributes: ["role", "joinDate"], x: 250, y: 300, width: 120, color: "#8b5cf6" },
  { id: "rsvp", name: "RSVP", attributes: ["rsvpDate", "status"], x: 470, y: 300, width: 100, color: "#ec4899" },
];

const associations: Association[] = [
  { id: "student-membership", from: "student", to: "membership", label: "has", fromMult: "1", toMult: "*" },
  { id: "membership-org", from: "membership", to: "organization", label: "belongs to", fromMult: "*", toMult: "1" },
  { id: "student-request", from: "student", to: "membershipRequest", label: "submits", fromMult: "1", toMult: "*" },
  { id: "request-org", from: "membershipRequest", to: "organization", label: "for", fromMult: "*", toMult: "1" },
  { id: "org-event", from: "organization", to: "event", label: "hosts", fromMult: "1", toMult: "*" },
  { id: "student-rsvp", from: "student", to: "rsvp", label: "makes", fromMult: "1", toMult: "*" },
  { id: "rsvp-event", from: "rsvp", to: "event", label: "for", fromMult: "*", toMult: "1" },
];

// Map building process steps
const stepVisibility = {
  1: { concepts: [], associations: [] },
  2: { concepts: ["student", "organization", "event"], associations: [] },
  3: { concepts: ["student", "organization", "event", "membershipRequest", "membership", "rsvp"], associations: [] },
  4: { concepts: ["student", "organization", "event", "membershipRequest", "membership", "rsvp"], associations: ["student-membership", "membership-org", "org-event"] },
  5: { concepts: ["student", "organization", "event", "membershipRequest", "membership", "rsvp"], associations: ["student-membership", "membership-org", "org-event", "student-request", "request-org", "student-rsvp", "rsvp-event"] },
  6: { concepts: ["student", "organization", "event", "membershipRequest", "membership", "rsvp"], associations: ["student-membership", "membership-org", "org-event", "student-request", "request-org", "student-rsvp", "rsvp-event"] },
};

export function DomainModelDiagram({ currentStep }: DomainModelDiagramProps) {
  const step = currentStep as keyof typeof stepVisibility | null;
  const visibility = step ? stepVisibility[step] : null;
  const showAll = visibility === null;
  const prevStepRef = useRef<number | null>(null);
  const [animatingElements, setAnimatingElements] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (step === null) {
      setAnimatingElements(new Set());
      prevStepRef.current = null;
      return;
    }

    const prevStep = prevStepRef.current;
    const newAnimating = new Set<string>();

    if (prevStep === null || step > prevStep) {
      const current = stepVisibility[step];
      const prev = prevStep ? stepVisibility[prevStep as keyof typeof stepVisibility] : { concepts: [], associations: [] };

      current.concepts.forEach(id => {
        if (!prev.concepts.includes(id)) newAnimating.add(`concept-${id}`);
      });
      current.associations.forEach(id => {
        if (!prev.associations.includes(id)) newAnimating.add(`assoc-${id}`);
      });
    }

    setAnimatingElements(newAnimating);
    prevStepRef.current = step;

    if (newAnimating.size > 0) {
      const timer = setTimeout(() => setAnimatingElements(new Set()), 600);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const isConceptVisible = (id: string) => showAll || (visibility?.concepts.includes(id) ?? false);
  const isAssociationVisible = (id: string) => showAll || (visibility?.associations.includes(id) ?? false);
  const isAnimating = (key: string) => animatingElements.has(key);

  const getConceptCenter = (id: string) => {
    const c = concepts.find(c => c.id === id)!;
    const height = 28 + c.attributes.length * 14 + 8;
    return { x: c.x + c.width / 2, y: c.y + height / 2 };
  };

  return (
    <div className="w-full">
      <style jsx>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes drawLine {
          from { stroke-dashoffset: 500; opacity: 0; }
          to { stroke-dashoffset: 0; opacity: 1; }
        }
        .animate-fade-slide { animation: fadeSlideIn 0.5s ease-out forwards; }
        .animate-draw-line { 
          stroke-dasharray: 500; 
          animation: drawLine 0.6s ease-out forwards; 
        }
      `}</style>
      <div className="w-full overflow-x-auto">
        <svg
          viewBox="0 0 780 480"
          className="w-full min-w-[600px] h-auto"
          style={{ minHeight: "400px" }}
        >
          <rect width="780" height="480" fill="#131318" rx="8" />

          <text x="390" y="30" textAnchor="middle" className="fill-foreground text-sm font-semibold">
            Domain Model: CampusConnect
          </text>

          {/* Associations */}
          {associations.map((assoc) => {
            const from = getConceptCenter(assoc.from);
            const to = getConceptCenter(assoc.to);
            const visible = isAssociationVisible(assoc.id);
            const animating = isAnimating(`assoc-${assoc.id}`);
            const midX = (from.x + to.x) / 2;
            const midY = (from.y + to.y) / 2;

            if (!visible) return null;

            return (
              <g
                key={assoc.id}
                className={animating ? "animate-draw-line" : ""}
                style={animating ? { opacity: 0, animationFillMode: "forwards" } : {}}
              >
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={animating ? "#22d3ee" : "#71717a"}
                  strokeWidth={animating ? 2.5 : 1.5}
                />
                <text
                  x={midX}
                  y={midY - 6}
                  textAnchor="middle"
                  className={`text-xs ${animating ? "fill-accent font-medium" : "fill-muted-foreground"}`}
                >
                  {assoc.label}
                </text>
                <text
                  x={from.x + (to.x - from.x) * 0.15}
                  y={from.y + (to.y - from.y) * 0.15 - 8}
                  className="fill-muted-foreground text-xs"
                >
                  {assoc.fromMult}
                </text>
                <text
                  x={to.x - (to.x - from.x) * 0.15}
                  y={to.y - (to.y - from.y) * 0.15 - 8}
                  className="fill-muted-foreground text-xs"
                >
                  {assoc.toMult}
                </text>
              </g>
            );
          })}

          {/* Concepts */}
          {concepts.map((concept) => {
            const visible = isConceptVisible(concept.id);
            const animating = isAnimating(`concept-${concept.id}`);
            const attrHeight = concept.attributes.length * 14 + 8;
            const totalHeight = 28 + attrHeight;

            if (!visible) return null;

            return (
              <g
                key={concept.id}
                transform={`translate(${concept.x}, ${concept.y})`}
                className={animating ? "animate-fade-slide" : ""}
                style={animating ? { opacity: 0, animationFillMode: "forwards" } : {}}
              >
                <rect
                  width={concept.width}
                  height={totalHeight}
                  rx="4"
                  fill={animating ? concept.color : "#1e1e26"}
                  fillOpacity={animating ? 0.2 : 1}
                  stroke={concept.color}
                  strokeWidth={animating ? 3 : 2}
                />
                {/* Header */}
                <rect width={concept.width} height="26" rx="4" fill={concept.color} fillOpacity="0.2" />
                <text
                  x={concept.width / 2}
                  y="18"
                  textAnchor="middle"
                  className="fill-foreground text-xs font-semibold"
                >
                  {concept.name}
                </text>
                <line x1="0" y1="26" x2={concept.width} y2="26" stroke={concept.color} strokeWidth="1" />
                {/* Attributes */}
                {concept.attributes.map((attr, i) => (
                  <text
                    key={i}
                    x="8"
                    y={42 + i * 14}
                    className="fill-muted-foreground text-xs"
                  >
                    {attr}
                  </text>
                ))}
              </g>
            );
          })}

          {/* Legend */}
          <g transform="translate(50, 440)">
            <text x="0" y="0" className="fill-foreground text-xs font-semibold">Multiplicity:</text>
            <text x="80" y="0" className="fill-muted-foreground text-xs">1 = exactly one</text>
            <text x="180" y="0" className="fill-muted-foreground text-xs">* = zero or more</text>
            <text x="290" y="0" className="fill-muted-foreground text-xs">0..1 = optional</text>
            <text x="400" y="0" className="fill-muted-foreground text-xs">1..* = one or more</text>
          </g>
        </svg>
      </div>
    </div>
  );
}
