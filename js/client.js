const socket = io('http://localhost:8000', { transports: ['websocket'] });

//Get DOM variables
const form = document.getElementById('send-container');
const massageInput = document.getElementById('massageInp');
const massageContainer = document.querySelector(".container");
//Audio variable
var audio = new Audio('ting.mp3');

//Ask new user's name
const name = prompt("Enter your name to join");

socket.emit('new-user-joined', name);

//if new user join let the server know
socket.on('user-join', name => {
    append(`${name} has joined the chat`, 'left');
});

// if any user send massage let the other know
socket.on('receive', data => {
    append(`${data.name}: ${data.massage}`, 'left');
});

// if any user leave chat let other know
socket.on('left', data => {
    append(`${data} has left the chat`, 'left');
});

//form submit code
form.addEventListener('submit', (e) => {
    e.preventDefault;
    const massage = massageInput.value;
    append(`You: ${massage}`, 'right');
    socket.emit('send', massage);
    massageInput.value = '';
});

//append event info to the container
const append = (massage, position) => {
    const massageElement = document.createElement('div');
    massageElement.innerText = massage;
    massageElement.classList.add('massage');
    massageElement.classList.add(position);
    massageContainer.append(massageElement);
    if (position == 'left') {
        audio.play();
    }
}