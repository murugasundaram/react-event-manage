import { useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";

const Footer = (props) => {

    const navigate = useNavigate();
    const hasNewMsg = useSelector(state => state.chat.hasNewMsg)

    const changeMenu = (menu) => {
        navigate(menu)
    }

    return <footer className="footer mt-auto py-3 fixed-bottom" style={{backgroundColor:'#f6f6fb', borderTop: '1px solid #4880ef99'}}>
        <div className="container">
            <div className="row align-items-center">
                <div className="col text-center" onClick={() => changeMenu('/home')}>
                    <i className={`fa fas fa-home ${props.page === 'home' ? 'selected-menu' : ''}`}></i>
                </div>
                <div className="col text-center" onClick={() => changeMenu('/event')}>
                    <i className={`fa fas fa-calendar ${props.page === 'event' ? 'selected-menu' : ''}`} ></i>
                </div>
                <div className="col text-center" onClick={() => changeMenu('/friend')}>
                    <i className={`fa fas fa-user ${props.page === 'friend' ? 'selected-menu' : ''}`} ></i>
                </div>
                <div className="col text-center" onClick={() => changeMenu('/new')}>
                    <i className={`fa fas fa-plus ${props.page === 'new' ? 'selected-menu' : ''}`} ></i>
                </div>
                <div className="col text-center" onClick={() => changeMenu('/chat')}>
                    <i className={`fa fas fa-comment  ${props.page === 'chat' ? 'selected-menu' : ''}`} >
                    {hasNewMsg && <span className="position-absolute translate-middle bg-danger border border-light rounded-circle" style={{ padding: '5px'}}>
                    </span>}
                    </i>
                </div>
            </div>
        </div>
    </footer>
}

export default Footer;