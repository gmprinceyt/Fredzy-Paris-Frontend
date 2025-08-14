import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  BadgeCheck,
  Box,
  CircleCheckBig,
  Clock,
  Info,
  ShieldCheckIcon,
  TruckElectricIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

const TrackOrders = () => {
  const [progress, setProgress] = useState(13);
  
  


  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="max-w-[1280px] px-3 m-auto font-[Geist] flex flex-col gap-3">
      {/* Information */}
      <section className="flex flex-col md:flex-row md:items-center  gap-2">
        {/* Order Information */}
        <Card className="px-0 pt-3 ">
          <CardHeader className="border-b ">
            <CardTitle className="text-xl flex gap-1">
              <ShieldCheckIcon /> Order ORD-12345
            </CardTitle>
            <span className="text-base flex gap-1 text-muted-foreground ">
              <Clock /> Placed on 2025-04-15
            </span>
          </CardHeader>
          <CardContent className="flex flex-col space-y-1 ">
            <h2 className="font-semibold text-lg flex gap-1">
              <Info />
              Customer Information
            </h2>
            <h5 className="text-muted-foreground ">Alice Johnson</h5>
            <h5 className="text-muted-foreground ">alice@example.com</h5>
            <address className="text-muted-foreground ">
              123 Main St, Anytown, AN 12345
            </address>
          </CardContent>
        </Card>
        {/* Order Summary */}
        <Card>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>₹00.00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Shipping Charges</span>
              <span>₹00.00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Discount</span>
              <span className="text-green-400">00.00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>
                Taxes <span className="text-muted-foreground">( 8% )</span>
              </span>
              <span>₹00.00</span>
            </div>
            <div className="flex justify-between font-medium border-t pt-5">
              <span>Total</span>
              <span>₹00.00</span>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Delivery Status */}
      <section>
        <Card>
          <CardTitle className="ml-4">Delivery Status</CardTitle>
          <CardContent className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center gap-0.5">
                <div className="bg-green-800 text-white rounded-full p-3">
                  <CircleCheckBig />
                </div>
                <div className="text-xs">Processing</div>
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <div className="bg-green-800 text-white rounded-full p-3">
                  <Box />
                </div>
                <div className="text-xs">Shipped</div>
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <div className="bg-gray-800 text-white rounded-full p-3">
                  <TruckElectricIcon />
                </div>
                <div className="text-xs">Out for delivery</div>
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <div className="bg-gray-800 text-white rounded-full p-3">
                  <BadgeCheck />
                </div>
                <div className="text-xs">Delivered</div>
              </div>
            </div>
            <Progress value={progress} className="h-2 mt-2 transition" />
          </CardContent>
          <CardFooter>
            <div className="flex gap-2 items-center ">
              <h4 className="text-gray-300 px-3 py-1 h4order border-blue-500 bg-blue-900 rounded-md">
                Shipped
              </h4>
              <p className="text-muted-foreground">on December 23, 2024</p>
            </div>
          </CardFooter>
        </Card>
      </section>

      {/* Product Items */}
      <section className="mb-5">
        <Card>
          <CardTitle className="pl-4">Order Items</CardTitle>
          <CardHeader className="flex justify-between gap-5 font-semibold text-muted-foreground items-center ">
            <div className="flex-1">Product</div>
            <div className="">Quantity</div>
            <div className="">Price</div>
            <div className="">Total</div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between font-semibold my-2 gap-5 items-center ">
              <div className="flex-1 flex gap-2 items-center">
                <img
                  src="https://bundui-images.netlify.app/products/01.jpeg"
                  height={55}
                  width={55}
                  alt="product img"
                  className="rounded-xl"
                />
                <h3 className="text-sm">Wireless </h3>
              </div>
              <span className="text-sm">0</span>
              <span className="text-sm">₹00.00</span>
              <span className="text-sm">₹00.00</span>
            </div>
            <div className="flex justify-between font-semibold gap-5 items-center ">
              <div className="flex-1 flex gap-2 items-center">
                <img
                  src="https://bundui-images.netlify.app/products/01.jpeg"
                  height={55}
                  width={55}
                  alt="product img"
                  className="rounded-xl"
                />
                <h3 className="text-sm">Wireless </h3>
              </div>
              <span className="text-sm">0</span>
              <span className="text-sm">₹00.00</span>
              <span className="text-sm">₹00.00</span>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default TrackOrders;

// product view page
// coupon fix
