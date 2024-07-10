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

    try {
        const response = await fetch('http://localhost:4891/v1/completions', {  // URL aggiornato per il server locale
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "QuantFactory/Meta-Llama-3-8B-Instruct-GGUF",
                prompt: `Rispondi sempre in italiano e in maniera concisa. ${userInput.value}`,
                max_tokens: 150,
                temperature: 0.9,
                top_p: 0.4,
                n: 1,
                stream: false,
                user: "italiano-professionale",
                echo: true,
                logprobs: null,
                stop: null,
                presence_penalty: 0,
                frequency_penalty: 1.15,
                best_of: 1
                // Placeholder per Min-P, se supportato
                // min_p: 0.1
            })
        });

        const data = await response.json();
        const assistantMessage = document.createElement('div');
        assistantMessage.className = 'assistant-message';
        assistantMessage.textContent = data.choices[0].text;
        messages.appendChild(assistantMessage);
    } catch (error) {
        console.error("Errore durante l'interazione con il server GPT-4All:", error);
        const errorMessage = document.createElement('div');
        errorMessage.className = 'assistant-message';
        errorMessage.textContent = "Errore durante l'interazione con il server GPT-4All.";
        messages.appendChild(errorMessage);
    }

    userInput.value = '';
    messages.scrollTop = messages.scrollHeight;
}
