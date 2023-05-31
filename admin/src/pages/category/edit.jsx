import React, { useContext, useEffect, useState } from "react";
import ButtonGroup from "../../components/buttonGroup";
import AddImage from "../../components/ImageInput";
import axios from "axios";
import { LoadingContext } from "../../contexts/loadingContext";
import { TextInput } from "../../components/InputFields";
import { useFirebase } from "../../contexts/useFirebase";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { toast } from "react-toastify";

export default function EditCategory() {
  const [image, setImage] = useState('');
  const [error, setError] = useState({});
  const { setLoading } = useContext(LoadingContext)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const { id } = useParams()

  const [data, setData] = useState({
    name: ""
  })

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value })
  };

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {

      setLoading(true)

      axios.post("category", data).then((res) => {

        navigate('/categories')
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

    const getCategory = async () => {
      await axios.get(`category/${id}`).then((res) => {
        setData(res.data.category)
      }).catch((err) => {
        console.log(err)
      })

    };

    getCategory();

  }, []);

        return (
          <div className="px-5">
            <div className="my-4 flex flex-row justify-between px-4">
              <h1 className=" text-2xl font-semibold mr-2">Add Category</h1>
            </div>

            <div onSubmit={handleSubmit} className="">
              <div className="my-6">
                <div >
                  <form className="grid grid-cols-2 gap-6 px-2">
                    <TextInput
                      label="Name"
                      name="name"
                      value={data.name}
                      onChange={(e) => setData({ ...data, name: e.target.value })}
                      type="text"
                      placeholder="Category Name"
                      className="w-full"
                    />

                    <div className="flex justify-center items-center col-span-2 ">
                      <button
                        className="bg-secondary-500 text-white p-2 w-[200px] rounded-full tracking-wide"
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
