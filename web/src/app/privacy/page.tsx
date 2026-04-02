import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy · Snapback",
  description: "Read the privacy policy for Snapback. Learn how your data is handled and protected.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto py-40 md:py-32 px-6">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <p className="mb-6 text-lg text-zinc-700">
        Snapback is designed for privacy. We do not collect any personal information from users of the Snapback macOS app.
      </p>
      <h2 className="text-2xl font-semibold mt-10 mb-4">Information We Collect</h2>
      <ul className="list-disc pl-6 mb-6 text-zinc-700">
        <li>Snapback does <strong>not</strong> collect any personal data, names, emails, or identifiable information.</li>
        <li>The app collects <strong>anonymous usage signals</strong> (such as app launch events) via TelemetryDeck to help us understand how many people are using Snapback. No personal data, IP addresses, or user identifiers are ever collected or transmitted.</li>
        <li>The app may generate local log files for troubleshooting purposes. These logs remain on your device and are never transmitted unless you choose to share them with support.</li>
        <li>Our website uses Microsoft Clarity to collect anonymized data (such as page views and interactions) to improve user experience. No personally identifiable information is collected.</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-10 mb-4">How We Use Information</h2>
      <ul className="list-disc pl-6 mb-6 text-zinc-700">
        <li>Local logs are used only for troubleshooting and support, and are never accessed or transmitted without your explicit consent.</li>
        <li>Anonymized website analytics are used solely to improve the website. No data is sold, shared, or used for advertising.</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-10 mb-4">Data Security</h2>
      <p className="mb-6 text-zinc-700">
        Snapback operates entirely on your device. Anonymous usage signals sent via TelemetryDeck contain no personal data and cannot be used to identify you. We take reasonable measures to ensure any local logs remain private and secure.
      </p>
      <h2 className="text-2xl font-semibold mt-10 mb-4">Third-Party Services</h2>
      <p className="mb-6 text-zinc-700">
        The Snapback app uses <a href="https://telemetrydeck.com" className="underline">TelemetryDeck</a> for privacy-friendly analytics. TelemetryDeck is designed to be GDPR and CCPA compliant and does not collect personal data or IP addresses. You can review their privacy policy at{" "}
        <a href="https://telemetrydeck.com/privacy" className="underline">telemetrydeck.com/privacy</a>.
        Our website uses <a href="https://clarity.microsoft.com" className="underline">Microsoft Clarity</a> to collect anonymized usage data such as page views and interactions. Clarity does not collect personally identifiable information. You can review Microsoft's privacy policy at{" "}
        <a href="https://privacy.microsoft.com/privacystatement" className="underline">privacy.microsoft.com</a>.
      </p>
      <h2 className="text-2xl font-semibold mt-10 mb-4">Changes to This Policy</h2>
      <p className="mb-6 text-zinc-700">
        We may update this Privacy Policy from time to time. Any changes will be posted on this page.
      </p>
      <h2 className="text-2xl font-semibold mt-10 mb-4">Contact</h2>
      <p className="mb-6 text-zinc-700">
        If you have any questions about this Privacy Policy, please contact us at support@snapbackapp.com.
      </p>
    </div>
  );
}
