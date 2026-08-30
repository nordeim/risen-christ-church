import { cn } from "@/utils/cn";

interface IconProps {
  className?: string;
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-4 w-4", className)} fill="currentColor" aria-hidden="true">
      <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.6l.4-3H13v-2c0-.6.4-1 1-1z" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-4 w-4", className)} fill="currentColor" aria-hidden="true">
      <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm10 2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-5 3.5A3.5 3.5 0 1 1 8.5 12 3.5 3.5 0 0 1 12 8.5zm0 2A1.5 1.5 0 1 0 13.5 12 1.5 1.5 0 0 0 12 10.5zM17 7.75a.75.75 0 1 1-.75.75.75.75 0 0 1 .75-.75z" />
    </svg>
  );
}

export function YoutubeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-4 w-4", className)} fill="currentColor" aria-hidden="true">
      <path d="M23 12.2s0-3.2-.4-4.6c-.2-.9-.9-1.6-1.8-1.8C19.2 5.4 12 5.4 12 5.4s-7.2 0-8.8.4c-.9.2-1.6.9-1.8 1.8C1 9 1 12.2 1 12.2s0 3.2.4 4.6c.2.9.9 1.6 1.8 1.8 1.6.4 8.8.4 8.8.4s7.2 0 8.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.4.4-4.6.4-4.6zM9.8 15.5v-6.6l6.3 3.3-6.3 3.3z" />
    </svg>
  );
}

export function TelegramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-4 w-4", className)} fill="currentColor" aria-hidden="true">
      <path d="M21.5 4.5 2.8 11.6c-1.3.5-1.2 1.2-.2 1.5l4.8 1.5 11.1-7c.5-.3 1-.1.6.2l-9 8.1-.3 4.8c.5 0 .7-.2 1-.5l2.3-2.2 4.8 3.5c.9.5 1.5.2 1.7-.8l3.1-14.6c.3-1.3-.5-1.9-1.4-1.5z" />
    </svg>
  );
}
