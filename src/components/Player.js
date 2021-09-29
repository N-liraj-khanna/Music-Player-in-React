import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { audioPlayer, songSelector } from "../util";
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  isPlaying,
  setIsPlaying,
  audioRef,
  songInfo,
  setSongInfo,
  setCurrentSong,
  songs,
  setSongs,
  currentSong,
}) => {
  const nextPrevButtonHandler = async (direction) => {
    let currIdx = songs.findIndex((s) => s.id === currentSong.id);
    if (direction === "next") {
      await setCurrentSong(songs[(currIdx + 1) % songs.length]);
      songSelector(songs[(currIdx + 1) % songs.length], songs, setSongs);
    } else {
      await setCurrentSong(songs[(currIdx === 0 ? songs.length : currIdx) - 1]);
      songSelector(
        songs[(currIdx === 0 ? songs.length : currIdx) - 1],
        songs,
        setSongs
      );
    }
    audioPlayer(isPlaying, audioRef, setIsPlaying);
  };

  const pauseButtonHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  // Time state
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };
  const inputDragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  // Add the styles
  const trackAnimate = {
    transform: `translate(${songInfo.animationPercentage}%)`,
  };

  return (
    <div className="player-container">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
          }}
          className="track"
        >
          <input
            min="0"
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            type="range"
            onChange={inputDragHandler}
          />
          <div style={trackAnimate} className="animate-track"></div>
        </div>
        <p>{getTime(songInfo.duration || 0)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
          onClick={() => {
            nextPrevButtonHandler("prev");
          }}
        />
        <FontAwesomeIcon
          onClick={pauseButtonHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
          onClick={() => {
            nextPrevButtonHandler("next");
          }}
        />
      </div>
    </div>
  );
};
export default Player;
