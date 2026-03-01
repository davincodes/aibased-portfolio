"use client";

import { useEffect, useState } from "react"; // Added hooks
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so we know we are safely hydrated
  useEffect(() => {
    setMounted(true);
  }, []);

  // While waiting for the client to mount, we render a placeholder
  // with the same dimensions to prevent the layout from jumping.
  if (!mounted) {
    return (
      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 dark:bg-black/30 border border-white/30" />
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="w-full h-full rounded-full bg-white/20 dark:bg-black/30 hover:bg-white/30 dark:hover:bg-black/40 backdrop-blur-xl border border-white/30 dark:border-white/20 hover:border-white/40 dark:hover:border-white/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.15)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] flex items-center justify-center text-neutral-500 dark:text-neutral-300 hover:text-neutral-600 dark:hover:text-neutral-200 transition-all duration-300 hover:scale-110"
          aria-label="Toggle theme"
        >
          <Sun className="h-5 w-5 md:h-6 md:w-6 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-5 w-5 md:h-6 md:w-6 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
