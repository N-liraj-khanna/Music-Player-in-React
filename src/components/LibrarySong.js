import React from "react";
import { audioPlayer, songSelector } from "../util";

const LibrarySong = ({
  songs,
  song,
  setCurrentSong,
  audioRef,
  setIsPlaying,
  setSongs,
  isPlaying,
}) => {
  const selectSongHandler = async (e) => {
    await setCurrentSong(song);

    audioPlayer(isPlaying, audioRef, setIsPlaying);
    songSelector(song, songs, setSongs);
  };

  return (
    <div
      onClick={selectSongHandler}
      className={`library-song ${song.active ? "selected" : ""}`}
    >
      <img src={song.cover} alt={song.name} />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
