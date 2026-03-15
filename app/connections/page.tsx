import Link from "next/link";
import { ArrowRight, GitBranch, Network } from "lucide-react";

export const metadata = {
  title: "Diagram Connections | DiagramHub",
  description: "Understand how UML diagrams connect and inform each other in the software design process.",
};

const connections = [
  {
    from: "Use Case Diagram",
    fromAbbr: "UCD",
    fromHref: "/diagrams/use-case",
    to: "System Sequence Diagram",
    toAbbr: "SSD",
    toHref: "/diagrams/system-sequence",
    description: "Each use case scenario is detailed in an SSD showing the actor-system interactions at a high level.",
  },
  {
    from: "Use Case Diagram",
    fromAbbr: "UCD",
    fromHref: "/diagrams/use-case",
    to: "Domain Model",
    toAbbr: "DMD",
    toHref: "/diagrams/domain-model",
    description: "Use case descriptions contain nouns that become conceptual classes in the domain model.",
  },
  {
    from: "System Sequence Diagram",
    fromAbbr: "SSD",
    fromHref: "/diagrams/system-sequence",
    to: "Sequence Diagram",
    toAbbr: "SD",
    toHref: "/diagrams/sequence",
    description: "SSDs are expanded into detailed SDs showing how internal objects collaborate to fulfill system operations.",
  },
  {
    from: "System Sequence Diagram",
    fromAbbr: "SSD",
    fromHref: "/diagrams/system-sequence",
    to: "Domain Class Diagram",
    toAbbr: "DCD",
    toHref: "/diagrams/domain-class",
    description: "System operations in the SSD become methods in controller classes of the DCD.",
  },
  {
    from: "Domain Model",
    fromAbbr: "DMD",
    fromHref: "/diagrams/domain-model",
    to: "Domain Class Diagram",
    toAbbr: "DCD",
    toHref: "/diagrams/domain-class",
    description: "Domain model conceptual classes evolve into software classes with methods and visibility in the DCD.",
  },
  {
    from: "Sequence Diagram",
    fromAbbr: "SD",
    fromHref: "/diagrams/sequence",
    to: "Domain Class Diagram",
    toAbbr: "DCD",
    toHref: "/diagrams/domain-class",
    description: "Messages in sequence diagrams become methods in classes. The SD helps identify which class should have each method.",
  },
];

export default function ConnectionsPage() {
  return (
    <div className="min-h-screen pb-16">
      {/* Header */}
      <div className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Network className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Diagram Connections</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Understanding how diagrams connect is crucial for creating consistent software designs. 
            Each diagram informs and validates others in the development process.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Flow Overview */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-6">Development Flow</h2>
          <div className="bg-card border border-border rounded-2xl p-8">
            <div className="flex flex-wrap items-center justify-center gap-4 text-center">
              <Link href="/diagrams/use-case" className="group">
                <div className="px-6 py-4 rounded-xl bg-amber-500/10 border border-amber-500/30 hover:border-amber-500 transition-colors">
                  <div className="text-amber-400 font-semibold">UCD</div>
                  <div className="text-xs text-muted-foreground mt-1">Use Cases</div>
                </div>
              </Link>
              
              <ArrowRight className="h-5 w-5 text-muted-foreground hidden sm:block" />
              
              <Link href="/diagrams/domain-model" className="group">
                <div className="px-6 py-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 hover:border-emerald-500 transition-colors">
                  <div className="text-emerald-400 font-semibold">DMD</div>
                  <div className="text-xs text-muted-foreground mt-1">Domain Model</div>
                </div>
              </Link>
              
              <ArrowRight className="h-5 w-5 text-muted-foreground hidden sm:block" />
              
              <Link href="/diagrams/system-sequence" className="group">
                <div className="px-6 py-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30 hover:border-cyan-500 transition-colors">
                  <div className="text-cyan-400 font-semibold">SSD</div>
                  <div className="text-xs text-muted-foreground mt-1">System Sequence</div>
                </div>
              </Link>
              
              <ArrowRight className="h-5 w-5 text-muted-foreground hidden sm:block" />
              
              <Link href="/diagrams/sequence" className="group">
                <div className="px-6 py-4 rounded-xl bg-blue-500/10 border border-blue-500/30 hover:border-blue-500 transition-colors">
                  <div className="text-blue-400 font-semibold">SD</div>
                  <div className="text-xs text-muted-foreground mt-1">Sequence</div>
                </div>
              </Link>
              
              <ArrowRight className="h-5 w-5 text-muted-foreground hidden sm:block" />
              
              <Link href="/diagrams/domain-class" className="group">
                <div className="px-6 py-4 rounded-xl bg-violet-500/10 border border-violet-500/30 hover:border-violet-500 transition-colors">
                  <div className="text-violet-400 font-semibold">DCD</div>
                  <div className="text-xs text-muted-foreground mt-1">Domain Class</div>
                </div>
              </Link>
            </div>
            
            <p className="text-center text-sm text-muted-foreground mt-6">
              This shows a typical development flow, though in practice you&apos;ll iterate between diagrams.
            </p>
          </div>
        </section>

        {/* Detailed Connections */}
        <section>
          <h2 className="text-xl font-semibold mb-6">Detailed Connections</h2>
          <div className="grid gap-4">
            {connections.map((conn, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-6 hover:border-border/80 transition-colors"
              >
                <div className="flex flex-wrap items-center gap-4 mb-3">
                  <Link
                    href={conn.fromHref}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                  >
                    <span className="font-medium text-sm">{conn.from}</span>
                    <span className="font-mono text-xs text-muted-foreground">({conn.fromAbbr})</span>
                  </Link>
                  
                  <ArrowRight className="h-4 w-4 text-primary" />
                  
                  <Link
                    href={conn.toHref}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                  >
                    <span className="font-medium text-sm">{conn.to}</span>
                    <span className="font-mono text-xs text-muted-foreground">({conn.toAbbr})</span>
                  </Link>
                </div>
                
                <p className="text-sm text-muted-foreground">{conn.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Consistency Tips */}
        <section className="mt-16">
          <h2 className="text-xl font-semibold mb-6">Maintaining Consistency</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 mb-4">
                <span className="font-mono text-sm">1</span>
              </div>
              <h3 className="font-semibold mb-2">Match Operations</h3>
              <p className="text-sm text-muted-foreground">
                System operations in SSDs should match messages in SDs and methods in DCDs. 
                If you add createEvent() in an SSD, it must appear in your SD and DCD.
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 mb-4">
                <span className="font-mono text-sm">2</span>
              </div>
              <h3 className="font-semibold mb-2">Trace Concepts</h3>
              <p className="text-sm text-muted-foreground">
                Conceptual classes from the domain model should map to classes in the DCD. 
                Student, Organization, and Event should appear in both diagrams.
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 mb-4">
                <span className="font-mono text-sm">3</span>
              </div>
              <h3 className="font-semibold mb-2">Validate Scenarios</h3>
              <p className="text-sm text-muted-foreground">
                Each use case scenario should be traceable through SSDs and SDs. 
                Walk through Scenario 2 and ensure all diagrams support the event creation flow.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <GitBranch className="h-4 w-4" />
              <span>DiagramHub for CS 2340</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Georgia Institute of Technology
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
