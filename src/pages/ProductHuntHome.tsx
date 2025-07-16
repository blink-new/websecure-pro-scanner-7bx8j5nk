import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
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
  Rocket
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  website_url: string;
  logo_url: string;
  category: string;
  maker_name: string;
  maker_avatar: string;
  upvotes: number;
  comments: number;
  featured: boolean;
  launch_date: string;
  hasUpvoted?: boolean;
}

const ProductHuntHome: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('trending');

  // Mock data - replace with real API calls
  const mockProducts: Product[] = useMemo(() => [
    {
      id: '1',
      name: 'WebSecure Pro',
      tagline: 'Complete website security scanner',
      description: 'Scan any website for security vulnerabilities, SEO issues, and performance problems.',
      website_url: 'https://websecure.pro',
      logo_url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=100&h=100&fit=crop&crop=center',
      category: 'Developer Tools',
      maker_name: 'Alex Chen',
      maker_avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      upvotes: 247,
      comments: 23,
      featured: true,
      launch_date: '2024-01-15',
      hasUpvoted: false
    },
    {
      id: '2',
      name: 'AI Content Studio',
      tagline: 'Create stunning content with AI',
      description: 'Generate blog posts, social media content, and marketing copy using advanced AI.',
      website_url: 'https://aicontentstudio.com',
      logo_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=100&h=100&fit=crop&crop=center',
      category: 'AI & Machine Learning',
      maker_name: 'Sarah Johnson',
      maker_avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9c5e8e1?w=40&h=40&fit=crop&crop=face',
      upvotes: 189,
      comments: 31,
      featured: false,
      launch_date: '2024-01-14',
      hasUpvoted: true
    },
    {
      id: '3',
      name: 'TaskFlow Pro',
      tagline: 'Project management reimagined',
      description: 'Streamline your workflow with intelligent task management and team collaboration.',
      website_url: 'https://taskflowpro.com',
      logo_url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop&crop=center',
      category: 'Productivity',
      maker_name: 'Mike Rodriguez',
      maker_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      upvotes: 156,
      comments: 18,
      featured: true,
      launch_date: '2024-01-13',
      hasUpvoted: false
    }
  ], []);

  const categories = [
    { id: 'all', name: 'All', icon: '🚀' },
    { id: 'ai', name: 'AI & ML', icon: '🤖' },
    { id: 'productivity', name: 'Productivity', icon: '⚡' },
    { id: 'design', name: 'Design', icon: '🎨' },
    { id: 'developer', name: 'Developer Tools', icon: '⚙️' },
    { id: 'marketing', name: 'Marketing', icon: '📈' },
    { id: 'finance', name: 'Finance', icon: '💰' }
  ];

  useEffect(() => {
    // Simulate API call
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
  };

  const ProductCard: React.FC<{ product: Product; featured?: boolean }> = ({ product, featured = false }) => (
    <Card className={`group hover:shadow-lg transition-all duration-200 ${featured ? 'border-orange-200 bg-gradient-to-r from-orange-50 to-pink-50' : 'hover:border-gray-300'}`}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {/* Product Logo */}
          <div className="flex-shrink-0">
            <img 
              src={product.logo_url} 
              alt={product.name}
              className="w-16 h-16 rounded-xl object-cover border-2 border-gray-100"
            />
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 group-hover:text-orange-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                  {product.tagline}
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <Badge variant="secondary" className="text-xs">
                    {product.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <MessageCircle className="w-3 h-3" />
                    {product.comments}
                  </div>
                </div>
              </div>

              {/* Upvote Button */}
              <div className="flex flex-col items-center ml-4">
                <Button
                  variant={product.hasUpvoted ? "default" : "outline"}
                  size="sm"
                  className={`flex flex-col h-auto py-2 px-3 min-w-[60px] ${
                    product.hasUpvoted 
                      ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                      : 'hover:bg-orange-50 hover:border-orange-300'
                  }`}
                  onClick={() => handleUpvote(product.id)}
                >
                  <ChevronUp className="w-4 h-4" />
                  <span className="text-xs font-semibold mt-1">{product.upvotes}</span>
                </Button>
              </div>
            </div>

            {/* Maker Info */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage src={product.maker_avatar} />
                  <AvatarFallback>{product.maker_name[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm text-gray-600">by {product.maker_name}</span>
              </div>
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-orange-600">
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
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
                <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                  Products
                </Button>
                <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                  Makers
                </Button>
                <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                  Stories
                </Button>
                <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                  Jobs
                </Button>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="outline" className="hidden sm:flex">
                Submit
              </Button>
              <Button className="bg-orange-500 hover:bg-orange-600">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-pink-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Discover the best new products
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-orange-100">
            Every day, we surface the most innovative products for you to discover
          </p>
          <div className="flex items-center justify-center gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-gray-900 bg-white border-0"
              />
            </div>
            <Button size="lg" variant="secondary" className="h-12 px-8">
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Products */}
        {featuredProducts.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Trophy className="w-6 h-6 text-orange-500" />
              <h2 className="text-2xl font-bold text-gray-900">Featured Today</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} featured />
              ))}
            </div>
          </section>
        )}

        {/* Filters */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
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
                  className={`whitespace-nowrap ${
                    selectedCategory === category.id 
                      ? 'bg-orange-500 hover:bg-orange-600' 
                      : 'hover:bg-orange-50'
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <span className="mr-1">{category.icon}</span>
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-gray-500" />
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="trending">Trending</option>
              <option value="newest">Newest</option>
              <option value="most-upvoted">Most Upvoted</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Zap className="w-6 h-6 text-orange-500" />
            <h2 className="text-2xl font-bold text-gray-900">Today's Products</h2>
            <Badge variant="secondary" className="ml-2">
              {products.length} products
            </Badge>
          </div>
          
          <div className="space-y-4">
            {products.map((product, index) => (
              <div key={product.id} className="flex items-center gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-semibold text-gray-600">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <ProductCard product={product} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="hover:bg-orange-50">
            Load More Products
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-orange-600">Browse</a></li>
                <li><a href="#" className="hover:text-orange-600">Submit</a></li>
                <li><a href="#" className="hover:text-orange-600">Newsletter</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Community</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-orange-600">Makers</a></li>
                <li><a href="#" className="hover:text-orange-600">Stories</a></li>
                <li><a href="#" className="hover:text-orange-600">Discussions</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-orange-600">About</a></li>
                <li><a href="#" className="hover:text-orange-600">Jobs</a></li>
                <li><a href="#" className="hover:text-orange-600">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-orange-600">Help</a></li>
                <li><a href="#" className="hover:text-orange-600">Privacy</a></li>
                <li><a href="#" className="hover:text-orange-600">Terms</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductHuntHome;