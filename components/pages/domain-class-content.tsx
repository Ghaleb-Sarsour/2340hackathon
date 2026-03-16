"use client";

import { DiagramLayout } from "@/components/diagram-layout";
import { DiagramQuiz, type QuizQuestion } from "@/components/diagram-quiz";
import { DomainClassDiagram } from "@/components/diagrams/domain-class-diagram";

const quizQuestions: QuizQuestion[] = [
  {
    id: "dcd-1",
    question: "Compared to a Domain Model, a Domain Class Diagram primarily adds:",
    options: [
      "Methods, visibility, and types suitable for implementation",
      "Only nouns from requirements (no attributes)",
      "Only actors and use cases",
      "Only system events between actor and system",
    ],
    correctIndex: 0,
    explanation: "A DCD is a design artifact: it includes typed attributes, methods, and visibility to support implementation.",
  },
  {
    id: "dcd-2",
    question: "Which visibility symbol indicates a public member in UML?",
    options: ["+", "-", "#", "~"],
    correctIndex: 0,
    explanation: "+ is public, - is private, # is protected, and ~ is package/internal (depending on notation).",
  },
  {
    id: "dcd-3",
    question: "A reliable source for candidate methods in a DCD is:",
    options: ["The UI mockups", "Messages in sequence diagrams", "Database schema", "Deployment diagrams"],
    correctIndex: 1,
    explanation: "Messages in sequence diagrams often map directly to operations on the receiving classes.",
  },
  {
    id: "dcd-4",
    question: "Which relationship best represents strong ownership/lifecycle dependency?",
    options: ["Association", "Aggregation", "Composition", "Dependency"],
    correctIndex: 2,
    explanation: "Composition (filled diamond) implies the part’s lifecycle is owned by the whole.",
  },
  {
    id: "dcd-5",
    question: "Navigability arrows in a DCD indicate:",
    options: [
      "The order messages are sent in time",
      "Which class holds a reference/needs to know about the other",
      "Which use case is optional",
      "Which actor can initiate the use case",
    ],
    correctIndex: 1,
    explanation: "Navigability clarifies reference direction to reduce unnecessary coupling.",
  },
];

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
            "Begin with your domain model concepts and decide which ones become software classes (often entity classes). Keep the same names where possible to preserve shared vocabulary. If a concept needs multiple software representations (e.g., a value object vs. an entity), split it intentionally and document the reason.",
        },
        {
          step: 2,
          title: "Add implementation classes",
          description:
            "Add software-only classes required to implement the behaviors from your scenarios, such as controllers or boundary/UI collaborators. For CampusConnect, introduce an `EventController` to coordinate event creation and RSVPs. This step is where you move from \"what exists in the domain\" to \"what we need to build it\".",
        },
        {
          step: 3,
          title: "Define attributes with types",
          description:
            "Convert conceptual attributes into typed attributes suitable for code. Add types (`String`, `Date`, `int`, `List<Student>`) and decide visibility conventions (typically private fields with public accessors). Use collections when multiplicities demand them (e.g., an Event has many attendees).",
        },
        {
          step: 4,
          title: "Add methods from sequence diagrams",
          description:
            "Use your sequence diagrams as the source of truth for operations: each message is a candidate method on the receiving class. Place methods where responsibility naturally belongs (controller methods coordinate, entity methods enforce local rules). Then refine signatures: parameters, return types, and any error/validation outcomes you need to express.",
        },
        {
          step: 5,
          title: "Specify relationship types",
          description:
            "Decide what each relationship means in software terms: association, aggregation, composition, inheritance, or dependency. Add multiplicities where it clarifies collection ownership and cardinality. For example, if Events are owned by an Organization, you might model that with composition or an owned collection on Organization.",
        },
        {
          step: 6,
          title: "Add navigability arrows",
          description:
            "Add navigability to show which direction references are needed in code. Keep navigability minimal: only add arrows when one side truly needs to know about the other. This helps prevent unnecessary coupling (e.g., Organization knows its Events, but an Event may not need a back-reference to Organization in your design).",
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
      quiz={<DiagramQuiz title="Domain Class Diagram Quiz" questions={quizQuestions} />}
    />
  );
}
