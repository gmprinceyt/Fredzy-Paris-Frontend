import { server } from "@/redux/store";

interface Props {
    productId: string;
    name: string;
    price:number;
    stock:number;
    photo:string;
    handler:(id:string)=> void
}

const ProductCard = ({name, price, stock, productId, photo, handler}:Props) => {
  return (
        <div>
            <h1>{name}</h1>
            <small>{price}</small>
            <small>{stock}</small>
            <img src={`${server}/${photo}`}/>
            <button onClick={() => handler(productId)}>Add cart</button>           
        </div>
  )
}

export default ProductCard