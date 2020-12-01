/*
Complete the following tasks to make a fun page full of ways to take a break from the hard work of coding. Remember that you can open the HTML file in the browser to check that your code is working!

Your tasks:

1. In the function fetchKanyeQuote below, make a fetch request to the Kanye Rest API (docs here: https://kanye.rest/). 

From the resulting data, get the string with the Kanye quote and display it as the inner HTML (using .innerHTML, not .innerText) of the h3 with the id kanye-display.
*/

async function fetchKanyeQuote() {
  //--- write your code below ---
  const response = await fetch("https://api.kanye.rest"); //finish me!
  console.log(response);
  const data = await response.json();
  console.log(data);
  const text = data.quote;
  console.log(text);
  const textDisplay = document.querySelector("#kanye-display");
  textDisplay.innerHTML = text;
  //--- write your code above ---
}

/* 
2. In the function fetchCat below, make a fetch request to the cat API (docs here: https://docs.thecatapi.com/ - use the quickstart section!).

From the result of this fetch, get the url of the resulting cat picture out of the data it returns, and use your DOM skills to display it as the src attribute of the img tag with id cat-display.
*/

async function fetchCat() {
  //--- write your code below ---
  const response = await fetch("https://api.thecatapi.com/v1/images/search");
  console.log(response);
  const data = await response.json();
  console.log(data);
  const catPicUrl = data[0].url;
  console.log(catPicUrl);
  const imageSrc = document.querySelector("#cat-display");
  imageSrc.src = catPicUrl;
  //--- write your code above ---
}

/* 
3. In the function fetchCodingJoke below, make a fetch request to the JokeAPI (docs here: https://sv443.net/jokeapi/v2/). Make sure that your fetch URL will result in a joke that meets the following criteria:

    - Category: custom - programming
    - Language: English
    - All five of the available blacklist flags enabled (We're keeping it clean here! 😇)
    - Response format: default (json)
    - Joke type: single 
    - Empty search string (don't put in a search term)
    - ID range: the default one (don't change it)
    - Amount of jokes: 1

Use the data from the fetch to display the joke itself in the inner HTML (using .innerHTML) of the h3 with the id joke-display.
*/

async function fetchCodingJoke() {
  //--- write your code below ---
  //experienced a problems with the api on this doc
  //--- write your code above ---
}

/* 
4. Sign up to the free tier of the Edamam API here: https://developer.edamam.com/. Click "Get an API Key Now" in the top menu once signed in. Click the green button on the resulting page to create an application and enter a short name/description (it doesn't matter what). Once you submit this, you are taken to a page with your application ID and key.

Make a note of your id and key and then navigate to the API docs here: https://developer.edamam.com/edamam-docs-recipe-api. 

Here's an example of how to use your api id and key in the url (replace ${YOUR_APP_ID} and ${YOUR_APP_KEY} with your information from Edamam):
`https://api.edamam.com/search?q=chicken&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`

Use the fetchRecipe function below to make a fetch request to the Edamam API with the food that the function takes in entered as a search query.

Use the first recipe from the hits array in the data that you receive. Remember that you can use Postman to look at what you get from the API. Use .innerHTML to set the text contained in the a tag with the id #recipe-link to be the recipe label from the data you receive. Then set the href of #recipe-link to be the recipe's url, also from the received data.

*Note: Please don't change any code for foodToSearch, handleRecipeClick, or handleFoodChange. Write all your code in fetchRecipe below those. :)*
*/

let foodToSearch = null;

function handleRecipeClick() {
  fetchRecipe(foodToSearch);
}

function handleFoodChange() {
  foodToSearch = document.querySelector("#food-input").value;
}

async function fetchRecipe(food) {
  //--- write your code below ---
  //--- write your code above ---
}
