import { useState } from "react";
import { useSelector } from "react-redux";
import { chatAction } from "../../stores/chat.store";
import { useDispatch } from "react-redux";
import { addChats } from "../../stores/chat.store";

const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

const NewChat = () => {
    const [msg, setMsg] = useState("")
    const uname = useSelector(state => state.auth.uname);
    const dispatch = useDispatch();

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            submitMsg();
            event.preventDefault();
        }
      };

    const submitMsg = () => {
        let date = new Date().toLocaleDateString()

        let newMsg = {
            name: capitalizeFirstLetter(uname),
            msg,
            date
        }

        dispatch(addChats(newMsg));
        //dispatch(chatAction.updateChat(newMsg));
        setMsg("")
    }

    return <div className="fixed-bottom bottom-80">
        <div className="container">
            <div className="row">
                <div className="col-10">
                    <textarea className="form-control" 
                        rows="2" 
                        placeholder="Type your message..." 
                        value={msg}
                        onChange={(event) => setMsg(event.target.value)}
                        onKeyDown={handleKeyDown}
                    ></textarea>
                </div>
                <div className="col-2 d-flex align-items-center">
                    <i className="fa fa-regular fa-paper-plane" onClick={submitMsg}></i>
                </div>
            </div>
        </div>
    </div>
}

export default NewChat;