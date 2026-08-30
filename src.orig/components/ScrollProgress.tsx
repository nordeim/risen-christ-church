import { useScrollProgress } from "@/hooks/useScrollProgress";

export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div
      data-testid="scroll-progress"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent"
      aria-hidden="true"
      style={{ transform: `scaleX(${progress})` }}
    >
      <div className="h-full origin-left bg-shrine-gold-400" style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}
