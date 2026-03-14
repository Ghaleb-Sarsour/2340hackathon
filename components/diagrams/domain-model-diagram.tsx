"use client";

import { useState } from "react";

interface Concept {
  id: string;
  name: string;
  attributes: string[];
  description: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

interface Association {
  id: string;
  from: string;
  to: string;
  label: string;
  fromMultiplicity: string;
  toMultiplicity: string;
  description: string;
}

const concepts: Concept[] = [
  { 
    id: "student", 
    name: "Student", 
    attributes: ["name: String", "gtId: String", "email: String", "major: String"],
    description: "A GT student who can join organizations, attend events, and potentially lead organizations as president.",
    x: 50, y: 80, width: 150, height: 120, color: "#3b82f6"
  },
  { 
    id: "organization", 
    name: "Organization", 
    attributes: ["name: String", "orgId: String", "description: String"],
    description: "A campus organization that students can join. Has a president and can host events.",
    x: 375, y: 80, width: 150, height: 105, color: "#22d3ee"
  },
  { 
    id: "event", 
    name: "Event", 
    attributes: ["title: String", "description: String", "date: Date", "location: String", "capacity: Integer"],
    description: "An event hosted by an organization that students can RSVP to attend.",
    x: 700, y: 80, width: 150, height: 135, color: "#10b981"
  },
  { 
    id: "membershipRequest", 
    name: "MembershipRequest", 
    attributes: ["requestDate: Date", "status: String"],
    description: "A pending request from a student to join an organization. Can be approved or rejected.",
    x: 50, y: 320, width: 150, height: 90, color: "#f59e0b"
  },
  { 
    id: "membership", 
    name: "Membership", 
    attributes: ["role: String", "joinDate: Date"],
    description: "Represents a student's membership in an organization with their role (member, officer, etc.).",
    x: 250, y: 320, width: 150, height: 75, color: "#8b5cf6"
  },
  { 
    id: "rsvp", 
    name: "RSVP", 
    attributes: ["rsvpDate: Date", "status: String"],
    description: "A student's registration to attend a specific event. Tracks attendance commitment.",
    x: 500, y: 320, width: 150, height: 75, color: "#ec4899"
  },
];

const associations: Association[] = [
  { id: "student-membership", from: "student", to: "membership", label: "has", fromMultiplicity: "1", toMultiplicity: "*", description: "A student can have multiple memberships in different organizations" },
  { id: "membership-org", from: "membership", to: "organization", label: "belongs to", fromMultiplicity: "*", toMultiplicity: "1", description: "Each membership belongs to exactly one organization" },
  { id: "student-request", from: "student", to: "membershipRequest", label: "submits", fromMultiplicity: "1", toMultiplicity: "*", description: "A student can submit multiple membership requests" },
  { id: "request-org", from: "membershipRequest", to: "organization", label: "for", fromMultiplicity: "*", toMultiplicity: "1", description: "Each request is for joining a specific organization" },
  { id: "org-event", from: "organization", to: "event", label: "hosts", fromMultiplicity: "1..*", toMultiplicity: "*", description: "Organizations can host multiple events" },
  { id: "student-rsvp", from: "student", to: "rsvp", label: "makes", fromMultiplicity: "1", toMultiplicity: "*", description: "A student can RSVP to multiple events" },
  { id: "rsvp-event", from: "rsvp", to: "event", label: "for", fromMultiplicity: "*", toMultiplicity: "1", description: "Each RSVP is for a specific event" },
  { id: "student-president", from: "student", to: "organization", label: "presides over", fromMultiplicity: "0..1", toMultiplicity: "1", description: "A student can be president of at most one organization" },
];

export function DomainModelDiagram() {
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);
  const [selectedAssociation, setSelectedAssociation] = useState<string | null>(null);
  const [highlightMode, setHighlightMode] = useState<"none" | "student" | "organization" | "event">("none");

  const getHighlightedConcepts = () => {
    switch (highlightMode) {
      case "student":
        return ["student", "membership", "membershipRequest", "rsvp"];
      case "organization":
        return ["organization", "membership", "membershipRequest", "event"];
      case "event":
        return ["event", "rsvp", "organization"];
      default:
        return [];
    }
  };

