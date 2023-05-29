import React, { useContext } from "react";
import "./home.scss";
import Crousal from "./Crousal";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { LoadingContext } from "../../context/loadingContext";
import { Link } from "react-router-dom";
import ProductCard from "../../components/home/ProductCard";

export default function Home() {

  const [data, setData] = useState([])
  const { setIsLoading } = useContext(LoadingContext)

  useEffect(() => {

    const getCollections = async () => {
      setIsLoading(true)
      await axios.get("/product")
        .then(res => {
          setData(res?.data?.products)
        })
        .catch(err => console.log(err))
        .finally(() => setIsLoading(false))

    }

    getCollections();

  }, [])

  return (
    <div className="">
      <Crousal />

      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 p-4">
        {
          data?.map((item, index) => {
            return (<ProductCard
              key={index}
              product={item}
            />)
          })
        }
      </div>

    </div>
  );
}
