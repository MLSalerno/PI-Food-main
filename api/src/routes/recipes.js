const { Router } = require('express');
const router = Router();
const { Recipe, Diet } = require('../db');
const axios = require('axios');
const { Op } = require("sequelize");
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

//cosas a optimizar y completar:
//crear funcion get para api y para db
//relacionar receta con dieta
//buscar sin case sensitive

const getApi = async (name) => {
    let api;
    if (name) {
        api = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${name}&addRecipeInformation=true`);
    }
    else {
        api = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=90`)
    }
    return api
}

const getDB = async (name) => {
    let db;
    if (name) {
        db = await Recipe.findAll({
            // where: { name: name },
            // include: Diet
            where: { name:{
                [Op.like]:`%${name}%`
            }},
            include: Diet
            
        })
    }
    else {
        db = await Recipe.findAll({
            include: Diet
        })
    }
    return db;
}

const getAll = async (name) => {
    let callApi = await getApi(name);
    let callDb = await getDB(name)

    let filteredCallApi = callApi.data.results.map(e => {
        let stepsBySteps = [];
        let allDiets = [];
        e.analyzedInstructions.forEach(e => {
            e.steps.forEach(a => {
                stepsBySteps.push(a.step)
            })
        });;
        e.vegetarian ? allDiets.push("VEGETARIAN"):null;
        e.vegan ? allDiets.push("VEGAN"):null
        e.glutenFree ? allDiets.push("GLUTEN FREE"):null
        e.diets.forEach(a => {
            allDiets.push(a.toUpperCase())
        });
        allDiets = [...new Set(allDiets)]
        
        return {
            id: e.id,
            name: e.title,
            image: e.image,
            summary: e.summary,
            healthScore: e.healthScore,
            dishTypes: e.dishTypes.length >= 1 ? e.dishTypes : "No existen platos relacionados",
            steps: stepsBySteps,
            diets:allDiets.length >= 1 ? allDiets.join(", ") : "No hay dietas relacionadas"
        }
    })
    
    let filteredCallDb = callDb.map(e => {
        let allDiets = e.dataValues.diets.map(e => e.dataValues.name);
        return {
            id: e.dataValues.id,
            name: e.dataValues.name,
            summary: e.dataValues.summary,
            healthScore: e.dataValues.healthScore,
            dishTypes: e.dataValues.dishTypes !== null ? e.dataValues.dishTypes : "No existen platos relacionados",
            steps: e.dataValues.steps,
            diets: allDiets.length >= 1 ? allDiets.join(", ") : "No hay dietas relacionadas",
            image: e.dataValues.image
        }
    })
    return cleanDataApiDb = [...filteredCallApi, ...filteredCallDb];
}

const getByID = async (id) => {
    let recipe;
    if (id.length < 15) {
        // console.log(findAll)
        id = Number(id);
        let findRecipe = await axios(`https://api.spoonacular.com/recipes/${id}/information?apiKey=0dfd565b4d54481f892a998889076ce4`)
        let stepsBySteps = [];
        let allDiets = [];
        findRecipe.data.analyzedInstructions.forEach(e => {
            e.steps.forEach(a => {
                stepsBySteps.push(a.step)
            })
        })
        findRecipe.data.vegetarian ? allDiets.push("VEGETARIAN"):null;
        findRecipe.data.vegan ? allDiets.push("VEGAN"):null
        findRecipe.data.glutenFree ? allDiets.push("GLUTEN FREE"):null
        findRecipe.data.diets.forEach(a => {
            allDiets.push(a.toUpperCase())
        });
        allDiets = [...new Set(allDiets)]

        recipe = {
            id: findRecipe.data.id,
            name: findRecipe.data.title,
            image: findRecipe.data.image,
            summary: findRecipe.data.summary,
            healthScore: findRecipe.data.healthScore,
            dishTypes: findRecipe.data.dishTypes !== null ? findRecipe.data.dishTypes : "No existen platos relacionados",
            steps: stepsBySteps,
            diets:allDiets.length >= 1 ? allDiets.join(", ") : "No hay dietas relacionadas"
        }
    }
    else {
        let findRecipe = await Recipe.findOne({
            where: { id: id },
            include: Diet
        });
        let allDiets = findRecipe.dataValues.diets.map(e => e.dataValues.name);
        console.log(findRecipe.dataValues.image)
        return {
            id: findRecipe.dataValues.id,
            name: findRecipe.dataValues.name,
            summary: findRecipe.summary,
            healthScore: findRecipe.healthScore,
            steps: findRecipe.dataValues.steps,
            dishTypes:findRecipe.dataValues.dishTypes !== null ? findRecipe.dataValues.dishTypes : "No existen platos relacionados",
            diets: allDiets.length >= 1 ? allDiets.join(", ") : "No hay dietas relacionadas",
            image: findRecipe.dataValues.image
        }
    }
    return recipe;
}


router.get('/', async (req, res, next) => {
    let name = req.query.name;
    name = name.toUpperCase()
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
        recipe = await getByID(id)
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
        let { name, summary, healthScore, steps, image, diets } = req.body;
        name=name.toUpperCase();
        const newRecipe = await Recipe.create({
            name,
            summary,
            healthScore,
            steps,
            image: image ? image : "https://w0.peakpx.com/wallpaper/160/626/HD-wallpaper-nono-sad-egg-cute-chicken.jpg"
        })

        if (diets) {
            diets.forEach(async e => {
                let find = await Diet.findOne({
                    where: {
                        name: e
                    },
                    attributes: { exclude: ["name"] }
                });
                if (find) {
                    await newRecipe.addDiet(find.dataValues.id);
                }
            });
        }

        res.status(200).send({
            res: newRecipe,
            message: "Receta creada con exito"
        })
    } catch (error) {
        next(error)
    }

})

module.exports = router;