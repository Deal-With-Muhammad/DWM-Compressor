"use client";

import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import { IconDownload } from "./icons";

// Shows an "Install app" button when the browser reports the PWA is installable.
export default function InstallButton() {
  const [deferred, setDeferred] = useState(null);

  useEffect(() => {
    const onBIP = (e) => {
      e.preventDefault();
      setDeferred(e);
    };
    const onInstalled = () => setDeferred(null);
    window.addEventListener("beforeinstallprompt", onBIP);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBIP);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (!deferred) return null;

  return (
    <Button
      variant="flat"
      radius="full"
      aria-label="Install app"
      startContent={<IconDownload size={17} />}
      onPress={async () => {
        deferred.prompt();
        await deferred.userChoice;
        setDeferred(null);
      }}
      className="h-10 w-10 min-w-10 border border-default-200/60 bg-content1/60 px-0 backdrop-blur-xl sm:w-auto sm:px-4"
    >
      <span className="hidden sm:inline">Install</span>
    </Button>
  );
}
