import React from 'react';

const CabinetScreen = (props) => {
  return(
    <div>
      {/* here we will display the game and the game list */}
      <h1>Cabinet Screen</h1>
      <p>{props.stuff}</p>
    </div>
  )
}

export default CabinetScreen;