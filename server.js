import express from 'express';
import dotenv from 'dotenv';
import { connectDB, insertRecipe, getRecipes, getRecipeByTitle, updateRecipe, deleteRecipe, closeConnection } from './db.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json()); // Middleware to parse JSON requests
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded requests

app.get('/api/recipes', async (req, res) => {
    try {
        await connectDB(); // Connect to MongoDB
        const recipes = await getRecipes(); // Retrieve recipes from database
        res.json({ success: true, data: recipes }); // Send retrieved recipes as JSON response
    } catch (error) {
        console.error('Error retrieving recipes:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    } finally {
        await closeConnection(); // Close MongoDB connection
    }
});

app.get('/api/recipes/:title', async (req, res) => {
    const title = req.params.title;
    try {
        await connectDB(); // Connect to MongoDB
        const recipe = await getRecipeByTitle(title); // Retrieve recipe by title from database
        if (recipe) {
            res.json({ success: true, data: recipe });
        } else {
            res.status(404).json({ success: false, error: 'Recipe not found' });
        }
    } catch (error) {
        console.error('Error retrieving recipe by title:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    } finally {
        await closeConnection(); // Close MongoDB connection
    }
});

app.post('/api/recipes', async (req, res) => {
    const recipe = req.body;
    try {
        await connectDB(); // Connect to MongoDB
        await insertRecipe(recipe); // Insert recipe into database
        res.json({ success: true, message: 'Recipe added successfully' }); // Send success response
    } catch (error) {
        console.error('Error adding recipe:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    } finally {
        await closeConnection(); // Close MongoDB connection
    }
});

app.put('/api/recipes/:id', async (req, res) => {
    const id = req.params.id;
    const updatedRecipe = req.body;
    try {
        await connectDB(); // Connect to MongoDB
        const recipeReturned = await updateRecipe(id, updatedRecipe); // Update recipe in database
        if (recipeReturned) {
            res.json({ success: true, data: recipeReturned });
        } else {
            res.status(404).json({ success: false, error: 'Recipe not found' });
        }
    } catch (error) {
        console.error('Error updating recipe:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    } finally {
        await closeConnection(); // Close MongoDB connection
    }
});

app.delete('/api/recipes/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await connectDB(); // Connect to MongoDB
        await deleteRecipe(id); // Delete recipe from database
        res.json({ success: true, message: 'Recipe deleted successfully' }); // Send success response
    } catch (error) {
        console.error('Error deleting recipe:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    } finally {
        await closeConnection(); // Close MongoDB connection
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
