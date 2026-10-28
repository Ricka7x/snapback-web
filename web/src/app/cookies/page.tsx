import type { Metadata } from "next";
import Link from "next/link";
import { CookieSettingsButton } from "../../components/AnalyticsConsent";

export const metadata: Metadata = {
  title: "Snapback Cookie Policy: What Loads and When",
  description: "Which cookies snapbackapp.com uses, who sets them, and how to change your choice at any time.",
  alternates: {
    canonical: "/cookies/",
  },
  openGraph: {
    url: "/cookies/",
    title: "Snapback Cookie Policy: What Loads and When",
    description: "Which cookies snapbackapp.com uses, who sets them, and how to change your choice at any time.",
  },
};

export default function CookiesPage() {
  return (
    <div className="max-w-3xl mx-auto py-40 md:py-32 px-6">
      <div className="prose prose-invert prose-lg max-w-none
        prose-headings:font-display prose-headings:tracking-tight
        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
        prose-code:text-white/90 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
        prose-pre:bg-bg-surface prose-pre:border prose-pre:border-white/10
        prose-img:rounded-xl prose-img:border prose-img:border-white/10
        prose-hr:border-white/10
        prose-blockquote:border-l-primary prose-blockquote:text-white/60
        prose-strong:text-white
        prose-li:text-white/80
      ">
        <h1>Cookie Policy</h1>
        <p>Last updated October 28, 2026</p>
        <p>
          This page covers cookies and similar technologies (such as local storage) on snapbackapp.com. The Snapback app doesn&apos;t use cookies; what it sends is described in the <Link href="/privacy/">Privacy Policy</Link>. By default, nothing for analytics loads until you accept.
        </p>
        <h2>Always on</h2>
        <ul>
          <li><strong>Your cookie choice</strong> (<code>snapback-consent</code>, local storage): remembers whether you accepted or declined, so we don&apos;t ask on every page. Kept until you clear it.</li>
        </ul>
        <h2>Only if you accept</h2>
        <ul>
          <li><strong>Google Analytics 4</strong> (Google LLC): cookies such as <code>_ga</code> and <code>_ga_*</code>, kept up to 2 years. Counts visits and pages viewed and where visitors come from. Data is processed by Google, possibly outside your country. <a href="https://policies.google.com/privacy">Google&apos;s privacy policy</a>.</li>
          <li><strong>Microsoft Clarity</strong> (Microsoft): cookies such as <code>_clck</code> and <code>_clsk</code>, kept up to 1 year. Records anonymised clicks, scrolling and heatmaps, and session replays, so we can see where the site is confusing. <a href="https://privacy.microsoft.com/privacystatement">Microsoft&apos;s privacy statement</a>.</li>
        </ul>
        <p>
          We don&apos;t use advertising cookies and we don&apos;t share this data with advertisers. If your browser sends a Global Privacy Control signal, we treat it as a decline.
        </p>
        <h2>Change your choice</h2>
        <p>
          You can accept or decline again whenever you like: <CookieSettingsButton className="underline" />. Declining after accepting removes these cookies and reloads the page. You can also delete cookies in your browser settings.
        </p>
        <h2>Contact</h2>
        <p>
          Questions? Email <a href="mailto:support@snapbackapp.com">support@snapbackapp.com</a>.
        </p>
      </div>
    </div>
  )
}
