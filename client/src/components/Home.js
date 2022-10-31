import { React, useState } from "react";
import Cards from "./Cards";
import { useDispatch, useSelector } from 'react-redux';
import actionsRecipes from "../actions";
import { useEffect } from "react";
import './home.css'
import Paginado from "./Paginado";


export default function Home() {
    const dispatch = useDispatch();
    const [data, setData] = useState({
        name: "",
    })
    const [order, setOrder] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    let recipes = useSelector(state => state.recipes)
    let allRecipes = useSelector(state => state.searchRecipes)
    let diets = useSelector(state => state.diets)

    const recipesPerPage = 8;
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

    // function onChangeOrderAZ(e) {
    //     e.preventDefault();
    //     dispatch(actionsDog.orderByName(e.target.value));
    //     setOrder("Ordenado " + e.target.value)
    // }

    // function onChangeOrderByWeight(e) {
    //     e.preventDefault();
    //     dispatch(actionsDog.orderByWeight(e.target.value))
    //     setOrder("Ordenado " + e.target.value)
    // }

    // function onChangeFilterByTemperament(e) {
    //     e.preventDefault();
    //     dispatch(actionsDog.filterByTemperament(e.target.value))
    // }

    // function onChangeFilterByBreed(e) {
    //     e.preventDefault();
    //     dispatch(actionsDog.filterByBreed(e.target.value))
    // }

    return (
        <div className="container-home">
            {console.log(allRecipes)}
            <input name="name" onChange={(e) => handleChange(e)} />
            <button onClick={() => onClick()}>BUSCAR</button>
            {!recipes.error && recipes.length >= 1 ?
                <div>
                    {/* <select name="filtrar_diet" onChange={e => onChangeFilterByDiet(e)}>
                        <option value="Todos">Todos</option>
                        {diets.map(e => (
                            <option key={e.id} value={e.name} >
                                {e.name}
                            </option>
                        ))}
                    </select>

                    <select name="filtrar_raza" onChange={e => onChangeFilterByBreed(e)}>
                        <option value="Todos">Todos</option>
                        {allDogs.map(e => (
                            <option key={e.id} value={e.name} >
                                {e.name}
                            </option>
                        ))}
                    </select>

                    <select name="order_name" onChange={e => onChangeOrderAZ(e)}>
                        <option key={1} value={"A-Z"} >
                            {"A-Z"}
                        </option>
                        <option key={2} value={"Z-A"} >
                            {"Z-A"}
                        </option>
                    </select>

                    <select name="order_peso" onChange={e => onChangeOrderByWeight(e)}>
                        <option key={1} value={"Mayor peso"} >
                            {"Mayor peso"}
                        </option>
                        <option key={2} value={"Menor peso"} >
                            {"Menor peso"}
                        </option>
                    </select> */}
                            {/* {console.log(currentRecipes)} */}
                    <Cards recipes={currentRecipes} />
                    {/* <div className="pagination">
                        <Paginado recipesPerPage={recipesPerPage} recipes={recipes.length} paginado={paginado} /> el valor de la funcion de paginado aumenta segun el bucle for en el componente Paginado
                    </div> */}
                </div>
                : <h1>{recipes.error}</h1>}


        </div>
    )
}

