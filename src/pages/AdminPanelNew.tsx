import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Progress } from '../components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Switch } from '../components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { 
  Shield, 
  Users, 
  Activity, 
  AlertTriangle, 
  TrendingUp, 
  Settings, 
  Search, 
  Filter,
  Eye,
  EyeOff,
  Check,
  X,
  Edit,
  Trash2,
  Star,
  Trophy,
  MessageCircle,
  ExternalLink,
  Calendar,
  BarChart3,
  UserCheck,
  UserX,
  Flag,
  Crown,
  Zap,
  Target,
  Globe,
  Mail,
  Bell,
  Database,
  Server,
  Cpu,
  HardDrive,
  Wifi,
  RefreshCw,
  Download,
  Upload,
  FileText,
  Image,
  Video,
  Link,
  Hash,
  Clock,
  ChevronRight,
  Plus,
  Minus
} from 'lucide-react';
import { toast } from '../hooks/use-toast';

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
  views: number;
  featured: boolean;
  approved: boolean;
  launch_date: string;
  created_at: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  plan: 'free' | 'pro' | 'enterprise';
  products_count: number;
  upvotes_given: number;
  joined: string;
  last_active: string;
  status: 'active' | 'suspended' | 'banned';
  verified: boolean;
}

interface AdminSettings {
  daily_featured_limit: number;
  auto_approve_products: boolean;
  min_upvotes_trending: number;
  submission_cooldown_hours: number;
  enable_comments: boolean;
  enable_notifications: boolean;
  maintenance_mode: boolean;
}

