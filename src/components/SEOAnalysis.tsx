import { useState } from 'react'
import { 
  Globe, ExternalLink, TrendingUp, AlertTriangle, CheckCircle, 
  XCircle, Users, MessageSquare, Link, Search, Shield, 
  BarChart3, Eye, Clock, MapPin, Star, ThumbsUp, ThumbsDown,
  Minus, Filter, Download, RefreshCw
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Progress } from './ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Separator } from './ui/separator'
import type { SEOAuditResult, BacklinkData, SocialMention, SpamLink } from '../services/seoService'

interface SEOAnalysisProps {
  seoData: SEOAuditResult
  onRefresh?: () => void
}

export default function SEOAnalysis({ seoData, onRefresh }: SEOAnalysisProps) {
  const [backlinkFilter, setBacklinkFilter] = useState('all')
  const [socialFilter, setSocialFilter] = useState('all')
  const [spamFilter, setSpamFilter] = useState('all')

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'from-green-500 to-green-400'
    if (score >= 60) return 'from-yellow-500 to-yellow-400'
    return 'from-red-500 to-red-400'
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return <ThumbsUp className="w-4 h-4 text-green-400" />
      case 'negative': return <ThumbsDown className="w-4 h-4 text-red-400" />
      default: return <Minus className="w-4 h-4 text-yellow-400" />
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-400 bg-green-400/10 border-green-400/20'
      case 'negative': return 'text-red-400 bg-red-400/10 border-red-400/20'
      default: return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
    }
  }

  const getSpamScoreColor = (score: number) => {
    if (score >= 70) return 'text-red-400'
    if (score >= 40) return 'text-yellow-400'
    return 'text-green-400'
  }

  const filteredBacklinks = seoData.backlinks.filter(link => {
    if (backlinkFilter === 'dofollow') return link.isDofollow
    if (backlinkFilter === 'nofollow') return !link.isDofollow
    if (backlinkFilter === 'high-authority') return link.authority >= 70
    if (backlinkFilter === 'spam') return link.isSpam
    return true
  })

  const filteredSocialMentions = seoData.socialMentions.filter(mention => {
    if (socialFilter === 'positive') return mention.sentiment === 'positive'
    if (socialFilter === 'negative') return mention.sentiment === 'negative'
    if (socialFilter === 'neutral') return mention.sentiment === 'neutral'
    if (socialFilter !== 'all') return mention.platform.toLowerCase().includes(socialFilter.toLowerCase())
    return true
  })

  const filteredSpamLinks = seoData.spamLinks.filter(link => {
    if (spamFilter === 'high') return link.spamScore >= 70
    if (spamFilter === 'medium') return link.spamScore >= 40 && link.spamScore < 70
    if (spamFilter === 'low') return link.spamScore < 40
    return true
  })

  return (
    <div className="space-y-6">
      {/* SEO Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card/50 backdrop-blur-sm border-border/40">
          <CardContent className="p-4 text-center">
            <BarChart3 className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-sm text-muted-foreground mb-1">Overall SEO</div>
            <div className={`text-2xl font-bold ${getScoreColor(seoData.overallSeoScore)}`}>
              {seoData.overallSeoScore}
            </div>
            <Progress value={seoData.overallSeoScore} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/40">
          <CardContent className="p-4 text-center">
            <Link className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-sm text-muted-foreground mb-1">Backlinks</div>
            <div className={`text-2xl font-bold ${getScoreColor(seoData.backlinkScore)}`}>
              {seoData.backlinkScore}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {seoData.totalBacklinks} total
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/40">
          <CardContent className="p-4 text-center">
            <Search className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-sm text-muted-foreground mb-1">Technical SEO</div>
            <div className={`text-2xl font-bold ${getScoreColor(seoData.technicalSeoScore)}`}>
              {seoData.technicalSeoScore}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {seoData.indexingStatus.length} engines
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/40">
          <CardContent className="p-4 text-center">
            <MessageSquare className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-sm text-muted-foreground mb-1">Social Mentions</div>
            <div className="text-2xl font-bold text-primary">
              {seoData.socialMentions.length}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Last 30 days
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="backlinks" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="backlinks">Backlinks</TabsTrigger>
          <TabsTrigger value="indexing">Indexing</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="spam">Spam Links</TabsTrigger>
          <TabsTrigger value="technical">Technical</TabsTrigger>
        </TabsList>

        {/* Backlinks Analysis */}
        <TabsContent value="backlinks" className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-xl font-bold gradient-text">Backlink Analysis</h3>
              <p className="text-muted-foreground">
                {seoData.totalBacklinks} backlinks from {seoData.uniqueDomains} unique domains
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Select value={backlinkFilter} onValueChange={setBacklinkFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Links</SelectItem>
                  <SelectItem value="dofollow">Dofollow</SelectItem>
                  <SelectItem value="nofollow">Nofollow</SelectItem>
                  <SelectItem value="high-authority">High Authority</SelectItem>
                  <SelectItem value="spam">Spam Links</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="sm" onClick={onRefresh}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>

          {/* Backlink Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-card/50 backdrop-blur-sm border-border/40">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">
                  {seoData.domainAuthority}
                </div>
                <div className="text-sm text-muted-foreground">Domain Authority</div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm border-border/40">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-400">
                  {seoData.backlinks.filter(b => b.isDofollow).length}
                </div>
                <div className="text-sm text-muted-foreground">Dofollow Links</div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm border-border/40">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">
                  {seoData.backlinks.filter(b => !b.isDofollow).length}
                </div>
                <div className="text-sm text-muted-foreground">Nofollow Links</div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm border-border/40">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-400">
                  {seoData.backlinks.filter(b => b.isSpam).length}
                </div>
                <div className="text-sm text-muted-foreground">Spam Links</div>
              </CardContent>
            </Card>
          </div>

          {/* Backlinks List */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/40">
            <CardHeader>
              <CardTitle>Backlink Details</CardTitle>
              <CardDescription>
                Showing {filteredBacklinks.length} of {seoData.backlinks.length} backlinks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredBacklinks.map((backlink, index) => (
                  <div key={index} className="flex items-start justify-between p-4 rounded-lg border border-border/40 bg-background/50">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-2">
                        <a 
                          href={backlink.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="font-medium text-primary hover:underline flex items-center space-x-1"
                        >
                          <span>{backlink.domain}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        
                        <Badge variant={backlink.isDofollow ? 'default' : 'secondary'}>
                          {backlink.isDofollow ? 'Dofollow' : 'Nofollow'}
                        </Badge>
                        
                        {backlink.isSpam && (
                          <Badge variant="destructive">Spam</Badge>
                        )}
                      </div>
                      
                      <div className="text-sm text-muted-foreground">
                        Anchor: "{backlink.anchorText}"
                      </div>
                      
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>First seen: {new Date(backlink.firstSeen).toLocaleDateString()}</span>
                        <span>Last seen: {new Date(backlink.lastSeen).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className={`text-lg font-bold ${getScoreColor(backlink.authority)}`}>
                        {backlink.authority}
                      </div>
                      <div className="text-xs text-muted-foreground">Authority</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Search Engine Indexing */}
        <TabsContent value="indexing" className="space-y-6">
          <div>
            <h3 className="text-xl font-bold gradient-text mb-2">Search Engine Indexing Status</h3>
            <p className="text-muted-foreground">
              Monitor how search engines are crawling and indexing your website
            </p>
          </div>

          <div className="grid gap-4">
            {seoData.indexingStatus.map((status, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/40">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Search className="w-6 h-6 text-primary" />
                      <div>
                        <h4 className="font-semibold">{status.searchEngine}</h4>
                        <p className="text-sm text-muted-foreground">
                          Last crawled: {new Date(status.lastCrawled).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${getScoreColor(status.indexingRate)}`}>
                        {status.indexingRate}%
                      </div>
                      <div className="text-sm text-muted-foreground">Indexed</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary">{status.indexedPages}</div>
                      <div className="text-xs text-muted-foreground">Indexed Pages</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-lg font-bold text-muted-foreground">{status.totalPages}</div>
                      <div className="text-xs text-muted-foreground">Total Pages</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1">
                        {status.sitemapStatus === 'found' ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-400" />
                        )}
                        <span className="text-sm">Sitemap</span>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1">
                        {status.robotsStatus === 'found' ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-400" />
                        )}
                        <span className="text-sm">Robots.txt</span>
                      </div>
                    </div>
                  </div>
                  
                  <Progress value={status.indexingRate} className="h-2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Social Media Mentions */}
        <TabsContent value="social" className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-xl font-bold gradient-text">Social Media Mentions</h3>
              <p className="text-muted-foreground">
                {seoData.socialMentions.length} mentions found across social platforms
              </p>
            </div>
            
            <Select value={socialFilter} onValueChange={setSocialFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                <SelectItem value="twitter">Twitter/X</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="reddit">Reddit</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="positive">Positive</SelectItem>
                <SelectItem value="negative">Negative</SelectItem>
                <SelectItem value="neutral">Neutral</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Social Stats */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="bg-card/50 backdrop-blur-sm border-border/40">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-400">
                  {seoData.socialMentions.filter(m => m.sentiment === 'positive').length}
                </div>
                <div className="text-sm text-muted-foreground">Positive</div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm border-border/40">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">
                  {seoData.socialMentions.filter(m => m.sentiment === 'neutral').length}
                </div>
                <div className="text-sm text-muted-foreground">Neutral</div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm border-border/40">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-400">
                  {seoData.socialMentions.filter(m => m.sentiment === 'negative').length}
                </div>
                <div className="text-sm text-muted-foreground">Negative</div>
              </CardContent>
            </Card>
          </div>

          {/* Social Mentions List */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/40">
            <CardHeader>
              <CardTitle>Recent Mentions</CardTitle>
              <CardDescription>
                Showing {filteredSocialMentions.length} of {seoData.socialMentions.length} mentions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredSocialMentions.map((mention, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 rounded-lg border border-border/40 bg-background/50">
                    <div className="flex-shrink-0 mt-1">
                      {getSentimentIcon(mention.sentiment)}
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{mention.platform}</Badge>
                          <Badge className={getSentimentColor(mention.sentiment)}>
                            {mention.sentiment}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Users className="w-4 h-4" />
                          <span>{mention.engagement}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm">{mention.content}</p>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>By {mention.author}</span>
                        <span>{new Date(mention.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Spam Links Detection */}
        <TabsContent value="spam" className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-xl font-bold gradient-text">Spam Link Detection</h3>
              <p className="text-muted-foreground">
                {seoData.spamLinks.length} potentially harmful links detected
              </p>
            </div>
            
            <Select value={spamFilter} onValueChange={setSpamFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Spam</SelectItem>
                <SelectItem value="high">High Risk</SelectItem>
                <SelectItem value="medium">Medium Risk</SelectItem>
                <SelectItem value="low">Low Risk</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {seoData.spamLinks.length > 0 ? (
            <Card className="bg-card/50 backdrop-blur-sm border-border/40">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-red-400" />
                  <span>Detected Spam Links</span>
                </CardTitle>
                <CardDescription>
                  These links may harm your SEO ranking and should be disavowed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredSpamLinks.map((spamLink, index) => (
                    <div key={index} className="flex items-start justify-between p-4 rounded-lg border border-red-400/20 bg-red-400/5">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className="w-4 h-4 text-red-400" />
                          <span className="font-medium text-red-400">{spamLink.domain}</span>
                        </div>
                        
                        <p className="text-sm text-muted-foreground">{spamLink.reason}</p>
                        
                        <div className="text-xs text-muted-foreground">
                          Detected: {new Date(spamLink.detected).toLocaleDateString()}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className={`text-lg font-bold ${getSpamScoreColor(spamLink.spamScore)}`}>
                          {spamLink.spamScore}
                        </div>
                        <div className="text-xs text-muted-foreground">Spam Score</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-card/50 backdrop-blur-sm border-border/40">
              <CardContent className="p-12 text-center">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Spam Links Detected</h3>
                <p className="text-muted-foreground">
                  Your backlink profile looks clean and healthy!
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Technical SEO */}
        <TabsContent value="technical" className="space-y-6">
          <div>
            <h3 className="text-xl font-bold gradient-text mb-2">Technical SEO Analysis</h3>
            <p className="text-muted-foreground">
              Technical factors affecting your search engine visibility
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border/40">
              <CardHeader>
                <CardTitle>Page Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">PageSpeed Score</span>
                  <div className={`font-bold ${getScoreColor(seoData.pagespeedScore)}`}>
                    {seoData.pagespeedScore}/100
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Mobile Usability</span>
                  <div className="flex items-center space-x-1">
                    {seoData.mobileUsability ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-400" />
                    )}
                    <span>{seoData.mobileUsability ? 'Passed' : 'Failed'}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Word Count</span>
                  <span className="font-medium">{seoData.wordCount.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Readability Score</span>
                  <div className={`font-bold ${getScoreColor(seoData.readabilityScore)}`}>
                    {seoData.readabilityScore}/100
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/40">
              <CardHeader>
                <CardTitle>Structured Data</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {seoData.structuredData.map((schema, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm">{schema}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card className="bg-card/50 backdrop-blur-sm border-border/40">
            <CardHeader>
              <CardTitle>Keyword Analysis</CardTitle>
              <CardDescription>Top keywords and their density on the page</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(seoData.keywordDensity).map(([keyword, density]) => (
                  <div key={keyword} className="flex items-center justify-between">
                    <span className="font-medium">{keyword}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${Math.min(density * 20, 100)}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-12 text-right">
                        {density}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}