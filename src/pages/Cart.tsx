import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { Plus, Minus, X, ShoppingBag, ArrowRight } from 'lucide-react';

const Cart = () => {
  const { items, total, itemCount, updateQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-md mx-auto">
          <div className="w-20 h-20 mx-auto mb-6 gradient-hero rounded-full flex items-center justify-center">
            <ShoppingBag className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
          </p>
          <Button size="lg" className="gradient-accent text-accent-foreground hover:opacity-90" asChild>
            <Link to="/">
              Continue Shopping <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const getItemKey = (item: any) => `${item.id}-${item.selectedSize}-${item.selectedColor}`;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
        <p className="text-muted-foreground">
          {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={getItemKey(item)} className="shadow-card">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Product Image */}
                  <div className="w-full sm:w-32 aspect-square overflow-hidden rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <Badge variant="secondary" className="mb-2 text-xs">
                          {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                        </Badge>
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                          <span>Size: {item.selectedSize}</span>
                          <span className="flex items-center space-x-1">
                            <span>Color:</span>
                            <div
                              className="w-4 h-4 rounded-full border border-border"
                              style={{ backgroundColor: item.selectedColor.toLowerCase() }}
                            />
                            <span>{item.selectedColor}</span>
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(getItemKey(item))}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Quantity and Price */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-primary">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24 shadow-card">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal ({itemCount} items)</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-secondary">
                    {total >= 100 ? 'Free' : '$9.99'}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${(total * 0.08).toFixed(2)}</span>
                </div>
                
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-primary">
                      ${(total + (total >= 100 ? 0 : 9.99) + total * 0.08).toFixed(2)}
                    </span>
                  </div>
                </div>

                {total < 100 && (
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <p className="text-sm text-accent-dark">
                      Add ${(100 - total).toFixed(2)} more for free shipping!
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-3 mt-6">
                <Button
                  size="lg"
                  className="w-full gradient-accent text-accent-foreground hover:opacity-90"
                  asChild
                >
                  <Link to="/checkout">
                    Proceed to Checkout <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                
                <Button variant="outline" size="lg" className="w-full" asChild>
                  <Link to="/">Continue Shopping</Link>
                </Button>
              </div>

              {/* Trust Signals */}
              <div className="mt-6 pt-6 border-t border-border space-y-3">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <div className="w-4 h-4 gradient-hero rounded-full" />
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <div className="w-4 h-4 gradient-hero rounded-full" />
                  <span>Free returns within 30 days</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <div className="w-4 h-4 gradient-hero rounded-full" />
                  <span>Customer service available 24/7</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;