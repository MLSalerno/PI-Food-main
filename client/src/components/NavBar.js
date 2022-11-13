import React from "react";
import { NavLink } from "react-router-dom";
import './NavBar.css'
import logo from '../assets/logo.png'

export default function NavBar() {
    return (
        <div className="container-navbar">
            <div className="logo">
                <img src={logo} alt="Logo de la app" />
            </div>
            <nav>
                <ul className="barra_navegacion">
                    <li><NavLink exact to="/" >Inicio</NavLink></li>
                    <li><NavLink exact to="/recipes" >Busqueda</NavLink></li>
                    <li><NavLink to="/createRecipe" >Añadir Receta</NavLink></li>
                </ul>
            </nav>
        </div>
    )
}