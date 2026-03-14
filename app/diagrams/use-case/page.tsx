import { DiagramLayout } from "@/components/diagram-layout";
import { UseCaseDiagram } from "@/components/diagrams/use-case-diagram";

export const metadata = {
  title: "Use Case Diagram | DiagramHub",
  description: "Learn how to create Use Case Diagrams mapping actors to system functionalities.",
};

export default function UseCaseDiagramPage() {
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
            "Find everyone who interacts with the system. For CampusConnect: Student, President (specialization of Student), Officer, and the external Authentication System.",
        },
        {
          step: 2,
          title: "List all use cases from scenarios",
          description:
            "Extract functionalities from the three scenarios: Login, Search Organization, Request Membership, Approve/Reject Request, Create Event, RSVP to Event, View Organizations, View Events.",
        },
        {
          step: 3,
          title: "Draw the system boundary",
          description:
            "Create a rectangle representing CampusConnect. All use cases go inside; actors go outside.",
        },
        {
          step: 4,
          title: "Connect actors to use cases",
          description:
            "Draw lines from each actor to the use cases they can perform. Students can Login, Search, Request Membership, RSVP. Presidents can additionally Approve/Reject.",
        },
        {
          step: 5,
          title: "Add include relationships",
          description:
            "Use <<include>> when a use case always requires another. Viewing Events might include being authenticated.",
        },
        {
          step: 6,
          title: "Add extend relationships",
          description:
            "Use <<extend>> for optional behavior. Cancel RSVP extends RSVP to Event since it's optional.",
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
      diagram={<UseCaseDiagram />}
      prevDiagram={{ name: "Domain Class Diagram", href: "/diagrams/domain-class" }}
    />
  );
}
