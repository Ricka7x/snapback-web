import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Snapback Terms & Conditions: License and Use",
  description: "Read the terms and conditions for using the Snapback macOS app and website, covering the license, user responsibilities, liability, and how to contact us.",
  alternates: {
    canonical: "/terms/",
  },
  openGraph: {
    url: "/terms/",
    title: "Snapback Terms & Conditions: License and Use",
    description: "Read the terms and conditions for using the Snapback macOS app and website, covering the license, user responsibilities, liability, and how to contact us.",
  },
};

export default function TermsPage() {
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
        <h1>Terms &amp; Conditions</h1>
        <p>Last updated October 28, 2026</p>
        <p>
          These Terms &amp; Conditions ("Terms") govern your use of the Snapback macOS application and website. By using Snapback, you agree to these Terms. Snapback is made by 66 labs, an independent studio, and you can reach us at support@snapbackapp.com.
        </p>
        <h2>License</h2>
        <ul>
          <li>Snapback is provided as-is for personal use on macOS devices.</li>
          <li>You may not redistribute, resell, rent, sublicense, or reverse engineer the application, except where the law allows it.</li>
          <li>You may not remove or bypass license checks or other technical protections.</li>
        </ul>
        <p>
          Snapback is licensed to you, not sold. We keep all rights in the app, its name, logos and website content that we do not expressly give you. Some parts of the app may include open source software under its own license.
        </p>
        <h2>Purchases &amp; Snapback Pro</h2>
        <ul>
          <li>Snapback is free to download, with optional paid features (Snapback Pro). Prices and what is included are shown on the Pro page at the time you buy. Any launch discount or &ldquo;first N buyers&rdquo; offer ends as described on that page.</li>
          <li>Payments are processed by <a href="https://www.lemonsqueezy.com">Lemon Squeezy</a>, which acts as reseller and merchant of record. Their terms apply to checkout, and they send your license key, receipt and invoice. Taxes such as VAT or sales tax are added at checkout where they apply.</li>
          <li>Where the Pro page describes a license as one-time, you pay once and it does not expire. A key may be limited to a number of Macs; the Help page explains how to move it between devices. Prices may change for future purchases, never for a license you already own.</li>
          <li>A license is personal to you. If a key is shared, resold or used on more devices than it allows, we may deactivate it.</li>
          <li>Refunds are covered by our <Link href="/refunds/">Refund Policy</Link>.</li>
        </ul>
        <h2>User Responsibilities</h2>
        <ul>
          <li>You are responsible for ensuring your use of Snapback complies with all applicable laws and regulations.</li>
          <li>Do not use Snapback for any unlawful or harmful purposes.</li>
        </ul>
        <h2>Other Services</h2>
        <p>
          Some features rely on services we do not run, such as macOS itself, Lemon Squeezy for licensing, or the update feed. Your use of those is covered by their own terms, and we cannot guarantee they will always be available.
        </p>
        <h2>No Warranty &amp; Limitation of Liability</h2>
        <p>
          Snapback and this website are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;, without warranties of any kind, to the fullest extent the law allows. To the fullest extent the law allows, we are not liable for indirect, incidental or consequential damages, or for lost data or profits, arising from using or being unable to use the app. Please keep your own backups. Nothing in these Terms limits rights you have under consumer protection laws that cannot be waived.
        </p>
        <h2>Ending Your License</h2>
        <p>
          You can stop using Snapback at any time by deleting it. We may end your license if you seriously or repeatedly break these Terms, for example by sharing license keys or bypassing license checks. If we do that for a paid license and you have not broken the Terms, we will refund you.
        </p>
        <h2>Governing Law</h2>
        <p>
          These Terms are governed by the laws of the place where 66 labs is established, without regard to its conflict-of-law rules, except that if you are a consumer you keep the protection of the mandatory consumer laws of the country where you live and may bring a claim in its courts. Please email us first: most problems can be solved without lawyers.
        </p>
        <h2>Privacy &amp; Cookies</h2>
        <p>
          How the app and this website handle data is covered in our <Link href="/privacy/">Privacy Policy</Link> and <Link href="/cookies/">Cookie Policy</Link>.
        </p>
        <h2>Updates &amp; Changes</h2>
        <p>
          We may update Snapback, adding, changing or removing features, and we may stop supporting old versions of macOS (the supported versions are shown on the site). Paid features you bought keep working on the versions they support. We may also update these Terms and will change the date at the top when we do. Continued use of the app after a change means you accept the updated Terms.
        </p>
        <h2>Contact</h2>
        <p>
          If you have questions about these Terms, contact us at support@snapbackapp.com.
        </p>
      </div>
    </div>
  );
}
