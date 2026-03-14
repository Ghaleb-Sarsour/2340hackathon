"use client";

export function DomainClassDiagram() {
  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox="0 0 950 750"
        className="w-full min-w-[750px] h-auto"
        style={{ minHeight: "600px" }}
      >
        {/* Background */}
        <rect width="950" height="750" fill="#131318" rx="8" />

        {/* Title */}
        <text x="475" y="35" textAnchor="middle" className="fill-foreground text-base font-semibold">
          Domain Class Diagram: CampusConnect (Scenario 2 Focus)
        </text>

        {/* EventController Class */}
        <g transform="translate(50, 60)">
          <rect width="200" height="155" rx="4" fill="#1e1e26" stroke="#f59e0b" strokeWidth="2" />
          <rect width="200" height="30" rx="4" fill="#f59e0b" fillOpacity="0.2" />
          <text x="100" y="20" textAnchor="middle" className="fill-foreground text-sm font-semibold">EventController</text>
          <line x1="0" y1="30" x2="200" y2="30" stroke="#f59e0b" strokeWidth="1" />
          <text x="10" y="50" className="fill-muted-foreground text-xs">- currentOrg: Organization</text>
          <line x1="0" y1="60" x2="200" y2="60" stroke="#f59e0b" strokeWidth="1" />
          <text x="10" y="80" className="fill-muted-foreground text-xs">+ getEventForm(): Form</text>
          <text x="10" y="95" className="fill-muted-foreground text-xs">+ createEvent(details): Event</text>
          <text x="10" y="110" className="fill-muted-foreground text-xs">+ validateOfficer(s: Student): bool</text>
          <text x="10" y="125" className="fill-muted-foreground text-xs">+ handleRSVP(s: Student, e: Event)</text>
          <text x="10" y="140" className="fill-muted-foreground text-xs">+ cancelRSVP(s: Student, e: Event)</text>
        </g>

        {/* Organization Class */}
        <g transform="translate(375, 60)">
          <rect width="200" height="170" rx="4" fill="#1e1e26" stroke="#22d3ee" strokeWidth="2" />
          <rect width="200" height="30" rx="4" fill="#22d3ee" fillOpacity="0.2" />
          <text x="100" y="20" textAnchor="middle" className="fill-foreground text-sm font-semibold">Organization</text>
          <line x1="0" y1="30" x2="200" y2="30" stroke="#22d3ee" strokeWidth="1" />
          <text x="10" y="50" className="fill-muted-foreground text-xs">- name: String</text>
          <text x="10" y="65" className="fill-muted-foreground text-xs">- orgId: String</text>
          <text x="10" y="80" className="fill-muted-foreground text-xs">- description: String</text>
          <text x="10" y="95" className="fill-muted-foreground text-xs">- president: Student</text>
          <text x="10" y="110" className="fill-muted-foreground text-xs">- events: List&lt;Event&gt;</text>
          <line x1="0" y1="120" x2="200" y2="120" stroke="#22d3ee" strokeWidth="1" />
          <text x="10" y="140" className="fill-muted-foreground text-xs">+ addEvent(e: Event): void</text>
          <text x="10" y="155" className="fill-muted-foreground text-xs">+ isOfficer(s: Student): bool</text>
        </g>

        {/* Event Class */}
        <g transform="translate(700, 60)">
          <rect width="200" height="200" rx="4" fill="#1e1e26" stroke="#10b981" strokeWidth="2" />
          <rect width="200" height="30" rx="4" fill="#10b981" fillOpacity="0.2" />
          <text x="100" y="20" textAnchor="middle" className="fill-foreground text-sm font-semibold">Event</text>
          <line x1="0" y1="30" x2="200" y2="30" stroke="#10b981" strokeWidth="1" />
          <text x="10" y="50" className="fill-muted-foreground text-xs">- title: String</text>
          <text x="10" y="65" className="fill-muted-foreground text-xs">- description: String</text>
          <text x="10" y="80" className="fill-muted-foreground text-xs">- date: Date</text>
          <text x="10" y="95" className="fill-muted-foreground text-xs">- location: String</text>
          <text x="10" y="110" className="fill-muted-foreground text-xs">- capacity: int</text>
          <text x="10" y="125" className="fill-muted-foreground text-xs">- attendees: List&lt;Student&gt;</text>
          <line x1="0" y1="135" x2="200" y2="135" stroke="#10b981" strokeWidth="1" />
          <text x="10" y="155" className="fill-muted-foreground text-xs">+ rsvp(s: Student): bool</text>
          <text x="10" y="170" className="fill-muted-foreground text-xs">+ checkCapacity(): bool</text>
          <text x="10" y="185" className="fill-muted-foreground text-xs">+ addAttendee(s: Student): void</text>
        </g>

        {/* Student Class */}
        <g transform="translate(50, 320)">
          <rect width="200" height="185" rx="4" fill="#1e1e26" stroke="#3b82f6" strokeWidth="2" />
          <rect width="200" height="30" rx="4" fill="#3b82f6" fillOpacity="0.2" />
          <text x="100" y="20" textAnchor="middle" className="fill-foreground text-sm font-semibold">Student</text>
          <line x1="0" y1="30" x2="200" y2="30" stroke="#3b82f6" strokeWidth="1" />
          <text x="10" y="50" className="fill-muted-foreground text-xs">- name: String</text>
          <text x="10" y="65" className="fill-muted-foreground text-xs">- gtId: String</text>
          <text x="10" y="80" className="fill-muted-foreground text-xs">- email: String</text>
          <text x="10" y="95" className="fill-muted-foreground text-xs">- major: String</text>
          <text x="10" y="110" className="fill-muted-foreground text-xs">- rsvps: List&lt;RSVP&gt;</text>
          <line x1="0" y1="120" x2="200" y2="120" stroke="#3b82f6" strokeWidth="1" />
          <text x="10" y="140" className="fill-muted-foreground text-xs">+ viewEvent(): Event</text>
          <text x="10" y="155" className="fill-muted-foreground text-xs">+ makeRSVP(e: Event): RSVP</text>
          <text x="10" y="170" className="fill-muted-foreground text-xs">+ cancelRSVP(e: Event): void</text>
        </g>

        {/* RSVP Class */}
        <g transform="translate(375, 350)">
          <rect width="200" height="125" rx="4" fill="#1e1e26" stroke="#ec4899" strokeWidth="2" />
          <rect width="200" height="30" rx="4" fill="#ec4899" fillOpacity="0.2" />
          <text x="100" y="20" textAnchor="middle" className="fill-foreground text-sm font-semibold">RSVP</text>
          <line x1="0" y1="30" x2="200" y2="30" stroke="#ec4899" strokeWidth="1" />
          <text x="10" y="50" className="fill-muted-foreground text-xs">- student: Student</text>
          <text x="10" y="65" className="fill-muted-foreground text-xs">- event: Event</text>
          <text x="10" y="80" className="fill-muted-foreground text-xs">- rsvpDate: Date</text>
          <text x="10" y="95" className="fill-muted-foreground text-xs">- status: String</text>
          <line x1="0" y1="105" x2="200" y2="105" stroke="#ec4899" strokeWidth="1" />
          <text x="10" y="120" className="fill-muted-foreground text-xs">+ cancel(): void</text>
        </g>

        {/* Relationships */}
        
        {/* EventController - Organization */}
        <g>
          <line x1="250" y1="137" x2="375" y2="137" stroke="#e4e4e7" strokeWidth="1.5" />
          <text x="310" y="130" textAnchor="middle" className="fill-muted-foreground text-xs">1</text>
          <polygon points="375,137 365,132 365,142" fill="#e4e4e7" />
        </g>

        {/* Organization - Event (composition) */}
        <g>
          <line x1="575" y1="145" x2="700" y2="145" stroke="#e4e4e7" strokeWidth="1.5" />
          <text x="595" y="138" className="fill-muted-foreground text-xs">1</text>
          <text x="680" y="138" className="fill-muted-foreground text-xs">*</text>
          {/* Composition diamond */}
          <polygon points="575,145 585,140 595,145 585,150" fill="#e4e4e7" />
          <polygon points="700,145 690,140 690,150" fill="#e4e4e7" />
        </g>

        {/* Student - RSVP */}
        <g>
          <line x1="250" y1="412" x2="375" y2="412" stroke="#e4e4e7" strokeWidth="1.5" />
          <text x="265" y="405" className="fill-muted-foreground text-xs">1</text>
          <text x="355" y="405" className="fill-muted-foreground text-xs">*</text>
          <polygon points="375,412 365,407 365,417" fill="#e4e4e7" />
        </g>

        {/* RSVP - Event */}
        <g>
          <line x1="575" y1="412" x2="800" y2="260" stroke="#e4e4e7" strokeWidth="1.5" />
          <text x="595" y="405" className="fill-muted-foreground text-xs">*</text>
          <text x="780" y="280" className="fill-muted-foreground text-xs">1</text>
          <polygon points="800,260 790,260 793,270" fill="#e4e4e7" />
        </g>

        {/* Event - Student (attendees) */}
        <g>
          <path d="M 700 200 Q 500 280 250 412" fill="none" stroke="#e4e4e7" strokeWidth="1.5" strokeDasharray="4,2" />
          <text x="680" y="215" className="fill-muted-foreground text-xs">*</text>
          <text x="270" y="400" className="fill-muted-foreground text-xs">*</text>
          <text x="480" y="295" className="fill-accent text-xs">attendees</text>
        </g>

        {/* Legend */}
        <g transform="translate(50, 550)">
          <text x="0" y="0" className="fill-foreground text-sm font-semibold">Legend:</text>
          
          <line x1="0" y1="25" x2="30" y2="25" stroke="#e4e4e7" strokeWidth="1.5" />
          <polygon points="30,25 20,20 20,30" fill="#e4e4e7" />
          <text x="40" y="30" className="fill-muted-foreground text-xs">Association (navigable)</text>

          <line x1="200" y1="25" x2="230" y2="25" stroke="#e4e4e7" strokeWidth="1.5" />
          <polygon points="200,25 210,20 220,25 210,30" fill="#e4e4e7" />
          <text x="240" y="30" className="fill-muted-foreground text-xs">Composition</text>

          <line x1="380" y1="25" x2="410" y2="25" stroke="#e4e4e7" strokeWidth="1.5" strokeDasharray="4,2" />
          <text x="420" y="30" className="fill-muted-foreground text-xs">Dependency</text>
        </g>

        {/* Visibility Legend */}
        <g transform="translate(50, 610)">
          <text x="0" y="0" className="fill-foreground text-sm font-semibold">Visibility:</text>
          <text x="0" y="25" className="fill-muted-foreground text-xs">+ public</text>
          <text x="80" y="25" className="fill-muted-foreground text-xs">- private</text>
          <text x="160" y="25" className="fill-muted-foreground text-xs"># protected</text>
        </g>

        {/* Note */}
        <g transform="translate(550, 530)">
          <rect width="350" height="75" rx="4" fill="#27272a" stroke="#71717a" strokeWidth="1" strokeDasharray="4,2" />
          <text x="175" y="25" textAnchor="middle" className="fill-muted-foreground text-xs">Note: Methods align with Sequence Diagram messages.</text>
          <text x="175" y="45" textAnchor="middle" className="fill-muted-foreground text-xs">createEvent(), rsvp(), checkCapacity(), addAttendee()</text>
          <text x="175" y="65" textAnchor="middle" className="fill-muted-foreground text-xs">are called in Scenario 2 sequence.</text>
        </g>
      </svg>
    </div>
  );
}
