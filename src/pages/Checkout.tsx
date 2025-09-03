import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, Truck, Shield, Lock } from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, total, itemCount, clearCart } = useCart();
  const { toast } = useToast();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    // Shipping Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    
    // Payment Info
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    
    // Options
    saveInfo: false,
    sameAsBilling: true,
  });

  const shippingCost = total >= 100 ? 0 : 9.99;
  const tax = total * 0.08;
  const finalTotal = total + shippingCost + tax;

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Clear cart and redirect to thank you page
    clearCart();
    navigate('/thank-you');
    
    toast({
      title: "Order placed successfully!",
      description: "Thank you for your purchase. You'll receive a confirmation email shortly.",
    });
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Checkout</h1>
        <p className="text-muted-foreground">Complete your purchase</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Shipping Information */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Truck className="w-5 h-5" />
                  <span>Shipping Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CA">California</SelectItem>
                        <SelectItem value="NY">New York</SelectItem>
                        <SelectItem value="TX">Texas</SelectItem>
                        <SelectItem value="FL">Florida</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <span>Payment Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="card" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="card">Credit Card</TabsTrigger>
                    <TabsTrigger value="paypal">PayPal</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="card" className="space-y-4 mt-6">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={(e) => handleInputChange('cvv', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input
                        id="cardName"
                        value={formData.cardName}
                        onChange={(e) => handleInputChange('cardName', e.target.value)}
                        required
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="paypal" className="mt-6">
                    <div className="text-center py-8 border border-border rounded-lg">
                      <p className="text-muted-foreground mb-4">
                        You'll be redirected to PayPal to complete your payment.
                      </p>
                      <Button variant="outline" className="gradient-accent text-accent-foreground">
                        Continue with PayPal
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Options */}
            <Card className="shadow-card">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="saveInfo"
                      checked={formData.saveInfo}
                      onCheckedChange={(checked) => handleInputChange('saveInfo', checked as boolean)}
                    />
                    <Label
                      htmlFor="saveInfo"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Save this information for next time
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="newsletter"
                      defaultChecked
                    />
                    <Label
                      htmlFor="newsletter"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Subscribe to our newsletter for exclusive offers
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 shadow-card">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Items */}
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 text-sm">
                      <div className="w-12 h-12 overflow-hidden rounded-md">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium truncate">{item.name}</p>
                        <p className="text-muted-foreground">
                          {item.selectedSize} • {item.selectedColor} • Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal ({itemCount} items)</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span className={shippingCost === 0 ? 'text-secondary' : ''}>
                      {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-lg font-semibold pt-2 border-t border-border">
                    <span>Total</span>
                    <span className="text-primary">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full gradient-accent text-accent-foreground hover:opacity-90"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <span className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      <span>Processing...</span>
                    </span>
                  ) : (
                    <span className="flex items-center space-x-2">
                      <Lock className="w-4 h-4" />
                      <span>Complete Purchase</span>
                    </span>
                  )}
                </Button>

                {/* Trust Signals */}
                <div className="pt-4 border-t border-border space-y-2">
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Shield className="w-3 h-3" />
                    <span>256-bit SSL encryption</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Shield className="w-3 h-3" />
                    <span>PCI DSS compliant</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Shield className="w-3 h-3" />
                    <span>30-day money-back guarantee</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;