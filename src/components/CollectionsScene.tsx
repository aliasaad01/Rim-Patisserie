import React, { useState } from 'react';
import { SceneId, CollectionItem } from '../types';
import { COLLECTIONS_DATA } from '../data/patisserieData';
import { Plus, Check } from 'lucide-react';

interface CollectionsSceneProps {
  onNavigate: (scene: SceneId) => void;
  onAddToCart: (item: CollectionItem) => void;
}

type FilterKey = 'all' | 'cakes' | 'wedding' | 'birthday' | 'pastries' | 'dessert-tables';

interface FilterCategory {
  id: FilterKey;
  label: string;
  filter: (item: CollectionItem) => boolean;
}

const FILTER_CATEGORIES: FilterCategory[] = [
  { id: 'all', label: 'All', filter: () => true },
  { id: 'cakes', label: 'Cakes', filter: (i) => i.category === 'wedding' || i.category === 'celebration' },
  { id: 'wedding', label: 'Wedding', filter: (i) => i.category === 'wedding' },
  { id: 'birthday', label: 'Birthday', filter: (i) => i.category === 'celebration' },
  { id: 'pastries', label: 'Pastries', filter: (i) => i.category === 'patisserie' },
  { id: 'dessert-tables', label: 'Dessert Tables', filter: (i) => i.category === 'banquet' },
];

