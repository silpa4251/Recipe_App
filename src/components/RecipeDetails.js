// src/RecipeDetails.js
import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite, deleteRecipe, fetchRecipes } from '../features/recipeSlice';

const RecipeDetails = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { recipes, status } = useSelector((state) => state.recipes);
  const recipe = recipes.find((recipe) => recipe.id === parseInt(id));

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchRecipes());
    }
  }, [dispatch, status]);


  if (status === 'loading') {
    return <p>Loading recipe...</p>;
  }

  if (!recipe) {
    return <h2 className="text-center">Recipe not found</h2>; 
  }

  const handleDelete = () => {
    console.log(`Deleting recipe with id: ${id}`);
    dispatch(deleteRecipe(recipe.id));
    navigate('/'); 
  };

  return (
    <div className="recipe-details p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold">{recipe.title}</h2>
      <p><strong>Category:</strong> {recipe.category}</p>

      {/* Ingredients section */}
      {recipe.ingredients && (
        <>
          <h3 className="mt-4 text-lg font-semibold">Ingredients:</h3>
          <ul className="list-disc list-inside">
            {recipe.ingredients.split(',').map((ingredient, index) => (
              <li key={index}>{ingredient.trim()}</li>
            ))}
          </ul>
        </>
      )}

      {/* Instructions section */}
      {recipe.instructions && (
        <>
          <h3 className="mt-4 text-lg font-semibold">Instructions:</h3>
          <p className="whitespace-pre-line">{recipe.instructions}</p>
        </>
      )}

      {/* Toggle favorite button */}
      <button
        onClick={() => dispatch(toggleFavorite(recipe.id))}
        className="favorite-btn px-4 py-2 mt-4 bg-blue-500 text-white rounded"
      >
        {recipe.isFavorite ? 'Unfavorite' : 'Favorite'}
      </button>

      {/* Edit link */}
      <Link
        to={`/edit_recipe/${recipe.id}`}
        className="edit-link px-4 py-2 mt-4 ml-4 bg-green-500 text-white rounded"
      >
        Edit Recipe
      </Link>

      {/* Delete button */}
      <button
        onClick={handleDelete}
        className="delete-button px-4 py-2 mt-4 ml-4 bg-red-500 text-white rounded"
      >
        Delete Recipe
      </button>

      {/* Go back button */}
      <button
        onClick={() => navigate(-1)}
        className="back-button px-4 py-2 mt-4 ml-4 bg-gray-500 text-white rounded"
      >
        Go Back
      </button>
    </div>
  );
};

export default RecipeDetails;
