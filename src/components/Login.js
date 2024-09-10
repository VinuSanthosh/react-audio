import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AccountContext from '../Context/AccountContext'
import { AuthContext } from '../Context/AuthContext';

function Login() {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { authenticate } = useContext(AccountContext);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        authenticate(email, password).then(data => {
            console.log("Login Success :>> ", data.accessToken.jwtToken);
            localStorage.setItem('token', data.accessToken.jwtToken);
            login()
            navigate('/home')
        }).catch(err => {
            console.log("Failed to Authenticate :>> ", err.message);
        })
    }

    return (
        <>
            <div className='col-md-4 text-center my-3 margin'>
                <h3>Login</h3>
                <form className='my-3' id='login-form' onSubmit={handleLogin}>
                    <div className='input-group col-md-4 my-4'>
                        <div className="input-group flex-nowrap">
                            <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} className="form-control" placeholder="Email" aria-label="Email" aria-describedby="addon-wrapping" />
                        </div>
                    </div>
                    <div className='input-group col-md-4 my-4'>
                        <div className="input-group flex-nowrap">
                            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="form-control" placeholder="Password" aria-label="Password" aria-describedby="addon-wrapping" />
                        </div>
                    </div>
                    <div className='col-12'>
                        <button type="submit" className="btn btn-primary my-3">Login</button>
                        <button type="button" className="btn btn-secondary my-3 mx-3">Cancel</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login
