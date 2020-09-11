import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Signup = (props) => {
    let [name, setName] = useState('');
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('');
    let [confirmPassword, setConfirmPassword] = useState('');
    let [redirect, setRedirect] = useState(false);

    const handleName = (e) => {
        setName(e.target.value);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password === confirmPassword) {
            const newUser = { name, email, password }

            axios.post(`${REACT_APP_SERVER_URL}/api/users/register`, newUser)
            .then(response => {
                console.log(response);
                setRedirect(true);
                props.setErrorFlash("")
            })
            .catch(error => {
                props.setErrorFlash("Could not create a User, make sure password match and email hasnt been use")
                console.log(error)
            });
        }
    }

    if (redirect) return <Redirect to="/login" />

    return (

                <div className="signupForm">
                    <h2 className="formLabel">Signup</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label><br/>
                            <input type="text" name="name" value={name} onChange={handleName}  className="input"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label><br/>
                            <input type="email" name="email" value={email} onChange={handleEmail}  className="input"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label><br/>
                            <input type="password" name="password" value={password} onChange={handlePassword}  className="input"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label><br/>
                            <input type="password" name="confirmPassword" value={confirmPassword} onChange={handleConfirmPassword}  className="input"/>
                        </div>
                        <button type="submit" className="button">Submit</button>
                        <div>{props.errorFlash}</div>
                    </form>
                </div>

    );

}

export default Signup;
