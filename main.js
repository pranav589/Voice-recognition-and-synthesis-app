const voice = document.querySelector('.voice');

//const microphoneBtn=document.getElementById('microphoneBtn');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

function startListening() {
  const recorder = new SpeechRecognition();
  recorder.start();
  recorder.onstart = console.log('started listening..');
  recorder.onresult = function(data) {
    handleResults(data);
  }

}

function handleResults(data) {
  let text = data.results[0][0].transcript;
  text = text.toLowerCase();
  var element = document.getElementById("container");
  element.appendChild(addHumanText(text));

  processCommand(text)
}

function processCommand(userText) {
  if (userText.includes('instagram')) {
    speak('opening enstagram');
    window.open('https://www.instagram.com')
  } else if (userText.includes('facebook') || userText.includes('fb')) {
    speak('opening facebook');
    window.open('https://www.facebook.com')
  } else if (userText.includes('the') && (userText.includes('time'))) {
    speak('The time is: ' + getCurrentTime())
  } else if (userText.includes('hello') || userText.includes('hi') || (userText.includes('hey'))) {
    speak('Hello, how are you?')
  } else if (userText.includes('i am fine') || userText.includes('i am good')) {
    speak('Great!!')
  } else if (userText.includes('how are your?')) {
    speak('I am great. what about you?')
  } else if (userText.includes('who is your father?')) {
    speak('Pranav')
  } else if (userText.includes('where are you from?')) {
    speak('I am from a virtual world!')
  } else if (userText.includes('Open Facebook') || (userText.includes('Open fb'))) {
    window.open("https://facebook.com");
    speak('Opening facebook')
  } else {
    speak("sorry, i didn't understand that")
  }
}

function getCurrentTime() {
  const date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  return `${(hours%12) ||12}:${minutes}`
}

function speak(TEXT) {
  const utter = new SpeechSynthesisUtterance();

  utter.text = TEXT;

  window.speechSynthesis.speak(utter);

  var element = document.getElementById("container");
  element.appendChild(addBotText(TEXT));
}

function addHumanText(text) {
  const chatContainer = document.createElement("div");
  chatContainer.classList.add("chat-container");
  const chatBox = document.createElement("p");
  chatBox.classList.add("voice2text");
  const chatText = document.createTextNode(text);
  chatBox.appendChild(chatText);
  chatContainer.appendChild(chatBox);
  return chatContainer;
}

function addBotText(text) {
  const chatContainer1 = document.createElement("div");
  chatContainer1.classList.add("chat-container");
  chatContainer1.classList.add("darker");
  const chatBox1 = document.createElement("p");
  chatBox1.classList.add("voice2text");
  const chatText1 = document.createTextNode(text);
  chatBox1.appendChild(chatText1);
  chatContainer1.appendChild(chatBox1);
  return chatContainer1;
}

voice.addEventListener('click', startListening)