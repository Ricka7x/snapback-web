import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions · Snapback",
  description: "Read the terms and conditions for using Snapback."
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
        <p>
          These Terms &amp; Conditions ("Terms") govern your use of the Snapback macOS application and website. By using Snapback, you agree to these Terms.
        </p>
        <h2>License</h2>
        <ul>
          <li>Snapback is provided as-is for personal use on macOS devices.</li>
          <li>You may not redistribute, resell, or reverse engineer the application.</li>
        </ul>
        <h2>User Responsibilities</h2>
        <ul>
          <li>You are responsible for ensuring your use of Snapback complies with all applicable laws and regulations.</li>
          <li>Do not use Snapback for any unlawful or harmful purposes.</li>
        </ul>
        <h2>Limitation of Liability</h2>
        <p>
          Snapback is provided without warranty. We are not liable for any damages or losses resulting from the use or inability to use the app.
        </p>
        <h2>Updates &amp; Changes</h2>
        <p>
          We may update Snapback or these Terms at any time. Continued use of the app constitutes acceptance of any changes.
        </p>
        <h2>Contact</h2>
        <p>
          If you have questions about these Terms, contact us at support@snapbackapp.com.
        </p>
      </div>
    </div>
  );
}
