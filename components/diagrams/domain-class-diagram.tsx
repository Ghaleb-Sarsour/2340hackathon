"use client";

import { useRef, useEffect, useState } from "react";

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
  1: { classes: ["student", "organization", "event"], showAttributes: false, showMethods: false, relationships: false, navigability: false },
  2: { classes: ["student", "eventController", "organization", "event", "rsvp"], showAttributes: false, showMethods: false, relationships: false, navigability: false },
  3: { classes: ["student", "eventController", "organization", "event", "rsvp"], showAttributes: true, showMethods: false, relationships: false, navigability: false },
  4: { classes: ["student", "eventController", "organization", "event", "rsvp"], showAttributes: true, showMethods: true, relationships: false, navigability: false },
  5: { classes: ["student", "eventController", "organization", "event", "rsvp"], showAttributes: true, showMethods: true, relationships: true, navigability: false },
  6: { classes: ["student", "eventController", "organization", "event", "rsvp"], showAttributes: true, showMethods: true, relationships: true, navigability: true },
};

export function DomainClassDiagram({ currentStep }: DomainClassDiagramProps) {
  const step = currentStep as keyof typeof stepVisibility | null;
  const visibility = step ? stepVisibility[step] : null;
  const showAll = visibility === null;
  const prevStepRef = useRef<number | null>(null);
  const [animatingElements, setAnimatingElements] = useState<Set<string>>(new Set());
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (step === null) {
      setAnimatingElements(new Set());
      prevStepRef.current = null;
      return;
    }

    const prevStep = prevStepRef.current;
    const newAnimating = new Set<string>();

    if (prevStep === null || step > prevStep) {
      const current = stepVisibility[step];
      const prev = prevStep ? stepVisibility[prevStep as keyof typeof stepVisibility] : { classes: [] as string[], showAttributes: false, showMethods: false, relationships: false, navigability: false };

      current.classes.forEach(id => {
        if (!prev.classes.includes(id)) newAnimating.add(`class-${id}`);
      });
      if (current.relationships && !prev.relationships) newAnimating.add("relationships");
      if (current.showAttributes && !prev.showAttributes) newAnimating.add("attributes");
      if (current.showMethods && !prev.showMethods) newAnimating.add("methods");
      if (current.navigability && !prev.navigability) newAnimating.add("navigability");
    }

    setAnimatingElements(newAnimating);
    prevStepRef.current = step;

    if (newAnimating.size > 0) {
      const CLASS_MS = 520;
      const LINE_MS = 700;
      const ATTR_MS = 460;
      const METHODS_MS = 460;
      const NAV_MS = 460;
      const CLASS_STAGGER = 100;
      const ATTR_DELAY = 160;
      const ATTR_STAGGER = 45;
      const METHODS_DELAY = 160;
      const METHODS_STAGGER = 45;

      let maxMs = 0;
      for (const key of newAnimating) {
        if (key.startsWith("class-")) {
          const id = key.slice("class-".length);
          const idx = classes.findIndex(c => c.id === id);
          const delay = Math.max(0, idx) * CLASS_STAGGER;
          maxMs = Math.max(maxMs, delay + CLASS_MS);
          continue;
        }

        if (key === "relationships") {
          // Longest relationship line has a built-in delay in markup (~400ms)
          maxMs = Math.max(maxMs, 420 + LINE_MS);
          continue;
        }

        if (key === "attributes") {
          const current = stepVisibility[step];
          const maxDelay = current.classes.reduce((acc, id) => {
            const idx = classes.findIndex(c => c.id === id);
            return Math.max(acc, ATTR_DELAY + Math.max(0, idx) * ATTR_STAGGER);
          }, 0);
          maxMs = Math.max(maxMs, maxDelay + ATTR_MS);
          continue;
        }

        if (key === "methods") {
          const current = stepVisibility[step];
          const maxDelay = current.classes.reduce((acc, id) => {
            const idx = classes.findIndex(c => c.id === id);
            return Math.max(acc, METHODS_DELAY + Math.max(0, idx) * METHODS_STAGGER);
          }, 0);
          maxMs = Math.max(maxMs, maxDelay + METHODS_MS);
          continue;
        }

        if (key === "navigability") {
          maxMs = Math.max(maxMs, 160 + NAV_MS);
          continue;
        }
      }

      timerRef.current = window.setTimeout(() => {
        setAnimatingElements(new Set());
        timerRef.current = null;
      }, Math.max(650, maxMs + 80));
    }
  }, [step]);

  const isClassVisible = (id: string) => showAll || (visibility?.classes.includes(id) ?? false);
  const showRelationships = showAll || (visibility?.relationships ?? false);
  const showAttributes = showAll || (visibility?.showAttributes ?? false);
  const showMethods = showAll || (visibility?.showMethods ?? false);
  const showNavigability = showAll || (visibility?.navigability ?? false);
  const isAnimating = (key: string) => animatingElements.has(key);

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
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
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
        .animate-fade-slide {
          will-change: transform, opacity;
          animation: fadeSlideIn 0.52s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .animate-fade {
          will-change: opacity;
          animation: fadeIn 0.46s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .animate-draw {
          stroke-dasharray: 500;
          will-change: stroke-dashoffset;
          animation: drawLine 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-slide,
          .animate-fade,
          .animate-draw {
            animation: none !important;
          }
          .animate-draw {
            stroke-dasharray: none !important;
          }
        }
      `}</style>
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
          {showRelationships && (
            <g>
              {/* EventController - Organization */}
              <line
                x1="220" y1="110" x2="300" y2="110"
                stroke="#71717a"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray={isAnimating("relationships") ? "500" : "none"}
                className={isAnimating("relationships") ? "animate-draw" : ""}
              />
              {showNavigability && (
                <polygon points="300,110 290,105 290,115" fill="#71717a" className={isAnimating("navigability") ? "animate-fade" : ""} />
              )}
              <text x="260" y="100" textAnchor="middle" className="fill-muted-foreground text-xs">1</text>

              {/* Organization - Event */}
              <line
                x1="450" y1="110" x2="530" y2="110"
                stroke="#71717a"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray={isAnimating("relationships") ? "500" : "none"}
                className={isAnimating("relationships") ? "animate-draw" : ""}
                style={isAnimating("relationships") ? { animationDelay: "100ms" } : undefined}
              />
              {showNavigability && (
                <g className={isAnimating("navigability") ? "animate-fade" : ""} style={isAnimating("navigability") ? { animationDelay: "120ms" } : undefined}>
                  <polygon points="450,110 460,105 460,115" fill="#71717a" />
                  <polygon points="530,110 520,105 520,115" fill="#71717a" />
                </g>
              )}
              <text x="465" y="100" className="fill-muted-foreground text-xs">1</text>
              <text x="515" y="100" className="fill-muted-foreground text-xs">*</text>

              {/* Student - RSVP */}
              <line
                x1="200" y1="370" x2="300" y2="370"
                stroke="#71717a"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray={isAnimating("relationships") ? "500" : "none"}
                className={isAnimating("relationships") ? "animate-draw" : ""}
                style={isAnimating("relationships") ? { animationDelay: "200ms" } : undefined}
              />
              {showNavigability && (
                <polygon points="300,370 290,365 290,375" fill="#71717a" className={isAnimating("navigability") ? "animate-fade" : ""} style={isAnimating("navigability") ? { animationDelay: "220ms" } : undefined} />
              )}
              <text x="215" y="360" className="fill-muted-foreground text-xs">1</text>
              <text x="285" y="360" className="fill-muted-foreground text-xs">*</text>

              {/* RSVP - Event */}
              <line
                x1="450" y1="370" x2="610" y2="220"
                stroke="#71717a"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray={isAnimating("relationships") ? "500" : "none"}
                className={isAnimating("relationships") ? "animate-draw" : ""}
                style={isAnimating("relationships") ? { animationDelay: "300ms" } : undefined}
              />
              {showNavigability && (
                <polygon points="610,220 600,222 603,232" fill="#71717a" className={isAnimating("navigability") ? "animate-fade" : ""} style={isAnimating("navigability") ? { animationDelay: "320ms" } : undefined} />
              )}
              <text x="465" y="360" className="fill-muted-foreground text-xs">*</text>
              <text x="590" y="240" className="fill-muted-foreground text-xs">1</text>

              {/* Event - Student (attendees - dashed) */}
              <path
                d="M 530 180 Q 400 250 200 300"
                fill="none"
                stroke="#71717a"
                strokeWidth="1.5"
                strokeDasharray={isAnimating("relationships") ? "500" : "4,2"}
                className={isAnimating("relationships") ? "animate-draw" : ""}
                style={isAnimating("relationships") ? { animationDelay: "400ms" } : undefined}
              />
              <text x="380" y="240" className="fill-accent text-xs">attendees</text>
              {showNavigability && (
                <polygon points="200,300 210,296 208,306" fill="#71717a" className={isAnimating("navigability") ? "animate-fade" : ""} style={isAnimating("navigability") ? { animationDelay: "420ms" } : undefined} />
              )}
              <text x="510" y="195" className="fill-muted-foreground text-xs">*</text>
              <text x="215" y="295" className="fill-muted-foreground text-xs">*</text>
            </g>
          )}

          {/* Classes */}
          {classes.map((cls, index) => {
            const visible = isClassVisible(cls.id);
            const animating = isAnimating(`class-${cls.id}`);
            const attrsAnimating = isAnimating("attributes");
            const methodsAnimating = isAnimating("methods");
            
            const attrHeight = cls.attributes.length * 14 + 8;
            const attrSectionHeight = showAttributes ? attrHeight : 0;
            const methodHeight = showMethods ? cls.methods.length * 14 + 8 : 0;
            const headerHeight = cls.stereotype ? 38 : 26;
            const totalHeight = headerHeight + attrSectionHeight + methodHeight;

            if (!visible) return null;

            return (
              <g
                key={cls.id}
                transform={`translate(${cls.x}, ${cls.y})`}
              >
                <g
                  className={animating ? "animate-fade-slide" : ""}
                  style={animating ? { animationDelay: `${index * 100}ms` } : undefined}
                >
                  <rect
                    width={cls.width}
                    height={totalHeight}
                    rx="4"
                    fill="#1e1e26"
                    stroke={cls.color}
                    strokeWidth="2"
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
                  {showAttributes && (
                    <g
                      className={attrsAnimating ? "animate-fade" : ""}
                      style={attrsAnimating ? { animationDelay: `${160 + index * 45}ms` } : undefined}
                    >
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
                    </g>
                  )}

                {/* Methods */}
                  {showMethods && (
                    <g
                      className={methodsAnimating ? "animate-fade" : ""}
                      style={methodsAnimating ? { animationDelay: `${160 + index * 45}ms` } : undefined}
                    >
                    <line x1="0" y1={headerHeight + attrSectionHeight} x2={cls.width} y2={headerHeight + attrSectionHeight} stroke={cls.color} strokeWidth="1" />
                    {cls.methods.map((method, i) => (
                      <text
                        key={i}
                        x="8"
                        y={headerHeight + attrSectionHeight + 14 + i * 14}
                        className="fill-muted-foreground text-xs"
                      >
                        + {method}
                      </text>
                    ))}
                  </g>
                )}
                </g>
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
