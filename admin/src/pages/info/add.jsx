import React, { useContext, useEffect, useState } from "react";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import { LoadingContext } from "../../contexts/loadingContext";
import AddImage from "../../components/ImageInput";
import { TextInput } from "../../components/InputFields";
import { GoogleMap, Marker } from "react-google-maps"
import MapComponent from "./maps";
import { db } from "../../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useFirebase } from "../../contexts/useFirebase";
import ImagesInput from "../../components/imagesInput";
import { AuthContext } from "../../contexts/authContext";
import axios from "axios";
import { toast } from "react-toastify";


export default function AddEvent() {
  const [data, setData] = React.useState({
    name: "",
    shopname: "",
    contact: "",
    license: "",
    website: "",
    location: "",
    bio: "",
  });
  const [location, setLocation] = React.useState({
    lat: 44,
    lng: -88,
  });
  const mapRef = React.useRef(null);
  const { setLoading } = useContext(LoadingContext);
  const navigate = useNavigate();
  const [image, setImage] = useState()
  const { user, token, Login } = useContext(AuthContext)
  const [errors, setErrors] = useState({})

  const handleAdd = async (event) => {

    event.preventDefault()

    let newPos = location;

    if (mapRef.current) {
      newPos = mapRef.current.getCenter().toJSON();
    };

    try {

      setLoading(true)

      const formData = new FormData();

      formData.append('name', data.name)
      formData.append('shopname', data.shopname)
      formData.append('contact', data.contact)
      formData.append('license', data.license)
      formData.append('website', data.website)
      formData.append('location', data.location)
      formData.append('bio', data.bio)
      formData.append('coordinates', JSON.stringify(newPos))
      if (image) formData.append('image', image)
      formData.append('isCompleted', true)

      await axios.patch("user/update-user", formData).then((res) => {

        Login({
          ...user,
          isCompleted: true
        }, token)

        toast.success("Profile Updated Successfully")
      }).catch((error) => {
        console.log(error)
      })



      setLoading(false)

    } catch (error) {
      console.log(error)
      setLoading(false)
    }

  }

  useEffect(() => {

    const getUserInfo = async () => {
      setLoading(true)

      await axios.get('user/get-user-info').then((res) => {
        const { data } = res;

        const user = data.user

        setData({
          name: user?.name,
          shopname: user.shopname,
          contact: user.contact,
          license: user.license,
          website: user.website,
          location: user.location,
          bio: user.bio,
          avatar: user?.avatar
        })

        if (user.coordinates) {
          setLocation(user.coordinates)
        }

      }).catch((error) => {
        console.log(error)
      }
      )

      setLoading(false)

    }

    getUserInfo()

  }, [])


  return (
    <div>

      <form onSubmit={handleAdd} className="block py-2 px-4  mx-1 md:mx-2 rounded-md">

        {
          !user?.isCompleted && (
            <div className="relative bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-3" role="alert">
              <strong className="font-bold">Please Complete Your Profile!</strong>
              <span className="block sm:inline"> You need to complete your profile to add products.</span>
            </div>
          )
        }

        <AddImage
          setImage={setImage}
          image={image}
          link={data.avatar ? import.meta.env.VITE_SERVER_URL + data.avatar : ''}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            label="Name"
            name="name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            type="text"
            placeholder="Owner Name"
            className="w-full"
          />

          <TextInput
            label="Shop Name"
            name="shopname"
            value={data.shopname}
            onChange={(e) => setData({ ...data, shopname: e.target.value })}
            type="text"
            placeholder="Shop Name"
            className="w-full"
          />


          <TextInput
            label="Contact Information"
            name="contact"
            value={data.contact}
            onChange={(e) => setData({ ...data, contact: e.target.value })}
            type="text"
            placeholder="Contact Information"
            className="w-full"
          />

          <TextInput
            label="Company License"
            name="license"
            value={data.license}
            onChange={(e) => setData({ ...data, license: e.target.value })}
            type="text"
            placeholder="Company License"
            className="w-full"
          />

          <TextInput
            label="Company Website"
            name="website"
            value={data.website}
            onChange={(e) => setData({ ...data, website: e.target.value })}
            type="text"
            placeholder="Company Website"
            className="w-full"
          />

          <TextInput
            label="Shop Location"
            name="location"
            value={data.location}
            onChange={(e) => setData({ ...data, location: e.target.value })}
            type="text"
            placeholder="Event Location"
            className="w-full"
          />

          <div className="md:col-span-2">
            <label>Bio</label>
            <textarea
              rows="10"
              placeholder="Bio"
              className="rounded border border-gray-300 p-2 w-full"
              value={data.bio}
              onChange={(e) => setData({ ...data, bio: e.target.value })}
              name="bio"
            />
          </div>

        </div>
        <MapComponent
          isMarkerShown
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          location={location}
          setLocation={setLocation}
          mapRef={mapRef}
        />

        <div className="text-center">
          <button
            // onClick={handleAdd}
            className="bg-[#FBBF24] text-white px-4 py-2 rounded-md mt-4 self-center"
          >
            Update
          </button>
        </div>
      </form>
    </div >
  );
}
