// Imports
import React, { useState, useRef } from "react";
import "./styles/app.scss";

// Add Components
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";

// Import Util
import data from "./data";
import {audioPlayer} from "./util";

function App() {
  // States
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryState, setLibraryState] = useState(false);

  const audioRef = useRef(null);

  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });

  const audioTimeUpdateHandler = (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;

    // Calculate Percentage
    const roundedCurrent = Math.round(currentTime);
    const roundedDuration = Math.round(duration);
    const animate = Math.round((roundedCurrent / roundedDuration) * 100);
    setSongInfo({ ...songInfo, currentTime, duration, animationPercentage:animate });
  };
  const songEndedHandler = async () => {
    let currIdx = songs.findIndex((s) => s.id === currentSong.id);
    await setCurrentSong(songs[(currIdx + 1) % songs.length]);
    audioPlayer(isPlaying, audioRef, setIsPlaying);
  };

  return (
    <div className={`App ${libraryState?'library-active':''}`}>
      <Nav libraryState={libraryState} setLibraryState={setLibraryState} />
      <Song currentSong={currentSong} />
      <Player
        currentSong={currentSong}
        setSongs={setSongs}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setSongInfo={setSongInfo}
        songInfo={songInfo}
        setCurrentSong={setCurrentSong}
        songs={songs}
      />
      <Library
        libraryState={libraryState}
        setSongs={setSongs}
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying}
        audioRef={audioRef}
        songs={songs}
        setCurrentSong={setCurrentSong}
      />
      <audio
        onTimeUpdate={audioTimeUpdateHandler}
        onLoadedMetadata={audioTimeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndedHandler}
      ></audio>
    </div>
  );
}

export default App;
