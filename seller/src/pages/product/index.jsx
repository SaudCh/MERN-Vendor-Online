import React, { useContext, useEffect } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { collection, query, where, onSnapshot, setDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { LoadingContext } from "../../contexts/loadingContext";
import axios from "axios";
import { AuthContext } from "../../contexts/authContext";


const columns = [
  { headerName: "ID" },
  {
    headerName: "Name",
  },
  {
    headerName: "Price",
  },
  {
    headerName: "Action",
  },
];

export default function Products() {
  const [data, setData] = React.useState([]);
  const { setLoading } = useContext(LoadingContext)
  const { user } = useContext(AuthContext)

  const deleteProduct = async (id) => {

    setLoading(true)

    setLoading(false)

  }

  useEffect(() => {

    const getProduct = async () => {

      axios.get('product/s/' + user.id).then((res) => {
        setData(res.data.products)
      }).catch((err) => {
        console.log(err)
      })

    };

    getProduct();

  }, []);

  return (
    <div>
      <div className="my-4 flex flex-row px-6">
        <h1 className=" text-2xl font-semibold mr-2">Products</h1>
      </div>
      <div class="rounded-md flex justify-end mr-14 mb-2">
        <Link
          to="/products"
          aria-current="page"
          class="py-2 px-4 text-sm font-medium bg-white rounded-l-lg border"
        >
          All
        </Link>
        <Link
          to="/product/add"
          class="py-2 px-4 text-sm font-medium text-gray-900 bg-[#fff] rounded-r-md border border-gray-200 hover:bg-gray-100"
        >
          Add
        </Link>
      </div>

      <div className="block py-2 px-4  mx-1 md:mx-2 rounded-md">
        <div></div>

        <div className="flex justify-center">
          <table>
            <thead>
              {columns.map((column, index) => (
                <th key={index}>{column.headerName}</th>
              ))}
            </thead>
            {
              data.length === 0 && (
                <tbody>
                  <tr>
                    <td colSpan={columns.length} className="text-center">
                      No data found
                    </td>
                  </tr>
                </tbody>
              )

            }
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  <td data-label="id">{index + 1}</td>
                  <td data-label="id">{row?.title}</td>
                  <td data-label="id">{row?.price}</td>
                  <td data-label="action">
                    <button
                      onClick={() => deleteProduct(row.id)}
                      className="bg-[#268FCD] text-white px-2 py-1 rounded-md">
                      Delete
                    </button>
                    {/* green color edit button */}
                    <Link
                      to={"/product/" + row.id}
                      className="bg-[#79B84E] text-white px-2 py-1 rounded-md ml-2"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
