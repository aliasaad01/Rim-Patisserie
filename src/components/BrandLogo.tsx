import React from "react";
import logoAsset from "../assets/images/logo-512-q90.webp";

/**
 * Single source of truth for the official Rim Patisserie logo
 * (512×512 WebP optimized from src/assets/images/logo.png — transparent background).
 * The asset is imported once here so every brand surface renders the identical,
 * undistorted logo. Always render with a square-safe height utility (h-*) plus
 * `w-auto object-contain` — never stretch it.
 */
interface BrandLogoProps {
  /** Height utility for the placement context (e.g. "h-7 sm:h-8"); width follows the square aspect ratio. */
  sizeClassName?: string;
  /** Extra classes merged after the size (spacing, max caps, selection). */
  className?: string;
  /** Accessible label. Defaults to decorative (empty) since adjacent text already names the brand. */
  alt?: string;
  /** Loading strategy — defaults to eager (critical brand mark); pass "lazy" for below-the-fold placements. */
  loading?: "eager" | "lazy";
  /** Raise fetch priority for the critical above-the-fold logo. */
  fetchPriority?: "high" | "low" | "auto";
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  sizeClassName = "h-10 sm:h-12",
  className = "",
  alt = "",
  loading = "eager",
  fetchPriority,
}) => {
  return (
    <img
      loading={loading}
      fetchPriority={fetchPriority}
      decoding="async"
      width={512}
      height={512}
      src={logoAsset}
      alt={alt}
      aria-hidden={alt ? undefined : true}
      draggable={false}
      className={`${sizeClassName} w-auto max-w-full object-contain ${className}`.trim()}
    />
  );
};
