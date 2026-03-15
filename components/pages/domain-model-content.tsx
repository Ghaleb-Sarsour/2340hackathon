"use client";

import { DiagramLayout } from "@/components/diagram-layout";
import { DomainModelDiagram } from "@/components/diagrams/domain-model-diagram";

export function DomainModelContent() {
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
            "Start by reading the requirements and scenarios end-to-end, then circle the important nouns and noun phrases. These are candidates for domain concepts (Student, Organization, Event, Membership, RSVP, MembershipRequest). Don’t worry about perfect naming on the first pass; the goal is to capture the domain vocabulary.",
        },
        {
          step: 2,
          title: "Identify conceptual classes",
          description:
            "Promote the most important real-world concepts into conceptual classes. Prefer things the users care about and talk about, and avoid solution/implementation artifacts (Database, API, Controller, Screen). If a concept only exists to link two others (like RSVP linking Student and Event), consider making it its own conceptual class.",
        },
        {
          step: 3,
          title: "Add attributes to classes",
          description:
            "For each conceptual class, add a small set of simple, descriptive attributes (mostly primitives or simple value types). Keep them domain-focused: Student might have `name`, `gtId`, `email`; Event might have `title`, `date`, `location`, `capacity`. Avoid methods and avoid attributes that are really relationships (e.g., don’t store `organizationList` as an attribute if it’s an association).",
        },
        {
          step: 4,
          title: "Identify associations",
          description:
            "Look for verbs that connect your concepts and turn them into associations: a Student submits a MembershipRequest, a Membership belongs to an Organization, an Organization hosts Events, a Student makes an RSVP for an Event. At this stage, draw the relationships as lines first; you can refine names and cardinalities next.",
        },
        {
          step: 5,
          title: "Add association names and multiplicities",
          description:
            "Name each association with a short verb phrase (e.g., \"hosts\", \"submits\", \"belongs to\") and then add multiplicities on both ends. Read them as sentences to validate: \"One Organization hosts many Events\" (1 to *). If you discover a hidden constraint (like optionality), capture it with `0..1` or `1..*` rather than guessing.",
        },
        {
          step: 6,
          title: "Refine and validate",
          description:
            "Do a final validation pass: remove redundant concepts, merge duplicates, and verify each association is justified by the requirements. Check important domain rules and ask whether they need structural representation (multiplicities/associations) or should be documented as constraints. The domain model should feel like an accurate map of the real problem space, not a preview of your code.",
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
      renderDiagram={(currentStep) => <DomainModelDiagram currentStep={currentStep} />}
      prevDiagram={{ name: "System Sequence Diagram", href: "/diagrams/system-sequence" }}
      nextDiagram={{ name: "Domain Class Diagram", href: "/diagrams/domain-class" }}
    />
  );
}
