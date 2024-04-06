import Recipe from "./models/recipe.js";
import { connectDB, closeConnection } from "./models/recipe.js";




// insert one recipe
const insertRecipe = async (recipe) => {
    try {
        const insertedRecipe = await Recipe.create(recipe);
        return insertedRecipe;
    } catch (error) {
        console.error('Error inserting recipe:', error);
    }
};

// Retrieve recipes
const getRecipes = async () => {
    try {
        const retrievedRecipes = await Recipe.find({});
        return retrievedRecipes;
    } catch (error) {
        console.error('Error retrieving recipes:', error);
    }
};

// Retrieve recipe by title
const getRecipeByTitle = async (title) => {
    try {
        const recipe = await Recipe.findOne({ title: title });
        return recipe;
    }
    catch (error) {
        console.error('Error retrieving recipe by title:', error);
    }
}

// Update a recipe
const updateRecipe = async (id, recipe) => {
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(id, recipe, { new: true });
        return updatedRecipe;
    } catch (error) {
        console.error('Error updating recipe:', error);
    }
};

// Delete a recipe
const deleteRecipe = async (id) => {
    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(id);
        return deletedRecipe;
    } catch (error) {
        console.error('Error deleting recipe:', error);
    }
};

export {
    connectDB,
    insertRecipe,
    getRecipes,
    getRecipeByTitle,
    updateRecipe,
    deleteRecipe,
    closeConnection
};
