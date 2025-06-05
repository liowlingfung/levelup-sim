import './App.css';
import LevelUI from './component/LevelUI';
import { useCallback, useEffect, useRef, useState } from 'react';

import coinSFX from "./assets/SFX/coin.mp3"
import levelSFX from "./assets/SFX/levelup.mp3";
import gameOverSFX from "./assets/SFX/correct.mp3"

function App() {
  const [experience, setExperience] = useState(0)
  const [lastExperienceGained, setLastExperienceGained] = useState(0)
  const [totalExperience, setTotalExperience] = useState(0)
  const [highestExperience, setHighestExperience] = useState(0)
  const [level, setLevel] = useState(1);
  const [highestLevel, setHighestLevel] = useState(1);
  const [levelText, setLevelText] = useState("+XP")


  const audioRef = useRef(new Audio(coinSFX));
  const levelUpRef = useRef(new Audio(levelSFX));
  const gameOverRef = useRef(new Audio(gameOverSFX))

  useEffect(() => {
    if(experience >= 200){
      setLevelText("Level Up!");
    }
    else{
      setLevelText("+XP")
    }
  },[experience])

  function handleGainExperience(){
    const gainedXp = Math.round(Math.random() * 100);
    setLastExperienceGained(gainedXp);
    setTotalExperience((exp) => exp + gainedXp);
    const newExperience = experience + gainedXp;

    if (experience >= 200){
      const nextLevel = level + 1
      setLevel(nextLevel);
      setExperience(0);
      setHighestLevel(prevHighest => Math.max(prevHighest, nextLevel));
      playSound(levelUpRef)
    }
    else if(experience < 200){
      setExperience(newExperience);
      playSound(audioRef);
    }
    else{
      setExperience(0)
    }
  }

  const playSound = useCallback((audio) =>{
    if (audio.current) { // Check if the audio object exists
      audio.current.volume = 0.4;
      audio.current.currentTime = 0; // Reset to start
      audio.current.play().catch(error => {
        console.log("Autoplay prevented or other audio error: ", error);
      });
    }
  }, []); 

  function handleGameOver(){
    playSound(gameOverRef)
    alert(`Congratulations! You have accumulated ${totalExperience}XP over the entire game!!
            \nYou reached Lv. ${level} !! Let's see if you can beat your highest score or not!
      `)
    setHighestExperience(totalExperience);
    setExperience(0);
    setLastExperienceGained(0);
    setLevel(1);
    setLevelText("+XP");
    setTotalExperience(0);
  }
  return (
    <div className="App">
      <div className='main-container'>
        <h1 style={{marginTop:"100px"}}>Solo Clicking Simulator!</h1>
        <p><em><strong>*NOT*</strong>a "touch some grass" simulator</em></p>
        <LevelUI experience={experience} level={level} lastExperienceGained={lastExperienceGained}/>
        <em>
          <p>Experience Gained: {lastExperienceGained}</p>
          <p>Current Total XP: {totalExperience}</p>
        </em>
        <div className='button-group'>
          <button onClick={handleGainExperience}>{levelText}</button>
          <button onClick={handleGameOver}>End Game</button>
        </div>
      </div>
      <div className='highscore-container'>
        <h2>Highest Level : {highestLevel} </h2>
        <h3>Highest XP Gained : {highestExperience}</h3>
      </div>
    </div>
  );
}

export default App;
