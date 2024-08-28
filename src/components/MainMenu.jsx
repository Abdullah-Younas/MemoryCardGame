import React, { useState, useRef, useEffect } from 'react';
import videoBG from '../assets/rot.mp4';
import RocketIcon from './RocketIcon';
import BoltIcon from './BoltIcon';
import BugAntIcon from './BugAntIcon';
import CakeIcon from './CakeIcon';
import CloudIcon from './CloudIcon';
import CogIcon from './CogIcon';
import FireIcon from './FireIcon';
import KeyIcon from './KeyIcon';
import LightBulbIcon from './LightBulbIcon';
import MoonIcon from './MoonIcon';
import PuzzlePieceIcon from './PuzzlePieceIcon';
import ScissorsIcon from './ScissorsIcon';
import TruckIcon from './TruckIcon';
import WrenchIcon from './WrenchIcon';
import musicBG from '../assets/MUSIC.wav';

const icons = [
  RocketIcon,
  BoltIcon,
  BugAntIcon,
  CakeIcon,
  CloudIcon,
  CogIcon,
  FireIcon,
  KeyIcon,
  LightBulbIcon,
  MoonIcon,
  PuzzlePieceIcon,
  ScissorsIcon,
  TruckIcon,
  WrenchIcon,
];

const MainMenu = () => {
  const [playingm, setplayingm] = useState(false);
  const audioRef = useRef(new Audio(musicBG));
  const [maindisplay, setmaindisplay] = useState("block");
  const [gamescreenhard, sethard] = useState("none");
  const [cardvalue, setcardvalue] = useState(
    Array.from({ length: 14 }, (_, i) => [i, i]).flat().sort(() => Math.random() - 0.5)
  );
  const [selectedcard, setselectedcard] = useState([]);
  const [visibility, setVisibility] = useState(Array(28).fill(false));
  const [turns, setturns] = useState(30);
  const [gameComplete, setGameComplete] = useState(false);

  useEffect(() => {
    // When selected cards change, check if they match
    if (selectedcard.length === 2) {
      const [firstIndex, secondIndex] = selectedcard;
      if (cardvalue[firstIndex] === cardvalue[secondIndex]) {
        // Cards match
        console.log("Same!!!");
        setVisibility(prev => {
          const newVisibility = [...prev];
          newVisibility[firstIndex] = true;
          newVisibility[secondIndex] = true;
          return newVisibility;
        });
        setselectedcard([]);
      } else {
        // Cards don't match
        console.log("Try again!!!");
        setTimeout(() => {
          setVisibility(prev => {
            const newVisibility = [...prev];
            newVisibility[firstIndex] = false;
            newVisibility[secondIndex] = false;
            return newVisibility;
          });
          setselectedcard([]);
        }, 1000); // 1-second delay
      }
      setturns(prev => prev - 1);
    }

    // Check if the game is complete
    if (visibility.every(visible => visible)) {
      setGameComplete(true);
    }
  }, [selectedcard, cardvalue]);

  const clickcard = (index) => {
    if (turns > 0 && !visibility[index] && selectedcard.length < 2) {
      setVisibility(prev => {
        const newVisibility = [...prev];
        newVisibility[index] = true; // Set visibility to true when the card is clicked
        return newVisibility;
      });
      setselectedcard(prev => [...prev, index]);
    }
  };

  const playaudio = () => {
    if (!playingm) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset the audio to the beginning
    }
    setplayingm(!playingm);
  };

  const showgamescreenhard = () => {
    // Toggle screen display
    sethard(gamescreenhard === "none" ? "flex" : "none");
    setmaindisplay(gamescreenhard === "flex" ? "flex" : "none");
    console.log("hard loaded.");
    console.log(cardvalue);  // Log the shuffled cards to verify
  };

  function refreshPage(){
    window.location.reload(false);
  }

  return (
    <>
      <div className="overlay"></div>
      <div className="main" style={{display: maindisplay}}>
        <div className="ui">
          <h1>MEMORY</h1>
          <button onClick={showgamescreenhard}>PLAY</button>
          <button onClick={playaudio}>MUSIC</button>
        </div>
      </div>
      <div className='gamescreen1v1' style={{display: gamescreenhard}}>
        <div className="cardscontainer">
          {cardvalue.map((card, index) => {
            const Icon = icons[card]; // Get the appropriate icon based on the card value
            return (
              <div className="pcards" id={`pch${index}`} key={index} onClick={() => clickcard(index)}>
                <Icon color={'lightblue'} style={{display: visibility[index] ? 'flex' : 'none'}}/>
              </div>
            );
          })}
        </div>
        <button onClick={showgamescreenhard}>BACK</button>
        <h2 className='counter'>MOVES REMAINING: {turns}</h2>
        {gameComplete && <div className='gamecomplete'>
          <h1>Congratulations! You have solved the game!</h1>
          <button onClick={refreshPage}>Return</button>
        </div>}
      </div>
    </>
  );
};

// Music by <a href="https://pixabay.com/users/boadrius-43674024/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=206006">Zdeněk Jeřábek</a> from <a href="https://pixabay.com/music//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=206006">Pixabay</a>
export default MainMenu;
