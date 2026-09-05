import SnapbackLanding from '@/components/SnapbackLanding';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is Snapback really free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, and it will stay that way. The core app is free forever. A Pro version is coming with power-user extras, but everything you need today is free and fully supported."
      }
    },
    {
      "@type": "Question",
      "name": "Does it support macOS Spaces?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Snapback doesn't integrate with macOS Spaces directly. Apple doesn't offer a stable public API for them. Instead, it restores window positions and arrangements, giving you the same result without the fragility. This keeps restores predictable and reliable across multi-monitor setups."
      }
    },
    {
      "@type": "Question",
      "name": "Does it work with multiple monitors?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Workspaces capture window positions across all connected displays."
      }
    },
    {
      "@type": "Question",
      "name": "What if I swap or rotate a display?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Snapback detects the change and recalculates automatically."
      }
    },
    {
      "@type": "Question",
      "name": "What happens if I disconnect a display entirely?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Windows saved on a missing display are skipped, so nothing piles up on your remaining screen. If your whole workspace was saved on one display, it restores on whatever screen is available."
      }
    },
    {
      "@type": "Question",
      "name": "What happens if an app in my workspace is closed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Snapback reopens it. Automatically. You don't have to do anything."
      }
    },
    {
      "@type": "Question",
      "name": "Will it work after a macOS update?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Snapback targets macOS 14.2+ and is actively maintained."
      }
    },
    {
      "@type": "Question",
      "name": "Does it run in the background?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Menu bar, minimal resources."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use it alongside Rectangle or Magnet?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. They work together without conflicts."
      }
    }
  ]
};

const videoSchemas = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "VideoObject",
      "name": "Snapback: Restore Your Mac Workspace in One Keystroke",
      "description": "Watch Snapback restore an entire Mac workspace layout — every app, every window position, every display — with a single keyboard shortcut.",
      "thumbnailUrl": "https://snapbackapp.com/assets/restore-poster.webp",
      "uploadDate": "2026-05-12T00:00:00Z",
      "contentUrl": "https://snapbackapp.com/assets/restore.mp4",
      "embedUrl": "https://snapbackapp.com/assets/restore.mp4",
      "publisher": {
        "@type": "Organization",
        "name": "Snapback",
        "logo": {
          "@type": "ImageObject",
          "url": "https://snapbackapp.com/assets/logo.svg"
        }
      }
    },
    {
      "@type": "VideoObject",
      "name": "How Snapback Workspaces Work: Save, Restore, Switch",
      "description": "A quick walkthrough of the three-step Snapback workflow: arrange your windows once, save as a workspace, and restore instantly anytime.",
      "thumbnailUrl": "https://snapbackapp.com/assets/snapback-steps-poster.webp",
      "uploadDate": "2026-05-12T00:00:00Z",
      "contentUrl": "https://snapbackapp.com/assets/snapback-steps.mp4",
      "embedUrl": "https://snapbackapp.com/assets/snapback-steps.mp4",
      "publisher": {
        "@type": "Organization",
        "name": "Snapback",
        "logo": {
          "@type": "ImageObject",
          "url": "https://snapbackapp.com/assets/logo.svg"
        }
      }
    }
  ]
};

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      <link rel="preload" href="/assets/restore-poster.webp" as="image" fetchPriority="high" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchemas) }}
      />
      <SnapbackLanding />
    </div>
  );
}
