import AppLayout from "../layouts/AppLayout";
import NewEvent from "../components/Event/NewEvent";
import EventList from "../components/Event/EventList";
import { useSelector, useDispatch } from "react-redux";
import { addEvents, eventActions } from "../stores/events.store";

const Event = () => {
    const isNew = useSelector(state => state.event.isNew)
    const allEvents = useSelector(state => state.event.events)
    const dispatch = useDispatch();

    const clickNewHandler = (action) => {
        dispatch(eventActions.setIsNew(action))
    }

    return <AppLayout page="event">
        {isNew === 'new' && <NewEvent onNewEvent={(eventName) => dispatch(addEvents(eventName))} onClickNew={clickNewHandler} />}
        {isNew === 'list' && <EventList allEvents={allEvents} onClickNew={clickNewHandler} />}
    </AppLayout>
}

export default Event;