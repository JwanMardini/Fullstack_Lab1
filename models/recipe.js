import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Connection URI with database name and collection name
const uri = process.env.CONECTION_URL;

// Connect to MongoDB
export const connectDB = async () => {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

// Define schema for recipes
const recipeSchema = new mongoose.Schema({
    title: String,
    ingredients: [String],
    instructions: [String],
    cookingTime: String
}, { collection: 'recipes' }); // Specify the collection name

// Create a model based on the schema
const Recipe = mongoose.model('recipe', recipeSchema);

// Close MongoDB connection
export const closeConnection = async () => {
    await mongoose.connection.close();
    console.log('Disconnected from MongoDB');
};

export default Recipe ;