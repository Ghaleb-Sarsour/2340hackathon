"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, Lightbulb, ListChecks, Link2, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface DiagramLayoutProps {
  title: string;
  abbr: string;
  description: string;
  purpose: React.ReactNode;
  process: { step: number; title: string; description: string }[];
  connections: { name: string; abbr: string; href: string; description: string }[];
  diagram: React.ReactNode;
  prevDiagram?: { name: string; href: string };
  nextDiagram?: { name: string; href: string };
}

export function DiagramLayout({
  title,
  abbr,
  description,
  purpose,
  process,
  connections,
  diagram,
  prevDiagram,
  nextDiagram,
}: DiagramLayoutProps) {
  const [activeTab, setActiveTab] = useState<"purpose" | "process" | "connections">("purpose");
  const [expandedSteps, setExpandedSteps] = useState<number[]>([1]);

  const toggleStep = (step: number) => {
    setExpandedSteps((prev) =>
      prev.includes(step) ? prev.filter((s) => s !== step) : [...prev, step]
    );
  };

  return (
    <div className="min-h-screen pb-16">
      {/* Header */}
      <div className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                <span className="font-mono text-sm text-muted-foreground bg-secondary px-2.5 py-1 rounded-lg">
                  {abbr}
                </span>
              </div>
              <p className="text-muted-foreground max-w-2xl">{description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <div className="flex gap-1 p-1 bg-muted rounded-xl">
              {[
                { id: "purpose", label: "Purpose", icon: Lightbulb },
                { id: "process", label: "Process", icon: ListChecks },
                { id: "connections", label: "Links", icon: Link2 },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all",
                    activeTab === tab.id
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <tab.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-card border border-border rounded-2xl p-6">
              {activeTab === "purpose" && (
                <div>
                  <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
                    <Lightbulb className="h-5 w-5 text-amber-400" />
                    Purpose
                  </h2>
                  <div className="prose prose-sm prose-invert max-w-none text-muted-foreground">
                    {purpose}
                  </div>
                </div>
              )}

              {activeTab === "process" && (
                <div>
                  <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
                    <ListChecks className="h-5 w-5 text-emerald-400" />
                    Building Process
                  </h2>
                  <div className="space-y-3">
                    {process.map((item) => (
                      <div
                        key={item.step}
                        className="border border-border rounded-xl overflow-hidden"
                      >
                        <button
                          onClick={() => toggleStep(item.step)}
                          className="w-full flex items-center gap-3 p-4 text-left hover:bg-secondary/50 transition-colors"
                        >
                          <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10 text-primary text-sm font-semibold">
                            {item.step}
                          </span>
                          <span className="flex-1 font-medium text-sm">{item.title}</span>
                          {expandedSteps.includes(item.step) ? (
                            <ChevronUp className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                          )}
                        </button>
                        {expandedSteps.includes(item.step) && (
                          <div className="px-4 pb-4 pt-0">
                            <p className="text-sm text-muted-foreground pl-10 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "connections" && (
                <div>
                  <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
                    <Link2 className="h-5 w-5 text-cyan-400" />
                    Diagram Connections
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    See how this diagram relates to other UML diagrams in the design process.
                  </p>
                  <div className="space-y-2">
                    {connections.map((conn) => (
                      <Link
                        key={conn.href}
                        href={conn.href}
                        className="block p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-secondary/30 transition-all group"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm group-hover:text-primary transition-colors">
                            {conn.name}
                          </span>
                          <span className="font-mono text-xs text-muted-foreground">
                            {conn.abbr}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">{conn.description}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Diagram Display */}
          <div className="lg:col-span-3">
            <div className="sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">Diagram</h2>
              </div>
              <div className="bg-card border border-border rounded-2xl p-6 overflow-auto">
                {diagram}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-12 pt-8 border-t border-border">
          {prevDiagram ? (
            <Link
              href={prevDiagram.href}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{prevDiagram.name}</span>
            </Link>
          ) : (
            <div />
          )}
          {nextDiagram && (
            <Link
              href={nextDiagram.href}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <span>{nextDiagram.name}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
