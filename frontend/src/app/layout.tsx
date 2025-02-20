import type { Metadata } from "next";
import "./globals.css";
import { Recursive } from "next/font/google";
import Navbar from "@/components/Navbar";
import QueryProvider from "../components/QueryProvider";
import { Toaster } from "react-hot-toast";
import { AppContextProvider } from "@/context/AppContext";

const recursive = Recursive({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BCA StudyMate",
  description:
    "Maximize your Bachelor of Computer Applications (BCA) experience at SSJU with a comprehensive guide to essential resources. Discover curated study materials, practical tools, and support systems tailored for each semester, ensuring academic excellence and career readiness.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${recursive.className} antialiased`}>
        <QueryProvider>
          <AppContextProvider>
            <Navbar />
            {children}
            <Toaster />
          </AppContextProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
