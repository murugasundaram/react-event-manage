import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authAction } from "../stores/auth.store";
import { useNavigate } from "react-router-dom";
import { fetchEvents } from "../stores/events.store";
import { fetchFrnds } from '../stores/frnds.store';

const AppLayout = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const checkEventFetched = useSelector(state => state.event.isFetched);
    const checkFrndFetched = useSelector(state => state.frnd.isFetched);
    const authFetched = useSelector(state => state.auth.isFetched);

    useEffect(() => {
        if(!checkEventFetched) dispatch(fetchEvents());
        if(!checkFrndFetched) dispatch(fetchFrnds());
        if(!authFetched) fetchAuth();
    }, [])

    const fetchAuth = () => {
        let isLoggedIn = localStorage.getItem('isLoggedIn')
        let isAdmin = localStorage.getItem('isAdmin')

        console.log(isLoggedIn, isAdmin)

        if(isLoggedIn) {
            dispatch(authAction.login({
                isAdmin: isAdmin,
                isLoggedIn: isLoggedIn
            }));
        } else {
            navigate('/login')
        }
    }

    let pageHeader = "";

    if(props.page === 'home') pageHeader = "Home";
    if(props.page === 'event') pageHeader = "Event";
    if(props.page === 'friend') pageHeader = "Friends";
    if(props.page === 'new') pageHeader = "Manage Events";


    return <div className="">
        <Header />
        
        <main className="flex-shrink-0">
            <div className="container">
                <div className="main-container">
                    <h2 className="page-header">{pageHeader}</h2>
                </div>
            </div>
            <div className="body-container">
                <div className="pt-4">
                    <div className="container">
                    {props.children}
                    </div>
                </div>
            </div>
        </main>

        <Footer page={props.page} />
    </div>
}

export default AppLayout;