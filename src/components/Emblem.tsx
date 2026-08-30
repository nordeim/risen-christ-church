import { cn } from "@/utils/cn";

interface EmblemProps {
  className?: string;
}

/** Franciscan tau cross — the sign St Francis marked on his letters. */
export function Emblem({ className }: EmblemProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={cn("h-10 w-10", className)}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M14 18 H34 V24 H28 V42 H20 V24 H14 Z"
        fill="currentColor"
      />
      <circle cx="24" cy="12" r="4" fill="currentColor" opacity="0.85" />
    </svg>
  );
}
