import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";

// next/font/google self-hosts at build — no runtime CDN call.
// All three are variable fonts; we expose them as CSS variables for use
// throughout the design tokens.

export const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const fontVariables = [
  fraunces.variable,
  inter.variable,
  jetbrains.variable,
].join(" ");
