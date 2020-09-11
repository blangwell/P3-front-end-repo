import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Profile = (props) => {
    let [myGames, setMyGames] = useState([])
    let [myFaves, setMyFaves] = useState([])
    useEffect(() => {
        axios.get(`${REACT_APP_SERVER_URL}/api/games/arcade`)
      .then(response => {
        console.log('RESPONSE HERE => ', response);
        setMyGames(response.data);

      })
      .catch(err => console.log('error getting server data \n', err))
    }, [])

    let Game1 = (id) =>{
        console.log(id)
        myGames.map((g, idx)=>{
            if(g._id === id){
                // console.log(g.title ? g.title : g.name)
                return(
                    <div>
                        <div key={idx}>{ g.title ? g.title : g.name }</div>
                    </div>
                    )
            } else {
                return <></>
            }
        })
    }

        const mapThemFaves =
            props.currentUserFaves ? props.currentUserFaves.map((f, idx) => {
                console.log(f)
                const gameList = Game1(f)
                return <div key={idx}><Link to={`/games/${f}`} key={idx}>{gameList}</Link><br /> </div>
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
            <Link to="/EditProfile"><h5 className="sub-title">Edit Profile</h5> </Link>
            <Link to={`/MyGames/${props.user.id}`}><h5 className="sub-title">Delete My games</h5> </Link>
            {/* <h5 className="sub-title">Uploaded Games</h5> */}
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
