import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import './card.css'
import { useDispatch, useSelector } from "react-redux";
import actionsRecipes from "../actions";

export default function DetailRecipe() {
    let {id} = useParams();
    if(id.length < 15) {
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
                <p>Tipo de Plato: {recipe.dishTypes} cm</p>
                <p>Resumen: {recipe.summary} kg</p>
                <p>Nivel de comida saludable: {recipe.healthScore}</p>
                <p>Paso a paso: {recipe.steps}</p>
                
               
 
        </div>
    )
}
