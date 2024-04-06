import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Connection URI with database name and collection name
const uri = process.env.CONECTION_URL;

// Suppress DeprecationWarning for strictQuery
mongoose.set('strictQuery', false);

// Define schema for recipes
const recipeSchema = new mongoose.Schema({
    id: Number,
    title: String,
    ingredients: [String],
    instructions: [String],
    cookingTime: String
}, { collection: 'recipes' }); // Specify the collection name

// Create a model based on the schema
const Recipe = mongoose.model('Recipe', recipeSchema);

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};



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

// Close MongoDB connection
const closeConnection = async () => {
    await mongoose.connection.close();
    console.log('Disconnected from MongoDB');
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
