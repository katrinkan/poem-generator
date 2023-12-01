let themeInputForm = document.querySelector("#theme-input");

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
  let userInput = document.querySelector("#theme");
  let poemElement = document.querySelector("#poem");
  const apiKey = "cc10t459o5bb3a3939c42b9f760a834f";
  const context =
    "You are an AI assistant writing short poems. Your mission is to generate a 4 line poem in basic HTML using <p/> and seperate each line using <br/>";
  const prompt = `Generate a poem about ${userInput.value}`;
  const apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

  poemElement.classList.remove("hidden");
  poemElement.innerHTML = `Generating a poem about ${userInput.value.toLowerCase()}`;

  try {
    const response = await axios.get(apiUrl);
    console.log(response);
    displayPoem(response);
  } catch (error) {
    poemElement.innerHTML = "Sorry, something went wrong. Please try again!";
    console.log(error);
  }
}

themeInputForm.addEventListener("submit", generatePoem);
