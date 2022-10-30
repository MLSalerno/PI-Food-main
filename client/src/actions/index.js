import axios from 'axios';

const actionsRecipes = {
    getRecipes: (name) => {

        return async (dispatch) => {
            let response = await axios.get(`http://localhost:3001/api/recipes?name=${name}`)

            dispatch({
                type: "GET_RECIPES",
                payload: response.data
            })

        }


    },

    getDetail: (id) => {

        return async (dispatch) => {
            let response = await axios.get(`http://localhost:3001/api/recipes/${id}`)

            dispatch({
                type: "GET_DETAIL",
                payload: response.data
            })

        }


    },

    getDiets: () => {
        return async (dispatch) => (
            await axios.get(`http://localhost:3001/api/diets`)
                .then(response => {

                    dispatch({
                        type: "GET_DIETS",
                        payload: response.data
                    })
                })
        )
    },

    // orderByName: (e) => {

    //     return (dispatch) => (

    //         dispatch({
    //             type: "ORDER_BY_NAME",
    //             payload: e
    //         })

    //     )
    // },

    // orderByWeight: (e) => {

    //     return (dispatch) => (

    //         dispatch({
    //             type: "ORDER_BY_WEIGHT",
    //             payload: e
    //         })

    //     )
    // },

    // filterByTemperament: (e) => {

    //     return (dispatch) => (

    //         dispatch({
    //             type: "GET_FILTER_TEMPERAMENTS",
    //             payload: e
    //         })
    //     )
    // },

    // filterByBreed: (e) => {

    //     return (dispatch) => (

    //         dispatch({
    //             type: "GET_FILTER_BREED",
    //             payload: e
    //         })
    //     )
    // }


}

export default actionsRecipes;