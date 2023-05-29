import { createContext } from "react";

export const CartContext = createContext({
    cart: [],
    addToCart: () => { },
    removeFromCart: () => { },
    clearCart: () => { },
    getTotal: () => { },
    total: 0,
    changeQuantity: () => { },
});