import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import About from './components/About';
import Footer from './components/Footer';
import Error from "./components/Error"
// import Iframe from 'react-iframe';
import Game from './components/Game'
import GameForm from "./components/GameForm"
import './App.css';
import Landing from './components/Landing';
import UserFavorites from './components/UserFavorites';
import GameIndex from './components/GameIndex'
import Arcade from './components/Arcade';
import EditProfile from './components/EditProfile'
import axios from 'axios';
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;
 




const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = localStorage.getItem('jwtToken');
  return <Route {...rest} render={(props) => {
      return user ? <Component {...rest} {...props} /> : <Redirect to="/login" />
    }}
  />;
}

function App() {
  // set state values
  let [currentUser, setCurrentUser] = useState("");
  let [isAuthenticated, setIsAuthenticated] = useState(true);
  let [gamesDisplayed, setGamesDisplayed] = useState([])
  let [currentGame, setCurrentGame] = useState({})
  let [errorFlash, setErrorFlash] = useState("")
  let [currentUserFaves, setCurrentUserFaves] = useState([]);



  useEffect(() => {
    let token;
    if (!localStorage.getItem('jwtToken')) {
      setIsAuthenticated(false);
    } else {
      token = jwt_decode(localStorage.getItem('jwtToken'));
      setAuthToken(localStorage.jwtToken);
      console.log('HERE IS THE TOKEN', token)
      setCurrentUser(token);
      setIsAuthenticated(true);
      axios.get(`${REACT_APP_SERVER_URL}/api/users/profile/${currentUser.id}`)
      .then(response => {
        setCurrentUserFaves(response.data.favedGames)
        // console.log('LINE 54 : ', currentUserFaves)
        console.log('FRONT END USE EFFECT RESPONSE ', response)
     })
     .catch(err => console.log('FRONT END DOT CATCH : ', err))
    }
  }, [currentUser ? currentUser.id : '']);

  const nowCurrentUser = (userData) => {
    console.log('nowCurrentUser is working...');
    setCurrentUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    if (localStorage.getItem('jwtToken')) {
      localStorage.removeItem('jwtToken');
      setCurrentUser(null);
      setIsAuthenticated(false);
    }
  }

  console.log('Current User', currentUser);
  console.log('Authenicated', isAuthenticated);

  return (
    <div>
      <Navbar handleLogout={handleLogout} isAuth={isAuthenticated} />
      <div className="container mt-5">
        <Switch>
          <Route path="/signup" render={ (props) => <Signup {...props} errorFlash={errorFlash} setErrorFlash={setErrorFlash}/>}  />
          <Route
            path="/login"

            render={ (props) => <Login {...props} nowCurrentUser={nowCurrentUser} setIsAuthenticated={setIsAuthenticated}
            user={currentUser} errorFlash={errorFlash} setErrorFlash={setErrorFlash} />}
          />
          <Route path="/about" component={ About } />

          <Route path="/game" component={ Game } errorFlash={errorFlash} setErrorFlash={setErrorFlash} />
          <PrivateRoute path="/profile" component={ Profile } user={currentUser} errorFlash={errorFlash} setErrorFlash={setErrorFlash} />
          <PrivateRoute path="/addgame" component={ GameForm } user={currentUser} errorFlash={errorFlash} setErrorFlash={setErrorFlash} />
          <PrivateRoute path="/editprofile" component= { EditProfile } user={ currentUser } errorFlash={errorFlash} setErrorFlash={setErrorFlash}/>

            
    
          {/* The route below automatically renders landing when we load / */}

          <Route exact path="/"
          render={(props) => <Landing {...props}/>}/>

          <Route path="/arcade"
          render={(props) => <Arcade {...props}
          currentGame={currentGame} setCurrentGame={setCurrentGame}/>}/>

          <Route path="/user/favorites"
          render={(props) => <UserFavorites {...props} currentUser={currentUser}/>}/>

          <Route path="/games/index"
          render={(props) => <GameIndex {...props} currentGame={currentGame} setCurrentGame={setCurrentGame}/>} />
          {/* <Route path="*" component={Error} /> */}

          <Route path="/games/:id"

          render={(props) => <Arcade {...props} currentGame={currentGame} 
          setCurrentGame={setCurrentGame} currentUser={currentUser} 
          setCurrentUser={setCurrentUser} setCurrentUserFaves={setCurrentUserFaves} />} />

          


        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
