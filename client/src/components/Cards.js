import React from "react";
import Card from "./Card";
import './cards.css';

export default function Cards(props) {

    return (
        <div className="cards_container">
            {props.recipes ? props.recipes.map(e => (
                              
                <Card key={e.id} name={e.name} image={e.image} diets={e.diets} id={e.id} healthScore={e.healthScore} />
            )) : null}
        </div>
    )
}