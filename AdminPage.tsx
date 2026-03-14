import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  LogOut, 
  Package, 
  ShoppingBag, 
  TrendingUp,
  Users,
  Search,
  Upload,
  Percent,
  Image as ImageIcon,
  X,
  Save,
  Folder,
  User as UserIcon,
  Eye,
  EyeOff,
  Check
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { availableIcons } from '@/data/categories';
import type { Product, CategoryInfo } from '@/types';

// Icons map for reference only

export function AdminPage() {
  const navigate = useNavigate();
  const { 
    products, 
    categories,
    currentUser, 
    logout, 
    addProduct, 
    updateProduct, 
    deleteProduct,
    addCategory,
    deleteCategory,
    hasUnsavedChanges,
    saveChanges,
    updateCredentials
  } = useStore();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const categoryImageRef = useRef<HTMLInputElement>(null);
  
  // Settings form
  const [settingsForm, setSettingsForm] = useState({
    currentPassword: '',
    newUsername: '',
    newPassword: '',
    confirmPassword: '',
    showPassword: false,
  });
  
  // Product form state
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    originalPrice: '',
    discount: '',
    category: '',
    subCategory: '',
    description: '',
    image: '',
    inStock: true,
    stockQuantity: '0',
    featured: false,
  });
  
  // Category form state
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    nameEn: '',
    icon: 'Smartphone',
    image: '',
  });
  
  // Redirect if not logged in
  if (!currentUser) {
    navigate('/login');
    return null;
  }
  
  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  // Stats
  const stats = {
    totalProducts: products.length,
    totalValue: products.reduce((sum, p) => sum + p.price, 0),
    inStock: products.filter(p => p.stockQuantity > 0).length,
    featured: products.filter(p => p.featured).length,
    onDiscount: products.filter(p => p.discount && p.discount > 0).length,
  };
  
  const handleLogout = () => {
    logout();
    toast.success('تم تسجيل الخروج');
    navigate('/');
  };
  
  const handleSaveChanges = () => {
    saveChanges();
    toast.success('تم حفظ جميع التغييرات بنجاح');
  };
  
  const resetProductForm = () => {
    setFormData({
      name: '',
      price: '',
      originalPrice: '',
      discount: '',
      category: '',
      subCategory: '',
      description: '',
      image: '',
      inStock: true,
      stockQuantity: '0',
      featured: false,
    });
  };
  
  const resetCategoryForm = () => {
    setCategoryForm({
      name: '',
      nameEn: '',
      icon: 'Smartphone',
      image: '',
    });
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isCategory = false) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isCategory) {
          setCategoryForm({ ...categoryForm, image: reader.result as string });
        } else {
          setFormData({ ...formData, image: reader.result as string });
        }
        toast.success('تم رفع الصورة بنجاح');
      };
      reader.readAsDataURL(file);
    }
  };
  
  const calculateDiscount = () => {
    const price = parseFloat(formData.price);
    const originalPrice = parseFloat(formData.originalPrice);
    if (price && originalPrice && originalPrice > price) {
      const discount = Math.round(((originalPrice - price) / originalPrice) * 100);
      setFormData({ ...formData, discount: discount.toString() });
    }
  };
  
  const handleAddProduct = () => {
    if (!formData.name || !formData.price || !formData.category) {
      toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }
    
    const price = parseFloat(formData.price);
    const originalPrice = formData.originalPrice ? parseFloat(formData.originalPrice) : undefined;
    const discount = formData.discount ? parseInt(formData.discount) : undefined;
    const stockQuantity = parseInt(formData.stockQuantity) || 0;
    
    addProduct({
      name: formData.name,
      price,
      originalPrice,
      discount,
      category: formData.category,
      subCategory: formData.subCategory || formData.category,
      description: formData.description,
      image: formData.image || 'https://via.placeholder.com/400',
      inStock: stockQuantity > 0,
      stockQuantity,
      featured: formData.featured,
    });
    
    toast.success('تم إضافة المنتج بنجاح');
    resetProductForm();
    setIsAddDialogOpen(false);
  };
  
  const handleUpdateProduct = () => {
    if (!editingProduct) return;
    
    const price = parseFloat(formData.price);
    const originalPrice = formData.originalPrice ? parseFloat(formData.originalPrice) : undefined;
    const discount = formData.discount ? parseInt(formData.discount) : undefined;
    const stockQuantity = parseInt(formData.stockQuantity) || 0;
    
    updateProduct(editingProduct.id, {
      name: formData.name,
      price,
      originalPrice,
      discount,
      category: formData.category,
      subCategory: formData.subCategory,
      description: formData.description,
      image: formData.image,
      inStock: stockQuantity > 0,
      stockQuantity,
      featured: formData.featured,
    });
    
    toast.success('تم تحديث المنتج بنجاح');
    setEditingProduct(null);
    resetProductForm();
  };
  
  const handleDeleteProduct = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      deleteProduct(id);
      toast.success('تم حذف المنتج');
    }
  };
  
  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      originalPrice: product.originalPrice?.toString() || '',
      discount: product.discount?.toString() || '',
      category: product.category,
      subCategory: product.subCategory,
      description: product.description,
      image: product.image,
      inStock: product.stockQuantity > 0,
      stockQuantity: product.stockQuantity.toString(),
      featured: product.featured || false,
    });
  };
  
  const handleAddCategory = () => {
    if (!categoryForm.name) {
      toast.error('يرجى إدخال اسم الفئة');
      return;
    }
    
    addCategory({
      name: categoryForm.name,
      nameEn: categoryForm.nameEn || categoryForm.name,
      icon: categoryForm.icon,
      image: categoryForm.image,
      subCategories: [],
    });
    
    toast.success('تم إضافة الفئة بنجاح');
    resetCategoryForm();
    setIsCategoryDialogOpen(false);
  };
  
  const handleUpdateSettings = () => {
    if (settingsForm.newPassword && settingsForm.newPassword !== settingsForm.confirmPassword) {
      toast.error('كلمتا المرور الجديدتان غير متطابقتين');
      return;
    }
    
    const success = updateCredentials(
      settingsForm.currentPassword,
      settingsForm.newUsername,
      settingsForm.newPassword
    );
    
    if (success) {
      toast.success('تم تحديث بيانات الدخول بنجاح');
      setSettingsForm({
        currentPassword: '',
        newUsername: '',
        newPassword: '',
        confirmPassword: '',
        showPassword: false,
      });
      setIsSettingsOpen(false);
    } else {
      toast.error('كلمة المرور الحالية غير صحيحة');
    }
  };

  const selectedCategoryData = categories.find(c => c.id === formData.category);

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-gray-900 border-b border-yellow-500/20 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center border-2 border-black">
                  <img src="/logo.png" alt="تاتشي فون" className="w-6 h-6 object-contain" />
                </div>
                <span className="font-bold text-lg text-white hidden sm:block">لوحة التحكم</span>
              </Link>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Save Changes Button */}
              {hasUnsavedChanges && (
                <Button 
                  onClick={handleSaveChanges}
                  className="gap-2 bg-green-500 text-white hover:bg-green-400"
                >
                  <Save className="w-4 h-4" />
                  حفظ التغييرات
                </Button>
              )}
              
              <span className="text-gray-400 hidden sm:block">
                مرحباً، <span className="text-yellow-400">{currentUser.username}</span>
              </span>
              
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsSettingsOpen(true)}
                className="text-gray-400 hover:text-yellow-400"
              >
                <UserIcon className="w-5 h-5" />
              </Button>
              
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                <LogOut className="w-4 h-4 ml-2" />
                خروج
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">إجمالي المنتجات</p>
                <p className="text-2xl font-black text-white">{stats.totalProducts}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">قيمة المخزون</p>
                <p className="text-2xl font-black text-white">{stats.totalValue.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">المتوفر</p>
                <p className="text-2xl font-black text-white">{stats.inStock}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">منتجات مميزة</p>
                <p className="text-2xl font-black text-white">{stats.featured}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center">
                <Percent className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">بخصم</p>
                <p className="text-2xl font-black text-white">{stats.onDiscount}</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Tabs */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="bg-gray-900 border border-yellow-500/20">
            <TabsTrigger value="products" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
              <Package className="w-4 h-4 ml-2" />
              المنتجات
            </TabsTrigger>
            <TabsTrigger value="categories" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
              <Folder className="w-4 h-4 ml-2" />
              الفئات
            </TabsTrigger>
          </TabsList>
          
          {/* Products Tab */}
          <TabsContent value="products">
            <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
              <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <CardTitle className="text-white">إدارة المنتجات</CardTitle>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="gap-2 bg-yellow-500 text-black hover:bg-yellow-400 font-bold">
                      <Plus className="w-4 h-4" />
                      إضافة منتج
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-900 border-yellow-500/30">
                    <DialogHeader>
                      <DialogTitle className="text-white">إضافة منتج جديد</DialogTitle>
                    </DialogHeader>
                    <ProductForm 
                      formData={formData}
                      setFormData={setFormData}
                      onSubmit={handleAddProduct}
                      onCancel={() => {
                        resetProductForm();
                        setIsAddDialogOpen(false);
                      }}
                      submitLabel="إضافة المنتج"
                      fileInputRef={fileInputRef}
                      onImageUpload={handleImageUpload}
                      calculateDiscount={calculateDiscount}
                      categories={categories}
                      selectedCategoryData={selectedCategoryData}
                    />
                  </DialogContent>
                </Dialog>
              </CardHeader>
              
              <CardContent>
                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <Input
                      placeholder="بحث عن منتج..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pr-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-48 bg-white/5 border-white/10 text-white">
                      <SelectValue placeholder="جميع الأقسام" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-yellow-500/30">
                      <SelectItem value="all">جميع الأقسام</SelectItem>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id} className="text-white">
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Products Table */}
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/10">
                        <TableHead className="text-yellow-400">المنتج</TableHead>
                        <TableHead className="text-yellow-400">القسم</TableHead>
                        <TableHead className="text-yellow-400">السعر</TableHead>
                        <TableHead className="text-yellow-400">المخزون</TableHead>
                        <TableHead className="text-yellow-400">الخصم</TableHead>
                        <TableHead className="text-yellow-400">الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProducts.map((product) => (
                        <TableRow key={product.id} className="border-white/10">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <img 
                                src={product.image} 
                                alt={product.name}
                                className="w-12 h-12 object-cover rounded-lg"
                              />
                              <div>
                                <p className="font-medium text-white">{product.name}</p>
                                {product.featured && (
                                  <Badge className="bg-yellow-500 text-black text-xs">مميز</Badge>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-300">
                            {categories.find(c => c.id === product.category)?.name}
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-bold text-yellow-400">{product.price.toLocaleString()} ر.س</p>
                              {product.originalPrice && (
                                <p className="text-sm text-gray-500 line-through">
                                  {product.originalPrice.toLocaleString()}
                                </p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className={`font-bold ${product.stockQuantity > 0 ? 'text-green-400' : 'text-red-400'}`}>
                              {product.stockQuantity}
                            </span>
                          </TableCell>
                          <TableCell>
                            {product.discount ? (
                              <Badge className="bg-red-500 text-white">
                                <Percent className="w-3 h-3 ml-1" />
                                {product.discount}%
                              </Badge>
                            ) : (
                              <span className="text-gray-500">-</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Dialog open={editingProduct?.id === product.id} onOpenChange={(open) => !open && setEditingProduct(null)}>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={() => openEditDialog(product)}
                                    className="text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/10"
                                  >
                                    <Edit2 className="w-4 h-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-900 border-yellow-500/30">
                                  <DialogHeader>
                                    <DialogTitle className="text-white">تعديل المنتج</DialogTitle>
                                  </DialogHeader>
                                  <ProductForm 
                                    formData={formData}
                                    setFormData={setFormData}
                                    onSubmit={handleUpdateProduct}
                                    onCancel={() => setEditingProduct(null)}
                                    submitLabel="حفظ التغييرات"
                                    fileInputRef={fileInputRef}
                                    onImageUpload={handleImageUpload}
                                    calculateDiscount={calculateDiscount}
                                    categories={categories}
                                    selectedCategoryData={selectedCategoryData}
                                  />
                                </DialogContent>
                              </Dialog>
                              
                              <Button 
                                variant="ghost" 
                                size="icon"
                                className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                onClick={() => handleDeleteProduct(product.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                {filteredProducts.length === 0 && (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                    <p className="text-gray-500">لا توجد منتجات</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Categories Tab */}
          <TabsContent value="categories">
            <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
              <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <CardTitle className="text-white">إدارة الفئات</CardTitle>
                <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="gap-2 bg-yellow-500 text-black hover:bg-yellow-400 font-bold">
                      <Plus className="w-4 h-4" />
                      إضافة فئة
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg bg-gray-900 border-yellow-500/30">
                    <DialogHeader>
                      <DialogTitle className="text-white">إضافة فئة جديدة</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-white mb-2 block">اسم الفئة</Label>
                        <Input
                          value={categoryForm.name}
                          onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                          placeholder="اسم الفئة"
                          className="bg-white/5 border-white/10 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-white mb-2 block">الاسم بالإنجليزية</Label>
                        <Input
                          value={categoryForm.nameEn}
                          onChange={(e) => setCategoryForm({ ...categoryForm, nameEn: e.target.value })}
                          placeholder="Category Name"
                          className="bg-white/5 border-white/10 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-white mb-2 block">الأيقونة</Label>
                        <Select 
                          value={categoryForm.icon} 
                          onValueChange={(v) => setCategoryForm({ ...categoryForm, icon: v })}
                        >
                          <SelectTrigger className="bg-white/5 border-white/10 text-white">
                            <SelectValue placeholder="اختر الأيقونة" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-yellow-500/30">
                            {availableIcons.map((icon) => (
                              <SelectItem key={icon.id} value={icon.id} className="text-white">
                                {icon.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-white mb-2 block">صورة الفئة</Label>
                        <div className="flex items-center gap-4">
                          {categoryForm.image ? (
                            <div className="relative">
                              <img src={categoryForm.image} alt="Preview" className="w-20 h-20 object-cover rounded-lg" />
                              <button
                                onClick={() => setCategoryForm({ ...categoryForm, image: '' })}
                                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ) : (
                            <div 
                              onClick={() => categoryImageRef.current?.click()}
                              className="w-20 h-20 bg-white/5 border-2 border-dashed border-white/20 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-yellow-500 transition-colors"
                            >
                              <ImageIcon className="w-6 h-6 text-gray-500 mb-1" />
                              <span className="text-xs text-gray-500">صورة</span>
                            </div>
                          )}
                          <input
                            ref={categoryImageRef}
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, true)}
                            className="hidden"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => categoryImageRef.current?.click()}
                            className="border-white/20 text-white hover:bg-white/10"
                          >
                            <Upload className="w-4 h-4 ml-2" />
                            رفع صورة
                          </Button>
                        </div>
                      </div>
                      <div className="flex gap-2 pt-4">
                        <Button onClick={handleAddCategory} className="flex-1 bg-yellow-500 text-black hover:bg-yellow-400 font-bold">
                          إضافة الفئة
                        </Button>
                        <Button variant="outline" onClick={() => setIsCategoryDialogOpen(false)} className="border-white/20 text-white hover:bg-white/10">
                          إلغاء
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categories.map((category) => (
                    <Card key={category.id} className="bg-white/5 border-white/10">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          {category.image ? (
                            <img src={category.image} alt={category.name} className="w-16 h-16 object-cover rounded-xl" />
                          ) : (
                            <div className="w-16 h-16 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                              <span className="text-yellow-400 text-2xl">{category.name.charAt(0)}</span>
                            </div>
                          )}
                          <div className="flex-1">
                            <h3 className="font-bold text-white">{category.name}</h3>
                            <p className="text-sm text-gray-400">{category.subCategories.length} قسم فرعي</p>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                            onClick={() => {
                              if (confirm('هل أنت متأكد من حذف هذه الفئة؟')) {
                                deleteCategory(category.id);
                                toast.success('تم حذف الفئة');
                              }
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      {/* Settings Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="max-w-md bg-gray-900 border-yellow-500/30">
          <DialogHeader>
            <DialogTitle className="text-white">إعدادات الحساب</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-white mb-2 block">كلمة المرور الحالية</Label>
              <div className="relative">
                <Input
                  type={settingsForm.showPassword ? 'text' : 'password'}
                  value={settingsForm.currentPassword}
                  onChange={(e) => setSettingsForm({ ...settingsForm, currentPassword: e.target.value })}
                  placeholder="أدخل كلمة المرور الحالية"
                  className="bg-white/5 border-white/10 text-white pr-10"
                />
                <button
                  type="button"
                  onClick={() => setSettingsForm({ ...settingsForm, showPassword: !settingsForm.showPassword })}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-yellow-400"
                >
                  {settingsForm.showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div>
              <Label className="text-white mb-2 block">اسم المستخدم الجديد</Label>
              <Input
                value={settingsForm.newUsername}
                onChange={(e) => setSettingsForm({ ...settingsForm, newUsername: e.target.value })}
                placeholder="اتركه فارغاً للإبقاء على الحالي"
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
            <div>
              <Label className="text-white mb-2 block">كلمة المرور الجديدة</Label>
              <Input
                type="password"
                value={settingsForm.newPassword}
                onChange={(e) => setSettingsForm({ ...settingsForm, newPassword: e.target.value })}
                placeholder="اتركها فارغة للإبقاء على الحالية"
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
            <div>
              <Label className="text-white mb-2 block">تأكيد كلمة المرور الجديدة</Label>
              <Input
                type="password"
                value={settingsForm.confirmPassword}
                onChange={(e) => setSettingsForm({ ...settingsForm, confirmPassword: e.target.value })}
                placeholder="أعد إدخال كلمة المرور الجديدة"
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
            <div className="flex gap-2 pt-4">
              <Button onClick={handleUpdateSettings} className="flex-1 bg-yellow-500 text-black hover:bg-yellow-400 font-bold">
                <Check className="w-4 h-4 ml-2" />
                حفظ التغييرات
              </Button>
              <Button variant="outline" onClick={() => setIsSettingsOpen(false)} className="border-white/20 text-white hover:bg-white/10">
                إلغاء
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Product Form Component
interface ProductFormProps {
  formData: any;
  setFormData: (data: any) => void;
  onSubmit: () => void;
  onCancel: () => void;
  submitLabel: string;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>, isCategory?: boolean) => void;
  calculateDiscount: () => void;
  categories: CategoryInfo[];
  selectedCategoryData?: CategoryInfo;
}

function ProductForm({ formData, setFormData, onSubmit, onCancel, submitLabel, fileInputRef, onImageUpload, calculateDiscount, categories, selectedCategoryData }: ProductFormProps) {
  return (
    <div className="space-y-4">
      {/* Image Upload */}
      <div>
        <Label className="text-white mb-2 block">صورة المنتج</Label>
        <div className="flex items-center gap-4">
          {formData.image ? (
            <div className="relative">
              <img src={formData.image} alt="Preview" className="w-24 h-24 object-cover rounded-lg" />
              <button
                onClick={() => setFormData({ ...formData, image: '' })}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-24 h-24 bg-white/5 border-2 border-dashed border-white/20 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-yellow-500 transition-colors"
            >
              <ImageIcon className="w-8 h-8 text-gray-500 mb-1" />
              <span className="text-xs text-gray-500">اختر صورة</span>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => onImageUpload(e)}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="border-white/20 text-white hover:bg-white/10"
          >
            <Upload className="w-4 h-4 ml-2" />
            رفع من الجوال
          </Button>
        </div>
      </div>
      
      <div>
        <Label className="text-white mb-2 block">اسم المنتج *</Label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="اسم المنتج"
          className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-white mb-2 block">السعر الحالي *</Label>
          <Input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            placeholder="السعر"
            className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
          />
        </div>
        <div>
          <Label className="text-white mb-2 block">السعر قبل الخصم</Label>
          <Input
            type="number"
            value={formData.originalPrice}
            onChange={(e) => {
              setFormData({ ...formData, originalPrice: e.target.value });
              setTimeout(calculateDiscount, 100);
            }}
            placeholder="اختياري"
            className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-white mb-2 block">نسبة الخصم %</Label>
          <Input
            type="number"
            value={formData.discount}
            onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
            placeholder="%"
            className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
          />
        </div>
        <div>
          <Label className="text-white mb-2 block">الكمية في المخزن *</Label>
          <Input
            type="number"
            value={formData.stockQuantity}
            onChange={(e) => setFormData({ ...formData, stockQuantity: e.target.value })}
            placeholder="0"
            className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-white mb-2 block">القسم *</Label>
          <Select 
            value={formData.category} 
            onValueChange={(v) => setFormData({ ...formData, category: v, subCategory: '' })}
          >
            <SelectTrigger className="bg-white/5 border-white/10 text-white">
              <SelectValue placeholder="اختر القسم" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-yellow-500/30">
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id} className="text-white">
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-white mb-2 block">القسم الفرعي</Label>
          <Select 
            value={formData.subCategory} 
            onValueChange={(v) => setFormData({ ...formData, subCategory: v })}
            disabled={!selectedCategoryData}
          >
            <SelectTrigger className="bg-white/5 border-white/10 text-white">
              <SelectValue placeholder="اختر القسم الفرعي" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-yellow-500/30">
              {selectedCategoryData?.subCategories.map((sub) => (
                <SelectItem key={sub.id} value={sub.id} className="text-white">
                  {sub.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div>
        <Label className="text-white mb-2 block">وصف المنتج</Label>
        <Input
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="وصف قصير للمنتج"
          className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
        />
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <Switch
            id="featured"
            checked={formData.featured}
            onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
            className="data-[state=checked]:bg-yellow-500"
          />
          <Label htmlFor="featured" className="text-white mb-0">منتج مميز</Label>
        </div>
      </div>
      
      <div className="flex gap-2 pt-4">
        <Button onClick={onSubmit} className="flex-1 bg-yellow-500 text-black hover:bg-yellow-400 font-bold">
          {submitLabel}
        </Button>
        <Button variant="outline" onClick={onCancel} className="border-white/20 text-white hover:bg-white/10">
          إلغاء
        </Button>
      </div>
    </div>
  );
}
