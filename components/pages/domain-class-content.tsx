"use client";

import { DiagramLayout } from "@/components/diagram-layout";
import { DomainClassDiagram } from "@/components/diagrams/domain-class-diagram";

export function DomainClassContent() {
  return (
    <DiagramLayout
      title="Domain Class Diagram"
      abbr="DCD"
      description="Defines the software classes that will implement the domain, including attributes, methods, and their relationships."
      purpose={
        <div className="space-y-4">
          <p>
            A Domain Class Diagram (DCD) shows the <strong>software design classes</strong> that implement 
            the concepts from the domain model. Unlike domain models, DCDs include implementation details.
          </p>
          <p>Key elements include:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Classes</strong> - With three compartments: name, attributes, methods</li>
            <li><strong>Visibility</strong> - Public (+), private (-), protected (#)</li>
            <li><strong>Attributes</strong> - With types and default values</li>
            <li><strong>Methods</strong> - With parameters and return types</li>
            <li><strong>Relationships</strong> - Association, aggregation, composition, inheritance</li>
          </ul>
          <p>
            DCDs bridge the gap between analysis (domain model) and implementation (code). 
            Methods should align with operations identified in sequence diagrams.
          </p>
        </div>
      }
      process={[
        {
          step: 1,
          title: "Start from the domain model",
          description:
            "Use your domain model as a starting point. Each conceptual class may become one or more software classes.",
        },
        {
          step: 2,
          title: "Add implementation classes",
          description:
            "Add controller classes, UI classes, or other software-specific classes. For CampusConnect, add EventController to handle event operations.",
        },
        {
          step: 3,
          title: "Define attributes with types",
          description:
            "Convert domain attributes to typed programming attributes. Add visibility (typically private for attributes). Include data types like String, int, Date, List<>.",
        },
        {
          step: 4,
          title: "Add methods from sequence diagrams",
          description:
            "Look at your sequence diagrams. Each message becomes a method. The createEvent(details) message becomes a createEvent() method in the appropriate class.",
        },
        {
          step: 5,
          title: "Specify relationship types",
          description:
            "Determine if relationships are associations, aggregations, or compositions. Organization to Event is composition (events don't exist without org). Use appropriate symbols.",
        },
        {
          step: 6,
          title: "Add navigability arrows",
          description:
            "Show which direction relationships can be traversed. If Organization needs to access its Events but not vice versa, arrow points to Event.",
        },
      ]}
      connections={[
        {
          name: "Domain Model",
          abbr: "DMD",
          href: "/diagrams/domain-model",
          description: "DCD evolves from the domain model, adding methods, visibility, and implementation details.",
        },
        {
          name: "Sequence Diagram",
          abbr: "SD",
          href: "/diagrams/sequence",
          description: "Methods in DCD come from messages in sequence diagrams. They must be consistent.",
        },
        {
          name: "System Sequence Diagram",
          abbr: "SSD",
          href: "/diagrams/system-sequence",
          description: "System operations in SSD become methods in controller classes of the DCD.",
        },
      ]}
      renderDiagram={(currentStep) => <DomainClassDiagram currentStep={currentStep} />}
      prevDiagram={{ name: "Domain Model", href: "/diagrams/domain-model" }}
      nextDiagram={{ name: "Use Case Diagram", href: "/diagrams/use-case" }}
    />
  );
}
