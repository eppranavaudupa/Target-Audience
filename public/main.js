    const socket = io();
    const clientsTotal = document.getElementById('clients-total')
    const messageContainer =document.getElementById('message-container');
    const nameInput =document.getElementById("name-input");
    const messageForm = document.getElementById("message-form");
    const messageInput = document.getElementById("message-input");

    socket.on('clients-total',(data)=>{
   clientsTotal.innerHTML= `Total Clients:${data}`
    console.log(`Total Clients:${data}`)
});
messageForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    sendMessage()
})
function sendMessage(){
    console.log(messageInput.value)
    const data ={
        name:nameInput.value,
        message:messageInput.value,
        dateTIme:new Date()
    }
    socket.emit('message',data)
}
socket.on('chat-message',(data)=>{
    console.log(data)
})

