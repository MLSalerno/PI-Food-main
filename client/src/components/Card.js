import React from "react";
import { Link } from "react-router-dom";
import './card.css'

export default function Card(props) {
    return (
        <div className="card">
            
                <div className="content-image">
                    <img src={props.image} alt={"asdasd"}/>
                </div>
                    
                    <h3>{props.name}</h3>
                    <h3>Dietas: {props.diets}</h3>
                    <Link to={`/recipes/${props.id}`}>
                        <button type="button">
                            Descripcion
                        </button>
                    </Link>
               
 
        </div>
    )
}