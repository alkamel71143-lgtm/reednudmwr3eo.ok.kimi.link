import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MessageSquare, Send, Star, ThumbsUp, AlertCircle } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export function FeedbackPage() {
  const { addFeedback } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
    type: 'suggestion' as 'suggestion' | 'complaint' | 'inquiry',
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
    
    addFeedback({
      name: formData.name,
      phone: formData.phone,
      message: formData.message,
      type: formData.type,
    });
    
    toast.success('تم إرسال ملاحظتك بنجاح، شكراً لك!');
    setFormData({ name: '', phone: '', message: '', type: 'suggestion' });
    setIsSubmitting(false);
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
            <span className="text-yellow-400">مقترحات وملاحظات</span>
          </nav>
          
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Left - Info */}
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 px-4 py-2 rounded-full mb-4">
                  <MessageSquare className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-400 text-sm font-medium">نحن نستمع لك</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                  مقترحات <span className="text-yellow-400">وملاحظات</span>
                </h1>
                <p className="text-gray-400 text-lg leading-relaxed">
                  نحن نقدر رأيك وملاحظاتك. ساعدنا في تحسين تجربتك مع متجر تاتشي فون
                </p>
              </div>
              
              {/* Feedback Types */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
                  <CardContent className="p-5 text-center">
                    <div className="w-14 h-14 bg-yellow-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <ThumbsUp className="w-7 h-7 text-yellow-400" />
                    </div>
                    <h3 className="font-bold text-white mb-1">مقترح</h3>
                    <p className="text-sm text-gray-500">لديك فكرة لتحسين المتجر؟</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
                  <CardContent className="p-5 text-center">
                    <div className="w-14 h-14 bg-red-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <AlertCircle className="w-7 h-7 text-red-400" />
                    </div>
                    <h3 className="font-bold text-white mb-1">شكوى</h3>
                    <p className="text-sm text-gray-500">واجهت مشكلة؟ أخبرنا</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
                  <CardContent className="p-5 text-center">
                    <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Star className="w-7 h-7 text-blue-400" />
                    </div>
                    <h3 className="font-bold text-white mb-1">استفسار</h3>
                    <p className="text-sm text-gray-500">لديك سؤال؟ نحن هنا</p>
                  </CardContent>
                </Card>
              </div>
              
              {/* Contact Info */}
              <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/20 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">أو تواصل معنا مباشرة</h3>
                <div className="space-y-3">
                  <a 
                    href="https://wa.me/967734875002"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-400 hover:text-green-400 transition-colors"
                  >
                    <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <span dir="ltr">+967 734 875 002</span>
                  </a>
                  <a 
                    href="mailto:alkamel71143@gmail.com"
                    className="flex items-center gap-3 text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                      <Send className="w-5 h-5" />
                    </div>
                    <span>alkamel71143@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Right - Form */}
            <div>
              <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">أرسل ملاحظتك</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Type Selection */}
                    <div>
                      <Label className="text-white mb-3 block">نوع الملاحظة</Label>
                      <RadioGroup 
                        value={formData.type} 
                        onValueChange={(v) => setFormData({ ...formData, type: v as any })}
                        className="flex flex-wrap gap-3"
                      >
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <RadioGroupItem value="suggestion" id="suggestion" className="border-yellow-500 text-yellow-500" />
                          <Label htmlFor="suggestion" className="text-gray-300 cursor-pointer">مقترح</Label>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <RadioGroupItem value="complaint" id="complaint" className="border-red-500 text-red-500" />
                          <Label htmlFor="complaint" className="text-gray-300 cursor-pointer">شكوى</Label>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <RadioGroupItem value="inquiry" id="inquiry" className="border-blue-500 text-blue-500" />
                          <Label htmlFor="inquiry" className="text-gray-300 cursor-pointer">استفسار</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    {/* Name */}
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
                    
                    {/* Phone */}
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
                    
                    {/* Message */}
                    <div>
                      <Label htmlFor="message" className="text-white mb-2 block">الملاحظة *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="اكتب ملاحظتك هنا..."
                        rows={5}
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-yellow-500 resize-none"
                      />
                    </div>
                    
                    {/* Submit */}
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
                          إرسال الملاحظة
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
