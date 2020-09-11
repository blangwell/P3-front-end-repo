import React from 'react';
import { Link } from 'react-router-dom';

const Profile = (props) => {
    console.log('PROFILE PROPZ : ', props)
    const mapThemFaves =
        props.currentUserFaves ? props.currentUserFaves.map((f, idx) => {
            return <div key={idx}><Link to={`/games/${f}`} key={idx}>{f}</Link><br /> </div>
        })
        : <li>Loading</li>


    const userData = props.user ?

    (<div>
        <h1 className="pixel-text">{props.user.name}'s Profile</h1><br />
        <div id="account-info">
            <h2 className="sub-title">Account Info</h2><br />

            <h5 className="sub-title">Username:</h5> 
            <p className="yellow-text">{props.user.name}</p> 
            <h5 className="sub-title">Email:</h5> 
            <p className="yellow-text">{props.user.email}</p> 
            <h5 className="sub-title">Favorites</h5> 
            {mapThemFaves ? mapThemFaves : 'Loading'}
            <h5 className="sub-title">Uploaded Games</h5> 
            {/* <p className="yellow-text">uploaded games go here or link?</p>  */}
            <Link className="links" to="/addgame">Upload a Game </Link>

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
