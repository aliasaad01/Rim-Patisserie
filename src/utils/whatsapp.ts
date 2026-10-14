import { CartItem } from '../types';

/**
 * Centralized WhatsApp message generation for Rim Patisserie.
 *
 * Every prefilled message is written in natural, customer-facing Arabic and is
 * encoded exactly once for the wa.me URL. Components must never build wa.me
 * URLs or Arabic message strings themselves — call these helpers instead.
 */

/**
 * WhatsApp destination in international format without "+".
 * Same number as BRAND_INFO.phoneIntl (+963985155115).
 */
export const WHATSAPP_NUMBER = '963985155115';

/** Build a wa.me link with the message encoded exactly once (no double encoding). */
export const buildWhatsAppUrl = (message: string): string =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message.trim())}`;

/**
 * Short greeting for contact-only actions (navbar, entrance social rail, story).
 * Opens the conversation naturally — never implies an order was placed.
 */
export const GENERAL_GREETING_MESSAGE = [
  'السلام عليكم، يعطيكم العافية.',
  '',
  'حابب استفسر عن الحلويات و تفاصيل الطلبات المتاحة.',
  '',
  'شكراً إلكن.',
].join('\n');

/** General contact URL — used by every generic WhatsApp action. */
export const buildGeneralWhatsAppUrl = (): string =>
  buildWhatsAppUrl(GENERAL_GREETING_MESSAGE);

/**
 * Cart order inquiry in Arabic: every cart item with its actual quantity,
 * plus customer notes only when provided. Never includes prices, totals,
 * delivery charges, or availability claims — those are confirmed in chat.
 * Product names use the existing Arabic name; items without one fall back to
 * their existing customer-facing name (no invented translations).
 */
export const buildCartOrderMessage = (items: CartItem[], notes: string): string => {
  const itemLines = items.map((item) => {
    const name = item.product.titleAr?.trim() || item.product.titleEn.trim();
    return `• ${name} — الكمية: ${item.quantity}`;
  });

  const lines: string[] = [
    'مرحبا، يعطيكم العافية.',
    '',
    'حابب استفسر عن طلبي التالي:',
    '',
    ...itemLines,
  ];

  const trimmedNotes = notes.trim();
  if (trimmedNotes) {
    lines.push('', `ملاحظات إضافية: ${trimmedNotes}`);
  }

  lines.push('', 'يرجى تأكيد الأسعار والتوفر والتفاصيل قبل اعتماد الطلب.', '', 'شكراً إلكن.');

  return lines.join('\n');
};

/**
 * wa.me URL for the cart order, or `null` when the cart is empty —
 * an empty cart must never generate an order message.
 */
export const buildCartOrderUrl = (items: CartItem[], notes: string): string | null => {
  if (items.length === 0) return null;
  return buildWhatsAppUrl(buildCartOrderMessage(items, notes));
};

/** Customer-facing Atelier (custom cake) request details. */
export interface AtelierRequestDetails {
  /** Explicitly chosen occasion (Arabic label). Preselected defaults are intentionally not passed. */
  occasionLabelAr?: string;
  /** Explicitly chosen size (Arabic label and servings). */
  sizeLabelAr?: string;
  /** Explicitly chosen flavor (Arabic label). */
  flavorLabelAr?: string;
  /** Free-text design description, only when the customer entered or edited it. */
  designDescription?: string;
  /** Free-text inscription on the cake. */
  inscription?: string;
  /** Requested date as entered (yyyy-mm-dd from the date input). */
  eventDate?: string;
  /** Optional customer notes. */
  notes?: string;
}

/**
 * Custom cake inquiry in Arabic using only the customer's selected and entered
 * values. Empty optional fields are omitted entirely (no empty labels or lines).
 * Framed as an inquiry — never as a confirmed booking.
 */
export const buildAtelierRequestMessage = (details: AtelierRequestDetails): string => {
  const lines: string[] = [
    'مرحبا، يعطيكم العافية.',
    '',
    'حابب استفسر عن تنفيذ كيكة حسب التفاصيل التالية:',
  ];

  const detailLines: string[] = [];
  const addField = (label: string, value?: string) => {
    const trimmed = value?.trim();
    if (trimmed) {
      detailLines.push(`${label}: ${trimmed}`);
    }
  };

  addField('المناسبة', details.occasionLabelAr);
  addField('الحجم أو عدد الطبقات', details.sizeLabelAr);
  addField('النكهة', details.flavorLabelAr);
  addField('التصميم', details.designDescription);
  addField('العبارة على الكيكة', details.inscription);
  addField('التاريخ المطلوب', details.eventDate);

  if (detailLines.length > 0) {
    lines.push('', ...detailLines);
  }

  const trimmedNotes = details.notes?.trim();
  if (trimmedNotes) {
    lines.push('', `ملاحظات إضافية: ${trimmedNotes}`);
  }

  lines.push('', 'يرجى إعلامي بإمكانية التنفيذ والتكلفة المناسبة.', '', 'شكراً إلكن.');

  return lines.join('\n');
};

/** wa.me URL for the Atelier request (always generated — greeting alone is valid). */
export const buildAtelierRequestUrl = (details: AtelierRequestDetails): string =>
  buildWhatsAppUrl(buildAtelierRequestMessage(details));
