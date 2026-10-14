import React from "react";
import logoAsset from "../assets/images/logo.png";

/**
 * Single source of truth for the official Rim Patisserie logo
 * (src/assets/images/logo.png — 200×200 square emblem with transparent background).
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
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  sizeClassName = "h-10 sm:h-12",
  className = "",
  alt = "",
}) => {
  return (
    <img
      loading="eager"
      src={logoAsset}
      alt={alt}
      aria-hidden={alt ? undefined : true}
      draggable={false}
      className={`${sizeClassName} w-auto max-w-full object-contain ${className}`.trim()}
    />
  );
};
