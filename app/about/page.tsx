import type { Metadata } from "next";
import { ExternalLink, GraduationCap, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | DiagramHub",
  description: "Meet the creators of DiagramHub — a CS 2340 hackathon project built at Georgia Tech.",
};

const creators = [
  {
    name: "Neil Lothe",
    major: "Computer Science",
    linkedin: "https://www.linkedin.com/in/neil-lothe-b9a867360/",
    imageSrc: "/creators/neil-lothe.svg",
    imageAlt: "Portrait placeholder for Neil Lothe",
    accent: "from-blue-500/20 to-cyan-500/10",
  },
  {
    name: "Levin Patel",
    major: "Computer Engineering",
    linkedin: "https://www.linkedin.com/in/levin-patel-493a37313/",
    imageSrc: "/creators/levin-patel.svg",
    imageAlt: "Portrait placeholder for Levin Patel",
    accent: "from-emerald-500/20 to-lime-500/10",
  },
  {
    name: "Ghaleb Sarsour",
    major: "Computer Science",
    linkedin: "https://www.linkedin.com/in/gsars/",
    imageSrc: "/creators/ghaleb-sarsour.svg",
    imageAlt: "Portrait placeholder for Ghaleb Sarsour",
    accent: "from-violet-500/20 to-fuchsia-500/10",
  },
  {
    name: "Matas Gatautis",
    major: "Computational Media",
    linkedin: "https://www.linkedin.com/in/matas-gatautis-2a4bb12b9/",
    imageSrc: "/creators/matas-gatautis.svg",
    imageAlt: "Portrait placeholder for Matas Gatautis",
    accent: "from-amber-500/20 to-orange-500/10",
  },
];

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
                  <div className="h-14 w-14 overflow-hidden rounded-xl border border-border bg-secondary/40">
                    <img
                      src={creator.imageSrc}
                      alt={creator.imageAlt}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
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

