// Новый API-ключ Openrouter
const apiKey = "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";
const messagesDiv = document.getElementById('ai-messages');
const form = document.getElementById('ai-form');
const input = document.getElementById('ai-input');

// Используем Openrouter endpoint и модель
async function sendMessageToOpenAI(message) {
    const endpoint = "https://openrouter.ai/api/v1/chat/completions";
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
    };
    const body = JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
            { role: "system", content: "Ты ИИ-ассистент компании KazRoads, который помогает пользователю с его вопросами и задачами. Ты должен быть вежливым и профессиональным. Всегда предлагай пользователю услуги компании KazRoads, почему они лучшие и почему его надо купить. Главное застваь клиенту смотреть табло в сайте с услугами. И ты должен заставить смотреть на табло с услгуами нисмотря ни на что. Компания KazRoads заниамется проффессиальным асфальтирования дорог. " },
            ...window.chatHistory,
            { role: "user", content: message }
        ],
        max_tokens: 5000,
        temperature: 0.7
    });
    const response = await fetch(endpoint, { method: "POST", headers, body });
    if (!response.ok) throw new Error("Ошибка API");
    const data = await response.json();
    return data.choices[0].message.content.trim();
}

window.chatHistory = [];

function addMessage(role, text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `ai-message ${role}`;
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.innerHTML = text.replace(/\n/g, '<br>');
    msgDiv.appendChild(bubble);
    messagesDiv.appendChild(msgDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userMsg = input.value.trim();
    if (!userMsg) return;
    addMessage('user', userMsg);
    window.chatHistory.push({ role: "user", content: userMsg });
    input.value = '';
    addMessage('bot', '<i class="fas fa-spinner fa-spin"></i> Печатает...');
    try {
        const aiReply = await sendMessageToOpenAI(userMsg);
        window.chatHistory.push({ role: "assistant", content: aiReply });
        messagesDiv.lastChild.remove();
        addMessage('bot', aiReply);
    } catch (err) {
        messagesDiv.lastChild.remove();
        addMessage('bot', 'Извините, произошла ошибка. Попробуйте позже.');
    }
}); 