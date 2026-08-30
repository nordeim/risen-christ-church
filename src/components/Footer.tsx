import { Clock, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Emblem } from "@/components/Emblem";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/SocialIcons";
import { Container } from "@/components/ui/Container";
import { footerNav } from "@/data/nav";
import { site } from "@/data/site";

const exploreLinks = footerNav.filter((link) =>
  ["/about", "/worship#mass", "/history", "/faq"].includes(link.to),
);
const involvedLinks = footerNav.filter((link) => !exploreLinks.includes(link));

const social = [
  { href: site.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: site.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: site.youtube, label: "YouTube", Icon: YoutubeIcon },
] as const;

export function Footer() {
  return (
    <footer className="bg-shrine-maroon-950 text-shrine-cream">
      <div className="divider-weave-thin" />
      <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.25fr_0.75fr_0.75fr_1fr]">
        <div>
          <Link to="/" className="flex items-center gap-3">
            <Emblem className="text-shrine-gold-300" />
            <span className="font-display text-xl font-semibold">
              Risen Christ
              <span className="mt-0.5 block text-sm font-normal text-shrine-gold-300">
                Toa Payoh · {site.chineseName}
              </span>
            </span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-shrine-cream/70">
            {site.tagline} The first Catholic church in Toa Payoh, blessed in 1971 — Mandarin at
            8.15, English through the day, Tamil, Tagalog, and Bahasa Indonesia by the month.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {social.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={`${site.shortName} on ${label}`}
                rel="noopener noreferrer"
                target="_blank"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-shrine-cream/25 transition-[border-color,color,transform] duration-300 hover:-translate-y-0.5 hover:border-shrine-gold-300 hover:text-shrine-gold-300"
              >
                <Icon />
              </a>
            ))}
            <a
              href={site.archdiocese}
              rel="noopener noreferrer"
              target="_blank"
              className="text-xs uppercase tracking-[0.2em] text-shrine-cream/60 transition-colors hover:text-shrine-gold-300"
            >
              Archdiocese of Singapore
            </a>
          </div>
        </div>

        <nav aria-label="Explore">
          <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-shrine-gold-300">
            Explore
          </h3>
          <ul className="mt-4 space-y-2.5">
            {exploreLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="link-underline w-fit text-sm text-shrine-cream/75 transition-colors hover:text-shrine-cream"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Get involved">
          <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-shrine-gold-300">
            Get Involved
          </h3>
          <ul className="mt-4 space-y-2.5">
            {involvedLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="link-underline w-fit text-sm text-shrine-cream/75 transition-colors hover:text-shrine-cream"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-shrine-gold-300">
            Visit Us
          </h3>
          <address className="mt-4 space-y-3 text-sm not-italic text-shrine-cream/75">
            <p className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-shrine-gold-300" aria-hidden="true" />
              {site.address.full}
            </p>
            <p className="flex items-start gap-2.5">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-shrine-gold-300" aria-hidden="true" />
              {site.hours.reception}
            </p>
            <p className="flex items-start gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-shrine-gold-300" aria-hidden="true" />
              <a
                href={`tel:+${site.contact.officePhone.replace(/\D/g, "")}`}
                className="hover:text-shrine-cream"
              >
                {site.contact.officePhone}
              </a>
            </p>
          </address>
        </div>
      </Container>

      <div className="border-t border-shrine-cream/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-shrine-cream/55 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Church of the Risen Christ, Archdiocese of Singapore.
          </p>
          <p>
            {site.feast.name} — {site.feast.date}
          </p>
        </Container>
      </div>
    </footer>
  );
}
