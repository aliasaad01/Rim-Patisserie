import React, { useEffect, useRef, useState } from 'react';
import { CartItem } from '../types';
import { buildCartOrderUrl } from '../utils/whatsapp';
import { X, Plus, Minus, Trash2, ShoppingBag, MessageCircle } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  notes: string;
  onNotesChange: (notes: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  notes,
  onNotesChange,
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [hasOpenedWhatsApp, setHasOpenedWhatsApp] = useState(false);

  // Lock background body scroll and listen for Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      // Auto focus close button for accessibility
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleSendOrder = () => {
    // An empty cart never generates an order message: the button is disabled
    // and the Arabic empty-state prompts the customer to add products first.
    const url = buildCartOrderUrl(items, notes);
    if (!url) return;
    setHasOpenedWhatsApp(true);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#39252A]/40 backdrop-blur-xs animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Drawer Container: Responsive side sheet with maximum width constraint */}
      <div className="relative w-full sm:max-w-md md:max-w-[440px] bg-[#FFFFFF] border-l border-[#E8D8D5] shadow-2xl flex flex-col h-full max-h-[100dvh] text-[#39252A] animate-drawer-in overflow-hidden">
        {/* Header with safe-area spacing */}
        <header className="pt-[max(1rem,env(safe-area-inset-top))] px-4 sm:px-5 pb-3 sm:pb-3.5 border-b border-[#E8D8D5] flex items-center justify-between bg-[#FFF9F5]/80 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[9px] bg-[#FFFFFF] border border-[#E8D8D5] text-[#781728] flex items-center justify-center shrink-0">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <h2 className="font-serif-luxury text-xl sm:text-2xl text-[#39252A] font-normal leading-tight">
                  Your Selection
                </h2>
                <span dir="rtl" className="text-xs font-arabic-clean text-[#806D71]">
                  سلة الطلب
                </span>
              </div>
              <p className="text-[11px] text-[#806D71] font-sans-refined">
                {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'} selected
              </p>
            </div>
          </div>

          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="w-9 h-9 rounded-[10px] bg-[#FFFFFF] hover:bg-[#F5ECE8] border border-[#E8D8D5] text-[#39252A] hover:text-[#781728] flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#781728]"
            aria-label="Close cart drawer"
          >
            <X className="w-4 h-4" />
          </button>
        </header>

        {/* Scrollable Body: Item list + Notes + Pricing reminder */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 space-y-4 overscroll-contain">
          {items.length === 0 ? (
            <div className="py-16 px-4 text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#FFF9F5] border border-[#E8D8D5] flex items-center justify-center text-[#AD5B67] mb-3">
                <ShoppingBag className="w-6 h-6 opacity-75" />
              </div>
              <h3 className="font-serif-luxury text-xl text-[#39252A] font-normal">
                Your cart is empty
              </h3>
              <p dir="rtl" className="text-xs font-arabic-clean text-[#806D71] mt-1">
                سلة الطلبات فارغة — أضف المنتجات أولاً لإرسال الطلب عبر واتساب.
              </p>
              <p className="text-xs text-[#806D71] mt-2 max-w-xs mx-auto leading-relaxed">
                Add fine cakes or patisserie from our collections to request your personalized order via WhatsApp.
              </p>
              <button
                onClick={onClose}
                className="mt-5 px-4 py-2 rounded-[10px] bg-[#781728] text-[#FFFFFF] text-xs font-medium cursor-pointer hover:bg-[#4F0715] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#781728]"
              >
                Browse Collections
              </button>
            </div>
          ) : (
            <>
              {/* Product Rows */}
              <div className="space-y-2.5">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-2.5 sm:p-3 rounded-[12px] bg-[#FFF9F5] border border-[#E8D8D5] flex items-center gap-3 transition-colors"
                  >
                    {/* Small Thumbnail */}
                    <img
                      src={item.product.image}
                      alt={item.product.titleEn}
                      className="w-13 h-13 sm:w-15 sm:h-15 rounded-[10px] object-cover shrink-0 border border-[#E8D8D5]/80 bg-[#FFFFFF]"
                      loading="lazy"
                    />

                    {/* Product Name, Arabic Subtitle & Status */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-1.5">
                        <h4 className="font-serif-luxury text-sm sm:text-base text-[#39252A] font-normal leading-tight truncate">
                          {item.product.titleEn}
                        </h4>
                        <span
                          dir="rtl"
                          className="text-[11px] font-arabic-clean text-[#806D71] shrink-0 truncate max-w-[45%]"
                        >
                          {item.product.titleAr}
                        </span>
                      </div>

                      <div className="mt-1 text-[11px] text-[#806D71] flex items-center justify-between">
                        <span className="font-sans-refined">Price on request · السعر عند الطلب</span>
                      </div>
                    </div>

                    {/* Quantity Controls & Remove Action */}
                    <div className="flex flex-col items-end gap-1.5 shrink-0 pl-1">
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="p-1 rounded-[6px] text-[#806D71] hover:text-[#781728] hover:bg-[#F5ECE8] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#781728]"
                        aria-label={`Remove ${item.product.titleEn} from cart`}
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center border border-[#E8D8D5] rounded-[8px] bg-[#FFFFFF] overflow-hidden">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-[#39252A] hover:bg-[#FFF9F5] hover:text-[#781728] transition-colors cursor-pointer active:bg-[#F5ECE8] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#781728]"
                          aria-label={`Decrease ${item.product.titleEn} quantity`}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-mono font-medium text-[#39252A]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-[#39252A] hover:bg-[#FFF9F5] hover:text-[#781728] transition-colors cursor-pointer active:bg-[#F5ECE8] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#781728]"
                          aria-label={`Increase ${item.product.titleEn} quantity`}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Notes Field */}
              <div className="pt-1">
                <label
                  htmlFor="cart-customer-notes"
                  className="block text-xs font-medium text-[#39252A] mb-1.5"
                >
                  Order Notes & Event Details <span className="font-normal text-[#806D71]">(Optional)</span>
                </label>
                <textarea
                  id="cart-customer-notes"
                  value={notes}
                  onChange={(e) => onNotesChange(e.target.value)}
                  placeholder="e.g. Desired celebration date, cake inscription, or flavor preferences..."
                  rows={2}
                  className="w-full p-2.5 rounded-[10px] bg-[#FFF9F5] border border-[#E8D8D5] text-xs text-[#39252A] placeholder:text-[#806D71]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#781728] resize-none transition-colors"
                />
              </div>

              {/* Price & Availability Notice */}
              <div className="p-3 rounded-[10px] bg-[#FFF9F5] border border-[#E8D8D5] text-[11px] text-[#806D71] space-y-1">
                <p className="font-medium text-[#39252A]">
                  Pricing & Availability Confirmation
                </p>
                <p className="leading-relaxed">
                  Prices for custom cakes and artisanal pâtisserie in Tartus are confirmed on WhatsApp based on servings, ingredients, and pickup timing. No online payment is processed.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer: WhatsApp Order Handoff Action */}
        <footer className="p-4 sm:p-5 border-t border-[#E8D8D5] bg-[#FFFFFF] shrink-0 space-y-2 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <button
            onClick={handleSendOrder}
            disabled={items.length === 0}
            className={`w-full h-11 sm:h-12 rounded-[12px] font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-xs active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#781728] ${
              items.length === 0
                ? 'bg-[#E8D8D5] text-[#806D71] cursor-not-allowed opacity-60'
                : 'bg-[#781728] hover:bg-[#4F0715] text-[#FFFFFF] cursor-pointer'
            }`}
            aria-disabled={items.length === 0}
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            <span>Send Order via WhatsApp</span>
          </button>

          {hasOpenedWhatsApp && (
            <p dir="rtl" className="font-arabic-clean text-[11px] text-[#781728] text-center font-medium">
              تم فتح واتساب — راجع الرسالة الجاهزة وأرسلها يدوياً.
            </p>
          )}

          <button
            onClick={onClose}
            className="w-full py-1.5 text-xs text-[#806D71] hover:text-[#39252A] text-center font-medium transition-colors cursor-pointer"
          >
            Continue Shopping
          </button>
        </footer>
      </div>
    </div>
  );
};
