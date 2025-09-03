import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import heroImage from '@/assets/hero-fashion.jpg';
import { getFeaturedProducts, getNewArrivals } from '@/data/products';
import { ArrowRight, Star, Truck, Shield, RefreshCw } from 'lucide-react';

const Index = () => {
  const featuredProducts = getFeaturedProducts();
  const newArrivals = getNewArrivals();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-transparent" />
        <div className="relative z-10 text-center text-primary-foreground max-w-4xl px-4">
          <Badge className="mb-4 gradient-accent text-accent-foreground">New Collection</Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Discover Your
            <span className="block gradient-accent bg-clip-text text-transparent">
              Perfect Style
            </span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Elevate your wardrobe with our curated collection of premium fashion pieces. 
            From timeless classics to contemporary trends.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gradient-accent text-accent-foreground hover:opacity-90 shadow-elegant">
              Shop Women <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20">
              Shop Men
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Truck, title: 'Free Shipping', description: 'Free shipping on orders over $100' },
              { icon: Shield, title: 'Secure Payment', description: '100% secure payment processing' },
              { icon: RefreshCw, title: 'Easy Returns', description: '30-day hassle-free returns' }
            ].map((feature, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto gradient-hero rounded-full flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our handpicked selection of premium fashion pieces that define elegance and style.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group cursor-pointer transition-smooth hover:shadow-hover">
                <Link to={`/product/${product.id}`}>
                  <div className="aspect-[4/5] overflow-hidden rounded-t-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-smooth group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="text-xs">
                          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                        </Badge>
                        <div className="flex items-center">
                          <Star className="w-3 h-3 fill-secondary text-secondary" />
                          <Star className="w-3 h-3 fill-secondary text-secondary" />
                          <Star className="w-3 h-3 fill-secondary text-secondary" />
                          <Star className="w-3 h-3 fill-secondary text-secondary" />
                          <Star className="w-3 h-3 fill-secondary text-secondary" />
                        </div>
                      </div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-smooth">
                        {product.name}
                      </h3>
                      <p className="text-lg font-bold text-primary">${product.price}</p>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link to="/women">
                View All Products <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 gradient-accent text-accent-foreground">Just In</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">New Arrivals</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Stay ahead of the trends with our latest collection of contemporary fashion pieces.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <Card key={product.id} className="group cursor-pointer transition-smooth hover:shadow-hover">
                <Link to={`/product/${product.id}`}>
                  <div className="aspect-[4/5] overflow-hidden rounded-t-lg relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-smooth group-hover:scale-105"
                    />
                    <Badge className="absolute top-2 left-2 gradient-accent text-accent-foreground">
                      New
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <Badge variant="secondary" className="text-xs">
                        {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                      </Badge>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-smooth">
                        {product.name}
                      </h3>
                      <p className="text-lg font-bold text-primary">${product.price}</p>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto text-primary-foreground">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay in Style</h2>
            <p className="mb-8 text-primary-foreground/90">
              Subscribe to our newsletter and be the first to know about new arrivals, exclusive offers, and style tips.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <Button className="gradient-accent text-accent-foreground hover:opacity-90 px-8">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
