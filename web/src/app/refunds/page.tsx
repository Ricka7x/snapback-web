import type { Metadata } from "next";
import Link from "next/link";


export const metadata: Metadata = {
  title: "Snapback Refund Policy: 14-Day Money-Back Guarantee",
  description: "How refunds work for Snapback Pro: 14 days, no questions asked, handled through Lemon Squeezy.",
  alternates: {
    canonical: "/refunds/",
  },
  openGraph: {
    url: "/refunds/",
    title: "Snapback Refund Policy: 14-Day Money-Back Guarantee",
    description: "How refunds work for Snapback Pro: 14 days, no questions asked, handled through Lemon Squeezy.",
  },
};

export default function RefundsPage() {
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
        <h1>Refund Policy</h1>
        <p>Last updated October 28, 2026</p>
        <h2>14-day money-back guarantee</h2>
        <p>
          If Snapback Pro isn&apos;t right for you, email us within 14 days of your purchase and we&apos;ll refund it in full. You don&apos;t need to explain why, although we&apos;d love to know what we could do better. Snapback is free to download, so we also encourage you to try the free version before buying.
        </p>
        <h2>How to ask</h2>
        <p>
          Email <a href="mailto:support@snapbackapp.com">support@snapbackapp.com</a> from the address you bought with, and include your order number or license key. Your receipt from Lemon Squeezy has the order number. <a href="https://www.lemonsqueezy.com">Lemon Squeezy</a> is the merchant of record for our orders, so the refund is issued by them to your original payment method. Banks usually take 5 to 10 business days to show it. When a refund is issued, the license key is deactivated.
        </p>
        <h2>After 14 days</h2>
        <p>
          We can still help. If Snapback doesn&apos;t work as described, or a bug stops you from using something you paid for and we can&apos;t fix it, write to us and we&apos;ll make it right, including a refund where that&apos;s fair. These cases are decided one by one.
        </p>
        <h2>Your legal rights</h2>
        <p>
          This policy adds to the rights you have by law and doesn&apos;t replace them. If you&apos;re in the EU or UK, you can cancel a purchase within 14 days of buying. If you start using the license right away, checkout may ask you to agree to immediate delivery and to acknowledge that the statutory cancellation right can end once delivery starts. Our own 14-day guarantee still applies either way. Where another consumer right applies to you, you keep it.
        </p>
        <h2>Please ask us first</h2>
        <p>
          A refund request to us is faster than a dispute with your bank, and it means we can fix the problem. Fraudulent or abusive requests, such as repeated refunds of the same license, may be refused.
        </p>
        <h2>Contact</h2>
        <p>
          Questions? Email <a href="mailto:support@snapbackapp.com">support@snapbackapp.com</a>. See also our <Link href="/terms/">Terms</Link> and <Link href="/privacy/">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  )
}
