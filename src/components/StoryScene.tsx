import React from "react";
import { SceneId } from "../types";
import { BRAND_INFO, STORY_MILESTONES } from "../data/patisserieData";
import {
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Instagram,
  Facebook,
  ArrowRight,
} from "lucide-react";
import { BrandLogo } from "./BrandLogo";

interface StorySceneProps {
  onNavigate: (scene: SceneId) => void;
}

export const StoryScene: React.FC<StorySceneProps> = ({ onNavigate }) => {
  return (
    <div className="relative min-h-[100dvh] w-full pt-3 sm:pt-5 pb-20 md:pb-24 px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col justify-start bg-[#FFF9F5] text-[#39252A]">
      {/* Compact Page Header */}
      <header className="max-w-4xl mx-auto w-full mb-4 sm:mb-6">
        <div className="border-b border-[#E8D8D5] pb-3 sm:pb-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5 sm:gap-3">
          <div>
            <h1 className="font-serif-luxury text-2xl sm:text-3xl text-[#39252A] font-normal tracking-tight leading-tight">
              Our Story
            </h1>
            <p className="mt-0.5 text-xs sm:text-sm text-[#806D71] font-sans-refined">
              Established in 2003 in Tartus, Syria.
            </p>
          </div>
          <div className="flex items-center gap-2.5 sm:gap-3 self-start sm:self-auto shrink-0">
            <button
              onClick={() => onNavigate("collections")}
              className="text-xs text-[#781728] hover:text-[#4F0715] font-medium transition-colors cursor-pointer hover:underline py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#781728]"
            >
              Collections
            </button>
            <span className="text-[#E8D8D5] text-xs" aria-hidden="true">
              ·
            </span>
            <button
              onClick={() => onNavigate("atelier")}
              className="text-xs text-[#806D71] hover:text-[#781728] font-medium transition-colors cursor-pointer hover:underline py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#781728]"
            >
              Custom Order →
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto w-full space-y-5 sm:space-y-6">
        {/* Editorial Introduction Card */}
        <section
          aria-label="About Rim Patisserie"
          className="bg-[#FFFFFF] border border-[#E8D8D5] rounded-[16px] p-5 sm:p-7 shadow-xs"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-7 items-center">
            {/* Brand Emblem */}
            <div className="md:col-span-4 flex justify-center py-1">
              <BrandLogo sizeClassName="h-16 sm:h-20 md:h-24" className="select-none" />
            </div>

            {/* Narrative */}
            <div className="md:col-span-8 space-y-3 font-sans-refined text-xs sm:text-sm leading-relaxed text-[#39252A]">
              <div className="flex items-center justify-between pb-1 border-b border-[#F0E4E1]">
                <span className="text-xs font-semibold text-[#781728] uppercase tracking-wider font-mono">
                  Rim Patisserie
                </span>
                <span
                  dir="rtl"
                  className="text-xs font-arabic-clean text-[#806D71]"
                >
                  حلويات ريم · طرطوس
                </span>
              </div>

              <p className="text-[#39252A]">
                Rim Patisserie was established in 2003 in Tartus, Syria by Rim
                Ibrahim. For over twenty years, our atelier has focused on
                creating bespoke wedding cakes, celebratory tiers, and
                handcrafted pastries for family occasions and special events.
              </p>

              <p className="text-[#806D71]">
                Based in our Al-Qusoor district boutique, we welcome guests
                daily, preparing each creation fresh with genuine care and
                dedication to quality ingredients and craftsmanship.
              </p>

              {/* Verified Facts Strip */}
              <div className="pt-2 grid grid-cols-3 gap-2 sm:gap-4 border-t border-[#F0E4E1] text-center sm:text-left">
                <div>
                  <span className="text-[#39252A] block font-bold text-sm sm:text-base font-sans">
                    2003
                  </span>
                  <span className="text-[11px] text-[#806D71] font-mono">
                    Tartus, Syria
                  </span>
                </div>
                <div className="border-l border-[#F0E4E1] pl-2 sm:pl-4">
                  <span className="text-[#39252A] block font-bold text-sm sm:text-base font-sans">
                    Al-Qusoor
                  </span>
                  <span className="text-[11px] text-[#806D71] font-mono">
                    Boutique & Atelier
                  </span>
                </div>
                <div className="border-l border-[#F0E4E1] pl-2 sm:pl-4">
                  <span className="text-[#39252A] block font-bold text-sm sm:text-base font-sans">
                    Daily
                  </span>
                  <span className="text-[11px] text-[#806D71] font-mono">
                    9:00 AM – 12:30 AM
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Compact Milestones Grid */}
        <section aria-label="Key Milestones">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-serif-luxury text-lg sm:text-xl text-[#39252A] font-normal">
              Key Milestones
            </h2>
            <span
              dir="rtl"
              className="text-xs font-arabic-clean text-[#806D71]"
            >
              محطات رئيسية
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            {STORY_MILESTONES.map((milestone, idx) => (
              <div
                key={idx}
                className="bg-[#FFFFFF] border border-[#E8D8D5] rounded-[14px] p-4 sm:p-5 shadow-xs transition-colors hover:border-[#AD5B67]/60"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-mono text-[#781728] font-bold">
                    {milestone.year}
                  </span>
                  <span
                    dir="rtl"
                    className="text-[11px] font-arabic-clean text-[#806D71]"
                  >
                    {milestone.titleAr}
                  </span>
                </div>
                <h3 className="font-serif-luxury text-base text-[#39252A] mb-1 font-normal">
                  {milestone.titleEn}
                </h3>
                <p className="text-xs text-[#806D71] font-sans-refined leading-relaxed">
                  {milestone.descriptionEn}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Boutique Location & Contact */}
        <section
          aria-label="Boutique Location and Contact"
          className="bg-[#FFFFFF] border border-[#E8D8D5] rounded-[16px] p-5 sm:p-7 shadow-xs"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Location & Hours */}
            <div className="space-y-3.5">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#781728] font-mono block mb-0.5 font-medium">
                  Boutique & Atelier
                </span>
                <h2 className="font-serif-luxury text-xl sm:text-2xl text-[#39252A] font-normal">
                  Al-Qusoor District, Tartus
                </h2>
                <p
                  dir="rtl"
                  className="text-xs font-arabic-clean text-[#806D71] mt-0.5"
                >
                  حي القصور، طرطوس، سوريا
                </p>
              </div>

              <div className="space-y-2.5 text-xs text-[#39252A]">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#781728] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-[#39252A] block">
                      Address
                    </span>
                    <span className="text-[#806D71]">
                      Al-Qusoor District, Tartus, Syrian Arab Republic
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#781728] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-[#39252A] block">
                      Operating Hours
                    </span>
                    <span className="text-[#806D71]">
                      9:00 AM – 12:30 AM Daily
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-[#781728] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-[#39252A] block">
                      Telephone Inquiries
                    </span>
                    <a
                      href={`tel:${BRAND_INFO.phoneIntl}`}
                      className="text-[#806D71] hover:text-[#781728] hover:underline font-mono"
                      aria-label={`Call ${BRAND_INFO.phone}`}
                    >
                      {BRAND_INFO.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Connect Buttons */}
            <div className="flex flex-col gap-2.5">
              <a
                href={BRAND_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-11 rounded-[12px] bg-[#781728] hover:bg-[#4F0715] text-[#FFFFFF] font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.99] shadow-xs"
                aria-label="Order or inquire via WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Atelier ({BRAND_INFO.phone})</span>
              </a>

              <a
                href={BRAND_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-11 rounded-[12px] bg-[#FFF9F5] hover:bg-[#F5ECE8] text-[#39252A] border border-[#E8D8D5] font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
                aria-label="Visit Rim Patisserie on Instagram"
              >
                <Instagram className="w-4 h-4 text-[#781728]" />
                <span>Instagram {BRAND_INFO.instagramHandle}</span>
              </a>

              <a
                href={BRAND_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-11 rounded-[12px] bg-[#FFF9F5] hover:bg-[#F5ECE8] text-[#39252A] border border-[#E8D8D5] font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
                aria-label="Visit Rim Ibrahim on Facebook"
              >
                <Facebook className="w-4 h-4 text-[#781728]" />
                <span>Facebook {BRAND_INFO.facebookName}</span>
              </a>
            </div>
          </div>
        </section>

        {/* Bottom Explore Links */}
        <div className="pt-2 pb-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#806D71] border-t border-[#E8D8D5]">
          <span>
            Explore handcrafted creations or place a custom order inquiry:
          </span>
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => onNavigate("collections")}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[10px] bg-[#EFD4C4] hover:bg-[#E5C4B1] text-[#781728] font-medium transition-colors cursor-pointer"
            >
              <span>Our Collections</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate("atelier")}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[10px] bg-[#FFFFFF] hover:bg-[#F5ECE8] text-[#39252A] border border-[#E8D8D5] font-medium transition-colors cursor-pointer"
            >
              <span>Custom Order</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
