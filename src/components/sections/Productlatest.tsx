import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { server } from "@/redux/store";
import { RiAddLargeLine } from "react-icons/ri";

interface Props {
  productId: string;
  name: string;
  price: number;
  stock: number;
  photo: string;
  discription: string;
  handler: (id: string) => void;
}

const Productlatest = ({
  name,
  price,
  stock,
  productId,
  photo,
  discription,
  handler,
}: Props) => {
  return (
    <Card className="min-w-56 p-0 max-w-64 mr-2 overflow-hidden gap-2 rounded-lg border shadow-sm">
      <div className="w-full h-40 overflow-hidden ">
        <img
        src={`${server}/${photo}`}
        alt="Product Image"
        className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
      />
      </div>
      <CardContent className="px-2">
        <div className="">
          <div className="space-y-1">
            <h3 className="text-base/5 h-9 font-semibold font-[Geist_Mono] ">{name.length < 40 ? name : name.slice(0, 40).concat(" ...")}</h3>
            <p className="text-xs text-muted-foreground ">
              {discription.length < 100? discription : discription.slice(0, 100).concat(" ...")}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border py-2 flex justify-between">
          <span className="md:text-2xl text-xl font-bold">₹{price}</span>
        <Button onClick={()=> handler(productId)} className=""><RiAddLargeLine/></Button>
      </CardFooter>
    </Card>
  );
};

export default Productlatest;
