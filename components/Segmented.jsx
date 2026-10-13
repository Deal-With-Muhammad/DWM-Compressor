"use client";

export default function Segmented({ value, onChange, options, disabled }) {
  return (
    <div className="inline-flex flex-wrap gap-1 rounded-full bg-default-100/70 p-1">
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={String(opt.value)}
            type="button"
            disabled={disabled}
            onClick={() => onChange(opt.value)}
            className={[
              "rounded-full px-3 py-1 text-sm font-medium transition-colors",
              active ? "bg-primary text-primary-foreground shadow" : "text-default-500 hover:text-foreground",
              disabled ? "cursor-not-allowed opacity-60" : "",
            ].join(" ")}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
