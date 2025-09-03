import React, { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { sampleProducts } from '@/data/products';
import { Product } from '@/contexts/CartContext';
import { ArrowLeft } from 'lucide-react';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    
    const lowercaseQuery = query.toLowerCase();
    return sampleProducts.filter(product =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery)
    );
  }, [query]);

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
      <div className="mb-8">
        <Link to="/">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
        <h1 className="text-3xl font-bold mb-2">Search Results</h1>
        <p className="text-muted-foreground">
          {query ? (
            <>
              {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{query}"
            </>
          ) : (
            'Enter a search term to find products'
          )}
        </p>
      </div>

      {query && searchResults.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {searchResults.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : query && searchResults.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No products found for "{query}"</p>
          <p className="text-sm text-muted-foreground mb-6">Try searching with different keywords</p>
          <Link to="/">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Start typing in the search bar to find products</p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;