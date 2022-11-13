import React from "react";
import './paginado.css'

export default function Paginado({ recipesPerPage, recipes, paginado }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(recipes / recipesPerPage); i++) { //cantidad de elementos totales, dividido limite de elementos por pagina
        pageNumbers.push(i);
    }

    return (
        <div className="paginado_container">
            <nav>
                <ul className="paginado_container_ul">
                    {pageNumbers && pageNumbers.map(number => (
                        <li onClick={() => paginado(number)} key={number}>
                            <button type="button">{number}</button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}