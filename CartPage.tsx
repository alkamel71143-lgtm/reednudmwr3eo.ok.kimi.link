import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus,
  MapPin,
  Truck,
  MessageCircle,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useStore();
  
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity, 
    0
  );
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  // Check if any item exceeds stock
  const stockIssues = cart.filter(item => item.quantity > item.product.stockQuantity);
  
  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('السلة فارغة');
      return;
    }
    
    if (stockIssues.length > 0) {
      toast.error('بعض المنتجات غير متوفرة بالكمية المطلوبة');
      return;
    }
    
    // Copy Kareemi account
    navigator.clipboard.writeText('3091263156');
    
    // Create order message
    const orderItems = cart.map(item => 
      `- ${item.product.name} (${item.quantity}x) = ${(item.product.price * item.quantity).toLocaleString()} ر.س`
    ).join('\n');
    
    const message = `مرحباً، أرغب في طلب المنتجات التالية:\n\n${orderItems}\n\nالإجمالي: ${totalPrice.toLocaleString()} ر.س\n\nرقم حساب الكريمي: 3091263156`;
    
    window.open(`https://wa.me/967734875002?text=${encodeURIComponent(message)}`, '_blank');
    
    toast.success('تم نسخ رقم الكريمي وفتح واتساب');
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
            <span className="text-yellow-400">سلة التسوق</span>
          </nav>
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400 text-sm font-medium">سلة مشترياتك</span>
            </div>
            <h1 className="text-4xl font-black text-white mb-2">
              سلة التسوق <span className="text-yellow-400">({totalItems})</span>
            </h1>
          </div>
          
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-32 h-32 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingCart className="w-16 h-16 text-gray-600" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">
                السلة فارغة
              </h2>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                ابدأ التسوق واكتشف منتجاتنا المميزة من الجوالات والإكسسوارات
              </p>
              <Link to="/products">
                <Button size="lg" className="gap-2 bg-yellow-500 text-black hover:bg-yellow-400 font-bold">
                  <ArrowLeft className="w-5 h-5" />
                  تصفح المنتجات
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {/* Stock Warning */}
                {stockIssues.length > 0 && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center gap-3">
                    <AlertCircle className="w-6 h-6 text-red-400" />
                    <div>
                      <p className="text-red-400 font-bold">تنبيه: كمية غير متوفرة</p>
                      <p className="text-gray-400 text-sm">بعض المنتجات غير متوفرة بالكمية المطلوبة</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <p className="text-gray-400">
                    {totalItems} منتج في السلة
                  </p>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => {
                      clearCart();
                      toast.success('تم إفراغ السلة');
                    }}
                  >
                    <Trash2 className="w-4 h-4 ml-2" />
                    إفراغ السلة
                  </Button>
                </div>
                
                {cart.map((item) => {
                  const exceedsStock = item.quantity > item.product.stockQuantity;
                  
                  return (
                    <Card key={item.product.id} className={`bg-gradient-to-br from-gray-900 to-black border-yellow-500/20 overflow-hidden ${exceedsStock ? 'border-red-500/50' : ''}`}>
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          {/* Product Image */}
                          <Link to={`/product/${item.product.id}`}>
                            <img 
                              src={item.product.image} 
                              alt={item.product.name}
                              className="w-24 h-24 object-cover rounded-lg"
                            />
                          </Link>
                          
                          {/* Product Info */}
                          <div className="flex-1 min-w-0">
                            <Link 
                              to={`/product/${item.product.id}`}
                              className="font-bold text-white hover:text-yellow-400 transition-colors line-clamp-2"
                            >
                              {item.product.name}
                            </Link>
                            <p className="text-sm text-yellow-400 mt-1">
                              {item.product.price.toLocaleString()} ر.س / وحدة
                            </p>
                            <p className={`text-sm ${item.product.stockQuantity > 0 ? 'text-green-400' : 'text-red-400'}`}>
                              متوفر: {item.product.stockQuantity} قطعة
                            </p>
                            {exceedsStock && (
                              <p className="text-sm text-red-400 font-bold">
                                الكمية المطلوبة غير متوفرة!
                              </p>
                            )}
                            
                            <div className="flex items-center justify-between mt-4">
                              {/* Quantity Controls */}
                              <div className="flex items-center border border-white/20 rounded-lg overflow-hidden">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="w-8 h-8 text-white hover:text-yellow-400 hover:bg-white/5"
                                  onClick={() => 
                                    updateQuantity(item.product.id, item.quantity - 1)
                                  }
                                >
                                  <Minus className="w-4 h-4" />
                                </Button>
                                <span className={`w-10 text-center font-bold ${exceedsStock ? 'text-red-400' : 'text-white'}`}>
                                  {item.quantity}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="w-8 h-8 text-white hover:text-yellow-400 hover:bg-white/5"
                                  onClick={() => 
                                    updateQuantity(item.product.id, item.quantity + 1)
                                  }
                                  disabled={item.quantity >= item.product.stockQuantity}
                                >
                                  <Plus className="w-4 h-4" />
                                </Button>
                              </div>
                              
                              {/* Price & Remove */}
                              <div className="flex items-center gap-4">
                                <span className="font-bold text-xl text-yellow-400">
                                  {(item.product.price * item.quantity).toLocaleString()} ر.س
                                </span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                  onClick={() => removeFromCart(item.product.id)}
                                >
                                  <Trash2 className="w-5 h-5" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
                
                <Link to="/products">
                  <Button variant="outline" className="gap-2 border-yellow-500/30 text-white hover:bg-yellow-500/10 hover:text-yellow-400">
                    <ArrowLeft className="w-4 h-4" />
                    مواصلة التسوق
                  </Button>
                </Link>
              </div>
              
              {/* Order Summary */}
              <div>
                <Card className="sticky top-24 bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">ملخص الطلب</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Coupon */}
                    <div className="flex gap-2">
                      <Input placeholder="كود الخصم" className="bg-white/5 border-white/10 text-white placeholder:text-gray-500" />
                      <Button variant="outline" className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10">تطبيق</Button>
                    </div>
                    
                    <Separator className="bg-white/10" />
                    
                    {/* Summary */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">المجموع الفرعي</span>
                        <span className="text-white">{totalPrice.toLocaleString()} ر.س</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">الشحن</span>
                        <span className="text-green-400">مجاني</span>
                      </div>
                    </div>
                    
                    <Separator className="bg-white/10" />
                    
                    <div className="flex justify-between text-xl font-bold">
                      <span className="text-white">الإجمالي</span>
                      <span className="text-yellow-400">
                        {totalPrice.toLocaleString()} <span className="text-sm">ر.س</span>
                      </span>
                    </div>
                    
                    {/* Kareemi Info */}
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                      <p className="text-sm text-gray-400 mb-1">رقم حساب الكريمي</p>
                      <p className="text-2xl font-black text-yellow-400" dir="ltr">3091263156</p>
                    </div>
                    
                    <Button 
                      className="w-full gap-2 bg-green-500 text-white hover:bg-green-400 font-bold"
                      size="lg"
                      onClick={handleCheckout}
                      disabled={stockIssues.length > 0}
                    >
                      <MessageCircle className="w-5 h-5" />
                      إتمام الطلب عبر واتساب
                    </Button>
                    
                    {/* Info */}
                    <div className="space-y-2 pt-4">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Truck className="w-4 h-4 text-yellow-400" />
                        <span>شحن مجاني للطلبات فوق 200 ر.س</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <MapPin className="w-4 h-4 text-yellow-400" />
                        <span>التوصيل خلال 1-3 أيام عمل</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
