import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { ProductCard } from './ProductCard';
import { Button } from '@/components/ui/button';

export function FeaturedProducts() {
  const { products } = useStore();
  const featuredProducts = products.filter(p => p.featured).slice(0, 8);
  
  if (featuredProducts.length === 0) return null;

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900 relative">
      {/* Decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent" />
      
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400 text-sm font-medium">منتجات مختارة</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-2">
              منتجات <span className="text-yellow-400">مميزة</span>
            </h2>
            <p className="text-gray-400 text-lg">
              اكتشف أفضل المنتجات المختارة لك بعناية
            </p>
          </div>
          <Link to="/products">
            <Button 
              variant="outline" 
              className="gap-2 border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black font-bold"
            >
              عرض جميع المنتجات
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
