import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCart } from '@/contexts/CartContext';
import { getProductById, sampleProducts } from '@/data/products';
import { useToast } from '@/hooks/use-toast';
import { Star, Heart, Share2, Truck, Shield, ArrowLeft, Plus, Minus } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const { toast } = useToast();
  
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = getProductById(id || '');
  const relatedProducts = sampleProducts.filter(p => p.category === product?.category && p.id !== id).slice(0, 4);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
        <Button asChild>
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast({
        title: "Please select options",
        description: "Please choose both size and color before adding to cart.",
        variant: "destructive",
      });
      return;
    }

    addItem({
      ...product,
      selectedSize,
      selectedColor,
    });

    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  // Mock images - in a real app, you'd have multiple product images
  const productImages = [product.image, product.image, product.image];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
        <Link to="/" className="hover:text-primary transition-smooth">Home</Link>
        <span>/</span>
        <Link to={`/${product.category}`} className="hover:text-primary transition-smooth capitalize">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg shadow-card">
            <img
              src={productImages[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {productImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square overflow-hidden rounded-lg border-2 transition-smooth ${
                  selectedImage === index ? 'border-primary' : 'border-border hover:border-primary/50'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <Badge className="mb-2 gradient-accent text-accent-foreground">
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">(128 reviews)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <p className="text-3xl font-bold text-primary mb-6">${product.price}</p>
          </div>

          {/* Size Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Size</label>
            <Select value={selectedSize} onValueChange={setSelectedSize}>
              <SelectTrigger>
                <SelectValue placeholder="Choose your size" />
              </SelectTrigger>
              <SelectContent>
                {product.sizes.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Color Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Color</label>
            <div className="flex space-x-3">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-full border-2 transition-smooth ${
                    selectedColor === color ? 'border-primary ring-2 ring-primary/20' : 'border-border hover:border-primary/50'
                  }`}
                  style={{ backgroundColor: color.toLowerCase() }}
                  title={color}
                />
              ))}
            </div>
            {selectedColor && (
              <p className="text-sm text-muted-foreground">Selected: {selectedColor}</p>
            )}
          </div>

          {/* Quantity */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Quantity</label>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="space-y-4">
            <Button
              size="lg"
              className="w-full gradient-accent text-accent-foreground hover:opacity-90"
              onClick={handleAddToCart}
            >
              Add to Cart - ${(product.price * quantity).toFixed(2)}
            </Button>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Truck className="w-4 h-4" />
                <span>Free shipping over $100</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Shield className="w-4 h-4" />
                <span>30-day returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="sizing">Size Guide</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6">
            <div className="prose max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
              <div className="mt-6">
                <h4 className="font-semibold mb-3">Features:</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Premium quality materials</li>
                  <li>• Carefully crafted construction</li>
                  <li>• Timeless design</li>
                  <li>• Available in multiple colors</li>
                </ul>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="sizing" className="mt-6">
            <div className="prose max-w-none">
              <h4 className="font-semibold mb-4">Size Guide</h4>
              <p className="text-muted-foreground mb-6">
                Our sizes are designed to provide the perfect fit. If you're between sizes, we recommend sizing up.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-border">
                  <thead>
                    <tr>
                      <th className="border border-border p-3 text-left">Size</th>
                      <th className="border border-border p-3 text-left">Chest (inches)</th>
                      <th className="border border-border p-3 text-left">Waist (inches)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.sizes.map((size) => (
                      <tr key={size}>
                        <td className="border border-border p-3 font-medium">{size}</td>
                        <td className="border border-border p-3 text-muted-foreground">32-34</td>
                        <td className="border border-border p-3 text-muted-foreground">26-28</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Customer Reviews</h4>
                <Button variant="outline">Write a Review</Button>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map((review) => (
                  <div key={review} className="border-b border-border pb-4 last:border-b-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-secondary text-secondary" />
                        ))}
                      </div>
                      <span className="font-medium text-sm">Sarah M.</span>
                      <span className="text-sm text-muted-foreground">Verified Purchase</span>
                    </div>
                    <p className="text-muted-foreground">
                      Love this piece! The quality is excellent and it fits perfectly. Highly recommend!
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-8">You May Also Like</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Card key={relatedProduct.id} className="group cursor-pointer transition-smooth hover:shadow-hover">
                <Link to={`/product/${relatedProduct.id}`}>
                  <div className="aspect-[4/5] overflow-hidden rounded-t-lg">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover transition-smooth group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-smooth">
                        {relatedProduct.name}
                      </h4>
                      <p className="text-lg font-bold text-primary">${relatedProduct.price}</p>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;