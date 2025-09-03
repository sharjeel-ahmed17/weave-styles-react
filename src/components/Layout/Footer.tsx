import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Contact */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-accent rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-sm">E</span>
              </div>
              <span className="text-xl font-bold">Elegance</span>
            </div>
            <p className="text-primary-foreground/80 text-sm">
              Discover timeless fashion that celebrates your unique style. Quality craftsmanship meets modern design.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="w-4 h-4" />
                <span>hello@elegance.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="w-4 h-4" />
                <span>123 Fashion St, NY 10001</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              {['About Us', 'Size Guide', 'Shipping Info', 'Returns', 'Contact'].map((link) => (
                <Link
                  key={link}
                  to={`/${link.toLowerCase().replace(' ', '-')}`}
                  className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-smooth"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Shop</h3>
            <div className="space-y-2">
              {['Women\'s Fashion', 'Men\'s Fashion', 'Accessories', 'New Arrivals', 'Sale'].map((category) => (
                <Link
                  key={category}
                  to={`/${category.toLowerCase().replace(/['s\s]/g, '-')}`}
                  className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-smooth"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay Updated</h3>
            <p className="text-sm text-primary-foreground/80">
              Subscribe to get special offers, free giveaways, and exclusive deals.
            </p>
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
              />
              <Button className="w-full gradient-accent text-accent-foreground hover:opacity-90">
                Subscribe
              </Button>
            </div>
            <div className="flex space-x-4 pt-4">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <Icon className="w-4 h-4" />
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-primary-foreground/80">
              © 2024 Elegance. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
                <Link
                  key={link}
                  to={`/${link.toLowerCase().replace(' ', '-')}`}
                  className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-smooth"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;