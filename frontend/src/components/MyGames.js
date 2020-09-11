import React, { useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const MyGames = (props) => {
    let [myGames, setMyGames] = useState([])
    useEffect(() => {
        axios.get(`${REACT_APP_SERVER_URL}/api/games/arcade`)
      .then(response => {
        console.log('RESPONSE HERE => ', response);
        setMyGames(response.data);

      })
      .catch(err => console.log('error getting server data \n', err))
    }, [])

    let handleDelete = (id) => {
        console.log(id)
        axios.delete(`${REACT_APP_SERVER_URL}/api/games/delete/${id}`)

    }


    // let mapThemGames = () => {
        let Games1 = myGames.map((g, idx) => {
              // console.log('THiS A G', g)
            if (g.author === props.currentUser.id) {
                return(
                <div key={idx}>
                <h3 className="sub-title">{g.name ? g.name : g.title}</h3>
                <p>{g.gameUrl}</p>
                <p>{g.description !== 'none' ? g.description : 'no description uploaded'}</p>
                <Link to="/profile"><button className="button" onClick={handleDelete(g._id)}>Delete</button></Link>
                </div>
                )
              } else {

              }
            })



    return (
    <div>{Games1}
    <Link to='/profile'><button className="button">go back</button></Link>
    </div>
    )

}

export default MyGames;
