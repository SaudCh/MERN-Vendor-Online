import { useState, useEffect, useCallback, useContext } from "react";

let logoutTimer;

export const useAuth = () => {
    const [token, setToken] = useState("");
    const [user, setUser] = useState("");
    const [timer, setTimer] = useState();

    const Login = useCallback(async (user, token, expireTime) => {
        const expires = expireTime || new Date(new Date().getTime() + 1000 * 60 * 60 * 6)

        setToken(token);
        setUser(user);
        setTimer(expires)

        localStorage.setItem("user", JSON.stringify({
            email: user.email,
            id: user.id || user.uid,
            expires: expires.toISOString(),
            role: user.role,
        }));
        localStorage.setItem("token", token);

    }, []);

    const Logout = useCallback(() => {
        setToken(null);
        setUser(null);
        setTimer(null)
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    }, []);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");
        if (user && token && new Date(user.expires) > new Date()) {
            Login(user, token, new Date(user.expires))
        }
    }, [])

    useEffect(() => {
        if (token && timer) {
            const rt = timer.getTime() - new Date()
            logoutTimer = setTimeout(Logout, rt)
        } else {
            clearTimeout(logoutTimer)
        }
    }, [token, Logout, timer]);

    return { Login, Logout, token, user };

};