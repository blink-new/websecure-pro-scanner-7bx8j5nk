import { useState } from 'react'
import { Shield, Zap, Eye, Globe, ArrowRight, CheckCircle, Star, Users, TrendingUp } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import blink from '../blink/client'
import { toast } from 'sonner'

export default function LandingPage() {
  const [scanUrl, setScanUrl] = useState('')
  const [isScanning, setIsScanning] = useState(false)

  const handleQuickScan = async () => {
    if (!scanUrl.trim()) {
      toast.error('Please enter a valid URL')
      return
    }

    try {
      new URL(scanUrl)
    } catch {
      toast.error('Please enter a valid URL (include https://)')
      return
    }

    setIsScanning(true)
    toast.success('Starting security scan...')
    
    // Simulate scan process
    setTimeout(() => {
      setIsScanning(false)
      toast.success('Scan completed! Sign up to view full results.')
    }, 3000)
  }

  const handleLogin = () => {
    blink.auth.login()
  }

  const features = [
    {
      icon: Shield,
      title: 'Security Analysis',
      description: 'OWASP-compliant vulnerability scanning, SSL/TLS checks, and security headers analysis'
    },
    {
      icon: Zap,
      title: 'Performance Audit',
      description: 'Lighthouse-powered performance metrics, Core Web Vitals, and optimization recommendations'
    },
    {
      icon: Eye,
      title: 'Accessibility Testing',
      description: 'axe-core powered accessibility audits ensuring WCAG compliance for all users'
    },
    {
      icon: Globe,
      title: 'Tech Stack Detection',
      description: 'Comprehensive technology stack analysis using Wappalyzer and custom detection'
    }
  ]

  const stats = [
    { label: 'Websites Scanned', value: '50K+', icon: Globe },
    { label: 'Vulnerabilities Found', value: '125K+', icon: Shield },
    { label: 'Happy Users', value: '2.5K+', icon: Users },
    { label: 'Success Rate', value: '99.9%', icon: TrendingUp }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Shield className="w-8 h-8 text-primary cyber-glow" />
              <span className="text-xl font-bold gradient-text">WebSecure Pro</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
                Features
              </Button>
              <Button variant="ghost" onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>
                Pricing
              </Button>
              <Button onClick={handleLogin} className="cyber-glow">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 matrix-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <Badge variant="secondary" className="text-primary border-primary/20">
              🚀 Trusted by 2,500+ developers worldwide
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="gradient-text">Secure</span> Your Website<br />
              <span className="text-muted-foreground">Before Hackers Do</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Comprehensive security scanning, performance auditing, and vulnerability detection 
              for modern web applications. Get actionable insights in seconds.
            </p>

            {/* Quick Scan */}
            <div className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4 p-6 bg-card/50 backdrop-blur-sm rounded-lg border border-border/40">
                <Input
                  placeholder="https://example.com"
                  value={scanUrl}
                  onChange={(e) => setScanUrl(e.target.value)}
                  className="flex-1 bg-background/50 border-border/60"
                />
                <Button 
                  onClick={handleQuickScan}
                  disabled={isScanning}
                  className="cyber-glow min-w-[140px]"
                >
                  {isScanning ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                      Scanning...
                    </>
                  ) : (
                    <>
                      Scan Now
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Free quick scan • No signup required • Full report with account
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <stat.icon className="w-8 h-8 text-primary mx-auto" />
                <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold gradient-text">Comprehensive Security Analysis</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our advanced scanning engine performs 25+ security tests to identify vulnerabilities 
              before they become threats.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/40 hover:border-primary/40 transition-all duration-300 group">
                <CardHeader>
                  <feature.icon className="w-12 h-12 text-primary group-hover:scale-110 transition-transform duration-300" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold gradient-text">Simple, Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground">
              Start free, scale as you grow. No hidden fees.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/40">
              <CardHeader>
                <CardTitle className="text-2xl">Free</CardTitle>
                <CardDescription>Perfect for trying out</CardDescription>
                <div className="text-4xl font-bold gradient-text">$0</div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>3 scans per month</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>Basic security checks</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>PDF export</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full" onClick={handleLogin}>
                  Get Started
                </Button>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="bg-card/50 backdrop-blur-sm border-primary/40 relative cyber-glow">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground">
                  <Star className="w-3 h-3 mr-1" />
                  Most Popular
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Pro</CardTitle>
                <CardDescription>For growing businesses</CardDescription>
                <div className="text-4xl font-bold gradient-text">$29</div>
                <div className="text-sm text-muted-foreground">per month</div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>100 scans per month</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>Advanced security analysis</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>Scheduled rescans</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>API access</span>
                  </li>
                </ul>
                <Button className="w-full cyber-glow" onClick={handleLogin}>
                  Start Pro Trial
                </Button>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/40">
              <CardHeader>
                <CardTitle className="text-2xl">Enterprise</CardTitle>
                <CardDescription>For large organizations</CardDescription>
                <div className="text-4xl font-bold gradient-text">$99</div>
                <div className="text-sm text-muted-foreground">per month</div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>Unlimited scans</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>White-label reports</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>Custom integrations</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full" onClick={handleLogin}>
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Shield className="w-6 h-6 text-primary" />
              <span className="font-bold gradient-text">WebSecure Pro</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Contact</a>
            </div>
            
            <div className="text-sm text-muted-foreground">
              © 2024 WebSecure Pro. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}