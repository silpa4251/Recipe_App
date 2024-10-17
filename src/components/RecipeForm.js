import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRecipe } from '../features/recipeSlice';
import { useNavigate } from 'react-router-dom';

const RecipeForm = () => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [category, setCategory] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categories = useSelector(state => state.recipes.categories);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecipe = {
      id: Date.now(),
      title,
      ingredients,
      instructions,
      category,
    };
    dispatch(addRecipe(newRecipe));
    setTitle('');
    setIngredients('');
    setInstructions('');
    navigate('/')
  };

  return (
    <form onSubmit={handleSubmit} className="recipe-form">
      <input
        type="text"
        placeholder="Recipe Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Ingredients"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />
      <textarea
        placeholder="Instructions"
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)} required>
        <option value="" disabled>Select Category</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <button type="submit">Add Recipe</button>
    </form>
  );
};

export default RecipeForm
