import React from "react";
import { MdArrowCircleUp } from "react-icons/md";
import OrderTable from "../../components/tables/orders";

export default function Orders() {
  return (
    <div className="m-2 px-4">
      

      <div className="flex flex-row justify-between flex-wrap my-2">
        <button className="text-sm font-semibold px-3 py-1 rounded-md hover:bg-gray-100 hover:text-gray-600 focus:z-10  focus:ring-gray-700 focus:text-gray-700 focus:underline-offset-4">
          All Orders
        </button>
        <button className="text-sm font-semibold px-3 py-1 rounded-md hover:bg-gray-100 hover:text-gray-600 focus:z-10  focus:ring-gray-700 focus:text-gray-700 focus:underline-offset-4">
          Pending Orders
        </button>
        <button className="text-sm font-semibold px-3 py-1 rounded-md hover:bg-gray-100 hover:text-gray-600 focus:z-10  focus:ring-gray-700 focus:text-gray-700 focus:underline-offset-4">
          Delivered Orders
        </button>
        <button className="text-sm font-semibold px-3 py-1 rounded-md hover:bg-gray-100 hover:text-gray-600 focus:z-10  focus:ring-gray-700 focus:text-gray-700 focus:underline-offset-4">
          Cancelled Orders
        </button>
      </div>

      <OrderTable />
    </div>
  );
}
