import { DiagramLayout } from "@/components/diagram-layout";
import { DomainModelDiagram } from "@/components/diagrams/domain-model-diagram";

export const metadata = {
  title: "Domain Model | DiagramHub",
  description: "Learn how to create Domain Models for visualizing real-world concepts and relationships.",
};

export default function DomainModelPage() {
  return (
    <DiagramLayout
      title="Domain Model"
      abbr="DMD"
      description="Visualizes the key concepts in the problem domain and the relationships between them, independent of software implementation."
      purpose={
        <div className="space-y-4">
          <p>
            A Domain Model (also called Conceptual Model or Analysis Model) represents the <strong>real-world 
            concepts</strong> relevant to the system being designed. It focuses on the problem space, not the 
            solution space.
          </p>
          <p>Key elements include:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Conceptual Classes</strong> - Real-world things, roles, events, or concepts (with attributes)</li>
            <li><strong>Associations</strong> - Relationships between concepts with names and multiplicities</li>
            <li><strong>Attributes</strong> - Properties of conceptual classes (simple data types only)</li>
            <li><strong>Multiplicity</strong> - How many instances can be related (1, *, 0..1, 1..*)</li>
          </ul>
          <p>
            Domain models do NOT include methods, visibility modifiers, or implementation details. They help 
            <em>understand the domain</em> before designing the software solution.
          </p>
        </div>
      }
      process={[
        {
          step: 1,
          title: "Read the requirements carefully",
          description:
            "Analyze the CampusConnect description to identify nouns that represent important concepts: Student, Organization, Event, Membership, RSVP, etc.",
        },
        {
          step: 2,
          title: "Identify conceptual classes",
          description:
            "List all significant concepts: Student, Organization, Event, MembershipRequest, RSVP. Avoid implementation concepts like Database or Controller.",
        },
        {
          step: 3,
          title: "Add attributes to classes",
          description:
            "For each class, identify simple attributes from the description. Student has name, gtId, email, major. Event has title, description, date, location, capacity.",
        },
        {
          step: 4,
          title: "Identify associations",
          description:
            "Find relationships between concepts by looking for verbs: 'Student belongs to Organization', 'Organization hosts Event', 'Student RSVPs to Event'.",
        },
        {
          step: 5,
          title: "Add association names and multiplicities",
          description:
            "Label each association with a descriptive name. Add multiplicity at each end: A student can belong to many organizations (*).",
        },
        {
          step: 6,
          title: "Refine and validate",
          description:
            "Check that the model captures all domain rules: 'A student cannot be president of more than one organization' should be reflected in the model.",
        },
      ]}
      connections={[
        {
          name: "Domain Class Diagram",
          abbr: "DCD",
          href: "/diagrams/domain-class",
          description: "Domain model evolves into DCD by adding methods, visibility, and implementation details.",
        },
        {
          name: "Use Case Diagram",
          abbr: "UCD",
          href: "/diagrams/use-case",
          description: "Domain model concepts are derived from use case descriptions and scenarios.",
        },
        {
          name: "Sequence Diagram",
          abbr: "SD",
          href: "/diagrams/sequence",
          description: "Domain model entities become objects that interact in sequence diagrams.",
        },
      ]}
      diagram={<DomainModelDiagram />}
      prevDiagram={{ name: "System Sequence Diagram", href: "/diagrams/system-sequence" }}
      nextDiagram={{ name: "Domain Class Diagram", href: "/diagrams/domain-class" }}
    />
  );
}
