import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Redirect, Link} from 'react-router-dom'
import Arcade from './Arcade'
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;


const GameIndex = (props) => {

  const handlePlayGame = (g) => {
    // send id to url parameter space
    // use that id to render the specific game we want to pla
    props.setCurrentGame(g)
    console.log('HERE BE THE PROPS', props)
  }

  let mapThemGames = () => {
    return props.currentGame.map((g, idx) => {
      return (
        <div key={idx}
        >
        <Link to={`/games/${g._id}`} style={{textDecoration: 'none'}}>
        <h3 className="pixel-text link">{g.name ? g.name : g.title}</h3>
        </Link>
        <a href={g.gameUrl} className="sub-title link">Link to Deployed App</a>
        <p>{g.description !== 'none' ? g.description : ''}</p><br />
        </div>
      )
    })
  }


  let decideGames =
    props.currentGame.length > 0 ? (
      <div>
        <h1 className="pixel-text">GArcade</h1><br />
        { mapThemGames() }
      </div>
    ) : (
      <div id="loading">
        <h3 className="pixel-text">
          Loading the Arcade
          <img className="pacman-gif" src="https://i.gifer.com/origin/f2/f2726893541a7446b988ba7743c5296c_w200.gif" />
          ...
        </h3>
      </div>
      
    )

  useEffect(() => {
    axios.get(`${REACT_APP_SERVER_URL}/api/games/arcade`)
    .then(response => {
      // console.log('RESPONSE HERE => ', response);
      props.setCurrentGame(response.data);
    })
    .catch(err => console.log('error getting server data \n', err))
  }, [])


  // we need to wait for state to set and, once it does
  // we need to display the state's game information
  // will this be promise based? probably?

  return (

    <div>
      {decideGames}
    </div>
  )
}

export default GameIndex;
