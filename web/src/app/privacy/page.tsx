import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Snapback Privacy Policy: What We Collect and Why",
  description: "Read the Snapback privacy policy. The macOS app collects no personal data, and this page explains exactly what anonymous signals the app and website use.",
  alternates: {
    canonical: "/privacy/",
  },
  openGraph: {
    url: "/privacy/",
    title: "Snapback Privacy Policy: What We Collect and Why",
    description: "Read the Snapback privacy policy. The macOS app collects no personal data, and this page explains exactly what anonymous signals the app and website use.",
  },
};

export default function PrivacyPolicyPage() {
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
        <h1>Privacy Policy</h1>
        <p>Last updated October 28, 2026</p>
        <p>
          Snapback is made by 66 labs (&ldquo;we&rdquo;, &ldquo;us&rdquo;), an independent studio, and we are the data controller for what this policy describes. Snapback is designed for privacy: the macOS app collects no personal information beyond what is needed to check a Pro license, and this page lists exactly what the app and this website do collect.
        </p>
        <h2>Information We Collect</h2>
        <ul>
          <li>The Snapback macOS app does <strong>not</strong> collect your name, email or other identifiable information, and your workspaces, layouts and settings stay on your Mac.</li>
          <li>If you buy Snapback Pro, your license key is stored in the macOS Keychain. When you activate it, the app sends the key and your Mac&apos;s name (as set in System Settings) to Lemon Squeezy so you can tell your activated devices apart. Later checks send the key and that activation&apos;s ID.</li>
          <li>The app checks our update feed (Sparkle) to see whether a new version is available. Like any web request, this reveals your IP address and app version to our hosting provider.</li>
          <li>If you voluntarily submit your email address through our website (such as to join the Snapback Pro waitlist), that email is stored by <a href="https://loops.so">Loops</a> and used solely to notify you about the launch and send any applicable discount. You can unsubscribe at any time via the link in any email we send.</li>
          <li>The app collects <strong>anonymous usage signals</strong> (such as app launch events) via TelemetryDeck to help us understand how many people are using Snapback. No personal data, IP addresses, or user identifiers are ever collected or transmitted.</li>
          <li>The app may generate local log files for troubleshooting purposes. These logs remain on your device and are never transmitted unless you choose to share them with support.</li>
          <li><strong>Only if you accept</strong> in the cookie banner, our website uses Microsoft Clarity to capture how you use the site through behavioral metrics, heatmaps, and session replay, and Google Analytics to collect traffic and usage data (such as page views, session duration, and traffic sources). Both use cookies and send data to Microsoft and Google, who may process it outside your country. Neither loads before you accept, and declining, or sending a Global Privacy Control signal, keeps them off. See our <Link href="/cookies/">Cookie Policy</Link>.</li>
          <li>Like any web server, our hosting provider may keep standard request logs, including your IP address.</li>
        </ul>
        <h2>How We Use Information</h2>
        <ul>
          <li>Local logs are used only for troubleshooting and support, and are never accessed or transmitted without your explicit consent.</li>
          <li>Website analytics, if you accept them, are used solely to improve the website. We do not sell your data or use it for advertising.</li>
          <li>License details are used only to verify your purchase and provide support.</li>
          <li>Email addresses submitted through our waitlist form are used only to send launch notifications and discount codes. They are never sold or shared with third parties.</li>
        </ul>
        <h2>Data Security</h2>
        <p>
          Snapback operates entirely on your device. Anonymous usage signals sent via TelemetryDeck contain no personal data and cannot be used to identify you. We take reasonable measures to ensure any local logs remain private and secure.
        </p>
        <h2>Third-Party Services</h2>
        <p>
          The Snapback app uses <a href="https://telemetrydeck.com">TelemetryDeck</a> for privacy-friendly analytics. TelemetryDeck is designed to be GDPR and CCPA compliant and does not collect personal data or IP addresses. You can review their privacy policy at{" "}
          <a href="https://telemetrydeck.com/privacy">telemetrydeck.com/privacy</a>.
          Our website uses <a href="https://loops.so">Loops</a> to manage email subscriptions for our product waitlist. When you submit your email address, it is stored securely by Loops and used to send you launch updates and discount information. You can unsubscribe at any time. You can review Loops' privacy policy at{" "}
          <a href="https://loops.so/privacy">loops.so/privacy</a>.{" "}
          Our website uses <a href="https://clarity.microsoft.com">Microsoft Clarity</a> to capture behavioral metrics, heatmaps, and session recordings using cookies and other tracking technologies. Clarity does not collect personally identifiable information. For more information about how Microsoft collects and uses your data, visit the{" "}
          <a href="https://privacy.microsoft.com/privacystatement">Microsoft Privacy Statement</a>.{" "}
          Our website also uses <a href="https://marketingplatform.google.com/about/analytics/">Google Analytics</a> to collect traffic and usage data via cookies. This data is processed by Google and does not include personally identifiable information. You can opt out using the{" "}
          <a href="https://tools.google.com/dlpage/gaoptout">Google Analytics Opt-out Browser Add-on</a>. You can review Google's privacy policy at{" "}
          <a href="https://policies.google.com/privacy">policies.google.com/privacy</a>.
        </p>
        <h2>Purchases</h2>
        <p>
          Snapback Pro is sold through <a href="https://www.lemonsqueezy.com">Lemon Squeezy</a>, our payment provider and merchant of record. They collect what is needed to process your order, such as your name, email, billing country and payment details, under <a href="https://www.lemonsqueezy.com/privacy">their privacy policy</a>. We receive your order details and license key so we can support you; we never see your full card details.
        </p>
        <h2>Why We Process Data</h2>
        <ul>
          <li><strong>Consent</strong> for website analytics, session replay and waitlist emails. You can withdraw it any time, from &ldquo;Cookie settings&rdquo; in the footer or by unsubscribing.</li>
          <li><strong>Contract</strong> for processing your order and checking your license.</li>
          <li><strong>Legitimate interest</strong> in counting anonymous app launches, keeping our apps secure and answering your emails.</li>
          <li><strong>Legal obligation</strong> for tax and accounting records of purchases.</li>
        </ul>
        <h2>How Long We Keep It</h2>
        <ul>
          <li>Support emails: up to 2 years after the conversation ends.</li>
          <li>Order and license records: as long as tax and accounting law requires, usually several years.</li>
          <li>Waitlist emails: until you unsubscribe or ask us to delete them.</li>
          <li>Analytics: set by Google, Microsoft and TelemetryDeck under their own retention settings. Their cookies last up to 2 years and 1 year.</li>
        </ul>
        <h2>Where Data Goes</h2>
        <p>
          The services above (Lemon Squeezy, Google, Microsoft, TelemetryDeck, Loops) operate worldwide. Your data may therefore be processed in countries other than yours, including the United States. Where the law requires it, those providers rely on safeguards such as standard contractual clauses.
        </p>
        <h2>Your Rights</h2>
        <p>
          You can ask us for a copy of the data we hold about you, to correct or delete it, to restrict or object to how we use it, or to move it to another service. You can withdraw consent at any time. Email <a href="mailto:support@snapbackapp.com">support@snapbackapp.com</a> and we will reply within 30 days, subject to what we are legally required to keep. If you live in the EU, UK or a US state with a privacy law (such as California), these rights are protected by law and you can complain to your local data protection authority. We do not sell or share personal information for advertising. Wherever you live, you can exercise these rights by emailing us.
        </p>
        <h2>Children</h2>
        <p>
          Snapback and this website are not directed at children under 13, and we do not knowingly collect their personal data. If you think a child has sent us data, email us and we will delete it.
        </p>
        <h2>Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will be posted on this page with a new date at the top.
        </p>
        <h2>Contact</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at support@snapbackapp.com.
        </p>
      </div>
    </div>
  );
}
