const { DataTypes } = require('sequelize');
const { Sequelize } = require('sequelize');
const axios = require('axios');

const server = require('../app');


const sequelize = new Sequelize(`postgres://postgres:1234@localhost/api`, {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
sequelize.define('api', {

    api: {
        type: DataTypes.ARRAY(DataTypes.STRING),
    }
},{timestamps:false})
const{api} = sequelize.models
api.sync({force:true})

let apiGet= async () => { 
    let apiData= await axios.get('https://api.spoonacular.com/recipes/complexSearch?apiKey=0dfd565b4d54481f892a998889076ce4&addRecipeInformation=true&number=90')
    console.log(apiData.data.results)
}
apiGet()