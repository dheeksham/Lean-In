import type { Metadata } from "next";
import { editorial, helvetica } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lean In Connect — Find a Circle",
  description: "A redesign of step 2 of Lean In Connect's member onboarding.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${editorial.variable} ${helvetica.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
