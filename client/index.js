

$(document).ready(function () {
  $('#speech').hide(); // hide the textbox

  $('.record-button').click(function () {
    $('#ai-ouput').hide(); // hide the textbox
    $('form').hide(); // hide the textbox
    $('#ai-ouput').prop('disabled', true); // disable the textbox
    $('.output-textbox label').text('Job description submitted.'); // update the label text
    $('#speech').show(); // hide the textbox

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

  let main = document.querySelector("main");
  main.classList.toggle("dark-mode");
  console.log("clicked")
}
