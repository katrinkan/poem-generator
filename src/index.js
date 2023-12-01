const themeInputForm = document.querySelector("#theme-input");
const resetElement = document.querySelector("#reset");
const userInput = document.querySelector("#theme");
const poemElement = document.querySelector("#poem");
const buttonElement = document.querySelector("#submit-button");

function addReset() {
  if (userInput.value) {
    resetElement.classList.remove("hidden");
  }
  return;
}

function handleReset(event) {
  if (
    event.type === "click" ||
    event.key === "Enter" ||
    event.type === "touchstart"
  ) {
    event.preventDefault();
    userInput.value = "";
    poemElement.innerHTML = "";
    poemElement.classList.add("noPoem");
    resetElement.classList.add("hidden");
    buttonElement.value = "Generate";
    buttonElement.classList.remove("clicked");
  } else {
    return;
  }
}

function displayPoem(response) {
  new Typewriter("#poem", {
    strings: response.data.answer,
    autoStart: true,
    delay: 1,
    cursor: "",
  });
  buttonElement.value = "Generate";
  buttonElement.classList.remove("clicked");
}

async function generatePoem(event) {
  event.preventDefault();
  const apiKey = "cc10t459o5bb3a3939c42b9f760a834f";
  const context =
    "You are an AI assistant writing short poems. Your mission is to generate a 4 line poem in basic HTML using <p/> and seperate each line using <br/>";
  const prompt = `Generate a poem about ${userInput.value}`;
  const apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

  buttonElement.classList.add("clicked");
  buttonElement.value = "Generating";
  poemElement.classList.remove("noPoem");
  poemElement.innerHTML = `Generating a poem about ${userInput.value.toLowerCase()}`;

  try {
    const response = await axios.get(apiUrl);
    displayPoem(response);
  } catch (error) {
    poemElement.innerHTML = "Sorry, something went wrong. Please try again!";
  }
}

userInput.addEventListener("input", addReset);
themeInputForm.addEventListener("submit", generatePoem);
["click", "keydown", "touchstart"].forEach((event) =>
  resetElement.addEventListener(event, handleReset)
);
