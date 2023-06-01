import React, { useContext, useEffect } from "react";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
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
    headerName: "Action",
  },
];

export default function Categories() {
  const [data, setData] = React.useState([]);
  const { setLoading } = useContext(LoadingContext)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const getProduct = async () => {
    axios.get('category').then((res) => {
      setData(res.data.categories)
    }).catch((err) => {
      console.log(err)
    })

  };

  const deleteProduct = async (id) => {

    setLoading(true)

    await axios.delete("category/" + id).then((res) => {
      console.log(res)
      getProduct()
    }).catch((err) => {
      console.log(err)
    })



    setLoading(false)

  }

  useEffect(() => {

    const getProduct = async () => {

      axios.get('category').then((res) => {
        setData(res.data.categories)
      }).catch((err) => {
        console.log(err)
      })

    };

    getProduct();

  }, []);

  return (
    <div>
      <div className="my-4 flex flex-row px-6 justify-between">
        <h1 className=" text-2xl font-semibold mr-2">Categories</h1>
        <button
          onClick={() => navigate("/category/add")}
          className="bg-[#268FCD] text-white px-2 py-1 rounded-md">
          Add Category
        </button>
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
                  <td data-label="id">{row?.name}</td>
                  <td data-label="action">
                    <button
                      onClick={() => deleteProduct(row._id)}
                      className="bg-[#268FCD] text-white px-2 py-1 rounded-md">
                      Delete
                    </button>
                    {/* green color edit button */}
                    <Link
                      to={"/category/" + row.id}
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
