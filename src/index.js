const themeInputForm = document.querySelector("#theme-input");
const resetElement = document.querySelector("#reset");
const userInput = document.querySelector("#theme");
const poemElement = document.querySelector("#poem");

function addReset() {
  if (userInput.value) {
    resetElement.classList.remove("hidden");
  }
  return;
}

function handleReset(event) {
  if (
    event.click ||
    event.key === "" ||
    event.key === "Enter" ||
    event.key === "Spacebar" ||
    event.touch
  ) {
    event.preventDefault();
    userInput.value = "";
    poemElement.innerHTML = "";
    poemElement.classList.add("hidden");
    resetElement.classList.add("hidden");
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
}

async function generatePoem(event) {
  event.preventDefault();
  const apiKey = "cc10t459o5bb3a3939c42b9f760a834f";
  const context =
    "You are an AI assistant writing short poems. Your mission is to generate a 4 line poem in basic HTML using <p/> and seperate each line using <br/>";
  const prompt = `Generate a poem about ${userInput.value}`;
  const apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;
  poemElement.classList.remove("hidden");
  poemElement.innerHTML = `Generating a poem about ${userInput.value.toLowerCase()}`;

  try {
    const response = await axios.get(apiUrl);
    displayPoem(response);
  } catch (error) {
    poemElement.innerHTML = "Sorry, something went wrong. Please try again!";
    console.log(error);
  }
}

userInput.addEventListener("input", addReset);
themeInputForm.addEventListener("submit", generatePoem);
resetElement.addEventListener("click", handleReset);
resetElement.addEventListener("keydown", handleReset);
resetElement.addEventListener("touchstart", handleReset);
