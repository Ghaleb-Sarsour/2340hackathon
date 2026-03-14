"use client";

interface DomainClassDiagramProps {
  currentStep?: number | null;
}

interface ClassInfo {
  id: string;
  name: string;
  stereotype?: string;
  attributes: string[];
  methods: string[];
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
    attributes: ["currentOrg: Organization"],
    methods: ["getEventForm()", "createEvent(details)", "validateOfficer(s)", "handleRSVP(s, e)"],
    x: 50, y: 60, width: 170, color: "#f59e0b"
  },
  {
    id: "organization",
    name: "Organization",
    attributes: ["name: String", "orgId: String", "president: Student"],
    methods: ["addEvent(e)", "isOfficer(s): bool"],
    x: 300, y: 60, width: 150, color: "#22d3ee"
  },
  {
    id: "event",
    name: "Event",
    attributes: ["title: String", "date: Date", "capacity: int", "attendees: List"],
    methods: ["rsvp(s): bool", "checkCapacity()", "addAttendee(s)"],
    x: 530, y: 60, width: 160, color: "#10b981"
  },
  {
    id: "student",
    name: "Student",
    attributes: ["name: String", "gtId: String", "email: String"],
    methods: ["viewEvent()", "makeRSVP(e)", "cancelRSVP(e)"],
    x: 50, y: 300, width: 150, color: "#3b82f6"
  },
  {
    id: "rsvp",
    name: "RSVP",
    attributes: ["student: Student", "event: Event", "rsvpDate: Date"],
    methods: ["cancel()"],
    x: 300, y: 320, width: 150, color: "#ec4899"
  },
];

// Map building process steps
const stepVisibility = {
  1: { classes: [], relationships: false }, // Identify classes
  2: { classes: ["student", "eventController", "organization", "event"], relationships: false }, // Core classes
  3: { classes: ["student", "eventController", "organization", "event", "rsvp"], relationships: false }, // All classes
  4: { classes: ["student", "eventController", "organization", "event", "rsvp"], relationships: true }, // Add relationships
  5: { classes: ["student", "eventController", "organization", "event", "rsvp"], relationships: true, showMethods: true }, // Add methods
  6: { classes: ["student", "eventController", "organization", "event", "rsvp"], relationships: true, showMethods: true }, // Review
};

