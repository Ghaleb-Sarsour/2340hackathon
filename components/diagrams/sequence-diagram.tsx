"use client";

export function SequenceDiagram() {
  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox="0 0 1000 750"
        className="w-full min-w-[800px] h-auto"
        style={{ minHeight: "600px" }}
      >
        {/* Background */}
        <rect width="1000" height="750" fill="#131318" rx="8" />

        {/* Title */}
        <text x="500" y="35" textAnchor="middle" className="fill-foreground text-base font-semibold">
          Sequence Diagram: Event Creation and RSVP (Scenario 2)
        </text>

        {/* Lifelines - Actor and Objects */}
        {/* Daniel (Actor) */}
        <g>
          <rect x="50" y="60" width="80" height="40" rx="4" fill="#1e1e26" stroke="#3b82f6" strokeWidth="2" />
          <text x="90" y="85" textAnchor="middle" className="fill-foreground text-sm">Daniel</text>
          <line x1="90" y1="100" x2="90" y2="700" stroke="#3b82f6" strokeDasharray="6,4" strokeWidth="1.5" />
        </g>

        {/* UI */}
        <g>
          <rect x="170" y="60" width="80" height="40" rx="4" fill="#1e1e26" stroke="#22d3ee" strokeWidth="2" />
          <text x="210" y="85" textAnchor="middle" className="fill-foreground text-sm">:UI</text>
          <line x1="210" y1="100" x2="210" y2="700" stroke="#22d3ee" strokeDasharray="6,4" strokeWidth="1.5" />
        </g>

        {/* EventController */}
        <g>
          <rect x="290" y="60" width="120" height="40" rx="4" fill="#1e1e26" stroke="#22d3ee" strokeWidth="2" />
          <text x="350" y="85" textAnchor="middle" className="fill-foreground text-sm">:EventController</text>
          <line x1="350" y1="100" x2="350" y2="700" stroke="#22d3ee" strokeDasharray="6,4" strokeWidth="1.5" />
        </g>

        {/* Organization */}
        <g>
          <rect x="450" y="60" width="100" height="40" rx="4" fill="#1e1e26" stroke="#22d3ee" strokeWidth="2" />
          <text x="500" y="85" textAnchor="middle" className="fill-foreground text-sm">:Organization</text>
          <line x1="500" y1="100" x2="500" y2="700" stroke="#22d3ee" strokeDasharray="6,4" strokeWidth="1.5" />
        </g>

        {/* Event */}
        <g>
          <rect x="590" y="60" width="80" height="40" rx="4" fill="#1e1e26" stroke="#22d3ee" strokeWidth="2" />
          <text x="630" y="85" textAnchor="middle" className="fill-foreground text-sm">:Event</text>
          <line x1="630" y1="100" x2="630" y2="700" stroke="#22d3ee" strokeDasharray="6,4" strokeWidth="1.5" />
        </g>

        {/* Student */}
        <g>
          <rect x="710" y="60" width="80" height="40" rx="4" fill="#1e1e26" stroke="#22d3ee" strokeWidth="2" />
          <text x="750" y="85" textAnchor="middle" className="fill-foreground text-sm">:Student</text>
          <line x1="750" y1="100" x2="750" y2="700" stroke="#22d3ee" strokeDasharray="6,4" strokeWidth="1.5" />
        </g>

        {/* Students Actor */}
        <g>
          <rect x="850" y="60" width="80" height="40" rx="4" fill="#1e1e26" stroke="#3b82f6" strokeWidth="2" />
          <text x="890" y="85" textAnchor="middle" className="fill-foreground text-sm">Students</text>
          <line x1="890" y1="100" x2="890" y2="700" stroke="#3b82f6" strokeDasharray="6,4" strokeWidth="1.5" />
        </g>

        {/* Messages */}
        {/* 1. Daniel logs in and navigates */}
        <g>
          <rect x="85" y="120" width="10" height="40" fill="#3b82f6" opacity="0.5" />
          <line x1="95" y1="130" x2="205" y2="130" stroke="#e4e4e7" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
          <text x="150" y="122" textAnchor="middle" className="fill-muted-foreground text-xs">1: navigateToEventPage()</text>
        </g>

        {/* 2. UI requests event creation form */}
        <g>
          <rect x="205" y="150" width="10" height="30" fill="#22d3ee" opacity="0.5" />
          <line x1="215" y1="160" x2="345" y2="160" stroke="#e4e4e7" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
          <text x="280" y="152" textAnchor="middle" className="fill-muted-foreground text-xs">2: getEventForm()</text>
        </g>

        {/* 3. Daniel enters event details */}
        <g>
          <rect x="85" y="195" width="10" height="40" fill="#3b82f6" opacity="0.5" />
          <line x1="95" y1="210" x2="205" y2="210" stroke="#e4e4e7" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
          <text x="150" y="202" textAnchor="middle" className="fill-muted-foreground text-xs">3: enterEventDetails()</text>
        </g>

        {/* 4. UI sends create request */}
        <g>
          <rect x="205" y="235" width="10" height="50" fill="#22d3ee" opacity="0.5" />
          <line x1="215" y1="250" x2="345" y2="250" stroke="#e4e4e7" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
          <text x="280" y="242" textAnchor="middle" className="fill-muted-foreground text-xs">4: createEvent(details)</text>
        </g>

        {/* 5. Controller validates with organization */}
        <g>
          <rect x="345" y="270" width="10" height="40" fill="#22d3ee" opacity="0.5" />
          <line x1="355" y1="285" x2="495" y2="285" stroke="#e4e4e7" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
          <text x="425" y="277" textAnchor="middle" className="fill-muted-foreground text-xs">5: validateOfficer(daniel)</text>
        </g>

        {/* 6. Return validation */}
        <g>
          <line x1="495" y1="310" x2="355" y2="310" stroke="#e4e4e7" strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#arrowhead)" />
          <text x="425" y="325" textAnchor="middle" className="fill-muted-foreground text-xs">6: isValid</text>
        </g>

        {/* 7. Create Event object */}
        <g>
          <rect x="345" y="340" width="10" height="40" fill="#22d3ee" opacity="0.5" />
          <line x1="355" y1="355" x2="625" y2="355" stroke="#e4e4e7" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
          <text x="490" y="347" textAnchor="middle" className="fill-muted-foreground text-xs">7: new Event(title, desc, date, loc, capacity)</text>
        </g>

        {/* 8. Add event to org */}
        <g>
          <rect x="625" y="370" width="10" height="30" fill="#22d3ee" opacity="0.5" />
          <line x1="355" y1="385" x2="495" y2="385" stroke="#e4e4e7" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
          <text x="425" y="377" textAnchor="middle" className="fill-muted-foreground text-xs">8: addEvent(event)</text>
        </g>

        {/* 9. Confirmation back */}
        <g>
          <line x1="345" y1="415" x2="215" y2="415" stroke="#e4e4e7" strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#arrowhead)" />
          <text x="280" y="430" textAnchor="middle" className="fill-muted-foreground text-xs">9: eventCreated</text>
        </g>

        {/* Loop Fragment for RSVP */}
        <rect x="40" y="455" width="920" height="200" fill="none" stroke="#71717a" strokeWidth="1.5" rx="4" />
        <rect x="40" y="455" width="80" height="22" fill="#27272a" stroke="#71717a" strokeWidth="1.5" />
        <text x="80" y="470" textAnchor="middle" className="fill-muted-foreground text-xs font-semibold">loop</text>
        <text x="140" y="470" className="fill-muted-foreground text-xs">[for each student until full]</text>

        {/* 10. Student views event */}
        <g>
          <rect x="885" y="485" width="10" height="30" fill="#3b82f6" opacity="0.5" />
          <line x1="885" y1="495" x2="755" y2="495" stroke="#e4e4e7" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
          <text x="820" y="487" textAnchor="middle" className="fill-muted-foreground text-xs">10: viewEvent()</text>
        </g>

        {/* 11. RSVP request */}
        <g>
          <rect x="745" y="515" width="10" height="40" fill="#22d3ee" opacity="0.5" />
          <line x1="745" y1="530" x2="635" y2="530" stroke="#e4e4e7" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
          <text x="690" y="522" textAnchor="middle" className="fill-muted-foreground text-xs">11: rsvp(student)</text>
        </g>

        {/* 12. Check capacity */}
        <g>
          <rect x="625" y="545" width="10" height="30" fill="#22d3ee" opacity="0.5" />
          <line x1="635" y1="555" x2="670" y2="555" stroke="#e4e4e7" strokeWidth="1.5" />
          <line x1="670" y1="555" x2="670" y2="570" stroke="#e4e4e7" strokeWidth="1.5" />
          <line x1="670" y1="570" x2="635" y2="570" stroke="#e4e4e7" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
          <text x="700" y="562" className="fill-muted-foreground text-xs">12: checkCapacity()</text>
        </g>

        {/* Alt fragment */}
        <rect x="580" y="590" width="340" height="55" fill="none" stroke="#71717a" strokeWidth="1" strokeDasharray="4,2" rx="2" />
        <text x="595" y="605" className="fill-muted-foreground text-xs">[if capacity available]</text>

        {/* 13. Add student to attendees */}
        <g>
          <line x1="635" y1="620" x2="745" y2="620" stroke="#e4e4e7" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
          <text x="690" y="612" textAnchor="middle" className="fill-muted-foreground text-xs">13: addAttendee()</text>
        </g>

        {/* 14. Confirmation */}
        <g>
          <line x1="745" y1="640" x2="885" y2="640" stroke="#e4e4e7" strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#arrowhead)" />
          <text x="815" y="655" textAnchor="middle" className="fill-muted-foreground text-xs">14: rsvpConfirmed</text>
        </g>

        {/* Legend */}
        <g transform="translate(50, 710)">
          <rect x="0" y="0" width="12" height="12" fill="#3b82f6" rx="2" />
          <text x="18" y="10" className="fill-muted-foreground text-xs">Actor</text>
          <rect x="80" y="0" width="12" height="12" fill="#22d3ee" rx="2" />
          <text x="98" y="10" className="fill-muted-foreground text-xs">Object</text>
          <line x1="170" y1="6" x2="200" y2="6" stroke="#e4e4e7" strokeWidth="1.5" />
          <text x="208" y="10" className="fill-muted-foreground text-xs">Message</text>
          <line x1="280" y1="6" x2="310" y2="6" stroke="#e4e4e7" strokeWidth="1.5" strokeDasharray="4,2" />
          <text x="318" y="10" className="fill-muted-foreground text-xs">Return</text>
        </g>

        {/* Arrow marker definition */}
        <defs>
          <marker
            id="arrowhead"
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
