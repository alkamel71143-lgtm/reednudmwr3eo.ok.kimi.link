import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Percent, X, ZoomIn } from 'lucide-react';
import type { Product } from '@/types';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useStore();
  const [isImageOpen, setIsImageOpen] = useState(false);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (product.stockQuantity <= 0) {
      toast.error('المنتج غير متوفر في المخزن');
      return;
    }
    
    addToCart(product);
    toast.success(`تم إضافة ${product.name} إلى السلة`);
  };
  
  const handleKareemiPayment = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (product.stockQuantity <= 0) {
      toast.error('المنتج غير متوفر في المخزن');
      return;
    }
    
    // Copy Kareemi account to clipboard
    navigator.clipboard.writeText('3091263156');
    
    // Open WhatsApp with message
    const message = `مرحباً، أرغب في شراء: ${product.name}\nالسعر: ${product.price} ر.س\nرقم حساب الكريمي: 3091263156`;
    window.open(`https://wa.me/967734875002?text=${encodeURIComponent(message)}`, '_blank');
    
    toast.success('تم نسخ رقم الكريمي وفتح واتساب');
  };
  
  const discount = product.discount || (product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0);

  const isOutOfStock = product.stockQuantity <= 0;

  return (
    <>
      <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-gray-900 to-black border border-yellow-500/20 hover:border-yellow-500/50">
        <Link to={`/product/${product.id}`}>
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-gray-800">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {discount > 0 && (
                <Badge className="bg-red-500 text-white font-bold flex items-center gap-1">
                  <Percent className="w-3 h-3" />
                  خصم {discount}%
                </Badge>
              )}
              {product.featured && (
                <Badge className="bg-yellow-500 text-black font-bold">
                  مميز
                </Badge>
              )}
              {isOutOfStock && (
                <Badge variant="secondary" className="bg-gray-700 text-gray-300 font-bold">
                  غير متوفر
                </Badge>
              )}
            </div>
            
            {/* Quick Actions */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button 
                variant="secondary" 
                size="icon" 
                className="w-9 h-9 rounded-full shadow-lg bg-white/90 hover:bg-yellow-400"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsImageOpen(true);
                }}
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button 
                variant="secondary" 
                size="icon" 
                className="w-9 h-9 rounded-full shadow-lg bg-white/90 hover:bg-yellow-400"
              >
                <Heart className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Add to Cart Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 space-y-2">
              <Button 
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="w-full gap-2 shadow-lg bg-yellow-500 text-black hover:bg-yellow-400 font-bold"
                size="sm"
              >
                <ShoppingCart className="w-4 h-4" />
                إضافة للسلة
              </Button>
              <Button 
                onClick={handleKareemiPayment}
                disabled={isOutOfStock}
                variant="secondary"
                className="w-full gap-2 shadow-lg bg-white/90 text-black hover:bg-yellow-400 font-bold"
                size="sm"
              >
                شراء عبر الكريمي
              </Button>
            </div>
          </div>
          
          {/* Content */}
          <CardContent className="p-4">
            <div className="space-y-2">
              {/* Stock Info */}
              <div className="flex items-center justify-between">
                <p className="text-xs text-yellow-500/70">
                  {isOutOfStock ? 'نفذت الكمية' : `متوفر: ${product.stockQuantity} قطعة`}
                </p>
              </div>
              
              {/* Name */}
              <h3 className="font-bold text-white line-clamp-2 group-hover:text-yellow-400 transition-colors">
                {product.name}
              </h3>
              
              {/* Price */}
              <div className="flex items-center gap-2">
                <span className="text-xl font-black text-yellow-400">
                  {product.price.toLocaleString()} <span className="text-sm">ر.س</span>
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    {product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Link>
      </Card>

      {/* Image Modal */}
      <Dialog open={isImageOpen} onOpenChange={setIsImageOpen}>
        <DialogContent className="max-w-4xl bg-black/95 border-yellow-500/30 p-0 overflow-hidden">
          <button
            onClick={() => setIsImageOpen(false)}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-yellow-500 hover:text-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="relative aspect-square md:aspect-auto md:h-[80vh]">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
            <h3 className="text-2xl font-bold text-white mb-2">{product.name}</h3>
            <p className="text-xl text-yellow-400 font-black">
              {product.price.toLocaleString()} ر.س
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
