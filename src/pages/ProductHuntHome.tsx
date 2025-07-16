import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { 
  Search, 
  TrendingUp, 
  Calendar, 
  Users, 
  Star, 
  MessageCircle, 
  ExternalLink,
  ChevronUp,
  Filter,
  Trophy,
  Zap,
  Rocket,
  Plus,
  Heart,
  Share2,
  Bookmark,
  Eye,
  Clock,
  Award,
  Flame,
  Target
} from 'lucide-react';
import { toast } from '../hooks/use-toast';

interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  website_url: string;
  logo_url: string;
  gallery_images: string[];
  category: string;
  maker_name: string;
  maker_avatar: string;
  maker_twitter?: string;
  upvotes: number;
  comments: number;
  featured: boolean;
  approved: boolean;
  launch_date: string;
  hasUpvoted?: boolean;
  views: number;
  rank?: number;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

const ProductHuntHome: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('trending');
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    tagline: '',
    description: '',
    website_url: '',
    logo_url: '',
    category: '',
    maker_name: '',
    maker_twitter: ''
  });

  // Enhanced categories with colors
  const categories: Category[] = [
    { id: 'all', name: 'All', icon: '🚀', color: '#FF6154' },
    { id: 'ai-ml', name: 'AI & ML', icon: '🤖', color: '#00D9FF' },
    { id: 'productivity', name: 'Productivity', icon: '⚡', color: '#FFD700' },
    { id: 'design', name: 'Design', icon: '🎨', color: '#FF69B4' },
    { id: 'developer-tools', name: 'Developer Tools', icon: '⚙️', color: '#32CD32' },
    { id: 'marketing', name: 'Marketing', icon: '📈', color: '#FF4500' },
    { id: 'finance', name: 'Finance', icon: '💰', color: '#228B22' },
    { id: 'health-fitness', name: 'Health & Fitness', icon: '💪', color: '#FF1493' },
    { id: 'education', name: 'Education', icon: '📚', color: '#4169E1' },
    { id: 'social', name: 'Social', icon: '👥', color: '#9370DB' }
  ];

  // Enhanced mock data with more realistic products
  const mockProducts: Product[] = useMemo(() => [
    {
      id: '1',
      name: 'WebSecure Pro',
      tagline: 'Complete website security scanner',
      description: 'Scan any website for security vulnerabilities, SEO issues, and performance problems. Get detailed reports with actionable insights.',
      website_url: 'https://websecure.pro',
      logo_url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=100&h=100&fit=crop&crop=center',
      gallery_images: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop'
      ],
      category: 'developer-tools',
      maker_name: 'Alex Chen',
      maker_avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      maker_twitter: '@alexchen',
      upvotes: 247,
      comments: 23,
      featured: true,
      approved: true,
      launch_date: '2024-01-15',
      hasUpvoted: false,
      views: 1250,
      rank: 1
    },
    {
      id: '2',
      name: 'AI Content Studio',
      tagline: 'Create stunning content with AI',
      description: 'Generate blog posts, social media content, and marketing copy using advanced AI. Save hours of writing time.',
      website_url: 'https://aicontentstudio.com',
      logo_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=100&h=100&fit=crop&crop=center',
      gallery_images: [
        'https://images.unsplash.com/photo-1555421689-491a97ff2040?w=800&h=400&fit=crop',
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop'
      ],
      category: 'ai-ml',
      maker_name: 'Sarah Johnson',
      maker_avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9c5e8e1?w=40&h=40&fit=crop&crop=face',
      maker_twitter: '@sarahj',
      upvotes: 189,
      comments: 31,
      featured: false,
      approved: true,
      launch_date: '2024-01-14',
      hasUpvoted: true,
      views: 890,
      rank: 2
    },
    {
      id: '3',
      name: 'TaskFlow Pro',
      tagline: 'Project management reimagined',
      description: 'Streamline your workflow with intelligent task management and team collaboration tools.',
      website_url: 'https://taskflowpro.com',
      logo_url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop&crop=center',
      gallery_images: [
        'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop',
        'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop'
      ],
      category: 'productivity',
      maker_name: 'Mike Rodriguez',
      maker_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      maker_twitter: '@mikero',
      upvotes: 156,
      comments: 18,
      featured: true,
      approved: true,
      launch_date: '2024-01-13',
      hasUpvoted: false,
      views: 670,
      rank: 3
    },
    {
      id: '4',
      name: 'DesignKit Pro',
      tagline: 'Professional design system builder',
      description: 'Build consistent design systems with reusable components, tokens, and documentation.',
      website_url: 'https://designkit.pro',
      logo_url: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=100&h=100&fit=crop&crop=center',
      gallery_images: [
        'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop',
        'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&h=400&fit=crop'
      ],
      category: 'design',
      maker_name: 'Emma Wilson',
      maker_avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      maker_twitter: '@emmaw',
      upvotes: 134,
      comments: 12,
      featured: false,
      approved: true,
      launch_date: '2024-01-12',
      hasUpvoted: false,
      views: 520,
      rank: 4
    },
    {
      id: '5',
      name: 'MarketBoost',
      tagline: 'Growth marketing automation',
      description: 'Automate your marketing campaigns with AI-powered insights and multi-channel optimization.',
      website_url: 'https://marketboost.io',
      logo_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=100&fit=crop&crop=center',
      gallery_images: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
        'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&h=400&fit=crop'
      ],
      category: 'marketing',
      maker_name: 'David Kim',
      maker_avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
      maker_twitter: '@davidkim',
      upvotes: 98,
      comments: 8,
      featured: false,
      approved: true,
      launch_date: '2024-01-11',
      hasUpvoted: false,
      views: 340,
      rank: 5
    }
  ], []);

  useEffect(() => {
    setProducts(mockProducts);
    setFeaturedProducts(mockProducts.filter(p => p.featured));
  }, [mockProducts]);

  const handleUpvote = (productId: string) => {
    setProducts(products.map(product => 
      product.id === productId 
        ? { 
            ...product, 
            upvotes: product.hasUpvoted ? product.upvotes - 1 : product.upvotes + 1,
            hasUpvoted: !product.hasUpvoted 
          }
        : product
    ));
    
    toast({
      title: products.find(p => p.id === productId)?.hasUpvoted ? "Upvote removed" : "Upvoted!",
      description: products.find(p => p.id === productId)?.hasUpvoted ? "You removed your upvote" : "Thanks for supporting this product",
    });
  };

  const handleSubmitProduct = () => {
    if (!newProduct.name || !newProduct.tagline || !newProduct.website_url) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const product: Product = {
      id: Date.now().toString(),
      ...newProduct,
      logo_url: newProduct.logo_url || 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=100&h=100&fit=crop&crop=center',
      gallery_images: [],
      maker_avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      upvotes: 1,
      comments: 0,
      featured: false,
      approved: false,
      launch_date: new Date().toISOString().split('T')[0],
      hasUpvoted: true,
      views: 1
    };

    setProducts([product, ...products]);
    setShowSubmitDialog(false);
    setNewProduct({
      name: '',
      tagline: '',
      description: '',
      website_url: '',
      logo_url: '',
      category: '',
      maker_name: '',
      maker_twitter: ''
    });

    toast({
      title: "Product submitted!",
      description: "Your product is pending approval and will appear soon.",
    });
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory && product.approved;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.launch_date).getTime() - new Date(a.launch_date).getTime();
      case 'most-upvoted':
        return b.upvotes - a.upvotes;
      default: // trending
        return (b.upvotes * 0.7 + b.views * 0.3) - (a.upvotes * 0.7 + a.views * 0.3);
    }
  });

  const ProductCard: React.FC<{ product: Product; featured?: boolean; showRank?: boolean }> = ({ 
    product, 
    featured = false, 
    showRank = false 
  }) => (
    <Card className={`group hover:shadow-xl transition-all duration-300 ${
      featured 
        ? 'border-orange-200 bg-gradient-to-r from-orange-50 to-pink-50 shadow-lg' 
        : 'hover:border-gray-300 hover:-translate-y-1'
    }`}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {/* Rank Number */}
          {showRank && product.rank && (
            <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-600 text-sm">
              {product.rank}
            </div>
          )}

          {/* Product Logo */}
          <div className="flex-shrink-0">
            <img 
              src={product.logo_url} 
              alt={product.name}
              className="w-16 h-16 rounded-xl object-cover border-2 border-gray-100 group-hover:border-orange-200 transition-colors"
            />
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-lg text-gray-900 group-hover:text-orange-600 transition-colors">
                    {product.name}
                  </h3>
                  {featured && (
                    <Badge className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs">
                      <Trophy className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                </div>
                
                <p className="text-gray-600 text-sm mt-1 leading-relaxed line-clamp-2">
                  {product.tagline}
                </p>
                
                <div className="flex items-center gap-3 mt-3">
                  <Badge 
                    variant="secondary" 
                    className="text-xs"
                    style={{ 
                      backgroundColor: categories.find(c => c.id === product.category)?.color + '20',
                      color: categories.find(c => c.id === product.category)?.color 
                    }}
                  >
                    {categories.find(c => c.id === product.category)?.icon} {categories.find(c => c.id === product.category)?.name}
                  </Badge>
                  
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      {product.comments}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {product.views}
                    </div>
                  </div>
                </div>
              </div>

              {/* Upvote Button */}
              <div className="flex flex-col items-center ml-4">
                <Button
                  variant={product.hasUpvoted ? "default" : "outline"}
                  size="sm"
                  className={`flex flex-col h-auto py-2 px-3 min-w-[60px] transition-all duration-200 ${
                    product.hasUpvoted 
                      ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg' 
                      : 'hover:bg-orange-50 hover:border-orange-300 hover:shadow-md'
                  }`}
                  onClick={() => handleUpvote(product.id)}
                >
                  <ChevronUp className="w-4 h-4" />
                  <span className="text-xs font-semibold mt-1">{product.upvotes}</span>
                </Button>
              </div>
            </div>

            {/* Maker Info & Actions */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage src={product.maker_avatar} />
                  <AvatarFallback>{product.maker_name[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm text-gray-600">by {product.maker_name}</span>
                {product.maker_twitter && (
                  <span className="text-xs text-blue-500">{product.maker_twitter}</span>
                )}
              </div>
              
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-orange-600 p-1">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-orange-600 p-1">
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-orange-600 p-1">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Rocket className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl text-gray-900">ProductHunt</span>
              </div>
              
              <nav className="hidden md:flex items-center gap-6">
                <Button variant="ghost" className="text-gray-600 hover:text-gray-900 font-medium">
                  Products
                </Button>
                <Button variant="ghost" className="text-gray-600 hover:text-gray-900 font-medium">
                  Makers
                </Button>
                <Button variant="ghost" className="text-gray-600 hover:text-gray-900 font-medium">
                  Stories
                </Button>
                <Button variant="ghost" className="text-gray-600 hover:text-gray-900 font-medium">
                  Jobs
                </Button>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="hidden sm:flex items-center gap-2 hover:bg-orange-50 hover:border-orange-300">
                    <Plus className="w-4 h-4" />
                    Submit
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Rocket className="w-5 h-5 text-orange-500" />
                      Submit Your Product
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Product Name *</Label>
                        <Input
                          id="name"
                          value={newProduct.name}
                          onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                          placeholder="My Awesome Product"
                        />
                      </div>
                      <div>
                        <Label htmlFor="website">Website URL *</Label>
                        <Input
                          id="website"
                          value={newProduct.website_url}
                          onChange={(e) => setNewProduct({...newProduct, website_url: e.target.value})}
                          placeholder="https://myproduct.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="tagline">Tagline *</Label>
                      <Input
                        id="tagline"
                        value={newProduct.tagline}
                        onChange={(e) => setNewProduct({...newProduct, tagline: e.target.value})}
                        placeholder="A brief, catchy description of your product"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                        placeholder="Tell us more about your product..."
                        rows={3}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select value={newProduct.category} onValueChange={(value) => setNewProduct({...newProduct, category: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.filter(c => c.id !== 'all').map(category => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.icon} {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="logo">Logo URL</Label>
                        <Input
                          id="logo"
                          value={newProduct.logo_url}
                          onChange={(e) => setNewProduct({...newProduct, logo_url: e.target.value})}
                          placeholder="https://example.com/logo.png"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="maker">Maker Name</Label>
                        <Input
                          id="maker"
                          value={newProduct.maker_name}
                          onChange={(e) => setNewProduct({...newProduct, maker_name: e.target.value})}
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="twitter">Twitter Handle</Label>
                        <Input
                          id="twitter"
                          value={newProduct.maker_twitter}
                          onChange={(e) => setNewProduct({...newProduct, maker_twitter: e.target.value})}
                          placeholder="@username"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-2 pt-4">
                      <Button variant="outline" onClick={() => setShowSubmitDialog(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSubmitProduct} className="bg-orange-500 hover:bg-orange-600">
                        Submit Product
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Button className="bg-orange-500 hover:bg-orange-600 shadow-lg">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Award className="w-8 h-8 text-yellow-300" />
            <span className="text-lg font-semibold text-yellow-300">Today's Top Products</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Discover the best<br />new products
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-orange-100 max-w-3xl mx-auto">
            Every day, we surface the most innovative products for you to discover, upvote, and share with the world
          </p>
          
          <div className="flex items-center justify-center gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search products, makers, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-gray-900 bg-white border-0 shadow-lg"
              />
            </div>
            <Button size="lg" variant="secondary" className="h-12 px-8 shadow-lg hover:shadow-xl">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-orange-100">
            <div className="flex items-center gap-1">
              <Flame className="w-4 h-4" />
              <span>247 products launched today</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>12.5K makers</span>
            </div>
            <div className="flex items-center gap-1">
              <Target className="w-4 h-4" />
              <span>1.2M upvotes this month</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Products */}
        {featuredProducts.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Trophy className="w-6 h-6 text-orange-500" />
                <h2 className="text-2xl font-bold text-gray-900">Featured Today</h2>
                <Badge className="bg-gradient-to-r from-orange-500 to-pink-500 text-white">
                  {featuredProducts.length} products
                </Badge>
              </div>
              <Button variant="ghost" className="text-orange-600 hover:text-orange-700">
                View all featured →
              </Button>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} featured />
              ))}
            </div>
          </section>
        )}

        {/* Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 p-4 bg-white rounded-lg shadow-sm border">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <span className="font-medium text-gray-700">Categories:</span>
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {categories.map(category => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  className={`whitespace-nowrap transition-all duration-200 ${
                    selectedCategory === category.id 
                      ? 'bg-orange-500 hover:bg-orange-600 shadow-md' 
                      : 'hover:bg-orange-50 hover:border-orange-300'
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <span className="mr-1">{category.icon}</span>
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-gray-500" />
              <span className="font-medium text-gray-700">Sort by:</span>
            </div>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
            >
              <option value="trending">🔥 Trending</option>
              <option value="newest">🆕 Newest</option>
              <option value="most-upvoted">⬆️ Most Upvoted</option>
            </select>
          </div>
        </div>

        {/* Products List */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-orange-500" />
              <h2 className="text-2xl font-bold text-gray-900">Today's Products</h2>
              <Badge variant="secondary" className="ml-2">
                {sortedProducts.length} products
              </Badge>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>Updated 2 minutes ago</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {sortedProducts.map((product, index) => (
              <div key={product.id} className="relative">
                <ProductCard product={{...product, rank: index + 1}} showRank />
              </div>
            ))}
          </div>
          
          {sortedProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          )}
        </section>

        {/* Load More */}
        {sortedProducts.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="hover:bg-orange-50 hover:border-orange-300">
              Load More Products
            </Button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-orange-600 transition-colors">Browse</a></li>
                <li><a href="#" className="hover:text-orange-600 transition-colors">Submit</a></li>
                <li><a href="#" className="hover:text-orange-600 transition-colors">Newsletter</a></li>
                <li><a href="#" className="hover:text-orange-600 transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Community</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-orange-600 transition-colors">Makers</a></li>
                <li><a href="#" className="hover:text-orange-600 transition-colors">Stories</a></li>
                <li><a href="#" className="hover:text-orange-600 transition-colors">Discussions</a></li>
                <li><a href="#" className="hover:text-orange-600 transition-colors">Events</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-orange-600 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-orange-600 transition-colors">Jobs</a></li>
                <li><a href="#" className="hover:text-orange-600 transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-orange-600 transition-colors">Brand</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-orange-600 transition-colors">Help</a></li>
                <li><a href="#" className="hover:text-orange-600 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-orange-600 transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-orange-600 transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-pink-500 rounded flex items-center justify-center">
                <Rocket className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-gray-900">ProductHunt</span>
              <span className="text-gray-500">© 2024</span>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>Made with ❤️ for makers</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductHuntHome;