import React, { useContext, useEffect, useState } from "react";
import ButtonGroup from "../../components/buttonGroup";
import AddImage from "../../components/ImageInput";
import { LoadingContext } from "../../contexts/loadingContext";
import { TextInput } from "../../components/InputFields";
import { useFirebase } from "../../contexts/useFirebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function AddProduct() {
  const [image, setImage] = useState('');
  const [error, setError] = useState({});
  const { setLoading } = useContext(LoadingContext)
  const navigate = useNavigate()
  const { id } = useParams()

  const [data, setData] = useState({
    title: "",
    price: 0,
    description: "",
    image: ""
  })
  const [category, setCategory] = useState([])

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value })
  };

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {

      setLoading(true)

      const formData = new FormData();

      formData.append('title', data.title)
      formData.append('price', data.price)
      formData.append('description', data.description)
      formData.append('id', id)
      formData.append('category', data.category)
      if (image) formData.append('image', image)

      await axios.patch("product", formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
      ).then((res) => {

        navigate('/products')
        setLoading(false)

      }).catch((err) => {
        console.log(err)
        setLoading(false)
      })

    } catch (error) {
      console.log(error)
      setLoading(false)
    }

  };


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)

        const { data } = await axios.get('product/' + id)
        console.log(data.product.category)
        setData(data.product)

        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  useEffect(() => {

    const getCategory = async () => {
      await axios.get(`category`).then((res) => {
        setCategory(res.data.categories)
      }).catch((err) => {
        console.log(err)
      })

    };

    getCategory();

  }, []);


  return (
    <div className="p-8">
      <div className="my-4 flex flex-row justify-between px-4">
        <h1 className=" text-2xl font-semibold mr-2">Products</h1>
      </div>
      <ButtonGroup link1="/products" link2="/product/add" />

      <div onSubmit={handleSubmit} className="">
        <AddImage link={import.meta.env.VITE_SERVER_URL + data?.image} setImage={setImage} error={error.image} setError={setError} />

        <div className="my-6">
          <div >
            <form className="grid grid-cols-2 gap-6 px-2">
              <TextInput
                label="Title"
                name="title"
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
                type="text"
                placeholder="Product Title"
                className="w-full"
              />

              <TextInput
                label="Price"
                name="price"
                value={data.price}
                onChange={(e) => setData({ ...data, price: e.target.value })}
                type="number"
                placeholder="Product Price"
                className="w-full"
              />

              <select
                className="rounded border border-gray-300 p-2 w-full"
                value={data.category}
                onChange={(e) => setData({ ...data, category: e.target.value })}
              >
                <option value="">Select Category</option>
                {
                  category.map((item) => (
                    <option key={item._id} value={item._id}>{item.name}</option>
                  ))
                }
              </select>

              <div className="col-span-2">
                <label>Description</label>
                <textarea
                  rows="10"
                  placeholder="Description"
                  className="rounded border border-gray-300 p-2 w-full"
                  value={data.description}
                  onChange={handleChange}
                  name="description"
                />
              </div>
              <div className="flex justify-center items-center col-span-2 ">
                <button
                  className="bg-blue-500 text-white p-2 w-[200px] rounded-full tracking-wide"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
