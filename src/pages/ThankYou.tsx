import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Package, Truck, Mail, ArrowRight, Download } from 'lucide-react';

const ThankYou = () => {
  // Mock order data - in a real app, this would come from the checkout process
  const orderData = {
    orderNumber: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    orderDate: new Date().toLocaleDateString(),
    estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    email: 'customer@example.com',
    total: 299.99,
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 mx-auto mb-6 gradient-accent rounded-full flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-accent-foreground" />
        </div>

        {/* Thank You Message */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Thank You for Your Order!</h1>
          <p className="text-lg text-muted-foreground mb-2">
            Your order has been successfully placed and is being processed.
          </p>
          <Badge className="gradient-hero text-primary-foreground">
            Order #{orderData.orderNumber}
          </Badge>
        </div>

        {/* Order Details Card */}
        <Card className="shadow-card mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div>
                <h3 className="font-semibold mb-3 flex items-center space-x-2">
                  <Package className="w-4 h-4" />
                  <span>Order Details</span>
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Order Number:</span>
                    <span className="font-medium">{orderData.orderNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Order Date:</span>
                    <span className="font-medium">{orderData.orderDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total:</span>
                    <span className="font-bold text-primary">${orderData.total}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3 flex items-center space-x-2">
                  <Truck className="w-4 h-4" />
                  <span>Shipping Info</span>
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Estimated Delivery:</span>
                    <span className="font-medium">{orderData.estimatedDelivery}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping Method:</span>
                    <span className="font-medium">Standard Shipping</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tracking:</span>
                    <span className="font-medium">Available soon</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="shadow-card mb-8">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4 flex items-center justify-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>What Happens Next?</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="space-y-2">
                <div className="w-10 h-10 mx-auto gradient-hero rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">1</span>
                </div>
                <h4 className="font-medium">Order Confirmation</h4>
                <p className="text-sm text-muted-foreground">
                  You'll receive an email confirmation at {orderData.email}
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="w-10 h-10 mx-auto gradient-hero rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">2</span>
                </div>
                <h4 className="font-medium">Processing</h4>
                <p className="text-sm text-muted-foreground">
                  We'll prepare your order and send tracking information
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="w-10 h-10 mx-auto gradient-hero rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">3</span>
                </div>
                <h4 className="font-medium">Delivery</h4>
                <p className="text-sm text-muted-foreground">
                  Your order will arrive by {orderData.estimatedDelivery}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            variant="outline"
            className="flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Receipt</span>
          </Button>
          
          <Button
            size="lg"
            className="gradient-accent text-accent-foreground hover:opacity-90"
            asChild
          >
            <Link to="/">
              Continue Shopping <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Support Info */}
        <div className="mt-12 p-6 bg-muted/30 rounded-lg">
          <h3 className="font-semibold mb-2">Need Help?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            If you have any questions about your order, don't hesitate to contact us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="ghost" size="sm">
              Contact Support
            </Button>
            <Button variant="ghost" size="sm">
              Track Your Order
            </Button>
            <Button variant="ghost" size="sm">
              Return Policy
            </Button>
          </div>
        </div>

        {/* Social Sharing */}
        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">
            Love your purchase? Share it with friends!
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" size="sm">Share on Facebook</Button>
            <Button variant="outline" size="sm">Share on Instagram</Button>
            <Button variant="outline" size="sm">Share on Twitter</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;