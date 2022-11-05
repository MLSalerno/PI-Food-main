import { React, useState } from "react";
import Cards from "./Cards";
import Paginado from "./Paginado";
import { useDispatch, useSelector } from 'react-redux';
import actionsRecipes from "../actions";
import { useEffect } from "react";
import './home.css'

//comprender bien el paginado

export default function Home() {
    const dispatch = useDispatch();
    const [data, setData] = useState({
        name: "",
    })
    const [order, setOrder] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    let recipes = useSelector(state => state.recipes)
    let diets = useSelector(state => state.diets)

    const recipesPerPage = 9;
    const lastIndex = currentPage * recipesPerPage;
    const firstIndex = lastIndex - recipesPerPage;
    const currentRecipes = recipes.length > 1 ? recipes.slice(firstIndex, lastIndex) : recipes;//elementos a renderizar en la pagina, segun el valor de paginado

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    };

    
    useEffect(() => {
        dispatch(actionsRecipes.getDiets());
        dispatch(actionsRecipes.getRecipes(data.name))
    }, [])
    

    function handleChange(e) {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    function onClick() {
        dispatch(actionsRecipes.getRecipes(data.name))
    }
    
    function onChangeOrderAZ(e) {
        e.preventDefault();
        dispatch(actionsRecipes.orderByName(e.target.value));
        setOrder("Order " + e.target.value)
    }

    function onChangeOrderByHScore(e) {
        e.preventDefault();
        dispatch(actionsRecipes.orderByHScore(e.target.value))
        setOrder("Order " + e.target.value)
    }

    function onChangeFilterByDiet(e) {
        e.preventDefault();
        dispatch(actionsRecipes.filterByDiet(e.target.value))
    }

    return (
        <div className="container-home">
            <input name="name" onChange={(e) => handleChange(e)} />
            <button onClick={() => onClick()}>BUSCAR</button>
            {!recipes.error && recipes.length >= 1 ?
                <div>
                    <select onChange={e => onChangeFilterByDiet(e)}>
                        <option value="Todos">Todos</option>
                        {diets.map(e => (
                            <option key={e.id} value={e.name} >
                                {e.name}
                            </option>
                        ))}
                    </select>

                    <select onChange={e => onChangeOrderAZ(e)}>
                        <option key={1} value={"A-Z"} >
                            {"A-Z"}
                        </option>
                        <option key={2} value={"Z-A"} >
                            {"Z-A"}
                        </option>
                    </select>

                    <select onChange={e => onChangeOrderByHScore(e)}>
                        <option key={1} value={"Mas saludable"} >
                            {"Mas saludable"}
                        </option>
                        <option key={2} value={"Menos saludable"} >
                            {"Menos saludable"}
                        </option>
                    </select>
                    <Cards recipes={currentRecipes} />
                    <div className="pagination">
                        <Paginado recipesPerPage={recipesPerPage} recipes={recipes.length} paginado={paginado} /> {/*el valor de la funcion de paginado aumenta segun el bucle for en el componente Paginado*/}
                    </div>
                </div>
                : <h1>{recipes.error}</h1>}


        </div>
    )
}

