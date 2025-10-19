const API_KEY = 'YOUR_OPENAI_API_KEY'; // Replace with your OpenAI API key
const messagesDiv = document.getElementById('messages');
const input = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', async () => {
  const userInput = input.value.trim();
  if (!userInput) return;

  appendMessage('You', userInput);
  input.value = '';

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userInput }]
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "No response";
    appendMessage('AI', reply);
  } catch (err) {
    console.error(err);
    appendMessage('AI', 'Error contacting AI.');
  }
});

function appendMessage(sender, text) {
  const message = document.createElement('div');
  message.className = 'message';
  message.innerHTML = `<strong>${sender}:</strong> ${text}`;
  messagesDiv.appendChild(message);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
