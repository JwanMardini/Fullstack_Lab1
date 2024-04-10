// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/recipes')
    .then(response => response.json())
    .then(data => {
        const tableBody = document.querySelector('#recipeTable tbody');
        data.forEach(recipe => {
            const row = `
                <tr>
                    <td>${recipe.id}</td>
                    <td>${recipe.title}</td>
                    <td>${JSON.stringify(recipe.ingredients)}</td>
                    <td>${JSON.stringify(recipe.instructions)}</td>
                    <td>${recipe.cookingTime}</td>
                    <td>
                        <button onclick="editRecipe(${recipe.id})">Update</button>
                        <button onclick="deleteRecipe(${recipe.id})">Delete</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    })
    .catch(error => {
        console.error('Error fetching recipes:', error);
    });

    const addRecipeForm = document.querySelector('#addRecipeForm');

    addRecipeForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = {
            title: document.getElementById('title').value,
            ingredients: JSON.parse(`[${document.getElementById('ingredients').value}]`),
            instructions: JSON.parse(`[${document.getElementById('instructions').value}]`),
            cookingTime: document.getElementById('cookingTime').value
        };

        fetch('/api/recipes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#recipeTable tbody');
            const row = `
                <tr>
                    <td>${data.id}</td>
                    <td>${data.title}</td>
                    <td>${JSON.stringify(data.ingredients)}</td>
                    <td>${JSON.stringify(data.instructions)}</td>
                    <td>${data.cookingTime}</td>
                    <td>
                        <button onclick="editRecipe(${data.id})">Update</button>
                        <button onclick="deleteRecipe(${data.id})">Delete</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
            addRecipeForm.reset();
        })
        .catch(error => {
            console.error('Error adding recipe:', error);
        });
    });
});

function editRecipe(id) {
    // Implement edit recipe functionality
}

function deleteRecipe(id) {
    // Implement delete recipe functionality
}
