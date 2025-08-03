import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { upsertEmbeddings } from './vectorStore.js';


export async function chunkAndEmbed(rawText, region, fileId, filename) {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 800,
    chunkOverlap: 100,
  });
  const chunks = await splitter.createDocuments([rawText]);

  const embedder = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GOOGLE_API_KEY,
    modelName: 'embedding-001',
  });
  const vectors = await embedder.embedDocuments(
    chunks.map((c) => c.pageContent)
  );


  await upsertEmbeddings(
    vectors.map((vec, i) => ({
      id: `${fileId}_${i}`,
      values: vec,
      metadata: {
        region,
        fileId,
        filename,
        chunk: i,
        text: chunks[i].pageContent,
      },
    }))
  );
}
