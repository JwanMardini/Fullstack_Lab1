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
    fetch('/api/recipes').
    then(function(response) {return response.json();}).
    then(function (data) {
        var tableBody = document.querySelector('#recipeTable tbody');
        data.forEach(recipe => {
            var row = `
                <tr>
                <td class="table-cell">${recipe.title}</td>
                <td class="table-cell">${recipe.ingredients.join(', ')}</td>
                <td class="table-cell">${recipe.instructions.join('. ')}</td>
                <td class="table-cell">${recipe.cookingTime}</td>
                <td class="table-cell">
                    <button class="btn btn-primary" onclick="editRecipe(${recipe.id})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteRecipe(${recipe.id})">Delete</button>
                </td>
            </tr>
        
            `;
            tableBody.innerHTML += row;
        } )

        

    })





    


});