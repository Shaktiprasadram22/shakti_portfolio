import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shakti Prasad Ram | Full-Stack Developer",
  description:
    "Shakti Prasad Ram — Full-Stack Developer specializing in React, Node.js, and scalable system design. View projects, skills, and experience.",
  keywords: [
    "Shakti Prasad Ram",
    "Full Stack Developer",
    "React",
    "Node.js",
    "Portfolio",
    "Software Engineer",
  ],
  authors: [{ name: "Shakti Prasad Ram" }],
  openGraph: {
    title: "Shakti Prasad Ram | Full-Stack Developer",
    description:
      "Full-Stack Developer specializing in React, Node.js, and scalable system design.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
