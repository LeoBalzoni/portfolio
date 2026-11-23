import { siteConfig } from "@/lib/site";
import { GithubIcon, LinkedinIcon, MailIcon } from "@/components/icons";

export function SiteFooter() {
  return (
    <footer className="margin margin--bottom">
      <div className="scalebar" aria-hidden="true">
        <svg viewBox="0 0 200 14" preserveAspectRatio="none">
          <path d="M.5 3v8h199V3M50 3v8M100 3v8M150 3v8" fill="none" stroke="currentColor" />
          <path d="M.5 7h49.5v4H.5zM100 7h50v4h-50z" fill="currentColor" />
        </svg>
        <div className="scalebar__ticks">
          <span>0</span>
          <span>500 m</span>
          <span>1 km</span>
        </div>
      </div>
      <p className="margin__note">
        Sheet 1243 Lausanne, 1:25 000. The terrain is invented. The pull requests are real.
        <br />© {new Date().getFullYear()} Leonardo Balzoni
      </p>
      <ul className="margin__contact">
        <li>
          <a href={siteConfig.github} rel="noopener noreferrer">
            <GithubIcon className="icon" />
            GitHub
          </a>
        </li>
        <li>
          <a href={siteConfig.linkedin} rel="noopener noreferrer">
            <LinkedinIcon className="icon" />
            LinkedIn
          </a>
        </li>
        <li>
          <a href={`mailto:${siteConfig.email}`}>
            <MailIcon className="icon" />
            Email
          </a>
        </li>
      </ul>
    </footer>
  );
}
