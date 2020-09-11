import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;



// onSubmit={handleSubmit}
const GameForm = (props) => {
    let [title, setTitle] = useState('');
    let [gameUrl, setGameUrl] = useState('');
    let [cohort, setCohort] = useState('');
    let [description, setDescription] = useState('');
    let [screenshot, setScreenShot] = useState('');
    let [redirect, setRedirect] = useState(false);

    let author = props.user.id;
    console.log(author)
    const handleTitle = (e) => {
        setTitle(e.target.value);
    }
    const handleUrl = (e) => {
        setGameUrl(e.target.value);
    }
    const handleCohort = (e) => {
        setCohort(e.target.value);
    }
    const handleDescription = (e) => {
        setDescription(e.target.value);
    }
    const handleScreenShot = (e) => {
        setScreenShot(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newGame = { gameUrl, title, description, cohort, screenshot }
        axios.post(`${REACT_APP_SERVER_URL}/api/games/addgame`, newGame)
            .then(response => {
                console.log(response);
                setRedirect(true);
                setTitle('');
                setGameUrl('');
                setDescription('');
                setCohort('');
                setScreenShot('')
                props.history.push('/profile')
            })
            props.setErrorFlash('Make sure to include at lears URL and Title')
            .catch(error => console.log(error));
        }


    console.log(props);
    const userData = props.user ?
    (<div className="row">


        <form onSubmit={handleSubmit}>
        <div className="column">
            <div className="form-group">
                <label htmlFor="title">Whats the name of your game</label>
                <input type="title" name="title" value={title} onChange={handleTitle} className="input" required />
            </div>
            <div className="form-group">
                <label htmlFor="gameUrl">Submit your game URL Below</label>
                <input type="gameUrl" name="gameUrl" value={gameUrl} onChange={handleUrl} className="input" required />
            </div>
            <div className="form-group">
                <label htmlFor="cohort">Whats your Cohort?(Optional)</label>
                <input type="cohort" name="cohort" value={cohort} onChange={handleCohort} className="input" />
            </div>
            <div className="form-group">
                <label htmlFor="description">Tell us something about your game (optional)</label>
                <input type="description" name="description" value={description} onChange={handleDescription} className="input" />
            </div>
            <div className="form-group">
                <label htmlFor="screenshot">Link a Screen Shot of your game (optional)</label>
                <input type="screenshot" name="screenshot" value={screenshot} onChange={handleScreenShot} className="input" />
            </div>
            <button type="submit" className="button">Submit</button>
            <div>{props.errorFlash}</div>
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

export default GameForm;
