import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import IntroContainer from './introContainer.jsx';
import OutroContainer from './outroContainer.jsx';
import script from './script.js';
import formValues from './formValues.js';

const App = () => {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ constStat, setConstStat ] = useState(0);
  const [ dexStat, setDexStat ] = useState(0);
  const [ strengthStat, setStrengthStat ] = useState(0);
  const [ intelStat, setIntelStat ] = useState(0);
  const [ charStat, setCharStat ] = useState(0);
  const [ classRole, setClassRole ] = useState(null);
  const [ raceRole, setRaceRole ] = useState(null);
  const [ alignRole, setAlignRole ] = useState(null);
  const [ nameRole, setNameRole ] = useState('');
  const [ backgroundRole, setBackgroundRole ] = useState(null);
  const [ isStageOneDone, setStageOneDone ] = useState(false);
  const [ isStageTwoDone, setStageTwoDone ] = useState(false);
  const [ isStageThreeDone, setStageThreeDone ] = useState(false);
  const [ isStageFourDone, setStageFourDone ] = useState(false);
  const [ isStageFiveDone, setStageFiveDone ] = useState(false);
  const [ isStageSixDone, setStageSixDone ] = useState(false);

  // role 4d6 and pick highest 3 values
  const getRollValue = () => {
    let values = [];
    for (let i = 0; i < 4; i++) {
      values.push(Math.floor((Math.random()*6))+1)
    }
    const lowestValue = Math.min(...values);
    const indexOfLowest = values.indexOf(lowestValue);
    values.splice(indexOfLowest, 1);

    return values.reduce((acc, init) => acc + init, 0);

  }

  //script results
  let PartOneA = `Oh a ${classRole}, a most interesting class! The guard at the Salty Spitoon is most impressed at your ease of handling the door thanks to your Strength of ${strengthStat}.`;

  let PartOneB = `Oh a ${classRole}, a most interesting class! As you push all your might at the doors you're Strength of ${strengthStat} is no match and the guard laughs and points you in the direction of Weenie Hut Jr, but wait! You manage to enter when another more muscular adventurer opens the door for you as the guard looks the other way MAGICALLY. `;

  return (
    <React.Fragment>
      {
        (isStageOneDone ?
          <OutroContainer
          script={strengthStat > 10 ? PartOneA : PartOneB}
          stat={strengthStat}
          classRole={classRole}
          />
          : <IntroContainer
          script={script.partOne}
          formValues={formValues.classes}
          form={'Class'}
          stat={'Strength'}
          rollFunc={getRollValue}
          setStat={setStrengthStat}
          setRole={setClassRole}
          setStageDone={setStageOneDone}
          />)
      }
      <br/>
    <div>
      test2
    </div>
    </React.Fragment>
  )
}

export default App;