import ChatBox from "../components/Chat/ChatBox";
import NewChat from "../components/Chat/NewChat";
import AppLayout from "../layouts/AppLayout";
import Loader from '../components/Common/Loader';
import { useSelector } from "react-redux";

const Chat = () => {
    const isLoading = useSelector(state => state.chat.isLoading);

    return <AppLayout page="chat">
        {!isLoading && 
        <>
            <ChatBox />
            <NewChat />
        </>}
        {isLoading && <div className="center-div-loader"><Loader /></div>}
    </AppLayout>
}

export default Chat;