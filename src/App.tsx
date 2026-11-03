import React, { useState, useEffect, useCallback } from 'react';
import { SceneId, CollectionItem, CartItem } from './types';
import { CinematicHud } from './components/CinematicHud';
import { EntranceScene } from './components/EntranceScene';
import { CartDrawer } from './components/CartDrawer';

// Internal scenes are code-split so the Entrance scene (critical first paint +
// official logo) only downloads its own code. The chunks are warmed during
// idle time after mount, so scene switches never wait on the network.
// A factory is used (instead of module-level consts) so a failed chunk load
// can be retried: React.lazy caches a rejected import permanently, so retry
// must recreate the lazy components.
const createSceneLoaders = () => ({
  collections: React.lazy(() =>
    import('./components/CollectionsScene').then((m) => ({ default: m.CollectionsScene }))
  ),
  atelier: React.lazy(() =>
    import('./components/AtelierScene').then((m) => ({ default: m.AtelierScene }))
  ),
  story: React.lazy(() =>
    import('./components/StoryScene').then((m) => ({ default: m.StoryScene }))
  ),
});

/** Restrained loading state matching the site's visual language. */
const SceneFallback: React.FC = () => (
  <div className="flex items-center justify-center py-24 animate-fade-in" role="status">
    <span className="text-xs tracking-wide text-[#806D71] font-sans-refined">Loading…</span>
  </div>
);

/**
 * Recovers from a failed scene chunk load (e.g. a dropped mobile connection)
 * with a styled retry instead of React's default behavior — unmounting the
 * entire root into a permanent blank screen. Retry recreates the lazy scene
 * components (React.lazy caches rejections) while App state stays intact.
 */
class SceneErrorBoundary extends React.Component<
  { onRetry: () => void; children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="flex flex-col items-center justify-center py-24 px-6 text-center animate-fade-in"
          role="alert"
        >
          <h2 className="font-serif-luxury text-xl text-[#39252A] font-normal">
            This page couldn’t load
          </h2>
          <p className="mt-1.5 text-xs text-[#806D71] font-sans-refined max-w-xs leading-relaxed">
            A temporary connection issue interrupted loading. Your cart is still saved.
          </p>
          <button
            onClick={this.props.onRetry}
            className="mt-4 px-4 py-2 rounded-[10px] bg-[#781728] hover:bg-[#4F0715] text-[#FFFFFF] text-xs font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#781728]"
          >
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [currentScene, setCurrentScene] = useState<SceneId>('entrance');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<'forward' | 'backward'>('forward');
  // Atelier prefill contract: always null today because no collection card
  // exposes a "design this" entry point (the previous handler was dead code).
  // The state and prop wiring are kept so AtelierScene's reference UI and
  // WhatsApp prefill stay ready for a future entry point without a rewrite.
  const [prefilledItem] = useState<CollectionItem | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  // Lazy scene components + a remount key for the error boundary, so a failed
  // chunk can be retried without losing any App state (cart, notes, etc.).
  const [sceneLoaders, setSceneLoaders] = useState(createSceneLoaders);
  const [sceneBoundaryKey, setSceneBoundaryKey] = useState(0);

  // Global cart state shared across scenes & categories
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  // Stable callbacks so that CartDrawer's effect (which controls the notes
  // textarea focus) is not re-run on every cart interaction. Any inline arrow
  // here would create a fresh identity on each render and make the drawer
  // re-apply its focus logic while the customer is typing.
  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Warm the code-split scene chunks during idle time so switching scenes
  // never shows the loading fallback (or waits on the network) in practice.
  useEffect(() => {
    const warmSceneChunks = () => {
      void import('./components/CollectionsScene');
      void import('./components/AtelierScene');
      void import('./components/StoryScene');
    };
    type IdleCapableWindow = Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (handle: number) => void;
    };
    const idleWindow = window as IdleCapableWindow;
    if (typeof idleWindow.requestIdleCallback === 'function') {
      const handle = idleWindow.requestIdleCallback(warmSceneChunks, { timeout: 4000 });
      return () => idleWindow.cancelIdleCallback?.(handle);
    }
    const timer = window.setTimeout(warmSceneChunks, 2000);
    return () => window.clearTimeout(timer);
  }, []);

  // Retry after a failed scene chunk: recreate the lazy components (React.lazy
  // caches rejections) and remount the boundary. App state is fully preserved.
  const handleSceneLoadRetry = () => {
    setSceneLoaders(createSceneLoaders());
    setSceneBoundaryKey((key) => key + 1);
  };

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

    // No identity transform/filter at rest: a permanent `filter: blur(0)` /
    // `transform` on <main> forces a full-page render surface for the whole
    // document. Animations still interpolate to/from this resting style via
    // the transition below.
    return {
      opacity: 1,
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
        {/* Smaller + lighter blur on narrow screens (cheaper paint on mobile);
            original size/blur restored from sm up to preserve the art direction. */}
        <div 
          className="absolute -top-32 -left-32 w-[340px] h-[340px] sm:w-[600px] sm:h-[600px] rounded-full blur-[90px] sm:blur-[140px] opacity-20"
          style={{ background: 'radial-gradient(circle, #E1B3C3 0%, transparent 70%)' }}
        />
        <div 
          className="absolute -bottom-32 -right-32 w-[340px] h-[340px] sm:w-[600px] sm:h-[600px] rounded-full blur-[90px] sm:blur-[140px] opacity-25"
          style={{ background: 'radial-gradient(circle, #EFD4C4 0%, transparent 70%)' }}
        />
      </div>

      {/* Internal Minimal Header (renders only on non-entrance scenes) */}
      <CinematicHud
        currentScene={currentScene}
        onNavigate={handleNavigate}
        onOpenCart={openCart}
        cartCount={totalCartCount}
      />

      {/* Camera Scene Container */}
      <main 
        className="relative z-10 flex-1 w-full"
        style={getCameraStyle()}
      >
        <SceneErrorBoundary key={sceneBoundaryKey} onRetry={handleSceneLoadRetry}>
          <React.Suspense fallback={<SceneFallback />}>
            {currentScene === 'entrance' && (
              <EntranceScene onNavigate={handleNavigate} />
            )}

            {currentScene === 'collections' && (
              <sceneLoaders.collections
                onNavigate={handleNavigate}
                onAddToCart={handleAddToCart}
              />
            )}

            {currentScene === 'atelier' && (
              <sceneLoaders.atelier
                onNavigate={handleNavigate}
                prefillItem={prefilledItem}
              />
            )}

            {currentScene === 'story' && (
              <sceneLoaders.story onNavigate={handleNavigate} />
            )}
          </React.Suspense>
        </SceneErrorBoundary>
      </main>

      {/* Global Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={closeCart}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
}
