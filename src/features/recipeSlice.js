import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const Recipe_URL = "http://localhost:4000/recipes";

const initialState = {
  recipes: [],
  status: 'idle',
  categories: ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack','Drinks'],
  favorites: [],
  error: null
};

export const fetchRecipes = createAsyncThunk(
    'recipes/fetchRecipes',
    async () => {
      const response = await axios.get(Recipe_URL);
      return response.data;
    }
  );

  export const addRecipe = createAsyncThunk(
    'recipes/addRecipe',
    async (newRecipe) => {
      const response = await axios.post(Recipe_URL, newRecipe);
      return response.data;
    }
  );
  export const editRecipe = createAsyncThunk(
    'recipes/editRecipe',
    async ({ id, updatedRecipe }) => {
      const response = await axios.put(`${Recipe_URL}/${id}`, updatedRecipe);
      return response.data;
    }
  );
  export const deleteRecipe = createAsyncThunk(
    'recipes/deleteRecipe',
    async (id) => {
      await axios.delete(`${Recipe_URL}/${id}`);
      return id;
    }
  );
  
  
  

const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
   
    toggleFavorite: (state, action) => {
        const recipe = state.recipes.find((recipe) => recipe.id === action.payload);
        if (recipe) {
          recipe.isFavorite = !recipe.isFavorite;
          if (recipe.isFavorite) {
            state.favorites.push(recipe);
          } else {
            state.favorites = state.favorites.filter((fav) => fav.id !== recipe.id);
          }
        }
      },
    addCategory: (state, action) => {
        if (!state.categories.includes(action.payload)) {
          state.categories.push(action.payload);
        }
      },
  
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addRecipe.fulfilled, (state, action) => {
        state.recipes.push(action.payload);
      })
      .addCase(addRecipe.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(editRecipe.fulfilled, (state, action) => {
        const index = state.recipes.findIndex((recipe) => recipe.id === action.payload.id);
        if (index !== -1) {
          state.recipes[index] = action.payload;
        }
      })
      .addCase(editRecipe.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        state.recipes = state.recipes.filter((recipe) => recipe.id !== action.payload);
      })
      .addCase(deleteRecipe.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
   
});

export const { toggleFavorite, addCategory  } = recipeSlice.actions;
export default recipeSlice.reducer;
