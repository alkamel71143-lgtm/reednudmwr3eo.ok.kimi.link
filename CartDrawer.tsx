import { Link } from 'react-router-dom';
import { Plus, Minus, ShoppingBag, Trash2, ArrowLeft } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

export function CartDrawer() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useStore();
  
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity, 
    0
  );
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('السلة فارغة');
      return;
    }
    // In a real app, this would navigate to checkout
    toast.info('قريباً - صفحة الدفع');
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingBag className="w-5 h-5" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            سلة التسوق
            {totalItems > 0 && (
              <span className="text-sm font-normal text-gray-500">
                ({totalItems} منتج)
              </span>
            )}
          </SheetTitle>
        </SheetHeader>
        
        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              السلة فارغة
            </h3>
            <p className="text-gray-500 mb-6">
              ابدأ التسوق واكتشف منتجاتنا المميزة
            </p>
            <SheetTrigger asChild>
              <Link to="/products">
                <Button className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  تصفح المنتجات
                </Button>
              </Link>
            </SheetTrigger>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4 py-4">
                {cart.map((item) => (
                  <div 
                    key={item.product.id}
                    className="flex gap-4 bg-gray-50 p-4 rounded-xl"
                  >
                    {/* Product Image */}
                    <img 
                      src={item.product.image} 
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    
                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 line-clamp-2 mb-1">
                        {item.product.name}
                      </h4>
                      <p className="text-blue-600 font-bold mb-2">
                        {item.product.price.toLocaleString()} ر.س
                      </p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="w-7 h-7"
                            onClick={() => 
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="w-7 h-7"
                            onClick={() => 
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => removeFromCart(item.product.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="border-t pt-4 space-y-4">
              {/* Summary */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">المجموع الفرعي</span>
                  <span>{totalPrice.toLocaleString()} ر.س</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">الشحن</span>
                  <span className="text-green-600">مجاني</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>الإجمالي</span>
                  <span className="text-blue-600">{totalPrice.toLocaleString()} ر.س</span>
                </div>
              </div>
              
              {/* Actions */}
              <div className="space-y-2">
                <Button 
                  className="w-full gap-2"
                  size="lg"
                  onClick={handleCheckout}
                >
                  إتمام الطلب
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <div className="flex gap-2">
                  <SheetTrigger asChild className="flex-1">
                    <Link to="/cart">
                      <Button variant="outline" className="w-full">
                        عرض السلة
                      </Button>
                    </Link>
                  </SheetTrigger>
                  <Button 
                    variant="destructive" 
                    size="icon"
                    onClick={() => {
                      clearCart();
                      toast.success('تم إفراغ السلة');
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
