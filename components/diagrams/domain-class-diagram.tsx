"use client";

import { useState } from "react";

interface ClassInfo {
  id: string;
  name: string;
  stereotype?: string;
  attributes: string[];
  methods: string[];
  description: string;
  x: number;
  y: number;
  width: number;
  color: string;
}

const classes: ClassInfo[] = [
  {
    id: "eventController",
    name: "EventController",
    stereotype: "controller",
    attributes: ["- currentOrg: Organization"],
    methods: ["+ getEventForm(): Form", "+ createEvent(details): Event", "+ validateOfficer(s: Student): bool", "+ handleRSVP(s: Student, e: Event)", "+ cancelRSVP(s: Student, e: Event)"],
    description: "Controller class that handles event-related operations. Mediates between the UI and domain objects.",
    x: 50, y: 60, width: 200, color: "#f59e0b"
  },
  {
    id: "organization",
    name: "Organization",
    attributes: ["- name: String", "- orgId: String", "- description: String", "- president: Student", "- events: List<Event>"],
    methods: ["+ addEvent(e: Event): void", "+ isOfficer(s: Student): bool"],
    description: "Represents a campus organization. Manages its events and validates officer permissions.",
    x: 375, y: 60, width: 200, color: "#22d3ee"
  },
  {
    id: "event",
    name: "Event",
    attributes: ["- title: String", "- description: String", "- date: Date", "- location: String", "- capacity: int", "- attendees: List<Student>"],
    methods: ["+ rsvp(s: Student): bool", "+ checkCapacity(): bool", "+ addAttendee(s: Student): void"],
    description: "An event that can be created by officers and attended by students. Manages its own capacity.",
    x: 700, y: 60, width: 200, color: "#10b981"
  },
  {
    id: "student",
    name: "Student",
    attributes: ["- name: String", "- gtId: String", "- email: String", "- major: String", "- rsvps: List<RSVP>"],
    methods: ["+ viewEvent(): Event", "+ makeRSVP(e: Event): RSVP", "+ cancelRSVP(e: Event): void"],
    description: "A GT student who can view events, RSVP to attend, and manage their registrations.",
    x: 50, y: 320, width: 200, color: "#3b82f6"
  },
  {
    id: "rsvp",
    name: "RSVP",
    attributes: ["- student: Student", "- event: Event", "- rsvpDate: Date", "- status: String"],
    methods: ["+ cancel(): void"],
    description: "Association class that represents a student's registration for an event.",
    x: 375, y: 350, width: 200, color: "#ec4899"
  },
];

const scenarioSteps = [
  { classes: ["student"], description: "Daniel (a Student) wants to create an event" },
  { classes: ["student", "eventController"], description: "Daniel interacts with the EventController through the UI" },
  { classes: ["eventController", "organization"], description: "EventController validates Daniel is an officer of the Organization" },
  { classes: ["eventController", "event"], description: "EventController creates a new Event object" },
  { classes: ["organization", "event"], description: "The Event is added to the Organization's event list" },
  { classes: ["student", "rsvp", "event"], description: "Other students can now RSVP to the Event" },
];

