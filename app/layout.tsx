import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/navigation";

export const metadata: Metadata = {
  title: "DiagramHub | Learn UML Diagrams for CS 2340",
  description: "Master UML diagrams with interactive tutorials. Learn Sequence Diagrams, Domain Models, Use Case Diagrams and more for CS 2340 Objects and Design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased min-h-screen">
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
