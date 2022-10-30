import React from "react";
import Card from "./Card";
import './cards.css';

export default function Cards(props) {
    return (
        <div className="container">
            {props.recipes ? props.recipes.map(e => (
                
                <Card key={e.id} name={e.name} summary={props.summary} healthScore={props.healthScore} dishTypes={props.dishTypes} steps={props.steps} image={e.image} diets={e.diets} id={e.id}/>
                 
            )):null}
        </div>
    )
}