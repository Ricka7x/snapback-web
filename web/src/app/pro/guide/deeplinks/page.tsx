import type { Metadata } from "next"
import Link from "next/link"

const deeplinksTitle = "Snapback Pro Deeplinks Reference: Supported Apps"
const deeplinksDescription = "The full reference of supported apps and input formats for Snapback Pro deeplinks and smart launchers, covering terminals, editors, browsers, and more."

export const metadata: Metadata = {
  title: deeplinksTitle,
  description: deeplinksDescription,
  alternates: { canonical: "/pro/guide/deeplinks/" },
  openGraph: {
    url: "/pro/guide/deeplinks/",
    title: deeplinksTitle,
    description: deeplinksDescription,
  },
}

const appGroups = [
  {
    title: "Terminals",
    description: "Terminals support two input types: a folder path to navigate to, or a shell command to run.",
    apps: [
      { name: "Terminal", bundle: "com.apple.Terminal" },
      { name: "iTerm2", bundle: "com.googlecode.iterm2" },
      { name: "WezTerm", bundle: "com.github.wez.wezterm" },
      { name: "Kitty", bundle: "net.kovidgoyal.kitty" },
      { name: "Ghostty", bundle: "com.mitchellh.ghostty" },
    ],
    inputs: [
      {
        label: "Navigate to a folder",
        format: "~/Projects/my-app",
        description: "Type a path starting with / or ~. Snapback runs cd to that directory when the workspace is restored.",
        tip: null as string | null,
      },
      {
        label: "Run a command",
        format: "bun dev",
        description: "Enter any shell command that isn't a bare path. It runs in the terminal window.",
        tip: null as string | null,
      },
    ],
  },
  {
    title: "Code Editors",
    description: "VS Code and Cursor use a URL scheme to reopen a project folder. Zed, Sublime Text, and Xcode take a plain folder or file path.",
    apps: [
      { name: "VS Code", bundle: "com.microsoft.VSCode" },
      { name: "Cursor", bundle: "com.todesktop.230313mzl4w4u92" },
      { name: "Zed", bundle: "dev.zed.Zed" },
      { name: "Sublime Text", bundle: "com.sublimetext" },
      { name: "Xcode", bundle: "com.apple.dt.Xcode" },
    ],
    inputs: [
      {
        label: "VS Code or Cursor: project folder URL",
        format: "vscode://file//Users/you/Projects/my-app",
        description: "Use vscode:// for VS Code or cursor:// for Cursor, followed by the absolute path. Snapback picks the right scheme automatically.",
        tip: "Click the folder icon to browse instead of typing the path.",
      },
      {
        label: "Zed, Sublime Text, or Xcode: folder or file path",
        format: "~/Projects/my-app",
        description: "Type the path to the folder or project file. For Xcode, point to the .xcodeproj or .xcworkspace file.",
        tip: "Click the folder icon to browse instead of typing the path.",
      },
    ],
  },
  {
    title: "Browsers",
    description: "Any http or https URL opens in the browser that was captured in the workspace.",
    apps: [
      { name: "Safari", bundle: "com.apple.Safari" },
      { name: "Chrome", bundle: "com.google.Chrome" },
      { name: "Firefox", bundle: "org.mozilla.firefox" },
      { name: "Arc", bundle: "company.thebrowser.Browser" },
      { name: "Brave", bundle: "com.brave.Browser" },
      { name: "Edge", bundle: "com.microsoft.edgemac" },
      { name: "DuckDuckGo", bundle: "com.duckduckgo.macos.browser" },
      { name: "Zen", bundle: "app.zen-browser.zen" },
    ],
    inputs: [
      {
        label: "Paste any URL",
        format: "https://github.com/myorg/myrepo",
        description: "Snapback checks whether the browser window already shows that domain. If it does, nothing happens. If not, it opens the URL.",
        tip: null as string | null,
      },
      {
        label: "Local dev servers",
        format: "http://localhost:3000",
        description: "http:// URLs work too. Useful for restoring a local dev server tab alongside your terminal and editor.",
        tip: null as string | null,
      },
    ],
  },
  {
    title: "Design",
    description: "Figma takes its web URL directly. Affinity apps take the path to a local file.",
    apps: [
      { name: "Figma", bundle: "com.figma.Desktop" },
      { name: "Affinity", bundle: "com.canva.affinity" },
    ],
    inputs: [
      {
        label: "Figma: paste the file or project URL",
        format: "https://www.figma.com/file/abc123/My-Design",
        description: "Copy the URL from your browser while the file is open and paste it directly.",
        tip: null as string | null,
      },
      {
        label: "Affinity: path to the local file",
        format: "~/Documents/design.afdesign",
        description: "Type the path to your .afdesign, .afphoto, or .afpub file.",
        tip: "Click the folder icon to browse instead of typing the path.",
      },
    ],
  },
  {
    title: "Notes & Knowledge",
    description: "Bear and Obsidian each expose a URL scheme to open a specific note or vault.",
    apps: [
      { name: "Bear", bundle: "net.shinyfrog.bear" },
      { name: "Obsidian", bundle: "md.obsidian" },
    ],
    inputs: [
      {
        label: "Bear: note link",
        format: "bear://x-callback-url/open-note?id=ABC123",
        description: "In Bear, right-click a note and choose Copy Note Link. Paste the bear:// URL directly.",
        tip: null as string | null,
      },
      {
        label: "Obsidian: vault and file",
        format: "obsidian://open?vault=MyVault&file=note",
        description: "Use the Obsidian URI scheme to open a specific vault and file. You can find these from Obsidian's Copy Obsidian URL command.",
        tip: null as string | null,
      },
    ],
  },
  {
    title: "Collaboration & Productivity",
    description: "These apps accept both their HTTPS URLs and native URL schemes. Paste the link from your browser or the app.",
    apps: [
      { name: "Slack", bundle: "com.tinyspeck.slackmacgap" },
      { name: "Zoom", bundle: "us.zoom.xos" },
      { name: "Microsoft Teams", bundle: "com.microsoft.teams2" },
      { name: "Notion", bundle: "notion.id" },
      { name: "Linear", bundle: "com.linear" },
      { name: "Discord", bundle: "com.hnc.Discord" },
    ],
    inputs: [
      {
        label: "Slack, Zoom, Teams, Notion, or Linear URL",
        format: "https://app.slack.com/client/T0123/C0456",
        description: "Copy the channel, meeting, page, or issue link from the address bar or Share in the app. Snapback opens it directly in the desktop app.",
        tip: null as string | null,
      },
      {
        label: "Discord channel or server URL",
        format: "https://discord.com/channels/123456789/987654321",
        description: "Right-click any channel and choose Copy Link, or copy the URL from Discord in a browser. Snapback automatically converts it to the discord:// scheme so it opens in the desktop app.",
        tip: null as string | null,
      },
    ],
  },
  {
    title: "Git Clients",
    description: "GitHub Desktop and SourceTree reopen to a specific local repository.",
    apps: [
      { name: "GitHub Desktop", bundle: "com.github.GitHubClient" },
      { name: "SourceTree", bundle: "com.torusknot.SourceTreeNotMAS" },
    ],
    inputs: [
      {
        label: "Path to the repository folder",
        format: "~/Projects/myrepo",
        description: "Type the path to the repository folder.",
        tip: "Click the folder icon to browse instead of typing the path.",
      },
    ],
  },
  {
    title: "Finder",
    description: "Reopen a Finder window to a specific folder.",
    apps: [{ name: "Finder", bundle: "com.apple.finder" }],
    inputs: [
      {
        label: "Folder URL",
        format: "file:///Users/you/Projects/my-app",
        description: "Use a file:// URL with the absolute path to the folder.",
        tip: "Click the folder icon to browse. Snapback fills in the URL automatically.",
      },
    ],
  },
]

