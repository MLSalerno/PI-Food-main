const { Router } = require('express');
const recipesRoute = require('./recipes');
const dietsRoute = require('./diets')
// api.spoonacular.com/recipes/complexSearch?apiKey=0dfd565b4d54481f892a998889076ce4&addRecipeInformation=true
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes', recipesRoute);
// router.use('/diets', dietsRoute)

module.exports = router;
