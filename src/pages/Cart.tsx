import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  addToCart,
  reduceDiscount,
  removeCartItem,
  updateCartDetails,
} from "@/redux/reducer/cartReducer";
import { server } from "@/redux/store";
import type { CartInitialState } from "@/types/reducer";
import type { CartItems } from "@/types/types";
import axios from "axios";
import {
  Trash2,
  Plus,
  Minus,
  Package,
  CreditCard,
  Truck,
  Shield,
  ShoppingBasketIcon,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const {
    cartItems: items,
    subtotal,
    total,
    discount,
    tax,
    shippingCharges,
  } = useSelector(
    (state: { cartReducer: CartInitialState }) => state.cartReducer
  );
  const [coupon , setCoupon] = useState("");
  const dispatch = useDispatch();
  const QuantityHandler = useCallback(
    (cartItem: CartItems, value: number) => {
      if (value === 1 && cartItem.quantity >= cartItem.stock)
        return toast.error("items Stock Out");
      if (value === -1 && cartItem.quantity <= 1) {
        dispatch(removeCartItem({ id: cartItem.productId }));
      } else {
        dispatch(
          addToCart({ ...cartItem, quantity: cartItem.quantity + value })
        );
      }
    },
    [dispatch]
  );

  const  discounthander  = useCallback( async ()=> {
    const {data} = await axios.get(`${server}/api/v1/payment/coupon/discount/?code=${coupon}`)

    if (data.statusCode === 200){
      dispatch(reduceDiscount(data.data))
    }
  }, [coupon])

  useEffect(() => {
    dispatch(updateCartDetails());
  }, [dispatch, items, discount]);

  return (
    <div className="mx-auto w-full max-w-7xl p-6 font-[Geist]">
      {items?.length === 0 ? (
        <div className="flex flex-col gap-10 justify-center items-center">
          <h1 className="scroll-m-20 text-muted-foreground text-center text-4xl font-extrabold tracking-tight text-balance">
            No Product added
          </h1>
          <ShoppingBasketIcon size={100} className="text-muted-foreground" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Cart Section */}
          <div className="space-y-6 lg:col-span-2">
            <div>
              <h1 className="text-2xl font-semibold">Shopping Cart</h1>
              <p className="text-muted-foreground">
                {items?.length} {items?.length === 1 ? "item" : "items"} in your
                cart
              </p>
            </div>

            <div className="space-y-4">
              {items?.map((item) => (
                <Card key={item.productId} className="overflow-hidden p-0">
                  <CardContent className="p-0">
                    <div className="flex h-full flex-col md:flex-row">
                      {/* Product Image */}
                      <div className="relative h-auto w-full md:w-32">
                        <img
                          src={`${server}/${item.photo}`}
                          alt={item.name}
                          width={500}
                          height={500}
                          className="h-full w-full object-cover md:w-32"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 p-6 pb-3">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-muted-foreground text-sm">
                              {/* Add some text Here */}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              dispatch(removeCartItem({ id: item.productId }))
                            }
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => QuantityHandler(item, -1)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => QuantityHandler(item, 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="text-right">
                            <div className="font-medium">
                              ₹{item.price * item.quantity}
                            </div>
                            {item.originalPrice && (
                              <div className="text-muted-foreground text-sm line-through">
                                ₹
                                {(item.originalPrice * item.quantity).toFixed(
                                  2
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>
                  Review your order details and shipping information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Promo Code */}
                <div className="space-y-2">
                  <Label>Promo Code</Label>
                  <div className=" flex-col flex gap-1">
                  <div className="flex gap-1">
                    <Input onChange={(e)=> setCoupon(e.target.value)} placeholder="Enter promo code" />
                    <Button onClick={discounthander} variant="outline">Apply</Button>
                  </div>
                    {
                      discount ? <span className="text-sm font-semibold text-green-400">You Got it Discount ₹{discount}</span>: ""
                    }

                  </div>
                </div>

                {/* Order Summary */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₹{subtotal?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping Charges</span>
                    <span>₹{shippingCharges?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Discount</span>
                    <span>₹{discount?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>
                      Taxes <span className="text-muted-foreground">( 8% )</span>
                    </span>
                    <span>₹{tax?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>₹{total?.toFixed(2)}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4 border-t pt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Package className="text-primary h-4 w-4" />
                    <span>Free returns within 30 days</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="text-primary h-4 w-4" />
                    <span>Secure payment</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Truck className="text-primary h-4 w-4" />
                    <span>Fast delivery</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Button className="w-full">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Proceed to Checkout
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};
export default Cart;
