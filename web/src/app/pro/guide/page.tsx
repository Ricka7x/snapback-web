import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Pro Guide · Snapback",
  description: "Learn how to get the most out of Snapback Pro: command palette, cycling HUDs, deeplinks, and custom layouts.",
  alternates: {
    canonical: "/pro/guide",
  },
}

const steps = [
  {
    id: "command-palette",
    title: "Command Palette",
    subtitle: "Jump to anything without memorizing a shortcut for each thing.",
    image: "/assets/command-palette.webp",
    imageAlt: "Snapback command palette",
    items: [
      "Open Snapback Settings from the menu bar, then go to the General tab.",
      "Find the Command Palette shortcut and assign a key. Something easy to reach like Option+Space works well.",
      "Press your shortcut at any time to open the palette. Type to search workspaces, spaces, layouts, or any other action and activate it instantly.",
    ],
    note: null,
  },
  {
    id: "cycling-huds",
    title: "Cycling HUDs",
    subtitle: "Flip through workspaces and spaces with a visual overlay.",
    image: "/assets/cycling-huds.webp",
    imageAlt: "Snapback cycling HUD",
    items: [
      "Open Snapback Settings from the menu bar, then go to the General tab.",
      "Find the Cycle Workspaces and Cycle Spaces shortcuts and assign a key to each.",
      "Press either shortcut to cycle through your saved workspaces or spaces. A visual HUD appears showing where you are in the list. Keep pressing to move through them.",
    ],
    note: null,
  },
  {
    id: "spaces",
    title: "Spaces",
    subtitle: "Organize your workspaces and layouts into separate groups for different contexts.",
    image: "/assets/spaces.webp",
    imageAlt: "Snapback Spaces",
    items: [
      "Open Snapback Settings and go to the Spaces tab. Tap + to create a new Space and give it a name, like Work, Personal, or Design.",
      "Assign a Space when creating or editing any workspace or layout. You can also select multiple items and reassign them all at once using the bulk action bar.",
      "Switch between Spaces from the menu bar or with a keyboard shortcut. Each Space shows only its own workspaces and layouts, so your shortcuts stay clean and contextual.",
    ],
    note: null,
  },
  {
    id: "deeplinks",
    title: "Deeplinks and Launchers",
    subtitle: "Open apps, URLs, folders, and terminal commands when restoring a workspace.",
    image: "/assets/deeplinks.webp",
    imageAlt: "Snapback deeplinks and launchers",
    items: [
      "Edit any workspace by clicking the pencil icon next to it in the menu bar or in Settings.",
      "Under the Launchers section, tap + to add a launcher. You can add URLs, folders, or shell commands.",
      "When you restore that workspace, all launchers run automatically alongside the window restoration.",
    ],
    note: "Deeplink support varies by app. Each app decides whether to expose a deeplink scheme, so not every app supports this. We're continuously testing and adding support for more apps. If yours isn't working, let us know.",
    link: { href: "/pro/guide/deeplinks", label: "View supported apps and input formats" },
  },
  {
    id: "bulk-actions",
    title: "Bulk Actions",
    subtitle: "Select multiple workspaces, spaces, or layouts and act on all of them at once.",
    image: "/assets/bulk-actions.webp",
    imageAlt: "Snapback bulk actions",
    items: [
      "Command-click any items in the list to select more than one at a time. This works across workspaces, spaces, and layouts.",
      "Drag the selection to group them together or move them into a different Space.",
      "Use the action bar that appears to change their Space or delete them all at once.",
    ],
    note: null,
  },
  {
    id: "custom-layouts",
    title: "Custom Layouts",
    subtitle: "Save and recall exactly how your windows should be arranged.",
    image: "/assets/custom-layouts.webp",
    imageAlt: "Snapback custom layouts",
    items: [
      "Open Settings and go to the Layouts tab.",
      "Tap the + button to define a new layout. Arrange your windows however you want, name the layout, and optionally assign a keyboard shortcut.",
      "By default the layout applies to just the currently focused display. You can toggle it to apply across all connected monitors at once.",
      "Trigger the layout from the shortcut you assigned, from the menu bar, or by typing its name in the Command Palette.",
    ],
    note: null,
  },
]

export default function ProGuidePage() {
  return (
    <div className="max-w-3xl mx-auto py-40 md:py-32 px-6">
      <div className="mb-16">
        <Link
          href="/pro"
          className="inline-flex items-center gap-1.5 text-zinc-500 text-sm hover:text-zinc-300 transition-colors mb-8"
        >
          ← Snapback Pro
        </Link>
        <h1 className="font-display text-[clamp(36px,5vw,56px)] font-semibold text-white tracking-[-0.03em] mb-4">
          Pro Guide
        </h1>
        <p className="text-zinc-400 text-lg leading-[1.7] font-text">
          Everything you need to get up and running with your Pro features.
        </p>
      </div>

      <div className="space-y-28">
        {steps.map((step) => (
          <section key={step.id} id={step.id} className="space-y-6">
            <div>
              <h2 className="font-display text-[clamp(26px,4vw,40px)] font-semibold text-white tracking-[-0.025em] leading-[1.1] mb-2">
                {step.title}
              </h2>
              <p className="text-zinc-400 text-base leading-[1.7] font-text">{step.subtitle}</p>
            </div>

            <div className="rounded-2xl overflow-hidden border border-white/8 bg-[#0c0e14]">
              <img src={step.image} alt={step.imageAlt} className="w-full h-auto" />
            </div>

            <ol className="space-y-4">
              {step.items.map((item, i) => (
                <li key={i} className="flex gap-4">
                  <span className="text-accent font-mono text-sm font-bold shrink-0 w-5 mt-0.5">
                    {i + 1}.
                  </span>
                  <p className="text-zinc-400 text-base leading-[1.8] font-text">{item}</p>
                </li>
              ))}
            </ol>

            {step.note && (
              <div className="rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3">
                <p className="text-zinc-500 text-sm leading-[1.7] font-text">
                  <span className="text-zinc-400 font-semibold">Note. </span>
                  {step.note}
                </p>
                {"link" in step && step.link && (
                  <Link
                    href={step.link.href}
                    className="inline-flex items-center gap-1 text-primary text-sm font-medium hover:underline mt-2"
                  >
                    {step.link.label} →
                  </Link>
                )}
              </div>
            )}
          </section>
        ))}
      </div>

      <div className="mt-24 pt-12 border-t border-white/[0.06]">
        <p className="text-zinc-400 text-base font-text">
          Something not covered here?{" "}
          <a href="mailto:support@snapbackapp.com" className="text-primary hover:underline">
            Contact support
          </a>{" "}
          or visit the{" "}
          <Link href="/help" className="text-primary hover:underline">
            Help Center
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
