import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { GlobalBackground } from "@/components/background/GlobalBackground";
import "./globals.css";

const heading = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading"
});

const body = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  title: "Shakti Prasad Ram | Backend Developer",
  description:
    "Backend Developer and AI Systems Builder portfolio - scalable APIs, distributed systems, and AI-powered applications."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} bg-ink text-zinc-100 antialiased`}>
        <GlobalBackground />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
