import { useSelector } from "react-redux"

const OnlyAdmin = (props) => {

    const isAdmin = useSelector(state => state.auth.isAdmin)
    
    const childs = isAdmin === 'true' ? props.children : "";

    return <>
        {childs}
    </>
}

export default OnlyAdmin;