// import axios from "axios";
// import React from "react";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
// import actionsDogs from "../actions";
// import './createdog.css';
// import EtiquetaDiet from "./EtiquetaDiet";

// export function CreateRecipe() {
    
//     const dispatch = useDispatch();
        
//     let [input, setInput] = React.useState({
//         name:"",
//         height_min:"",
//         height_max:"",
//         weight_min:"",
//         weight_max:"",
//         life_span:"",
//         temperaments:[]
        
//      });
    
//     let [error, setError] = React.useState({
//         name:"",
//         height_min:"",
//         height_max:"",
//         weight_min:"",
//         weight_max:"",
//     })
    
//     const temperaments = useSelector(state => state.temperaments)
    
//     useEffect(() =>{
//         dispatch(actionsDogs.getTemperaments());
//     },[])

//     function validate(e){
//         if(e.target.name === "name"){
//             if(e.target.value === ""){
//                 setError({
//                     ...error,
//                     [e.target.name]:"Este campo no puede estar vacio",
//                 });
//             } else {
//                 setError({
//                     ...error,
//                     [e.target.name]:"",
//                 });
//             }
//         }
//         else if(e.target.name === "height_min" || e.target.name === "height_max" || e.target.name === "weight_min" || e.target.name === "weight_max"){
//             if(e.target.value === ""){
//                 setError({
//                     ...error,
//                     [e.target.name]:"Este campo no puede estar vacio",
//                 });
//             }
//             else if(!/^\d+$/.test(e.target.value)){   
//                 setError({
//                     ...error,
//                     [e.target.name]:"Este campo tiene que ser un numero",
//                 });
//             } else {
//                 setError({
//                     ...error,
//                     [e.target.name]:"",
//                 });
//             }
//         } 
//         setInput(prevInput => {
//             return {
//             ...prevInput,
//             [e.target.name] : e.target.value
//             }
//         })
//     }
    
    
//     let history = useHistory();
    
//     function onSubmit(e) {
//         e.preventDefault();
//         axios.post('http://localhost:3001/api/dogs', input)
//         .then(()=>{
//             history.push('/dogs')
//         })
//     }

//     function onChange(e) {
//         // console.log(e.target.value)
//         let find = input.temperaments.find(elem => elem === e.target.value);
//         // console.log(find)
//         if(!find){
//             // console.log(e.target.key)
//             setInput(prevInput => {
//                 return {
//                 ...prevInput,
//                 temperaments : [...input.temperaments, e.target.value]
//                 }
//             })
//         }
//     }

//     function onClose(name) {
        
//             setInput(prevInput => {
//                 return {
//                 ...prevInput,
//                 temperaments : input.temperaments.filter(e => e !== name)
//                 }
//             })
        
//     }

//     return (
//         <div>
//             <form onSubmit={onSubmit}>
//                 <label>Nombre</label>
//                 <input name="name" className={(error.name !== "") ? 'danger' : null} onChange={ e => validate(e)}></input>
//                 {error.name ? <label className="error">{error.name}</label> : null}
//                 <label>Altura</label>
//                 <div className="div_altura_peso">
//                     <input name="height_min" placeholder="Altura min" className={(error.height_min !== "") ? 'danger' : "input_altura_peso"} onChange={ e => validate(e)}></input>
//                     {error.height_min ? <label className="error">{error.height_min}</label> : null}
//                     <input name="height_max" placeholder="Altura max" className={(error.height_max !== "") ? 'danger' : "input_altura_peso"} onChange={ e => validate(e)}></input>
//                     {error.height_max ? <label className="error">{error.height_max}</label> : null}
//                 </div>
//                 <label>Peso</label>
//                 <div className="div_altura_peso">
//                     <input name="weight_min" placeholder="Peso min" className={(error.weight_min !== "") ? 'danger' : "input_altura_peso"} onChange={validate}></input>
//                     {error.weight_min ? <label className="error">{error.weight_min}</label> : null}
//                     <input name="weight_max" placeholder="Peso max" className={(error.weight_max !== "") ? 'danger' : "input_altura_peso"} onChange={validate}></input>
//                     {error.weight_min ? <label className="error">{error.weight_max}</label> : null}
//                 </div>
//                 <label>Años de vida</label>
//                 <input name="life_span" onChange={validate}></input>
//                 <label>Temperamentos</label>
//                 <select name="temperamentos" onChange={e => onChange(e)}>
//                     {temperaments.map(e => (
//                         <option key={e.id} value={e.name} >
//                             {e.name}
//                         </option>
//                     ))}
//                 </select>
//                 <label>Temperamentos elegidos</label>
//                 <div className="container_etiquetas">
//                     {input.temperaments ? input.temperaments.map(elem => (
//                         <EtiquetaTemp key={elem} temperament={elem} onClose={() => onClose(elem)}/>
//                     )):null}
//                 </div>
//                 {(input.name === "") || (input.height_min === "") || (input.height_max === "") || (input.weight_min === "") || (input.weight_max === "") ? <button type="submit" disabled={true} >CREAR PERRO</button> : <button type="submit" disabled={false} >CREAR PERRO</button>}
//             </form>
//         </div>
//     )
// }

// export default CreateRecipe