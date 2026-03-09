import { useState } from 'react'
import './App.css'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Shield,
  Car,
  Home,
  Heart,
  Key,
  PawPrint,
  Phone,
  ChevronRight,
  Star,
  CheckCircle2,
  Clock,
  DollarSign,
  Users,
  FileText,
  Menu,
  X,
  ArrowRight,
  Quote,
  Headphones,
  Lock,
  Award,
  Zap,
  MapPin,
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const PRODUCTS = [
  { id: 'auto', label: 'Auto', icon: Car, color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { id: 'home', label: 'Home', icon: Home, color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { id: 'renters', label: 'Renters', icon: Key, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { id: 'life', label: 'Life', icon: Heart, color: 'bg-rose-50 text-rose-700 border-rose-200' },
  { id: 'pet', label: 'Pet', icon: PawPrint, color: 'bg-purple-50 text-purple-700 border-purple-200' },
]

const PRODUCT_DETAILS: Record<string, {
  title: string; description: string; image: string; coverages: string[]; startingAt: string
}> = {
  auto: {
    title: 'Auto Insurance',
    description: 'Comprehensive car insurance that protects you on the road. From liability to collision coverage, we have plans to fit every driver and every budget.',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
    coverages: ['Liability Coverage', 'Collision Coverage', 'Comprehensive Coverage', 'Uninsured Motorist', 'Medical Payments', 'Roadside Assistance'],
    startingAt: '$42/mo',
  },
  home: {
    title: 'Homeowners Insurance',
    description: 'Your home is your biggest investment. Protect it with coverage that shields your property, belongings, and gives you peace of mind for the unexpected.',
    image: '/images/home.jpg',
    coverages: ['Dwelling Protection', 'Personal Property', 'Liability Protection', 'Additional Living Expenses', 'Medical Payments', 'Other Structures'],
    startingAt: '$85/mo',
  },
  renters: {
    title: 'Renters Insurance',
    description: 'Affordable protection for your personal belongings, liability coverage, and additional living expenses if your rental becomes uninhabitable.',
    image: '/images/renters.jpg',
    coverages: ['Personal Property', 'Liability Protection', 'Additional Living Expenses', 'Medical Payments to Others', 'Identity Theft Protection', 'Water Backup Coverage'],
    startingAt: '$15/mo',
  },
  life: {
    title: 'Life Insurance',
    description: 'Give your family the financial security they deserve. Our life insurance options help ensure your loved ones are taken care of, no matter what.',
    image: '/images/life.jpg',
    coverages: ['Term Life Insurance', 'Whole Life Insurance', 'Universal Life Insurance', 'Accidental Death Benefit', 'Child Term Rider', 'Waiver of Premium'],
    startingAt: '$22/mo',
  },
  pet: {
    title: 'Pet Insurance',
    description: 'Your furry family members deserve the best care. Our pet insurance helps cover unexpected veterinary costs so you can focus on their health.',
    image: '/images/pet.jpg',
    coverages: ['Accident Coverage', 'Illness Coverage', 'Wellness Plans', 'Prescription Medications', 'Emergency Care', 'Hereditary Conditions'],
    startingAt: '$19/mo',
  },
}

const STATS = [
  { value: '50+', label: 'Years of Experience', description: 'Decades of trusted service protecting families nationwide', icon: Award },
  { value: '$875', label: 'Average Annual Savings', description: 'Customers who bundle save an average of $875 per year', icon: DollarSign },
  { value: '24/7', label: 'Claims Support', description: 'Round-the-clock assistance when you need it most', icon: Headphones },
  { value: '2M+', label: 'Policies Issued', description: 'Millions of customers trust us with their protection', icon: Users },
]

const TESTIMONIALS = [
  {
    name: 'Sarah M.',
    location: 'Austin, TX',
    rating: 5,
    text: 'Switching was the best decision we made. We saved over $1,200 a year by bundling our auto and home insurance. The process was incredibly smooth.',
    image: '/images/testimonial2.jpg',
    product: 'Auto + Home Bundle',
  },
  {
    name: 'James K.',
    location: 'Portland, OR',
    rating: 5,
    text: 'When a tree fell on our roof during a storm, the claims process was seamless. Our adjuster was on-site within 24 hours and the repairs were covered in full.',
    image: '/images/testimonial1.jpg',
    product: 'Homeowners Insurance',
  },
  {
    name: 'Michael R.',
    location: 'Chicago, IL',
    rating: 5,
    text: 'After comparing quotes from five different companies, this was hands-down the best value. Great coverage, fair price, and exceptional customer service.',
    image: '/images/testimonial3.jpg',
    product: 'Auto Insurance',
  },
]

const FAQS = [
  {
    question: 'How much can I save by bundling my insurance policies?',
    answer: 'Customers who bundle two or more policies typically save an average of $875 per year. Your exact savings will depend on your location, coverage levels, and the specific policies you combine. Get a free quote to see your personalized savings.',
  },
  {
    question: 'What does homeowners insurance typically cover?',
    answer: 'Homeowners insurance generally covers damage to your home\'s structure, personal belongings, liability for injuries on your property, and additional living expenses if your home becomes uninhabitable. Specific coverages and limits vary by policy.',
  },
  {
    question: 'How do I file a claim?',
    answer: 'You can file a claim 24/7 through our website, mobile app, or by calling our claims hotline. Most claims can be initiated in under 10 minutes. Once filed, a dedicated claims adjuster will be assigned to guide you through the process.',
  },
  {
    question: 'Can I customize my coverage levels?',
    answer: 'Absolutely. We believe in providing coverage that fits your unique needs. During the quote process, you can adjust deductibles, coverage limits, and add optional endorsements to create a policy that\'s right for you.',
  },
  {
    question: 'What factors affect my auto insurance premium?',
    answer: 'Several factors influence your auto insurance rate, including your driving record, vehicle type, location, age, credit history, and coverage selections. We also offer numerous discounts that can significantly reduce your premium.',
  },
  {
    question: 'Is renters insurance really necessary?',
    answer: 'While not legally required in most states, renters insurance is highly recommended. For as little as $15/month, it protects your personal belongings from theft, fire, and other covered events, plus provides liability coverage if someone is injured in your rental.',
  },
]

const HOW_IT_WORKS = [
  { step: 1, title: 'Get Your Free Quote', description: 'Enter your ZIP code and answer a few simple questions. It takes less than 5 minutes.', icon: FileText },
  { step: 2, title: 'Customize Your Coverage', description: 'Choose the coverage levels and options that fit your needs and budget.', icon: Shield },
  { step: 3, title: 'Save & Protect', description: 'Complete your purchase online and start your coverage immediately.', icon: Lock },
]

const DISCOUNTS = [
  'Multi-policy Bundle', 'Safe Driver', 'Good Student', 'Home Security System',
  'Claims-Free', 'Paperless Billing', 'Autopay', 'New Home', 'Military & Veterans', 'Loyalty Reward',
]

/* ------------------------------------------------------------------ */
/*  COMPONENTS                                                         */
/* ------------------------------------------------------------------ */

function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-blue-700 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-semibold focus:shadow-lg focus:outline-none"
    >
      Skip to main content
    </a>
  )
}

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-zinc-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg" aria-label="SecureGuard Insurance - Home">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-700 to-blue-900 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-zinc-900 leading-tight tracking-tight">SecureGuard</span>
              <span className="text-xs text-zinc-500 leading-none -mt-0.5">INSURANCE</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            <a href="#products" className="text-sm font-medium text-zinc-700 hover:text-blue-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded">Products</a>
            <a href="#how-it-works" className="text-sm font-medium text-zinc-700 hover:text-blue-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded">How It Works</a>
            <a href="#coverage" className="text-sm font-medium text-zinc-700 hover:text-blue-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded">Coverage</a>
            <a href="#testimonials" className="text-sm font-medium text-zinc-700 hover:text-blue-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded">Reviews</a>
            <a href="#faq" className="text-sm font-medium text-zinc-700 hover:text-blue-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded">FAQ</a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" className="text-zinc-600" asChild>
              <a href="tel:1-800-555-0199">
                <Phone className="w-4 h-4 mr-1.5" aria-hidden="true" />
                1-800-555-0199
              </a>
            </Button>
            <Button variant="outline" size="sm">Log In</Button>
            <Button size="sm" className="bg-blue-700 hover:bg-blue-800">Get a Quote</Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-zinc-600 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav id="mobile-nav" className="md:hidden bg-white border-t border-zinc-100 shadow-lg" aria-label="Mobile navigation">
          <div className="px-4 py-4 space-y-1">
            <a href="#products" className="block text-sm font-medium text-zinc-700 py-3 px-3 rounded-lg hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" onClick={() => setMobileOpen(false)}>Products</a>
            <a href="#how-it-works" className="block text-sm font-medium text-zinc-700 py-3 px-3 rounded-lg hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" onClick={() => setMobileOpen(false)}>How It Works</a>
            <a href="#coverage" className="block text-sm font-medium text-zinc-700 py-3 px-3 rounded-lg hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" onClick={() => setMobileOpen(false)}>Coverage</a>
            <a href="#testimonials" className="block text-sm font-medium text-zinc-700 py-3 px-3 rounded-lg hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" onClick={() => setMobileOpen(false)}>Reviews</a>
            <a href="#faq" className="block text-sm font-medium text-zinc-700 py-3 px-3 rounded-lg hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" onClick={() => setMobileOpen(false)}>FAQ</a>
            <Separator className="my-3" />
            <a href="tel:1-800-555-0199" className="flex items-center gap-2 text-sm font-medium text-zinc-700 py-3 px-3 rounded-lg hover:bg-zinc-50">
              <Phone className="w-4 h-4" aria-hidden="true" />
              1-800-555-0199
            </a>
            <Button className="w-full bg-blue-700 hover:bg-blue-800 mt-2">Get a Quote</Button>
          </div>
        </nav>
      )}
    </header>
  )
}

