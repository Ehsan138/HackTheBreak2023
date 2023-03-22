const form = document.querySelector("form");
const userResponse = document.querySelector("#response");
const chatContainer = document.querySelector("#chat_container");
const stopBtn = document.getElementById("stop-btn");
const nextButton = document.querySelector("#next-question-button");

let loadInterval;

function loader(element) {
  element.textContent = "";

  loadInterval = setInterval(() => {
    // Update the text content of the loading indicator
    element.textContent += ".";

    // If the loading indicator has reached three dots, reset it
    if (element.textContent === "....") {
      element.textContent = "";
    }
  }, 300);
}

function typeText(element, text) {
  let index = 0;

  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
    } else {
      clearInterval(interval);
    }
  }, 20);
}

// generate unique ID for each message div of bot
// necessary for typing text effect for that specific reply
// without unique ID, typing text will work on every element
function generateUniqueId() {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);

  return `id-${timestamp}-${hexadecimalString}`;
}

function chatStripe(isAi, value, uniqueId) {
  if (isAi) {
    return `
        <div class="wrapper ${isAi && "ai"}">
            <div style = "max-width: 80%;"class="chat">
                <div class="profile">
                  <🤖>
                </div>
                <div style = "background-color: #747474;
                  border-radius: 25px;
                  padding: 10px;
                  color: white;
                  margin-left: 10px;
                  margin-top: 5px;
                  padding: 10px 20px;" class="message" id=${uniqueId}>${value} <br>
                </div>
            </div>
        </div>
    `;
  } else {
    return `
        <div class="wrapper ${isAi && "ai"}">
            <div style = "    max-width: 80%;
  
    position: relative;

    left: 60%;
    transform: translateX(-50%);
    margin-top: 20px;" class="chat">
                <div class="profile">
                
                </div>
                <div style = "background-color: #2294fb;
                border-radius: 25px;
                padding: 10px;
                
                color: white;
                margin-left: 10px;
                margin-top: 5px;
    padding: 10px 20px;" class="message" id=${uniqueId}>${value} <br></div>
            </div>
        </div>
    `;
  }
}

const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData(form);

  // user's chatstripe
  chatContainer.innerHTML += chatStripe(false, userResponse.textContent);

  // to clear the textarea input
  form.reset();

  // bot's chatstripe
  const uniqueId = generateUniqueId();
  chatContainer.innerHTML += chatStripe(true, " ", uniqueId);

  // to focus scroll to the bottom
  chatContainer.scrollTop = chatContainer.scrollHeight;

  // specific message div
  const messageDiv = document.getElementById(uniqueId);

  // messageDiv.innerHTML = "..."
  loader(messageDiv);

  // fetch data from server -> bots response
  // const response = await fetch("http://localhost:5000", {
  const response = await fetch("https://ai-interview-bot-f1dda.web.app/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: data.get("prompt"),
      userResponse: userResponse.textContent,
    }),
  });

  clearInterval(loadInterval);
  messageDiv.innerHTML = " ";

  if (response.ok) {
    const data = await response.json();
    const parsedData = data.bot.trim(); // trims any trailing spaces/'\n'

    typeText(messageDiv, parsedData);
  } else {
    const err = await response.text();

    messageDiv.innerHTML = "Something went wrong";
    alert(err);
  }
};
const handleNext = async (e) => {
  e.preventDefault();

  const data = new FormData(form);

  // user's chatstripe
  // chatContainer.innerHTML += chatStripe(false, data.get("prompt"));

  // to clear the textarea input
  form.reset();

  // bot's chatstripe
  const uniqueId = generateUniqueId();
  chatContainer.innerHTML += chatStripe(true, " ", uniqueId);

  // to focus scroll to the bottom
  chatContainer.scrollTop = chatContainer.scrollHeight;

  // specific message div
  const messageDiv = document.getElementById(uniqueId);

  // messageDiv.innerHTML = "..."
  loader(messageDiv);

  // fetch data from server -> bots response
  // let response = await fetch("http://localhost:5000/next", {
  let response = await fetch("https://ai-interview-bot-f1dda.web.app/next", {

    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: data.get("prompt"),
      userResponse: userResponse.textContent,
    }),
  });

  clearInterval(loadInterval);
  messageDiv.innerHTML = " ";

  if (response.ok) {
    const data = await response.json();
    const parsedData = data.bot.trim(); // trims any trailing spaces/'\n'

    typeText(messageDiv, parsedData);
  } else {
    const err = await response.text();

    messageDiv.innerHTML = "Something went wrong";
    alert(err);
  }
};

form.addEventListener("submit", handleSubmit);
nextButton.addEventListener("click", handleNext);

stopBtn.addEventListener("click", handleSubmit);

// to handle enter key press to submit form
form.addEventListener("keyup", (e) => {
  if (e.keyCode === 13 && !evt.shiftKey) {
    handleSubmit(e);
  }
});
