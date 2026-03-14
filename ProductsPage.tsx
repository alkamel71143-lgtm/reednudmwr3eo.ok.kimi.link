import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Grid3X3, List, SlidersHorizontal, Sparkles, ArrowLeft, Smartphone, Square, Headphones, Plug, Battery, Camera, Watch, Tablet, Laptop, Gamepad2, ZoomIn, X } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'name' | 'discount';

const iconMap: Record<string, React.ElementType> = {
  Smartphone,
  Square,
  Headphones,
  Plug,
  Battery,
  Camera,
  Watch,
  Tablet,
  Laptop,
  Gamepad2,
};

export function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, categories, selectedCategory, setSelectedCategory, setSelectedSubCategory, searchQuery } = useStore();
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [priceRange, setPriceRange] = useState<{ min: string; max: string }>({ min: '', max: '' });
  const [inStockOnly, setInStockOnly] = useState(false);
  const [discountOnly, setDiscountOnly] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // Get category from URL
  const urlCategory = searchParams.get('category');
  const urlSubCategory = searchParams.get('subCategory');
  
  useEffect(() => {
    if (urlCategory) {
      setSelectedCategory(urlCategory);
    }
    if (urlSubCategory) {
      setSelectedSubCategory(urlSubCategory);
    }
  }, [urlCategory, urlSubCategory]);
  
  // Filter products
  const filteredProducts = products.filter((product) => {
    // Category filter
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false;
    }
    
    // Sub-category filter
    if (urlSubCategory && product.subCategory !== urlSubCategory) {
      return false;
    }
    
    // Search filter
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Price filter
    const minPrice = priceRange.min ? parseFloat(priceRange.min) : 0;
    const maxPrice = priceRange.max ? parseFloat(priceRange.max) : Infinity;
    if (product.price < minPrice || product.price > maxPrice) {
      return false;
    }
    
    // Stock filter
    if (inStockOnly && product.stockQuantity <= 0) {
      return false;
    }
    
    // Discount filter
    if (discountOnly && (!product.discount || product.discount === 0)) {
      return false;
    }
    
    return true;
  });
  
  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'discount':
        return (b.discount || 0) - (a.discount || 0);
      case 'newest':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });
  
  const currentCategory = categories.find(c => c.id === selectedCategory);

  // Show categories first if no category selected
  const showCategories = selectedCategory === 'all' && !urlCategory;

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 pt-24">
          {/* Breadcrumb & Title */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400 text-sm font-medium">تسوق الآن</span>
            </div>
            <h1 className="text-4xl font-black text-white mb-2">
              {showCategories 
                ? 'جميع الأقسام' 
                : currentCategory?.name || 'المنتجات'
              }
            </h1>
            <p className="text-gray-400">
              {showCategories 
                ? 'اختر القسم المناسب لك'
                : `${sortedProducts.length} منتج متوفر`
              }
            </p>
          </div>

          {/* Show Categories Grid */}
          {showCategories ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categories.map((category) => {
                const IconComponent = iconMap[category.icon] || Smartphone;
                const categoryProducts = products.filter(p => p.category === category.id);
                
                return (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setSearchParams({ category: category.id });
                    }}
                    className="text-left"
                  >
                    <Card className="group p-6 hover:shadow-2xl transition-all duration-300 border-0 shadow-lg cursor-pointer h-full bg-gradient-to-br from-gray-900 to-black border border-yellow-500/20 hover:border-yellow-500/50 hover:-translate-y-2">
                      <div className="flex flex-col items-center text-center space-y-5">
                        {/* Category Image or Icon */}
                        {category.image ? (
                          <div 
                            className="relative w-24 h-24 rounded-2xl overflow-hidden group-hover:scale-110 transition-transform duration-300"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedImage(category.image!);
                            }}
                          >
                            <img 
                              src={category.image} 
                              alt={category.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <ZoomIn className="w-6 h-6 text-white" />
                            </div>
                          </div>
                        ) : (
                          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-yellow-500/20">
                            <IconComponent className="w-12 h-12 text-black" />
                          </div>
                        )}
                        
                        {/* Content */}
                        <div>
                          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                            {category.name}
                          </h3>
                          <p className="text-sm text-gray-500 mb-3">
                            {category.subCategories.length} أقسام فرعية
                          </p>
                          <p className="text-sm text-yellow-400">
                            {categoryProducts.length} منتج
                          </p>
                        </div>
                        
                        {/* CTA */}
                        <div className="flex items-center gap-2 text-yellow-400 font-bold group-hover:gap-3 transition-all">
                          <span>عرض المنتجات</span>
                          <ArrowLeft className="w-4 h-4" />
                        </div>
                      </div>
                    </Card>
                  </button>
                );
              })}
            </div>
          ) : (
            <>
              {/* Back Button */}
              <Button 
                variant="outline" 
                className="mb-6 border-yellow-500/30 text-white hover:bg-yellow-500/10 hover:text-yellow-400"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchParams({});
                }}
              >
                <ArrowLeft className="w-4 h-4 ml-2" />
                العودة للأقسام
              </Button>

              {/* Filters Bar */}
              <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/20 rounded-xl p-4 mb-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  {/* Left: Filters */}
                  <div className="flex items-center gap-2">
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline" className="gap-2 border-yellow-500/30 text-white hover:bg-yellow-500/10 hover:text-yellow-400">
                          <SlidersHorizontal className="w-4 h-4" />
                          الفلاتر
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="right" className="w-80 bg-gray-900 border-yellow-500/30">
                        <SheetHeader>
                          <SheetTitle className="text-white">تصفية المنتجات</SheetTitle>
                        </SheetHeader>
                        
                        <div className="py-6 space-y-6">
                          {/* Price Range */}
                          <div>
                            <h3 className="font-bold text-yellow-400 mb-3">نطاق السعر</h3>
                            <div className="flex items-center gap-2">
                              <Input 
                                type="number"
                                placeholder="من"
                                value={priceRange.min}
                                onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                                className="bg-white/5 border-white/10 text-white"
                              />
                              <span className="text-white">-</span>
                              <Input 
                                type="number"
                                placeholder="إلى"
                                value={priceRange.max}
                                onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                                className="bg-white/5 border-white/10 text-white"
                              />
                            </div>
                          </div>
                          
                          {/* Filters */}
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <Checkbox 
                                id="in-stock"
                                checked={inStockOnly}
                                onCheckedChange={(checked) => setInStockOnly(checked as boolean)}
                                className="border-green-500 data-[state=checked]:bg-green-500"
                              />
                              <Label htmlFor="in-stock" className="text-white">المتوفر فقط</Label>
                            </div>
                            <div className="flex items-center gap-2">
                              <Checkbox 
                                id="discount"
                                checked={discountOnly}
                                onCheckedChange={(checked) => setDiscountOnly(checked as boolean)}
                                className="border-red-500 data-[state=checked]:bg-red-500"
                              />
                              <Label htmlFor="discount" className="text-white">الخصومات فقط</Label>
                            </div>
                          </div>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
                  
                  {/* Right: Sort & View */}
                  <div className="flex items-center gap-2">
                    <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                      <SelectTrigger className="w-40 bg-white/5 border-white/10 text-white">
                        <SelectValue placeholder="ترتيب حسب" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-yellow-500/30">
                        <SelectItem value="newest" className="text-white">الأحدث</SelectItem>
                        <SelectItem value="price-asc" className="text-white">السعر: من الأقل</SelectItem>
                        <SelectItem value="price-desc" className="text-white">السعر: من الأعلى</SelectItem>
                        <SelectItem value="discount" className="text-white">الخصم</SelectItem>
                        <SelectItem value="name" className="text-white">الاسم</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <div className="flex items-center border border-white/20 rounded-lg overflow-hidden">
                      <Button 
                        variant={viewMode === 'grid' ? 'default' : 'ghost'}
                        size="icon"
                        className={`rounded-none ${viewMode === 'grid' ? 'bg-yellow-500 text-black' : 'text-white hover:text-yellow-400'}`}
                        onClick={() => setViewMode('grid')}
                      >
                        <Grid3X3 className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant={viewMode === 'list' ? 'default' : 'ghost'}
                        size="icon"
                        className={`rounded-none ${viewMode === 'list' ? 'bg-yellow-500 text-black' : 'text-white hover:text-yellow-400'}`}
                        onClick={() => setViewMode('list')}
                      >
                        <List className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Products Grid */}
              {sortedProducts.length > 0 ? (
                <div className={`grid ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                    : 'grid-cols-1'
                } gap-6`}>
                  {sortedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Filter className="w-12 h-12 text-gray-600" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    لا توجد منتجات
                  </h3>
                  <p className="text-gray-500">
                    لا توجد منتجات في هذا القسم حالياً
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />

      {/* Image Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-3xl bg-black/95 border-yellow-500/30 p-0 overflow-hidden">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-yellow-500 hover:text-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="relative aspect-square md:aspect-auto md:h-[70vh]">
            <img 
              src={selectedImage || ''} 
              alt="Category"
              className="w-full h-full object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
