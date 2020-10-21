import React from 'react';
import CabinetTop from './CabinetTop';
import CabinetScreen from './CabinetScreen';
import CabinetBottom from './CabinetBottom';

const Arcade = (props) => {
  return(
    <div>
      <h1>This the Game Index container</h1>
      <CabinetTop />
      <CabinetScreen />
      <CabinetBottom />
    </div>
  )
}

export default Arcade;