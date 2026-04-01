import type { Metadata } from "next";
import { ExternalLink, GraduationCap, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | DiagramHub",
  description: "Meet the creators of DiagramHub — a CS 2340 hackathon project built at Georgia Tech.",
};

const creators = [
  {
    name: "Neil Lothe",
    initials: "NL",
    major: "Computer Science",
    linkedin: "https://www.linkedin.com/in/neil-lothe-b9a867360/",
    accent: "from-blue-500/20 to-cyan-500/10",
  },
  {
    name: "Levin Patel",
    initials: "LP",
    major: "Computer Engineering",
    linkedin: "https://www.linkedin.com/in/levin-patel-493a37313/",
    accent: "from-emerald-500/20 to-lime-500/10",
  },
  {
    name: "Ghaleb Sarsour",
    initials: "GS",
    major: "Computer Science",
    linkedin: "https://www.linkedin.com/in/gsars/",
    accent: "from-violet-500/20 to-fuchsia-500/10",
  },
  {
    name: "Matas Gatautis",
    initials: "MG",
    major: "Computational Media",
    linkedin: "https://www.linkedin.com/in/matas-gatautis-2a4bb12b9/",
    accent: "from-amber-500/20 to-orange-500/10",
  },
];

function InitialAvatar({ initials }: { initials: string }) {
  return (
    <svg viewBox="0 0 112 112" className="h-full w-full">
      <defs>
        <radialGradient id="bg" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(40 34) rotate(55) scale(90)">
          <stop stopColor="currentColor" stopOpacity="0.24" />
          <stop offset="0.65" stopColor="#FFFFFF" stopOpacity="0.06" />
          <stop offset="1" stopColor="#0A0A0F" stopOpacity="0.10" />
        </radialGradient>
        <linearGradient id="ring" x1="20" y1="20" x2="92" y2="92" gradientUnits="userSpaceOnUse">
          <stop stopColor="currentColor" stopOpacity="0.9" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <circle cx="56" cy="56" r="44" fill="url(#bg)" stroke="url(#ring)" strokeWidth="2" />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy="0.35em"
        fontFamily='Inter, system-ui, sans-serif'
        fontSize="44"
        fontWeight="700"
        fill="rgb(228, 228, 231)"
      >
        {initials}
      </text>
    </svg>
  );
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
      <section className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 sm:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="relative max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            Georgia Institute of Technology
          </p>

          <h1 className="mt-6 text-3xl sm:text-4xl font-bold tracking-tight text-balance">
            About the creators
          </h1>

          <p className="mt-4 text-muted-foreground leading-relaxed text-pretty">
            We&apos;re a team of Georgia Tech students who built DiagramHub as part of our CS 2340 (Objects and Design)
            hackathon. This site is focused on making UML diagrams easier to learn, reference, and connect to a shared
            project context.
          </p>
        </div>
      </section>

      <section className="mt-10 sm:mt-14">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Team</h2>
            <p className="mt-1 text-sm text-muted-foreground">Names, majors, and LinkedIn profiles.</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {creators.map((creator) => (
            <article
              key={creator.name}
              className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 hover:border-primary/50 transition-colors"
            >
              <div className={`absolute inset-0 bg-gradient-to-b ${creator.accent}`} />

              <div className="relative">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 overflow-hidden rounded-xl border border-border bg-secondary/40 text-primary">
                    <InitialAvatar initials={creator.initials} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-semibold leading-tight truncate">{creator.name}</h3>
                    <p className="mt-1 inline-flex items-center gap-2 text-sm text-muted-foreground">
                      <GraduationCap className="h-4 w-4" />
                      <span className="truncate">{creator.major}</span>
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <a
                    href={creator.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-secondary/50 px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary transition-colors"
                  >
                    LinkedIn
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
