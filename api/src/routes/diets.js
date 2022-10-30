const { Router } = require('express');
const router = Router();
const { Diet } = require('../db');
const axios = require('axios');
const { API_KEY } = process.env;

router.get('/', async (req,res,next) => {
    let callDb;
    try {
        callDb = await Diet.findAll()
        // console.log(callDb.data)
        if(callDb.length < 1){
            let callApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=90`);
            let allDiets=["VEGETARIAN"];
            allDiets = callApi.data.results.map(e => {
                return [...allDiets, e.diets];      /*guardo todas las diets existentes*/
            })
            allDiets = allDiets.join();     /*paso a cadena, allDiets es un array de arrays*/
            allDiets = allDiets.split(",")  /*paso a array*/
            console.log(allDiets)
            allDiets = [...new Set(allDiets)]; /*elimino duplicados*/
            
            allDiets.forEach(e => {
                // console.log(e)
                if(e.length > 0){
                    let nameTrim= e.trim();     /*elimino espacios vacios en cada elemento del array*/
                    nameTrim = nameTrim.toUpperCase();
                    Diet.create({name:nameTrim})
                }
            })
            callDb = await Diet.findAll();
            let cleanCallDb = callDb.map(e => {
                return e.dataValues
            })
            
            res.send(cleanCallDb)
        }
        else{
            let cleanCallDb = callDb.map(e => {
                return e.dataValues
            })
            // console.log(cleanCallDb)
            res.send(cleanCallDb)
        }
    } catch (error) {
        next(error)
    }
})

module.exports = router;