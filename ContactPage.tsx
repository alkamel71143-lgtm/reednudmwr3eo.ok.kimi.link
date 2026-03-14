import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Send,
  Instagram,
  Twitter,
  MessageCircle,
  Share2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.message) {
      toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('تم إرسال رسالتك بنجاح، سنتواصل معك قريباً');
    setFormData({ name: '', email: '', phone: '', message: '' });
    setIsSubmitting(false);
  };

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
    <div className="min-h-screen flex flex-col bg-black">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link to="/" className="hover:text-yellow-400 transition-colors">الرئيسية</Link>
            <ArrowLeft className="w-4 h-4" />
            <span className="text-yellow-400">تواصل معنا</span>
          </nav>
          
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 px-4 py-2 rounded-full mb-4">
              <MessageCircle className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400 text-sm font-medium">نحن هنا لمساعدتك</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              تواصل <span className="text-yellow-400">معنا</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              نحن هنا لمساعدتك! تواصل معنا عبر أي من القنوات التالية وسنرد عليك في أقرب وقت ممكن
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Contact Info */}
            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-14 h-14 bg-yellow-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-7 h-7 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg mb-1">العنوان</h3>
                    <p className="text-gray-400">اليمن - تعز المدينة، المسبح</p>
                    <p className="text-gray-500 text-sm">أسفل معهد جلوبل - أمام السوق الحر</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-14 h-14 bg-green-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-7 h-7 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg mb-1">الهاتف</h3>
                    <a 
                      href="https://wa.me/967734875002" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-green-400 transition-colors flex items-center gap-2"
                      dir="ltr"
                    >
                      +967 734 875 002
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-14 h-14 bg-purple-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-7 h-7 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg mb-1">البريد الإلكتروني</h3>
                    <a 
                      href="mailto:alkamel71143@gmail.com"
                      className="text-gray-400 hover:text-purple-400 transition-colors"
                    >
                      alkamel71143@gmail.com
                    </a>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-7 h-7 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg mb-1">ساعات العمل</h3>
                    <p className="text-gray-400">السبت - الخميس: 9 ص - 11 م</p>
                    <p className="text-gray-500 text-sm">الجمعة: 4 م - 11 م</p>
                  </div>
                </CardContent>
              </Card>
              
              {/* Social Media */}
              <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/20 rounded-2xl p-6">
                <h3 className="font-bold text-white text-lg mb-4">تابعنا على</h3>
                <div className="flex gap-3">
                  <a 
                    href="#" 
                    className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a 
                    href="#" 
                    className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
                  >
                    <Twitter className="w-6 h-6" />
                  </a>
                  <a 
                    href="https://wa.me/967734875002"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
                  >
                    <MessageCircle className="w-6 h-6" />
                  </a>
                  <button 
                    onClick={handleShare}
                    className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center text-black hover:scale-110 transition-transform shadow-lg"
                  >
                    <Share2 className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div>
              <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">أرسل لنا رسالة</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <Label htmlFor="name" className="text-white mb-2 block">الاسم *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="أدخل اسمك"
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-yellow-500"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone" className="text-white mb-2 block">رقم الجوال *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="05xxxxxxxx"
                        dir="ltr"
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-yellow-500"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="text-white mb-2 block">البريد الإلكتروني</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="اختياري"
                        dir="ltr"
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-yellow-500"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="message" className="text-white mb-2 block">الرسالة *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="اكتب رسالتك هنا..."
                        rows={5}
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-yellow-500 resize-none"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full gap-2 bg-yellow-500 text-black hover:bg-yellow-400 font-bold"
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                          جاري الإرسال...
                        </span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          إرسال الرسالة
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
              
              {/* Quick Contact Buttons */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <a 
                  href="tel:+967734875002"
                  className="flex items-center justify-center gap-2 bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-500 transition-colors font-bold"
                >
                  <Phone className="w-5 h-5" />
                  اتصل الآن
                </a>
                <a 
                  href="https://wa.me/967734875002"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-green-500 text-white py-4 rounded-xl hover:bg-green-400 transition-colors font-bold"
                >
                  <MessageCircle className="w-5 h-5" />
                  واتساب
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
