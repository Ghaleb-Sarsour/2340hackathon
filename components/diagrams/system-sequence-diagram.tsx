"use client";

export function SystemSequenceDiagram() {
  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox="0 0 700 600"
        className="w-full min-w-[500px] h-auto"
        style={{ minHeight: "500px" }}
      >
        {/* Background */}
        <rect width="700" height="600" fill="#131318" rx="8" />

        {/* Title */}
        <text x="350" y="35" textAnchor="middle" className="fill-foreground text-base font-semibold">
          System Sequence Diagram: View Organizations & Events (Scenario 3)
        </text>

        {/* Actor - Priya */}
        <g>
          {/* Stick figure */}
          <circle cx="120" cy="70" r="15" fill="none" stroke="#3b82f6" strokeWidth="2" />
          <line x1="120" y1="85" x2="120" y2="115" stroke="#3b82f6" strokeWidth="2" />
          <line x1="100" y1="95" x2="140" y2="95" stroke="#3b82f6" strokeWidth="2" />
          <line x1="120" y1="115" x2="100" y2="140" stroke="#3b82f6" strokeWidth="2" />
          <line x1="120" y1="115" x2="140" y2="140" stroke="#3b82f6" strokeWidth="2" />
          <text x="120" y="160" textAnchor="middle" className="fill-foreground text-sm">Priya</text>
          <text x="120" y="175" textAnchor="middle" className="fill-muted-foreground text-xs">(Student)</text>
          
          {/* Lifeline */}
          <line x1="120" y1="185" x2="120" y2="550" stroke="#3b82f6" strokeDasharray="6,4" strokeWidth="1.5" />
        </g>

        {/* System - CampusConnect */}
        <g>
          <rect x="480" y="60" width="140" height="50" rx="4" fill="#1e1e26" stroke="#22d3ee" strokeWidth="2" />
          <text x="550" y="90" textAnchor="middle" className="fill-foreground text-sm">:CampusConnect</text>
          <text x="550" y="105" textAnchor="middle" className="fill-muted-foreground text-xs">(System)</text>
          
          {/* Lifeline */}
          <line x1="550" y1="110" x2="550" y2="550" stroke="#22d3ee" strokeDasharray="6,4" strokeWidth="1.5" />
        </g>

        {/* Message 1: login */}
        <g>
          <rect x="115" y="200" width="10" height="25" fill="#3b82f6" opacity="0.5" />
          <line x1="125" y1="210" x2="545" y2="210" stroke="#e4e4e7" strokeWidth="1.5" markerEnd="url(#arrowhead-ssd)" />
          <text x="335" y="200" textAnchor="middle" className="fill-foreground text-sm">1: login(credentials)</text>
          
          {/* Activation on system */}
          <rect x="545" y="205" width="10" height="35" fill="#22d3ee" opacity="0.5" />
          
          {/* Return */}
          <line x1="545" y1="235" x2="125" y2="235" stroke="#e4e4e7" strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#arrowhead-ssd)" />
          <text x="335" y="252" textAnchor="middle" className="fill-muted-foreground text-xs">authenticationSuccess, userProfile</text>
        </g>

        {/* Message 2: viewMyOrganizations */}
        <g>
          <rect x="115" y="275" width="10" height="25" fill="#3b82f6" opacity="0.5" />
          <line x1="125" y1="285" x2="545" y2="285" stroke="#e4e4e7" strokeWidth="1.5" markerEnd="url(#arrowhead-ssd)" />
          <text x="335" y="275" textAnchor="middle" className="fill-foreground text-sm">2: viewMyOrganizations()</text>
          
          {/* Activation on system */}
          <rect x="545" y="280" width="10" height="35" fill="#22d3ee" opacity="0.5" />
          
          {/* Return */}
          <line x1="545" y1="310" x2="125" y2="310" stroke="#e4e4e7" strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#arrowhead-ssd)" />
          <text x="335" y="327" textAnchor="middle" className="fill-muted-foreground text-xs">organizationList[3]</text>
        </g>

        {/* Message 3: viewUpcomingEvents */}
        <g>
          <rect x="115" y="350" width="10" height="25" fill="#3b82f6" opacity="0.5" />
          <line x1="125" y1="360" x2="545" y2="360" stroke="#e4e4e7" strokeWidth="1.5" markerEnd="url(#arrowhead-ssd)" />
          <text x="335" y="350" textAnchor="middle" className="fill-foreground text-sm">3: viewUpcomingEvents()</text>
          
          {/* Activation on system */}
          <rect x="545" y="355" width="10" height="35" fill="#22d3ee" opacity="0.5" />
          
          {/* Return */}
          <line x1="545" y1="385" x2="125" y2="385" stroke="#e4e4e7" strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#arrowhead-ssd)" />
          <text x="335" y="402" textAnchor="middle" className="fill-muted-foreground text-xs">eventList with details</text>
        </g>

        {/* Message 4: viewEventDetails */}
        <g>
          <rect x="115" y="425" width="10" height="25" fill="#3b82f6" opacity="0.5" />
          <line x1="125" y1="435" x2="545" y2="435" stroke="#e4e4e7" strokeWidth="1.5" markerEnd="url(#arrowhead-ssd)" />
          <text x="335" y="425" textAnchor="middle" className="fill-foreground text-sm">4: viewEventDetails(eventId)</text>
          
          {/* Activation on system */}
          <rect x="545" y="430" width="10" height="35" fill="#22d3ee" opacity="0.5" />
          
          {/* Return */}
          <line x1="545" y1="460" x2="125" y2="460" stroke="#e4e4e7" strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#arrowhead-ssd)" />
          <text x="335" y="477" textAnchor="middle" className="fill-muted-foreground text-xs">eventDetails, registeredCount, capacity</text>
        </g>

        {/* Message 5: logout */}
        <g>
          <rect x="115" y="500" width="10" height="25" fill="#3b82f6" opacity="0.5" />
          <line x1="125" y1="510" x2="545" y2="510" stroke="#e4e4e7" strokeWidth="1.5" markerEnd="url(#arrowhead-ssd)" />
          <text x="335" y="500" textAnchor="middle" className="fill-foreground text-sm">5: logout()</text>
          
          {/* Activation on system */}
          <rect x="545" y="505" width="10" height="25" fill="#22d3ee" opacity="0.5" />
          
          {/* Return */}
          <line x1="545" y1="525" x2="125" y2="525" stroke="#e4e4e7" strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#arrowhead-ssd)" />
          <text x="335" y="542" textAnchor="middle" className="fill-muted-foreground text-xs">logoutConfirmation</text>
        </g>

        {/* Legend */}
        <g transform="translate(50, 565)">
          <circle cx="6" cy="6" r="5" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
          <text x="18" y="10" className="fill-muted-foreground text-xs">Actor</text>
          <rect x="80" y="1" width="12" height="12" fill="#1e1e26" stroke="#22d3ee" strokeWidth="1" rx="2" />
          <text x="98" y="10" className="fill-muted-foreground text-xs">System</text>
          <line x1="170" y1="6" x2="200" y2="6" stroke="#e4e4e7" strokeWidth="1.5" />
          <text x="208" y="10" className="fill-muted-foreground text-xs">System Event</text>
          <line x1="310" y1="6" x2="340" y2="6" stroke="#e4e4e7" strokeWidth="1.5" strokeDasharray="4,2" />
          <text x="348" y="10" className="fill-muted-foreground text-xs">System Response</text>
        </g>

        {/* Arrow marker definition */}
        <defs>
          <marker
            id="arrowhead-ssd"
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
