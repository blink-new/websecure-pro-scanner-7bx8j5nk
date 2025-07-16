import { useState } from 'react'
import { Shield, Check, Star, ArrowRight, CreditCard } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Switch } from '../components/ui/switch'
import { useNavigate } from 'react-router-dom'
import blink from '../blink/client'
import { toast } from 'sonner'

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false)
  const navigate = useNavigate()

  const handleGetStarted = (plan) => {
    if (plan === 'free') {
      blink.auth.login()
    } else {
      toast.success(`Redirecting to ${plan} plan checkout...`)
      // Here you would integrate with payment provider
    }
  }

  const plans = [
    {
      id: 'free',
      name: 'Free',
      description: 'Perfect for trying out',
      price: 0,
      annualPrice: 0,
      features: [
        '3 scans per month',
        'Basic security checks',
        'PDF export',
        'Email support',
        'Public scan sharing'
      ],
      limitations: [
        'Limited vulnerability detection',
        'No scheduled scans',
        'No API access'
      ],
      popular: false,
      cta: 'Get Started'
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'For growing businesses',
      price: 29,
      annualPrice: 24,
      features: [
        '100 scans per month',
        'Advanced security analysis',
        'Scheduled rescans',
        'API access',
        'Priority support',
        'Custom branding',
        'CSV & JSON export',
        'Webhook notifications'
      ],
      limitations: [],
      popular: true,
      cta: 'Start Pro Trial'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For large organizations',
      price: 99,
      annualPrice: 79,
      features: [
        'Unlimited scans',
        'White-label reports',
        'Custom integrations',
        'Dedicated support',
        'SLA guarantee',
        'Advanced analytics',
        'Team management',
        'Custom domains'
      ],
      limitations: [],
      popular: false,
      cta: 'Contact Sales'
    }
  ]

  const faqs = [
    {
      question: 'What types of security tests do you perform?',
      answer: 'We perform 25+ security tests including OWASP Top 10 vulnerabilities, SSL/TLS configuration, security headers, authentication flaws, and more.'
    },
    {
      question: 'How accurate are the scan results?',
      answer: 'Our scans have a 99.9% accuracy rate with minimal false positives. We use industry-standard tools and custom detection algorithms.'
    },
    {
      question: 'Can I scan internal/private websites?',
      answer: 'Yes, Pro and Enterprise plans support scanning of internal websites and applications behind authentication.'
    },
    {
      question: 'Do you store my website data?',
      answer: 'We only store scan results and metadata. We never store your website content or sensitive data.'
    },
    {
      question: 'What happens if I exceed my scan limit?',
      answer: 'You can purchase additional scan credits or upgrade to a higher plan. We\'ll notify you before you reach your limit.'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
              <Shield className="w-8 h-8 text-primary cyber-glow" />
              <span className="text-xl font-bold gradient-text">WebSecure Pro</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/')}>
                Home
              </Button>
              <Button onClick={() => blink.auth.login()} className="cyber-glow">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <Badge variant="secondary" className="text-primary border-primary/20">
            💳 Simple, transparent pricing
          </Badge>
          
          <h1 className="text-5xl font-bold gradient-text">
            Choose Your Security Plan
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Start free and scale as you grow. All plans include our core security scanning features 
            with no hidden fees or surprises.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4">
            <span className={`text-sm ${!isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
            />
            <span className={`text-sm ${isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
              Annual
            </span>
            <Badge variant="secondary" className="text-primary">
              Save 20%
            </Badge>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`bg-card/50 backdrop-blur-sm relative ${
                plan.popular 
                  ? 'border-primary/40 cyber-glow' 
                  : 'border-border/40'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-base">{plan.description}</CardDescription>
                
                <div className="space-y-2">
                  <div className="text-5xl font-bold gradient-text">
                    ${isAnnual ? plan.annualPrice : plan.price}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {plan.price === 0 ? 'Forever free' : 'per month'}
                  </div>
                  {isAnnual && plan.price > 0 && (
                    <div className="text-xs text-primary">
                      Save ${(plan.price - plan.annualPrice) * 12}/year
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <Button 
                  className={`w-full ${plan.popular ? 'cyber-glow' : ''}`}
                  variant={plan.popular ? 'default' : 'outline'}
                  onClick={() => handleGetStarted(plan.id)}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                
                <div className="space-y-3">
                  <div className="text-sm font-medium text-foreground">What's included:</div>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2 text-sm">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {plan.limitations.length > 0 && (
                    <div className="pt-3 border-t border-border/40">
                      <div className="text-sm font-medium text-muted-foreground mb-2">Limitations:</div>
                      <ul className="space-y-1">
                        {plan.limitations.map((limitation, index) => (
                          <li key={index} className="text-xs text-muted-foreground">
                            • {limitation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold gradient-text mb-4">Feature Comparison</h2>
            <p className="text-muted-foreground">
              See what's included in each plan
            </p>
          </div>

          <Card className="bg-card/50 backdrop-blur-sm border-border/40">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/40">
                      <th className="text-left p-4 font-medium">Feature</th>
                      <th className="text-center p-4 font-medium">Free</th>
                      <th className="text-center p-4 font-medium">Pro</th>
                      <th className="text-center p-4 font-medium">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b border-border/40">
                      <td className="p-4">Monthly scans</td>
                      <td className="text-center p-4">3</td>
                      <td className="text-center p-4">100</td>
                      <td className="text-center p-4">Unlimited</td>
                    </tr>
                    <tr className="border-b border-border/40">
                      <td className="p-4">Security tests</td>
                      <td className="text-center p-4">Basic (10+)</td>
                      <td className="text-center p-4">Advanced (25+)</td>
                      <td className="text-center p-4">Complete (40+)</td>
                    </tr>
                    <tr className="border-b border-border/40">
                      <td className="p-4">Scheduled scans</td>
                      <td className="text-center p-4">-</td>
                      <td className="text-center p-4"><Check className="w-4 h-4 text-primary mx-auto" /></td>
                      <td className="text-center p-4"><Check className="w-4 h-4 text-primary mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-border/40">
                      <td className="p-4">API access</td>
                      <td className="text-center p-4">-</td>
                      <td className="text-center p-4"><Check className="w-4 h-4 text-primary mx-auto" /></td>
                      <td className="text-center p-4"><Check className="w-4 h-4 text-primary mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-border/40">
                      <td className="p-4">White-label reports</td>
                      <td className="text-center p-4">-</td>
                      <td className="text-center p-4">-</td>
                      <td className="text-center p-4"><Check className="w-4 h-4 text-primary mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="p-4">Support</td>
                      <td className="text-center p-4">Email</td>
                      <td className="text-center p-4">Priority</td>
                      <td className="text-center p-4">Dedicated</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold gradient-text mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Everything you need to know about our security scanning service
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/40">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-6 py-16 bg-muted/20 rounded-lg">
          <h2 className="text-3xl font-bold gradient-text">
            Ready to Secure Your Website?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of developers who trust WebSecure Pro to keep their websites safe and secure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => handleGetStarted('free')} className="cyber-glow">
              <Shield className="w-5 h-5 mr-2" />
              Start Free Scan
            </Button>
            <Button size="lg" variant="outline" onClick={() => handleGetStarted('pro')}>
              <CreditCard className="w-5 h-5 mr-2" />
              Try Pro Free
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}