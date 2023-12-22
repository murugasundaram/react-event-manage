
import { useSelector } from "react-redux";
import ChatLine from "./ChatLine";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { chatAction } from "../../stores/chat.store";

const ChatBox = () => {
    const allChat = useSelector(state => state.chat.allChat);
    const divRef = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        scrollToBottom();
        dispatch(chatAction.readMsg());
    }, [allChat]);
    
    const scrollToBottom = () => {
        if (divRef.current) {
            divRef.current.scrollTop = divRef.current.scrollHeight;
        }
    };

    return <div ref={divRef} className="container chat-box">
        <div className="row"> {allChat.map((chat, index) => <ChatLine key={index} chat={chat} />)} </div>
    </div>
}

export default ChatBox;