  const highlightedConcepts = getHighlightedConcepts();

  return (
    <div className="w-full space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4 rounded-lg bg-card p-4 border border-border">
        <span className="text-sm text-muted-foreground">Highlight relationships:</span>
        <div className="flex gap-2">
          {[
            { value: "none", label: "All", color: "bg-muted" },
            { value: "student", label: "Student-centric", color: "bg-blue-500" },
            { value: "organization", label: "Org-centric", color: "bg-cyan-500" },
            { value: "event", label: "Event-centric", color: "bg-emerald-500" },
          ].map((mode) => (
            <button
              key={mode.value}
              onClick={() => setHighlightMode(mode.value as typeof highlightMode)}
              className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
                highlightMode === mode.value 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${mode.color}`} />
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* Info Panel */}
      {(selectedConcept || selectedAssociation) && (
        <div className="rounded-lg bg-accent/50 border border-accent p-4 transition-all">
          {selectedConcept && (
            <div>
              <h4 className="font-semibold text-foreground mb-1">
                {concepts.find(c => c.id === selectedConcept)?.name}
              </h4>
              <p className="text-sm text-muted-foreground">
                {concepts.find(c => c.id === selectedConcept)?.description}
              </p>
            </div>
          )}
          {selectedAssociation && (
            <div>
              <h4 className="font-semibold text-foreground mb-1">
                Association: {associations.find(a => a.id === selectedAssociation)?.label}
              </h4>
              <p className="text-sm text-muted-foreground">
                {associations.find(a => a.id === selectedAssociation)?.description}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Diagram */}
      <div className="w-full overflow-x-auto">
        <svg
          viewBox="0 0 900 550"
          className="w-full min-w-[700px] h-auto"
          style={{ minHeight: "450px" }}
        >
          <rect width="900" height="550" fill="#131318" rx="8" />

          <text x="450" y="35" textAnchor="middle" className="fill-foreground text-base font-semibold">
            Domain Model: CampusConnect
          </text>

          {/* Associations (draw first so they're behind) */}
          {associations.map((assoc) => {
            const fromConcept = concepts.find(c => c.id === assoc.from)!;
            const toConcept = concepts.find(c => c.id === assoc.to)!;
            const isHighlighted = highlightMode === "none" || 
              (highlightedConcepts.includes(assoc.from) && highlightedConcepts.includes(assoc.to));
            const isSelected = selectedAssociation === assoc.id;

            // Calculate line positions based on concept positions
            let x1 = fromConcept.x + fromConcept.width / 2;
            let y1 = fromConcept.y + fromConcept.height / 2;
            let x2 = toConcept.x + toConcept.width / 2;
            let y2 = toConcept.y + toConcept.height / 2;

            // Curved path for president relationship
            if (assoc.id === "student-president") {
              return (
                <g
                  key={assoc.id}
                  onMouseEnter={() => setSelectedAssociation(assoc.id)}
                  onMouseLeave={() => setSelectedAssociation(null)}
                  className="cursor-pointer"
                  opacity={isHighlighted ? 1 : 0.2}
                >
                  <path
                    d={`M ${fromConcept.x + fromConcept.width} ${fromConcept.y + 30} Q ${300} ${50} ${toConcept.x} ${toConcept.y + 30}`}
                    fill="none"
                    stroke={isSelected ? "#22d3ee" : "#e4e4e7"}
                    strokeWidth={isSelected ? 2.5 : 1.5}
                    className="transition-all duration-200"
                  />
                  <text x="290" y="55" textAnchor="middle" className="fill-accent text-xs">{assoc.label}</text>
                  <text x="220" y="90" className="fill-muted-foreground text-xs">{assoc.fromMultiplicity}</text>
                  <text x="360" y="75" className="fill-muted-foreground text-xs">{assoc.toMultiplicity}</text>
                </g>
              );
            }

            return (
              <g
                key={assoc.id}
                onMouseEnter={() => setSelectedAssociation(assoc.id)}
                onMouseLeave={() => setSelectedAssociation(null)}
                className="cursor-pointer"
                opacity={isHighlighted ? 1 : 0.2}
              >
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={isSelected ? "#22d3ee" : "#e4e4e7"}
                  strokeWidth={isSelected ? 2.5 : 1.5}
                  className="transition-all duration-200"
                />
                {/* Label */}
                <text
                  x={(x1 + x2) / 2}
                  y={(y1 + y2) / 2 - 8}
                  textAnchor="middle"
                  className="fill-accent text-xs"
                >
                  {assoc.label}
                </text>
                {/* Multiplicities */}
                <text
                  x={x1 + (x2 - x1) * 0.15}
                  y={y1 + (y2 - y1) * 0.15 - 5}
                  className="fill-muted-foreground text-xs"
                >
                  {assoc.fromMultiplicity}
                </text>
                <text
                  x={x2 - (x2 - x1) * 0.15}
                  y={y2 - (y2 - y1) * 0.15 - 5}
                  className="fill-muted-foreground text-xs"
                >
                  {assoc.toMultiplicity}
                </text>
              </g>
            );
          })}

          {/* Concepts */}
          {concepts.map((concept) => {
            const isHighlighted = highlightMode === "none" || highlightedConcepts.includes(concept.id);
            const isSelected = selectedConcept === concept.id;

            return (
              <g
                key={concept.id}
                transform={`translate(${concept.x}, ${concept.y})`}
                onMouseEnter={() => setSelectedConcept(concept.id)}
                onMouseLeave={() => setSelectedConcept(null)}
                className="cursor-pointer"
                opacity={isHighlighted ? 1 : 0.3}
              >
                {/* Card background */}
                <rect
                  width={concept.width}
                  height={concept.height}
                  rx="4"
                  fill={isSelected ? concept.color : "#1e1e26"}
                  fillOpacity={isSelected ? 0.2 : 1}
                  stroke={concept.color}
                  strokeWidth={isSelected ? 3 : 2}
                  className="transition-all duration-200"
                />
                {/* Header */}
                <rect
                  width={concept.width}
                  height="30"
                  rx="4"
                  fill={concept.color}
                  fillOpacity="0.2"
                />
                <text
                  x={concept.width / 2}
                  y="20"
                  textAnchor="middle"
                  className="fill-foreground text-sm font-semibold pointer-events-none"
                >
                  {concept.name}
                </text>
                {/* Divider */}
                <line x1="0" y1="30" x2={concept.width} y2="30" stroke={concept.color} strokeWidth="1" />
                {/* Attributes */}
                {concept.attributes.map((attr, i) => (
                  <text
                    key={i}
                    x="10"
                    y={50 + i * 15}
                    className="fill-muted-foreground text-xs pointer-events-none"
                  >
                    {attr}
                  </text>
                ))}
              </g>
            );
          })}

          {/* Legend */}
          <g transform="translate(50, 470)">
            <text x="0" y="0" className="fill-foreground text-sm font-semibold">Multiplicity:</text>
            <text x="0" y="20" className="fill-muted-foreground text-xs">1 = exactly one</text>
            <text x="120" y="20" className="fill-muted-foreground text-xs">* = zero or more</text>
            <text x="240" y="20" className="fill-muted-foreground text-xs">0..1 = zero or one</text>
            <text x="360" y="20" className="fill-muted-foreground text-xs">1..* = one or more</text>
          </g>

          {/* Constraint note */}
          <g transform="translate(550, 455)">
            <rect width="300" height="50" rx="4" fill="#27272a" stroke="#71717a" strokeWidth="1" strokeDasharray="4,2" />
            <text x="150" y="22" textAnchor="middle" className="fill-muted-foreground text-xs">Constraint: A student cannot be president</text>
            <text x="150" y="38" textAnchor="middle" className="fill-muted-foreground text-xs">of more than one organization at a time.</text>
          </g>

          {/* Interactive hint */}
          <text x="450" y="540" textAnchor="middle" className="fill-accent text-xs">
            Click on concepts and associations to learn more!
          </text>
        </svg>
      </div>
    </div>
  );
}
