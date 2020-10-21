import React from 'react';

const UserFavorites = (props) => {
  return(
    <div>
    {/* Remove the following ternary once private to logged in users */}
      {
        props.currentUser ?
        <h1>{props.currentUser.name}'s Favorites</h1>
        : <h1>Favorites</h1>
      }
      {/* here we will currentUser.faveGames.map() */}
    </div>
  )
}

export default UserFavorites