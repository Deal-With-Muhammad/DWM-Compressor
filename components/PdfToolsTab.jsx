"use client";

import { useState } from "react";
import Workspace from "./Workspace";
import PagePicker from "./PagePicker";
import PasswordField from "./PasswordField";
import Segmented from "./Segmented";
import { protectPdf, unlockPdf } from "../lib/engines";

function perFile(processFn) {
  return async (items, ctx) => {
    for (const item of items) {
      ctx.setItemStatus(item.id, { status: "processing", progress: 0 });
      try {
        const { blob, name } = await processFn(
          item.file,
          ctx.options,
          (p) => ctx.setItemProgress(item.id, p),
          ctx.setGlobalStatus
        );
        ctx.addOutput({ id: item.id, name, blob, size: blob.size, sourceSize: item.file.size });
        ctx.setItemStatus(item.id, { status: "done", progress: 1 });
      } catch (e) {
        console.error(e);
        ctx.setItemStatus(item.id, { status: "error", error: e?.message || "Failed" });
      }
    }
  };
}

export default function PdfToolsTab({ isActive }) {
  const [op, setOp] = useState("pages");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-default-200/60 bg-content1/50 p-4 backdrop-blur-xl">
        <span className="text-sm font-medium text-default-600">What do you want to do?</span>
        <Segmented
          value={op}
          onChange={setOp}
          options={[
            { value: "pages", label: "Select pages" },
            { value: "protect", label: "Protect" },
            { value: "unlock", label: "Unlock" },
          ]}
        />
      </div>

      {op === "pages" && <PagePicker />}

      {op === "protect" && (
        <Workspace
          isActive={isActive}
          accept="application/pdf,.pdf"
          actionLabel="Protect"
          event="protect-pdf"
          emptyTitle="Drop PDFs to password-protect"
          emptyHint="Add one or more PDFs"
          initialOptions={{ password: "" }}
          runner={perFile(protectPdf)}
          renderOptions={(o, set, disabled) => (
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-default-600">Set a password</span>
              <PasswordField
                value={o.password}
                disabled={disabled}
                placeholder="New password"
                onChange={(v) => set((s) => ({ ...s, password: v }))}
              />
            </div>
          )}
          note="Adds a password so the PDF can't be opened without it. Everything happens on your device — the password never leaves your browser."
        />
      )}

      {op === "unlock" && (
        <Workspace
          isActive={isActive}
          accept="application/pdf,.pdf"
          actionLabel="Unlock"
          event="unlock-pdf"
          emptyTitle="Drop password-protected PDFs"
          emptyHint="Add one or more PDFs"
          initialOptions={{ password: "" }}
          runner={perFile(unlockPdf)}
          renderOptions={(o, set, disabled) => (
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-default-600">Current password</span>
              <PasswordField
                value={o.password}
                disabled={disabled}
                placeholder="Password to remove"
                onChange={(v) => set((s) => ({ ...s, password: v }))}
              />
            </div>
          )}
          note="Removes the password from a PDF you can already open. You need to know the current password."
        />
      )}
    </div>
  );
}
