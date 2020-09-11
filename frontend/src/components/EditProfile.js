import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;




// onSubmit={handleSubmit}
const EditProfile = (props) => {
    let [linkedIn, setLinkedIn] = useState('');
    let [github, setGithub] = useState('');
    let [profilePic, setProfilePic] = useState('');
    let [portfolioUrl, setPortfolioUrl] = useState('');
    let [redirect, setRedirect] = useState(false);

    let userId = props.user.id;
    const handleLinkedIn = (e) => {
        setLinkedIn(e.target.value);
    }
    const handleGithub = (e) => {
        setGithub(e.target.value);
    }
    const handleProfilePic = (e) => {
        setProfilePic(e.target.value);
    }
    const handlePortfolioUrl= (e) => {
        setPortfolioUrl(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProfile = { linkedIn, github, profilePic, portfolioUrl }
        axios.put(`${REACT_APP_SERVER_URL}/api/users/editprofile/${userId}`, newProfile)
            .then(response => {
                props.history.push('/profile')

            })
            .catch(error => console.log(error));
        }


    // console.log(props);
    const userData = props.user ?
    (<div className="row">


        <form onSubmit={handleSubmit}>
       <div className="column">
            <div className="form-group author">
                <label htmlFor="linkedIn">Add your LinkedIn URL (optional)</label>
                <input type="linkedIn" name="linkedIn" value={linkedIn} onChange={handleLinkedIn} className="input" />
            </div>
            <div className="form-group author">
                <label htmlFor="github">Add your Github gameUrl (optional)</label>
                <input type="github" name="github" value={github} onChange={handleGithub} className="input" />
            </div>
            <div className="form-group author">
                <label htmlFor="profilePic">Add a profile pic URL (optional)</label>
                <input type="profilePic" name="profilePic" value={profilePic} onChange={handleProfilePic} className="input" />
            </div>
            <div className="form-group author">
                <label htmlFor="portfolioUrl">Add your Portfolio URL (optional)</label>
                <input type="portfolioUrl" name="portfolioUrl" value={portfolioUrl} onChange={handlePortfolioUrl} className="input" />
            </div>
            <button type="submit" className="button">Submit</button>
            </div>
        </form>
    </div>) : <h4>Loading...</h4>

    const errorDiv = () => {
        return (
            <div className="text-center pt-4">
                <h3>Please <Link to="/login">login</Link> to view this page</h3>
            </div>
        );
    };

    return (
        <div>
            { props.user ? userData : errorDiv() }

        </div>
    );

}

export default EditProfile;
