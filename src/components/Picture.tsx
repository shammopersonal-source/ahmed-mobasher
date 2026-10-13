import { assets, type AssetName } from "@/content/assets.generated";

type Props = {
  name: AssetName;
  alt: string;
  className?: string;
  /** Above-the-fold image: load eagerly at high priority. Everything else is lazy. */
  priority?: boolean;
};

/** AVIF with WebP fallback, always with intrinsic width/height so it can't shift layout. */
export function Picture({ name, alt, className, priority = false }: Props) {
  const a = assets[name];
  return (
    <picture>
      <source srcSet={a.avif} type="image/avif" />
      <img
        src={a.webp}
        alt={alt}
        width={a.width}
        height={a.height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding={priority ? "sync" : "async"}
        className={className}
      />
    </picture>
  );
}
