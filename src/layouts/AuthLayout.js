import { useEffect } from "react"

const AuthLayout = (props) => {

    useEffect(() => {
        document.body.classList.add('auth-container');
    }, [])

    return <div className="container-sm">
        <div className="row mt-5 align-items-center">
            <div className="col-12 col-sm-12">
                <div className="card pb-3">
                <h1 className="my-3 text-center">{props.page ?? 'Login'}</h1>
                <div className="card-body">
                    {props.children}
                </div>
                </div>
            </div>
        </div>
    </div>
}

export default AuthLayout;