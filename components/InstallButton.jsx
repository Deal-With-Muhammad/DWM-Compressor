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
      size="sm"
      variant="flat"
      radius="full"
      startContent={<IconDownload size={16} />}
      onPress={async () => {
        deferred.prompt();
        await deferred.userChoice;
        setDeferred(null);
      }}
      className="border border-default-200/60 bg-content1/60 backdrop-blur-xl"
    >
      Install
    </Button>
  );
}
