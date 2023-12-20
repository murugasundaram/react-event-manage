import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEvents } from '../../stores/events.store';
import Loader from '../Common/Loader';
import OnlyAdmin from '../Common/OnlyAdmin';

const EventList = (props) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.event.isLoading)

    return <div className="my-inbuilt-card">
        <div className="mb-4 clearfix">
            <h5 className="title-color float-start">All Available Events</h5>
            <OnlyAdmin>
                <button className="btn btn-sm btn-warning float-end" onClick={() => props.onClickNew('new')}>Add New</button>
            </OnlyAdmin>
        </div>

        <div className="mb-3">
            {!isLoading && <ul className="list-group list-group-flush">
                {props.allEvents.map((event, index) => 
                    <li key={index} className="list-group-item">
                        <span className='text-muted'>{index + 1}.</span> {event.name}
                        <OnlyAdmin>
                            <FontAwesomeIcon 
                                size='sm' icon={faTrash} 
                                className='float-end text-danger cursor-pointer' 
                                onClick={() => dispatch(deleteEvents(event.id))} 
                            />
                        </OnlyAdmin>
                    </li>
                )}
            </ul>}

            {isLoading && <Loader />}
        </div>
    </div>
}

export default EventList;