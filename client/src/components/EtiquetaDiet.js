import React from "react";
import './EtiquetaTemp.css';

export default function EtiquetaTemp({temperament, onClose}) {
    return (
        <div className="etiqueta">
            <button onClick={onClose}>x</button>
            <h3>{temperament}</h3>        
        </div>
    )
}