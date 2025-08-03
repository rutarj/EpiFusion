import mongoose from 'mongoose';
import fs from 'fs';
import csv from 'csv-parser';
import dotenv from 'dotenv';
import Alert from './models/Alert.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const seedAlerts = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const alerts = [];

    fs.createReadStream('./sample_alerts_seed.csv')
      .pipe(csv())
      .on('data', (row) => {
        alerts.push({
          disease: row.disease,
          location: row.location,
          lat: parseFloat(row.lat),
          lng: parseFloat(row.lng),
          risk_score: parseFloat(row.risk_score),
          credibility: row.credibility,
          source: row.source,
          explanation: row.explanation,
          timestamp: new Date(row.timestamp)
        });
      })
      .on('end', async () => {
        try {
          await Alert.insertMany(alerts);
          console.log(`✅ Seeded ${alerts.length} alerts to MongoDB`);
        } catch (err) {
          console.error('❌ Error inserting alerts:', err);
        } finally {
          mongoose.disconnect();
        }
      });

  } catch (err) {
    console.error('❌ MongoDB connection failed:', err);
  }
};

seedAlerts();
