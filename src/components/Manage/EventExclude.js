import { faAngleUp, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useSelector } from "react-redux";
import { removeEntryForSelectedEvent } from "../../stores/manage.store";
import { useDispatch } from "react-redux";
import OnlyAdmin from "../Common/OnlyAdmin";

const EventExclude = () => {

    const selectedEvent = useSelector(state => state.manage.selectedEvent)
    const excluded = useSelector(state => state.manage.excluded);
    const isAdmin = useSelector(state => state.auth.isAdmin);

    const [showExclude, setShowExclude] = useState(false);
    const dispatch = useDispatch();

    const removeExclude = (frnd) => {
        let exObj = {
            event_id: selectedEvent,
            frnd_id: frnd.id,
            frnd_name: frnd.name
        }

        dispatch(removeEntryForSelectedEvent(exObj));
    }

    return <>
        {excluded.length > 0 && !showExclude && <div>
            <button className="btn btn-sm btn-info w-100 mb-2" onClick={() => setShowExclude(true)}>Show Exclude</button>
        </div>}

        {excluded.length > 0 && showExclude && <div className="alert alert-info mb-2">
            <div className="mb-2 clearfix">
                <div className="text-muted float-start"><strong>Excluded Friends for this Event</strong></div>
                <div>
                    <FontAwesomeIcon className="float-end mt-2" icon={faAngleUp} onClick={() => setShowExclude(false)} />
                </div>
            </div>
            <div>
                {excluded.map((ex, index) => <div key={index} className={`cutom-tag d-inline-block ${isAdmin == 'true' ? '' : 'pr-10'}`} >
                    {ex.name}
                    <OnlyAdmin> <FontAwesomeIcon icon={faClose} onClick={() => removeExclude(ex)} /> </OnlyAdmin>
                </div>)}
            </div>
        </div>}
    </>
}

export default EventExclude;