import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { LoadingContext } from "../../context/loadingContext";
import axios from "axios";
import { CartContext } from "../../context/cartContext";
import { WishlistContext } from "../../context/wishlistContext";
import { AuthContext } from "../../context/authContext";

const Product = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const { setIsLoading } = useContext(LoadingContext);
  const { addToCart } = useContext(CartContext);
  const { wishlist, toggleWishlist } = useContext(WishlistContext)
  const { isLoggedIn } = useContext(AuthContext)

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


  const [images, setImages] = useState({
    img1: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,b_rgb:f5f5f5/3396ee3c-08cc-4ada-baa9-655af12e3120/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
    img2: "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/e44d151a-e27a-4f7b-8650-68bc2e8cd37e/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
    img3: "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/44fc74b6-0553-4eef-a0cc-db4f815c9450/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
    img4: "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/d3eb254d-0901-4158-956a-4610180545e5/scarpa-da-running-su-strada-invincible-3-xk5gLh.png"
  })

  const [activeImg, setActiveImage] = useState(images.img1)

  const [amount, setAmount] = useState(1);


  return (
    <div className='flex flex-col justify-between lg:flex-row gap-16 lg:items-center'>
      <div className='flex flex-col gap-6 lg:w-2/4'>
        <img src={import.meta.env.VITE_SERVER_URL + data?.image} alt="" className='w-full h-full aspect-square object-cover rounded-xl' />
        <div className='flex flex-row justify-between h-24'>
          {/* <img src={images.img1} alt="" className='w-24 h-24 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img1)} />
          <img src={images.img2} alt="" className='w-24 h-24 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img2)} />
          <img src={images.img3} alt="" className='w-24 h-24 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img3)} />
          <img src={images.img4} alt="" className='w-24 h-24 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img4)} /> */}
        </div>
      </div>
      {/* ABOUT */}
      <div className='flex flex-col gap-4 lg:w-2/4 items-center md:items-start '>
        <div>
          <span className=' text-secondary-600 font-semibold'>{data?.category?.name}</span>
          <h1 className='text-3xl font-bold capitalize'>{data?.title}</h1>
        </div>
        {/* shop info  */}
        <div className='flex flex-row items-center gap-4'>
          <img src={import.meta.env.VITE_SERVER_URL + data?.shop?.avatar} alt="" className='w-16 h-16 rounded-full object-cover' />
          <div className='flex flex-col'>
            <span className='text-lg font-semibold'>{data?.shop?.name}</span>
            <span className='text-gray-700'>{data?.shop?.location}</span>
          </div>
        </div>
        <p className='text-gray-700'>
          {data?.description}
        </p>
        <h6 className='text-2xl font-semibold'>PKR {data.price}</h6>
        <div className='flex md:flex-row flex-col items-center gap-12'>
          <div className='flex flex-row items-center'>
            <button className='bg-gray-200 py-2 px-5 rounded-lg text-secondary-800 text-3xl' onClick={() => setAmount((prev) => prev > 1 ? prev + 1 : 1)}>-</button>
            <span className='py-4 px-6 rounded-lg'>{amount}</span>
            <button className='bg-gray-200 py-2 px-4 rounded-lg text-secondary-800 text-3xl' onClick={() => setAmount((prev) => prev + 1)}>+</button>
          </div>
          <button
            onClick={() => addToCart({ ...data, quantity: amount })}
            className='bg-secondary-800 text-white font-semibold py-3 px-16 rounded-xl h-full'>Add to Cart</button>
          {/* message button */}
        </div>
        <div className="flex justify-center md:justify-start gap-12 mb-5">
          <button
            onClick={() => navigate(isLoggedIn ? '/chat' : '/login', {
              state: {
                sellerId: data?.shop,
                productId: data?._id
              }
            })}
            className='bg-gray-200 block text-secondary-800 w-[300px] font-semibold py-3 px-16 rounded-xl h-full'>Message</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
