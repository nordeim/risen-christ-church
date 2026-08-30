import { cn } from "@/utils/cn";

export function Emblem({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={cn("h-9 w-9", className)}
      aria-hidden="true"
      fill="none"
    >
      <circle cx="20" cy="22" r="11" stroke="currentColor" strokeWidth="1.25" opacity="0.55" />
      <path
        d="M8 24c4.5-3 8.5-4.5 12-4.5S27.5 21 32 24"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M20 6v22M14 16h12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="20" cy="16" r="1.4" fill="currentColor" />
    </svg>
  );
}
