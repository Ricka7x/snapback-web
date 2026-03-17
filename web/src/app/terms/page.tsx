import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions · Snapback",
  description: "Read the terms and conditions for using Snapback."
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto py-40 md:py-32 px-6">
      <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>
      <p className="mb-6 text-lg text-zinc-700">
        These Terms & Conditions ("Terms") govern your use of the Snapback macOS application and website. By using Snapback, you agree to these Terms.
      </p>
      <h2 className="text-2xl font-semibold mt-10 mb-4">License</h2>
      <ul className="list-disc pl-6 mb-6 text-zinc-700">
        <li>Snapback is provided as-is for personal use on macOS devices.</li>
        <li>You may not redistribute, resell, or reverse engineer the application.</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-10 mb-4">User Responsibilities</h2>
      <ul className="list-disc pl-6 mb-6 text-zinc-700">
        <li>You are responsible for ensuring your use of Snapback complies with all applicable laws and regulations.</li>
        <li>Do not use Snapback for any unlawful or harmful purposes.</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-10 mb-4">Limitation of Liability</h2>
      <p className="mb-6 text-zinc-700">
        Snapback is provided without warranty. We are not liable for any damages or losses resulting from the use or inability to use the app.
      </p>
      <h2 className="text-2xl font-semibold mt-10 mb-4">Updates & Changes</h2>
      <p className="mb-6 text-zinc-700">
        We may update Snapback or these Terms at any time. Continued use of the app constitutes acceptance of any changes.
      </p>
      <h2 className="text-2xl font-semibold mt-10 mb-4">Contact</h2>
      <p className="mb-6 text-zinc-700">
        If you have questions about these Terms, contact us at support@snapbackapp.com.
      </p>
    </div>
  );
}
