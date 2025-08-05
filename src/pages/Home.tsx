import ProductCard from "@/components/ProductCard";
import { useLatestProductQuery } from "@/redux/api/productApi";
import { SquareChevronRight } from "lucide-react"


const Home = () => {
  const { data } = useLatestProductQuery("");

  function addToCart(id: string) {
    console.log("Added", id);
  }
  return (
    <div className="flex flex-col  m-auto max-w-[1280px]">
      <div className="mb-3 flex justify-between">
        <h1 className="font-bold text-2xl">LATEST PRODUCTS</h1>
        <SquareChevronRight />
      </div>
      <div className="flex">
        {data?.data.map((product) => {
          return (
            <ProductCard
              key={product._id}
              productId={product._id}
              name={product.name}
              price={product.price}
              stock={product.stock}
              photo={product.photo}
              discription={product.discription}
              handler={addToCart}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
