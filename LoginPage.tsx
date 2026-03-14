import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, User, ArrowLeft } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export function LoginPage() {
  const navigate = useNavigate();
  const { login, currentUser } = useStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Redirect if already logged in
  if (currentUser) {
    navigate('/admin');
    return null;
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      toast.error('يرجى إدخال اسم المستخدم وكلمة المرور');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const success = login(username, password);
    
    if (success) {
      toast.success('تم تسجيل الدخول بنجاح');
      navigate('/admin');
    } else {
      toast.error('اسم المستخدم أو كلمة المرور غير صحيحة');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
      
      <div className="w-full max-w-md relative z-10">
        {/* Back Button */}
        <Link to="/">
          <Button 
            variant="ghost" 
            className="text-gray-400 mb-4 hover:text-yellow-400 hover:bg-yellow-500/10"
          >
            <ArrowLeft className="w-4 h-4 ml-2" />
            العودة للرئيسية
          </Button>
        </Link>
        
        <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/30 shadow-2xl shadow-yellow-500/10">
          <CardHeader className="text-center space-y-6">
            {/* Logo */}
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center border-4 border-black shadow-lg shadow-yellow-500/30">
                <img 
                  src="/logo.png" 
                  alt="تاتشي فون" 
                  className="w-12 h-12 object-contain"
                />
              </div>
            </div>
            <div>
              <CardTitle className="text-2xl text-white">تسجيل الدخول</CardTitle>
              <CardDescription className="text-gray-400">
                أدخل بياناتك للوصول إلى لوحة التحكم
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-white">اسم المستخدم</Label>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="أدخل اسم المستخدم"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pr-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-yellow-500"
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">كلمة المرور</Label>
                <div className="relative">
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="أدخل كلمة المرور"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10 pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-yellow-500"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-yellow-400 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
              
              {/* Submit */}
              <Button 
                type="submit" 
                className="w-full bg-yellow-500 text-black hover:bg-yellow-400 font-bold"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    جاري تسجيل الدخول...
                  </span>
                ) : (
                  'تسجيل الدخول'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        {/* Footer */}
        <p className="text-center text-gray-600 text-sm mt-8">
          © {new Date().getFullYear()} <span className="text-yellow-400 font-bold">تاتشي فون</span> - جميع الحقوق محفوظة
        </p>
      </div>
    </div>
  );
}
