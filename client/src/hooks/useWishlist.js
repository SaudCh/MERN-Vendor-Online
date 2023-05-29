import axios from "axios";
import { useContext, useEffect, useState } from "react";

export const useWislist = () => {

    const [wishlist, setWishlist] = useState([]);

    const toggleWishlist = async (id) => {

        const newWishlist = [...wishlist];

        if (newWishlist.includes(id)) {
            const index = newWishlist.indexOf(id);
            newWishlist.splice(index, 1);
        } else {
            newWishlist.push(id);
        }

        axios.post('wishlist/toggle-product', { productId: id })

        setWishlist(newWishlist);

    }

    const clearWishlist = () => {
        setWishlist([]);
    }


    const getWishList = async () => {

        await axios.get('wishlist/get-wishlist')
            .then(res => {
                console.log(res.data)
                setWishlist(res?.data?.wishlist)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {

        const getWishList = async () => {

            const user = JSON.parse(localStorage.getItem("user"));

            if (!user) return;


            await axios.get('wishlist/get-wishlist')
                .then(res => {
                    setWishlist(res?.data?.wishlist)
                })
                .catch(err => console.log(err))
        }

        getWishList()

    }, [])


    return { wishlist, toggleWishlist, clearWishlist, getWishList }
}