"use client";

export function DomainModelDiagram() {
  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox="0 0 900 700"
        className="w-full min-w-[700px] h-auto"
        style={{ minHeight: "550px" }}
      >
        {/* Background */}
        <rect width="900" height="700" fill="#131318" rx="8" />

        {/* Title */}
        <text x="450" y="35" textAnchor="middle" className="fill-foreground text-base font-semibold">
          Domain Model: CampusConnect
        </text>

        {/* Student Class */}
        <g transform="translate(50, 80)">
          <rect width="150" height="120" rx="4" fill="#1e1e26" stroke="#3b82f6" strokeWidth="2" />
          <rect width="150" height="30" rx="4" fill="#3b82f6" fillOpacity="0.2" />
          <text x="75" y="20" textAnchor="middle" className="fill-foreground text-sm font-semibold">Student</text>
          <line x1="0" y1="30" x2="150" y2="30" stroke="#3b82f6" strokeWidth="1" />
          <text x="10" y="50" className="fill-muted-foreground text-xs">name: String</text>
          <text x="10" y="65" className="fill-muted-foreground text-xs">gtId: String</text>
          <text x="10" y="80" className="fill-muted-foreground text-xs">email: String</text>
          <text x="10" y="95" className="fill-muted-foreground text-xs">major: String</text>
        </g>

        {/* Organization Class */}
        <g transform="translate(375, 80)">
          <rect width="150" height="105" rx="4" fill="#1e1e26" stroke="#22d3ee" strokeWidth="2" />
          <rect width="150" height="30" rx="4" fill="#22d3ee" fillOpacity="0.2" />
          <text x="75" y="20" textAnchor="middle" className="fill-foreground text-sm font-semibold">Organization</text>
          <line x1="0" y1="30" x2="150" y2="30" stroke="#22d3ee" strokeWidth="1" />
          <text x="10" y="50" className="fill-muted-foreground text-xs">name: String</text>
          <text x="10" y="65" className="fill-muted-foreground text-xs">orgId: String</text>
          <text x="10" y="80" className="fill-muted-foreground text-xs">description: String</text>
        </g>

        {/* Event Class */}
        <g transform="translate(700, 80)">
          <rect width="150" height="135" rx="4" fill="#1e1e26" stroke="#10b981" strokeWidth="2" />
          <rect width="150" height="30" rx="4" fill="#10b981" fillOpacity="0.2" />
          <text x="75" y="20" textAnchor="middle" className="fill-foreground text-sm font-semibold">Event</text>
          <line x1="0" y1="30" x2="150" y2="30" stroke="#10b981" strokeWidth="1" />
          <text x="10" y="50" className="fill-muted-foreground text-xs">title: String</text>
          <text x="10" y="65" className="fill-muted-foreground text-xs">description: String</text>
          <text x="10" y="80" className="fill-muted-foreground text-xs">date: Date</text>
          <text x="10" y="95" className="fill-muted-foreground text-xs">location: String</text>
          <text x="10" y="110" className="fill-muted-foreground text-xs">capacity: Integer</text>
        </g>

        {/* MembershipRequest Class */}
        <g transform="translate(50, 320)">
          <rect width="150" height="90" rx="4" fill="#1e1e26" stroke="#f59e0b" strokeWidth="2" />
          <rect width="150" height="30" rx="4" fill="#f59e0b" fillOpacity="0.2" />
          <text x="75" y="20" textAnchor="middle" className="fill-foreground text-sm font-semibold">MembershipRequest</text>
          <line x1="0" y1="30" x2="150" y2="30" stroke="#f59e0b" strokeWidth="1" />
          <text x="10" y="50" className="fill-muted-foreground text-xs">requestDate: Date</text>
          <text x="10" y="65" className="fill-muted-foreground text-xs">status: String</text>
        </g>

        {/* Membership Class */}
        <g transform="translate(250, 320)">
          <rect width="150" height="75" rx="4" fill="#1e1e26" stroke="#8b5cf6" strokeWidth="2" />
          <rect width="150" height="30" rx="4" fill="#8b5cf6" fillOpacity="0.2" />
          <text x="75" y="20" textAnchor="middle" className="fill-foreground text-sm font-semibold">Membership</text>
          <line x1="0" y1="30" x2="150" y2="30" stroke="#8b5cf6" strokeWidth="1" />
          <text x="10" y="50" className="fill-muted-foreground text-xs">role: String</text>
          <text x="10" y="65" className="fill-muted-foreground text-xs">joinDate: Date</text>
        </g>

        {/* RSVP Class */}
        <g transform="translate(500, 320)">
          <rect width="150" height="75" rx="4" fill="#1e1e26" stroke="#ec4899" strokeWidth="2" />
          <rect width="150" height="30" rx="4" fill="#ec4899" fillOpacity="0.2" />
          <text x="75" y="20" textAnchor="middle" className="fill-foreground text-sm font-semibold">RSVP</text>
          <line x1="0" y1="30" x2="150" y2="30" stroke="#ec4899" strokeWidth="1" />
          <text x="10" y="50" className="fill-muted-foreground text-xs">rsvpDate: Date</text>
          <text x="10" y="65" className="fill-muted-foreground text-xs">status: String</text>
        </g>

        {/* Associations */}
        
        {/* Student - Membership (belongs to via) */}
        <g>
          <line x1="125" y1="200" x2="125" y2="320" stroke="#e4e4e7" strokeWidth="1.5" />
          <line x1="125" y1="280" x2="250" y2="357" stroke="#e4e4e7" strokeWidth="1.5" />
          <text x="90" y="260" className="fill-muted-foreground text-xs">1</text>
          <text x="195" y="330" className="fill-muted-foreground text-xs">*</text>
          <text x="170" y="295" className="fill-accent text-xs" transform="rotate(-25, 170, 295)">has</text>
        </g>

        {/* Membership - Organization */}
        <g>
          <line x1="325" y1="320" x2="450" y2="185" stroke="#e4e4e7" strokeWidth="1.5" />
          <text x="335" y="305" className="fill-muted-foreground text-xs">*</text>
          <text x="430" y="210" className="fill-muted-foreground text-xs">1</text>
          <text x="370" y="240" className="fill-accent text-xs" transform="rotate(-45, 370, 240)">belongs to</text>
        </g>

        {/* Student - MembershipRequest */}
        <g>
          <line x1="125" y1="200" x2="125" y2="320" stroke="#e4e4e7" strokeWidth="1.5" />
          <text x="105" y="220" className="fill-muted-foreground text-xs">1</text>
          <text x="105" y="310" className="fill-muted-foreground text-xs">*</text>
          <text x="135" y="265" className="fill-accent text-xs">submits</text>
        </g>

        {/* MembershipRequest - Organization */}
        <g>
          <line x1="200" y1="365" x2="375" y2="185" stroke="#e4e4e7" strokeWidth="1.5" />
          <text x="210" y="355" className="fill-muted-foreground text-xs">*</text>
          <text x="355" y="200" className="fill-muted-foreground text-xs">1</text>
          <text x="280" y="275" className="fill-accent text-xs" transform="rotate(-40, 280, 275)">for</text>
        </g>

        {/* Organization - Event */}
        <g>
          <line x1="525" y1="132" x2="700" y2="132" stroke="#e4e4e7" strokeWidth="1.5" />
          <text x="540" y="125" className="fill-muted-foreground text-xs">1..*</text>
          <text x="675" y="125" className="fill-muted-foreground text-xs">*</text>
          <text x="612" y="122" textAnchor="middle" className="fill-accent text-xs">hosts</text>
        </g>

        {/* Student - RSVP */}
        <g>
          <line x1="200" y1="140" x2="500" y2="357" stroke="#e4e4e7" strokeWidth="1.5" />
          <text x="220" y="160" className="fill-muted-foreground text-xs">1</text>
          <text x="480" y="345" className="fill-muted-foreground text-xs">*</text>
          <text x="360" y="240" className="fill-accent text-xs" transform="rotate(40, 360, 240)">makes</text>
        </g>

        {/* RSVP - Event */}
        <g>
          <line x1="575" y1="320" x2="775" y2="215" stroke="#e4e4e7" strokeWidth="1.5" />
          <text x="590" y="310" className="fill-muted-foreground text-xs">*</text>
          <text x="755" y="230" className="fill-muted-foreground text-xs">1</text>
          <text x="670" y="255" className="fill-accent text-xs" transform="rotate(-35, 670, 255)">for</text>
        </g>

        {/* Student - Organization (president relationship) */}
        <g>
          <path d="M 200 140 Q 300 50 375 132" fill="none" stroke="#e4e4e7" strokeWidth="1.5" />
          <text x="230" y="125" className="fill-muted-foreground text-xs">0..1</text>
          <text x="340" y="90" className="fill-muted-foreground text-xs">1</text>
          <text x="290" y="75" textAnchor="middle" className="fill-accent text-xs">presides over</text>
        </g>

        {/* Legend */}
        <g transform="translate(50, 450)">
          <text x="0" y="0" className="fill-foreground text-sm font-semibold">Multiplicity Guide:</text>
          <text x="0" y="25" className="fill-muted-foreground text-xs">1 = exactly one</text>
          <text x="120" y="25" className="fill-muted-foreground text-xs">* = zero or more</text>
          <text x="240" y="25" className="fill-muted-foreground text-xs">0..1 = zero or one</text>
          <text x="360" y="25" className="fill-muted-foreground text-xs">1..* = one or more</text>
        </g>

        {/* Note about constraint */}
        <g transform="translate(500, 450)">
          <rect width="350" height="60" rx="4" fill="#27272a" stroke="#71717a" strokeWidth="1" strokeDasharray="4,2" />
          <text x="175" y="25" textAnchor="middle" className="fill-muted-foreground text-xs">Constraint: A student cannot be president</text>
          <text x="175" y="45" textAnchor="middle" className="fill-muted-foreground text-xs">of more than one organization at a time.</text>
        </g>

        {/* Arrow marker definition */}
        <defs>
          <marker
            id="arrowhead-dmd"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#e4e4e7" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
