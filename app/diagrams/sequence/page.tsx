import { DiagramLayout } from "@/components/diagram-layout";
import { SequenceDiagram } from "@/components/diagrams/sequence-diagram";

export const metadata = {
  title: "Sequence Diagram | DiagramHub",
  description: "Learn how to create Sequence Diagrams for modeling object interactions over time.",
};

export default function SequenceDiagramPage() {
  return (
    <DiagramLayout
      title="Sequence Diagram"
      abbr="SD"
      description="Models object interactions over time, showing how messages flow between objects in a specific scenario."
      purpose={
        <div className="space-y-4">
          <p>
            A Sequence Diagram (SD) visualizes how objects in a system interact with each other over time. 
            It shows the <strong>sequence of messages</strong> exchanged between objects to accomplish a 
            specific functionality or use case.
          </p>
          <p>Key elements include:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Actors</strong> - External entities that initiate interactions</li>
            <li><strong>Objects/Lifelines</strong> - Participants in the interaction shown as vertical dashed lines</li>
            <li><strong>Messages</strong> - Horizontal arrows showing communication between objects</li>
            <li><strong>Activation bars</strong> - Rectangles showing when an object is active</li>
            <li><strong>Return messages</strong> - Dashed arrows showing responses</li>
          </ul>
          <p>
            Sequence diagrams are particularly useful for understanding the <em>dynamic behavior</em> of a 
            system and validating that your design correctly implements the required functionality.
          </p>
        </div>
      }
      process={[
        {
          step: 1,
          title: "Identify the scenario",
          description:
            "Start by selecting a specific use case or scenario you want to model. For this example, we're modeling Scenario 2: Daniel creating an event and students RSVPing.",
        },
        {
          step: 2,
          title: "Identify participating objects",
          description:
            "List all objects that participate in the interaction. This includes actors (Daniel, Students) and system objects (UI, Controller, Organization, Event, Student).",
        },
        {
          step: 3,
          title: "Draw lifelines",
          description:
            "Create a vertical dashed line for each participant. Place actors on the left, then order objects by their first interaction from left to right.",
        },
        {
          step: 4,
          title: "Add messages in sequence",
          description:
            "Draw horizontal arrows from sender to receiver in chronological order. Label each message with the method name and parameters.",
        },
        {
          step: 5,
          title: "Show activation and returns",
          description:
            "Add activation bars to show when objects are processing. Include return messages (dashed arrows) for important responses.",
        },
        {
          step: 6,
          title: "Add fragments if needed",
          description:
            "Use combined fragments (loop, alt, opt) to show conditional behavior or repetition, like the loop for multiple students RSVPing.",
        },
      ]}
      connections={[
        {
          name: "Domain Class Diagram",
          abbr: "DCD",
          href: "/diagrams/domain-class",
          description: "SD operations should align with DCD methods. The messages in SD become method calls in DCD.",
        },
        {
          name: "System Sequence Diagram",
          abbr: "SSD",
          href: "/diagrams/system-sequence",
          description: "SD provides detailed internal view of operations shown at high-level in SSD.",
        },
        {
          name: "Use Case Diagram",
          abbr: "UCD",
          href: "/diagrams/use-case",
          description: "Each SD typically corresponds to one use case or scenario from the UCD.",
        },
      ]}
      diagram={<SequenceDiagram />}
      nextDiagram={{ name: "System Sequence Diagram", href: "/diagrams/system-sequence" }}
    />
  );
}
