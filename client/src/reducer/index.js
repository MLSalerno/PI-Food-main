let initialState = {
    recipeDetail: {},
    searchRecipes: [],
    recipes: [],
    diets: [],
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_RECIPES':
            if (action.payload.error) return {
                ...state,
                recipes: action.payload,
                searchRecipes: action.payload
            }
            return {
                ...state,
                searchRecipes: action.payload.map(e => {
                    return {
                        id: e.id,
                        name: e.title,
                        image: e.image,
                        summary: e.summary,
                        healthScore: e.healthScore,
                        dishTypes: e.dishTypes,
                        steps: e.steps
                    }
                }),
                recipes: action.payload.map(e => {
                    return {
                        id: e.id,
                        name: e.title,
                        image: e.image,
                        summary: e.summary,
                        healthScore: e.healthScore,
                        dishTypes: e.dishTypes,
                        steps: e.steps
                    }
                }),
            }

        case 'GET_DIETS':
            return {
                ...state,
                diets: action.payload
            }

        case 'GET_DETAIL':
            return {
                ...state,
                recipeDetail: {
                    id: action.payload.id,
                    name: action.payload.title,
                    image: action.payload.image,
                    summary: action.payload.summary,
                    healthScore: action.payload.healthScore,
                    dishTypes: action.payload.dishTypes,
                    steps: action.payload.steps
                }
            }

        // case 'ORDER_BY_NAME':

        //     let sortByName = action.payload === 'A-Z' ?
        //         state.searchDogs.sort(function (a, b) {
        //             if (a.name > b.name) {
        //                 return 1
        //             }
        //             if (b.name > a.name) {
        //                 return -1
        //             }
        //             return 0
        //         }) :
        //         state.searchDogs.sort(function (a, b) {
        //             if (a.name > b.name) {
        //                 return -1
        //             }
        //             if (b.name > a.name) {
        //                 return 1
        //             }
        //             return 0
        //         })
        //     return {
        //         ...state,
        //         dogs: sortByName
        //     }

        // case "ORDER_BY_WEIGHT":
        //     const sortedWeight =
        //         action.payload === "Menor peso"
        //             ? state.searchDogs.sort((a, b) => {

        //                 if (parseInt(a.weight[0]) > parseInt(b.weight[0])) {
        //                     return 1;
        //                 }
        //                 if (parseInt(b.weight[0]) > parseInt(a.weight[0])) {
        //                     return -1;
        //                 }
        //                 return 0;
        //             })
        //             : state.searchDogs.sort((a, b) => {
        //                 if (parseInt(a.weight[0]) > parseInt(b.weight[0])) {
        //                     return -1;
        //                 }
        //                 if (parseInt(b.weight[0]) > parseInt(a.weight[0])) {
        //                     return 1;
        //                 }
        //                 return 0;
        //             });
        //     return {
        //         ...state,
        //         dogs: sortedWeight,
        //     };

        // case "GET_FILTER_DIETS":
        //     const allDogs = state.searchDogs;

        //     let filteredDogs = [];
        //     if (action.payload === "Todos") {
        //         filteredDogs = allDogs;
        //     } else {
        //         allDogs.forEach(e => {
        //             // console.log(e.temperament)
        //             if (e.temperament.includes(action.payload)) {
        //                 filteredDogs.push(e);
        //             }
        //         })
        //     }
        //     return {
        //         ...state,
        //         dogs: filteredDogs,
        //     };

        // case "GET_FILTER_BREED":
        //     return {
        //         ...state,
        //         dogs: state.searchDogs.filter(e => e.name === action.payload),
        //     };

        default: return state
    }
}

export default rootReducer;