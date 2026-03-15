"use client";

import { DiagramLayout } from "@/components/diagram-layout";
import { SequenceDiagram } from "@/components/diagrams/sequence-diagram";

export function SequenceDiagramContent() {
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
            "Choose one specific scenario and keep it focused (main success path first, then add variations). Write the steps in order before drawing anything so you know what interactions must appear. Here we model Scenario 2: Daniel creates an event, and multiple students RSVP to it.",
        },
        {
          step: 2,
          title: "Identify participating objects",
          description:
            "List the participants that must collaborate to make the scenario happen. Start with external actors (Daniel, Students), then add the key internal roles: boundary/UI, controller, and the domain entities involved (Organization, Event, Student). Keep the set small; if you add many objects that never exchange messages, the diagram will get noisy fast.",
        },
        {
          step: 3,
          title: "Draw lifelines",
          description:
            "Draw a lifeline for each participant and order them left-to-right by the expected call chain: actors, then boundary/UI, then controller, then domain objects. Use consistent naming (e.g., `:EventController` for an instance) and keep spacing wide enough to avoid overlapping messages.",
        },
        {
          step: 4,
          title: "Add messages in sequence",
          description:
            "Add messages top-to-bottom in time order. Each arrow should be a method call or signal with parameters that match your design (e.g., `createEvent(details)`). Use self-messages for internal work within an object (like `checkCapacity()` on Event). If you find yourself drawing UI-specific events (button clicks), lift the message up to the system-operation level instead.",
        },
        {
          step: 5,
          title: "Show activation and returns",
          description:
            "Add activation bars to show when an object is executing because it received a message. Then add important returns (dashed arrows) to clarify what information flows back (e.g., validation success, confirmation). You don’t need to label every return, but the ones that drive later decisions should be explicit.",
        },
        {
          step: 6,
          title: "Add fragments if needed",
          description:
            "Use combined fragments to model structure: `loop` for repetition (multiple students RSVPing), `alt` for branching (capacity full vs. success), and `opt` for optional steps. Put a guard condition in brackets, and keep fragments aligned with the scenario text so the diagram stays easy to validate.",
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
      renderDiagram={(currentStep) => <SequenceDiagram currentStep={currentStep} />}
      nextDiagram={{ name: "System Sequence Diagram", href: "/diagrams/system-sequence" }}
    />
  );
}
