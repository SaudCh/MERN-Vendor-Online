import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../config/firebase";

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const Login = (user, token) => {
        setUser(user)
        setToken(token)
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
    };

    const Logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");

    };

    useEffect(() => {
        let user = localStorage.getItem("user")
        const token = localStorage.getItem("token")

        if (user, token) {
            user = JSON.parse(user)
            Login(user, token)
        }

    }, []);

    return { user, Login, Logout, token };
}
