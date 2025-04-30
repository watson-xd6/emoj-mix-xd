import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;
const apiKey = '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'; // Replace with your OpenAI API Key

app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'No message provided' });
  }

  const lowerCaseMessage = message.toLowerCase();

  // 👉 Custom quick replies
  if (lowerCaseMessage.includes('who are you') || lowerCaseMessage.includes('your owner')) {
    return res.json({
      reply: "I'm Watsonfourpence, my owner lives in Harare, Zimbabwe. 📍 His phone number is +263781330745 📞"
    });
  }

  if (lowerCaseMessage.includes('tell me about harare') || lowerCaseMessage.includes('harare')) {
    return res.json({
  reply: "Harare is the capital city of Zimbabwe! 🇿🇼 It's a vibrant city full of culture, music, and amazing food. 🍲🎶"
    });
  }

  if (lowerCaseMessage.includes('owner phone') || lowerCaseMessage.includes('contact owner')) {
    return res.json({
      reply: "📞 You can contact my owner at +263781330745!"
    });
  }

  // 👉 If not custom, send to OpenAI
  try {
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        "Authorization": `Bearer apiKey`,
        "Content-Type": "application/json"
      ,
      body: JSON.stringify(
        model: "text-davinci-003",
        prompt: message,
        max_tokens: 150
      )
    );

    const data = await response.json();
    res.json( reply: data.choices[0].text.trim() );

   catch (error) 
    res.status(500).json( error: error.message );
  );

app.get('/', (req, res) => 
  res.send('Hello! This is your ChatGPT API 🤖');
);

app.listen(port, () => 
  console.log(`Server running at http://localhost:{port}`);
});
