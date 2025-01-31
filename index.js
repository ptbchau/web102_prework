/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from "./games.js";

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
 */

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
  // loop over each item in the data
  for (const game of games) {
    // create a new div element, which will become the game card
    const gameDiv = document.createElement("div");

    // add the class game-card to the list
    gameDiv.classList.add("game-card");

    // set the inner HTML using a template literal to display some info
    // about each game
    // TIP: if your images are not displaying, make sure there is space
    // between the end of the src attribute and the end of the tag ("/>")
    gameDiv.innerHTML = `
        <img
            class="game-img"
            src=${game.img} />
        <h3>${game.name}</h3>
        <p>${game.description}</p>
        <p>Backers: ${game.backers}</p>`;

    // append the game to the games-container
    gamesContainer.append(gameDiv);
  }
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
 */

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalBackers = GAMES_JSON.reduce((acc, game) => {
  return acc + game.backers;
}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalBackers.toLocaleString("en-US")}`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalPledged = GAMES_JSON.reduce((acc, game) => {
  return acc + game.pledged;
}, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `${totalPledged.toLocaleString("en-US")}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const totalGames = GAMES_JSON.length;
gamesCard.innerHTML = `${totalGames.toLocaleString("en-US")}`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
 */

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have not yet met their goal
  const unfundedGames = GAMES_JSON.filter((game) => {
    return game.pledged < game.goal;
  });

  // use the function we previously created to add the unfunded games to the DOM
  addGamesToPage(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have met or exceeded their goal
  const fundedGames = GAMES_JSON.filter((game) => {
    return game.pledged >= game.goal;
  });

  // use the function we previously created to add unfunded games to the DOM
  addGamesToPage(fundedGames);
}

// show all games
function showAllGames() {
  deleteChildElements(gamesContainer);

  // add all games from the JSON data to the DOM
  addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGames = GAMES_JSON.filter((game) => {
  return game.pledged < game.goal;
});
const numUnfundedGames = unfundedGames.length;

// create a string that explains the number of unfunded games using the ternary operator
const displayStr = `
A total of $${totalPledged.toLocaleString(
  "en-US"
)} has been raised for ${totalGames} game${
  totalGames > 1 ? "s" : ""
}. Currently, ${numUnfundedGames} game${
  numUnfundedGames > 1 ? "s" : ""
} remains unfunded. We need your help to fund these amazing games!`;

// create a new DOM element containing the template string and append it to the description container
const descriptionEle = document.createElement("p");
descriptionEle.innerHTML = displayStr;
descriptionContainer.appendChild(descriptionEle);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
  return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame, ...rest] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstGameEle = document.createElement("p");
firstGameEle.innerHTML = firstGame.name;
firstGameContainer.append(firstGameEle);

// do the same for the runner up item
const secondGameEle = document.createElement("p");
secondGameEle.innerHTML = secondGame.name;
secondGameContainer.append(secondGameEle);

/************************************************************************************
 * Customizations: Search feature
 * Users can search for a specific game using a search bar.
 */

// get user input
function getUserInput(inputEleId) {
  const inputEle = document.getElementById(inputEleId);
  let inputVal = inputEle.value.toLowerCase();
  return inputVal;
}

// get search results
// use rest parameters so that the search categories can be modified in case having new features for search.
function getSearchResults(input, ...searchCats) {
  // if users put their input phrase between quotation marks, search the phrase exactly as it appears in the search categories.
  // if users don't use quotation marks, break down the phrase into multiple words and find each word in the search categories.
  const inputComponents =
    input[0] == '"' && input[input.length - 1] == '"'
      ? [input.slice(1, -1)]
      : input.split(" ");

  // make a deep copy to avoid modifying original GAMES_JASON
  let games_json_copy = JSON.parse(JSON.stringify(GAMES_JSON));

  // get a list of games having its search categories matches the input.
  // use Set for the list game results to avoid duplicate.
  let results = new Set();
  for (const category of searchCats) {
    for (const key of inputComponents) {
      let addedGames = games_json_copy.filter(
        (game) => game[category].toLowerCase().indexOf(key) != -1
      );

      // hightlight keyword
      addedGames.forEach((game) => {
        // the following doesn't work as expected because uppercase case.
        // game[category] = game[category].replace(key, `<mark>${key}</mark>`)
        let originalTextIndex = game[category].toLowerCase().indexOf(key);
        let originalText = game[category].slice(
          originalTextIndex,
          originalTextIndex + key.length
        );
        game[category] = game[category].replace(
          originalText,
          `<mark>${originalText}</mark>`
        );
      });

      for (const game of addedGames) {
        results = results.add(game);
      }
    }
  }

  return results;
}

// show search result games
function showSearchGames() {
  deleteChildElements(gamesContainer);
  let input = getUserInput("game-search");
  // At this time, search categories are name and description as default.
  // This could be modified in the future using search options.
  let searchCategories = ["name", "description"];
  let results = getSearchResults(input, ...searchCategories);
  addGamesToPage(results);
}

// display the search results
const searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", showSearchGames);
