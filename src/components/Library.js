import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({
  songs,
  setCurrentSong,
  audioRef,
  setIsPlaying,
  setSongs,
  isPlaying,
  libraryState,
}) => {
  return (
    <div className={`library ${libraryState?'active-library':''}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
            setSongs={setSongs}
            setIsPlaying={setIsPlaying}
            audioRef={audioRef}
            song={song}
            setCurrentSong={setCurrentSong}
            songs={songs}
            key={song.id}
            isPlaying={isPlaying}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
