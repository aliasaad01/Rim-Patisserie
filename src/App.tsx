import React, { useState, useEffect } from 'react';
import { SceneId, CollectionItem, CartItem } from './types';
import { CinematicHud } from './components/CinematicHud';
import { EntranceScene } from './components/EntranceScene';
import { CollectionsScene } from './components/CollectionsScene';
import { AtelierScene } from './components/AtelierScene';
import { StoryScene } from './components/StoryScene';
import { CartDrawer } from './components/CartDrawer';

export default function App() {
  const [currentScene, setCurrentScene] = useState<SceneId>('entrance');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<'forward' | 'backward'>('forward');
  const [prefilledItem, setPrefilledItem] = useState<CollectionItem | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  // Cart state consistent across scenes & categories
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartNotes, setCartNotes] = useState('');

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const sceneOrder: SceneId[] = ['entrance', 'collections', 'atelier', 'story'];

  const handleNavigate = (targetScene: SceneId) => {
    if (targetScene === currentScene || isTransitioning) return;

    const currentIndex = sceneOrder.indexOf(currentScene);
    const targetIndex = sceneOrder.indexOf(targetScene);
    setTransitionDirection(targetIndex >= currentIndex ? 'forward' : 'backward');
    setIsTransitioning(true);

    // Reset scroll position on navigation
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Restrained camera transition timing
    const duration = reduceMotion ? 150 : 380;
    setTimeout(() => {
      setCurrentScene(targetScene);
      setIsTransitioning(false);
    }, duration);
  };

  const handleSelectForAtelier = (item: CollectionItem) => {
    setPrefilledItem(item);
    handleNavigate('atelier');
  };

  // Cart Handlers
  const handleAddToCart = (product: CollectionItem) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Restrained camera transition style
  const getCameraStyle = (): React.CSSProperties => {
    if (reduceMotion) {
      return {
        opacity: isTransitioning ? 0 : 1,
        transition: 'opacity 150ms ease-out',
      };
    }

    if (isTransitioning) {
      return {
        transform: transitionDirection === 'forward' 
          ? 'scale(0.97) translateY(8px)' 
          : 'scale(1.02) translateY(-8px)',
        opacity: 0,
        filter: 'blur(2px)',
        transition: 'all 380ms cubic-bezier(0.16, 1, 0.3, 1)',
      };
    }

    return {
      transform: 'scale(1) translateY(0)',
      opacity: 1,
      filter: 'blur(0px)',
      transition: 'all 420ms cubic-bezier(0.16, 1, 0.3, 1)',
    };
  };

  return (
    // NOTE: `overflow-x-hidden` is intentionally omitted on this root wrapper —
    // it would compute `overflow-y` to `auto`, creating a non-scrolling scroll
    // container that breaks the sticky CinematicHud navbar. Horizontal overflow
    // is still clipped at the viewport level via `body { overflow-x: hidden }`
    // (src/index.css and index.html).
    <div className="relative min-h-[100dvh] bg-[#FFF9F5] text-[#39252A] flex flex-col font-sans-refined selection:bg-[#781728]/15">
      {/* Subtle Warm Ambient Canvas Backdrop */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div 
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full blur-[140px] opacity-20"
          style={{ background: 'radial-gradient(circle, #E1B3C3 0%, transparent 70%)' }}
        />
        <div 
          className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full blur-[140px] opacity-25"
          style={{ background: 'radial-gradient(circle, #EFD4C4 0%, transparent 70%)' }}
        />
      </div>

      {/* Internal Minimal Header (renders only on non-entrance scenes) */}
      <CinematicHud
        currentScene={currentScene}
        onNavigate={handleNavigate}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={totalCartCount}
      />

      {/* Camera Scene Container */}
      <main 
        className="relative z-10 flex-1 w-full"
        style={getCameraStyle()}
      >
        {currentScene === 'entrance' && (
          <EntranceScene onNavigate={handleNavigate} />
        )}

        {currentScene === 'collections' && (
          <CollectionsScene
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
          />
        )}

        {currentScene === 'atelier' && (
          <AtelierScene
            onNavigate={handleNavigate}
            prefillItem={prefilledItem}
          />
        )}

        {currentScene === 'story' && (
          <StoryScene onNavigate={handleNavigate} />
        )}
      </main>

      {/* Global Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        notes={cartNotes}
        onNotesChange={setCartNotes}
      />
    </div>
  );
}
