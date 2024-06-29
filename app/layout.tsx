import MainNav from "@/components/main-nav";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Memorable Messages",
    default: "Memorable Messages",
  },
  description:
    "Web application that allows users to create, store, and share personalized messages by creating custom occasions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body>
          <div
            className={`${inter.className} min-h-screen bg-background antialiased container`}
          >
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <MainNav />
              {children}
            </ThemeProvider>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
