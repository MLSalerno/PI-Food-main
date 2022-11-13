import React from "react";
import { Link } from "react-router-dom";
import './card.css'

export default function Card(props) {
    return (
        <div className="card">

            <div className="card_image">
                <img src={props.image} alt={"No hay iamgen relacionada"} />
            </div>
            {/* {console.log(props.diets)} */}
            <div className="info">
                <h2>{props.name}</h2>
                <div className="info_diets_healthscore">
                    <h4>{props.diets}</h4>
                    {/* <span>Nivel de saludable:</span> */}
                    <h3>Nivel saludable: {props.healthScore}</h3>
                </div>
                <Link to={`/recipes/${props.id}`} className="info_button_detail">
                    Descripcion
                </Link>
            </div>


        </div>
    )
}