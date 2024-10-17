import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchRecipes } from '../features/recipeSlice';

const RecipeList = () => {
  const dispatch = useDispatch();

  // Destructuring state from the Redux store
  const { recipes, status } = useSelector(state => state.recipes);
  const categories = useSelector(state => state.recipes.categories);

  // Local component states for filtering
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);

  // Filter recipes based on search term, selected category, and favorite status
  const filteredRecipes = recipes.filter(recipe => 
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === '' || recipe.category === selectedCategory) &&
    (!showFavorites || recipe.isFavorite)
  );

  // Fetch recipes on component mount if status is idle
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchRecipes());
    }
  }, [dispatch, status]);

  // Conditional rendering for loading and empty states
  if (status === 'loading') {
    return <div>Loading recipes...</div>;
  }

  if (filteredRecipes.length === 0 && status === 'succeeded') {
    return <div>No recipes found.</div>;
  }

  return (
    <div className="recipe-list">
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search Recipes"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      
      {/* Category filter dropdown */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="category-select"
      >
        <option value="">All Categories</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      {/* Favorites filter */}
      <label>
        <input
          type="checkbox"
          checked={showFavorites}
          onChange={() => setShowFavorites(!showFavorites)}
        />
        Show Favorites
      </label>

      {/* Add New Recipe link */}
      <Link to="/new_recipe" className="add-recipe-link">
        Add New Recipe
      </Link>

      {/* Render filtered recipes */}
      <div className="recipe-grid">
        {filteredRecipes.map(recipe => (
          <div key={recipe.id} className="recipe-card">
            <h3>{recipe.title}</h3>
            <Link to={`/recipe/${recipe.id}`} className="details-link">View Details</Link>
            <Link to={`/edit_recipe/${recipe.id}`} className="edit-link">Edit</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
