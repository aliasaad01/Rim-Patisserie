import React from "react";
import { SceneId } from "../types";
import { ArrowLeft, MessageCircle, ShoppingBag } from "lucide-react";
import { BRAND_INFO } from "../data/patisserieData";
import { BrandLogo } from "./BrandLogo";

interface CinematicHudProps {
  currentScene: SceneId;
  onNavigate: (scene: SceneId) => void;
  onOpenCart?: () => void;
  cartCount?: number;
}

export const CinematicHud: React.FC<CinematicHudProps> = ({
  currentScene,
  onNavigate,
  onOpenCart,
  cartCount = 0,
}) => {
  // Never show any header on the entrance scene
  if (currentScene === "entrance") {
    return null;
  }

  return (
    <header
      className="sticky top-0 left-0 right-0 z-40 h-14 md:h-16 flex items-center justify-between px-3 sm:px-6 md:px-8 bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E8D8D5] transition-colors"
      aria-label="Site Navigation"
    >
      {/* Left: Back to Entrance + Brand Mark */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 md:gap-3 min-w-0">
        <button
          onClick={() => onNavigate("entrance")}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-[10px] text-xs font-medium text-[#39252A] hover:text-[#781728] bg-[#FFF9F5] hover:bg-[#F5ECE8] transition-colors border border-[#E8D8D5] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#781728] min-h-[36px] shrink-0"
          aria-label="Back to Entrance"
          title="Back to Entrance"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#781728]" />
          <span className="hidden sm:inline">Entrance</span>
        </button>

        <button
          onClick={() => onNavigate("entrance")}
          className="flex items-center gap-1.5 sm:gap-2 text-left group focus-visible:outline-none min-w-0"
          aria-label="Rim Patisserie Tartus - Return to Entrance"
        >
          <BrandLogo sizeClassName="h-7 sm:h-8" className="shrink-0" />
          <div className="flex flex-col min-w-0">
            <span className="font-serif-luxury text-[13px] xs:text-sm sm:text-base tracking-wide text-[#39252A] group-hover:text-[#781728] transition-colors truncate block leading-tight">
              {BRAND_INFO.name}
            </span>
            <span className="text-[10px] text-[#806D71] font-sans-refined hidden sm:block leading-none mt-0.5 truncate">
              Tartus · Since 2003
            </span>
          </div>
        </button>
      </div>

      {/* Right Controls: Unified shopping cart trigger + single understated WhatsApp action */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 md:gap-3 shrink-0">
        {/* Single Shared Shopping Cart Trigger */}
        {onOpenCart && (
          <button
            onClick={onOpenCart}
            className="flex items-center justify-center gap-1.5 px-2.5 lg:px-3 py-1.5 text-xs font-medium text-[#781728] hover:text-[#4F0715] bg-[#FFF9F5] hover:bg-[#F5ECE8] border border-[#E8D8D5] rounded-[10px] shadow-2xs transition-colors cursor-pointer min-h-[36px] min-w-[36px] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#781728]"
            aria-label={`Open shopping cart with ${cartCount} items`}
            title={`Shopping Cart (${cartCount})`}
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#781728] shrink-0" />
            <span className="hidden lg:inline">Cart</span>
            {cartCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold bg-[#781728] text-[#FFFFFF] leading-none">
                {cartCount}
              </span>
            )}
          </button>
        )}

        {/* Single Understated WhatsApp Action across all scenes */}
        <a
          href={BRAND_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 px-2.5 lg:px-3 py-1.5 text-xs font-medium text-[#781728] hover:text-[#4F0715] bg-[#FFF9F5] hover:bg-[#F5ECE8] border border-[#E8D8D5] rounded-[10px] shadow-2xs transition-colors cursor-pointer min-h-[36px] min-w-[36px] active:scale-95 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#781728]"
          title="WhatsApp Concierge"
          aria-label="WhatsApp Concierge"
        >
          <MessageCircle className="w-3.5 h-3.5 text-[#781728] shrink-0" />
          <span className="hidden lg:inline">WhatsApp</span>
        </a>
      </div>
    </header>
  );
};
