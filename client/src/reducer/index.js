let initialState = {
    recipeDetail: {},
    allRecipes: [],
    recipes: [],
    diets: [],
    statusPost:{}
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_RECIPES':
            if (action.payload.error) return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            }
            return {
                ...state,
                allRecipes: action.payload,
                recipes: action.payload
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
                    name: action.payload.name,
                    image: action.payload.image,
                    summary: action.payload.summary,
                    healthScore: action.payload.healthScore,
                    dishTypes: action.payload.dishTypes,
                    diets: action.payload.diets,
                    steps: action.payload.steps
                }
            }

            case 'ORDER_BY_NAME':

                let sortByName = action.payload === 'A-Z' ?
                    state.recipes.sort(function (a, b) {
                        if (a.name > b.name) {
                            return 1
                        }
                        if (b.name > a.name) {
                            return -1
                        }
                        return 0
                    }) :
                    state.recipes.sort(function (a, b) {
                        if (a.name > b.name) {
                            return -1
                        }
                        if (b.name > a.name) {
                            return 1
                        }
                        return 0
                    })
                return {
                    ...state,
                    recipes: sortByName
                }
    
            case "ORDER_BY_HSCORE":
                const sortedHscore =
                    action.payload === "Menos saludable"
                        ? state.recipes.sort((a, b) => {
    
                            if (a.healthScore > b.healthScore) {
                                return 1;
                            }
                            if (b.healthScore > a.healthScore) {
                                return -1;
                            }
                            return 0;
                        })
                        : state.recipes.sort((a, b) => {
                            if (a.healthScore > b.healthScore) {
                                return -1;
                            }
                            if (b.healthScore > a.healthScore) {
                                return 1;
                            }
                            return 0;
                        });
                return {
                    ...state,
                    recipes: sortedHscore,
                };
    
            case "GET_FILTER_DIET":
                // const allRecipes = state.allRecipes;
    
                let filteredRecipes = [];
                if (action.payload === "Todos") {
                    filteredRecipes = state.allRecipes;
                } else {
                    state.allRecipes.forEach(e => {
                        // console.log(e.temperament)
                        if (e.diets.includes(action.payload)) {
                            filteredRecipes.push(e);
                        }
                    })
                }
                return {
                    ...state,
                    recipes: filteredRecipes,
                };
            
            case "POST" : 
            return {
                ...state,
                statusPost: action.payload
            }
        default: return state
    }
}

export default rootReducer;