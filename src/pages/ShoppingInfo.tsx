import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { CreditCard, LoaderCircle } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { ShippingInfo } from "@/types/types";
import {
  usePaymentOrderMutation,
  usePaymentVerifyMutation,
} from "@/redux/api/payment";
import { useDispatch, useSelector } from "react-redux";
import type {
  CartInitialState,
  UserReducerInitailState,
} from "@/types/reducer";
import { useNavigate } from "react-router";
import { useCallback, useState } from "react";
import type {
  CreateOrderRequestQuery,
  CreatePaymentOrderResponse,
} from "@/types/api-types";
import toast from "react-hot-toast";
import { useCreateOrderMutation } from "@/redux/api/orderApi";
import { clearCart, updateShippingInfo } from "@/redux/reducer/cartReducer";

const ShoppingInfo = () => {
  const [paymentOrder] = usePaymentOrderMutation();
  const [paymentVerify] = usePaymentVerifyMutation();
  const [createOrder] = useCreateOrderMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingInfo>();
  const dispatch = useDispatch();

  const { cartItems, total, tax, discount, shippingCharges, subtotal } =
    useSelector(
      (state: { cartReducer: CartInitialState }) => state.cartReducer
    );
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitailState }) => state.userReducer
  );
  const [loading, setLoading] = useState(false);

  const handlePaymentVerify = useCallback(
    async (
      paymentData: CreatePaymentOrderResponse,
      shippingInfo: ShippingInfo
    ) => {
      if (!import.meta.env.VITE_PAYMENT_KEY_ID) {
        toast.error("Payment Key is missing");
        return;
      }

      const options: RazorpayOptions = {
        key: import.meta.env.VITE_PAYMENT_KEY_ID,
        amount: paymentData.data.amount,
        currency: paymentData.data.currency,
        name: "Fredzy Paris",
        description: "Test Mode",
        order_id: paymentData.data.id,
        handler: async (response) => {
          try {
            const verifyResult = await paymentVerify(response).unwrap();
            toast.success(verifyResult.message);

            if (!user) {
              toast.error("Unauthorized!");
              return;
            }

            const orderBody: CreateOrderRequestQuery = {
              discount,
              orderItems: cartItems,
              shippingCharges,
              shippingInfo,
              subtotal,
              tax,
              total,
              user: user._id,
            };

            const orderData = await createOrder(orderBody).unwrap();
            console.log("Order created:", orderData);
            dispatch(clearCart())


            navigate("/Recent");
            setLoading(false);
          } catch (err) {
            setLoading(false);
            console.error(
              "Payment verification or order creation failed:",
              err
            );
            toast.error("Something went wrong during order creation");
          }
        },
        modal: {
          ondismiss: function () {
            // Called when the payment modal is closed/canceled
            setLoading(false);
            toast.error("Payemnt closed/canceled")
          },
        },
        theme: { color: "#5f63b8" },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    },
    [cartItems, createOrder, discount, dispatch, navigate, paymentVerify, shippingCharges, subtotal, tax, total, user]
  );

  const MakeOrder: SubmitHandler<ShippingInfo> = useCallback(
    async (formData) => {
      try {
        setLoading(true);
        console.log("Shipping info:", formData);
        const amount =  Number(total);
        const paymentOrderData = await paymentOrder({ amount}).unwrap();

        // Save shipping info to Redux
        dispatch(updateShippingInfo(formData));

        // Continue to payment verification
        await handlePaymentVerify(paymentOrderData, formData);
      } catch (err) {
        setLoading(false);
        console.error("Payment order creation failed:", err);
        toast.error("Payment Order Failed!");
      }
    },
    [dispatch, handlePaymentVerify, paymentOrder, total]
  );


  return (
    <div className="max-w-[1280px] m-auto px-3 font-[Geist]  ">
      <h1 className="scroll-m-20 mb-2 text-center text-4xl mx-4 font-extrabold tracking-tight text-balance">
        Delivery Address
      </h1>
      {/* Address Inputs  */}
      <section>
        <form
          onSubmit={handleSubmit(MakeOrder)}
          className="flex flex-col md:flex-row justify-center md:items-center md:gap-10 md:mt-10 gap-1"
        >
          <div className=" space-y-1 border-2 rounded-md  p-3 md:border-0 md:border-r-2 md:pr-10 md:rounded-r-md md:border-green-400">
            <Label>Address with Room No.</Label>
            <Input
              {...register("address", { required: true })}
              type="text"
              placeholder="Enter Address"
            />
            <Label>State</Label>
            <Input
              {...register("state", { required: true })}
              type="text"
              placeholder="Enter State"
            />
            <Label>City</Label>
            <Input
              {...register("city", { required: true })}
              type="city"
              placeholder="Enter City"
            />
            <Label>Country</Label>
            <Input
              {...register("country", { required: true })}
              type="text"
              placeholder="Enter Country"
            />
            <Label>Pincode</Label>
            <Input
              {...register("pincode", { required: true })}
              type="number"
              placeholder="Enter Pincode"
            />
            {errors.address && (
              <span className="text-sm font-medium text-red-400">
                Address field is required
              </span>
            )}
            {errors.state && (
              <span className="text-sm font-medium text-red-400">
                State field is required
              </span>
            )}
            {errors.city && (
              <span className="text-sm font-medium text-red-400">
                City field is required
              </span>
            )}
            {errors.country && (
              <span className="text-sm font-medium text-red-400">
                Country field is required
              </span>
            )}
            {errors.pincode && (
              <span className="text-sm font-medium text-red-400">
                Pincode field is required
              </span>
            )}
          </div>
          <Button
            type="submit"
            className=" h-12 md:h-8 mt-8 text-lg md:text-sm"
          >
            {loading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <CreditCard className="mr-2" />
            )}
            Proceed to Payment
          </Button>
        </form>
      </section>
    </div>
  );
};

export default ShoppingInfo;
