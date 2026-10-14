export type SceneId = 'entrance' | 'collections' | 'atelier' | 'story';

export type Language = 'en' | 'ar';

export type CakeCategory = 'all' | 'wedding' | 'celebration' | 'children' | 'patisserie' | 'banquet';

export interface CollectionItem {
  id: string;
  titleEn: string;
  titleAr: string;
  category: CakeCategory;
  categoryLabelEn: string;
  categoryLabelAr: string;
  descriptionEn: string;
  descriptionAr: string;
  servings: string;
  leadTimeEn: string;
  leadTimeAr: string;
  flavorNotesEn: string[];
  flavorNotesAr: string[];
  image: string;
  shortDescriptionEn?: string;
  shortDescriptionAr?: string;
  highlight?: string;
  dimensions?: string;
}

export interface CartItem {
  product: CollectionItem;
  quantity: number;
}

export interface CustomCakeRequest {
  occasion: string;
  tiers: string;
  flavorSponge: string;
  filling: string;
  artStyle: string;
  guestCount: number;
  deliveryDate: string;
  clientName: string;
  clientPhone: string;
  city: string;
  specialRequests: string;
}
