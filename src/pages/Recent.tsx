import TrackOrders from "@/components/sections/TrackOrders";
import { Skeleton } from "@/components/ui/skeleton";
import { useMyOrderQuery } from "@/redux/api/orderApi";
import type { UserReducerInitailState } from "@/types/reducer";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Recent = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitailState }) => state.userReducer
  );
  const { isLoading, data, isError } = useMyOrderQuery(user!._id, {
    skip: !user?._id,
  });
  if (isError) return toast.error("Order Not Found!");
  return (
    <div>
      {isLoading ? <Skeleton /> : <TrackOrders url={ data?.data[data?.data.length-1]._id} />}
    </div>
  );
};

export default Recent;
