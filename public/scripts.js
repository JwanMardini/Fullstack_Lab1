{/* <tr>
<td>1</td>
<td>Spaghetti</td>
<td>Pasta, Tomato Sauce, Cheese</td>
<td>Boil pasta, add sauce, add cheese</td>
<td>30 minutes</td>
<td>
    <button>Edit</button>
    <button>Delete</button>
</td>
</tr> */}
document.addEventListener('DOMContentLoaded', function() {
    getAllRecipes();

    const addRecipeForm = document.querySelector('#addRecipeForm');

    addRecipeForm.addEventListener('submit', function(event) {
        event.preventDefault();
        let formData = {
            title: document.getElementById('title').value,
            ingredients: document.getElementById('ingredients').value.split('\n'),
            instructions: document.getElementById('instructions').value.split('\n'),
            cookingTime: document.getElementById('cookingTime').value
        };
        addNewRecipe(formData);
    });


});

function getAllRecipes() {
    fetch('/api/recipes').
    then(function(response) {return response.json();}).
    then(function (data) {
        let tableBody = document.querySelector('#recipeTable tbody');
        data.forEach(recipe => {
            let row = `
            <tr data-id="${recipe._id}">
                <td class="table-cell">${recipe.title}</td>
                <td class="table-cell">${recipe.ingredients.join(', ')}</td>
                <td class="table-cell">${recipe.instructions.join('. ')}</td>
                <td class="table-cell">${recipe.cookingTime}</td>
                <td class="table-cell">
                    <button class="btn btn-primary" onclick="editRecipe('${recipe._id}')">Edit</button>
                    <button class="btn btn-danger" onclick="deleteRecipe('${recipe._id}')">Delete</button>
                </td>
            </tr>
        
            `;
            tableBody.innerHTML += row;
        });

    }).catch(function(error) {
        console.error('Error fetching recipes:', error);
    });
}

function editRecipe(id) {
    // Find the table row corresponding to the recipe ID
    let row = document.querySelector(`#recipeTable tbody tr[data-id="${id}"]`);

    // Get the table cells within the row
    let cells = row.querySelectorAll('td');

    // Loop through the cells to make them editable
    cells.forEach(cell => {
        // Create an input element
        let input = document.createElement('input');
        input.value = cell.textContent.trim(); // Set input value to current cell content
        cell.textContent = ''; // Clear the cell content
        cell.appendChild(input); // Append the input element to the cell
    });

    // Create a Save button
    let saveButton = document.createElement('button');
    saveButton.innerText = 'Save';
    saveButton.setAttribute('onclick', `saveRecipe('${id}')`);
    row.querySelector('td:last-child').appendChild(saveButton); // Append the Save button to the last cell

    // Create a Cancel button
    let cancelButton = document.createElement('button');
    cancelButton.innerText = 'Cancel';
    cancelButton.setAttribute('onclick', `cancelEdit('${id}')`);
    row.querySelector('td:last-child').appendChild(cancelButton); // Append the Cancel button to the last cell

    // Hide the Edit button
    let editButton = row.querySelector('button:nth-last-child(3)');
    editButton.style.display = 'none';
}

function cancelEdit(id) {
    // Reload the page to cancel the edit and revert changes
    location.reload();
}

function saveRecipe(id) {
    // Retrieve the table row corresponding to the recipe ID
    let row = document.querySelector(`#recipeTable tbody tr[data-id="${id}"]`);

    // Retrieve the input values from the row
    let inputs = row.querySelectorAll('input');
    let updatedRecipe = {
        title: inputs[0].value,
        ingredients: inputs[1].value.split(',').map(ingredient => ingredient.trim()),
        instructions: inputs[2].value,
        cookingTime: inputs[3].value
    };

    // Send a PUT request to update the recipe
    fetch(`/api/recipes/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedRecipe)
    })
    .then(response => {
        if (response.ok) {
            // Reload the page to reflect the changes
            location.reload();
        } else {
            console.error('Failed to update recipe');
        }
    })
    .catch(error => console.error('Error updating recipe:', error));
}




function deleteRecipe(id) {
    // Confirm deletion
    if (confirm('Are you sure you want to delete this recipe?')) {
        // Send a DELETE request to the delete endpoint
        fetch(`/api/recipes/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                // Reload the page to reflect the changes
                location.reload();
            } else {
                console.error('Failed to delete recipe');
            }
        })
        .catch(error => console.error('Error deleting recipe:', error));
    }
}


function addNewRecipe(formData){
    fetch('/api/recipes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        let tableBody = document.querySelector('#recipeTable tbody');
        let row = `
            <tr>
                <td class="table-cell">${data.title}</td>
                <td class="table-cell">${data.ingredients.join(', ')}</td>
                <td class="table-cell">${data.instructions.join('. ')}</td>
                <td class="table-cell">${data.cookingTime}</td>
                <td class="table-cell">
                    <button class="btn btn-primary" onclick="editRecipe('${data._id}')">Edit</button>
                    <button class="btn btn-danger" onclick="deleteRecipe('${data._id}')">Delete</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;

        location.reload();
    })
    .catch(error => console.error('Error adding recipe:', error));
}
