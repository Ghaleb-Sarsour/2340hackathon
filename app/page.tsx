import Link from "next/link";
import { ArrowRight, BookOpen, Layers, Network, Users, Workflow, GitBranch } from "lucide-react";

const diagrams = [
  {
    name: "Sequence Diagram",
    abbr: "SD",
    href: "/diagrams/sequence",
    description: "Model object interactions over time with messages and lifelines",
    icon: Workflow,
    color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
  {
    name: "System Sequence Diagram",
    abbr: "SSD",
    href: "/diagrams/system-sequence",
    description: "Capture high-level system interactions for use case scenarios",
    icon: Network,
    color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  },
  {
    name: "Domain Model",
    abbr: "DMD",
    href: "/diagrams/domain-model",
    description: "Visualize real-world concepts and their relationships",
    icon: Layers,
    color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  {
    name: "Domain Class Diagram",
    abbr: "DCD",
    href: "/diagrams/domain-class",
    description: "Define software classes with attributes and methods",
    icon: GitBranch,
    color: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  },
  {
    name: "Use Case Diagram",
    abbr: "UCD",
    href: "/diagrams/use-case",
    description: "Map actors to system functionalities and interactions",
    icon: Users,
    color: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm text-muted-foreground mb-6">
              <BookOpen className="h-4 w-4" />
              CS 2340 Objects and Design
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
              Master UML Diagrams
              <span className="block text-primary mt-2">with Clarity</span>
            </h1>
            
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl text-pretty">
              Learn how to create professional software design diagrams. From Sequence Diagrams to Use Case models, 
              understand the purpose, process, and connections between each diagram type.
            </p>
            
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/diagrams/sequence"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Start Learning
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/connections"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-secondary/50 px-6 py-3 text-sm font-semibold text-foreground hover:bg-secondary transition-colors"
              >
                View Connections
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Diagrams Grid */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-12">
          <h2 className="text-2xl font-bold tracking-tight">Explore Diagrams</h2>
          <p className="mt-2 text-muted-foreground">
            Click on any diagram type to learn its purpose, see examples, and understand the creation process.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {diagrams.map((diagram) => (
            <Link
              key={diagram.href}
              href={diagram.href}
              className="group relative rounded-2xl border border-border bg-card p-6 hover:border-primary/50 hover:bg-card/80 transition-all duration-300"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl border ${diagram.color} mb-4`}>
                <diagram.icon className="h-6 w-6" />
              </div>
              
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {diagram.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {diagram.description}
                  </p>
                </div>
                <span className="shrink-0 font-mono text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">
                  {diagram.abbr}
                </span>
              </div>
              
              <div className="mt-4 flex items-center gap-1 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more <ArrowRight className="h-3 w-3" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Context Section */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight mb-4">CampusConnect Context</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              All diagrams on this site are built around CampusConnect, a centralized platform designed for 
              Georgia Tech to manage student organizations, memberships, and events across campus.
            </p>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-semibold text-sm text-foreground mb-2">Key Entities</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Students, Organizations, Events</li>
                  <li>Memberships, RSVPs, Requests</li>
                  <li>Presidents, Officers, Members</li>
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-semibold text-sm text-foreground mb-2">Core Scenarios</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Joining an organization</li>
                  <li>Creating and managing events</li>
                  <li>Viewing participation history</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
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
