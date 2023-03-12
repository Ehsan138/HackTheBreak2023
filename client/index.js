

$(document).ready(function () {
  // $('#speech').hide(); // hide the textbox
  $('.record-button').click(function () {
    $('#ai-ouput').hide(); // hide the textbox
    $('#job-Description').hide(); // hide the textbox
    $('#ai-ouput').prop('disabled', true); // disable the textbox
    $('#speech').show();
  });

})



function darkMode() {
  let icon = document.querySelector(".mode-icon");
  let linkText = document.querySelector(".link-text")
  let image = document.querySelector("#logo-image")
  let title = document.querySelector("#title")

  if (icon.textContent === "🌘") {
    icon.textContent = "☀️";
    linkText.textContent = "Light Mode"
    linkText.style.color = "white";
    image.src = "assets/prepmelogo_white.png";
    title.style.color = "white"
  } else {
    icon.textContent = "🌘";
    linkText.textContent = "Dark Mode";
    linkText.style.color = "black";
    image.src = "assets/prepmelogo_black.png";
    title.style.color = "#2b547e";
  }

  let body = document.querySelector("body");
  body.classList.toggle("dark-mode");
  console.log("clicked")
}
