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
        Snapback is designed for privacy. We do not collect, store, or transmit any personal information from users of the Snapback macOS app.
      </p>
      <h2 className="text-2xl font-semibold mt-10 mb-4">Information We Collect</h2>
      <ul className="list-disc pl-6 mb-6 text-zinc-700">
        <li>Snapback does <strong>not</strong> collect any personal data, usage data, or analytics from your device.</li>
        <li>The app may generate local log files for troubleshooting purposes. These logs remain on your device and are never transmitted unless you choose to share them with support.</li>
        <li>Our website may collect anonymized analytics data (such as page views) to improve user experience. No personally identifiable information is collected.</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-10 mb-4">How We Use Information</h2>
      <ul className="list-disc pl-6 mb-6 text-zinc-700">
        <li>Local logs are used only for troubleshooting and support, and are never accessed or transmitted without your explicit consent.</li>
        <li>Anonymized website analytics are used solely to improve the website. No data is sold, shared, or used for advertising.</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-10 mb-4">Data Security</h2>
      <p className="mb-6 text-zinc-700">
        Snapback operates entirely on your device. No user data is sent to external servers. We take reasonable measures to ensure any logs remain private and secure.
      </p>
      <h2 className="text-2xl font-semibold mt-10 mb-4">Third-Party Services</h2>
      <p className="mb-6 text-zinc-700">
        Our website may use third-party analytics providers (such as Google Analytics) to collect anonymized usage data. Please review their privacy policies for more information. The Snapback app itself does not use any third-party services for data collection.
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
