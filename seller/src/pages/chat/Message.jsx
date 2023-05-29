import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
// import { auth } from "../firebase";
// import { useAuthState } from "react-firebase-hooks/auth";

const Message = ({ message }) => {
    // const [user] = useAuthState(auth);
    // console.log(message.avatar);
    const { user } = useContext(AuthContext)

    return (
        <div
            className={`chat-bubble ${message.userId === user.id ? "right" : ""}`}>
            {/* <img
                className="chat-bubble__left"
                src={message.avatar}
                alt="user avatar"
            /> */}
            <div className="chat-bubble__right">
                <p className="user-name">{message.name}</p>
                <p className="user-message">{message.text}</p>
            </div>
        </div>
    );
};

export default Message;