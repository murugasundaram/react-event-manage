import React, { useState } from "react";

const NewEvent = (props) => {

    const [eventName, setEventName] = useState('')
    const [error, setError] = useState(false)

    const onChangeHandler = (event) => {
        setError(false)
        setEventName(event.target.value)
    }

    const addNewEvent = () => {
        if(eventName === "") {
            setError(true)
            return
        }

        props.onNewEvent(eventName)
    }

    return <div className="my-card">
        <div className="mb-4">
            <h5 className="title-color">Add New Event</h5>
        </div>
        <div className="mb-2">
            <label className="form-label">Event Name</label>
            <input type="text" className="form-control" placeholder="Please provide the event name" 
                value={eventName} onChange={onChangeHandler} />
        </div>
        {error && <div>
            <span className="text-danger">Please provide event name</span>
        </div>}
        <div className="mt-3">
            <button className="btn btn-sm btn-my-color me-2" onClick={addNewEvent}>Add</button>
            <button className="btn btn-sm btn-secondary" onClick={() => props.onClickNew('list')}>Close</button>
        </div>
    </div>
}

export default NewEvent;