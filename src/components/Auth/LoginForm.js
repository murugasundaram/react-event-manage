import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authAction } from "../../stores/auth.store";

const ADMINS_PASSWORDS = ['Muruga@1995', 'Psk@1995'];

const LoginForm = () => {

    const [uname, setUname] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onUnameChange = (event) => {
        setUname(event.target.value)
        setError('')
    }

    const onPassChange = (event) => {
        setPass(event.target.value)
        setError('')
    }

    const doLogin = () => {
        if(uname === '') {
            setError('Username cannot be empty')
            return;
        }

        if(pass === '') {
            setError('Password cannot be empty')
            return;
        }

        let isAdmin = false;

        if(ADMINS_PASSWORDS.includes(pass)) {
            isAdmin = true;
        }

        if(!isAdmin && uname !== pass) {
            setError('Poda mairu, Invalid access.')
            setUname('')
            setPass('')
            return;
        }

        localStorage.setItem('isLoggedIn', true)
        localStorage.setItem('isAdmin', isAdmin)

        dispatch(authAction.login({
            isAdmin: isAdmin,
            isLoggedIn: true
        }));

        navigate('/home')
    }

    return <>
        <div className="mb-3">
            <label className="form-label">Username</label>
            <input type="text" className="form-control" placeholder="Please provide your username" value={uname} onChange={onUnameChange} />
        </div>
        <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" placeholder="Please provide your password" value={pass} onChange={onPassChange} />
        </div>
        {error && error !== '' && <div>
            <span className="text-danger">{error}</span>
        </div>}
        <div className="mt-2 text-center">
            <button className="btn btn-primary w-50" onClick={doLogin}>Login</button>
        </div>
    </>
}

export default LoginForm;