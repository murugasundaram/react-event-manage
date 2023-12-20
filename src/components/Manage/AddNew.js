import { useState } from "react";
import { useSelector } from "react-redux";

const AddNew = (props) => {
    const remainFrnds = useSelector(state => state.manage.pending);
    const [frnd, setFrnd] = useState(0);
    const [amount, setAmount] = useState("");
    const [error, setError] = useState(false);

    const onSave = () => {
        if(frnd === 0 || amount <= 0) {
            setError(true);
            return;
        }

        let saveObj = {
            frndId: frnd,
            amount: amount,
            isExclude: false
        }

        props.onSaveClick(saveObj);
    }

    const onExclude = () => {
        if(frnd === 0) {
            setError(true);
            return;
        }

        let saveObj = {
            frndId: frnd,
            amount: 0,
            isExclude: true
        }

        props.onSaveClick(saveObj);
    }

    return <div className="my-card">
        <div className="mb-4">
            <h5 className="title-color">Add New Entry</h5>
        </div>
        <div className="mb-2">
            <label className="form-label">Friend Name</label>
            <select className="form-control form-control-sm" 
                value={frnd}
                onChange={(event) => setFrnd(event.target.value)}
            >
                <option value={0}>-- select --</option>
                {remainFrnds.map((frnd, index) => <option key={index} value={frnd.id}>{frnd.name}</option>)}
            </select>
        </div>
        <div className="mb-2">
            <label className="form-label">Amount Given</label>
            <input className="form-control form-control-sm" type="number" 
                value={amount} 
                onChange={(event) => setAmount(event.target.value)} 
            />
        </div>
        {error && <div>
            <span className="text-danger">Please provide some values</span>
        </div>}
        <div className="mt-3 clearfix">
            <button className="btn btn-sm btn-warning me-2 float-start" onClick={onExclude} >Exclude</button>
            <button className="btn btn-sm btn-secondary float-end" onClick={props.onCancelClick} >Close</button>
            <button className="btn btn-sm btn-my-color me-2 float-end" onClick={onSave} >Save</button>
        </div>
    </div>
}

export default AddNew;