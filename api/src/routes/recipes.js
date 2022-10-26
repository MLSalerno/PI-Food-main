const { Router } = require('express');
const router = Router();
const { Recipe, Diet } = require('../db');
const axios = require('axios');
const { API_KEY } = process.env;

// info que necesito de la api, esta dentro de results que es un array de objetos
// title para el nombre
// image 
// summary para el resumen
// healthScore para el nivel de comida saludable
// dishTypes para tipos de platos (es un array)
// analyzedInstructions es un array que contiene un objeto y dentro esta la prop steps que es un array de objetos, usar la propiedad step de steps y pushearla

// TIPOS DE DIETA
// (vegetarian
// vegan
// glutenFree) estos son booleanos, forman parte del tipo de dietas
// diets es un array donde hay mas tipos de dieta


const getAll = async (name) => {
    let callDb;
    let callApi;
    if (name) {
        callApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${name}&addRecipeInformation=true`);
        callDb = await Recipe.findAll({
            where: { name: name },
            include: Diet
        })
    }
    else {
        callApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=90`);
        callDb = await Recipe.findAll({
            include: Diet
        })
    }
    // console.log(callApi.data.results)
    let filteredCallApi = callApi.data.results.map(e => {

        let stepsBySteps = [];
        e.analyzedInstructions.forEach(e => {
            // console.log(e)
            e.steps.forEach(a => {
                stepsBySteps.push(a.step)
            })
        });;

        console.log(stepsBySteps)
        return {
            id: e.id,
            name: e.title,
            image: e.image,
            summary: e.summary,
            healthScore: e.healthScore,
            dishTypes: e.dishTypes,
            steps: stepsBySteps
        }
    })

    let filteredCallDb = callDb.map(e => {
        // console.log(temperaments)
        return {
            id: e.dataValues.id,
            name: e.dataValues.name,
            summary: e.summary,
            healthScore: e.healthScore,
            steps: e.dataValues.steps,
            image:e.dataValues.image
        }
    })
    return cleanDataApiDb = [...filteredCallApi, ...filteredCallDb];
}

const getByID = async (id) => {
    let recipe;
    // if (id.length < 10) {
        findAPI = await getAll();
        id = Number(id);
        let findRecipe = findAPI.find(e => e.id === id);
        recipe = findRecipe
    // }
    // else {
    //     let findRecipeDB = await Recipe.findOne({
    //         where: { id: id },
    //         include: Diet
    //     });

    //     recipe = {
    //         id: findRecipeDB.dataValues.id,
    //         name: findRecipeDB.dataValues.name,
    //         summary: findRecipeDB.dataValues.summary,
    //         healthScore: findRecipeDB.dataValues.healthScore,
    //         steps: findRecipeDB.dataValues.steps,
    //         image:findRecipeDB.dataValues.image
    //     }
    // }
    return recipe;
}


router.get('/', async (req, res, next) => {
    let name = req.query.name;

    try {
        let allRecipes = await getAll(name)
        if (allRecipes.length !== 0) {
            // console.log(allRecipes)
            res.send(allRecipes)
        }
        else {
            res.send({
                error: "No existen recetas con ese nombre"
            })
        }
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    let recipe;
    let id = req.params.id;
    try {
        recipe = getByID(id)
        if (recipe) {
            res.send(recipe)
        }
        else {
            res.send("No existe una receta con ese id")
        }
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        let {name, summary, healthScore, steps, image} = req.body;

        const newRecipe = await Recipe.create({
            name, 
            summary,
            healthScore,
            steps,
            image: image ? image : "https://pixabay.com/es/photos/huevo-huevo-de-gallina-huevo-duro-1536990/"
        })

        // if (temperaments) {
        //     temperaments.forEach(async e => {
        //         let find = await Temperament.findOne({
        //             where: {
        //                 name: e
        //             },
        //             attributes: { exclude: ["name"] }
        //         });
        //         // console.log(find)
        //         if (find) {
        //             await newDog.addTemperament(find.dataValues.id);
        //         }
        //     });
        // }
        res.send(newRecipe)
    } catch (error) {
        next(error)
    }

})

module.exports = router;