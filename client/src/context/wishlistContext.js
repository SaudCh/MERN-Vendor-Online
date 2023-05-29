import { createContext } from "react";

export const WishlistContext = createContext({
    wishlist: [],
    toggleWishlist: () => { },
    clearWishlist: () => { },
    getWishList: () => { }
});