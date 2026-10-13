"use client";

import InfoTip from "./InfoTip";

export default function RangeSlider({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  format = (v) => `${v}%`,
  hint,
  info,
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-sm font-medium text-default-600">
          {label}
          {info && <InfoTip text={info} label={label} />}
        </span>
        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-sm font-semibold text-primary">
          {format(value)}
        </span>
      </div>

      <div className={`relative h-6 w-full ${disabled ? "opacity-60" : ""}`}>
        {/* base track */}
        <div className="absolute left-0 top-1/2 h-2 w-full -translate-y-1/2 rounded-full bg-default-200" />
        {/* filled portion (solid) */}
        <div
          className="absolute left-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-primary"
          style={{ width: `${pct}%` }}
        />
        {/* visible thumb */}
        <div
          className="pointer-events-none absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-2 border-content1 bg-primary shadow-md"
          style={{ left: `calc(${pct}% - 10px)` }}
        />
        {/* transparent native input handles interaction */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label={label}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
        />
      </div>

      {hint && <p className="px-0.5 text-xs text-default-400">{hint}</p>}
    </div>
  );
}
