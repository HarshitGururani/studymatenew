import type { Metadata } from "next";
import "./globals.css";
import { Recursive } from "next/font/google";
import Navbar from "@/components/Navbar";

const recursive = Recursive({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BCA StudyMate",
  description:
    "Maximize your Bachelor of Computer Applications (BCA) experience at SSJU with a comprehensive guide to essential resources. Discover curated study materials, practical tools, and support systems tailored for each semester, ensuring academic excellence and career readiness.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${recursive.className} ${recursive.className} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
