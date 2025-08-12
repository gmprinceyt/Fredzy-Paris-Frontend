import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { CreditCard } from "lucide-react";
import { Link } from "react-router";

const ShoppingInfo = () => {
  return (
    <div className="max-w-[1280px] m-auto px-3 font-[Geist]  ">
      <h1 className="scroll-m-20 mb-2 text-center text-4xl mx-4 font-extrabold tracking-tight text-balance">
        Delivery Address
      </h1>
      {/* Address Inputs  */}
      <section className="flex flex-col md:flex-row justify-center md:items-center md:gap-10 md:mt-10 gap-1">
        <div className=" space-y-1 border-2 rounded-md p-3 md:border-0 md:border-r-2 md:pr-10 md:rounded-r-md md:border-green-400">
          <Label>Address with Room No.</Label>
          <Input type="text" placeholder="Enter Address" />
          <Label>State</Label>
          <Input type="text" placeholder="Enter State" />
          <Label>City</Label>
          <Input type="city" placeholder="Enter City" />
          <Label>Country</Label>
          <Input type="text" placeholder="Enter Country" />
          <Label>Pincode</Label>
          <Input type="number" placeholder="Enter Pincode" />
        </div>
        <Link to="/">
          <Button className="w-full h-12 md:h-8 mt-8 text-lg md:text-sm">
            <CreditCard className="mr-2" />
            Proceed to Payment
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default ShoppingInfo;