export default function DeeplinksGuidePage() {
  return (
    <div className="max-w-3xl mx-auto py-40 md:py-32 px-6">
      <div className="mb-16">
        <Link
          href="/pro/guide/"
          className="inline-flex items-center gap-1.5 text-zinc-500 text-sm hover:text-zinc-300 transition-colors mb-8"
        >
          ← Pro Guide
        </Link>
        <h1 className="font-display text-[clamp(36px,5vw,56px)] font-semibold text-white tracking-[-0.03em] mb-4">
          Deeplinks Reference
        </h1>
        <p className="text-zinc-400 text-lg leading-[1.7] font-text">
          Supported apps and what to enter in the deeplink field for each one.
        </p>
      </div>

      {/* How it works */}
      <div className="rounded-xl border border-white/8 bg-white/[0.03] px-5 py-4 mb-14">
        <p className="text-zinc-400 text-sm leading-[1.8] font-text">
          <span className="text-zinc-300 font-semibold">How it works. </span>
          When you restore a workspace, Snapback fires the deeplink for each app window in that workspace. The app must be running or installed for the link to work. Only apps listed below are supported. If yours isn't here, let us know and we'll look into adding it.
        </p>
      </div>

      <div className="space-y-16">
        {appGroups.map((group) => (
          <section key={group.title}>
            <h2 className="font-display text-xl font-semibold text-white tracking-[-0.02em] mb-1">
              {group.title}
            </h2>
            <p className="text-zinc-500 text-sm leading-[1.7] font-text mb-5">{group.description}</p>

            {group.apps.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {group.apps.map((app) => (
                  <span
                    key={app.bundle}
                    className="text-xs font-medium text-zinc-400 border border-white/[0.08] bg-white/[0.03] rounded-lg px-3 py-1.5"
                  >
                    {app.name}
                  </span>
                ))}
              </div>
            )}

            <div className="space-y-3">
              {group.inputs.map((input) => (
                <div
                  key={input.label}
                  className="rounded-xl border border-white/8 bg-[#0c0e14] px-5 py-4"
                >
                  <span className="text-zinc-500 text-xs font-medium uppercase tracking-wider">
                    {input.label}
                  </span>
                  <code className="block text-accent text-sm font-mono mt-2 mb-2 break-all">
                    {input.format}
                  </code>
                  <p className="text-zinc-500 text-sm leading-[1.7] font-text">{input.description}</p>
                  {input.tip && (
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/[0.06]">
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="shrink-0 text-zinc-300"
                        aria-hidden="true"
                      >
                        <path
                          d="M2 4.5A1.5 1.5 0 0 1 3.5 3h4.086a1.5 1.5 0 0 1 1.06.44l.915.915A1.5 1.5 0 0 0 10.62 5H12.5A1.5 1.5 0 0 1 14 6.5v6A1.5 1.5 0 0 1 12.5 14h-9A1.5 1.5 0 0 1 2 12.5v-8Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="text-zinc-300 text-xs font-medium font-text">{input.tip}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-20 pt-12 border-t border-white/[0.06]">
        <p className="text-zinc-400 text-base font-text">
          App not listed or something not working?{" "}
          <a href="mailto:support@snapbackapp.com" className="text-primary hover:underline">
            Let us know
          </a>{" "}
          and we'll look into adding support.
        </p>
      </div>
    </div>
  )
}
