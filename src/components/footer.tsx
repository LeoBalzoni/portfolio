import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/icons";

const socials = [
  { href: "https://github.com", icon: GithubIcon, label: "GitHub" },
  { href: "https://linkedin.com", icon: LinkedinIcon, label: "LinkedIn" },
  { href: "https://x.com", icon: XIcon, label: "X" },
  { href: "mailto:hello@example.com", icon: Mail, label: "Email" },
];

export function Footer() {
  return (
    <footer className="border-t border-border/50">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Leonardo Balzoni. All rights
          reserved.
        </p>
        <div className="flex items-center gap-4">
          {socials.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label={label}
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
