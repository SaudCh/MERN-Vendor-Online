import React from "react";
import { Link } from "react-router-dom";

export default function ButtonGroup({
  link1 = "/",
  link2 = "/",
  label1 = "All",
  label2 = "Add",
}) {
  return (
    <div class="rounded-md flex justify-end mb-1 mr-2">
      <Link
        to={link1}
        aria-current="page"
        class="py-2 px-4 text-sm font-medium bg-white rounded-l-lg border"
      >
        {label1}
      </Link>
      <Link
        to={link2}
        class="py-2 px-4 text-sm font-medium text-gray-900 bg-[#fff] rounded-r-md border border-gray-200 hover:bg-gray-100"
      >
        {label2}
      </Link>
    </div>
  );
}
