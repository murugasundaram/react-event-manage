import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authAction } from "../stores/auth.store";
import { useNavigate } from "react-router-dom";
import { fetchEvents } from "../stores/events.store";
import { fetchFrnds } from '../stores/frnds.store';
import Pusher from 'pusher-js';
import { chatAction } from "../stores/chat.store";
import { fetchChats } from "../stores/chat.store";

const AppLayout = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const checkEventFetched = useSelector(state => state.event.isFetched);
    const checkFrndFetched = useSelector(state => state.frnd.isFetched);
    const authFetched = useSelector(state => state.auth.isFetched);
    const chatFetched = useSelector(state => state.chat.isFetched);

    useEffect(() => {
        if(!chatFetched) dispatch(fetchChats());
        //if(!checkEventFetched) dispatch(fetchEvents());
        //if(!checkFrndFetched) dispatch(fetchFrnds());
        if(!authFetched) fetchAuth();
    }, [])

    useEffect(() => {
        const pusher = new Pusher('34296ef708c4505ff449', {
            cluster: 'ap1',
            encrypted: true,
        });

        const channel = pusher.subscribe('events');

        channel.bind('new-chat', (data) => {
            // Handle the new event data, e.g., update state
            console.log('New Chat:', data.data);
            dispatch(chatAction.updateChat({ newChat: data.data }));
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, []);

    const fetchAuth = () => {
        let isLoggedIn = localStorage.getItem('isLoggedIn')
        let isAdmin = localStorage.getItem('isAdmin')
        let uname = localStorage.getItem('uname')

        if(isLoggedIn) {
            dispatch(authAction.login({
                isAdmin: isAdmin,
                isLoggedIn: isLoggedIn,
                uname: uname
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
    if(props.page === 'chat') pageHeader = "Notes";

    return <div className="">
        <Header />
        
        <main className="flex-shrink-0">
            {props.page !== 'chat' && <>
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
            </>}
            {props.page === 'chat' && <div className="chat-container">
                {props.children}
            </div>}
        </main>

        <Footer page={props.page} />
    </div>
}

export default AppLayout;