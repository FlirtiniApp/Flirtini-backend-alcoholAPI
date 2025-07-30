const express = require('express')
const app = express()
const port = 3000

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const alcoholAPIRouter = express.Router();
app.use('/alcohol', alcoholAPIRouter);

alcoholAPIRouter.get('/singledrink', (req, res) => {
    // Fetch the drink details from the database or external API
    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
        .then(response => response.json())
        .then(data => {
            const drink = data.drinks[0];

            const ingredients = [
                drink.strIngredient1,
                drink.strIngredient2,
                drink.strIngredient3,
                drink.strIngredient4,
                drink.strIngredient5,
                drink.strIngredient6,
                drink.strIngredient7,
                drink.strIngredient8,
                drink.strIngredient9,
                drink.strIngredient10,
                drink.strIngredient11,
                drink.strIngredient12,
                drink.strIngredient13,
                drink.strIngredient14,
                drink.strIngredient15
            ]
            const measures = [
                drink.strMeasure1,
                drink.strMeasure2,
                drink.strMeasure3,
                drink.strMeasure4,
                drink.strMeasure5,
                drink.strMeasure6,
                drink.strMeasure7,
                drink.strMeasure8,
                drink.strMeasure9,
                drink.strMeasure10,
                drink.strMeasure11,
                drink.strMeasure12,
                drink.strMeasure13,
                drink.strMeasure14,
                drink.strMeasure15
            ]

            const ingredientTable = ingredients
                .map((ingredient, i) => ingredient ? { ingredient, measure: measures[i] || null } : null)
                .filter(Boolean);

            res.json({
                id: drink.idDrink,
                name: drink.strDrink,
                image: drink.strDrinkThumb,
                category: drink.strCategory,
                IBA: drink.strIBA,
                isAlcoholic: drink.strAlcoholic,
                instructions: drink.strInstructions,
                ingredients: ingredientTable,
            });
        })
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
