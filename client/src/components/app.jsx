import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import IntroContainer from './introContainer.jsx';
import OutroContainer from './outroContainer.jsx';
import script from './script.js';
import formValues from './formValues.js';
import audio from '../../dist/LEZ.mp3';

const AppStyle = styled.div`
  background-color: black;
  color: green;
  font-family: 'decterm';
  font-size: large;
`

const App = () => {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ constStat, setConstStat ] = useState(0);
  const [ dexStat, setDexStat ] = useState(0);
  const [ strengthStat, setStrengthStat ] = useState(0);
  const [ intelStat, setIntelStat ] = useState(0);
  const [ charStat, setCharStat ] = useState(0);
  const [ wisdomStat, setWisdomStat ] = useState(0);
  const [ classRole, setClassRole ] = useState(null);
  const [ raceRole, setRaceRole ] = useState(null);
  const [ alignRole, setAlignRole ] = useState('');
  const [ nameRole, setNameRole ] = useState('');
  const [ backgroundRole, setBackgroundRole ] = useState(null);
  const [ isStageOneDone, setStageOneDone ] = useState(false);
  const [ isStageTwoDone, setStageTwoDone ] = useState(false);
  const [ isStageThreeDone, setStageThreeDone ] = useState(false);
  const [ isStageFourDone, setStageFourDone ] = useState(false);
  const [ isStageFiveDone, setStageFiveDone ] = useState(false);
  const [ isStageSixDone, setStageSixDone ] = useState(false);
  const [ scriptAdd, setScriptAdd ] = useState(false);
  const [ characterData, setCharacterData ] =useState([]);

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

  // Converts base stat to Modifier value
  const getModValue = (stat) => {
    return Math.floor((stat - 10) / 2 )
  }
  // Add Modifier value to base stat by race
  const addRaceModifier = (race) => {
    if(race === 'Dwarf') {
      setStrengthStat(strengthStat + 2)
    } else if(race === 'Elf'){
      setDexStat(dexStat + 2)
    } else if(race === 'Halfling'){
      setDexStat(dexStat + 2)
    } else if(race === 'Human'){
      setDexStat(dexStat+1)
      setIntelStat(intelStat+1)
      setStrengthStat(strengthStat+1)
      setWisdomStat(wisdomStat+1)
      setConstStat(constStat+1)
      setCharStat(charStat+1)
    } else if(race === 'Dragonborn'){
      setStrengthStat(strengthStat+2)
      setCharStat(charStat+1)
    } else if(race === 'Half-Elf'){
      setStrengthStat(strengthStat+2)
      setDexStat(dexStat+1)
      setIntelStat(intelStat+1)
    } else if(race === 'Half-Orc'){
      setStrengthStat(strengthStat+2)
      setConstStat(constStat+1)
    } else if(race === 'Tiefling'){
      setIntelStat(intelStat+1)
      setCharStat(charStat+2)
    } else if(race === 'Gnome'){
      setIntelStat(intelStat+2)
    }
  }
  // Axios Get request on Roles
  const getApiData = async (role, value) => {
    const rawData = await axios.get(`/${role}/${value}`);
    setCharacterData([...characterData, rawData.data]);
  }

  //script results
  let PartOneA = `Oh a ${classRole}, a most interesting class! The guard at the Salty Spitoon is most impressed at your ease of handling the door thanks to your Strength of ${strengthStat}. You enter the Salty Spitoon`;

  let PartOneB = `Oh a ${classRole}, a most interesting class! As you push all your might at the doors you're Strength of ${strengthStat} is no match and the guard laughs and points you in the direction of Weenie Hut Jr, but wait! You manage to enter when another more muscular adventurer opens the door for you as the guard looks the other way MAGICALLY. `;

  let PartTwoA = `In your years of experience and Wisdom of ${wisdomStat} you drink just enough to see a clear image of who you are in the mirror. A proud and good looking ${raceRole}. The barkeep is impressed.`;

  let PartTwoB = `Clearly with a Wisdom of ${wisdomStat} you dont your way around liquer. You look into the mirror, but you cant seem to tell if your a ${raceRole} or an abstract work of art. You guess and go with the former. The barkeep is cutting you off.`;

  let PartThreeA = `"My name is ${nameRole}!" you exclaim! The tavern pauses and all raise their ale to you Adventurer! You ooze confidence with a Charisma of ${charStat}. So much so that you are the center of the room if only for a brief momemnt. The barkeep hands you his finest ale. Just then a plump noble sits besides you and rudely tips over your ale with their elbow. He scoffs and flips you a meager coin from their heavy shiney coin purse.`

  let PartThreeB = `"My name... *cough* ${nameRole}" you stumble. The tavern takes no notice at your name. You quietly sit with a Charisma of ${charStat}.The barkeep smirks and hands you some water for your throat. Just then a plump noble sits besides you and rudely tips over your water with their elbow. He scoffs and flips you a meager coin from their heavy shiney coin purse.`

  let PartFourA = `You make quick and clean work of the plump coin purse with Dexterity of ${dexStat}! `

  let PartFourB = `Your hands slip with Dexterity of ${dexStat} and somehow grab the lint inside the purse. `

  let PartFourC = `Of course, however, your Good willed intentions merely was testing the security of the purse and put your spoils back. Not without a Mage taking notice and walking towards you!`

  let PartFourD = `Of course, however, your Nuetral willed intentions merely was testing the security of the purse and put half your spoils back. Not without a Mage taking notice and walking towards you!`

  let PartFourE = `Of course, however, your Evil willed intentions merely was testing the security of the purse,but take just a bit more for your service. Not without a Mage taking notice and walking towards you!`

  let PartFiveA = `Clearly your ${backgroundRole} history has given you enough Intelligence of ${intelStat} to not only decipher the strange symbols in the tome, but also perform its incantation as well! A giant portal opens up in the middle of the tavern and with it unleashes the unspeakable horror! The patrons scream and flee with terror as it unleash its furry on all those around. The Mage runs away screaming "By the Nine! What have you done?!"`

  let PartFiveB = `Even with you ${backgroundRole} history you fumble around the strange squiggles with yout Intelligence of ${intelStat}. The Mage laughs at your effort as you speak random gibberish. However, with just enough luck a strange giant portal opens up in the middle of the tavern and with it unleashes the unspeakable horror! The patrons scream and flee with terror as it unleash its furry on all those around. The Mage runs away screaming "By the Nine! You buffon, you doomed us all!"`

  let PartSixA = `The creature from another world throws you around like a ragdoll then quickly becomes bored and leaves. Just like you it too has its own adventure now that you brought it to this world. You survive with a Constitution of ${constStat}! Congratulations Adventurer! You are now ready to play your created character in Dugeons and Dragons! Venture forth and have fun!`

  let PartSixB = `The creature from another world breaks just about everybone in your body. With a Constitution of ${constStat} its not hard to see why. Just like you it too has its own adventure now that you brought it to this world. It leaves you alone all broken.However! By some MAGIC your bones are healed and now are ready with your new created character in Dugeons and Dragons! Venture forth and have fun!`

  // useEffects
  useEffect(() => {
    if(alignRole.includes("Good")) {
      setScriptAdd(PartFourC)
    } else if(alignRole.includes("Evil")){
      setScriptAdd(PartFourE)
    } else if(alignRole) {
      setScriptAdd(PartFourD)
    }
  },[alignRole])

  useEffect(() => {
    addRaceModifier(raceRole);
  },[raceRole])

  return (
    <AppStyle>
      <audio
        useref="audio_tag"
        controls={true}
        loop={true}
        autoPlay={true}>
        <source type="audio/mp3" src={audio} />
      </audio>
      <br/>
      {
        (isStageOneDone ?
          <OutroContainer
          script={strengthStat > 10 ? PartOneA : PartOneB}
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
          getApiData={getApiData}
          />)
      }
      <br/>
    {(isStageTwoDone ?
          <OutroContainer
          script={wisdomStat > 10 ? PartTwoA : PartTwoB}
          />
          : <IntroContainer
          script={script.partTwo}
          formValues={formValues.races}
          form={'Race'}
          stat={'Wisdom'}
          rollFunc={getRollValue}
          setStat={setWisdomStat}
          setRole={setRaceRole}
          setStageDone={setStageTwoDone}
          getApiData={getApiData}
          />)}
      <br/>
    {(isStageThreeDone ?
          <OutroContainer
          script={charStat > 10 ? PartThreeA : PartThreeB}
          />
          : <IntroContainer
          script={script.partThree}
          formValues={[]}
          form={'Name'}
          stat={'Charisma'}
          rollFunc={getRollValue}
          setStat={setCharStat}
          setRole={setNameRole}
          setStageDone={setStageThreeDone}
          />)}
      <br/>
    {(isStageFourDone && alignRole ?
          <OutroContainer
          script={dexStat > 10 ? PartFourA + scriptAdd: PartFourB + scriptAdd}
          />
          : <IntroContainer
          script={script.partFour}
          formValues={formValues.alignments}
          form={'Alignments'}
          stat={'Dexterity'}
          rollFunc={getRollValue}
          setStat={setDexStat}
          setRole={setAlignRole}
          setStageDone={setStageFourDone}
          />)}
      <br/>
    {(isStageFiveDone ?
          <OutroContainer
          script={intelStat > 10 ? PartFiveA : PartFiveB}
          />
          : <IntroContainer
          script={script.partThree}
          formValues={formValues.backgrounds}
          form={'Backgrounds'}
          stat={'Intelligence'}
          rollFunc={getRollValue}
          setStat={setIntelStat}
          setRole={setBackgroundRole}
          setStageDone={setStageFiveDone}
          />)}
      <br/>
    {(isStageSixDone ?
          <OutroContainer
          script={constStat > 10 ? PartSixA : PartSixB}
          />
          : <IntroContainer
          script={script.partSix}
          formValues={false}
          stat={'Constitution'}
          rollFunc={getRollValue}
          setStat={setConstStat}
          setStageDone={setStageSixDone}
          />)}
      <br/>
      {<AppStyle>
        <h2>Character Sheet</h2>
        <h3>Character Name: {nameRole}</h3>
        <h3>Level 1</h3>
        <h3>Class: {classRole}</h3>
        <h3>Race: {raceRole}</h3>
        <h3>Alignment: {alignRole}</h3>
        <h3>Background: {backgroundRole}</h3>
        <h3>Strength:{strengthStat} MOD:{getModValue(strengthStat)}</h3>
        <h3>Wisdom:{wisdomStat} MOD:{getModValue(wisdomStat)}</h3>
        <h3>Charisma:{charStat} MOD:{getModValue(charStat)}</h3>
        <h3>Dexterity:{dexStat} MOD:{getModValue(dexStat)}</h3>
        <h3>Intelligence:{intelStat} MOD:{getModValue(intelStat)}</h3>
        <h3>Constitution:{constStat} MOD:{getModValue(constStat)}</h3>
        <h3>Proficiencies</h3>
        {console.log(characterData)}
        {characterData.length > 0 ? characterData[0]["proficiencies"].map(entry => {
          return <h2>{entry.name}</h2>
        })
        : ''}
        <h3>Starting Equipment</h3>
        {console.log(characterData)}
        {characterData.length > 0 ? characterData[0]["starting_equipment"].map(entry => {
          return <h2>{entry.equipment.name} -Quantity{entry.quantity}</h2>
        })
        : ''}
        <h3>Equipment Choice</h3>
        {characterData.length > 0 ?
        characterData[0]["starting_equipment_options"].map(entry => {
          return(
            <div>
              <h2>Choose{entry.choose}</h2>
              {entry.from.map(inner => {
                if(inner["equipment_option"] || inner["equipment_category"]) {
                  return
                } else if(inner["0"]){
                  return (
                    <div>
                      <h2>{inner["0"].equipment.name} -Quantity{inner["0"].quantity}</h2>
                    </div>
                  )
                } else {
                  return <h2>{inner.equipment.name} -Quantity{inner.quantity}</h2>
                }
              })}
            </div>
          )
        })
        : ''}
      </AppStyle>}
    </AppStyle>
  )
} //entry.from[0].equipment.name

export default App;