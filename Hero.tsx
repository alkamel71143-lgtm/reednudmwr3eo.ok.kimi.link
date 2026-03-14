import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Sparkles, MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store/useStore';
import { toast } from 'sonner';

export function Hero() {
  const { products } = useStore();
  const [isInstallable, setIsInstallable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  
  const featuredProducts = products.filter(p => p.featured).slice(0, 3);
  
  useEffect(() => {
    // Listen for beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    });
    
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstallable(false);
    }
  }, []);
  
  const handleInstall = async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      toast.success('تم تثبيت التطبيق بنجاح!');
      setIsInstallable(false);
    }
    setDeferredPrompt(null);
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background with store image */}
      <div className="absolute inset-0">
        <img 
          src="/store-banner.jpg" 
          alt="تاتشي فون"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black" />
      </div>
      
      {/* Gold accent lines */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
      
      {/* Content */}
      <div className="relative container mx-auto px-4 pt-24 pb-16 min-h-screen flex flex-col justify-center">
        {/* PWA Install Button */}
        {isInstallable && (
          <div className="absolute top-20 left-4 z-20">
            <Button 
              onClick={handleInstall}
              className="bg-yellow-500 text-black hover:bg-yellow-400 font-bold gap-2 animate-pulse-gold"
            >
              <Sparkles className="w-4 h-4" />
              تثبيت التطبيق
            </Button>
          </div>
        )}
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 backdrop-blur-sm border border-yellow-500/30 px-4 py-2 rounded-full">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-yellow-400">أفضل الأسعار في تعز</span>
            </div>
            
            {/* Logo Large */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center border-4 border-black shadow-2xl shadow-yellow-500/30">
                <img 
                  src="/logo.png" 
                  alt="تاتشي فون" 
                  className="w-14 h-14 md:w-16 md:h-16 object-contain"
                />
              </div>
              <div>
                <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
                  تاتشي <span className="text-yellow-400">فون</span>
                </h1>
                <p className="text-lg md:text-xl text-yellow-500/90 font-medium mt-1">
                  للهواتف الذكية ومستلزماتها
                </p>
              </div>
            </div>
            
            <p className="text-lg md:text-xl text-gray-300 max-w-lg leading-relaxed">
              اكتشف تشكيلتنا الواسعة من الجوالات الذكية، الغلافات، والإكسسوارات بأفضل الأسعار مع ضمان شامل
            </p>
            
            {/* Store Info */}
            <div className="space-y-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-400">العنوان</p>
                  <p className="text-white font-medium">اليمن - تعز المدينة، المسبح</p>
                  <p className="text-gray-300 text-sm">أسفل معهد جلوبل - أمام السوق الحر</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-400">التواصل</p>
                  <a 
                    href="https://wa.me/967734875002" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-medium hover:text-yellow-400 transition-colors flex items-center gap-2"
                    dir="ltr"
                  >
                    +967 734 875 002
                    <MessageCircle className="w-4 h-4 text-green-400" />
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-400">البريد الإلكتروني</p>
                  <a 
                    href="mailto:alkamel71143@gmail.com"
                    className="text-white font-medium hover:text-yellow-400 transition-colors"
                    dir="ltr"
                  >
                    alkamel71143@gmail.com
                  </a>
                </div>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <Button 
                  size="lg" 
                  className="bg-yellow-500 text-black hover:bg-yellow-400 gap-2 text-lg px-8 font-bold shadow-lg shadow-yellow-500/30"
                >
                  <ShoppingBag className="w-5 h-5" />
                  تسوق الآن
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
                  className="border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black gap-2 text-lg font-bold"
                >
                  <MessageCircle className="w-5 h-5" />
                  تواصل واتساب
                </Button>
              </a>
            </div>
            
            {/* Stats */}
            <div className="flex gap-8 pt-4">
              <div className="text-center">
                <div className="text-3xl font-black text-yellow-400">+1000</div>
                <div className="text-sm text-gray-400">منتج متنوع</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-yellow-400">+5000</div>
                <div className="text-sm text-gray-400">عميل سعيد</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-yellow-400">24/7</div>
                <div className="text-sm text-gray-400">دعم فني</div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Featured Products Preview */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl" />
              
              {/* Products Grid */}
              <div className="relative grid grid-cols-2 gap-4">
                {featuredProducts.map((product, index) => (
                  <div 
                    key={product.id}
                    className={`bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-yellow-500/20 hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-1 ${
                      index === 0 ? 'col-span-2' : ''
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded-xl"
                      />
                      <div className="text-white">
                        <h3 className="font-semibold line-clamp-1">{product.name}</h3>
                        <p className="text-yellow-400 text-xl font-bold">
                          {product.price.toLocaleString()} ر.س
                        </p>
                        {product.originalPrice && (
                          <p className="text-gray-400 text-sm line-through">
                            {product.originalPrice.toLocaleString()} ر.س
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path 
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
            fill="#000"
          />
        </svg>
      </div>
    </section>
  );
}
