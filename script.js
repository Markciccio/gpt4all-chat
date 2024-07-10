async function sendMessage() {
    const userInput = document.getElementById('userInput');
    const messages = document.getElementById('messages');

    if (userInput.value.trim() === '') {
        return;
    }

    const userMessage = document.createElement('div');
    userMessage.className = 'user-message';
    userMessage.textContent = userInput.value;
    messages.appendChild(userMessage);

    const response = await fetch('https://nome-della-tua-app.herokuapp.com/chat', {  // URL aggiornato per Heroku
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: userInput.value })
    });

    const data = await response.json();
    const assistantMessage = document.createElement('div');
    assistantMessage.className = 'assistant-message';
    assistantMessage.textContent = data.response;
    messages.appendChild(assistantMessage);

    userInput.value = '';
    messages.scrollTop = messages.scrollHeight;
}
