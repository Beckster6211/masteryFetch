const { JSDOM } = require("jsdom");
const {
  toBeInTheDocument,
  toBeEmptyDOMElement,
  toHaveAttribute,
} = require("@testing-library/jest-dom/matchers");
const rewire = require("rewire");

const main = rewire("./main.js");

expect.extend({
  toHaveAttribute,
  toBeInTheDocument,
  toBeEmptyDOMElement,
});

const LEVELS = {
  one: "level_one",
  two: "level_two",
  three: "level_three",
};

let DOM = null;
let window = null;
beforeEach(async () => {
  const jsDOM = await JSDOM.fromFile("index.html", {
    runScripts: "dangerously",
    resources: "usable",
    url: `file://${__dirname}/`,
    features: {
      FetchExternalResources: ["script"],
      ProcessExternalResources: ["script"],
    },
  });
  await new Promise((res) => {
    jsDOM.window.onload = res;
  });
  DOM = jsDOM.window.document;
  window = jsDOM.window;
});

afterEach(() => {
  DOM = null;
  window = null;
});

describe(LEVELS.one, () => {
  //🌟Task 1:
  it("fetchKanyeQuote should update the #kanye-display h3 innerText to be result of fetch to kanye.rest API", async () => {
    const fetch = async (url) => {
      expect(url).toBe("https://api.kanye.rest");
      return {
        json: async () => ({ quote: "get my sugar" }),
      };
    };
    main.__set__("fetch", fetch);
    main.__set__("document", DOM);
    await main.__get__("fetchKanyeQuote")();
    const kanyeDisplay = DOM.querySelector("#kanye-display");
    expect(kanyeDisplay.innerHTML).toBe("get my sugar");
  });
});
describe(LEVELS.two, () => {
  //🌟Task 2:
  it("fetchCat should update the src of #cat-display to be result of fetch to cat API", async () => {
    const fetch = async (url) => {
      expect(url).toBe("https://api.thecatapi.com/v1/images/search");
      return {
        json: async () => [{ url: "cat.png" }],
      };
    };
    main.__set__("fetch", fetch);
    main.__set__("document", DOM);
    await main.__get__("fetchCat")();
    const catDisplay = DOM.querySelector("#cat-display");
    expect(catDisplay).toHaveAttribute("src", "cat.png");
  });
  //🌟Task 3:
  it("fetchCodingJoke use correct url and should update the inner text of #joke-display to be result of fetch to joke API", async () => {
    const fetch = async (url) => {
      expect(url).toBe(
        "https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist&type=single"
      );
      return {
        json: async () => ({
          joke: `A SQL statement walks into a bar and sees two tables. It approaches and asks, "May I join you?"`,
        }),
      };
    };
    main.__set__("fetch", fetch);
    main.__set__("document", DOM);
    await main.__get__("fetchCodingJoke")();
    const jokeDisplay = DOM.querySelector("#joke-display");
    expect(jokeDisplay.innerHTML).toBe(
      `A SQL statement walks into a bar and sees two tables. It approaches and asks, "May I join you?"`
    );
  });
});

describe(LEVELS.three, () => {
  //🌟Task 4:
  it("should not change code in handleRecipeClick or handleFoodChange", () => {
    const actual = [
      window.handleRecipeClick.toString(),
      window.handleFoodChange.toString(),
    ];
    const expected = [
      `function handleRecipeClick() {
      fetchRecipe(foodToSearch);
    }`,
      `function handleFoodChange() {
      foodToSearch = document.querySelector("#food-input").value;
    }`,
    ];
    expect(actual[0].replace(/[\n\r\s]+/g, "")).toBe(
      expected[0].replace(/[\n\r\s]+/g, "")
    );
    expect(actual[1].replace(/[\n\r\s]+/g, "")).toBe(
      expected[1].replace(/[\n\r\s]+/g, "")
    );
  });
  it(`should include the variable food in the fetch url`, () => {
    const fnString = window.fetchRecipe.toString();
    const actual = fnString.split("fetch(")[1].split(")")[0];
    const expected = "food";
    expect(actual).toMatch(expected);
  });
  it(`fetchRecipe should fetch from edamam based on the food used as its argument with the user's app id and app key and then set the #recipe-link innerText with the recipe's label and href with the recipe's url`, async () => {
    const fetch = async (url) => {
      const expectedUrlContents = [
        "https://api.edamam.com/search?q=",
        "&app_id=",
        "&app_key=",
      ];
      expectedUrlContents.forEach((urlPart) => expect(url).toMatch(urlPart));
      return {
        json: async () => ({
          hits: [{ recipe: { label: "yummy snack", url: "cooking.com" } }],
        }),
      };
    };
    main.__set__("fetch", fetch);
    main.__set__("document", DOM);
    await main.__get__("fetchRecipe")();
    const recipeLink = DOM.querySelector("#recipe-link");
    expect(recipeLink.innerHTML).toBe("yummy snack");
    expect(recipeLink).toHaveAttribute("href", "cooking.com");
  });
});
