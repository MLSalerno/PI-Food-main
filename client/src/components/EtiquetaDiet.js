import React from "react";
import './EtiquetaDiet.css';

export default function EtiquetaDiet({ diet, onClose }) {
    return (
        <div className="etiqueta">
            <button onClick={onClose}>X</button>
            <h3 className="etiqueta_text">{diet}</h3>
        </div>
    )
}