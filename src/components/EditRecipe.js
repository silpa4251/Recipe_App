// src/EditRecipe.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editRecipe, fetchRecipes } from '../features/recipeSlice';
import { useNavigate, useParams } from 'react-router-dom';

const EditRecipe = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State for the recipe details
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [category, setCategory] = useState('');
  const categories = useSelector((state) => state.recipes.categories);

  const { recipes, status } = useSelector((state) => state.recipes);
  const recipe = recipes.find((recipe) => recipe.id === parseInt(id));

  // Fetch recipe data from the JSON server
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchRecipes());
    }
    // If the recipe exists, set the form fields
    if (recipe) {
      setTitle(recipe.title);
      setIngredients(recipe.ingredients);
      setInstructions(recipe.instructions);
      setCategory(recipe.category);
    }
  }, [dispatch, status, recipe]);

  if (status === 'loading') {
    return <p>Loading recipe...</p>;
  }

  if (!recipe) {
    return <h2 className="text-center">Recipe not found</h2>; // Show error if no recipe is found
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    

    // Create the updated recipe object
    const updatedRecipe = {
      id: recipe.id,
      title,
      ingredients,
      instructions,
      category,
    };
    

    // Dispatch the editRecipe action
    dispatch(editRecipe({ id: recipe.id, updatedRecipe }));

    // Navigate back to the recipe details page
    navigate(`/recipe/${recipe.id}`);
  };

  return (
    <form onSubmit={handleSubmit} className="recipe-form p-4 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Recipe</h2>
      
      {/* Recipe Title Input */}
      <input
        type="text"
        placeholder="Recipe Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="border rounded px-2 py-1 mb-4 w-full"
      />

      {/* Ingredients Input */}
      <textarea
        placeholder="Ingredients (comma separated)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        required
        className="border rounded px-2 py-1 mb-4 w-full"
      />

      {/* Instructions Input */}
      <textarea
        placeholder="Instructions"
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        required
        className="border rounded px-2 py-1 mb-4 w-full"
      />

      {/* Category Select */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
        className="border rounded px-2 py-1 mb-4 w-full"
      >
        <option value="" disabled>Select Category</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      {/* Submit Button */}
      <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">
        Update Recipe
      </button>
    </form>
  );
};

export default EditRecipe;
