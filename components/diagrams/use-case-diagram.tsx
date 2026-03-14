"use client";

export function UseCaseDiagram() {
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
          Use Case Diagram: CampusConnect (Scenarios 1, 2, 3)
        </text>

        {/* System Boundary */}
        <rect x="200" y="55" width="500" height="580" rx="8" fill="none" stroke="#3b82f6" strokeWidth="2" />
        <text x="450" y="85" textAnchor="middle" className="fill-primary text-sm font-semibold">CampusConnect System</text>

        {/* Actors - Left Side */}
        
        {/* Student Actor */}
        <g transform="translate(80, 180)">
          <circle cx="0" cy="0" r="15" fill="none" stroke="#22d3ee" strokeWidth="2" />
          <line x1="0" y1="15" x2="0" y2="45" stroke="#22d3ee" strokeWidth="2" />
          <line x1="-20" y1="25" x2="20" y2="25" stroke="#22d3ee" strokeWidth="2" />
          <line x1="0" y1="45" x2="-15" y2="70" stroke="#22d3ee" strokeWidth="2" />
          <line x1="0" y1="45" x2="15" y2="70" stroke="#22d3ee" strokeWidth="2" />
          <text x="0" y="90" textAnchor="middle" className="fill-foreground text-sm">Student</text>
        </g>

        {/* President Actor (inherits from Student) */}
        <g transform="translate(80, 400)">
          <circle cx="0" cy="0" r="15" fill="none" stroke="#f59e0b" strokeWidth="2" />
          <line x1="0" y1="15" x2="0" y2="45" stroke="#f59e0b" strokeWidth="2" />
          <line x1="-20" y1="25" x2="20" y2="25" stroke="#f59e0b" strokeWidth="2" />
          <line x1="0" y1="45" x2="-15" y2="70" stroke="#f59e0b" strokeWidth="2" />
          <line x1="0" y1="45" x2="15" y2="70" stroke="#f59e0b" strokeWidth="2" />
          <text x="0" y="90" textAnchor="middle" className="fill-foreground text-sm">President</text>
        </g>

        {/* Officer Actor */}
        <g transform="translate(80, 550)">
          <circle cx="0" cy="0" r="15" fill="none" stroke="#10b981" strokeWidth="2" />
          <line x1="0" y1="15" x2="0" y2="45" stroke="#10b981" strokeWidth="2" />
          <line x1="-20" y1="25" x2="20" y2="25" stroke="#10b981" strokeWidth="2" />
          <line x1="0" y1="45" x2="-15" y2="70" stroke="#10b981" strokeWidth="2" />
          <line x1="0" y1="45" x2="15" y2="70" stroke="#10b981" strokeWidth="2" />
          <text x="0" y="90" textAnchor="middle" className="fill-foreground text-sm">Officer</text>
        </g>

        {/* External System Actor - Right Side */}
        <g transform="translate(820, 150)">
          <rect x="-30" y="-20" width="60" height="40" rx="4" fill="#1e1e26" stroke="#ec4899" strokeWidth="2" />
          <text x="0" y="5" textAnchor="middle" className="fill-foreground text-xs">Auth</text>
          <text x="0" y="40" textAnchor="middle" className="fill-foreground text-sm">External Auth</text>
          <text x="0" y="55" textAnchor="middle" className="fill-muted-foreground text-xs">System</text>
        </g>

        {/* Use Cases */}
        
        {/* Login */}
        <g transform="translate(350, 130)">
          <ellipse cx="0" cy="0" rx="70" ry="25" fill="#1e1e26" stroke="#e4e4e7" strokeWidth="1.5" />
          <text x="0" y="5" textAnchor="middle" className="fill-foreground text-xs">Login</text>
        </g>

        {/* Search Organization */}
        <g transform="translate(350, 200)">
          <ellipse cx="0" cy="0" rx="85" ry="25" fill="#1e1e26" stroke="#e4e4e7" strokeWidth="1.5" />
          <text x="0" y="5" textAnchor="middle" className="fill-foreground text-xs">Search Organization</text>
        </g>

        {/* Request Membership */}
        <g transform="translate(350, 270)">
          <ellipse cx="0" cy="0" rx="90" ry="25" fill="#1e1e26" stroke="#e4e4e7" strokeWidth="1.5" />
          <text x="0" y="5" textAnchor="middle" className="fill-foreground text-xs">Request Membership</text>
        </g>

        {/* View Organizations */}
        <g transform="translate(550, 200)">
          <ellipse cx="0" cy="0" rx="85" ry="25" fill="#1e1e26" stroke="#e4e4e7" strokeWidth="1.5" />
          <text x="0" y="5" textAnchor="middle" className="fill-foreground text-xs">View Organizations</text>
        </g>

        {/* View Events */}
        <g transform="translate(550, 270)">
          <ellipse cx="0" cy="0" rx="70" ry="25" fill="#1e1e26" stroke="#e4e4e7" strokeWidth="1.5" />
          <text x="0" y="5" textAnchor="middle" className="fill-foreground text-xs">View Events</text>
        </g>

        {/* RSVP to Event */}
        <g transform="translate(550, 340)">
          <ellipse cx="0" cy="0" rx="75" ry="25" fill="#1e1e26" stroke="#e4e4e7" strokeWidth="1.5" />
          <text x="0" y="5" textAnchor="middle" className="fill-foreground text-xs">RSVP to Event</text>
        </g>

        {/* Cancel RSVP */}
        <g transform="translate(550, 410)">
          <ellipse cx="0" cy="0" rx="70" ry="25" fill="#1e1e26" stroke="#e4e4e7" strokeWidth="1.5" />
          <text x="0" y="5" textAnchor="middle" className="fill-foreground text-xs">Cancel RSVP</text>
        </g>

        {/* Approve/Reject Request */}
        <g transform="translate(350, 420)">
          <ellipse cx="0" cy="0" rx="100" ry="25" fill="#1e1e26" stroke="#e4e4e7" strokeWidth="1.5" />
          <text x="0" y="5" textAnchor="middle" className="fill-foreground text-xs">Approve/Reject Request</text>
        </g>

        {/* Create Event */}
        <g transform="translate(350, 550)">
          <ellipse cx="0" cy="0" rx="70" ry="25" fill="#1e1e26" stroke="#e4e4e7" strokeWidth="1.5" />
          <text x="0" y="5" textAnchor="middle" className="fill-foreground text-xs">Create Event</text>
        </g>

        {/* Manage Event */}
        <g transform="translate(550, 550)">
          <ellipse cx="0" cy="0" rx="70" ry="25" fill="#1e1e26" stroke="#e4e4e7" strokeWidth="1.5" />
          <text x="0" y="5" textAnchor="middle" className="fill-foreground text-xs">Manage Event</text>
        </g>

        {/* Associations - Student */}
        <line x1="100" y1="180" x2="280" y2="130" stroke="#22d3ee" strokeWidth="1.5" />
        <line x1="100" y1="180" x2="265" y2="200" stroke="#22d3ee" strokeWidth="1.5" />
        <line x1="100" y1="180" x2="260" y2="270" stroke="#22d3ee" strokeWidth="1.5" />
        <line x1="100" y1="200" x2="465" y2="200" stroke="#22d3ee" strokeWidth="1.5" />
        <line x1="100" y1="200" x2="480" y2="270" stroke="#22d3ee" strokeWidth="1.5" />
        <line x1="100" y1="200" x2="475" y2="340" stroke="#22d3ee" strokeWidth="1.5" />

        {/* Associations - President */}
        <line x1="100" y1="400" x2="250" y2="420" stroke="#f59e0b" strokeWidth="1.5" />

        {/* Associations - Officer */}
        <line x1="100" y1="550" x2="280" y2="550" stroke="#10b981" strokeWidth="1.5" />
        <line x1="100" y1="550" x2="480" y2="550" stroke="#10b981" strokeWidth="1.5" />

        {/* Associations - External Auth */}
        <line x1="790" y1="150" x2="420" y2="130" stroke="#ec4899" strokeWidth="1.5" />

        {/* Inheritance - President extends Student */}
        <g>
          <line x1="80" y1="385" x2="80" y2="285" stroke="#e4e4e7" strokeWidth="1.5" />
          <polygon points="80,285 73,298 87,298" fill="none" stroke="#e4e4e7" strokeWidth="1.5" />
        </g>

        {/* Include relationship - Login includes authentication */}
        <g>
          <line x1="420" y1="130" x2="700" y2="130" stroke="#e4e4e7" strokeWidth="1.5" strokeDasharray="4,2" />
          <text x="560" y="120" textAnchor="middle" className="fill-muted-foreground text-xs">{"<<include>>"}</text>
        </g>

        {/* Extend relationship - Cancel RSVP extends RSVP */}
        <g>
          <line x1="550" y1="385" x2="550" y2="365" stroke="#e4e4e7" strokeWidth="1.5" strokeDasharray="4,2" />
          <text x="600" y="380" className="fill-muted-foreground text-xs">{"<<extend>>"}</text>
        </g>

        {/* Legend */}
        <g transform="translate(220, 650)">
          <circle cx="6" cy="6" r="5" fill="none" stroke="#22d3ee" strokeWidth="1.5" />
          <text x="18" y="10" className="fill-muted-foreground text-xs">Actor</text>
          
          <ellipse cx="90" cy="6" rx="20" ry="8" fill="#1e1e26" stroke="#e4e4e7" strokeWidth="1" />
          <text x="120" y="10" className="fill-muted-foreground text-xs">Use Case</text>

          <line x1="200" y1="6" x2="230" y2="6" stroke="#e4e4e7" strokeWidth="1.5" />
          <text x="240" y="10" className="fill-muted-foreground text-xs">Association</text>

          <line x1="330" y1="6" x2="360" y2="6" stroke="#e4e4e7" strokeWidth="1.5" strokeDasharray="4,2" />
          <text x="370" y="10" className="fill-muted-foreground text-xs">Include/Extend</text>

          <line x1="480" y1="15" x2="480" y2="0" stroke="#e4e4e7" strokeWidth="1.5" />
          <polygon points="480,0 475,10 485,10" fill="none" stroke="#e4e4e7" strokeWidth="1" />
          <text x="495" y="10" className="fill-muted-foreground text-xs">Generalization</text>
        </g>

        {/* Scenario Labels */}
        <g transform="translate(720, 280)">
          <rect x="0" y="0" width="100" height="80" rx="4" fill="#27272a" stroke="#71717a" strokeWidth="1" />
          <text x="50" y="20" textAnchor="middle" className="fill-muted-foreground text-xs font-semibold">Scenarios</text>
          <text x="50" y="40" textAnchor="middle" className="fill-cyan-400 text-xs">1: Join Org</text>
          <text x="50" y="55" textAnchor="middle" className="fill-emerald-400 text-xs">2: Create Event</text>
          <text x="50" y="70" textAnchor="middle" className="fill-amber-400 text-xs">3: View Events</text>
        </g>
      </svg>
    </div>
  );
}
