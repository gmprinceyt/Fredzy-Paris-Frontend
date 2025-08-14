import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useGetSingleOrderQuery } from "@/redux/api/orderApi";
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
import { useParams } from "react-router";
import Loading from "../Loading";
import { useSelector } from "react-redux";
import type { UserReducerInitailState } from "@/types/reducer";
import { server } from "@/redux/store";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
const TrackOrders = ({ url }: { url?: string }) => {
  const { orderId } = useParams();
  let urllink: string;
  if (orderId) {
    urllink = orderId;
  } else {
    urllink = url;
  }

  const { data, isLoading, isError } = useGetSingleOrderQuery(urllink);
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitailState }) => state.userReducer
  );
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    if (!data?.data.status) return;

    const progressMap: Record<string, number> = {
      Delivered: 100,
      OutOfDelivery: 70,
      Shipped: 45,
      Processing: 17,
    };

    setProgress(progressMap[data.data.status]);
  }, [data?.data.status]);
  useEffect(() => {
    if (isError) toast.error("Order not found!");
  }, [isError]);
  if (!data) return null;
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="max-w-[1280px] px-3 m-auto font-[Geist] flex flex-col gap-3">
          {/* Information */}
          <section className="flex flex-col md:flex-row md:items-center  gap-2">
            {/* Order Information */}
            <Card className="px-0 pt-3 ">
              <CardHeader className="border-b ">
                <CardTitle className="text-xl flex gap-1">
                  <ShieldCheckIcon /> Order ID
                  {data.data._id.slice(0, 4).toUpperCase()}
                </CardTitle>
                <span className="text-base flex gap-1 text-muted-foreground ">
                  <Clock /> Placed on{" "}
                  {new Date(data.data.updatedAt).toLocaleTimeString()}
                </span>
              </CardHeader>
              <CardContent className="flex flex-col space-y-1 ">
                <h2 className="font-semibold text-lg flex gap-1">
                  <Info />
                  Customer Information
                </h2>
                <h5 className="text-muted-foreground ">{user?.name}</h5>
                <h5 className="text-muted-foreground ">{user?.email}</h5>
                <address className="text-muted-foreground ">
                  {data.data.shippingInfo.address}
                </address>
              </CardContent>
            </Card>
            {/* Order Summary */}
            <Card>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>₹{data.data.subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping Charges</span>
                  <span>₹{data.data.shippingCharges}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Discount</span>
                  <span className="text-green-600">₹{data.data.discount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>
                    Taxes <span className="text-muted-foreground">( 8% )</span>
                  </span>
                  <span>₹{data.data.tax}</span>
                </div>
                <div className="flex justify-between font-medium border-t pt-5">
                  <span>Total</span>
                  <span>₹{data.data.total}</span>
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
                    <div className={`bg-green-800 text-white rounded-full p-3`}>
                      <CircleCheckBig />
                    </div>
                    <div className="text-xs">Processing</div>
                  </div>
                  <div className="flex flex-col items-center gap-0.5">
                    <div
                      className={`${
                        progress >= 45 ? "bg-green-800" : "bg-gray-800"
                      } text-white rounded-full p-3`}
                    >
                      <Box />
                    </div>
                    <div className="text-xs">Shipped</div>
                  </div>
                  <div className="flex flex-col items-center gap-0.5">
                    <div
                      className={`${
                        progress >= 70 ? "bg-green-800" : "bg-gray-800"
                      } text-white rounded-full p-3`}
                    >
                      <TruckElectricIcon />
                    </div>
                    <div className="text-xs">Out for delivery</div>
                  </div>
                  <div className="flex flex-col items-center gap-0.5">
                    <div
                      className={`${
                        progress >= 99 ? "bg-green-800" : "bg-gray-800"
                      } text-white rounded-full p-3`}
                    >
                      <BadgeCheck />
                    </div>
                    <div className="text-xs">Delivered</div>
                  </div>
                </div>
                <Progress value={progress} className="h-2 mt-2 transition" />
              </CardContent>
              <CardFooter>
                <div className="flex gap-2 items-center ">
                  <Badge
                    className={`text-gray-300
                      ${data.data.status === "Processing" ? "bg-black" : ""} 
                      ${data.data.status === "Shipped" ? "bg-blue-500" : ""}
                      ${
                        data.data.status === "OutOfDelivery"
                          ? "bg-indigo-500"
                          : ""
                      } 
                      ${data.data.status === "Delivered" ? "bg-green-500" : ""}
                    `}
                  >
                    {data.data.status}
                  </Badge>
                  <p className="text-muted-foreground">
                    {new Date(data.data.updatedAt).toLocaleDateString()}
                  </p>
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
                <div className="">Orignal</div>
                <div className="">Price</div>
              </CardHeader>
              <CardContent>
                {data.data.orderItems.map((order) => {
                  return (
                    <div key={order.productId} className="flex justify-between font-semibold my-2 gap-5 items-center ">
                      <div className="flex-1 flex gap-2 items-center">
                        <img
                          src={`${server}/${order.photo}`}
                          height={55}
                          width={55}
                          alt="product img"
                          className="rounded"
                        />
                        <h3 className="text-sm">{order.name}</h3>
                      </div>
                      <span className="text-sm  ">{order.quantity}</span>
                      <span className="text-sm text-muted-foreground ">
                        ₹{(order.price * 1.12).toFixed(0)}
                      </span>
                      <span className="text-sm">₹{order.price}</span>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </section>
        </div>
      )}
    </>
  );
};

export default TrackOrders;

// product view page
// coupon fix
