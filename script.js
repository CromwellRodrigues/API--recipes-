const form = document.querySelector('form');

const magnifier = document.querySelector('.magnifier');

const nextButton = document.querySelector('.next-btn');
nextButton.addEventListener('click', showNextMeal);


const categoryButtons = document.querySelectorAll('.category-button');
categoryButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        fetchCategoryMeals(category);
        console.log(category);
    });
});

let meals = [];
let currentIndex = 0;

const showMealInfo = (meal) => {
    const title = document.querySelector('.title');
    const area = document.querySelector('.area');
    const info = document.querySelector('.info');
    const img = document.querySelector('.img');
    const ingredientsOutput = document.querySelector('.ingredients');

    console.log(meals);
    const { strMeal, strArea, strMealThumb, strInstructions } = meal;
    title.textContent = strMeal;
    area.textContent = strArea;
    img.style.backgroundImage = `url(${strMealThumb})`;
    info.textContent = strInstructions;

    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} 
                - ${meal[`strMeasure${i}`]}`)
        } else {
            break;
        }
    }

    const html = `
        <span>
            ${ingredients.map((ing) => 
                `<li class="ing">
                    ${ing}
                </li>`).join("")}
            
        </span>
    `

    ingredientsOutput.innerHTML = html;
}




const searchMeal = async (e) => {
    e.preventDefault();

    // select elements
    const input = document.querySelector('.input');
   
    const showAlert = () => {
        alert('No meal found. Please try another. ');
    };

    // fetch data
    const fetchMealData = async (val) => {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`);
        // https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata
        const { meals } = await res.json();
        console.log(meals);
        return meals;
    }

    // get the user value
    const val = input.value.trim();

    if (val) {
        meals = await fetchMealData(val)

        if (!meals) {
            showAlert();
            return;
        }
                
        currentIndex = 0;
        showMealInfo(meals[currentIndex]);
        // meals.forEach(showMealInfo)
    } else {
        alert("Please search a meal.");
    }

};


const fetchCategoryMeals = async (category) => {

    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    //www.themealdb.com/api/json/v1/1/filter.php?c=Seafood
    const { meals: categoryMeals } = await res.json();
    console.log(categoryMeals);

    if (categoryMeals && categoryMeals.length > 0) {

        // fetch full details for the first meal in the category)

        meals = await Promise.all(categoryMeals.map(async (meal) => {
            
        
            const mealDetails = await fetchMealDetails(meal.idMeal)
            return mealDetails;
        }));
        console.log("fetchCategory meals working: " + meals)


        currentIndex = 0;
        showMealInfo(meals[currentIndex]);
    } else {
            alert('No meal details found for this category');
        }
} 



const fetchMealDetails = async (id) => {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    // www.themealdb.com/api/json/v1/1/lookup.php?i=52772

    const { meals } = await res.json();
    console.log(meals);

    if (meals && meals.length > 0) {
        return meals[0];
    } else {
        return null;
    }
    
}
    

function showNextMeal() {
    if (meals.length > 0) {
        currentIndex = (currentIndex + 1) % meals.length;
        showMealInfo(meals[currentIndex]);
    }
}

form.addEventListener('submit', searchMeal);
magnifier.addEventListener('click', searchMeal);