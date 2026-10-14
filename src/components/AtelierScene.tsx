import React, { useState } from 'react';
import { SceneId, CollectionItem } from '../types';
import { BRAND_INFO } from '../data/patisserieData';
import { MessageCircle, Check, Phone, ArrowLeft, Sparkles, Calendar } from 'lucide-react';
import { buildAtelierRequestUrl } from '../utils/whatsapp';

interface AtelierSceneProps {
  onNavigate: (scene: SceneId) => void;
  prefillItem?: CollectionItem | null;
}

const OCCASIONS = [
  { id: 'wedding', labelEn: 'Wedding', labelAr: 'حفل زفاف' },
  { id: 'birthday', labelEn: 'Birthday', labelAr: 'عيد ميلاد' },
  { id: 'kids', labelEn: 'Kids', labelAr: 'حفل أطفال' },
  { id: 'other', labelEn: 'Other', labelAr: 'مناسبة أخرى' },
];

const SIZES = [
  { id: '1-tier', labelEn: '1 Tier', subtitleEn: '10–18 servings', labelAr: 'طبقة واحدة', subtitleAr: '10–18 شخص' },
  { id: '2-tier', labelEn: '2 Tiers', subtitleEn: '25–35 servings', labelAr: 'طبقتان', subtitleAr: '25–35 شخص' },
  { id: '3-tier', labelEn: '3 Tiers', subtitleEn: '50–70 servings', labelAr: '3 طبقات', subtitleAr: '50–70 شخص' },
  { id: '5-tier', labelEn: '4–5 Tiers', subtitleEn: '100–180+ servings', labelAr: '4–5 طبقات كبرى', subtitleAr: '100–180+ شخص' },
];

const FLAVORS = [
  { id: 'pistachio-rose', labelEn: 'Pistachio & Rosewater', labelAr: 'فستق حلبي وماء الورد' },
  { id: 'madagascar-vanilla', labelEn: 'Vanilla & Raspberry', labelAr: 'فانيليا وتوت بري' },
  { id: 'valrhona-chocolate', labelEn: 'Chocolate & Caramel', labelAr: 'شوكولا وكراميل' },
  { id: 'hazelnut-praline', labelEn: 'Hazelnut & Espresso', labelAr: 'بندق وإسبريسو' },
  { id: 'white-choc-passion', labelEn: 'White Chocolate & Passionfruit', labelAr: 'شوكولا بيضاء وباشون فروت' },
];

interface AtelierFormState {
  occasion: string;
  size: string;
  flavor: string;
  designDescription: string;
  inscription: string;
  eventDate: string;
  notes: string;
}

