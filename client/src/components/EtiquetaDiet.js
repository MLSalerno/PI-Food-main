import React from "react";
import './EtiquetaDiet.css';

export default function EtiquetaDiet({diet, onClose}) {
    return (
        <div className="etiqueta">
            <button onClick={onClose}>x</button>
            <h3>{diet}</h3>        
        </div>
    )
}