import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Truck, 
  Shield, 
  RotateCcw,
  Minus,
  Plus,
  MessageCircle,
  Percent,
  Sparkles,
  ZoomIn,
  X
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, categories, addToCart } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);
  
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-black">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">
              المنتج غير موجود
            </h1>
            <Button onClick={() => navigate('/products')} className="bg-yellow-500 text-black hover:bg-yellow-400">
              العودة للمنتجات
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  
  const discount = product.discount || (product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0);
  
  const isOutOfStock = product.stockQuantity <= 0;
  
  const handleAddToCart = () => {
    if (isOutOfStock) {
      toast.error('المنتج غير متوفر في المخزن');
      return;
    }
    
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`تم إضافة ${quantity} × ${product.name} إلى السلة`);
  };
  
  const handleKareemiPayment = () => {
    if (isOutOfStock) {
      toast.error('المنتج غير متوفر في المخزن');
      return;
    }
    
    navigator.clipboard.writeText('3091263156');
    const message = `مرحباً، أرغب في شراء: ${product.name}\nالكمية: ${quantity}\nالسعر: ${(product.price * quantity).toLocaleString()} ر.س\nرقم حساب الكريمي: 3091263156`;
    window.open(`https://wa.me/967734875002?text=${encodeURIComponent(message)}`, '_blank');
    toast.success('تم نسخ رقم الكريمي وفتح واتساب');
  };
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch {
        // User cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('تم نسخ الرابط');
    }
  };

  const getCategoryName = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.name || categoryId;
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 pt-24">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link to="/" className="hover:text-yellow-400 transition-colors">الرئيسية</Link>
            <ArrowLeft className="w-4 h-4" />
            <Link to="/products" className="hover:text-yellow-400 transition-colors">المنتجات</Link>
            <ArrowLeft className="w-4 h-4" />
            <span className="text-yellow-400">{product.name}</span>
          </nav>
          
          {/* Product Details */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Image */}
            <div className="space-y-4">
              <div 
                className="aspect-square bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border border-yellow-500/20 cursor-pointer group relative"
                onClick={() => setIsImageOpen(true)}
              >
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ZoomIn className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
            
            {/* Info */}
            <div className="space-y-6">
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {discount > 0 && (
                  <Badge className="bg-red-500 text-white font-bold flex items-center gap-1">
                    <Percent className="w-3 h-3" />
                    خصم {discount}%
                  </Badge>
                )}
                {product.featured && (
                  <Badge className="bg-yellow-500 text-black font-bold">
                    <Sparkles className="w-3 h-3 ml-1" />
                    مميز
                  </Badge>
                )}
                <Badge variant="secondary" className="bg-gray-800 text-gray-300">
                  {getCategoryName(product.category)}
                </Badge>
              </div>
              
              {/* Title */}
              <div>
                <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
                  {product.name}
                </h1>
                <p className="text-gray-400 leading-relaxed">
                  {product.description}
                </p>
              </div>
              
              {/* Stock Info */}
              <div className="flex items-center gap-4">
                <span className={`font-bold ${isOutOfStock ? 'text-red-400' : 'text-green-400'}`}>
                  {isOutOfStock ? 'نفذت الكمية' : `متوفر: ${product.stockQuantity} قطعة`}
                </span>
              </div>
              
              {/* Price */}
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-black text-yellow-400">
                  {product.price.toLocaleString()} <span className="text-xl">ر.س</span>
                </span>
                {product.originalPrice && (
                  <span className="text-2xl text-gray-500 line-through">
                    {product.originalPrice.toLocaleString()} ر.س
                  </span>
                )}
              </div>
              
              <Separator className="bg-white/10" />
              
              {/* Quantity & Add to Cart */}
              <div className="space-y-4">
                {/* Quantity */}
                <div className="flex items-center gap-4">
                  <span className="text-white font-bold">الكمية:</span>
                  <div className="flex items-center border border-white/20 rounded-lg overflow-hidden">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="text-white hover:text-yellow-400 hover:bg-white/5"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-12 text-center font-bold text-white">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                      className="text-white hover:text-yellow-400 hover:bg-white/5"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    size="lg"
                    className="flex-1 gap-2 bg-yellow-500 text-black hover:bg-yellow-400 font-bold"
                    onClick={handleAddToCart}
                    disabled={isOutOfStock}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    إضافة للسلة
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline"
                    className="flex-1 gap-2 border-green-500 text-green-400 hover:bg-green-500 hover:text-white font-bold"
                    onClick={handleKareemiPayment}
                    disabled={isOutOfStock}
                  >
                    <MessageCircle className="w-5 h-5" />
                    شراء عبر الكريمي
                  </Button>
                </div>
                
                {/* Secondary Actions */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="lg"
                    className={`flex-1 gap-2 border-white/20 ${isWishlisted ? 'text-red-400 border-red-400' : 'text-white hover:text-yellow-400'}`}
                    onClick={() => setIsWishlisted(!isWishlisted)}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                    {isWishlisted ? 'تم الإضافة' : 'المفضلة'}
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1 gap-2 border-white/20 text-white hover:text-yellow-400"
                    onClick={handleShare}
                  >
                    <Share2 className="w-5 h-5" />
                    مشاركة
                  </Button>
                </div>
              </div>
              
              {/* Features */}
              <div className="grid grid-cols-3 gap-4">
                <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20 p-4 text-center">
                  <Truck className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                  <p className="text-sm font-bold text-white">شحن مجاني</p>
                  <p className="text-xs text-gray-500">للطلبات فوق 200 ر.س</p>
                </Card>
                <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20 p-4 text-center">
                  <Shield className="w-8 h-8 mx-auto mb-2 text-green-400" />
                  <p className="text-sm font-bold text-white">ضمان شامل</p>
                  <p className="text-xs text-gray-500">سنة كاملة</p>
                </Card>
                <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20 p-4 text-center">
                  <RotateCcw className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                  <p className="text-sm font-bold text-white">إرجاع سهل</p>
                  <p className="text-xs text-gray-500">خلال 14 يوم</p>
                </Card>
              </div>
            </div>
          </div>
          
          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <h2 className="text-2xl font-black text-white">
                  منتجات <span className="text-yellow-400">مشابهة</span>
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />

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
    </div>
  );
}
