import type { Metadata } from "next";
import { Newsreader, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-headline",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CULTURED | The Digital Curator",
  description:
    "A daily curated video portal for the intellectually curious. Discover thought-provoking content across philosophy, science, art, and culture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${newsreader.variable} ${inter.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('cultured-theme')||'dark';document.documentElement.classList.add(t)}catch(e){document.documentElement.classList.add('dark')}})();`,
          }}
        />
      </head>
      <body className="min-h-screen font-body">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
