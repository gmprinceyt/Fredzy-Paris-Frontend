import { useRef, useState } from "react";
import { Input } from "../ui/input";
import { reduceDiscount } from "@/redux/reducer/cartReducer";
import { useGetDiscountQuery } from "@/redux/api/payment";
import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";

const Coupon = () => {
  const [coupon, setCoupon] = useState("");
  const dispatch = useDispatch();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Only fetch discount if coupon is not empty
  const { data, isLoading, error } = useGetDiscountQuery(coupon, {
    skip: !coupon.trim(),
  });

  const handleApply = () => {
    if (data?.data) {
      dispatch(reduceDiscount(data.data));
    }
  };

  const handleCouponChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setCoupon(e.target.value.trim());
    }, 400);
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-1">
        <Input
          onChange={handleCouponChange}
          placeholder="Enter promo code"
          disabled={isLoading}
        />
        <Button
          onClick={handleApply}
          variant="outline"
          disabled={isLoading || !coupon.trim()}
        >
          {isLoading ? <Loader className="animate-spin" /> : "Apply"}
        </Button>
      </div>

      {error && (
        <p className="text-red-500 text-sm">
          {error?.data?.message || "Invalid or expired coupon"}
        </p>
      )}
    </div>
  );
};

export default Coupon;
