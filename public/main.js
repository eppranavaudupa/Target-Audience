    const socket = io();
    let clientsTotal = document.getElementById('clients-total')
    let messageContainer =document.getElementById('message-container');
    let nameInput =document.getElementById("name-input");
    let messageForm = document.getElementById("message-form");
    let messageInput = document.getElementById("message-input");

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
    addMessageToUI(true,data);
    messageInput ='';
}
socket.on('chat-message',(data)=>{
    console.log(data)
    addMessageToUI(false,data)
})
function addMessageToUI(isownMessage,data){
    const element = ` <li class="${isownMessage} ? message-right":"message-left">
    <p class="message">
    ${data.message}
   
    </p>
</li>`
messageContainer.innerHTML += element;
scrollTobottom()

}

function scrollTobottom(){
    messageContainer.scrollTo(0,messageContainer.scrollHeight)
}