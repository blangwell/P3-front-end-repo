import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Profile = (props) => {


    
    console.log('PROFILE PROPZ : ', props)
    const mapThemFaves =
        props.currentUserFaves ? props.currentUserFaves.map((f, idx) => {
            return <div key={idx}><Link to={`/games/${f}`} key={idx} className="pixel-text">{f}</Link><br /> </div>
        })
        : <h4 className="pixel-text">Loading</h4>




    const userData = props.user ?

    (<div>
        <h1 className="pixel-text">{props.user.name}'s Profile</h1><br />
        <div id="account-info">
            <h2 className="sub-title">Account Info</h2><br />
            <h5 className="sub-title">Username:</h5> 
            <p className="pixel-text">{props.user.name}</p> 
            <h5 className="sub-title">Email:</h5> 
            <p className="pixel-text">{props.user.email}</p> 
            <h5 className="sub-title">Favorites</h5> 
            {mapThemFaves ? mapThemFaves : 'Loading'}<br />

             <Link to="/EditProfile"><h5 className="sub-title">Edit Profile</h5> </Link>
            <Link to={`/MyGames/${props.user.id}`}><h5 className="sub-title">Delete My games</h5> </Link>
           
            <Link className="pixel-text link" to="/addgame">Upload a Game </Link>

        </div>


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
            {/* THIS WILL LIVE IN CABINET TOP */}
            { props.user ? userData : errorDiv() }

        </div>
    );

}

export default Profile;
