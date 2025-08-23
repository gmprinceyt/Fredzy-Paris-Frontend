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
  if (!data?.data[0]) return <div className="flex m-auto items-center justify-center w-1/3 bg-gray-600 font-[Geist] text-white rounded-md py-1 px-3 ">Recent Order Not Available</div>
  return (
    <div>
      {isLoading ? <Skeleton /> : <TrackOrders url={ data?.data[0]._id} />}
    </div>
  );
};

export default Recent;
