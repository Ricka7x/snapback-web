import manifest from "../../public/assets/manifest.json"

type AssetManifestImageEntry = {
  outputs?: Record<string, string>
  placeholder?: {
    file?: string
    dataUri?: string
  }
}

type AssetManifest = {
  assets?: {
    images?: Record<string, AssetManifestImageEntry>
  }
}

const typedManifest = manifest as AssetManifest

const blurDataURLByOutput = new Map<string, string>()

for (const image of Object.values(typedManifest.assets?.images ?? {})) {
  const placeholderValue = image.placeholder?.file ?? image.placeholder?.dataUri

  if (!placeholderValue) {
    continue
  }

  for (const outputPath of Object.values(image.outputs ?? {})) {
    blurDataURLByOutput.set(outputPath, placeholderValue)
  }
}

export function getBlurDataURL(src: string): string | undefined {
  return blurDataURLByOutput.get(src)
}