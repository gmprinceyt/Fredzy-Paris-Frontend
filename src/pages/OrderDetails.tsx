import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useMyOrderQuery } from "@/redux/api/orderApi";
import { useSelector } from "react-redux";
import type { UserReducerInitailState } from "@/types/reducer";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";

export default function Component() {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitailState }) => state.userReducer
  );
  const navigate = useNavigate();
  const { isLoading, data, isError } = useMyOrderQuery(user._id!);
  if (isError) return toast.error("Order Not Found!");

  return (
    <>
      {isLoading ? (
        <div>
          <Skeleton/>
          <Skeleton/>
          <Skeleton/>
          <Skeleton/>
          <Skeleton/>
          <Skeleton/>
        </div>
      ) : (
        <div className="m-auto  max-w-[1280px] px-4 md:px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">My Orders</h1>
          </div>
          <div className="border shadow-sm rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Order</TableHead>
                  <TableHead className="min-w-[150px]">Date</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data.map((data) => {
                  return (
                    <TableRow key={data._id}>
                      <TableCell className="font-medium">
                        {data._id.slice(0, 4).toUpperCase()}
                      </TableCell>
                      <TableCell>
                        {new Date(data.createdAt).toDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          className={`
                          
                        ${data.status === "Processing" ? "bg-black" : ""} 
                        ${data.status === "Shipped" ? "bg-blue-500" : ""}
                        ${
                          data.status === "OutOfDelivery" ? "bg-indigo-500" : ""
                        } 
                        ${data.status === "Delivered" ? "bg-green-500" : ""}`}
                        >
                          {data.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        ₹{data.total}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          onClick={() => navigate(`/progress/${data._id}`)}
                          variant="link"
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </>
  );
}
