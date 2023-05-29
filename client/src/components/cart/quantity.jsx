import React, { useContext } from "react";
import { CartContext } from "../../context/cartContext";

export default function Quantity({
  quantity,
  id,
}) {

  const { changeQuantity } = useContext(CartContext)

  return (
    <div className="border">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <button className="bg-slate-900 text-white px-2 py-1"
            onClick={() => changeQuantity(id, quantity == 1 ? 1 : quantity - 1)}
          >
            -
          </button>
          <input type="text" className="w-12 text-center" value={quantity} />
          <button className="bg-slate-900 text-white px-2 py-1"
            onClick={() => changeQuantity(id, quantity + 1)}

          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
