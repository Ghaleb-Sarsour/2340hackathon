"use client";

import { DiagramLayout } from "@/components/diagram-layout";
import { DiagramQuiz, type QuizQuestion } from "@/components/diagram-quiz";
import { SystemSequenceDiagram } from "@/components/diagrams/system-sequence-diagram";

const quizQuestions: QuizQuestion[] = [
  {
    id: "ssd-1",
    question: "A System Sequence Diagram (SSD) treats the system as:",
    options: ["A collection of collaborating internal objects", "A black box with a single system lifeline", "A database schema", "A set of use cases only"],
    correctIndex: 1,
    explanation: "SSDs model actor-to-system interaction while hiding internal design details.",
  },
  {
    id: "ssd-2",
    question: "An SSD typically shows how many primary lifelines?",
    options: ["One (system only)", "Two (actor and system)", "Three (actor, UI, controller)", "Many (all domain entities)"],
    correctIndex: 1,
    explanation: "The basic SSD has the actor and a single system lifeline (e.g., :CampusConnect).",
  },
  {
    id: "ssd-3",
    question: "Messages in an SSD represent:",
    options: ["Private method calls between classes", "System events/operations requested by the actor", "Class attributes", "Actor generalization"],
    correctIndex: 1,
    explanation: "Each message is a system operation such as login(credentials) or viewUpcomingEvents().",
  },
  {
    id: "ssd-4",
    question: "Should an SSD show internal objects like controllers and entities?",
    options: ["Yes, always", "Only when using alt fragments", "No, internal collaboration belongs in a detailed sequence diagram", "Only for database calls"],
    correctIndex: 2,
    explanation: "SSDs stay at the system boundary; internal object interactions are modeled in sequence diagrams.",
  },
  {
    id: "ssd-5",
    question: "Which combined fragment is used to show optional behavior?",
    options: ["loop", "alt", "opt", "ref"],
    correctIndex: 2,
    explanation: "opt denotes optional behavior that happens only if the guard condition holds.",
  },
];

export function SystemSequenceContent() {
  return (
    <DiagramLayout
      title="System Sequence Diagram"
      abbr="SSD"
      description="Shows interactions between an actor and the system as a black box, focusing on system events for a use case scenario."
      purpose={
        <div className="space-y-4">
          <p>
            A System Sequence Diagram (SSD) illustrates the interaction between an <strong>external actor</strong> and 
            the <strong>system as a whole</strong>, treating the system as a black box. Unlike detailed sequence 
            diagrams, SSDs don&apos;t show internal object interactions.
          </p>
          <p>Key elements include:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Actor</strong> - The external entity initiating the interaction</li>
            <li><strong>System</strong> - Represented as a single object (black box)</li>
            <li><strong>System Events</strong> - Operations the actor requests from the system</li>
            <li><strong>Return Data</strong> - Information the system provides back</li>
          </ul>
          <p>
            SSDs are valuable in <em>early analysis</em> to identify what operations the system must support 
            before designing the internal architecture. They bridge the gap between use cases and detailed design.
          </p>
        </div>
      }
      process={[
        {
          step: 1,
          title: "Select a scenario from a use case",
          description:
            "Pick one concrete use case scenario (main success path first) and write the steps as a short narrative. The SSD should model a single interaction story end-to-end. For this example we use Scenario 3: Priya logs in, views her organizations, views upcoming events, optionally inspects details, then logs out.",
        },
        {
          step: 2,
          title: "Identify the primary actor",
          description:
            "Identify who initiates the scenario (the primary actor). Put them on the left, and keep them at the role level (Student) even if you use a name (Priya) for readability. Secondary actors or external systems can be added later, but SSDs usually focus on the main actor-system exchange.",
        },
        {
          step: 3,
          title: "Draw the actor and system",
          description:
            "Draw exactly two lifelines: the actor and a single \"System\" lifeline (CampusConnect) as a black box. Label the system lifeline clearly (e.g., :CampusConnect). Don’t model internal objects yet; the goal is to define the system’s public events and responses.",
        },
        {
          step: 4,
          title: "Identify system events",
          description:
            "Convert each actor intent into a system event (an operation the actor requests from the system). Use clear operation names and meaningful parameters: `login(credentials)`, `viewMyOrganizations()`, `viewUpcomingEvents()`, `viewEventDetails(eventId)`. If you can’t name the operation cleanly, it’s a hint the use case step needs refinement.",
        },
        {
          step: 5,
          title: "Add system responses",
          description:
            "For each system event, annotate what the system returns (data, confirmation, or error). Use dashed return arrows back to the actor and keep the response at the data level (e.g., `eventList`, `eventDetails`) rather than UI rendering details (screens, buttons).",
        },
        {
          step: 6,
          title: "Use fragments for conditions",
          description:
            "Add a combined fragment only when it improves clarity: `opt` for optional behavior (e.g., viewing event details only if an event is selected), `alt` for branching (success vs. failure), and `loop` for repetition. Keep fragments lightweight in SSDs; detailed object-level branching belongs in a full sequence diagram.",
        },
      ]}
      connections={[
        {
          name: "Use Case Diagram",
          abbr: "UCD",
          href: "/diagrams/use-case",
          description: "Each SSD corresponds to a use case scenario. The actor and operations come from the UCD.",
        },
        {
          name: "Sequence Diagram",
          abbr: "SD",
          href: "/diagrams/sequence",
          description: "SSDs are expanded into detailed SDs showing internal object collaboration.",
        },
        {
          name: "Domain Class Diagram",
          abbr: "DCD",
          href: "/diagrams/domain-class",
          description: "System operations in SSD become controller methods in the DCD.",
        },
      ]}
      renderDiagram={(currentStep) => <SystemSequenceDiagram currentStep={currentStep} />}
      prevDiagram={{ name: "Sequence Diagram", href: "/diagrams/sequence" }}
      nextDiagram={{ name: "Domain Model", href: "/diagrams/domain-model" }}
      quiz={<DiagramQuiz title="System Sequence Diagram Quiz" questions={quizQuestions} />}
    />
  );
}
