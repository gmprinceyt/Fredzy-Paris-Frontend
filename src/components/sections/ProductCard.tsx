import { Eye, ShoppingCart } from "lucide-react";
import type { ProductProps } from "../../../../Fredzy Paris/src/types/types";
import ProductRating from "../small/ProductRating";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardDescription,
  CardTitle,
} from "../ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { server } from "@/redux/store";

const ProductCard = ({
  name,
  discription,
  photo,
  price,
  productId,
  stock,
  rating,
  category,
  handler,
}: ProductProps) => {
  return (
    <Card className="p-0 overflow-hidden min-w-48 max-w-64 gap-1 font-[Geist]">
      <div className="w-full h-60 relative">
        <img src={`${server}/${photo}`} className="w-full h-full object-cover object-center" />
        <Badge className="absolute top-2 right-2 ">{category}</Badge>
      </div>
      <CardContent className="px-3 py-0 ">
        <CardTitle className="scroll-m-20 text-xl leading-5   md:text-2xl font-extrabold tracking-tight text-balance">
          {name.length <= 23
            ? name
            : name.slice(0, 23).concat("...")}
        </CardTitle>
        <div className="flex items-center">
          {Array.from({ length: 5 }, (_, index) => {
            return <ProductRating value={rating} index={index} />;
          })}
          <span className="text-muted-foreground ml-3 text-xs md:text-sm tracking-tight ">
            ({rating})
          </span>
        </div>
        <CardDescription className="scroll-m-20  text-xs md:text-sm tracking-tight">
          {discription.length <= 86
            ? discription
            : discription.slice(0, 86).concat("...")}
        </CardDescription>
      </CardContent>
      <CardFooter className="border py-1 flex-col">
        <div className="flex justify-between items-center w-full">
          <strong className="">₹{price}</strong>
          <Badge className={stock ? `bg-green-900 border-green-500`: `bg-red-900 border-red-500` }>{stock ? "In Stock" : "Out of Stock"}</Badge>
        </div>
        <div className="flex  items-center w-full gap-2 py-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline"><Eye/></Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View Details</p>
            </TooltipContent>
          </Tooltip>
          <Button className="flex-1" onClick={() => handler(productId)}>
            <ShoppingCart />
            Add
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