export const CollectionsScene: React.FC<CollectionsSceneProps> = ({
  onNavigate,
  onAddToCart,
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const currentCategoryObj = FILTER_CATEGORIES.find((cat) => cat.id === activeFilter) || FILTER_CATEGORIES[0];
  const filteredItems = COLLECTIONS_DATA.filter(currentCategoryObj.filter);

  const handleAddToCartClick = (item: CollectionItem) => {
    onAddToCart(item);
    setJustAddedId(item.id);
    setTimeout(() => {
      setJustAddedId((curr) => (curr === item.id ? null : curr));
    }, 1200);
  };

  return (
    <div className="relative min-h-[100dvh] w-full pt-2 sm:pt-4 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col justify-start bg-[#FFF9F5] text-[#39252A]">
      {/* Compact, Clean Header aligned with content grid */}
      <header className="max-w-5xl mx-auto w-full mb-3 sm:mb-4 md:mb-5">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5 sm:gap-3 pb-2 sm:pb-2.5 border-b border-[#E8D8D5]">
          <div>
            <h1 className="font-serif-luxury text-2xl sm:text-3xl text-[#39252A] font-normal leading-tight tracking-tight">
              Our Collections
            </h1>
            <p className="mt-0.5 text-xs text-[#806D71] font-sans-refined leading-normal line-clamp-2 max-w-md">
              Artisanal cakes and fine pâtisserie crafted in Tartus since 2003.
            </p>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 self-start sm:self-auto shrink-0">
            <button
              onClick={() => onNavigate('story')}
              className="text-xs text-[#806D71] hover:text-[#781728] font-medium transition-colors cursor-pointer hover:underline py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#781728]"
            >
              Our Story
            </button>
            <span className="text-[#E8D8D5] text-xs" aria-hidden="true">·</span>
            <button
              onClick={() => onNavigate('atelier')}
              className="text-xs text-[#781728] hover:text-[#4F0715] font-medium transition-colors cursor-pointer hover:underline py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#781728]"
            >
              Custom Cake Order →
            </button>
          </div>
        </div>

        {/* Minimal Horizontal Text-Based Filter */}
        <nav 
          aria-label="Product categories" 
          className="w-full overflow-x-auto no-scrollbar flex items-center gap-4.5 sm:gap-6 pt-2 pb-0.5 text-xs sm:text-sm scroll-smooth pr-4 sm:pr-0"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {FILTER_CATEGORIES.map((cat) => {
            const isActive = activeFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`relative shrink-0 pb-1 sm:pb-1.5 transition-colors cursor-pointer text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#781728] ${
                  isActive
                    ? 'text-[#781728] font-medium'
                    : 'text-[#806D71] hover:text-[#39252A]'
                }`}
                aria-current={isActive ? 'true' : undefined}
              >
                <span className="whitespace-nowrap">{cat.label}</span>
                {isActive && (
                  <span 
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#781728] rounded-full" 
                    aria-hidden="true" 
                  />
                )}
              </button>
            );
          })}
          {/* Trailing space on mobile so last category is never pressed or clipped */}
          <span className="shrink-0 w-3 sm:hidden" aria-hidden="true" />
        </nav>
      </header>

      {/* Main Content: Compact Card Grid */}
      <main className="max-w-5xl mx-auto w-full">
        {filteredItems.length === 0 ? (
          <div className="w-full py-12 px-6 text-center bg-[#FFFFFF] border border-[#E8D8D5] rounded-[14px]">
            <h2 className="font-serif-luxury text-lg text-[#39252A]">No creations in this category</h2>
            <p className="text-xs text-[#806D71] mt-1">
              Explore our full portfolio or request a custom design in the atelier.
            </p>
            <button
              onClick={() => setActiveFilter('all')}
              className="mt-3 px-3 py-1.5 rounded-[10px] bg-[#FFF9F5] border border-[#E8D8D5] text-[#39252A] text-xs font-medium cursor-pointer hover:bg-[#F5ECE8]"
            >
              View All
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {filteredItems.map((item) => {
              const isAdded = justAddedId === item.id;
              return (
                <article
                  key={item.id}
                  className="group flex flex-col justify-between text-left rounded-[14px] bg-[#FFFFFF] p-2.5 sm:p-3 border border-[#E8D8D5] shadow-[0_2px_8px_rgba(57,37,42,0.04)] hover:shadow-[0_4px_14px_rgba(57,37,42,0.07)] hover:-translate-y-[1.5px] transition-all duration-300 ease-out motion-reduce:hover:translate-y-0 motion-reduce:transition-none"
                >
                  <div>
                    {/* Product Image: Restrained radius, compact 16:10 on mobile, 4:3 on tablet/desktop */}
                    <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden rounded-[10px] bg-[#E8D8D5]/20 border border-[#E8D8D5]/60">
                      <img
                        src={item.image}
                        alt={item.titleEn}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.style.display = 'none';
                        }}
                      />
                    </div>

                    {/* Text Hierarchy: Title, Arabic subtitle, and Short Description */}
                    <div className="pt-2 sm:pt-2.5">
                      <div className="flex items-baseline justify-between gap-2">
                        <h2 className="font-serif-luxury text-base sm:text-lg text-[#39252A] leading-tight font-normal">
                          {item.titleEn}
                        </h2>
                        <span dir="rtl" className="text-xs font-arabic-clean text-[#806D71] shrink-0">
                          {item.titleAr}
                        </span>
                      </div>

                      {item.shortDescriptionEn && (
                        <p className="mt-0.5 sm:mt-1 text-xs text-[#806D71] font-sans-refined leading-snug sm:leading-relaxed line-clamp-2">
                          {item.shortDescriptionEn}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Restyled Compact Add to Cart Action */}
                  <div className="pt-2 sm:pt-2.5 mt-auto">
                    <button
                      type="button"
                      onClick={() => handleAddToCartClick(item)}
                      className={`w-full h-11 px-3 rounded-[11px] text-xs font-medium flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer active:scale-[0.98] border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#781728] ${
                        isAdded
                          ? 'bg-[#E1B3C3] text-[#4F0715] border-[#AD5B67]/50'
                          : 'bg-[#EFD4C4] hover:bg-[#E8C7B2] text-[#781728] hover:text-[#4F0715] border-[#E8D8D5] hover:border-[#AD5B67]/60'
                      }`}
                      aria-label={`Add ${item.titleEn} to cart`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#4F0715]" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5 text-[#781728]" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};
