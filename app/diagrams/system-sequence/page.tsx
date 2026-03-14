import { DiagramLayout } from "@/components/diagram-layout";
import { SystemSequenceDiagram } from "@/components/diagrams/system-sequence-diagram";

export const metadata = {
  title: "System Sequence Diagram | DiagramHub",
  description: "Learn how to create System Sequence Diagrams for capturing high-level system interactions.",
};

export default function SystemSequenceDiagramPage() {
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
            "Choose a specific scenario to model. For this example, we model Scenario 3: Priya viewing her organizations and upcoming events.",
        },
        {
          step: 2,
          title: "Identify the primary actor",
          description:
            "Determine who initiates the interaction. Here, Priya (a Student) is the primary actor interacting with CampusConnect.",
        },
        {
          step: 3,
          title: "Draw the actor and system",
          description:
            "Create two lifelines: one for the actor on the left and one for the System on the right. The system is treated as a single entity.",
        },
        {
          step: 4,
          title: "Identify system events",
          description:
            "For each action the actor takes, identify the corresponding system operation. Name operations clearly (e.g., login(), viewOrganizations(), viewEventDetails()).",
        },
        {
          step: 5,
          title: "Add system responses",
          description:
            "Show what data the system returns after each operation. Use dashed arrows pointing back to the actor.",
        },
        {
          step: 6,
          title: "Use fragments for conditions",
          description:
            "If the scenario has loops or conditions, add appropriate fragments. Keep SSDs simpler than detailed SDs.",
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
    />
  );
}