function HeroSection() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>(['auto'])
  const [zipCode, setZipCode] = useState('')

  const toggleProduct = (id: string) => {
    setSelectedProducts(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    )
  }

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100 rounded-full opacity-30 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-100 rounded-full opacity-30 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text + Form */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-amber-200 px-3 py-1">
                <Zap className="w-3.5 h-3.5 mr-1" />
                Save up to $875/year when you bundle
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 tracking-tight leading-tight">
                Protection you can{' '}
                <span className="text-blue-700">trust</span>, at a price that{' '}
                <span className="relative inline-block">
                  <span className="relative z-10">works</span>
                  <span className="absolute bottom-1 left-0 w-full h-3 bg-amber-300 opacity-40 -z-0 rounded" />
                </span>
              </h1>
              <p className="text-lg text-zinc-600 max-w-xl">
                Only pay for what you need. Customize your coverage and discover how easy it is to protect what matters most.
              </p>
            </div>

            {/* Product Selector */}
            <form onSubmit={handleHeroSubmit} className="bg-white rounded-2xl shadow-lg border border-zinc-200 p-6 space-y-5">
              <fieldset>
                <legend className="text-sm font-semibold text-zinc-700 mb-3">Select products to bundle & save:</legend>
                <div className="flex flex-wrap gap-3" role="group" aria-label="Insurance product selection">
                  {PRODUCTS.map(product => {
                    const Icon = product.icon
                    const isSelected = selectedProducts.includes(product.id)
                    return (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => toggleProduct(product.id)}
                        aria-pressed={isSelected}
                        className={`
                          flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 transition-all text-sm font-medium
                          focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
                          ${isSelected
                            ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm'
                            : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50'
                          }
                        `}
                      >
                        <Icon className="w-4 h-4" aria-hidden="true" />
                        {product.label}
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-600" aria-hidden="true" />}
                      </button>
                    )
                  })}
                </div>
              </fieldset>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <label htmlFor="hero-zip" className="sr-only">ZIP Code</label>
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" aria-hidden="true" />
                  <Input
                    id="hero-zip"
                    type="text"
                    placeholder="Enter ZIP Code"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className="pl-9 h-12 text-base"
                    maxLength={5}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    aria-describedby="zip-help"
                  />
                  <span id="zip-help" className="sr-only">Enter your 5-digit ZIP code to get a price quote</span>
                </div>
                <Button type="submit" size="lg" className="bg-blue-700 hover:bg-blue-800 h-12 px-8 text-base font-semibold shadow-md">
                  Get My Price
                  <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                </Button>
              </div>

              <div aria-live="polite" aria-atomic="true">
                {selectedProducts.length > 1 && (
                  <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 px-3 py-2 rounded-lg">
                    <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                    <span className="font-medium">Bundle discount applied!</span>
                    <span className="text-emerald-600">Save up to 25% with {selectedProducts.length} products</span>
                  </div>
                )}
              </div>
            </form>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-500" role="list" aria-label="Trust indicators">
              <div className="flex items-center gap-1.5" role="listitem">
                <Lock className="w-4 h-4" aria-hidden="true" />
                <span>256-bit Encryption</span>
              </div>
              <div className="flex items-center gap-1.5" role="listitem">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" aria-hidden="true" />
                <span>4.8/5 Rating</span>
              </div>
              <div className="flex items-center gap-1.5" role="listitem">
                <Clock className="w-4 h-4" aria-hidden="true" />
                <span>Quote in under 5 min</span>
              </div>
            </div>
          </div>

          {/* Right: Hero Image */}
          <div className="hidden lg:block relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/hero-family.jpg"
                alt="Happy family protected by SecureGuard insurance"
                className="w-full h-96 object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = 'https://placehold.co/800x600/e2e8f0/475569?text=Protecting+What+Matters'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-zinc-900">Over 2 million families protected</p>
                      <p className="text-xs text-zinc-500">Trusted nationwide since 1975</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating card */}
            <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-lg border border-zinc-200 p-4 z-10">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {['/images/testimonial1.jpg', '/images/testimonial2.jpg', '/images/testimonial3.jpg'].map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`Satisfied customer ${i + 1}`}
                      className="w-8 h-8 rounded-full border-2 border-white object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = `https://placehold.co/64x64/94a3b8/ffffff?text=${i + 1}`
                      }}
                    />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-0.5" role="img" aria-label="Rated 5 out of 5 stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-amber-500 fill-amber-500" aria-hidden="true" />
                    ))}
                  </div>
                  <p className="text-xs text-zinc-500">12,000+ reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function StatsSection() {
  return (
    <section className="bg-white border-y border-zinc-200" aria-label="Company statistics">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, i) => {
            const Icon = stat.icon
            return (
              <div key={i} className="text-center space-y-3">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto">
                  <Icon className="w-6 h-6 text-blue-700" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-3xl md:text-4xl font-bold text-zinc-900">{stat.value}</p>
                  <p className="text-sm font-semibold text-zinc-700 mt-1">{stat.label}</p>
                  <p className="text-xs text-zinc-500 mt-1 max-w-48 mx-auto">{stat.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ProductsSection() {
  return (
    <section id="products" className="bg-zinc-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-3">
          <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">Our Products</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900">We have you covered</h2>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
            Explore our insurance products to find exactly what you need. Bundle for even greater savings.
          </p>
        </div>

        <Tabs defaultValue="auto" className="w-full">
          <TabsList className="flex flex-wrap justify-center gap-2 bg-transparent h-auto mb-8">
            {PRODUCTS.map(product => {
              const Icon = product.icon
              return (
                <TabsTrigger
                  key={product.id}
                  value={product.id}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl data-[state=active]:bg-blue-700 data-[state=active]:text-white data-[state=active]:shadow-md border border-zinc-200 data-[state=active]:border-blue-700 bg-white text-zinc-600"
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                  {product.label}
                </TabsTrigger>
              )
            })}
          </TabsList>

          {PRODUCTS.map(product => {
            const details = PRODUCT_DETAILS[product.id]
            return (
              <TabsContent key={product.id} value={product.id}>
                <Card className="overflow-hidden border-zinc-200 shadow-sm">
                  <div className="grid md:grid-cols-2">
                    <div className="relative h-64 md:h-auto min-h-80">
                      <img
                        src={details.image}
                        alt={details.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = `https://placehold.co/800x600/e2e8f0/475569?text=${encodeURIComponent(details.title)}`
                        }}
                      />
                    </div>
                    <div className="p-8 md:p-10 space-y-6">
                      <div className="space-y-3">
                        <Badge className={PRODUCTS.find(p => p.id === product.id)?.color}>
                          {product.label}
                        </Badge>
                        <h3 className="text-2xl md:text-3xl font-bold text-zinc-900">{details.title}</h3>
                        <p className="text-zinc-600 leading-relaxed">{details.description}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-zinc-700 mb-3">What&apos;s covered:</p>
                        <div className="grid grid-cols-2 gap-2">
                          {details.coverages.map((coverage, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm text-zinc-600">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" aria-hidden="true" />
                              {coverage}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
                        <div>
                          <p className="text-xs text-zinc-500">Starting at</p>
                          <p className="text-2xl font-bold text-blue-700">{details.startingAt}</p>
                        </div>
                        <Button className="bg-blue-700 hover:bg-blue-800">
                          Get a Quote
                          <ChevronRight className="w-4 h-4 ml-1" aria-hidden="true" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            )
          })}
        </Tabs>
      </div>
    </section>
  )
}

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-3">
          <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-200">Simple Process</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900">Get covered in 3 easy steps</h2>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
            Our streamlined process makes it easy to get the protection you need, fast.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-20 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200" />

          {HOW_IT_WORKS.map((step, i) => {
            const Icon = step.icon
            return (
              <div key={i} className="relative text-center space-y-4">
                <div className="relative z-10 w-16 h-16 bg-blue-700 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-blue-700/25">
                  <Icon className="w-7 h-7 text-white" aria-hidden="true" />
                </div>
                <div className="absolute -top-2 -right-2 md:right-auto md:left-1/2 md:ml-4 md:-top-3 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center text-sm font-bold text-zinc-900 shadow-sm z-20" aria-hidden="true">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-zinc-900">{step.title}</h3>
                <p className="text-zinc-600 max-w-xs mx-auto">{step.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function CoverageSection() {
  return (
    <section id="coverage" className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 py-16 md:py-24 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="bg-white/10 text-white border-white/20">Why Choose Us</Badge>
              <h2 className="text-3xl md:text-4xl font-bold">Coverage that goes above and beyond</h2>
              <p className="text-blue-200 text-lg leading-relaxed">
                We don&apos;t just offer insurance &mdash; we offer peace of mind. With comprehensive coverage options, industry-leading claims service, and savings that make a difference, we&apos;re here to protect what matters most.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { title: 'Fast Claims Resolution', desc: 'Average claims processed in under 48 hours with our streamlined digital process.' },
                { title: 'Dedicated Agent Support', desc: 'A real person assigned to your account who knows your coverage inside and out.' },
                { title: 'Flexible Payment Options', desc: 'Pay monthly, quarterly, or annually with no hidden fees or surprise charges.' },
                { title: 'Award-Winning Mobile App', desc: 'Manage your policy, file claims, and access ID cards right from your phone.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-zinc-900" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{item.title}</p>
                    <p className="text-sm text-blue-200">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button size="lg" className="bg-amber-400 hover:bg-amber-500 text-zinc-900 font-semibold shadow-lg">
              Compare Coverage Options
              <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
            </Button>
          </div>

          <div className="space-y-4">
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Available Discounts</CardTitle>
                <CardDescription className="text-blue-200">
                  We offer multiple ways to save on your premium
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {DISCOUNTS.map((discount, i) => (
                    <Badge key={i} className="bg-white/10 text-white border-white/20 hover:bg-white/20 transition-colors">
                      {discount}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <p className="text-3xl font-bold text-amber-400">A+</p>
                  <p className="text-sm text-blue-200 mt-1">AM Best Rating</p>
                </CardContent>
              </Card>
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <p className="text-3xl font-bold text-amber-400">98%</p>
                  <p className="text-sm text-blue-200 mt-1">Claims Satisfaction</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-zinc-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-3">
          <Badge variant="secondary" className="bg-amber-50 text-amber-700 border-amber-200">Customer Stories</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900">What our customers say</h2>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
            Hear from real customers about their experience with our insurance products and service.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, i) => (
            <Card key={i} className="border-zinc-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <Quote className="w-8 h-8 text-blue-200" aria-hidden="true" />
                <p className="text-zinc-700 leading-relaxed">{testimonial.text}</p>
                <div className="flex items-center gap-1" role="img" aria-label={`Rated ${testimonial.rating} out of 5 stars`}>
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-500 fill-amber-500" aria-hidden="true" />
                  ))}
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = `https://placehold.co/80x80/94a3b8/ffffff?text=${testimonial.name.charAt(0)}`
                    }}
                  />
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">{testimonial.name}</p>
                    <p className="text-xs text-zinc-500">{testimonial.location} &bull; {testimonial.product}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function QuoteFormSection() {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', zipCode: '', productType: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="quote" className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">Free Quote</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900">
              Ready to see how much you could save?
            </h2>
            <p className="text-lg text-zinc-600 leading-relaxed">
              Get a personalized quote in minutes. No obligation, no hidden fees &mdash; just honest pricing tailored to your needs.
            </p>
            <div className="space-y-4">
              {[
                'Free, no-obligation quote in under 5 minutes',
                'Personalized coverage recommendations',
                'Instant multi-policy discount calculations',
                'Speak with a licensed agent anytime',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-zinc-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <Card className="shadow-xl border-zinc-200">
            <CardHeader>
              <CardTitle className="text-xl">{submitted ? 'Thank You!' : 'Get Your Free Quote'}</CardTitle>
              <CardDescription>{submitted ? 'We\'ve received your information and will prepare your personalized quote.' : 'Fill out the form below and we\'ll prepare your personalized quote.'}</CardDescription>
            </CardHeader>
            {submitted ? (
              <CardContent className="space-y-4 text-center py-8">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" aria-hidden="true" />
                </div>
                <p className="text-zinc-700">A licensed agent will contact you within 24 hours with your personalized quote.</p>
                <Button onClick={() => setSubmitted(false)} variant="outline" className="mt-4">
                  Submit Another Quote
                </Button>
              </CardContent>
            ) : (
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Smith"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quoteZip">ZIP Code</Label>
                  <Input
                    id="quoteZip"
                    placeholder="10001"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    maxLength={5}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label id="product-interest-label">I&apos;m interested in:</Label>
                <div className="flex flex-wrap gap-2" role="group" aria-labelledby="product-interest-label">
                  {PRODUCTS.map(product => {
                    const Icon = product.icon
                    const isSelected = formData.productType === product.id
                    return (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, productType: product.id })}
                        aria-pressed={isSelected}
                        className={`
                          flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm transition-all
                          focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
                          ${isSelected
                            ? 'border-blue-600 bg-blue-50 text-blue-700'
                            : 'border-zinc-200 text-zinc-600 hover:border-zinc-300'
                          }
                        `}
                      >
                        <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                        {product.label}
                      </button>
                    )
                  })}
                </div>
              </div>
              <Button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 h-12 text-base font-semibold mt-2">
                Get My Free Quote
                <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
              </Button>
              <p className="text-xs text-zinc-500 text-center">
                By submitting, you agree to our Terms of Service and Privacy Policy. No spam, ever.
              </p>
              </form>
            </CardContent>
            )}
          </Card>
        </div>
      </div>
    </section>
  )
}

function FAQSection() {
  return (
    <section id="faq" className="bg-zinc-50 py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-3">
          <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">FAQ</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900">Frequently asked questions</h2>
          <p className="text-lg text-zinc-600">
            Find answers to common questions about our insurance products and services.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {FAQS.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="bg-white border border-zinc-200 rounded-xl px-6 overflow-hidden">
              <AccordionTrigger className="text-left font-semibold text-zinc-900 hover:text-blue-700 py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-zinc-600 leading-relaxed pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center mt-10">
          <p className="text-zinc-600 mb-4">Still have questions?</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline" className="border-zinc-300">
              <Phone className="w-4 h-4 mr-2" aria-hidden="true" />
              Call 1-800-555-0199
            </Button>
            <Button className="bg-blue-700 hover:bg-blue-800">
              Chat with an Agent
              <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-800 py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Start protecting what matters most
        </h2>
        <p className="text-lg text-blue-200 max-w-2xl mx-auto">
          Join over 2 million customers who trust us with their insurance. Get your personalized quote in under 5 minutes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-amber-400 hover:bg-amber-500 text-zinc-900 font-semibold shadow-lg h-14 px-8 text-base">
            Get a Free Quote
            <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
          </Button>
          <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 h-14 px-8 text-base">
            <Phone className="w-5 h-5 mr-2" aria-hidden="true" />
            Talk to an Agent
          </Button>
        </div>
        <p className="text-sm text-blue-300">No obligation &bull; No credit card required &bull; Cancel anytime</p>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-400 py-16" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Company */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <div>
                <span className="text-sm font-bold text-white">SecureGuard</span>
                <span className="text-xs text-zinc-500 block leading-none">INSURANCE</span>
              </div>
            </div>
            <p className="text-sm text-zinc-500 mb-4 max-w-xs">
              Trusted protection for families and individuals nationwide. Comprehensive coverage at competitive prices.
            </p>
            <a href="tel:1-800-555-0199" className="flex items-center gap-2 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
              <Phone className="w-4 h-4" aria-hidden="true" />
              <span className="text-sm">1-800-555-0199</span>
            </a>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Products</h3>
            <ul className="space-y-2.5">
              {['Auto Insurance', 'Homeowners Insurance', 'Renters Insurance', 'Life Insurance', 'Pet Insurance', 'Umbrella Insurance'].map((item) => (
                <li key={item}>
                  <a href="#products" className="text-sm text-zinc-500 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2.5">
              {['File a Claim', 'Manage Your Policy', 'Pay Your Bill', 'Contact Us', 'Find an Agent', 'Mobile App'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2.5">
              {['About Us', 'Careers', 'Newsroom', 'Corporate Responsibility', 'Investor Relations', 'Partner With Us'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="bg-zinc-800 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500">
          <p>&copy; 2026 SecureGuard Insurance. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">Accessibility</a>
            <a href="#" className="hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">Fraud Protection</a>
            <a href="#" className="hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">Site Map</a>
          </div>
        </div>

        <p className="text-xs text-zinc-600 mt-6 leading-relaxed">
          The information on this website is for general informational purposes only and does not constitute a contract for insurance.
          Coverage, prices, and availability may vary by state. All insurance policies are subject to the terms, conditions, limitations,
          and exclusions of the specific policy issued. Please review your policy documents for complete details.
        </p>
      </div>
    </footer>
  )
}

/* ------------------------------------------------------------------ */
/*  MAIN APP                                                           */
/* ------------------------------------------------------------------ */

function App() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <SkipToContent />
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <StatsSection />
        <ProductsSection />
        <HowItWorksSection />
        <CoverageSection />
        <TestimonialsSection />
        <QuoteFormSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}

export default App
