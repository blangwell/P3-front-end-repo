import React, { useEffect } from 'react';
import axios from 'axios';
import Iframe from 'react-iframe'

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;


const Arcade = (props) => {

  const arcadeGame = () => {
    console.log(props.match.params)
    axios.get(`${REACT_APP_SERVER_URL}/api/games/${props.match.params.id}`)
    .then(response => {
      props.setCurrentGame(response.data)
      
    })
    .catch(err => {console.log(err)})
  }
  
  useEffect(() => {
    arcadeGame()
  }, [])
  
  console.log('CURRENT GAME WAS MANIPULATED ', props.currentGame)
  let handleLoading = 
  props.currentGame ? (
    <div className="cabinet">
      <div className="arcade-marquee">
        <h1 className="pixel-text" id="game-title">{props.currentGame.name ? props.currentGame.name : props.currentGame.title}</h1>
      </div>
      <div className="arcade-screen">
        <Iframe url={props.currentGame.gameUrl}
            className="myClassname"
            display="initial"
            position="relative"
            overflow="hidden" />
      </div>
      <h4>{props.currentGame.description != 'none' ? props.currentGame.description : ''}</h4>
    </div>
  ) : (
    <h3 className="pixel-text">Loading Game</h3>
  )

  const addFavorite = (e) => {    
    e.preventDefault()
    console.log('CURRENT GAME IN STATE : ', props.currentGame)
    // make a call to the database that gets the users info by ID
    axios.post(`${REACT_APP_SERVER_URL}/api/users/favorites/${props.currentUser.id}`,
    {parameters: {
      userId: props.currentUser.id,
      currentGame: props.currentGame,
    }})
    .then(response => {
      console.log('RESPONSE FROM BACK END : ', response)
      axios.get(`${REACT_APP_SERVER_URL}/api/users/profile/${props.currentUser.id}`)
      .then(response => {
        console.log(response)
        props.setCurrentUserFaves(response.data.favedGames)
      })
      .catch(err => console.log(err))
    })
    .catch(err => console.log('SHAME ON YOU'))
  }

  return(
    <div className="arcade-cabinet">
        {handleLoading}
      <div>
        <form>
          <button
          onClick={(e) => addFavorite(e)}
          className="button"
          >
        Add to Favorites
          </button>
        </form><br />
      </div>
    {/* ADD DEPLOYED GAME LINK */}
    </div>
  )
}

export default Arcade;