const AdminPanelNew: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('overview');
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [settings, setSettings] = useState<AdminSettings>({
    daily_featured_limit: 3,
    auto_approve_products: false,
    min_upvotes_trending: 10,
    submission_cooldown_hours: 24,
    enable_comments: true,
    enable_notifications: true,
    maintenance_mode: false
  });

  // Mock data
  const stats = {
    totalUsers: 2547,
    activeUsers: 1234,
    totalProducts: 856,
    pendingProducts: 23,
    totalUpvotes: 45623,
    avgTrustScore: 78,
    criticalIssues: 3,
    revenue: 12450,
    dailyActiveUsers: 456,
    conversionRate: 3.2,
    serverUptime: 99.9,
    apiResponseTime: 245
  };

  const mockProducts: Product[] = useMemo(() => [
    {
      id: '1',
      name: 'WebSecure Pro',
      tagline: 'Complete website security scanner',
      description: 'Scan any website for security vulnerabilities, SEO issues, and performance problems.',
      website_url: 'https://websecure.pro',
      logo_url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=100&h=100&fit=crop&crop=center',
      category: 'developer-tools',
      maker_name: 'Alex Chen',
      maker_avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      upvotes: 247,
      comments: 23,
      views: 1250,
      featured: true,
      approved: true,
      launch_date: '2024-01-15',
      created_at: '2024-01-15T10:30:00Z',
      status: 'approved'
    },
    {
      id: '2',
      name: 'AI Content Studio',
      tagline: 'Create stunning content with AI',
      description: 'Generate blog posts, social media content, and marketing copy using advanced AI.',
      website_url: 'https://aicontentstudio.com',
      logo_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=100&h=100&fit=crop&crop=center',
      category: 'ai-ml',
      maker_name: 'Sarah Johnson',
      maker_avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9c5e8e1?w=40&h=40&fit=crop&crop=face',
      upvotes: 189,
      comments: 31,
      views: 890,
      featured: false,
      approved: true,
      launch_date: '2024-01-14',
      created_at: '2024-01-14T14:20:00Z',
      status: 'approved'
    },
    {
      id: '3',
      name: 'TaskFlow Pro',
      tagline: 'Project management reimagined',
      description: 'Streamline your workflow with intelligent task management and team collaboration.',
      website_url: 'https://taskflowpro.com',
      logo_url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop&crop=center',
      category: 'productivity',
      maker_name: 'Mike Rodriguez',
      maker_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      upvotes: 156,
      comments: 18,
      views: 670,
      featured: false,
      approved: false,
      launch_date: '2024-01-13',
      created_at: '2024-01-13T09:15:00Z',
      status: 'pending'
    }
  ], []);

  const mockUsers: User[] = useMemo(() => [
    {
      id: '1',
      email: 'alex@example.com',
      name: 'Alex Chen',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      plan: 'pro',
      products_count: 3,
      upvotes_given: 145,
      joined: '2024-01-01',
      last_active: '2024-01-15T10:30:00Z',
      status: 'active',
      verified: true
    },
    {
      id: '2',
      email: 'sarah@company.com',
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9c5e8e1?w=40&h=40&fit=crop&crop=face',
      plan: 'enterprise',
      products_count: 5,
      upvotes_given: 289,
      joined: '2023-12-15',
      last_active: '2024-01-14T16:45:00Z',
      status: 'active',
      verified: true
    },
    {
      id: '3',
      email: 'mike@startup.io',
      name: 'Mike Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      plan: 'free',
      products_count: 1,
      upvotes_given: 23,
      joined: '2024-01-10',
      last_active: '2024-01-13T12:20:00Z',
      status: 'active',
      verified: false
    }
  ], []);

  useEffect(() => {
    setProducts(mockProducts);
    setUsers(mockUsers);
  }, [mockProducts, mockUsers]);

  const handleApproveProduct = (productId: string) => {
    setProducts(products.map(product => 
      product.id === productId 
        ? { ...product, approved: true, status: 'approved' as const }
        : product
    ));
    toast({
      title: "Product approved",
      description: "The product is now live and visible to users.",
    });
  };

  const handleRejectProduct = (productId: string) => {
    setProducts(products.map(product => 
      product.id === productId 
        ? { ...product, approved: false, status: 'rejected' as const }
        : product
    ));
    toast({
      title: "Product rejected",
      description: "The product has been rejected and is not visible to users.",
      variant: "destructive"
    });
  };

  const handleFeatureProduct = (productId: string) => {
    setProducts(products.map(product => 
      product.id === productId 
        ? { ...product, featured: !product.featured }
        : product
    ));
    toast({
      title: products.find(p => p.id === productId)?.featured ? "Product unfeatured" : "Product featured",
      description: products.find(p => p.id === productId)?.featured ? "Product removed from featured section" : "Product added to featured section",
    });
  };

  const handleSuspendUser = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'suspended' ? 'active' : 'suspended' as const }
        : user
    ));
    toast({
      title: users.find(u => u.id === userId)?.status === 'suspended' ? "User reactivated" : "User suspended",
      description: users.find(u => u.id === userId)?.status === 'suspended' ? "User can now access the platform" : "User access has been restricted",
    });
  };

  const handleVerifyUser = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, verified: !user.verified }
        : user
    ));
    toast({
      title: users.find(u => u.id === userId)?.verified ? "User unverified" : "User verified",
      description: users.find(u => u.id === userId)?.verified ? "Verification badge removed" : "Verification badge added",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Approved</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Rejected</Badge>;
      case 'active':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>;
      case 'suspended':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Suspended</Badge>;
      case 'banned':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Banned</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case 'enterprise':
        return <Badge className="bg-purple-100 text-purple-800 border-purple-200">Enterprise</Badge>;
      case 'pro':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Pro</Badge>;
      default:
        return <Badge variant="outline">Free</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
                <p className="text-xs text-gray-500">ProductHunt Management</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-600">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Users</p>
                  <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
                </div>
                <Users className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Products</p>
                  <p className="text-2xl font-bold">{stats.totalProducts}</p>
                </div>
                <Target className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Pending</p>
                  <p className="text-2xl font-bold">{stats.pendingProducts}</p>
                </div>
                <Clock className="w-8 h-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Upvotes</p>
                  <p className="text-2xl font-bold">{stats.totalUpvotes.toLocaleString()}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-pink-500 to-pink-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-pink-100 text-sm">Revenue</p>
                  <p className="text-2xl font-bold">${stats.revenue.toLocaleString()}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-pink-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-indigo-100 text-sm">Uptime</p>
                  <p className="text-2xl font-bold">{stats.serverUptime}%</p>
                </div>
                <Server className="w-8 h-8 text-indigo-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:w-[800px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="moderation">Moderation</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-500" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {products.slice(0, 5).map((product) => (
                    <div key={product.id} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                      <img src={product.logo_url} alt={product.name} className="w-8 h-8 rounded" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                        <p className="text-xs text-gray-500">by {product.maker_name}</p>
                      </div>
                      {getStatusBadge(product.status)}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* System Health */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="w-5 h-5 text-green-500" />
                    System Health
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <Cpu className="w-4 h-4" />
                        CPU Usage
                      </span>
                      <span className="text-green-600 font-medium">23%</span>
                    </div>
                    <Progress value={23} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <HardDrive className="w-4 h-4" />
                        Memory
                      </span>
                      <span className="text-yellow-600 font-medium">67%</span>
                    </div>
                    <Progress value={67} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <Database className="w-4 h-4" />
                        Database
                      </span>
                      <span className="text-green-600 font-medium">12%</span>
                    </div>
                    <Progress value={12} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <Wifi className="w-4 h-4" />
                        API Response
                      </span>
                      <span className="text-green-600 font-medium">{stats.apiResponseTime}ms</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-orange-500" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Check className="w-4 h-4 mr-2" />
                    Approve Pending Products ({stats.pendingProducts})
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Trophy className="w-4 h-4 mr-2" />
                    Feature Product
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Newsletter
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh Cache
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Product Management</h2>
                <p className="text-gray-600">Manage product submissions, approvals, and features</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input 
                    placeholder="Search products..." 
                    className="pl-9 w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <th className="text-left p-4 font-medium text-gray-900">Product</th>
                        <th className="text-left p-4 font-medium text-gray-900">Maker</th>
                        <th className="text-left p-4 font-medium text-gray-900">Stats</th>
                        <th className="text-left p-4 font-medium text-gray-900">Status</th>
                        <th className="text-left p-4 font-medium text-gray-900">Date</th>
                        <th className="text-left p-4 font-medium text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <img src={product.logo_url} alt={product.name} className="w-10 h-10 rounded-lg" />
                              <div>
                                <div className="font-medium text-gray-900">{product.name}</div>
                                <div className="text-sm text-gray-500 line-clamp-1">{product.tagline}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Avatar className="w-6 h-6">
                                <AvatarImage src={product.maker_avatar} />
                                <AvatarFallback>{product.maker_name[0]}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm">{product.maker_name}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" />
                                {product.upvotes}
                              </span>
                              <span className="flex items-center gap-1">
                                <MessageCircle className="w-3 h-3" />
                                {product.comments}
                              </span>
                              <span className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                {product.views}
                              </span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              {getStatusBadge(product.status)}
                              {product.featured && (
                                <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                                  <Star className="w-3 h-3 mr-1" />
                                  Featured
                                </Badge>
                              )}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="text-sm text-gray-600">
                              {new Date(product.created_at).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-1">
                              {!product.approved && (
                                <>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleApproveProduct(product.id)}
                                    className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                  >
                                    <Check className="w-4 h-4" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleRejectProduct(product.id)}
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                </>
                              )}
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleFeatureProduct(product.id)}
                                className={`${product.featured ? 'text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50' : 'text-gray-600 hover:text-gray-700'}`}
                              >
                                <Star className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-700">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
                <p className="text-gray-600">Manage user accounts, plans, and permissions</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input 
                    placeholder="Search users..." 
                    className="pl-9 w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <th className="text-left p-4 font-medium text-gray-900">User</th>
                        <th className="text-left p-4 font-medium text-gray-900">Plan</th>
                        <th className="text-left p-4 font-medium text-gray-900">Activity</th>
                        <th className="text-left p-4 font-medium text-gray-900">Status</th>
                        <th className="text-left p-4 font-medium text-gray-900">Joined</th>
                        <th className="text-left p-4 font-medium text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="w-10 h-10">
                                <AvatarImage src={user.avatar} />
                                <AvatarFallback>{user.name[0]}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-gray-900">{user.name}</span>
                                  {user.verified && (
                                    <Crown className="w-4 h-4 text-yellow-500" />
                                  )}
                                </div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            {getPlanBadge(user.plan)}
                          </td>
                          <td className="p-4">
                            <div className="text-sm text-gray-600">
                              <div>{user.products_count} products</div>
                              <div>{user.upvotes_given} upvotes given</div>
                            </div>
                          </td>
                          <td className="p-4">
                            {getStatusBadge(user.status)}
                          </td>
                          <td className="p-4">
                            <div className="text-sm text-gray-600">
                              <div>{new Date(user.joined).toLocaleDateString()}</div>
                              <div className="text-xs text-gray-400">
                                Last: {new Date(user.last_active).toLocaleDateString()}
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-1">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleVerifyUser(user.id)}
                                className={`${user.verified ? 'text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50' : 'text-gray-600 hover:text-gray-700'}`}
                              >
                                <Crown className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleSuspendUser(user.id)}
                                className={`${user.status === 'suspended' ? 'text-green-600 hover:text-green-700 hover:bg-green-50' : 'text-red-600 hover:text-red-700 hover:bg-red-50'}`}
                              >
                                {user.status === 'suspended' ? <UserCheck className="w-4 h-4" /> : <UserX className="w-4 h-4" />}
                              </Button>
                              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-700">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-700">
                                <ExternalLink className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Moderation Tab */}
          <TabsContent value="moderation" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Content Moderation</h2>
              <p className="text-gray-600">Review flagged content and manage community guidelines</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Flag className="w-5 h-5 text-red-500" />
                    Flagged Content
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-red-900">Inappropriate Product Name</h4>
                        <p className="text-sm text-red-700 mt-1">Product: "Spam Tool Pro"</p>
                        <p className="text-xs text-red-600 mt-2">Reported by 3 users</p>
                      </div>
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline" className="text-green-600 border-green-300 hover:bg-green-50">
                          <Check className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border border-yellow-200 rounded-lg bg-yellow-50">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-yellow-900">Suspicious Activity</h4>
                        <p className="text-sm text-yellow-700 mt-1">User: sarah@company.com</p>
                        <p className="text-xs text-yellow-600 mt-2">Multiple rapid upvotes detected</p>
                      </div>
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline" className="text-green-600 border-green-300 hover:bg-green-50">
                          <Check className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                    Moderation Queue
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">Pending product reviews</span>
                    <Badge>{stats.pendingProducts}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">Flagged comments</span>
                    <Badge>7</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">Reported users</span>
                    <Badge>2</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">Spam reports</span>
                    <Badge>12</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Analytics Dashboard</h2>
              <p className="text-gray-600">Detailed insights and performance metrics</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Daily Active Users</p>
                      <p className="text-2xl font-bold text-blue-600">{stats.dailyActiveUsers}</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Conversion Rate</p>
                      <p className="text-2xl font-bold text-green-600">{stats.conversionRate}%</p>
                    </div>
                    <Target className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Avg. Session</p>
                      <p className="text-2xl font-bold text-purple-600">4.2m</p>
                    </div>
                    <Clock className="w-8 h-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Bounce Rate</p>
                      <p className="text-2xl font-bold text-orange-600">23.1%</p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Performance</CardTitle>
                  <CardDescription>Top performing products this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {products.slice(0, 5).map((product, index) => (
                      <div key={product.id} className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-semibold">
                          {index + 1}
                        </div>
                        <img src={product.logo_url} alt={product.name} className="w-8 h-8 rounded" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{product.name}</p>
                          <p className="text-xs text-gray-500">{product.upvotes} upvotes</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-green-600">+{Math.floor(Math.random() * 50)}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                  <CardDescription>New user registrations by plan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Free Plan</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{width: '70%'}}></div>
                        </div>
                        <span className="text-sm font-medium">70%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Pro Plan</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{width: '25%'}}></div>
                        </div>
                        <span className="text-sm font-medium">25%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Enterprise</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{width: '5%'}}></div>
                        </div>
                        <span className="text-sm font-medium">5%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Platform Settings</h2>
              <p className="text-gray-600">Configure platform behavior and features</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Settings</CardTitle>
                  <CardDescription>Configure product submission and approval settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-approve">Auto-approve products</Label>
                      <p className="text-sm text-gray-500">Automatically approve new product submissions</p>
                    </div>
                    <Switch 
                      id="auto-approve"
                      checked={settings.auto_approve_products}
                      onCheckedChange={(checked) => setSettings({...settings, auto_approve_products: checked})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="featured-limit">Daily featured limit</Label>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSettings({...settings, daily_featured_limit: Math.max(1, settings.daily_featured_limit - 1)})}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <Input 
                        id="featured-limit"
                        type="number" 
                        value={settings.daily_featured_limit}
                        onChange={(e) => setSettings({...settings, daily_featured_limit: parseInt(e.target.value) || 1})}
                        className="w-20 text-center"
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSettings({...settings, daily_featured_limit: settings.daily_featured_limit + 1})}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="min-upvotes">Min upvotes for trending</Label>
                    <Input 
                      id="min-upvotes"
                      type="number" 
                      value={settings.min_upvotes_trending}
                      onChange={(e) => setSettings({...settings, min_upvotes_trending: parseInt(e.target.value) || 1})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cooldown">Submission cooldown (hours)</Label>
                    <Input 
                      id="cooldown"
                      type="number" 
                      value={settings.submission_cooldown_hours}
                      onChange={(e) => setSettings({...settings, submission_cooldown_hours: parseInt(e.target.value) || 1})}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Community Settings</CardTitle>
                  <CardDescription>Configure community features and interactions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enable-comments">Enable comments</Label>
                      <p className="text-sm text-gray-500">Allow users to comment on products</p>
                    </div>
                    <Switch 
                      id="enable-comments"
                      checked={settings.enable_comments}
                      onCheckedChange={(checked) => setSettings({...settings, enable_comments: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enable-notifications">Enable notifications</Label>
                      <p className="text-sm text-gray-500">Send email notifications to users</p>
                    </div>
                    <Switch 
                      id="enable-notifications"
                      checked={settings.enable_notifications}
                      onCheckedChange={(checked) => setSettings({...settings, enable_notifications: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="maintenance-mode">Maintenance mode</Label>
                      <p className="text-sm text-gray-500">Put the platform in maintenance mode</p>
                    </div>
                    <Switch 
                      id="maintenance-mode"
                      checked={settings.maintenance_mode}
                      onCheckedChange={(checked) => setSettings({...settings, maintenance_mode: checked})}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Data Management</CardTitle>
                <CardDescription>Export data and manage backups</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-4">
                    <Download className="w-6 h-6" />
                    <span>Export Users</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-4">
                    <Download className="w-6 h-6" />
                    <span>Export Products</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-4">
                    <Upload className="w-6 h-6" />
                    <span>Import Data</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-4">
                    <Database className="w-6 h-6" />
                    <span>Backup DB</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button 
                onClick={() => {
                  toast({
                    title: "Settings saved",
                    description: "Platform settings have been updated successfully.",
                  });
                }}
                className="bg-orange-500 hover:bg-orange-600"
              >
                Save Settings
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanelNew;