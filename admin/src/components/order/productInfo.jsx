import React from "react";

export default function ProductInfo() {
  return (
    <div className="py-3 flex flex-row justify-between flex-wrap">
      <div className="flex flex-row">
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZmFzaGlvbnxlbnwwfHwwfHw%3D&w=1000&q=80"
          className="w-16 h-20 rounded-sm"
        />
        <div className="flex flex-col justify-between ml-4">
          <span className="text-xs font-semibold ">Product Name</span>
          <span className="text-xs font-semibold ">Small</span>
          <span className="text-xs text-gray-600 ">Colour</span>
        </div>
      </div>
      <div className="flex flex-row mt-2 justify-center">
        <div className="flex flex-col justify-between mr-16 ">
          <span className="uppercase text-xs font-medium text-gray-500">
            Price
          </span>
          <span className="uppercase text-xs font-medium text-gray-500">
            Art.nr
          </span>
          <span className="uppercase text-xs font-medium text-gray-500">
            Qty
          </span>
        </div>

        <div className="flex flex-col justify-between">
          <span className="uppercase text-xs font-medium text-gray-600">
            Rs 1000.00
          </span>
          <span className="uppercase text-xs font-medium text-gray-600">
            112456
          </span>
          <span className="uppercase text-xs font-medium text-gray-600">1</span>
        </div>
      </div>
    </div>
  );
}
