import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Help Center · Snapback",
  description: "Get help with Snapback, including installation, workspaces, keyboard shortcuts, troubleshooting, and more.",
  alternates: {
    canonical: "/help",
  },
};

const sections = [
  {
    id: "getting-started",
    title: "Getting Started",
    items: [
      {
        q: "How do I install Snapback?",
        a: "Download the latest version from the homepage, open the DMG, and drag Snapback to your Applications folder. The first time you open it, macOS may ask you to confirm. Click Open. Snapback requires macOS 14.2 or later.",
      },
      {
        q: "Where does Snapback live?",
        a: "Snapback runs from your menu bar. You will see its icon there after launching. It uses minimal resources and stays out of your way until you need it.",
      },
      {
        q: "Why does macOS ask for Accessibility permissions?",
        a: "Snapback needs Accessibility access to read and restore window positions across your apps. macOS may show a warning about apps downloaded from the internet, but Snapback is safe, signed, and notarized by Apple.",
      },
    ],
  },
  {
    id: "workspaces",
    title: "Workspaces",
    items: [
      {
        q: "What is a workspace?",
        a: "A workspace is a saved layout of all your open apps, including their positions, sizes, and which display they are on. Think of it as a snapshot of your entire Mac layout that you can restore instantly.",
      },
      {
        q: "How do I create a workspace?",
        a: "Set up your apps the way you like them, then click the Snapback menu bar icon and choose New Workspace. Give it a name like \"Dev Mode\" or \"Design\" and you're done.",
      },
      {
        q: "How do I restore a workspace?",
        a: "Click the Snapback menu bar icon and select the workspace you want. Every app will snap back to its saved position automatically. Closed apps will be reopened.",
      },
      {
        q: "Can I have multiple workspaces?",
        a: "Yes. Create as many as you need, such as one for coding, one for design, or one for meetings. Switch between them with a single click.",
      },
    ],
  },
  {
    id: "shortcuts",
    title: "Keyboard Shortcuts",
    items: [
      {
        q: "What can I control with keyboard shortcuts?",
        a: "Almost everything in Snapback can be assigned a shortcut, including snapping windows, switching layouts, activating workspaces, and managing spaces.",
      },
      {
        q: "Where do I find snapping actions?",
        a: "The menu bar contains quick snapping actions such as left half, right half, and more. You can also assign custom snapping shortcuts in Settings under the Snaps tab.",
      },
      {
        q: "Where do I customize Snapback?",
        a: "Open Settings from the menu bar. It is organized into tabs: General for app behavior and global shortcuts, Snaps for window snapping shortcuts, Workspaces to view and manage saved workspaces, and Layouts to create and manage window layouts. Pro users also have Spaces for managing shortcut groups and License for activating their key.",
      },
    ],
  },
  {
    id: "displays",
    title: "Multiple Displays",
    items: [
      {
        q: "Does Snapback work with multiple monitors?",
        a: "Yes. Workspaces capture window positions across all connected displays. When you restore, everything goes back exactly where it was.",
      },
      {
        q: "What happens if I disconnect a display?",
        a: "Snapback detects the change and won't restore windows to a screen that isn't there. Your windows wait safely until you reconnect the display.",
      },
      {
        q: "What if I swap or rotate a display?",
        a: "Snapback recalculates window positions automatically to match your new display arrangement.",
      },
    ],
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    items: [
      {
        q: "Snapback isn't restoring windows correctly",
        a: "Make sure Snapback has Accessibility permission in System Settings, Privacy and Security. If the issue persists, restart Snapback from the menu bar or contact support with your macOS version.",
      },
      {
        q: "An app isn't reopening when I restore",
        a: "Some apps may have restrictions that prevent automated launching. Make sure the app is installed in your Applications folder and hasn't been moved or deleted.",
      },
      {
        q: "How do I send feedback or report a bug?",
        a: "Click the Send Feedback button inside the app. It automatically copies your logs to the clipboard and opens a pre-filled support email with all the troubleshooting data we need to help you.",
      },
    ],
  },
  {
    id: "app-behavior",
    title: "App Behavior",
    items: [
      {
        q: "Why does Snapback ignore some apps?",
        a: "Snapback automatically excludes certain system apps such as the Dock and System Settings. However, Finder is fully supported for restoring window positions.",
      },
      {
        q: "Can I exclude apps from being tracked?",
        a: "Yes. You can add any app to the ignore list in Snapback settings. Once excluded, Snapback will no longer track or restore that app when you switch workspaces.",
      },
      {
        q: "Why does an app not resize to the exact position I saved?",
        a: "Some applications enforce minimum width and height constraints. If your saved layout is smaller than the app minimum size, the app will resize to its minimum dimensions instead. This is a limitation of the app itself, not Snapback.",
      },
    ],
  },
  {
    id: "compatibility",
    title: "Compatibility",
    items: [
      {
        q: "Does Snapback work with Rectangle or Magnet?",
        a: "Yes. Snapback works alongside window management tools like Rectangle and Magnet without conflicts. If you already have a preferred window manager, you can disable Snapback's snapping functionality from Settings so there's no overlap and you can keep using your existing tool.",
      },
      {
        q: "Does it work with macOS Spaces?",
        a: "Snapback doesn't integrate with macOS Spaces directly since Apple doesn't offer a stable public API for them. Instead, it restores window positions and arrangements, giving you the same result without the fragility.",
      },
      {
        q: "Will it work after a macOS update?",
        a: "Snapback targets macOS 14.2+ and is actively maintained. Updates are tested against new macOS releases.",
      },
      {
        q: "Why are JetBrains IDEs (PyCharm, IntelliJ, WebStorm, etc.) excluded?",
        a: "JetBrains applications crash with a Metal rendering error when their windows are moved via the macOS Accessibility API. To prevent data loss and crashes, Snapback automatically excludes all JetBrains IDEs from window capture and positioning. This is a limitation of how these apps interact with macOS Accessibility, not a Snapback bug. The exclusion covers PyCharm, IntelliJ IDEA, WebStorm, GoLand, Rider, CLion, and all other JetBrains products (bundle ID prefix com.jetbrains).",
      },
      {
        q: "Does Snapback support multiple windows of the same app?",
        a: "Partial multi-instance support is currently available. Snapback can detect and restore multiple windows from the same application, though some edge cases may not behave perfectly. We are actively improving this and expanding app coverage. If you run into issues with a specific app, please send feedback from within Snapback.",
      },
    ],
  },
  {
    id: "licensing",
    title: "License & Purchases",
    items: [
      {
        q: "Where can I learn how to use Pro features?",
        a: "The Pro Guide covers everything: Command Palette, Cycling HUDs, Deeplinks, and Custom Layouts. You can also open it from the License tab inside the app.",
        link: { href: "/pro/guide", label: "Open Pro Guide" },
      },
      {
        q: "How do I activate my license?",
        a: "Open Settings from the menu bar, go to the License tab, paste the key from your confirmation email, and press Activate. Your key looks like XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX.",
      },
      {
        q: "I lost my license key. How do I recover it?",
        a: "Your key is in the order confirmation email from Lemon Squeezy, our payment provider. You can also find every order and key by signing in at app.lemonsqueezy.com/my-orders with the email you purchased with. If a license is already active in Snapback, the License tab has a Copy button next to your key.",
      },
      {
        q: "How do I move my license to a new Mac?",
        a: "In the License tab on your old Mac, click Deactivate. This frees up your seat, then activate with the same key on the new Mac. If you no longer have access to the old Mac, deactivate the old device from your Lemon Squeezy order page instead.",
      },
      {
        q: "I get an activation limit reached error. What do I do?",
        a: "Your key is active on the maximum number of Macs. Deactivate it on a Mac you no longer use, either from that Mac's License tab or from your order page at app.lemonsqueezy.com/my-orders, then try activating again.",
      },
      {
        q: "Does my license expire?",
        a: "No. Snapback Pro is a one-time purchase and your license never expires.",
      },
      {
        q: "Where do I find my invoice or receipt?",
        a: "Invoices and receipts are available on your Lemon Squeezy order page at app.lemonsqueezy.com/my-orders. The License tab in Snapback links there directly under Order & Receipts.",
      },
    ],
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": sections.flatMap((section) =>
    section.items.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a,
      },
    }))
  ),
};