export const AtelierScene: React.FC<AtelierSceneProps> = ({
  onNavigate,
  prefillItem,
}) => {
  const [form, setForm] = useState<AtelierFormState>({
    occasion: prefillItem?.category === 'wedding' ? 'wedding' : 'birthday',
    size: prefillItem?.dimensions ? '3-tier' : '2-tier',
    flavor: 'pistachio-rose',
    designDescription: prefillItem ? `Inspired by ${prefillItem.titleEn}` : '',
    inscription: '',
    eventDate: '',
    notes: '',
  });

  const [hasOpenedWhatsApp, setHasOpenedWhatsApp] = useState(false);

  // Tracks choices the customer actually clicked (and text they edited), so
  // preselected form defaults are never presented as explicit selections
  // in the prefilled WhatsApp message.
  const [explicitChoices, setExplicitChoices] = useState({
    occasion: false,
    size: false,
    flavor: false,
    designDescription: false,
  });
  const markChoice = (key: keyof typeof explicitChoices) =>
    setExplicitChoices((prev) => ({ ...prev, [key]: true }));

  const selectedOccasion = OCCASIONS.find((o) => o.id === form.occasion);
  const selectedSize = SIZES.find((s) => s.id === form.size);
  const selectedFlavor = FLAVORS.find((f) => f.id === form.flavor);

  const handleSendWhatsApp = () => {
    // Only explicitly chosen or entered values are included (see
    // buildAtelierRequestMessage in src/utils/whatsapp.ts).
    const url = buildAtelierRequestUrl({
      occasionLabelAr: explicitChoices.occasion ? selectedOccasion?.labelAr : undefined,
      sizeLabelAr:
        explicitChoices.size && selectedSize
          ? `${selectedSize.labelAr} · ${selectedSize.subtitleAr}`
          : undefined,
      flavorLabelAr: explicitChoices.flavor ? selectedFlavor?.labelAr : undefined,
      designDescription: explicitChoices.designDescription ? form.designDescription : undefined,
      inscription: form.inscription,
      eventDate: form.eventDate,
      notes: form.notes,
    });
    setHasOpenedWhatsApp(true);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Live Summary Block
  const renderSummaryBlock = () => {
    const hasAnyContent =
      selectedOccasion ||
      selectedSize ||
      selectedFlavor ||
      form.designDescription.trim() ||
      form.inscription.trim() ||
      form.eventDate ||
      form.notes.trim();

    return (
      <div className="bg-[#FFFFFF] border border-[#E8D8D5] rounded-[14px] p-4 sm:p-5 shadow-2xs space-y-3.5">
        <div className="flex items-center justify-between pb-2.5 border-b border-[#E8D8D5]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#781728]" />
            <h3 className="font-serif-luxury text-base sm:text-lg text-[#39252A] font-normal">
              Your Order Summary
            </h3>
          </div>
          <span dir="rtl" className="text-xs font-arabic-clean text-[#806D71]">
            ملخص الطلب
          </span>
        </div>

        {hasAnyContent ? (
          <div className="space-y-2 text-xs">
            {prefillItem && (
              <div className="flex justify-between items-baseline gap-2 py-0.5">
                <span className="text-[#806D71]">Reference</span>
                <span className="font-medium text-[#39252A] text-right truncate max-w-[60%]">
                  {prefillItem.titleEn}
                </span>
              </div>
            )}
            {selectedOccasion && (
              <div className="flex justify-between items-baseline gap-2 py-0.5">
                <span className="text-[#806D71]">Occasion</span>
                <span className="font-medium text-[#39252A] text-right">
                  {selectedOccasion.labelEn} <span className="text-[#806D71] font-arabic-clean">({selectedOccasion.labelAr})</span>
                </span>
              </div>
            )}
            {selectedSize && (
              <div className="flex justify-between items-baseline gap-2 py-0.5">
                <span className="text-[#806D71]">Cake Size</span>
                <span className="font-medium text-[#39252A] text-right">
                  {selectedSize.labelEn} <span className="text-[#806D71]">· {selectedSize.subtitleEn}</span>
                </span>
              </div>
            )}
            {selectedFlavor && (
              <div className="flex justify-between items-baseline gap-2 py-0.5">
                <span className="text-[#806D71]">Flavor</span>
                <span className="font-medium text-[#39252A] text-right truncate max-w-[65%]">
                  {selectedFlavor.labelEn}
                </span>
              </div>
            )}
            {form.designDescription.trim() && (
              <div className="flex justify-between items-baseline gap-2 py-0.5">
                <span className="text-[#806D71]">Cake Design</span>
                <span className="font-medium text-[#39252A] text-right truncate max-w-[60%]">
                  {form.designDescription.trim()}
                </span>
              </div>
            )}
            {form.inscription.trim() && (
              <div className="flex justify-between items-baseline gap-2 py-0.5">
                <span className="text-[#806D71]">Message</span>
                <span className="font-medium text-[#781728] text-right truncate max-w-[60%]">
                  “{form.inscription.trim()}”
                </span>
              </div>
            )}
            {form.eventDate && (
              <div className="flex justify-between items-baseline gap-2 py-0.5">
                <span className="text-[#806D71]">Date</span>
                <span className="font-mono text-[#39252A] text-right">{form.eventDate}</span>
              </div>
            )}
            {form.notes.trim() && (
              <div className="flex justify-between items-baseline gap-2 py-0.5">
                <span className="text-[#806D71]">Notes</span>
                <span className="font-medium text-[#39252A] text-right truncate max-w-[60%]">
                  {form.notes.trim()}
                </span>
              </div>
            )}
          </div>
        ) : (
          <p className="text-xs text-[#806D71]">Selections will appear here.</p>
        )}

        <div className="pt-2 border-t border-[#E8D8D5] text-[11px] text-[#806D71] leading-relaxed">
          Prices and preparation dates are confirmed directly via WhatsApp. No online payment required.
        </div>

        {/* Primary Action Button */}
        <button
          type="button"
          onClick={handleSendWhatsApp}
          className="w-full h-11 sm:h-12 rounded-[11px] bg-[#781728] hover:bg-[#4F0715] text-[#FFFFFF] font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#781728]"
        >
          <MessageCircle className="w-4 h-4 shrink-0" />
          <span>Send Request via WhatsApp</span>
        </button>

        {hasOpenedWhatsApp && (
          <p dir="rtl" className="font-arabic-clean text-[11px] text-[#781728] text-center font-medium">
            تم فتح واتساب — راجع الرسالة الجاهزة وأرسلها يدوياً.
          </p>
        )}

        <div className="pt-1 text-center">
          <a
            href={`tel:${BRAND_INFO.phoneIntl}`}
            className="text-xs text-[#806D71] hover:text-[#781728] inline-flex items-center gap-1.5 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#781728]" />
            <span>Direct Call: {BRAND_INFO.phone}</span>
          </a>
        </div>
      </div>
    );
  };

  return (
    <div className="relative min-h-[100dvh] w-full pt-2 sm:pt-4 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col justify-start bg-[#FFF9F5] text-[#39252A]">
      {/* Editorial Header */}
      <header className="max-w-5xl mx-auto w-full mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5 sm:gap-3 pb-2 sm:pb-3 border-b border-[#E8D8D5]">
          <div>
            <h1 className="font-serif-luxury text-2xl sm:text-3xl text-[#39252A] font-normal leading-tight tracking-tight">
              Custom Cake Order
            </h1>
            <p className="mt-0.5 text-xs text-[#806D71] font-sans-refined max-w-xl">
              Tell us about your celebration in Tartus. Select your preferences to review and send directly via WhatsApp.
            </p>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 self-start sm:self-auto shrink-0">
            <button
              onClick={() => onNavigate('collections')}
              className="text-xs text-[#781728] hover:text-[#4F0715] font-medium transition-colors cursor-pointer hover:underline py-0.5 flex items-center gap-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#781728]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Collections</span>
            </button>
            <span className="text-[#E8D8D5] text-xs" aria-hidden="true">·</span>
            <button
              onClick={() => onNavigate('story')}
              className="text-xs text-[#806D71] hover:text-[#781728] font-medium transition-colors cursor-pointer hover:underline py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#781728]"
            >
              Our Story
            </button>
          </div>
        </div>

        {/* Reference Banner if prefill item exists */}
        {prefillItem && (
          <div className="mt-3 p-2.5 sm:p-3 rounded-[12px] bg-[#FFFFFF] border border-[#E8D8D5] flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src={prefillItem.image}
                alt={prefillItem.titleEn}
                className="w-11 h-11 rounded-[8px] object-cover shrink-0 border border-[#E8D8D5]"
              />
              <div className="min-w-0">
                <span className="text-[10px] text-[#806D71] font-sans-refined block">
                  Reference creation:
                </span>
                <p className="text-xs sm:text-sm font-serif-luxury text-[#39252A] font-medium truncate">
                  {prefillItem.titleEn}
                  <span className="text-xs text-[#806D71] font-arabic-clean ml-2 font-normal">
                    {prefillItem.titleAr}
                  </span>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('collections')}
              className="text-xs text-[#781728] hover:underline shrink-0 font-medium px-2 py-1"
            >
              Change
            </button>
          </div>
        )}
      </header>

      {/* Main Layout: Form (Left) & Summary (Right on Desktop) */}
      <main className="max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          {/* Form Column */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-4.5">
            {/* 1. What is the occasion? */}
            <section className="bg-[#FFFFFF] border border-[#E8D8D5] rounded-[14px] p-4 sm:p-5 shadow-2xs">
              <div className="flex items-baseline justify-between mb-2.5">
                <label className="text-xs uppercase tracking-wider text-[#781728] font-mono font-medium">
                  What is the occasion?
                </label>
                <span dir="rtl" className="text-xs font-arabic-clean text-[#806D71]">
                  المناسبة
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:gap-2.5" role="radiogroup" aria-label="Event Occasion">
                {OCCASIONS.map((occ) => {
                  const isSelected = form.occasion === occ.id;
                  return (
                    <button
                      type="button"
                      key={occ.id}
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => {
                        setForm({ ...form, occasion: occ.id });
                        markChoice('occasion');
                      }}
                      className={`p-2.5 sm:p-3 rounded-[11px] text-left transition-all text-xs cursor-pointer flex items-center justify-between min-h-[46px] border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#781728] ${
                        isSelected
                          ? 'bg-[#FFF9F5] text-[#39252A] border-[#781728] shadow-2xs font-medium'
                          : 'bg-[#FFFFFF] text-[#806D71] hover:text-[#39252A] border-[#E8D8D5] hover:bg-[#FFF9F5]/50'
                      }`}
                    >
                      <div>
                        <span className="block text-xs font-medium text-[#39252A]">{occ.labelEn}</span>
                        <span dir="rtl" className="text-[11px] font-arabic-clean text-[#806D71] block">
                          {occ.labelAr}
                        </span>
                      </div>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-1.5 transition-colors ${
                          isSelected
                            ? 'border-[#781728] bg-[#781728] text-[#FFFFFF]'
                            : 'border-[#E8D8D5] bg-[#FFFFFF]'
                        }`}
                        aria-hidden="true"
                      >
                        {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* 2. Cake Size */}
            <section className="bg-[#FFFFFF] border border-[#E8D8D5] rounded-[14px] p-4 sm:p-5 shadow-2xs">
              <div className="flex items-baseline justify-between mb-2.5">
                <label className="text-xs uppercase tracking-wider text-[#781728] font-mono font-medium">
                  Cake Size
                </label>
                <span dir="rtl" className="text-xs font-arabic-clean text-[#806D71]">
                  حجم الكيك
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5" role="radiogroup" aria-label="Cake Size">
                {SIZES.map((size) => {
                  const isSelected = form.size === size.id;
                  return (
                    <button
                      type="button"
                      key={size.id}
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => {
                        setForm({ ...form, size: size.id });
                        markChoice('size');
                      }}
                      className={`p-2.5 sm:p-3 rounded-[11px] text-left transition-all text-xs cursor-pointer flex items-center justify-between min-h-[48px] border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#781728] ${
                        isSelected
                          ? 'bg-[#FFF9F5] text-[#39252A] border-[#781728] shadow-2xs font-medium'
                          : 'bg-[#FFFFFF] text-[#806D71] hover:text-[#39252A] border-[#E8D8D5] hover:bg-[#FFF9F5]/50'
                      }`}
                    >
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-medium text-[#39252A]">{size.labelEn}</span>
                          <span className="text-[11px] text-[#806D71] font-sans-refined">({size.subtitleEn})</span>
                        </div>
                        <span dir="rtl" className="text-[11px] font-arabic-clean text-[#806D71] block mt-0.5">
                          {size.labelAr} · {size.subtitleAr}
                        </span>
                      </div>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-1.5 transition-colors ${
                          isSelected
                            ? 'border-[#781728] bg-[#781728] text-[#FFFFFF]'
                            : 'border-[#E8D8D5] bg-[#FFFFFF]'
                        }`}
                        aria-hidden="true"
                      >
                        {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* 3. Choose a Flavor */}
            <section className="bg-[#FFFFFF] border border-[#E8D8D5] rounded-[14px] p-4 sm:p-5 shadow-2xs">
              <div className="flex items-baseline justify-between mb-2.5">
                <label className="text-xs uppercase tracking-wider text-[#781728] font-mono font-medium">
                  Choose a Flavor
                </label>
                <span dir="rtl" className="text-xs font-arabic-clean text-[#806D71]">
                  اختر النكهة
                </span>
              </div>
              <div className="space-y-2" role="radiogroup" aria-label="Flavor Selection">
                {FLAVORS.map((flavor) => {
                  const isSelected = form.flavor === flavor.id;
                  return (
                    <button
                      type="button"
                      key={flavor.id}
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => {
                        setForm({ ...form, flavor: flavor.id });
                        markChoice('flavor');
                      }}
                      className={`w-full p-2.5 sm:p-3 rounded-[11px] text-left transition-all text-xs cursor-pointer flex items-center justify-between min-h-[44px] border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#781728] ${
                        isSelected
                          ? 'bg-[#FFF9F5] text-[#39252A] border-[#781728] shadow-2xs font-medium'
                          : 'bg-[#FFFFFF] text-[#806D71] hover:text-[#39252A] border-[#E8D8D5] hover:bg-[#FFF9F5]/50'
                      }`}
                    >
                      <div className="min-w-0 pr-2">
                        <span className="font-medium text-[#39252A] block leading-tight">{flavor.labelEn}</span>
                        <span dir="rtl" className="text-[11px] font-arabic-clean text-[#806D71] block mt-0.5">
                          {flavor.labelAr}
                        </span>
                      </div>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-1.5 transition-colors ${
                          isSelected
                            ? 'border-[#781728] bg-[#781728] text-[#FFFFFF]'
                            : 'border-[#E8D8D5] bg-[#FFFFFF]'
                        }`}
                        aria-hidden="true"
                      >
                        {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* 4. Cake Design */}
            <section className="bg-[#FFFFFF] border border-[#E8D8D5] rounded-[14px] p-4 sm:p-5 shadow-2xs">
              <div className="flex items-baseline justify-between mb-1.5">
                <label htmlFor="design-description" className="text-xs uppercase tracking-wider text-[#781728] font-mono font-medium">
                  Cake Design
                </label>
                <span dir="rtl" className="text-xs font-arabic-clean text-[#806D71]">
                  تصميم الكيك
                </span>
              </div>
              <p className="text-[11px] text-[#806D71] mb-2 font-sans-refined">
                Describe your desired look, colors, or theme.
              </p>
              <textarea
                id="design-description"
                rows={2}
                value={form.designDescription}
                onChange={(e) => {
                  setForm({ ...form, designDescription: e.target.value });
                  markChoice('designDescription');
                }}
                placeholder="e.g. White roses, gold touches, minimalist texture, or character theme..."
                className="w-full p-2.5 rounded-[10px] bg-[#FFF9F5] border border-[#E8D8D5] text-xs text-[#39252A] placeholder:text-[#806D71]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#781728] resize-none"
              />
            </section>

            {/* 5. Message on the Cake */}
            <section className="bg-[#FFFFFF] border border-[#E8D8D5] rounded-[14px] p-4 sm:p-5 shadow-2xs">
              <div className="flex items-baseline justify-between mb-1.5">
                <label htmlFor="cake-inscription" className="text-xs uppercase tracking-wider text-[#781728] font-mono font-medium">
                  Message on the Cake <span className="font-sans normal-case text-[#806D71]">(Optional)</span>
                </label>
                <span dir="rtl" className="text-xs font-arabic-clean text-[#806D71]">
                  العبارة على الكيك
                </span>
              </div>
              <input
                id="cake-inscription"
                type="text"
                value={form.inscription}
                onChange={(e) => setForm({ ...form, inscription: e.target.value })}
                placeholder="e.g. Happy Birthday Maya, Congratulations..."
                className="w-full h-10 px-3 rounded-[10px] bg-[#FFF9F5] border border-[#E8D8D5] text-xs text-[#39252A] placeholder:text-[#806D71]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#781728]"
              />
            </section>

            {/* 6. Date & Notes */}
            <section className="bg-[#FFFFFF] border border-[#E8D8D5] rounded-[14px] p-4 sm:p-5 shadow-2xs space-y-3">
              <div className="flex items-baseline justify-between mb-0.5">
                <span className="text-xs uppercase tracking-wider text-[#781728] font-mono font-medium">
                  Date & Notes <span className="font-sans normal-case text-[#806D71]">(Optional)</span>
                </span>
                <span dir="rtl" className="text-xs font-arabic-clean text-[#806D71]">
                  الموعد والملاحظات
                </span>
              </div>

              <div>
                <label htmlFor="event-date" className="block text-xs text-[#39252A] font-medium mb-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#781728]" />
                  <span>Celebration Date</span>
                </label>
                <input
                  id="event-date"
                  type="date"
                  value={form.eventDate}
                  onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
                  className="w-full h-10 px-3 rounded-[10px] bg-[#FFF9F5] border border-[#E8D8D5] text-xs text-[#39252A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#781728]"
                />
              </div>

              <div>
                <label htmlFor="additional-notes" className="block text-xs text-[#39252A] font-medium mb-1">
                  Additional Notes
                </label>
                <textarea
                  id="additional-notes"
                  rows={2}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="e.g. Delivery time, venue in Tartus, or dietary preferences..."
                  className="w-full p-2.5 rounded-[10px] bg-[#FFF9F5] border border-[#E8D8D5] text-xs text-[#39252A] placeholder:text-[#806D71]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#781728] resize-none"
                />
              </div>
            </section>

            {/* Mobile Summary & Action (Visible on mobile/tablet below form) */}
            <div className="lg:hidden pt-2">
              {renderSummaryBlock()}
            </div>
          </div>

          {/* Desktop Right Column: Sticky Summary & Action */}
          <div className="hidden lg:block lg:col-span-5 lg:sticky lg:top-20 space-y-4">
            {renderSummaryBlock()}
          </div>
        </div>
      </main>
    </div>
  );
};
