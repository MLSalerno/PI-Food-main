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
        callApi = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`);
        callDb = await Recipe.findAll({
            where: { name: name },
            include: Diet
        })
    }
    else {
        callApi = await axios.get(`https://api.thedogapi.com/v1/breeds`);
        callDb = await Recipe.findAll({
            include: Diet
        })
    }
    let filteredCallApi = callApi.data.map(e => {

        let heightArray = [];
        if (e.height.metric) {
            heightArray = e.height.metric.split(" - ");
        }
        let weightArray = [];
        if (e.weight.metric) {
            weightArray = e.weight.metric.split(" - ");
        }

        return {
            id: e.id,
            name: e.name,
            image: e.image ? e.image.url : `https://cdn2.thedogapi.com/images/${e.reference_image_id}.jpg`,
            temperament: e.temperament ? e.temperament : "No hay temperamentos",
            weight: weightArray,
            height: heightArray,
            life_span: e.life_span
        }
    })

    let filteredCallDb = callDb.map(e => {
        let temperaments = e.dataValues.temperaments.map(e => e.dataValues.name);
        // console.log(temperaments)
        return {
            id: e.dataValues.id,
            name: e.dataValues.name,
            image: e.image,
            temperament: temperaments.join(", "),
            weight: e.dataValues.weight,
            height: e.dataValues.height,
            life_span: e.dataValues.life_span
        }
    })
    let cleanDataApiDb = []
    return cleanDataApiDb = [...filteredCallApi, ...filteredCallDb];
}

const getAllByID = async (id) => {
    let recipe;
    if (id.length < 10) {
        findAPI = await axios.get(`https://api.thedogapi.com/v1/breeds`);
        id = Number(id);
        let findRecipe = findAPI.data.find(e => e.id === id);
        recipe = {
            name: findRecipe.name,
            temperament: findRecipe.temperament,
            image: `https://cdn2.thedogapi.com/images/${findg.reference_image_id}.jpg`,
            height: findRecipe.height.metric,
            weight: findRecipe.weight.metric,
            life_span: findRecipe.life_span
        }
    }
    else {
        let findDogDB = await Dog.findOne({
            where: { id: id },
            include: Temperament
        });

        let temperaments = findDogDB.dataValues.temperaments.map(e => e.dataValues.name);

        recipe = {
            id: findDogDB.dataValues.id,
            name: findDogDB.dataValues.name,
            image: findDogDB.dataValues.image,
            temperament: temperaments.join(", "),
            weight: findDogDB.dataValues.weight,
            height: findDogDB.dataValues.height,
            life_span: findDogDB.dataValues.life_span + " años"
        }
    }
    return recipe;
}


router.get('/', async (req, res, next) => {
    let name = req.query.name;

    try {
        let allRecipes = getAll(name)
        if (allRecipes.length !== 0) {
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
        recipe = getAllByID(id)
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
        let { name, height_min, height_max, weight_min, weight_max, life_span, temperaments, image } = req.body;
        let height = [];
        let weight = [];
        height.push(height_min, height_max);
        weight.push(weight_min, weight_max);

        const newDog = await Dog.create({
            name,
            height,
            weight,
            life_span,
            image: image ? image : "https://www.publicdomainpictures.net/pictures/260000/velka/dog-face-cartoon-illustration.jpg"
        })

        if (temperaments) {
            temperaments.forEach(async e => {
                let find = await Temperament.findOne({
                    where: {
                        name: e
                    },
                    attributes: { exclude: ["name"] }
                });
                // console.log(find)
                if (find) {
                    await newDog.addTemperament(find.dataValues.id);
                }
            });
        }
        res.send(newDog)
    } catch (error) {
        next(error)
    }

})

module.exports = router;