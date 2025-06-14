import React from "react";

const PlayerButtons = ({ onPlay, onPause, onNext, onPrev }) => {
    return (
        <div className="fixed-player">
            <button className="btn btn-warning mx-2" onClick={onPrev}>
                ⏮️ Anterior
            </button>
            <button className="btn btn-warning mx-2" onClick={onPlay}>
                ▶️ Reproducir
            </button>
            <button className="btn btn-warning mx-2" onClick={onPause}>
                ⏸️ Pausar
            </button>
            <button className="btn btn-warning mx-2" onClick={onNext}>
                ⏭️ Siguiente
            </button>
        </div>
    );
};

export default PlayerButtons;
