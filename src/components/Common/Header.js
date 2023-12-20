import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { authAction } from "../../stores/auth.store";
import { useDispatch } from "react-redux";

const Header = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logOut = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('isAdmin');
        dispatch(authAction.logout())
        navigate('/login')
    }

    return <header>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top" style={{ backgroundColor: '#00074d' }}>
            <div className="container-fluid">
            <span className="navbar-brand" >Smart Management</span>
            
            <button className="navbar-toggler" type="button" onClick={logOut}>
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
            </button>

            <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Link</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link disabled" href="#" aria-disabled="true">Disabled</a>
                </li>
                </ul>
            </div>
            </div>
        </nav>
    </header>
}

export default Header;