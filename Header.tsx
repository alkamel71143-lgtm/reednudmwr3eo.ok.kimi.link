import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, 
  Menu, 
  Search, 
  User, 
  LogOut,
  Home,
  Grid3X3,
  Phone,
  Settings,
  Share2,
  MessageSquare
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const { cart, currentUser, logout, setSearchQuery, searchQuery, categories } = useStore();
  
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/products');
      setSearchOpen(false);
    }
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('تم تسجيل الخروج');
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
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-black/95 backdrop-blur-md shadow-lg shadow-yellow-500/10' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center border-2 border-black shadow-lg shadow-yellow-500/30">
              <img 
                src="/logo.png" 
                alt="تاتشي فون" 
                className="w-8 h-8 md:w-10 md:h-10 object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl md:text-2xl font-black text-white tracking-wide">
                تاتشي <span className="text-yellow-400">فون</span>
              </h1>
              <p className="text-xs text-yellow-500/80 -mt-1 font-medium">للهواتف الذكية ومستلزماتها</p>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link to="/">
              <Button 
                variant={isActive('/') ? 'default' : 'ghost'} 
                size="sm"
                className={`gap-2 ${isActive('/') ? 'bg-yellow-500 text-black hover:bg-yellow-400' : 'text-white hover:text-yellow-400 hover:bg-white/10'}`}
              >
                <Home className="w-4 h-4" />
                الرئيسية
              </Button>
            </Link>
            <Link to="/products">
              <Button 
                variant={isActive('/products') ? 'default' : 'ghost'} 
                size="sm"
                className={`gap-2 ${isActive('/products') ? 'bg-yellow-500 text-black hover:bg-yellow-400' : 'text-white hover:text-yellow-400 hover:bg-white/10'}`}
              >
                <Grid3X3 className="w-4 h-4" />
                المنتجات
              </Button>
            </Link>
            <Link to="/contact">
              <Button 
                variant={isActive('/contact') ? 'default' : 'ghost'} 
                size="sm"
                className={`gap-2 ${isActive('/contact') ? 'bg-yellow-500 text-black hover:bg-yellow-400' : 'text-white hover:text-yellow-400 hover:bg-white/10'}`}
              >
                <Phone className="w-4 h-4" />
                تواصل معنا
              </Button>
            </Link>
          </nav>
          
          {/* Actions */}
          <div className="flex items-center gap-1 md:gap-2">
            {/* Share Button */}
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-yellow-400 hover:bg-white/10"
              onClick={handleShare}
            >
              <Share2 className="w-5 h-5" />
            </Button>
            
            {/* Search */}
            <div className={`${searchOpen ? 'flex' : 'hidden'} md:flex items-center gap-2`}>
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="search"
                  placeholder="بحث عن منتج..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-40 lg:w-56 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
                <button 
                  type="submit"
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-white/50 hover:text-yellow-400"
                >
                  <Search className="w-4 h-4" />
                </button>
              </form>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:text-yellow-400 hover:bg-white/10"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search className="w-5 h-5" />
            </Button>
            
            {/* Cart */}
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative text-white hover:text-yellow-400 hover:bg-white/10">
                <ShoppingCart className="w-5 h-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 text-black text-xs rounded-full flex items-center justify-center font-bold">
                    {cartItemsCount}
                  </span>
                )}
              </Button>
            </Link>
            
            {/* Feedback Button */}
            <Link to="/feedback">
              <Button 
                variant="ghost" 
                size="icon"
                className="hidden sm:flex text-white hover:text-yellow-400 hover:bg-white/10"
              >
                <MessageSquare className="w-5 h-5" />
              </Button>
            </Link>
            
            {/* User Menu */}
            {currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white hover:text-yellow-400 hover:bg-white/10">
                    <User className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-gray-900 border-yellow-500/30">
                  <div className="px-3 py-2 text-sm font-medium text-yellow-400">
                    {currentUser.username}
                  </div>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem onClick={() => navigate('/admin')} className="text-white hover:text-yellow-400 focus:text-yellow-400">
                    <Settings className="w-4 h-4 ml-2" />
                    لوحة التحكم
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="text-red-400 hover:text-red-300 focus:text-red-300">
                    <LogOut className="w-4 h-4 ml-2" />
                    تسجيل الخروج
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="icon" className="text-white hover:text-yellow-400 hover:bg-white/10">
                  <User className="w-5 h-5" />
                </Button>
              </Link>
            )}
            
            {/* Mobile Menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden text-white hover:text-yellow-400 hover:bg-white/10">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-gray-900 border-yellow-500/30">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-3 py-4 border-b border-white/10">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center border-2 border-black">
                      <img 
                        src="/logo.png" 
                        alt="تاتشي فون" 
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                    <div>
                      <h1 className="text-lg font-black text-white">تاتشي <span className="text-yellow-400">فون</span></h1>
                      <p className="text-xs text-yellow-500/80">للهواتف الذكية</p>
                    </div>
                  </div>
                  
                  <nav className="flex-1 py-4">
                    <div className="space-y-2">
                      <Link to="/" onClick={() => setIsMenuOpen(false)}>
                        <Button 
                          variant={isActive('/') ? 'default' : 'ghost'} 
                          className={`w-full justify-start gap-3 ${isActive('/') ? 'bg-yellow-500 text-black' : 'text-white hover:text-yellow-400'}`}
                        >
                          <Home className="w-5 h-5" />
                          الرئيسية
                        </Button>
                      </Link>
                      <Link to="/products" onClick={() => setIsMenuOpen(false)}>
                        <Button 
                          variant={isActive('/products') ? 'default' : 'ghost'} 
                          className={`w-full justify-start gap-3 ${isActive('/products') ? 'bg-yellow-500 text-black' : 'text-white hover:text-yellow-400'}`}
                        >
                          <Grid3X3 className="w-5 h-5" />
                          المنتجات
                        </Button>
                      </Link>
                      <Link to="/cart" onClick={() => setIsMenuOpen(false)}>
                        <Button 
                          variant={isActive('/cart') ? 'default' : 'ghost'} 
                          className={`w-full justify-start gap-3 ${isActive('/cart') ? 'bg-yellow-500 text-black' : 'text-white hover:text-yellow-400'}`}
                        >
                          <ShoppingCart className="w-5 h-5" />
                          سلة التسوق
                          {cartItemsCount > 0 && (
                            <span className="mr-auto bg-yellow-500 text-black text-xs px-2 py-0.5 rounded-full font-bold">
                              {cartItemsCount}
                            </span>
                          )}
                        </Button>
                      </Link>
                      <Link to="/feedback" onClick={() => setIsMenuOpen(false)}>
                        <Button 
                          variant={isActive('/feedback') ? 'default' : 'ghost'} 
                          className={`w-full justify-start gap-3 ${isActive('/feedback') ? 'bg-yellow-500 text-black' : 'text-white hover:text-yellow-400'}`}
                        >
                          <MessageSquare className="w-5 h-5" />
                          مقترحات وملاحظات
                        </Button>
                      </Link>
                      <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                        <Button 
                          variant={isActive('/contact') ? 'default' : 'ghost'} 
                          className={`w-full justify-start gap-3 ${isActive('/contact') ? 'bg-yellow-500 text-black' : 'text-white hover:text-yellow-400'}`}
                        >
                          <Phone className="w-5 h-5" />
                          تواصل معنا
                        </Button>
                      </Link>
                    </div>
                    
                    {categories.length > 0 && (
                      <div className="mt-6">
                        <h3 className="text-sm font-semibold text-yellow-400 px-3 mb-2">الأقسام</h3>
                        <div className="space-y-1">
                          {categories.map((category) => (
                            <Link 
                              key={category.id} 
                              to={`/products?category=${category.id}`}
                              onClick={() => setIsMenuOpen(false)}
                            >
                              <Button variant="ghost" className="w-full justify-start text-right text-white hover:text-yellow-400">
                                {category.name}
                              </Button>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </nav>
                  
                  {currentUser ? (
                    <div className="border-t border-white/10 pt-4 space-y-2">
                      <Button 
                        variant="outline" 
                        className="w-full border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black"
                        onClick={() => {
                          setIsMenuOpen(false);
                          navigate('/admin');
                        }}
                      >
                        <Settings className="w-4 h-4 ml-2" />
                        لوحة التحكم
                      </Button>
                      <Button 
                        variant="destructive" 
                        className="w-full"
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                      >
                        <LogOut className="w-4 h-4 ml-2" />
                        تسجيل الخروج
                      </Button>
                    </div>
                  ) : (
                    <div className="border-t border-white/10 pt-4">
                      <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                        <Button className="w-full bg-yellow-500 text-black hover:bg-yellow-400">
                          <User className="w-4 h-4 ml-2" />
                          تسجيل الدخول
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        {/* Mobile Search Bar */}
        {searchOpen && (
          <div className="md:hidden pb-3">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="بحث عن منتج..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                autoFocus
              />
              <button 
                type="submit"
                className="absolute left-2 top-1/2 -translate-y-1/2 text-white/50 hover:text-yellow-400"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
}
