const socket = io('http://localhost:8000')

const form = document.getElementById('send-container')
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".membersContainer")

const append = (message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messageContainer.append(messageElement)
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,right);
    socket.emit('send',message)
})

const name = prompt("Enter your user name")
socket.emit('new-user-joined',name1)

socket.on('user-joined', name1 =>{
    append(`${name1} joined the chat`,'right')
})

socket.on('receive-', name1 =>{
    append(`${data.message}: ${data.user}`,'left')
})