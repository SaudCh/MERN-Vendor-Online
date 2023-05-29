import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { LoadingContext } from "../../context/loadingContext";
import axios from "axios";
import { CartContext } from "../../context/cartContext";
import { WishlistContext } from "../../context/wishlistContext";

const Product = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const { setIsLoading } = useContext(LoadingContext);
  const { addToCart } = useContext(CartContext);
  const { wishlist, toggleWishlist } = useContext(WishlistContext)

  const isInWishlist = wishlist?.includes(data?._id)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      await axios.get(`/product/${id}`).then((res) => {
        setData(res.data.product);
      })
        .catch(err => console.log(err))


      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  

  return (
    <div className="bg-slate-50 min-h-screen">

      <div className="flex p-4">

        <img
          src={import.meta.env.VITE_SERVER_URL + data?.image}
          alt={data?.name}
          className="w-screen h-96 object-contain basis-3/6"
        />

        <div className="flex flex-col md:ml-4 basis-3/2">
          <h1 className="text-2xl font-semibold">{data?.title}</h1>
          <p className="text-xl ">Rs. {data?.price}</p>
          <div className="flex justify-between">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md mt-2"
              onClick={() => addToCart(data)}
            >
              Add to Cart
            </button>


          </div>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md mt-2"
            onClick={() => navigate('/chat',{
              state: {
                sellerId: data?.shop,
                productId: data?._id
              }
            })}
          >
            Message
          </button>
          {/*<p className="text-xl font-semibold">Category: {data?.category}</p> */}
          <p className="text-lg">{data?.description}</p>
        </div>
      </div>

    </div>
  );
};

export default Product;
