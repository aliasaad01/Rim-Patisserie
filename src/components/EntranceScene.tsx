import React from "react";
import { SceneId } from "../types";
import { BRAND_INFO } from "../data/patisserieData";
import { Instagram, Facebook, Phone, MessageCircle } from "lucide-react";
import { BrandLogo } from "./BrandLogo";

interface EntranceSceneProps {
  onNavigate: (scene: SceneId) => void;
}

export const EntranceScene: React.FC<EntranceSceneProps> = ({ onNavigate }) => {
  const socialLinks = [
    {
      id: "instagram",
      label: "Instagram",
      href: BRAND_INFO.instagramUrl,
      icon: Instagram,
      ariaLabel: "Visit Rim Patisserie on Instagram",
      isExternal: true,
    },
    {
      id: "facebook",
      label: "Facebook",
      href: BRAND_INFO.facebookUrl,
      icon: Facebook,
      ariaLabel: "Visit Rim Ibrahim on Facebook",
      isExternal: true,
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      href: BRAND_INFO.whatsappUrl,
      icon: MessageCircle,
      ariaLabel: "Contact Rim Patisserie via WhatsApp",
      isExternal: true,
    },
    {
      id: "phone",
      label: "+963 985 155 115",
      href: `tel:${BRAND_INFO.phoneIntl}`,
      icon: Phone,
      ariaLabel: "Call Rim Patisserie at +963985155115",
      isExternal: false,
    },
  ];

  return (
    <section
      aria-label="Rim Patisserie Entrance"
      className="relative w-full h-[100dvh] max-h-[100dvh] min-h-[100dvh] flex flex-col justify-between items-center px-4 sm:px-6 md:px-12 select-none overflow-hidden bg-[#FFF9F5] text-[#39252A]"
      style={{
        paddingTop: "max(env(safe-area-inset-top, 0px), 12px)",
        paddingBottom: "max(env(safe-area-inset-bottom, 0px), 12px)",
      }}
    >
      {/* Top Provenance Header */}
      <header className="w-full max-w-md flex justify-center items-center shrink-0 pt-1 pr-14 pl-4 sm:px-0">
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-[#806D71] font-sans-refined font-medium text-center">
          Tartus, Syria · Est. 2003
        </p>
      </header>

      {/* Hero Visual Anchor: Official Logo Emblem & Brand Lockup */}
      <div className="relative flex flex-col items-center justify-center my-auto shrink-0 text-center max-w-md w-full px-2">
        {/* Official Rim Patisserie logo emblem (single shared source of truth) */}
        <BrandLogo sizeClassName="h-28 sm:h-32 md:h-40" className="select-none" />

        {/* Brand Typography & Tagline */}
        <div className="mt-2.5 sm:mt-3.5">
          <h1 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl tracking-wide text-[#39252A] font-normal leading-tight">
            {BRAND_INFO.name}
          </h1>

          <p className="mt-1 text-xs sm:text-[13px] text-[#806D71] font-sans-refined leading-relaxed font-light max-w-xs sm:max-w-sm mx-auto">
            For birthdays, weddings, and everything worth celebrating.
          </p>

          <p className="mt-1 text-[11px] text-[#781728] font-sans-refined font-medium tracking-wide">
            Cakes & Desserts Made with Love{" "}
          </p>
        </div>
      </div>

      {/* Main Actions & Social Anchor */}
      <div className="w-full max-w-xs sm:max-w-sm flex flex-col items-center gap-1.5 sm:gap-2 shrink-0 pb-1">
        {/* Primary Action Row: Discover Collections & Custom Order side by side */}
        <nav
          aria-label="Primary Navigation"
          className="w-full grid grid-cols-2 gap-2 sm:gap-2.5"
        >
          {/* Action 1: Discover Collections (Burgundy Primary with Soft 12px Radius) */}
          <button
            onClick={() => onNavigate("collections")}
            className="w-full h-9 sm:h-10 px-3 sm:px-4 rounded-[12px] bg-[#781728] hover:bg-[#4F0715] text-[#FFFFFF] font-medium text-xs sm:text-[13px] tracking-wide transition-colors cursor-pointer flex items-center justify-center whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#781728] shadow-sm shadow-[#781728]/15"
          >
            Discover Collections
          </button>

          {/* Action 2: Custom Order (Secondary Light Surface with Subtle 12px Radius) */}
          <button
            onClick={() => onNavigate("atelier")}
            className="w-full h-9 sm:h-10 px-3 sm:px-4 rounded-[12px] bg-[#FFFFFF] hover:bg-[#FFF9F5] text-[#39252A] border border-[#E8D8D5] hover:border-[#AD5B67] font-medium text-xs sm:text-[13px] tracking-wide transition-colors cursor-pointer flex items-center justify-center whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#781728]"
          >
            Custom Order
          </button>
        </nav>

        {/* Action 3: Our Story (Small Understated Text Link) */}
        <button
          onClick={() => onNavigate("story")}
          className="text-xs text-[#806D71] hover:text-[#781728] transition-colors font-normal tracking-wide py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#781728] rounded-[6px] cursor-pointer hover:underline"
        >
          Our Story →
        </button>

        {/* Compact Location Footer across all screen sizes */}
        <footer className="w-full flex items-center justify-center pt-1 text-[10px] sm:text-[11px] font-mono text-[#806D71]">
          Al-Qusoor, Tartus · Est. 2003
        </footer>
      </div>

      {/* UPPER-RIGHT SOCIAL RAIL: Discreet vertical rail anchored to the upper-right safe area */}
      <aside
        aria-label="Social and Contact Links"
        className="fixed z-20 flex flex-col items-center gap-1 sm:gap-1.5 md:gap-2 py-1.5 px-1 sm:py-2 sm:px-1.5 rounded-[12px] sm:rounded-[14px] backdrop-blur-md transition-colors"
        style={{
          top: "calc(max(env(safe-area-inset-top, 0px), 0px) + 12px)",
          right: "calc(max(env(safe-area-inset-right, 0px), 0px) + 10px)",
        }}
      >
        {socialLinks.map((link) => {
          const IconComponent = link.icon;
          return (
            <div key={link.id} className="relative group flex items-center">
              {/* Floating label revealed on hover on pointer devices without layout shift */}
              <span
                className="pointer-events-none hidden md:block absolute right-full mr-2.5 px-2 py-0.5 rounded-[8px] bg-[#FFFFFF] border border-[#E8D8D5] text-[11px] font-sans-refined text-[#39252A] whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-150 shadow-xs z-30"
                aria-hidden="true"
              >
                {link.label}
              </span>

              <a
                href={link.href}
                target={link.isExternal ? "_blank" : undefined}
                rel={link.isExternal ? "noopener noreferrer" : undefined}
                className="p-1 sm:p-1.5 md:p-2 text-[#806D71] hover:text-[#781728] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#781728] rounded-full flex items-center justify-center min-w-[28px] min-h-[28px] sm:min-w-[32px] sm:min-h-[32px] md:min-w-[36px] md:min-h-[36px]"
                aria-label={link.ariaLabel}
                title={link.label}
              >
                <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
            </div>
          );
        })}
      </aside>
    </section>
  );
};
