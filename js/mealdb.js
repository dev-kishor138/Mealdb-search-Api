const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchValue = searchField.value;
    searchField.value = '';

    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayMeals(data.meals))
}


const displayMeals = meals => {
    const searchResult = document.querySelector('#search-result');
    meals.forEach(meal => {
        const div = document.createElement('div');
        div.classList.add('col-md-4');
        div.innerHTML = `
            <div class="food-card">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h4 class="card-title">${meal.strMeal}</h4>
                    <p class="card-text">${meal.strInstructions.slice(0, 50)}</p>
                    <button onclick="loadMealDetails(${meal.idMeal})" class="btn btn-primary">Details</button>
                </div>
            </div>
        `;
        searchResult.appendChild(div);
    })
}

const loadMealDetails = mealId => {
    // console.log(mealId)
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayMealDetails(data.meals[0]))
}

const displayMealDetails = meal => {
    const detailsContainer = document.getElementById('food-details');
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="detalis-card">
            <div class="details-img">
                <img src="${meal.strMealThumb}" alt="...">
            </div>
            <div class="details-body">
                <h5>${meal.strMeal}</h5>
                <p>${meal.strInstructions}</p>
                <a href="(${meal.strYoutube})">Play Videos</a>
            </div>
        </div>
    `;
    detailsContainer.appendChild(div);
}