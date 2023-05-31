import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import SendMessage from "./SendMessage";
import UserList from "./userList";
import { collection, limit, orderBy, query, setDoc, doc, where, onSnapshot, getDoc, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const scroll = useRef();
  const [users, setUsers] = useState([{}]);
  const [selected, setSelected] = useState("");
  const { user } = useContext(AuthContext)
  const [message, setMessage] = useState("");

  const { state } = useLocation();

  const { sellerId, productId } = state;

  const sendMessage = async (event) => {
    event.preventDefault();
    if (message.trim() === "") {
      alert("Enter valid message");
      return;
    }
    // const { uid, displayName, photoURL } = auth.currentUser;

    try {

      await addDoc(collection(db, "messages"), {
        text: message,
        // name: displayName,
        // avatar: photoURL,
        createdAt: serverTimestamp(),
        chatId: `${selected}-${user?.id}`,
        userId: user?.id,
      });
      setMessage("");
      // scroll.current.scrollIntoView({ behavior: "smooth" });

    } catch (error) {
      console.log(error);

    }
  };

  // useEffect(() => {

  //   const chatId = `${sellerId._id}-${user?.id}`;

  //   const q = query(collection(db, "messages"), where("chatId", "==", chatId), orderBy("createdAt", "asc"));
  //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //     const data = [];
  //     querySnapshot.forEach((doc) => {
  //       data.push(doc.data());
  //     });
  //     setMessages(data);
  //   });


  // }, [])

  useEffect(() => {

    const getChat = async () => {

      if (!sellerId || !productId) return;

      const chatId = `${sellerId._id}-${user?.id}`;

      const docRef = doc(db, "chats", chatId);
      const docSnap = await getDoc(docRef);

      setSelected(sellerId._id);

      if (docSnap.exists()) {

      } else {

        try {
          await setDoc(doc(db, "chats", chatId), {
            sellerId: sellerId._id,
            buyerId: user?.id,
            sellerInfo: {
              name: sellerId.name,
              email: sellerId.email,
              avatar: sellerId.avatar
            },
            buyerInfo: {
              // name: user?.name ,
              email: user?.email,
              //  avatar: user?.avatar
            },
            lastMessage: "New Chat Created",
            createdAt: new Date().getTime(),
          });

          console.log("chat created");

          // setUsers([...users, sellerId])

        } catch (error) {
          console.log(error);
        }

      }

    }

    getChat();

  }, [state]);

  useEffect(() => {
    const q = query(collection(db, "chats"), where("buyerId", "==", user?.id));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setUsers(data);

    });

  }, []);

  useEffect(() => {

    try {

      if (!selected) return;

      const chatId = `${selected}-${user?.id}`;

      const q = query(
        collection(db, "messages"),
        where("chatId", "==", chatId),
        orderBy("createdAt", "desc"),
        limit(50)
      );

      const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
        const fetchedMessages = [];
        QuerySnapshot.forEach((doc) => {
          fetchedMessages.push({ ...doc.data(), id: doc.id });
        });
        const sortedMessages = fetchedMessages.sort(
          (a, b) => a.createdAt - b.createdAt
        );
        setMessages(sortedMessages);
      });

      // return () => unsubscribe;

    } catch (error) {

    }

  }, [selected]);



  return (
    <main className="chat-box flex  ">
      <div className="w-[300px] border border-t-0 bg-white h-screen overflow-hidden">
        <UserList
          users={users}
          selected={selected}
          setSelected={setSelected}
        />
      </div>
      <div className="messages-wrapper w-[100%]">
        {messages?.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      {/* when a new message enters the chat, the screen scrolls down to the scroll div */}
      <span ref={scroll}></span>
      <SendMessage
        scroll={scroll}
        sendMessage={sendMessage}
        setMessage={setMessage}
        message={message}
      />
    </main>
  );
};

export default ChatBox;