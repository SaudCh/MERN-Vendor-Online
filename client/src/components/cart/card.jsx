import React, { useContext } from "react";
import Quantity from "./quantity";
import { CartContext } from "../../context/cartContext";
import { formatCurrencyPKR } from "../../utils/currencyFormatter";

export default function CartCard({ product }) {

  const { removeFromCart } = useContext(CartContext);

  return (
    <div className="flex justify-center">
      <div className="w-11/12 bg-white shadow py-5 h-32 flex justify-around items-center flex-row ml-[-10px]">
        <div className="hidden md:block">
          <img
            className="object-contain"
            style={{ width: "80px", height: "100px" }}
            src={import.meta.env.VITE_SERVER_URL + product.image}
          />
        </div>

        <div className="hidden md:block">
          <h3 className="text-sm capitalize ">{product?.title}</h3>
        </div>

        <div className="hidden md:block">
          <h3 className="text-slate-500 text-sm">{formatCurrencyPKR(product?.price)}</h3>
        </div>

        <div className="hidden md:block">
          <h3 className="text-slate-500 text-sm">{formatCurrencyPKR(product?.price * product?.quantity)}</h3>
        </div>

        <div className="md:hidden flex items-center justify-evenly relative">
          <button
            onClick={() => removeFromCart(product)}
            className="px-2 py-0 text-dark-100 bg-white-600 absolute top-[-5px] left-[-5px] bg-red-900 text-white rounded-full ">
            x
          </button>
          <img
            className="w-[80px] h-[80px]"
            src={import.meta.env.VITE_SERVER_URL + product.image}
          />
          <div className="ml-1">
            <h3 className="text-sm capitalize">{product?.title}</h3>
            <h3 className="text-slate-500 text-sm">{formatCurrencyPKR(product?.price)}</h3>
            <h3 className="text-slate-500 text-sm">{formatCurrencyPKR(product?.price * product?.quantity)}</h3>
          </div>
        </div>

        <div>
          <Quantity
            quantity={product?.quantity}
            id={product?._id}
          />
        </div>

        <div className="hidden md:block">
          <button className="px-2 py-0 text-dark-100 bg-white-600 rounded shadow"
            onClick={() => removeFromCart(product)}
          >
            x
          </button>
        </div>
      </div>
    </div>
  );
}
