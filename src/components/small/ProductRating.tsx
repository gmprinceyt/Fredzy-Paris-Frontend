import { Star } from "lucide-react"

const ProductRating = ({index, value}:{index:number, value:number}) => {
  return (
    <div className="flex">
      <i className=" text-yellow-400 mr-1">
        <Star size={16} className={index+1 <= value? `fill-yellow-400`: ``}/>
    </i>
    </div>
  )
}

export default ProductRating