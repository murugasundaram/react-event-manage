import ChatBox from "../components/Chat/ChatBox";
import NewChat from "../components/Chat/NewChat";
import AppLayout from "../layouts/AppLayout";

const Chat = () => {
    return <AppLayout page="chat">
        <ChatBox />
        <NewChat />
    </AppLayout>
}

export default Chat;