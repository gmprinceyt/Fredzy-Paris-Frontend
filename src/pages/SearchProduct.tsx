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

const SearchProduct = () => {
  const [range, setRange ] = useState(10000)

  return (
    <div className="flex flex-col  m-auto max-w-[1280px] px-3 ">
      {/* Filterr Section */}
      <section className="">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
          Filter
        </h1>
        <Select>
          <h4 className="leading-7  font-semibold tracking-tight">Sort</h4>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Price</SelectLabel>
              <SelectItem value="all">low-high</SelectItem>
              <SelectItem value="Women">high-low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select>
          <h4 className="leading-7  font-semibold tracking-tight">Category</h4>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="men">Men</SelectItem>
              <SelectItem value="Women">Women</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="">
          <h4 className="leading-7  font-semibold tracking-tight">
            Price Range
          </h4>
          <Slider  value={[range]}  defaultValue={[10000]} max={100000} step={1} />
          <span>{range}</span>
        </div>
      </section>

      {/* Main Search Section */}
      <section></section>
    </div>
  );
};

export default SearchProduct;
