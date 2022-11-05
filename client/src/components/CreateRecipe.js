import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import actionsRecipes from "../actions";
import EtiquetaDiet from "./EtiquetaDiet";
import './createrecipe.css';

export default function CreateRecipe() {

    const dispatch = useDispatch();

    let [input, setInput] = React.useState({
        name: "",
        summary: "",
        healthScore: 0,
        steps: [],
        diets: []

    });

    let [error, setError] = React.useState({
        name: "",
        summary: "",
        healthScore: ""
    })

    const diets = useSelector(state => state.diets)

    useEffect(() => {
        dispatch(actionsRecipes.getDiets());
    }, [])

    function validate(e) {
        if (e.target.name === "name") {
            if (e.target.value === "") {
                setError({
                    ...error,
                    [e.target.name]: "Este campo no puede estar vacio",
                });
            } else {
                setError({
                    ...error,
                    [e.target.name]: "",
                });
            }
        }
        else if (e.target.name === "summary") {
            if (e.target.value === "") {
                setError({
                    ...error,
                    [e.target.name]: "Este campo no puede estar vacio",
                });
            }
            else {
                setError({
                    ...error,
                    [e.target.name]: "",
                });
            }
        }
        else if (e.target.name === "healthScore") {
            if (!/^\d+$/.test(e.target.value)) {
                setError({
                    ...error,
                    [e.target.name]: "Este campo tiene que ser un numero",
                });
            }
            else {
                setError({
                    ...error,
                    [e.target.name]: "",
                });
            }
        }
        setInput(prevInput => {
            return {
                ...prevInput,
                [e.target.name]: e.target.value
            }
        })
    }


    let history = useHistory();

    function onSubmit(e) {
        e.preventDefault();
        dispatch(actionsRecipes.post(input))
            .then(() => {
                history.push('/recipes')
            })
    }

    function onChange(e) {
        let find = input.diets.find(elem => elem === e.target.value);
        if (!find) {
            setInput(prevInput => {
                return {
                    ...prevInput,
                    diets: [...input.diets, e.target.value]
                }
            })
        }
    }

    function onClose(name) {

        setInput(prevInput => {
            return {
                ...prevInput,
                diets: input.diets.filter(e => e !== name)
            }
        })

    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <label>Nombre</label>
                <input name="name" placeholder="Nombre de la receta" className={(error.name !== "") ? 'danger' : null} onChange={e => validate(e)}></input>
                {error.name ? <label className="error">{error.name}</label> : null}
                <label>Resumen del plato</label>
                <div className="div_resumen">
                    <input name="summary" placeholder="Escribi una descripcion de la receta" className={(error.summary !== "") ? 'danger' : "input_resumen"} onChange={e => validate(e)}></input>
                    {error.summary ? <label className="error">{error.summary}</label> : null}
                </div>
                <label>Nivel de comida saludable</label>
                <div className="div_health_score">
                    <input name="healthScore" placeholder="Ingrese nivel de saludable" className={(error.healthScore !== "") ? 'danger' : "input_hscore"} onChange={validate}></input>
                    {error.healthScore ? <label className="error">{error.healthScore}</label> : null}
                                   </div>
                <label>Dietas</label>
                <select name="diets" onChange={e => onChange(e)}>
                    {diets.map(e => (
                        <option key={e.id} value={e.name} >
                            {e.name}
                        </option>
                    ))}
                </select>
                <label>Dietas elegidas</label>
                <div className="container_etiquetas">
                    {input.diets ? input.diets.map(elem => (
                        <EtiquetaDiet key={elem} diet={elem} onClose={() => onClose(elem)} />
                    )) : null}
                </div>
                {(input.name === "") || (input.summary === "") || (input.healthScore === "") ? <button type="submit" disabled={true} >CREAR RECETA</button> : <button type="submit" disabled={false} >CREAR RECETA</button>}
            </form>
        </div>
    )
}
