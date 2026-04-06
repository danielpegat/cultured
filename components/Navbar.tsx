"use client";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(
      new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    );
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-8 py-4 bg-page hairline-b backdrop-blur-sm bg-opacity-95">
      <div className="text-lg font-bold tracking-tighter text-ink uppercase font-headline">
        CULTURED
      </div>
      <div className="flex items-center gap-4">
        <span className="font-headline uppercase tracking-widest text-sm text-stone hidden sm:block">
          {date}
        </span>
        <ThemeToggle />
      </div>
    </nav>
  );
}
