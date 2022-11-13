import React from "react";
import './Etiqueta.css';

export default function Etiqueta({ name, onClose }) {
    return (
        <div className="etiqueta">
            <button onClick={onClose}>X</button>
            <h3 className="etiqueta_text">{name}</h3>
        </div>
    )
}