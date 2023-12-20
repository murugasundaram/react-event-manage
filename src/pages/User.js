import AppLayout from "../layouts/AppLayout";
import NewFrnd from "../components/Friend/NewFrnd";
import FrndList from "../components/Friend/FrndList";
import { useSelector, useDispatch } from "react-redux";
import { addFrnds, frndActions } from "../stores/frnds.store";

const User = () => {
    const isNew = useSelector(state => state.frnd.isNew)
    const allFrnds = useSelector(state => state.frnd.frnds)
    const dispatch = useDispatch();

    const clickNewHandler = (action) => {
        dispatch(frndActions.setIsNew(action))
    }

    return <AppLayout page="friend">
        {isNew === 'new' && <NewFrnd onNewEvent={(frndName) => dispatch(addFrnds(frndName))} onClickNew={clickNewHandler} />}
        {isNew === 'list' && <FrndList allFrnds={allFrnds} onClickNew={clickNewHandler} />}
    </AppLayout>
}

export default User;