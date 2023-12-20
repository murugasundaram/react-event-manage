import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useSelector } from "react-redux";

const EventPending = () => {
    const pending = useSelector(state => state.manage.pending);
    const [showPending, setShowPending] = useState(false);

    return <>
        {pending.length > 0 && !showPending && <div>
            <button className="btn btn-sm btn-danger w-100" onClick={() => setShowPending(true)}>Show Pending</button>
        </div>}
        
        {pending.length > 0 && showPending && <div className="alert alert-danger">
            <div className="mb-2 clearfix">
                <div className="text-danger float-start"><strong>Pending Amount From</strong></div>
                <div>
                    <FontAwesomeIcon className="float-end mt-2" icon={faAngleUp} onClick={() => setShowPending(false)} />
                </div>
            </div>
            <div>
                {pending.map((remain, index) =>  <div key={index}>{index + 1}. {remain.name}</div>)}
            </div>
        </div>}
    </>
}

export default EventPending;