"use client";

import { DiagramLayout } from "@/components/diagram-layout";
import { UseCaseDiagram } from "@/components/diagrams/use-case-diagram";

export function UseCaseContent() {
  return (
    <DiagramLayout
      title="Use Case Diagram"
      abbr="UCD"
      description="Maps actors to the functionalities (use cases) they can perform in the system, providing a high-level view of system requirements."
      purpose={
        <div className="space-y-4">
          <p>
            A Use Case Diagram (UCD) provides a <strong>high-level overview</strong> of the system&apos;s 
            functionality from the user&apos;s perspective. It shows who uses the system and what they can do.
          </p>
          <p>Key elements include:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Actors</strong> - External entities (users, systems) that interact with the system</li>
            <li><strong>Use Cases</strong> - Functionalities or goals the system provides (ovals)</li>
            <li><strong>System Boundary</strong> - Rectangle showing the scope of the system</li>
            <li><strong>Associations</strong> - Lines connecting actors to their use cases</li>
            <li><strong>Include/Extend</strong> - Relationships between use cases</li>
          </ul>
          <p>
            UCDs are valuable for <em>requirements gathering</em> and communicating with stakeholders. 
            They answer the question: &quot;What can users do with this system?&quot;
          </p>
        </div>
      }
      process={[
        {
          step: 1,
          title: "Identify all actors",
          description:
            "List every external role or system that interacts with CampusConnect. Start with the people roles from the requirements (Student, Officer, President), then add any external systems your app depends on (e.g., an Authentication System). If one actor is a specialized version of another, model that with generalization (President is a specialized Student) so you don’t duplicate associations later.",
        },
        {
          step: 2,
          title: "List all use cases from scenarios",
          description:
            "Turn each scenario into 1 or more goal-oriented verb phrases (what the user wants to accomplish), not UI clicks. Use case names should be short and action-based (e.g., Login, Search Org, Request Membership, Create Event, RSVP Event, View Events). Keep the level of detail consistent: if \"Create Event\" is a goal, don’t also list micro-steps like \"Click Submit\" as separate use cases.",
        },
        {
          step: 3,
          title: "Draw the system boundary",
          description:
            "Draw a system boundary rectangle labeled \"CampusConnect\" to make scope explicit. Put all use cases inside the boundary and keep actors outside. If you’re unsure whether something belongs inside (e.g., Auth System), ask: is it built as part of CampusConnect or an external dependency? External dependencies stay outside as actors.",
        },
        {
          step: 4,
          title: "Connect actors to use cases",
          description:
            "Add associations (plain lines) from each actor to the use cases they initiate or participate in. Aim for clarity over completeness: connect Student to the common actions (Login, Search Org, Request Membership, View Orgs/Events, RSVP Event), Officer to event management actions, and President to approval actions. Use actor generalization to inherit connections rather than redrawing the same links.",
        },
        {
          step: 5,
          title: "Add include relationships",
          description:
            "Add an «include» when multiple use cases share the same required sub-flow that you want to factor out (common reuse). Draw a dashed arrow from the base use case to the included use case and label it «include». Avoid using «include» just to represent a prerequisite; instead, reserve it for true shared behavior you want to reuse across use cases.",
        },
        {
          step: 6,
          title: "Add extend relationships",
          description:
            "Use «extend» for optional or conditional behavior that augments a base use case. Draw a dashed arrow from the extending use case to the base use case and label it «extend». For CampusConnect, \"Cancel RSVP\" is a good example of an optional extension of \"RSVP Event\" (it happens only if the user chooses to undo an RSVP).",
        },
      ]}
      connections={[
        {
          name: "System Sequence Diagram",
          abbr: "SSD",
          href: "/diagrams/system-sequence",
          description: "Each use case scenario can be detailed in an SSD showing actor-system interactions.",
        },
        {
          name: "Sequence Diagram",
          abbr: "SD",
          href: "/diagrams/sequence",
          description: "Use cases are realized through sequence diagrams showing detailed object interactions.",
        },
        {
          name: "Domain Model",
          abbr: "DMD",
          href: "/diagrams/domain-model",
          description: "Use case descriptions help identify domain concepts for the domain model.",
        },
      ]}
      renderDiagram={(currentStep) => <UseCaseDiagram currentStep={currentStep} />}
      prevDiagram={{ name: "Domain Class Diagram", href: "/diagrams/domain-class" }}
    />
  );
}
