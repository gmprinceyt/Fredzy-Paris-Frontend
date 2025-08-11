import CarouselPreview from "@/components/sections/Slider";
import { useLatestProductQuery } from "@/redux/api/productApi";
import { SquareChevronRight } from "lucide-react";
import Footer from "@/components/sections/Footer";
import ShippingReturns from "@/components/sections/Return";
import TrustGuarantee from "@/components/sections/Trust";
import ProductCard from "@/components/sections/ProductCard";
import ProductSkeleton from "@/components/small/ProductSkeleton";
import { Link } from "react-router";


const Home = () => {

  const { data, isLoading, isError } = useLatestProductQuery("");
  if (isError)
    return (
      <span className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  px-5 border rounded-md   py-1 font-[Geist] border-red-500 bg-red-900 ">
        Data Fecthing Failed
      </span>
    );

  return (
    <div className="flex flex-col  m-auto max-w-[1280px] px-3">
      {/* Slider */}
      <CarouselPreview />

      {/* Latest Products  */}
      <div className="mb-3 mt-3 flex justify-between">
        <h1 className="text-2xl font-[UNITHIN] text-n-500">LATEST PRODUCTS</h1>
        <Link className="flex gap-1 font-[UNITHIN]" to="/search">More <SquareChevronRight /></Link>
      </div>
      <div className="flex overflow-x-scroll gap-1.5 product">
        {isLoading ? (
          <>
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
          </>
        ) : (
          data?.data.map((product) => {
            return (
              <ProductCard
                key={product._id}
                productId={product._id}
                name={product.name}
                price={product.price}
                stock={product.stock}
                photo={product.photo}
                rating={4}
                category={product.category}
                discription={product.discription}
              />
            );
          })
        )}
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
