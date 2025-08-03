import { Router } from 'express';
import { similaritySearch } from '../services/vectorStore.js';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';

const chatModel = new ChatGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
  model: 'gemini-pro',     
  temperature: 0,
});

const router = Router();

router.post('/chat', async (req, res) => {
  const { question, region } = req.body;

  try {
    const docs    = await similaritySearch(question, region, 4);
    const context = docs.map(d => d.metadata.text).join('\n---\n') || 'N/A';

    const prompt = `
You are a regional outbreak assistant.
ONLY use the context below.
If the answer isn’t in context, say “I don’t have that information.”

Context:
${context}

Q: ${question}
A:`;

    /* 3. call Gemini via LangChain */
    const response = await chatModel.invoke(prompt);
    const answer   = response.content?.trim() ?? 'No answer';

    /* 4. return JSON */
    res.json({
      answer,
      sources: docs.map(d => ({
        file: d.metadata.filename,
        chunk: d.metadata.chunk,
      })),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ answer: 'Error generating answer' });
  }
});

export default router;
