import React, { useState } from "react";

const NewFrnd = (props) => {

    const [frndName, setFrndName] = useState('')
    const [error, setError] = useState(false)

    const onChangeHandler = (event) => {
        setError(false)
        setFrndName(event.target.value)
    }

    const addNewFrnd = () => {
        if(frndName === "") {
            setError(true)
            return
        }

        props.onNewEvent(frndName)
    }

    return <div className="my-card">
        <div className="mb-4">
            <h5 className="title-color">Add New Friend</h5>
        </div>
        <div className="mb-2">
            <label className="form-label">Friend Name</label>
            <input type="text" className="form-control" placeholder="Please provide the friend name" 
                value={frndName} onChange={onChangeHandler} />
        </div>
        {error && <div>
            <span className="text-danger">Please provide friend name</span>
        </div>}
        <div className="mt-3">
            <button className="btn btn-sm btn-my-color me-2" onClick={addNewFrnd}>Add</button>
            <button className="btn btn-sm btn-secondary" onClick={() => props.onClickNew('list')}>Close</button>
        </div>
    </div>
}

export default NewFrnd;