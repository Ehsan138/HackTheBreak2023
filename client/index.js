

$(document).ready(function () {
  $('#speech').hide(); // hide the textbox
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

  if (icon.textContent === "🌘") {
    icon.textContent = "☀️";
    linkText.textContent = "Light Mode"
  } else {
    icon.textContent = "🌘";
    linkText.textContent = "Dark Mode";
  }

  let body = document.querySelector("body");
  body.classList.toggle("dark-mode");
  console.log("clicked")
}
