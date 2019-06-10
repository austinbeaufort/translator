window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
const synth = window.speechSynthesis;
let textOutput = document.querySelector('.text-output');
let finalTranscript = '';
const recognition = new window.SpeechRecognition();
recognition.interimResults = true;
recognition.continuous = true;
recognition.lang = 'en';
const apiKey = API_KEY;


let micOn = false;
const microphone = document.querySelector('#mic');
microphone.addEventListener('click', () => {

    if(micOn === false) {
        let firstLanguage = document.querySelector('#langOne').value;
        recognition.lang = firstLanguage;
        recognition.start();
        micOn = true;
        microphone.style.color = 'red';
    } else {
        recognition.stop();
        let firstLanguage = document.querySelector('#langOne').value;
        let secondLanguage = document.querySelector('#langTwo').value;
        recognition.onresult = (event) => {
            let interimTranscript = '';
            for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
              let transcript = event.results[i][0].transcript;
              if (event.results[i].isFinal) {
                finalTranscript += transcript;
                let newText = document.createElement('p');
                newText.classList.add('original-text');
                newText.textContent = transcript;
                textOutput.insertBefore(newText, textOutput.firstChild);
                recognition.onend = () => {
                    translate(transcript, { from: firstLanguage, to: secondLanguage, engine: 'yandex', key: apiKey})
                    .then(res => {
                        let spanishText = document.createElement('p');
                        spanishText.classList.add('translated-text');
                        spanishText.textContent = res;
                        textOutput.insertBefore(spanishText, textOutput.firstChild.nextSibling);
                        let textToSpeech = new SpeechSynthesisUtterance(res);
                        textToSpeech.lang = secondLanguage;
                        synth.speak(textToSpeech);
                    })
                }
              } else {
                interimTranscript += transcript;
              }
            }
        }
        
        micOn = false;
        microphone.style.color = 'black';
    }
})













































// window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
// let textOutput = document.querySelector('.text-output');
// let finalTranscript = '';
// const recognition = new window.SpeechRecognition();
// recognition.interimResults = true;
// recognition.continuous = true;

// recognition.onresult = (event) => {
//     let interimTranscript = '';
//     for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
//       let transcript = event.results[i][0].transcript;
//       if (event.results[i].isFinal) {
//         finalTranscript += transcript;
//         let newText = document.createElement('p');
//         newText.textContent = transcript;
//         textOutput.append(newText);

//       } else {
//         interimTranscript += transcript;
//       }
//     }
// }

// recognition.onend = () => {
//     translate(finalTranscript, { to: 'es', engine: 'yandex', key: 'trnsl.1.1.20190607T002406Z.64f0a2b3249d6c6a.1a33194e02af1e9fe2eb394c36a9daa57076ea61'})
//     .then(res => {
//         console.log(res)
//     })
// }


// recognition.start();