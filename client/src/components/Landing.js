import React from "react";
import { Link } from "react-router-dom";
import './Landing.css'

export default function Landing() {
    return (
        <div className="fondo">
            <Link to={"/recipes"} className="button">
                Acceder
            </Link>
        </div>
    )
}