export function DomainClassDiagram() {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [scenarioStep, setScenarioStep] = useState<number | null>(null);
  const [showMethods, setShowMethods] = useState(true);

  const highlightedClasses = scenarioStep !== null ? scenarioSteps[scenarioStep].classes : [];

  return (
    <div className="w-full space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4 rounded-lg bg-card p-4 border border-border">
        <div className="flex items-center gap-2">
          <label className="text-sm text-muted-foreground">Walk through Scenario 2:</label>
          <div className="flex gap-1">
            {scenarioSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => setScenarioStep(scenarioStep === index ? null : index)}
                className={`h-8 w-8 rounded-md text-sm font-medium transition-all ${
                  scenarioStep === index
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          {scenarioStep !== null && (
            <button
              onClick={() => setScenarioStep(null)}
              className="ml-2 text-xs text-muted-foreground hover:text-foreground"
            >
              Reset
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-muted-foreground">Show methods:</label>
          <button
            onClick={() => setShowMethods(!showMethods)}
            className={`h-6 w-10 rounded-full transition-colors ${showMethods ? "bg-primary" : "bg-muted"}`}
          >
            <span
              className={`block h-5 w-5 rounded-full bg-white shadow transition-transform ${
                showMethods ? "translate-x-4" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Info Panel */}
      {(selectedClass || scenarioStep !== null) && (
        <div className="rounded-lg bg-accent/50 border border-accent p-4 transition-all">
          {scenarioStep !== null && (
            <div className="mb-2">
              <span className="inline-block rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary mb-1">
                Step {scenarioStep + 1} of {scenarioSteps.length}
              </span>
              <p className="text-sm font-medium text-foreground">
                {scenarioSteps[scenarioStep].description}
              </p>
            </div>
          )}
          {selectedClass && (
            <div>
              <h4 className="font-semibold text-foreground mb-1">
                {classes.find(c => c.id === selectedClass)?.name}
                {classes.find(c => c.id === selectedClass)?.stereotype && (
                  <span className="ml-2 text-xs text-muted-foreground">
                    {"<<" + classes.find(c => c.id === selectedClass)?.stereotype + ">>"}
                  </span>
                )}
              </h4>
              <p className="text-sm text-muted-foreground">
                {classes.find(c => c.id === selectedClass)?.description}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Diagram */}
      <div className="w-full overflow-x-auto">
        <svg
          viewBox="0 0 950 620"
          className="w-full min-w-[750px] h-auto"
          style={{ minHeight: "500px" }}
        >
          <rect width="950" height="620" fill="#131318" rx="8" />

          <text x="475" y="35" textAnchor="middle" className="fill-foreground text-base font-semibold">
            Domain Class Diagram: CampusConnect (Scenario 2 Focus)
          </text>

          {/* Relationships (drawn first) */}
          {/* EventController - Organization */}
          <g opacity={scenarioStep === null || highlightedClasses.includes("eventController") && highlightedClasses.includes("organization") ? 1 : 0.2}>
            <line x1="250" y1="137" x2="375" y2="137" stroke="#e4e4e7" strokeWidth="1.5" />
            <text x="310" y="130" textAnchor="middle" className="fill-muted-foreground text-xs">1</text>
            <polygon points="375,137 365,132 365,142" fill="#e4e4e7" />
          </g>

          {/* Organization - Event */}
          <g opacity={scenarioStep === null || highlightedClasses.includes("organization") && highlightedClasses.includes("event") ? 1 : 0.2}>
            <line x1="575" y1="145" x2="700" y2="145" stroke="#e4e4e7" strokeWidth="1.5" />
            <text x="595" y="138" className="fill-muted-foreground text-xs">1</text>
            <text x="680" y="138" className="fill-muted-foreground text-xs">*</text>
            <polygon points="575,145 585,140 595,145 585,150" fill="#e4e4e7" />
            <polygon points="700,145 690,140 690,150" fill="#e4e4e7" />
          </g>

          {/* Student - RSVP */}
          <g opacity={scenarioStep === null || highlightedClasses.includes("student") && highlightedClasses.includes("rsvp") ? 1 : 0.2}>
            <line x1="250" y1="412" x2="375" y2="412" stroke="#e4e4e7" strokeWidth="1.5" />
            <text x="265" y="405" className="fill-muted-foreground text-xs">1</text>
            <text x="355" y="405" className="fill-muted-foreground text-xs">*</text>
            <polygon points="375,412 365,407 365,417" fill="#e4e4e7" />
          </g>

          {/* RSVP - Event */}
          <g opacity={scenarioStep === null || highlightedClasses.includes("rsvp") && highlightedClasses.includes("event") ? 1 : 0.2}>
            <line x1="575" y1="412" x2="800" y2="260" stroke="#e4e4e7" strokeWidth="1.5" />
            <text x="595" y="405" className="fill-muted-foreground text-xs">*</text>
            <text x="780" y="280" className="fill-muted-foreground text-xs">1</text>
            <polygon points="800,260 790,260 793,270" fill="#e4e4e7" />
          </g>

          {/* Event - Student (attendees) */}
          <g opacity={scenarioStep === null || highlightedClasses.includes("event") && highlightedClasses.includes("student") ? 1 : 0.2}>
            <path d="M 700 200 Q 500 280 250 412" fill="none" stroke="#e4e4e7" strokeWidth="1.5" strokeDasharray="4,2" />
            <text x="680" y="215" className="fill-muted-foreground text-xs">*</text>
            <text x="270" y="400" className="fill-muted-foreground text-xs">*</text>
            <text x="480" y="295" className="fill-accent text-xs">attendees</text>
          </g>

          {/* Classes */}
          {classes.map((cls) => {
            const isHighlighted = scenarioStep === null || highlightedClasses.includes(cls.id);
            const isSelected = selectedClass === cls.id;
            const attrHeight = cls.attributes.length * 15 + 10;
            const methodHeight = showMethods ? cls.methods.length * 15 + 10 : 0;
            const totalHeight = 30 + attrHeight + methodHeight;

            return (
              <g
                key={cls.id}
                transform={`translate(${cls.x}, ${cls.y})`}
                onMouseEnter={() => setSelectedClass(cls.id)}
                onMouseLeave={() => setSelectedClass(null)}
                className="cursor-pointer"
                opacity={isHighlighted ? 1 : 0.25}
              >
                {/* Glow effect when selected */}
                {isSelected && (
                  <rect
                    x="-4"
                    y="-4"
                    width={cls.width + 8}
                    height={totalHeight + 8}
                    rx="6"
                    fill={cls.color}
                    fillOpacity="0.2"
                    className="animate-pulse"
                  />
                )}
                
                {/* Main box */}
                <rect
                  width={cls.width}
                  height={totalHeight}
                  rx="4"
                  fill={isSelected ? cls.color : "#1e1e26"}
                  fillOpacity={isSelected ? 0.15 : 1}
                  stroke={cls.color}
                  strokeWidth={isSelected ? 3 : 2}
                  className="transition-all duration-200"
                />
                
                {/* Header */}
                <rect width={cls.width} height="30" rx="4" fill={cls.color} fillOpacity="0.2" />
                {cls.stereotype && (
                  <text x={cls.width / 2} y="12" textAnchor="middle" className="fill-muted-foreground text-xs pointer-events-none">
                    {"<<" + cls.stereotype + ">>"}
                  </text>
                )}
                <text
                  x={cls.width / 2}
                  y={cls.stereotype ? 26 : 20}
                  textAnchor="middle"
                  className="fill-foreground text-sm font-semibold pointer-events-none"
                >
                  {cls.name}
                </text>
                
                {/* Divider */}
                <line x1="0" y1="30" x2={cls.width} y2="30" stroke={cls.color} strokeWidth="1" />
                
                {/* Attributes */}
                {cls.attributes.map((attr, i) => (
                  <text
                    key={i}
                    x="10"
                    y={50 + i * 15}
                    className="fill-muted-foreground text-xs pointer-events-none"
                  >
                    {attr}
                  </text>
                ))}
                
                {/* Methods divider and methods */}
                {showMethods && (
                  <>
                    <line x1="0" y1={30 + attrHeight} x2={cls.width} y2={30 + attrHeight} stroke={cls.color} strokeWidth="1" />
                    {cls.methods.map((method, i) => (
                      <text
                        key={i}
                        x="10"
                        y={30 + attrHeight + 20 + i * 15}
                        className="fill-muted-foreground text-xs pointer-events-none"
                      >
                        {method}
                      </text>
                    ))}
                  </>
                )}
              </g>
            );
          })}

          {/* Legend */}
          <g transform="translate(50, 540)">
            <text x="0" y="0" className="fill-foreground text-sm font-semibold">Legend:</text>
            <line x1="0" y1="20" x2="30" y2="20" stroke="#e4e4e7" strokeWidth="1.5" />
            <polygon points="30,20 20,15 20,25" fill="#e4e4e7" />
            <text x="40" y="25" className="fill-muted-foreground text-xs">Association</text>
            <polygon points="130,20 140,15 150,20 140,25" fill="#e4e4e7" />
            <text x="160" y="25" className="fill-muted-foreground text-xs">Composition</text>
            <line x1="250" y1="20" x2="280" y2="20" stroke="#e4e4e7" strokeWidth="1.5" strokeDasharray="4,2" />
            <text x="290" y="25" className="fill-muted-foreground text-xs">Dependency</text>
          </g>

          {/* Visibility Legend */}
          <g transform="translate(450, 540)">
            <text x="0" y="0" className="fill-foreground text-sm font-semibold">Visibility:</text>
            <text x="0" y="25" className="fill-muted-foreground text-xs">+ public</text>
            <text x="70" y="25" className="fill-muted-foreground text-xs">- private</text>
          </g>

          {/* Note */}
          <g transform="translate(600, 540)">
            <text x="0" y="0" className="fill-accent text-xs">Walk through the scenario steps above!</text>
          </g>
        </svg>
      </div>
    </div>
  );
}
