const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const transcriptionDiv = document.getElementById('transcription');
const responseDiv = document.getElementById('response');
let response = '';
const recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = 'en-US';
startBtn.addEventListener('click', function () {
  response = '';
  recognition.start();
  startBtn.disabled = true;
  stopBtn.disabled = false;
});
stopBtn.addEventListener('click', function () {
  recognition.stop();
  startBtn.disabled = false;
  stopBtn.disabled = true;
  responseDiv.textContent = response;
});
recognition.onresult = function (event) {
  let finalTranscription = '';
  let interimTranscription = '';
  for (let i = event.resultIndex; i < event.results.length; ++i) {
    const result = event.results[i];
    if (result.isFinal) {
      const transcript = result[0].transcript.trim();
      if (response.indexOf(transcript) === -1) {
        response += transcript + ' ';
      }
      finalTranscription += transcript;
    } else {
      interimTranscription += result[0].transcript;
    }
  }
  transcriptionDiv.textContent = finalTranscription + interimTranscription;
  responseDiv.textContent = response;
  console.log(response);
};
recognition.onerror = function (event) {
  console.error('Recognition error: ', event.error);
};
