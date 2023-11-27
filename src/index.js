function handleSubmit(event) {
  event.preventDefault();
  new Typewriter("#poem", {
    strings: "Nice to meet you, where've you been",
    autoStart: true,
    delay: 1,
    cursor: "",
  });
}

let themeInputElement = document.querySelector("#theme-input");
themeInputElement.addEventListener("submit", handleSubmit);
