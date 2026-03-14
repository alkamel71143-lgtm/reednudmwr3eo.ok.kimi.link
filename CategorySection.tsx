import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Square, Headphones, Plug, Battery, Camera, Watch, Tablet, Laptop, Gamepad2, ArrowLeft, ZoomIn, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useStore } from '@/store/useStore';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';

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

export function CategorySection() {
  const { categories } = useStore();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  if (categories.length === 0) {
    return (
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 text-lg">لا توجد فئات متاحة حالياً</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 px-4 py-2 rounded-full mb-4">
            <span className="text-yellow-400 text-sm font-medium">تصفح أقسامنا</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            تصفح حسب <span className="text-yellow-400">القسم</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            اختر القسم المناسب لك واستعرض المنتجات المتوفرة
          </p>
        </div>
        
        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => {
            const IconComponent = iconMap[category.icon] || Smartphone;
            
            return (
              <Link 
                key={category.id} 
                to={`/products?category=${category.id}`}
              >
                <Card className="group p-6 hover:shadow-2xl transition-all duration-300 border-0 shadow-lg cursor-pointer h-full bg-gradient-to-br from-gray-900 to-black border border-yellow-500/20 hover:border-yellow-500/50 hover:-translate-y-2">
                  <div className="flex flex-col items-center text-center space-y-5">
                    {/* Category Image or Icon */}
                    {category.image ? (
                      <div 
                        className="relative w-24 h-24 rounded-2xl overflow-hidden group-hover:scale-110 transition-transform duration-300"
                        onClick={(e) => {
                          e.preventDefault();
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
                      
                      {/* Sub Categories Preview */}
                      <div className="flex flex-wrap justify-center gap-1">
                        {category.subCategories.slice(0, 3).map((sub) => (
                          <span 
                            key={sub.id}
                            className="text-xs bg-white/5 text-gray-400 px-2 py-1 rounded-full border border-white/10"
                          >
                            {sub.name}
                          </span>
                        ))}
                        {category.subCategories.length > 3 && (
                          <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full">
                            +{category.subCategories.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* CTA */}
                    <div className="flex items-center gap-2 text-yellow-400 font-bold group-hover:gap-3 transition-all">
                      <span>عرض المنتجات</span>
                      <ArrowLeft className="w-4 h-4" />
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

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
    </section>
  );
}
