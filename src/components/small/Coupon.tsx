import { memo, useCallback, useRef, useState } from "react";
import { Input } from "../ui/input";
import { SetDiscount } from "@/redux/reducer/cartReducer";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";

type DiscountResponse = {
  message: string;
  price: number;
};

interface CouponProps {
  total: number;
  setDiscount:  React.Dispatch<React.SetStateAction<number>> ;
}

const Coupon = memo(({ total,setDiscount }: CouponProps) => {
  const [data, setData] = useState<DiscountResponse | null>(null);
  const dispatch = useDispatch();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const fetchDiscount = useCallback(
    async (couponCode: string) => {
      if (!couponCode) return;

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER}/api/v1/payment/coupon/discount`,
          { params: { code: couponCode } }
        );

        const { message, data: price } = res.data;
        setData({ message, price });

        if (price < total) {
          dispatch(SetDiscount(price));
          setDiscount(price);
        } else {
          toast.error(`Discount ${price} Must be lass then TOTAL ${total}`);
        }
      } catch {
        setData(null);
        toast.error("Invalid or expired coupon");
      }
    },
    [dispatch, setDiscount, total]
  );

  const handleCouponChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      fetchDiscount(value);
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-1">
        <Input onChange={handleCouponChange} placeholder="Enter promo code" className="uppercase placeholder:capitalize" />
      </div>
      {data && (
        <p className="text-green-500 text-sm">
          {data.message} {data.price}
        </p>
      )}
    </div>
  );
});

export default Coupon;
