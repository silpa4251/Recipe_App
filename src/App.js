
import './App.css';
import { Route, Routes } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';
import RecipeDetails from './components/RecipeDetails';
import EditRecipe from './components/EditRecipe';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<RecipeList />} />
      <Route path='/recipe/:id' element={<RecipeDetails/>} />
      <Route path='/new_recipe' element={<RecipeForm />}/>
      <Route path='/edit_recipe/:id' element={<EditRecipe />} />
    </Routes>
    </>
  );
}

export default App;
