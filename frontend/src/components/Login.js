import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import { Redirect } from 'react-router-dom';
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Login = (props) => {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');

    let handleEmail = (e) => {
        setEmail(e.target.value);
    }

    let handlePassword = (e) => {
        setPassword(e.target.value);
    }

    let handleSubmit = (e) => {
        e.preventDefault();

        const userData = { email, password };

        axios.post(`${REACT_APP_SERVER_URL}/api/users/login`, userData)
        .then(response => {
            const { token } = response.data;
            // Save token to localStorage
            localStorage.setItem('jwtToken', token);
            // Set token to auth header
            setAuthToken(token);
            // Decode token to get the user data
            const decoded = jwt_decode(token);
            // Set current user
            props.nowCurrentUser(decoded);
            props.setErrorFlash("")

        })
        .catch(error => {
            props.setErrorFlash("Error validating: Makes sure email and password are correct")
            console.log(`Login error`, error)});
        }
        console.log(props.errorFlash)
    let showError = () =>{
        if (props.errorFlash===""){
            return null
        } else {
            return <div className="error">{props.errorFlash}</div>
        }
    }
    if (props.user) return <Redirect to="/profile" user={props.user} />;

    return (

                <div className="loginForm">

                    <h2 className="formLabel">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label><br />
                            <input type="text" name="email" value={email} onChange={handleEmail} className="input" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label><br />
                            <input type="password" name="password" value={password} onChange={handlePassword} className="input" required />
                        </div>
                        <button type="submit" className="button">Submit</button>
                        <div>{props.errorFlash}</div>
                    </form>
                </div>

    );
}

export default Login;
