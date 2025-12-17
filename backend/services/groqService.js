import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export async function askGroq(prompt) {
  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    temperature: 0,
    messages: [
      { role: "user", content: prompt }
    ]
  });

  return completion.choices[0].message.content;
}
