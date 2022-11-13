import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import actionsRecipes from "../actions";
import Etiqueta from "./Etiqueta";
import './createrecipe.css';

export default function CreateRecipe() {

    const dispatch = useDispatch();
    let [step, setStep] = React.useState("");
    let [data, setData] = React.useState({
        name: "",
        summary: "",
        healthScore: "",
        steps: [],
        diets: []

    });
    let [error, setError] = React.useState({
        name: "",
        summary: "",
        healthScore: ""
    })
    let [statusPost, setStatusPost] = React.useState("")

    const diets = useSelector(state => state.diets)

    useEffect(() => {
        setStatusPost("")
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
        setData(prevData => {
            return {
                ...prevData,
                [e.target.name]: e.target.value
            }
        })
    }


    let history = useHistory();

    async function onSubmit(e) {
        e.preventDefault();
        dispatch(actionsRecipes.post(data))
        setStatusPost("Receta creada correctamente");
        setData({
            name: "",
            summary: "",
            healthScore: "",
            steps: [],
            diets: []
        })
        setTimeout(() => { history.push('/recipes') }, 3000)
    }

    function onChangeDiets(e) {
        console.log(e)
        let find = data.diets.find(elem => elem === e.target.value);
        if (!find) {
            setData(prevData => {
                return {
                    ...prevData,
                    diets: [...data.diets, e.target.value]
                }
            })
        }
    }

    function onChangeSteps(e) {
        setStep(e.target.value)
    }

    function onClose(name) {
        setData(prevData => {
            return {
                ...prevData,
                diets: data.diets.filter(e => e !== name)
            }
        })

    }

    function addStep(e) {
        setData(prevData => {
            return {
                ...prevData,
                steps: [...data.steps, step]
            }
        })
    }

    // function onCloseStep(e) {
    //    setData(prevData => {
    //         return {
    //             ...prevData,
    //             steps: data.steps.filter((_,i) => i !== e.target.id)
    //         }
    //     })

    // }

    return (
        <div>
            {statusPost !== "" ? <h1>{statusPost}</h1> :
                <form onSubmit={onSubmit}>
                    {console.log(data.steps)}
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
                    <select name="diets" onChange={e => onChangeDiets(e)}>
                        {diets.map(e => (
                            <option key={e.id} value={e.name} >
                                {e.name}
                            </option>
                        ))}
                    </select>
                    <label>Dietas elegidas</label>
                    <div className="container_etiquetas">
                        {data.diets ? data.diets.map(elem => (
                            <Etiqueta key={elem} name={elem} onClose={() => onClose(elem)} />
                        )) : null}
                    </div>
                    <label>Paso a paso</label>
                    <input name="steps" onChange={e => onChangeSteps(e)}/>
                    <input type="button" value="Agregar paso a paso" onClick={e => addStep(e)}/>
                    {data.steps.map((el, i) => (
                        <input type="text" defaultValue={el} readOnly={true} key={i}/>
                    )
                    )}
                    {(data.name === "") || (data.summary === "") || (data.healthScore === "") || (error.summary !== "") || (error.healthScore !== "") || (error.name !== "") ? <button type="submit" disabled={true} >CREAR RECETA</button> : <button type="submit" disabled={false} >CREAR RECETA</button>}
                </form>
            }
        </div>
    )
}
