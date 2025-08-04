import ProductCard from "@/components/ProductCard";
import { useLatestProductQuery } from "@/redux/api/productApi";

const Home = () => {
  const { data } = useLatestProductQuery("");

  function addToCart(id:string) {
    console.log("Added", id);
  }
  return (
    <div className="flex justify-center  items-center m-auto max-w-[1280px]">
      {data?.data.map((product) => {
        return (
          <ProductCard
            key={product._id}
            productId={product._id}
            name={product.name}
            price={product.price}
            stock={product.stock}
            photo={product.photo}
            handler={addToCart}
          />
        );
      })}
    </div>
  );
};

export default Home;
