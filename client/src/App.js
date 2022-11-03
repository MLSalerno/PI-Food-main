import './App.css';
import {BrowserRouter, Route} from "react-router-dom"
import Landing from './components/Landing';
import DetailRecipe from './components/DetailRecipe';
import CreateRecipe from './components/CreateRecipe';
import NavBar from './components/NavBar';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Landing} />
      <Route exact path="/recipes"><NavBar/><Home/></Route>
      <Route exact path="/recipes/:id"><NavBar/><DetailRecipe/></Route>
      <Route exact path="/createRecipe"><NavBar/><CreateRecipe/></Route>
    </BrowserRouter>
  );
}

export default App;