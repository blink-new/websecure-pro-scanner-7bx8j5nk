import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Switch } from '../components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { 
  Settings, 
  Users, 
  Package, 
  BarChart3, 
  Shield, 
  MessageSquare,
  Eye,
  EyeOff,
  Check,
  X,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Star,
  TrendingUp,
  Calendar,
  Globe,
  Mail,
  Bell,
  Database,
  Activity,
  AlertTriangle,
  Crown,
  Zap
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'moderator' | 'user';
  status: 'active' | 'suspended' | 'banned';
  joinDate: string;
  lastActive: string;
  productsSubmitted: number;
  upvotesGiven: number;
}

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
  status: 'pending' | 'approved' | 'rejected';
  launch_date: string;
  created_at: string;
}

interface AdminSettings {
  siteName: string;
  siteDescription: string;
  featuredProductsLimit: number;
  autoApproveProducts: boolean;
  commentsEnabled: boolean;
  registrationEnabled: boolean;
  maintenanceMode: boolean;
  dailyHuntEnabled: boolean;
  minUpvotesForTrending: number;
}

const AdminPanelNew: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [settings, setSettings] = useState<AdminSettings>({
    siteName: 'ProductHunt',
    siteDescription: 'Discover the best new products every day',
    featuredProductsLimit: 3,
    autoApproveProducts: false,
    commentsEnabled: true,
    registrationEnabled: true,
    maintenanceMode: false,
    dailyHuntEnabled: true,
    minUpvotesForTrending: 10
  });

  useEffect(() => {
    // Mock data
    const mockUsers: User[] = [
      {
        id: '1',
        name: 'Alex Chen',
        email: 'alex@example.com',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
        role: 'user',
        status: 'active',
        joinDate: '2024-01-15',
        lastActive: '2024-01-20',
        productsSubmitted: 3,
        upvotesGiven: 45
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9c5e8e1?w=40&h=40&fit=crop&crop=face',
        role: 'moderator',
        status: 'active',
        joinDate: '2024-01-10',
        lastActive: '2024-01-20',
        productsSubmitted: 5,
        upvotesGiven: 78
      }
    ];

    const mockProducts: Product[] = [
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
        status: 'approved',
        launch_date: '2024-01-15',
        created_at: '2024-01-14'
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
        status: 'pending',
        launch_date: '2024-01-16',
        created_at: '2024-01-15'
      }
    ];

    setUsers(mockUsers);
    setProducts(mockProducts);
  }, []);

  const handleUserStatusChange = (userId: string, newStatus: User['status']) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
  };

  const handleProductStatusChange = (productId: string, newStatus: Product['status']) => {
    setProducts(products.map(product => 
      product.id === productId ? { ...product, status: newStatus } : product
    ));
  };

  const handleFeatureToggle = (productId: string) => {
    setProducts(products.map(product => 
      product.id === productId ? { ...product, featured: !product.featured } : product
    ));
  };

  const handleSettingsChange = (key: keyof AdminSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-3xl font-bold text-gray-900">2,847</p>
                <p className="text-sm text-green-600">+12% from last month</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-3xl font-bold text-gray-900">1,234</p>
                <p className="text-sm text-green-600">+8% from last month</p>
              </div>
              <Package className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Reviews</p>
                <p className="text-3xl font-bold text-gray-900">23</p>
                <p className="text-sm text-yellow-600">Needs attention</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Daily Active Users</p>
                <p className="text-3xl font-bold text-gray-900">892</p>
                <p className="text-sm text-green-600">+5% from yesterday</p>
              </div>
              <Activity className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Recent Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {products.slice(0, 5).map(product => (
                <div key={product.id} className="flex items-center gap-3">
                  <img src={product.logo_url} alt={product.name} className="w-10 h-10 rounded-lg" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.maker_name}</p>
                  </div>
                  <Badge variant={product.status === 'approved' ? 'default' : 'secondary'}>
                    {product.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              New Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {users.slice(0, 5).map(user => (
                <div key={user.id} className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                    {user.role}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const UsersTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">User Management</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input placeholder="Search users..." className="pl-10" />
        </div>
        <Select>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="moderator">Moderator</SelectItem>
            <SelectItem value="user">User</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
            <SelectItem value="banned">Banned</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                    {user.role === 'admin' && <Crown className="w-3 h-3 mr-1" />}
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      user.status === 'active' ? 'default' : 
                      user.status === 'suspended' ? 'secondary' : 'destructive'
                    }
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>{user.joinDate}</TableCell>
                <TableCell>{user.productsSubmitted}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleUserStatusChange(user.id, 
                        user.status === 'active' ? 'suspended' : 'active'
                      )}
                    >
                      {user.status === 'active' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );

  const ProductsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Product Management</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input placeholder="Search products..." className="pl-10" />
        </div>
        <Select>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="ai">AI & ML</SelectItem>
            <SelectItem value="productivity">Productivity</SelectItem>
            <SelectItem value="design">Design</SelectItem>
            <SelectItem value="developer">Developer Tools</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Maker</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Upvotes</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map(product => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img src={product.logo_url} alt={product.name} className="w-10 h-10 rounded-lg" />
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.tagline}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={product.maker_avatar} />
                      <AvatarFallback>{product.maker_name[0]}</AvatarFallback>
                    </Avatar>
                    {product.maker_name}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{product.category}</Badge>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      product.status === 'approved' ? 'default' : 
                      product.status === 'pending' ? 'secondary' : 'destructive'
                    }
                  >
                    {product.status}
                  </Badge>
                </TableCell>
                <TableCell>{product.upvotes}</TableCell>
                <TableCell>
                  <Switch 
                    checked={product.featured}
                    onCheckedChange={() => handleFeatureToggle(product.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleProductStatusChange(product.id, 'approved')}
                    >
                      <Check className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleProductStatusChange(product.id, 'rejected')}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );

  const SettingsTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Platform Settings</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="siteName">Site Name</Label>
              <Input 
                id="siteName"
                value={settings.siteName}
                onChange={(e) => handleSettingsChange('siteName', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="siteDescription">Site Description</Label>
              <Textarea 
                id="siteDescription"
                value={settings.siteDescription}
                onChange={(e) => handleSettingsChange('siteDescription', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="featuredLimit">Featured Products Limit</Label>
              <Input 
                id="featuredLimit"
                type="number"
                value={settings.featuredProductsLimit}
                onChange={(e) => handleSettingsChange('featuredProductsLimit', parseInt(e.target.value))}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Feature Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto-approve Products</Label>
                <p className="text-sm text-gray-500">Automatically approve new product submissions</p>
              </div>
              <Switch 
                checked={settings.autoApproveProducts}
                onCheckedChange={(checked) => handleSettingsChange('autoApproveProducts', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Comments Enabled</Label>
                <p className="text-sm text-gray-500">Allow users to comment on products</p>
              </div>
              <Switch 
                checked={settings.commentsEnabled}
                onCheckedChange={(checked) => handleSettingsChange('commentsEnabled', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Registration Enabled</Label>
                <p className="text-sm text-gray-500">Allow new user registrations</p>
              </div>
              <Switch 
                checked={settings.registrationEnabled}
                onCheckedChange={(checked) => handleSettingsChange('registrationEnabled', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Daily Hunt</Label>
                <p className="text-sm text-gray-500">Enable daily product hunt competition</p>
              </div>
              <Switch 
                checked={settings.dailyHuntEnabled}
                onCheckedChange={(checked) => handleSettingsChange('dailyHuntEnabled', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-red-600">Maintenance Mode</Label>
                <p className="text-sm text-gray-500">Put site in maintenance mode</p>
              </div>
              <Switch 
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => handleSettingsChange('maintenanceMode', checked)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Advanced Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="trendingThreshold">Minimum Upvotes for Trending</Label>
            <Input 
              id="trendingThreshold"
              type="number"
              value={settings.minUpvotesForTrending}
              onChange={(e) => handleSettingsChange('minUpvotesForTrending', parseInt(e.target.value))}
            />
          </div>
          <div className="flex gap-4">
            <Button>Save Settings</Button>
            <Button variant="outline">Reset to Defaults</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Shield className="w-8 h-8 text-orange-500" />
                <span className="font-bold text-xl text-gray-900">Admin Panel</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Globe className="w-4 h-4 mr-2" />
                View Site
              </Button>
              <Avatar className="w-8 h-8">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Products
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <div className="mt-8">
            <TabsContent value="overview">
              <OverviewTab />
            </TabsContent>
            <TabsContent value="users">
              <UsersTab />
            </TabsContent>
            <TabsContent value="products">
              <ProductsTab />
            </TabsContent>
            <TabsContent value="settings">
              <SettingsTab />
            </TabsContent>
          </div>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminPanelNew;