import React from 'react';
import Iframe from 'react-iframe'

// this could become a parent to GameIndex and Favorites
// we could pass state down from here
const Game = (props) => {
    return (
        <div className="arcade">
        <h2>Revenge of the Flower</h2>
        <Iframe url={"https://mgustavob.github.io/Revenge-of-the-Flower/"}
            id="myId"
            className="myClassname"
            display="initial"
            position="relative"
            overflow="hidden" />

    </div>
    )
}

export default Game
