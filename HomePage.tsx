import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  MessageCircle, 
  Shield, 
  Truck, 
  Headphones,
  Sparkles,
  Star,
  Zap
} from 'lucide-react';
import { Hero } from '@/components/Hero';
import { CategorySection } from '@/components/CategorySection';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';

export function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <main className="flex-1">
        <Hero />
        <CategorySection />
        <FeaturedProducts />
        
        {/* Features Section */}
        <section className="py-20 bg-gradient-to-b from-gray-900 to-black relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent" />
          
          <div className="container mx-auto px-4">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 px-4 py-2 rounded-full mb-4">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-400 text-sm font-medium">لماذا تاتشي فون؟</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                مميزات <span className="text-yellow-400">متجرنا</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                نقدم لك أفضل تجربة تسوق مع ضمان الجودة والسعر المناسب
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/20 rounded-2xl p-6 text-center hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-yellow-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-yellow-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">منتجات أصلية</h3>
                <p className="text-gray-400 text-sm">جميع منتجاتنا أصلية 100% مع ضمان شامل</p>
              </div>
              
              <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/20 rounded-2xl p-6 text-center hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">أسعار مميزة</h3>
                <p className="text-gray-400 text-sm">أفضل الأسعار في السوق مع عروض مستمرة</p>
              </div>
              
              <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/20 rounded-2xl p-6 text-center hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">توصيل سريع</h3>
                <p className="text-gray-400 text-sm">توصيل سريع لجميع مناطق تعز</p>
              </div>
              
              <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/20 rounded-2xl p-6 text-center hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Headphones className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">دعم فني</h3>
                <p className="text-gray-400 text-sm">دعم فني على مدار الساعة لمساعدتك</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Kareemi Payment Section */}
        <section className="py-20 bg-gradient-to-b from-black to-gray-900 relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent" />
          
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/30 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
              
              <div className="relative">
                <div className="inline-flex items-center gap-2 bg-yellow-500/20 px-4 py-2 rounded-full mb-6">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <span className="text-yellow-400 font-medium">طريقة دفع سهلة</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                  ادفع عبر <span className="text-yellow-400">الكريمي</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto mb-8 text-lg">
                  يمكنك الآن الدفع بسهولة وأمان عبر حساب الكريمي. انسخ الرقم وتواصل معنا على واتساب
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <div className="bg-black/50 backdrop-blur-sm border border-yellow-500/30 rounded-xl px-8 py-4">
                    <p className="text-gray-400 text-sm mb-1">رقم حساب الكريمي</p>
                    <p className="text-3xl font-black text-yellow-400" dir="ltr">3091263156</p>
                  </div>
                  <a 
                    href="https://wa.me/967734875002?text=مرحباً،%20أرغب%20في%20الشراء%20عبر%20الكريمي%0Aرقم%20الحساب:%203091263156"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button 
                      size="lg" 
                      className="bg-green-500 hover:bg-green-400 text-white gap-2 font-bold"
                    >
                      <MessageCircle className="w-5 h-5" />
                      تواصل واتساب
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-b from-gray-900 to-black relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent" />
          
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/20 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
              
              <div className="relative">
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                  هل تبحث عن منتج <span className="text-yellow-400">معين؟</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto mb-8 text-lg">
                  تواصل معنا الآن وسنساعدك في العثور على ما تحتاجه من أحدث الجوالات والإكسسوارات
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link to="/products">
                    <Button 
                      size="lg" 
                      className="bg-yellow-500 text-black hover:bg-yellow-400 gap-2 font-bold"
                    >
                      <ShoppingBag className="w-5 h-5" />
                      تصفح المنتجات
                    </Button>
                  </Link>
                  <a 
                    href="https://wa.me/967734875002" 
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="border-green-500 text-green-400 hover:bg-green-500 hover:text-white gap-2 font-bold"
                    >
                      <MessageCircle className="w-5 h-5" />
                      تواصل واتساب
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
