import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { sampleProducts, getProductsByCategory } from '@/data/products';
import { Product } from '@/contexts/CartContext';
import { Filter, Grid, List, ChevronDown } from 'lucide-react';

interface ProductListingProps {
  category: string;
}

const ProductListing: React.FC<ProductListingProps> = ({ category }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const products = useMemo(() => {
    let filtered = category === 'sale' ? sampleProducts : getProductsByCategory(category);
    
    // Apply price filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Apply size filter
    if (selectedSizes.length > 0) {
      filtered = filtered.filter(product =>
        product.sizes.some(size => selectedSizes.includes(size))
      );
    }

    // Apply color filter
    if (selectedColors.length > 0) {
      filtered = filtered.filter(product =>
        product.colors.some(color => selectedColors.includes(color))
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        return filtered.sort((a, b) => a.price - b.price);
      case 'price-high':
        return filtered.sort((a, b) => b.price - a.price);
      case 'name':
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return filtered;
    }
  }, [category, priceRange, selectedSizes, selectedColors, sortBy]);

  const allSizes = Array.from(new Set(sampleProducts.flatMap(p => p.sizes)));
  const allColors = Array.from(new Set(sampleProducts.flatMap(p => p.colors)));

  const handleSizeToggle = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const handleColorToggle = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
    <Card className="group cursor-pointer transition-smooth hover:shadow-hover">
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
            <Badge variant="secondary" className="text-xs">
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </Badge>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-smooth">
              {product.name}
            </h3>
            <div className="flex items-center space-x-2">
              {product.colors.slice(0, 3).map((color, index) => (
                <div
                  key={index}
                  className="w-4 h-4 rounded-full border border-border"
                  style={{ backgroundColor: color.toLowerCase() }}
                />
              ))}
              {product.colors.length > 3 && (
                <span className="text-xs text-muted-foreground">+{product.colors.length - 3}</span>
              )}
            </div>
            <p className="text-lg font-bold text-primary">${product.price}</p>
          </div>
        </CardContent>
      </Link>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Filters Sidebar */}
        <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="sticky top-24 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedSizes([]);
                  setSelectedColors([]);
                  setPriceRange([0, 500]);
                }}
              >
                Clear All
              </Button>
            </div>

            {/* Price Range */}
            <div className="space-y-3">
              <h3 className="font-medium">Price Range</h3>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={500}
                min={0}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>

            {/* Size Filter */}
            <div className="space-y-3">
              <h3 className="font-medium">Size</h3>
              <div className="grid grid-cols-3 gap-2">
                {allSizes.map((size) => (
                  <div key={size} className="flex items-center space-x-2">
                    <Checkbox
                      id={`size-${size}`}
                      checked={selectedSizes.includes(size)}
                      onCheckedChange={() => handleSizeToggle(size)}
                    />
                    <label
                      htmlFor={`size-${size}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {size}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Color Filter */}
            <div className="space-y-3">
              <h3 className="font-medium">Color</h3>
              <div className="space-y-2">
                {allColors.map((color) => (
                  <div key={color} className="flex items-center space-x-2">
                    <Checkbox
                      id={`color-${color}`}
                      checked={selectedColors.includes(color)}
                      onCheckedChange={() => handleColorToggle(color)}
                    />
                    <label
                      htmlFor={`color-${color}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center space-x-2"
                    >
                      <div
                        className="w-4 h-4 rounded-full border border-border"
                        style={{ backgroundColor: color.toLowerCase() }}
                      />
                      <span>{color}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-2xl font-bold capitalize">
                {category === 'sale' ? 'Sale Items' : `${category}'s Fashion`}
              </h1>
              <p className="text-muted-foreground">{products.length} products found</p>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center space-x-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products found matching your criteria.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedSizes([]);
                  setSelectedColors([]);
                  setPriceRange([0, 500]);
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;