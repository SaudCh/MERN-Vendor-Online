import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useCart = () => {

    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    const addToCart = (item) => {
        // if item is already in cart, increase quantity

        let newCart = [...cart];
        const itemInCart = newCart.find((i) => i._id === item._id && i?.sp === item?.sp);

        if (itemInCart) {
            itemInCart.quantity = itemInCart.quantity + item.quantity;
            toast.success("Item added to cart");
        } else {
            item.quantity = 1;
            newCart.push(item);
            toast.success("Item added to cart");
        }

        setCart(newCart);

        localStorage.setItem("cart", JSON.stringify(newCart));
    };

    const removeFromCart = (item) => {
        const newCart = cart.filter((i) => i._id !== item._id);
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    };

    const clearCart = () => {
        localStorage.removeItem("cart");
        setCart([]);
    };

    const changeQuantity = (id, quantity) => {
        const newCart = [...cart];
        const itemInCart = newCart.find((i) => i._id === id);

        if (itemInCart) {
            itemInCart.quantity = quantity;
        }

        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    };

    const getTotal = () => {
        const total = cart.reduce((acc, item) => acc + item.price, 0);
        setTotal(total);
    };

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart"));

        if (cart) {
            setCart(cart);
        }
    }, []);

    useEffect(() => {

        const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotal(total);

    }, [cart]);


    return { cart, addToCart, removeFromCart, clearCart, getTotal, total, changeQuantity };


}