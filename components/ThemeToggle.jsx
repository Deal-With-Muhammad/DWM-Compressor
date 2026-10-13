"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@heroui/react";
import { IconMoon, IconSun } from "./icons";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <Button
      variant="flat"
      radius="full"
      aria-label="Toggle dark or light mode"
      onPress={() => setTheme(isDark ? "light" : "dark")}
      startContent={isDark ? <IconSun size={18} /> : <IconMoon size={18} />}
      className="h-10 w-10 min-w-10 border border-default-200/60 bg-content1/60 px-0 backdrop-blur-xl sm:w-auto sm:px-4"
    >
      <span className="hidden sm:inline">{isDark ? "Light" : "Dark"}</span>
    </Button>
  );
}