export function DomainClassDiagram({ currentStep }: DomainClassDiagramProps) {
  const step = currentStep as keyof typeof stepVisibility | null;
  const visibility = step ? stepVisibility[step] : null;
  const showAll = visibility === null;

  const isClassVisible = (id: string) => showAll || (visibility?.classes.includes(id) ?? false);
  const showRelationships = showAll || (visibility?.relationships ?? false);
  const showMethods = showAll || ((visibility as { showMethods?: boolean })?.showMethods ?? false);

  const isNewlyAdded = (type: "class" | "relationship" | "methods", id?: string) => {
    if (!step || step === 1) return false;
    const prevStep = (step - 1) as keyof typeof stepVisibility;
    const prev = stepVisibility[prevStep];
    if (type === "class" && id) return !prev.classes.includes(id) && visibility?.classes.includes(id);
    if (type === "relationship") return !prev.relationships && visibility?.relationships;
    if (type === "methods") return !(prev as { showMethods?: boolean }).showMethods && (visibility as { showMethods?: boolean })?.showMethods;
    return false;
  };

  return (
    <div className="w-full">
      <div className="w-full overflow-x-auto">
        <svg
          viewBox="0 0 750 520"
          className="w-full min-w-[600px] h-auto"
          style={{ minHeight: "420px" }}
        >
          <rect width="750" height="520" fill="#131318" rx="8" />

          <text x="375" y="30" textAnchor="middle" className="fill-foreground text-sm font-semibold">
            Domain Class Diagram: CampusConnect (Scenario 2)
          </text>

          {/* Relationships */}
          <g 
            opacity={showRelationships ? 1 : 0.08}
            className={isNewlyAdded("relationship") ? "animate-pulse" : "transition-opacity duration-500"}
          >
            {/* EventController - Organization */}
            <line x1="220" y1="110" x2="300" y2="110" stroke={isNewlyAdded("relationship") ? "#22d3ee" : "#71717a"} strokeWidth={isNewlyAdded("relationship") ? 2.5 : 1.5} />
            <polygon points="300,110 290,105 290,115" fill="#71717a" />
            <text x="260" y="100" textAnchor="middle" className="fill-muted-foreground text-xs">1</text>

            {/* Organization - Event */}
            <line x1="450" y1="110" x2="530" y2="110" stroke={isNewlyAdded("relationship") ? "#22d3ee" : "#71717a"} strokeWidth={isNewlyAdded("relationship") ? 2.5 : 1.5} />
            <polygon points="450,110 460,105 460,115" fill="#71717a" />
            <polygon points="530,110 520,105 520,115" fill="#71717a" />
            <text x="465" y="100" className="fill-muted-foreground text-xs">1</text>
            <text x="515" y="100" className="fill-muted-foreground text-xs">*</text>

            {/* Student - RSVP */}
            <line x1="200" y1="370" x2="300" y2="370" stroke={isNewlyAdded("relationship") ? "#22d3ee" : "#71717a"} strokeWidth={isNewlyAdded("relationship") ? 2.5 : 1.5} />
            <polygon points="300,370 290,365 290,375" fill="#71717a" />
            <text x="215" y="360" className="fill-muted-foreground text-xs">1</text>
            <text x="285" y="360" className="fill-muted-foreground text-xs">*</text>

            {/* RSVP - Event */}
            <line x1="450" y1="370" x2="610" y2="220" stroke={isNewlyAdded("relationship") ? "#22d3ee" : "#71717a"} strokeWidth={isNewlyAdded("relationship") ? 2.5 : 1.5} />
            <polygon points="610,220 600,222 603,232" fill="#71717a" />
            <text x="465" y="360" className="fill-muted-foreground text-xs">*</text>
            <text x="590" y="240" className="fill-muted-foreground text-xs">1</text>

            {/* Event - Student (attendees - dashed) */}
            <path d="M 530 180 Q 400 250 200 300" fill="none" stroke={isNewlyAdded("relationship") ? "#22d3ee" : "#71717a"} strokeWidth={isNewlyAdded("relationship") ? 2 : 1.5} strokeDasharray="4,2" />
            <text x="380" y="240" className="fill-accent text-xs">attendees</text>
            <text x="510" y="195" className="fill-muted-foreground text-xs">*</text>
            <text x="215" y="295" className="fill-muted-foreground text-xs">*</text>
          </g>

          {/* Classes */}
          {classes.map((cls) => {
            const visible = isClassVisible(cls.id);
            const isNew = isNewlyAdded("class", cls.id);
            const methodsNew = isNewlyAdded("methods");
            
            const attrHeight = cls.attributes.length * 14 + 8;
            const methodHeight = showMethods ? cls.methods.length * 14 + 8 : 0;
            const headerHeight = cls.stereotype ? 38 : 26;
            const totalHeight = headerHeight + attrHeight + methodHeight;

            return (
              <g
                key={cls.id}
                transform={`translate(${cls.x}, ${cls.y})`}
                opacity={visible ? 1 : 0.08}
                className={isNew ? "animate-pulse" : "transition-opacity duration-500"}
              >
                <rect
                  width={cls.width}
                  height={totalHeight}
                  rx="4"
                  fill={isNew ? cls.color : "#1e1e26"}
                  fillOpacity={isNew ? 0.2 : 1}
                  stroke={cls.color}
                  strokeWidth={isNew ? 3 : 2}
                />
                {/* Header */}
                <rect width={cls.width} height={headerHeight} rx="4" fill={cls.color} fillOpacity="0.2" />
                {cls.stereotype && (
                  <text x={cls.width / 2} y="14" textAnchor="middle" className="fill-muted-foreground text-xs">
                    {"<<" + cls.stereotype + ">>"}
                  </text>
                )}
                <text
                  x={cls.width / 2}
                  y={cls.stereotype ? 30 : 18}
                  textAnchor="middle"
                  className="fill-foreground text-xs font-semibold"
                >
                  {cls.name}
                </text>
                <line x1="0" y1={headerHeight} x2={cls.width} y2={headerHeight} stroke={cls.color} strokeWidth="1" />
                
                {/* Attributes */}
                {cls.attributes.map((attr, i) => (
                  <text
                    key={i}
                    x="8"
                    y={headerHeight + 14 + i * 14}
                    className="fill-muted-foreground text-xs"
                  >
                    - {attr}
                  </text>
                ))}

                {/* Methods */}
                {showMethods && (
                  <g className={methodsNew ? "animate-pulse" : ""}>
                    <line x1="0" y1={headerHeight + attrHeight} x2={cls.width} y2={headerHeight + attrHeight} stroke={cls.color} strokeWidth="1" />
                    {cls.methods.map((method, i) => (
                      <text
                        key={i}
                        x="8"
                        y={headerHeight + attrHeight + 14 + i * 14}
                        className={`text-xs ${methodsNew ? "fill-accent" : "fill-muted-foreground"}`}
                      >
                        + {method}
                      </text>
                    ))}
                  </g>
                )}
              </g>
            );
          })}

          {/* Legend */}
          <g transform="translate(50, 480)">
            <line x1="0" y1="6" x2="30" y2="6" stroke="#71717a" strokeWidth="1.5" />
            <polygon points="30,6 20,1 20,11" fill="#71717a" />
            <text x="40" y="10" className="fill-muted-foreground text-xs">Association</text>
            <line x1="130" y1="6" x2="160" y2="6" stroke="#71717a" strokeWidth="1.5" strokeDasharray="4,2" />
            <text x="170" y="10" className="fill-muted-foreground text-xs">Dependency</text>
            <text x="270" y="10" className="fill-muted-foreground text-xs">+ public</text>
            <text x="330" y="10" className="fill-muted-foreground text-xs">- private</text>
          </g>
        </svg>
      </div>
    </div>
  );
}
