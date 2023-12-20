import { useSelector } from "react-redux";
import EventExclude from "./EventExclude";
import EventPending from "./EventPending";
import OnlyAdmin from "../Common/OnlyAdmin";
import html2canvas from 'html2canvas';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

const EventDetails = (props) => {
    const totalReceived = useSelector(state => state.manage.totalReceived);
    const received = useSelector(state => state.manage.received);
    const pending = useSelector(state => state.manage.pending);

    const captureScreenshot = () => {
        const element = document.getElementById('divToCapture');
    
        html2canvas(element)
        .then((canvas) => {
            // Convert canvas to image
            const screenshotImage = canvas.toDataURL('image/png');

            // Create a temporary link and trigger a download
            const link = document.createElement('a');
            link.href = screenshotImage;
            link.download = 'screenshot.png';
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
        })
        .catch((error) => {
            alert('Error capturing screenshot');
        });
      };

    return <>
        <div className="mb-3 clearfix">
            <div className="title-color float-start">List of Collected Amount</div>


            <OnlyAdmin>
                {pending.length > 0 && <button className="btn btn-sm btn-warning float-end" onClick={props.onClickAdd}>Add</button>}
            </OnlyAdmin>

            {pending.length == 0 &&  <span style={{backgroundColor: 'green'}} className="badge badge-success float-end">Completed</span>}
            
            <button className="btn btn-sm btn-secondary float-end me-2" onClick={captureScreenshot}><FontAwesomeIcon size="s" icon={faCamera}/></button>

        </div>
        <div className="mt-2" id="divToCapture">
            {received.length > 0 && <table className="table table-sm">
                <tbody className="tr-right-border">
                    {received.map((rec, index) =>  <tr key={index}>
                        <td className="text-muted font-sm">{rec.date}</td>
                        <td>{rec.frndName}</td>
                        <td>Rs. {rec.amount}</td>
                    </tr>)}
                    <tr className="total-tr">
                        <td></td>
                        <td>Total Amount</td>
                        <td>Rs. {totalReceived}</td>
                    </tr>
                </tbody>
            </table>}
            {received.length == 0 && <div className="alert alert-primary"> 
                <a className="text-decoration-none" onClick={props.onClickAdd}>Click here</a> to Start the First Collection for this Event  
            </div>}
        </div>

        <EventExclude />

        <EventPending />
    </>
}

export default EventDetails;