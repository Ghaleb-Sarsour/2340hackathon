"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, BookOpen, GitBranch } from "lucide-react";

const diagrams = [
  { name: "Sequence Diagram", href: "/diagrams/sequence", abbr: "SD" },
  { name: "System Sequence Diagram", href: "/diagrams/system-sequence", abbr: "SSD" },
  { name: "Domain Model", href: "/diagrams/domain-model", abbr: "DMD" },
  { name: "Domain Class Diagram", href: "/diagrams/domain-class", abbr: "DCD" },
  { name: "Use Case Diagram", href: "/diagrams/use-case", abbr: "UCD" },
];

export function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GitBranch className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold tracking-tight group-hover:text-primary transition-colors">
            DiagramHub
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          <Link
            href="/"
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              pathname === "/"
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            )}
          >
            Home
          </Link>
          
          <div className="relative group">
            <button
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1",
                pathname.startsWith("/diagrams")
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
            >
              <BookOpen className="h-4 w-4" />
              Diagrams
            </button>
            
            <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="bg-card border border-border rounded-xl p-2 shadow-xl min-w-[220px]">
                {diagrams.map((diagram) => (
                  <Link
                    key={diagram.href}
                    href={diagram.href}
                    className={cn(
                      "flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors",
                      pathname === diagram.href
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    )}
                  >
                    <span>{diagram.name}</span>
                    <span className="text-xs font-mono text-muted-foreground">{diagram.abbr}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          <Link
            href="/connections"
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              pathname === "/connections"
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            )}
          >
            Connections
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background px-6 py-4 space-y-2">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className={cn(
              "block px-4 py-3 rounded-lg text-sm font-medium transition-colors",
              pathname === "/"
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            )}
          >
            Home
          </Link>
          
          <div className="pt-2 pb-1 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Diagrams
          </div>
          
          {diagrams.map((diagram) => (
            <Link
              key={diagram.href}
              href={diagram.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center justify-between px-4 py-3 rounded-lg text-sm transition-colors",
                pathname === diagram.href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
            >
              <span>{diagram.name}</span>
              <span className="text-xs font-mono">{diagram.abbr}</span>
            </Link>
          ))}
          
          <Link
            href="/connections"
            onClick={() => setMobileOpen(false)}
            className={cn(
              "block px-4 py-3 rounded-lg text-sm font-medium transition-colors",
              pathname === "/connections"
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            )}
          >
            Connections
          </Link>
        </div>
      )}
    </header>
  );
}
