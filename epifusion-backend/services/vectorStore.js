import pg from 'pg';
import { PGVectorStore } from '@langchain/community/vectorstores/pgvector';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';

const pool = new pg.Pool({
  connectionString: process.env.PG_CONN,
});

const embedder = new GoogleGenerativeAIEmbeddings({
  apiKey:    process.env.GOOGLE_API_KEY,
  modelName: 'embedding-001',
});

export const store = await PGVectorStore.initialize(embedder, {
  pool,
  tableName: 'embeddings',    
});

export async function upsertEmbeddings(docs) {
  return store.addVectors(
    docs.map((d) => d.values),
    docs.map((d) => d.metadata),
    docs.map((d) => d.id),
  );
}

export async function similaritySearch(query, region, k = 4) {
  return store.similaritySearch(query, k, {
    filter: (meta) => meta.region === region,
  });
}