export default function HelpPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-3xl mx-auto py-40 md:py-32 px-6">
        <div className="mb-16">
          <h1 className="font-display text-[clamp(36px,5vw,56px)] font-semibold text-white tracking-[-0.03em] mb-4">
            Help Center
          </h1>
          <p className="text-zinc-400 text-lg leading-[1.7] font-text">
            Everything you need to know about Snapback. Can't find what you're looking for?{" "}
            <a href="mailto:support@snapbackapp.com" className="text-primary hover:underline">
              Contact support
            </a>
          </p>
        </div>

        <div className="space-y-16">
          {sections.map((section) => (
            <section key={section.id} id={section.id}>
              <h2 className="font-display text-2xl font-semibold text-white tracking-[-0.02em] mb-6">
                {section.title}
              </h2>
              <div className="divide-y divide-white/[0.06]">
                {section.items.map((item) => (
                  <div key={item.q} className="py-5">
                    <h3 className="text-white/70 text-base md:text-lg font-medium mb-3 leading-snug">
                      {item.q}
                    </h3>
                    <p className="text-zinc-400 text-base leading-[1.8] font-text">{item.a}</p>
                    {"link" in item && item.link && (
                      <Link
                        href={item.link.href}
                        className="inline-flex items-center gap-1 text-primary text-sm font-medium hover:underline mt-2"
                      >
                        {item.link.label} →
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-20 pt-12 border-t border-white/[0.06] text-center">
          <p className="text-zinc-400 text-base font-text">
            Still need help?{" "}
            <a href="mailto:support@snapbackapp.com" className="text-primary hover:underline">
              support@snapbackapp.com
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
