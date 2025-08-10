import CarouselPreview from "@/components/sections/Slider";
import { useLatestProductQuery } from "@/redux/api/productApi";
import { SquareChevronRight } from "lucide-react";
import Footer from "@/components/sections/Footer";
import ShippingReturns from "@/components/sections/Return";
import TrustGuarantee from "@/components/sections/Trust";
import ProductCard from "@/components/sections/ProductCard";

const Home = () => {
  const { data } = useLatestProductQuery("");

  function addToCart(id: string) {
    console.log("Added", id);
  }
  return (
    <div className="flex flex-col  m-auto max-w-[1280px] px-3">
      {/* Slider */}
      <CarouselPreview />

      {/* Latest Products  */}
      <div className="mb-3 mt-3 flex justify-between">
        <h1 className="text-2xl font-[UNITHIN] text-n-500">LATEST PRODUCTS</h1>
        <SquareChevronRight />
      </div>
      <div className="flex overflow-x-scroll gap-1.5 product">
        {data?.data.map((product) => {
          return (
            <ProductCard
              key={product._id}
              productId={product._id}
              name={product.name}
              price={product.price}
              stock={product.stock}
              photo={product.photo}
              rating={4}
              discription={product.discription}
              handler={addToCart}
            />
          );
        })}
      </div>
        <div className="mt-4">
          <TrustGuarantee />
        </div>
        <div className="mt-4">
          <ShippingReturns />
        </div>
      
        {/* Footer */}
        <div className="mt-4">
          <Footer />
        </div>
    </div>
  );
};

export default Home;
