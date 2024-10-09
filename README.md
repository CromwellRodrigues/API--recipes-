# Recipe App 🍔🍜🍰🧆🥘🍲

This is a simple Recipe App that allows users to search for meals, view meal details, and browse meals by category.

The app fetches data from [TheMealDB API](https://www.themealdb.com/api.php).

## Features

- Search for meals by name
- View detailed information about meals, including ingredients and instructions
- Browse meals by category
- Navigate through meals using the "Next" button

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (for running a local server, if needed)
- [Git](https://git-scm.com/) (for cloning the repository)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/CromwellRodrigues/API-recipes.git

2. Navigate to the project directory:
   cd API-recipes
   
# Usage
- Open index.html in your web browser to view the app.

## Project Structure
- index.html: The main HTML file for the app.
- style.css: The CSS file for styling the app.
- script.js: The JavaScript file containing the app's functionality.


## API
This app uses TheMealDB API to fetch meal data.

- Search for meals by name: https://www.themealdb.com/api/json/v1/1/search.php?s={meal_name}
- Filter meals by category: https://www.themealdb.com/api/json/v1/1/filter.php?c={category}
- Lookup full meal details by ID: https://www.themealdb.com/api/json/v1/1/lookup.php?i={meal_id}
