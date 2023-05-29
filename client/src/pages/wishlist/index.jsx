import React, { useContext, useEffect, useState } from "react";
import "./wishlist.scss";
import { WishlistContext } from "../../context/wishlistContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LoadingContext } from "../../context/loadingContext";
import { formatCurrencyPKR } from "../../utils/currencyFormatter";

export default function WishList() {

  const { toggleWishlist } = useContext(WishlistContext);
  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState([])
  const { setIsLoading } = useContext(LoadingContext);

  useEffect(() => {

    const getProducts = async () => {

      setIsLoading(true);

      await axios.get("/wishlist/get-wishlist-products").then((res) => {
        setWishlist(res.data.products);
      }).catch((err) => {
        console.log(err);
      })

      setIsLoading(false);

    }

    getProducts();

  }, []);





  return (
    <div className="bg-slate-50 min-h-screen pb-5">
      <h1 className="text-center py-5 font-semibold tracking-wider text-3xl">
        My Wishlist
      </h1>
      {
        wishlist.length === 0 &&
        <div className="flex justify-center items-center h-96">
          <h1 className="text-2xl text-gray-500">No items in wishlist</h1>
        </div>

      }
      {
        wishlist.map((item) => {
          return (
            <div
              key={item._id}
              className="flex  justify-center">
              <div className="w-11/12 bg-white shadow py-5 h-32 flex justify-around items-center flex-row">
                <div className="hidden md:block">
                  <button
                    onClick={() => {
                      toggleWishlist(item._id);

                      setWishlist((prev) => {
                        return prev.filter((prod) => prod._id !== item._id);
                      });

                    }}
                    className="px-2 py-0 text-dark-100 bg-white-600 rounded shadow">
                    x
                  </button>
                </div>

                <div className="hidden md:block">
                  <img
                    className="object-contain"
                    style={{ width: "80px", height: "100px" }}
                    src={import.meta.env.VITE_SERVER_URL + item.image}
                  />
                </div>

                <div className="hidden md:block">
                  <h3 className="text-sm capitalize ">{item?.title}</h3>
                </div>

                <div className="hidden md:block">
                  <h3 className="text-slate-500 text-sm">{formatCurrencyPKR(item?.price)}</h3>
                </div>

                <div className="hidden md:block">
                  <h3 className="text-slate-500 text-sm">{ }</h3>
                </div>

                <div className="md:hidden flex items-center justify-evenly relative">
                  <button className="px-2 py-0 text-dark-100 bg-white-600 absolute top-[-5px] left-[-5px]">
                    x
                  </button>
                  <img
                    className="w-[80px] h-[80px]"
                    src={import.meta.env.VITE_SERVER_URL + item.image}
                  />
                  <div className="ml-1">
                    <h3 className="text-sm capitalize ">{item.title}</h3>
                    <h3 className="text-slate-500 text-sm">{formatCurrencyPKR(item?.price)}</h3>
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => {
                      navigate(`/product/${item._id}`);
                    }
                    }
                    className="
            p-2
            md:px-6
            md:py-3
            text-sm text-white
            bg-slate-900
            rounded
            uppercase
          "
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          )
        }
        )
      }


    </div>
  );
}
