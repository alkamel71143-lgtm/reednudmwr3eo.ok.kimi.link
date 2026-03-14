import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Instagram,
  Twitter,
  MessageCircle,
  Share2
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import { toast } from 'sonner';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { categories } = useStore();
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'تاتشي فون - Touchy Phone',
          text: 'تسوق أحدث الهواتف الذكية والإكسسوارات',
          url: window.location.origin,
        });
      } catch {
        // User cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.origin);
      toast.success('تم نسخ رابط الموقع');
    }
  };
  
  return (
    <footer className="bg-black border-t border-yellow-500/20">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center border-2 border-black shadow-lg shadow-yellow-500/20">
                <img 
                  src="/logo.png" 
                  alt="تاتشي فون" 
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white">تاتشي <span className="text-yellow-400">فون</span></h3>
                <p className="text-sm text-yellow-500/70">للهواتف الذكية ومستلزماتها</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              وجهتك الأولى لأحدث الجوالات والإكسسوارات في تعز، اليمن. نقدم منتجات أصلية بأسعار مميزة مع ضمان شامل.
            </p>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://wa.me/967734875002" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <button 
                onClick={handleShare}
                className="w-11 h-11 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-black hover:scale-110 transition-transform shadow-lg"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-yellow-400 rounded-full"></span>
              روابط سريعة
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-yellow-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-yellow-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
                  جميع المنتجات
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-400 hover:text-yellow-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
                  سلة التسوق
                </Link>
              </li>
              <li>
                <Link to="/feedback" className="text-gray-400 hover:text-yellow-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
                  مقترحات وملاحظات
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-yellow-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
                  تواصل معنا
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-yellow-400 rounded-full"></span>
              الأقسام
            </h4>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link 
                    to={`/products?category=${category.id}`}
                    className="text-gray-400 hover:text-yellow-400 transition-colors flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-yellow-400 rounded-full"></span>
              معلومات التواصل
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">العنوان</p>
                  <p className="text-gray-400 text-sm">اليمن - تعز المدينة، المسبح</p>
                  <p className="text-gray-500 text-xs">أسفل معهد جلوبل - أمام السوق الحر</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">الهاتف</p>
                  <a 
                    href="https://wa.me/967734875002"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 text-sm hover:text-yellow-400 transition-colors"
                    dir="ltr"
                  >
                    +967 734 875 002
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">البريد</p>
                  <a 
                    href="mailto:alkamel71143@gmail.com"
                    className="text-gray-400 text-sm hover:text-yellow-400 transition-colors"
                  >
                    alkamel71143@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">ساعات العمل</p>
                  <p className="text-gray-400 text-sm">السبت - الخميس: 9 ص - 11 م</p>
                  <p className="text-gray-500 text-xs">الجمعة: 4 م - 11 م</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-yellow-500/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <p className="text-gray-500">
              جميع الحقوق محفوظة © {currentYear} <span className="text-yellow-400 font-bold">تاتشي فون</span>
            </p>
            <p className="text-gray-600">
              حساب الكريمي: <span className="text-yellow-400 font-bold" dir="ltr">3091263156</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
