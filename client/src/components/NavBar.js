import React from "react";
import { NavLink } from "react-router-dom";
import './NavBar.css'

export default function NavBar(){
    return(
        <div className="container-navbar">
            <nav className="barra_navegacion">
                <li>
                    <NavLink className="links" exact to="/" >Inicio</NavLink>
                    <NavLink className="links" exact to="/dogs" >Busqueda</NavLink>
                    <NavLink className="links" to="/createDog" >Añadir Perro</NavLink>
                </li>
            </nav>
        </div>
    )
}