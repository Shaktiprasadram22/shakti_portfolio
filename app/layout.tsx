import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { GlobalBackground } from "@/components/background/GlobalBackground";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var saved = localStorage.getItem("portfolio-theme");
                  var systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                  var theme = saved === "light" || saved === "dark" ? saved : (systemPrefersDark ? "dark" : "light");
                  document.documentElement.dataset.theme = theme;
                  document.documentElement.classList.toggle("dark", theme === "dark");
                  document.documentElement.classList.toggle("theme-light", theme === "light");
                  document.documentElement.classList.toggle("theme-dark", theme === "dark");
                  document.documentElement.style.colorScheme = theme;
                } catch (_e) {
                  var fallbackDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                  var fallbackTheme = fallbackDark ? "dark" : "light";
                  document.documentElement.dataset.theme = fallbackTheme;
                  document.documentElement.classList.toggle("dark", fallbackTheme === "dark");
                  document.documentElement.classList.toggle("theme-light", fallbackTheme === "light");
                  document.documentElement.classList.toggle("theme-dark", fallbackTheme === "dark");
                  document.documentElement.style.colorScheme = fallbackTheme;
                }
              })();
            `
          }}
        />
      </head>
      <body className={`${heading.variable} ${body.variable} antialiased`}>
        <ThemeProvider>
          <GlobalBackground />
          <div className="relative z-10">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
