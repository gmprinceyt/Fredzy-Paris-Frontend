import { Button } from "@/components/ui/button";
import { useProductDetailsQuery } from "@/redux/api/productApi";
import { server } from "@/redux/store";
import { addToCartHandler } from "@/utils/AddTOCart";
import { Star, Truck, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import Loading from "../components/Loading";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();
  const { isLoading, data, isError } = useProductDetailsQuery(productId!);
  if (isError) return toast.error("Product can't fetch E ");
  if (!data) return;
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-full max-w-7xl mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
              <img
                src={`${server}/${data.data.photo}`}
                alt="Modern watch with leather strap"
                className="object-cover w-full h-full"
                width={700}
                height={700}
              />
              {/* Future code. for Like Button  */}
              {/* <div className="absolute top-4 right-4">
            <Button
              size="icon"
              variant="outline"
              className="rounded-full bg-background/80 backdrop-blur-sm"
            >
              <Heart className="h-5 w-5" />
            </Button>
          </div> */}
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <div className="flex items-center gap-4 mb-4">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {data.data.category}
                </span>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="text-sm font-medium">4.9</span>
                  <span className="text-sm text-muted-foreground">
                    (128 reviews)
                  </span>
                </div>
              </div>

              <h1 className="text-3xl font-bold mb-2">{data.data.name}</h1>
              <div className="flex items-baseline gap-4 mb-6">
                <h1 className="text-2xl font-bold ">₹{data.data.price}</h1>
                <span className="text-lg text-muted-foreground line-through">
                  ₹{(data.data.price * 1.12).toFixed(0)}
                </span>
                <span className="text-sm font-medium text-green-600">
                  Save{" "}
                  {(
                    (100 * (data.data.price * 1.12 - data.data.price)) /
                    data.data.price
                  ).toFixed(0)}
                  %
                </span>
              </div>

              <p className="text-muted-foreground mb-6">
                {data.data.discription}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-2 text-sm">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      data.data.stock > 1 ? " bg-green-500" : "bg-red-500"
                    }`}
                  ></div>
                  <span>
                    {data.data.stock > 1 ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Truck className="h-4 w-4" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <ShieldCheck className="h-4 w-4" />
                  <span>2 Year Warranty</span>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <Button
                  size="lg"
                  className="flex-1"
                  onClick={() =>
                    addToCartHandler(
                      {
                        productId: data.data._id,
                        name: data.data.name,
                        photo: data.data.photo,
                        price: data.data.price,
                        stock: data.data.stock,
                        quantity: 1,
                      },
                      dispatch
                    )
                  }
                >
                  Add to Cart
                </Button>
                <Button
                  onClick={() => {
                    addToCartHandler(
                      {
                        productId: data.data._id,
                        name: data.data.name,
                        photo: data.data.photo,
                        price: data.data.price,
                        stock: data.data.stock,
                        quantity: 1,
                      },
                      dispatch
                    );
                    navigate("/cart");
                  }}
                  size="lg"
                  variant="outline"
                  className="flex-1"
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;

//? Size or Color

{
  /* <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <span className="font-medium">Select Color</span>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-full bg-black ring-2 ring-offset-2 ring-black"></button>
                <button className="w-8 h-8 rounded-full bg-brown-500"></button>
                <button className="w-8 h-8 rounded-full bg-slate-200"></button>
              </div>
            </div> */
}

{
  /* <div className="flex flex-col gap-2">
              <span className="font-medium">Select Size</span>
              <div className="flex gap-2">
                <Button variant="outline" size={"sm"}>
                  38mm
                </Button>
                <Button variant="outline" size={"sm"}>
                  42mm
                </Button>
                <Button variant="outline" size={"sm"}>
                  44mm
                </Button>
              </div>
            </div>
          </div> */
}
