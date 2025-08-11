import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ProductCard from "@/components/sections/ProductCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import {
  useAllCategoriesQuery,
  useSearchProductQuery,
} from "@/redux/api/productApi";
import ProductSkeleton from "@/components/small/ProductSkeleton";

const SearchProduct = () => {
  const [priceRange, setPriceRange] = useState([100000]);
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [page, setpage] = useState(1);

  const {
    data: products,
    isLoading,
    isError,
  } = useSearchProductQuery({
    category,
    sort,
    price: priceRange[0],
    search: name,
    page,
  });
  const { data: categories, isError:CategoryError } = useAllCategoriesQuery("");
  
  function addCart() {
    console.log("add");
  }
  if (CategoryError) return <span className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  px-5 border rounded-md   py-1 font-[Geist] border-red-500 bg-red-900 ">Products Fecthing Failed</span>
  if (isError) return <span className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  px-5 border rounded-md   py-1 font-[Geist] border-red-500 bg-red-900 ">Products Fecthing Failed</span>

  return (
    <div className="flex flex-col md:flex-row gap-2  m-auto max-w-[1280px] px-3 font-[Geist]">
      {/* Filterr Section */}
      <section className="">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
          FILTERS
        </h1>

        <div className="my-2 ">
          <h4 className="  font-semibold ">Keyword</h4>
          <Input
            onChange={(e) => {
              let id = null;
              if (id) {
                clearTimeout(id);
              }
              id = setTimeout(() => setName(e.target.value), 200);
            }}
            type="text"
            placeholder="Product keyword or name.."
          />
        </div>

        <div className="flex flex-wrap md:inline-block gap-3 items-center">
          <div className="">
            <h4 className="   font-semibold ">Sort</h4>
            <Select onValueChange={setSort}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Price</SelectLabel>
                  <SelectItem value="asc">low-high</SelectItem>
                  <SelectItem value="dsc">high-low</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <h4 className="  font-semibold ">Category</h4>
            <Select onValueChange={setCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  <SelectItem value="all">All</SelectItem>
                  {categories?.data.map((category, i) => {
                    return (
                      <SelectItem key={i} value={category}>
                        {category.toLowerCase()}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="w-44">
            <h4 className="0   font-semibold ">Price Range</h4>
            <span className="border-emerald-500 border text-white  bg-emerald-900 rounded px-5 py-1 font-semibold text-sm ">
              100 - {priceRange}
            </span>
            <Slider
              onValueChange={setPriceRange}
              defaultValue={priceRange}
              max={100000}
              min={1000}
              step={1}
            />
          </div>
        </div>
      </section>

      {/* Main product Section */}
      <section className="relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 mb-2">
          {isLoading ? (
            <>
             <ProductSkeleton />
             <ProductSkeleton />
             <ProductSkeleton />
             <ProductSkeleton />
            </>
          ) : (
            products?.products.map((product) => {
              return (
                <ProductCard
                  key={product._id}
                  name={product.name}
                  price={product.price}
                  rating={4.5}
                  stock={product.stock}
                  productId={product._id}
                  photo={product.photo}
                  discription={product.discription}
                  category={product.category}
                  handler={addCart}
                />
              );
            })
          )}
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => {
                  if (page === 1) return;
                  setpage((page) => page - 1);
                }}
              />
            </PaginationItem>

            {/* Render page links dynamically based on totalPages and page */}
            {Array.from(
              { length: products?.pageLength || 1 },
              (_, i) => i + 1
            ).map((pageNumber) => (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  onClick={() => setpage(pageNumber)}
                  isActive={pageNumber === page}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => {
                  if (page === products?.pageLength) return;
                  setpage((page) => page + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </section>
    </div>
  );
};

export default SearchProduct;
