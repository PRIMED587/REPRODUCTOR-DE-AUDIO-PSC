import React, { useEffect, useRef, useState } from "react";
import PlayerButtons from "./PlayerButtons";

const PlayerBody = () => {
  const [lista, setLista] = useState([]);
  const [cancionActual, setCancionActual] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    fetch("https://playground.4geeks.com/sound/songs")
      .then((res) => res.json())
      .then((data) => setLista(data.songs))
      .catch((error) => console.log(error));
  }, []);

  const reproducirCancion = (index) => {
    if (!lista.length) return;
    const song = lista[index];
    const rutaCompleta = "https://playground.4geeks.com" + song.url;
    if (audioRef.current) {
      audioRef.current.src = rutaCompleta;
      audioRef.current.load(); 
      audioRef.current.play();
      setCancionActual(index);
      setIsPlaying(true);
    }
  };

  const handlePlay = () => {
    if (!lista.length) return;
    if (!isPlaying) {
      
      reproducirCancion(cancionActual || 0);
    } else {
      audioRef.current.play();
    }
    setIsPlaying(true);
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleNext = () => {
    if (!lista.length) return;
    const nextIndex = (cancionActual + 1) % lista.length;
    reproducirCancion(nextIndex);
  };

  const handlePrev = () => {
    if (!lista.length) return;
    const prevIndex = (cancionActual - 1 + lista.length) % lista.length;
    reproducirCancion(prevIndex);
  };

  return (
    <div className="ListaCancion">
      <div className="list-group">
        {lista.map((cancion, id) => (
          <button
            key={id}
            type="button"
            onClick={() => reproducirCancion(id)}
            className="list-group-item list-group-item-action"
          >
            🎵 {cancion.name}
          </button>
        ))}
      </div>

      <audio ref={audioRef} className="d-none" />

      <PlayerButtons
        onPlay={handlePlay}
        onPause={handlePause}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
};

export default PlayerBody;
