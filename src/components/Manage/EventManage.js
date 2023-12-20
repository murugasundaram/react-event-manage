import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import EventDetails from "./EventDetails";
import AddNew from "./AddNew";
import { fetchForSelectedEvent, addEntryForSelectedEvent } from "../../stores/manage.store";
import Loader from '../Common/Loader';

const EventManage = () => {
    const allEvents = useSelector(state => state.event.events);
    const selectedEvent = useSelector(state => state.manage.selectedEvent)
    const [toShow, setToShow] = useState('list');
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.manage.isLoading)

    const onSaveNewEntry = (data) => {
        data.eventId = selectedEvent;
        dispatch(addEntryForSelectedEvent(data));
        setToShow('list')
    }

    return <div className="my-inbuilt-card">
        <div className="mb-2 clearfix">
            <h5 className="title-color float-start">Please select the Event</h5>
        </div>
        <select className="mb-3 form-control form-control-sm" 
            value={selectedEvent} 
            onChange={(event) => dispatch(fetchForSelectedEvent(event.target.value))}
            disabled={toShow === 'new'}
        >
            <option value={0}>-- select --</option>
            { allEvents.map((event, index) => <option key={index} value={event.id}>{event.name}</option>) }
        </select>

        {!isLoading && selectedEvent > 0 && toShow === 'new' && <AddNew onSaveClick={onSaveNewEntry} onCancelClick={() => setToShow('list')} />}
        {!isLoading && selectedEvent > 0 && toShow === 'list' && <EventDetails onClickAdd={() => setToShow('new')} />}
        {isLoading && selectedEvent > 0 && <div className="py-4"><Loader /></div>}
        
    </div>
}

export default EventManage;