export const songSelector = (song, songs, setSongs)=>{

  const newSongs=songs.map((state)=>{
    if(song.id===state.id){
      return{
        ...state,
        active:true
      }
    }else{
      return {
        ...state,
        active:false
      }
    }
  })
  setSongs(newSongs);
}

export const audioPlayer = (isPlaying, audioRef, setIsPlaying)=>{
  if(isPlaying) {
    audioRef.current.play();
    setIsPlaying(true)
  }else{
    audioRef.current.pause();
    setIsPlaying(false);
  }
}