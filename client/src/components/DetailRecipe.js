import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import './card.css'
import { useDispatch, useSelector } from "react-redux";
import actionsRecipes from "../actions";

export default function DetailDog() {
    let {id} = useParams();
    if(id.length < 10) {
        id = Number(id)
    }
    const dispatch = useDispatch();

    const recipe = useSelector(state => state.recipeDetail)
    
    useEffect(()=>{
        dispatch(actionsRecipes.getDetail(id));
    },[]);

    
    return (
        <div className="card">
            
                <div className="content-image">
                <img src={recipe.image} alt="cargandooo"/> 
                </div>
                    
                <p>Nombre: {recipe.name}</p>
                <p>Dietas: {recipe.diets}</p>
                <p>Tipo de Plato: {dog.dishTypes} cm</p>
                <p>Resumen: {dog.summary} kg</p>
                <p>Nivel de comida saludable: {dog.healthScore}</p>
                <p>Paso a paso: {dog.steps}</p>
                
               
 
        </div>
    )
}
