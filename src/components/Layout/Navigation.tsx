import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { ShoppingBag, Search, Menu, X, User, Heart } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { itemCount } = useCart();
  const location = useLocation();

  const navigationItems = [
    { name: 'Home', href: '/' },
    { name: 'Women', href: '/women' },
    { name: 'Men', href: '/men' },
    { name: 'Accessories', href: '/accessories' },
    { name: 'Sale', href: '/sale' },
  ];

  const isActiveLink = (href: string) => {
    return location.pathname === href;
  };

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-hero rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">E</span>
            </div>
            <span className="text-xl font-bold text-primary">Elegance</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-smooth hover:text-primary ${
                  isActiveLink(item.href)
                    ? 'text-primary border-b-2 border-primary pb-1'
                    : 'text-muted-foreground'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center space-x-4 flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
              <User className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
              <Heart className="w-4 h-4" />
            </Button>
            <Link to="/cart">
              <Button variant="ghost" size="sm" className="relative text-muted-foreground hover:text-primary">
                <ShoppingBag className="w-4 h-4" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs gradient-accent text-accent-foreground">
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-muted/50 border-none"
                />
              </div>

              {/* Mobile Navigation Links */}
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium py-2 px-4 rounded-md transition-smooth ${
                    isActiveLink(item.href)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-primary hover:bg-muted'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile Actions */}
              <div className="flex items-center justify-around pt-4 border-t border-border">
                <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1">
                  <User className="w-5 h-5" />
                  <span className="text-xs">Account</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1">
                  <Heart className="w-5 h-5" />
                  <span className="text-xs">Wishlist</span>
                </Button>
                <Link to="/cart">
                  <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1 relative">
                    <ShoppingBag className="w-5 h-5" />
                    <span className="text-xs">Cart</span>
                    {itemCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs gradient-accent">
                        {itemCount}
                      </Badge>
                    )}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;