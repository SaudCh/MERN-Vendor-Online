import React, { useState } from "react";
import { db } from "../../config/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { AuthContext } from "../../contexts/authContext";
import { useContext } from "react";


const SendMessage = ({ scroll, sendMessage, message, setMessage }) => {
    // const [message, setMessage] = useState("");
    const { user } = useContext(AuthContext)

    return (
        <form onSubmit={(event) => sendMessage(event)} className="send-message">
            <label htmlFor="messageInput" hidden>
                Enter Message
            </label>
            <input
                id="messageInput"
                name="messageInput"
                type="text"
                className="form-input__input"
                placeholder="type message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit">Send</button>
        </form>
    );
};

export default SendMessage;