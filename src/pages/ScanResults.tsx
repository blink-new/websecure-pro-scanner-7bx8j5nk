import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  Shield, ArrowLeft, Download, Share2, AlertTriangle, CheckCircle, 
  XCircle, Clock, Globe, Zap, Eye, Code, ExternalLink, RefreshCw
} from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Progress } from '../components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Separator } from '../components/ui/separator'
import { toast } from 'sonner'
import SEOAnalysis from '../components/SEOAnalysis'
import { seoService } from '../services/seoService'
import type { SEOAuditResult } from '../services/seoService'

export default function ScanResults() {
  const { scanId } = useParams()
  const navigate = useNavigate()
  const [scanData, setScanData] = useState(null)
  const [seoData, setSeoData] = useState<SEOAuditResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [seoLoading, setSeoLoading] = useState(false)

  useEffect(() => {
    // Simulate loading scan data
    setTimeout(() => {
      const mockScanData = {
        id: scanId,
        url: 'https://example.com',
        status: 'completed',
        trustScore: 78,
        securityScore: 82,
        seoScore: 75,
        performanceScore: 68,
        accessibilityScore: 85,
        createdAt: new Date().toISOString(),
        techStack: ['React', 'Node.js', 'Cloudflare', 'AWS'],
        vulnerabilities: [
          {
            id: 1,
            category: 'Security',
            title: 'Missing Content Security Policy',
            severity: 'medium',
            description: 'No Content-Security-Policy header found',
            recommendation: 'Implement CSP header to prevent XSS attacks',
            status: 'failed'
          },
          {
            id: 2,
            category: 'Security',
            title: 'SSL Certificate Valid',
            severity: 'info',
            description: 'SSL certificate is valid and properly configured',
            recommendation: 'Certificate expires in 89 days',
            status: 'passed'
          },
          {
            id: 3,
            category: 'Performance',
            title: 'Large Bundle Size',
            severity: 'high',
            description: 'JavaScript bundle size is 2.3MB (recommended: <1MB)',
            recommendation: 'Consider code splitting and tree shaking',
            status: 'failed'
          },
          {
            id: 4,
            category: 'SEO',
            title: 'Meta Description Missing',
            severity: 'medium',
            description: 'No meta description found on homepage',
            recommendation: 'Add descriptive meta description for better SEO',
            status: 'failed'
          },
          {
            id: 5,
            category: 'Accessibility',
            title: 'Alt Text Present',
            severity: 'info',
            description: 'All images have appropriate alt text',
            recommendation: 'Continue following accessibility best practices',
            status: 'passed'
          }
        ]
      }
      
      setScanData(mockScanData)
      setLoading(false)
      
      // Load comprehensive SEO data
      loadSEOData(mockScanData.url)
    }, 1000)
  }, [scanId])

  const loadSEOData = async (url: string) => {
    setSeoLoading(true)
    try {
      const seoResult = await seoService.performComprehensiveSEOAudit(url)
      setSeoData(seoResult)
    } catch (error) {
      console.error('Failed to load SEO data:', error)
      toast.error('Failed to load comprehensive SEO analysis')
    } finally {
      setSeoLoading(false)
    }
  }

  const handleExport = (format) => {
    toast.success(`Exporting report as ${format.toUpperCase()}...`)
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success('Scan URL copied to clipboard!')
  }

  const handleRescan = () => {
    toast.success('Starting new scan...')
    // Simulate rescan
    setTimeout(() => {
      toast.success('Rescan completed!')
      window.location.reload()
    }, 3000)
  }

  const handleSEORefresh = () => {
    if (scanData?.url) {
      loadSEOData(scanData.url)
      toast.success('Refreshing SEO analysis...')
    }
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getScoreGradient = (score) => {
    if (score >= 80) return 'from-green-500 to-green-400'
    if (score >= 60) return 'from-yellow-500 to-yellow-400'
    return 'from-red-500 to-red-400'
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-400 bg-red-400/10 border-red-400/20'
      case 'medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
      case 'low': return 'text-blue-400 bg-blue-400/10 border-blue-400/20'
      default: return 'text-green-400 bg-green-400/10 border-green-400/20'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'passed': return <CheckCircle className="w-4 h-4 text-green-400" />
      case 'failed': return <XCircle className="w-4 h-4 text-red-400" />
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-400" />
      default: return <Clock className="w-4 h-4 text-muted-foreground" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading scan results...</p>
        </div>
      </div>
    )
  }

  if (!scanData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <XCircle className="w-16 h-16 text-red-400 mx-auto" />
          <h1 className="text-2xl font-bold">Scan Not Found</h1>
          <p className="text-muted-foreground">The requested scan could not be found.</p>
          <Button onClick={() => navigate('/dashboard')}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center space-x-2">
                <Shield className="w-6 h-6 text-primary" />
                <span className="font-bold gradient-text">Scan Results</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleRescan}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Rescan
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleExport('pdf')}>
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Scan Overview */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold gradient-text mb-2">Security Scan Report</h1>
              <div className="flex items-center space-x-4 text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4" />
                  <span className="font-mono">{scanData.url}</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
                <span>•</span>
                <span>{new Date(scanData.createdAt).toLocaleString()}</span>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-muted-foreground mb-1">Overall Trust Score</div>
              <div className={`text-4xl font-bold ${getScoreColor(scanData.trustScore)}`}>
                {scanData.trustScore}
              </div>
            </div>
          </div>

          {/* Score Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-card/50 backdrop-blur-sm border-border/40">
              <CardContent className="p-4 text-center">
                <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-sm text-muted-foreground mb-1">Security</div>
                <div className={`text-2xl font-bold ${getScoreColor(scanData.securityScore)}`}>
                  {scanData.securityScore}
                </div>
                <Progress 
                  value={scanData.securityScore} 
                  className="mt-2 h-2"
                />
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/40">
              <CardContent className="p-4 text-center">
                <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-sm text-muted-foreground mb-1">Performance</div>
                <div className={`text-2xl font-bold ${getScoreColor(scanData.performanceScore)}`}>
                  {scanData.performanceScore}
                </div>
                <Progress 
                  value={scanData.performanceScore} 
                  className="mt-2 h-2"
                />
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/40">
              <CardContent className="p-4 text-center">
                <Globe className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="text-sm text-muted-foreground mb-1">SEO</div>
                <div className={`text-2xl font-bold ${getScoreColor(scanData.seoScore)}`}>
                  {scanData.seoScore}
                </div>
                <Progress 
                  value={scanData.seoScore} 
                  className="mt-2 h-2"
                />
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/40">
              <CardContent className="p-4 text-center">
                <Eye className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div className="text-sm text-muted-foreground mb-1">Accessibility</div>
                <div className={`text-2xl font-bold ${getScoreColor(scanData.accessibilityScore)}`}>
                  {scanData.accessibilityScore}
                </div>
                <Progress 
                  value={scanData.accessibilityScore} 
                  className="mt-2 h-2"
                />
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-[600px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="seo">SEO Analysis</TabsTrigger>
            <TabsTrigger value="tech-stack">Tech Stack</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border/40">
                <CardHeader>
                  <CardTitle>Scan Summary</CardTitle>
                  <CardDescription>Key findings from your security scan</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total Issues Found</span>
                    <Badge variant="destructive">
                      {scanData.vulnerabilities.filter(v => v.status === 'failed').length}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Critical Issues</span>
                    <Badge variant="destructive">
                      {scanData.vulnerabilities.filter(v => v.severity === 'high').length}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Passed Tests</span>
                    <Badge variant="default">
                      {scanData.vulnerabilities.filter(v => v.status === 'passed').length}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/40">
                <CardHeader>
                  <CardTitle>Recommendations</CardTitle>
                  <CardDescription>Priority actions to improve security</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Fix Bundle Size</div>
                      <div className="text-sm text-muted-foreground">Reduce JavaScript bundle to improve performance</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Add CSP Header</div>
                      <div className="text-sm text-muted-foreground">Implement Content Security Policy</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-medium">SEO Optimization</div>
                      <div className="text-sm text-muted-foreground">Add meta descriptions and improve structure</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* All Issues */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/40">
              <CardHeader>
                <CardTitle>All Issues & Tests</CardTitle>
                <CardDescription>Detailed breakdown of all security tests performed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scanData.vulnerabilities.map((vuln) => (
                    <div key={vuln.id} className="flex items-start space-x-4 p-4 rounded-lg border border-border/40 bg-background/50">
                      <div className="flex-shrink-0 mt-1">
                        {getStatusIcon(vuln.status)}
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{vuln.title}</h4>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">
                              {vuln.category}
                            </Badge>
                            <Badge className={`text-xs ${getSeverityColor(vuln.severity)}`}>
                              {vuln.severity}
                            </Badge>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground">
                          {vuln.description}
                        </p>
                        
                        {vuln.recommendation && (
                          <div className="text-sm bg-muted/50 p-3 rounded border-l-2 border-primary/40">
                            <strong className="text-primary">Recommendation:</strong> {vuln.recommendation}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border/40">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <span>Security Analysis</span>
                </CardTitle>
                <CardDescription>
                  OWASP-compliant security tests and vulnerability assessment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scanData.vulnerabilities.filter(v => v.category === 'Security').map((vuln) => (
                    <div key={vuln.id} className="flex items-start space-x-4 p-4 rounded-lg border border-border/40 bg-background/50">
                      <div className="flex-shrink-0 mt-1">
                        {getStatusIcon(vuln.status)}
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{vuln.title}</h4>
                          <Badge className={`text-xs ${getSeverityColor(vuln.severity)}`}>
                            {vuln.severity}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground">
                          {vuln.description}
                        </p>
                        
                        {vuln.recommendation && (
                          <div className="text-sm bg-muted/50 p-3 rounded border-l-2 border-primary/40">
                            <strong className="text-primary">Fix:</strong> {vuln.recommendation}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border/40">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <span>Performance Analysis</span>
                </CardTitle>
                <CardDescription>
                  Lighthouse-powered performance metrics and optimization recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scanData.vulnerabilities.filter(v => v.category === 'Performance').map((vuln) => (
                    <div key={vuln.id} className="flex items-start space-x-4 p-4 rounded-lg border border-border/40 bg-background/50">
                      <div className="flex-shrink-0 mt-1">
                        {getStatusIcon(vuln.status)}
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{vuln.title}</h4>
                          <Badge className={`text-xs ${getSeverityColor(vuln.severity)}`}>
                            {vuln.severity}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground">
                          {vuln.description}
                        </p>
                        
                        {vuln.recommendation && (
                          <div className="text-sm bg-muted/50 p-3 rounded border-l-2 border-primary/40">
                            <strong className="text-primary">Optimization:</strong> {vuln.recommendation}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SEO Analysis Tab */}
          <TabsContent value="seo" className="space-y-6">
            {seoLoading ? (
              <Card className="bg-card/50 backdrop-blur-sm border-border/40">
                <CardContent className="p-12 text-center">
                  <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Analyzing SEO Performance</h3>
                  <p className="text-muted-foreground">
                    Running comprehensive SEO audit including backlinks, indexing status, and social mentions...
                  </p>
                </CardContent>
              </Card>
            ) : seoData ? (
              <SEOAnalysis seoData={seoData} onRefresh={handleSEORefresh} />
            ) : (
              <Card className="bg-card/50 backdrop-blur-sm border-border/40">
                <CardContent className="p-12 text-center">
                  <Globe className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">SEO Analysis Unavailable</h3>
                  <p className="text-muted-foreground mb-6">
                    Unable to load comprehensive SEO analysis for this website.
                  </p>
                  <Button onClick={handleSEORefresh} className="cyber-glow">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Retry Analysis
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Tech Stack Tab */}
          <TabsContent value="tech-stack" className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border/40">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Code className="w-5 h-5 text-blue-400" />
                  <span>Technology Stack</span>
                </CardTitle>
                <CardDescription>
                  Detected technologies and frameworks used on this website
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {scanData.techStack.map((tech, index) => (
                    <div key={index} className="p-4 rounded-lg border border-border/40 bg-background/50 text-center">
                      <div className="font-medium text-primary">{tech}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}