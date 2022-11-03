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

    orderByName: (e) => {

        return (dispatch) => (

            dispatch({
                type: "ORDER_BY_NAME",
                payload: e
            })

        )
    },

    orderByHScore: (e) => {

        return (dispatch) => (

            dispatch({
                type: "ORDER_BY_HSCORE",
                payload: e
            })

        )
    },

    filterByDiet: (e) => {

        return (dispatch) => (

            dispatch({
                type: "GET_FILTER_DIET",
                payload: e
            })
        )
    },

    post: (e) => {

        return async (dispatch) => {
            let response = await axios.post('http://localhost:3001/api/recipes', e)

            dispatch({
                type: "POST",
                payload: response.data
            })

        }
    }
}

export default actionsRecipes;