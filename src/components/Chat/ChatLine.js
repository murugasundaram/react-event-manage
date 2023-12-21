import { Tooltip } from "react-bootstrap";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { useSelector } from "react-redux";

const ChatLine = (props) => {
    const uname = useSelector(state => state.auth.uname);

    const chatName = props.chat.name ?? "";
    const chatClass = chatName == uname ? 'right' : 'left';

    return <div className="col-12">
        <div className={`chat-bubble ${chatClass}`}>
            {chatClass === 'left' && <div className="chat-head clearfix">
                <span className="float-start">{chatName}</span>
            </div>}
            <OverlayTrigger
                placement="top"
                overlay={<Tooltip>{props.chat.date}</Tooltip>}
            >
            <div>{props.chat.msg}</div>
            </OverlayTrigger>
        </div>
    </div>
}

export default ChatLine;