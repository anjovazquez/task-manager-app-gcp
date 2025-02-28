// config/setenv.js
require('dotenv').config();
const fs = require('fs');
const path = require('path');

// Read template
const template = fs.readFileSync(
  path.resolve(__dirname, '../src/environments/environment.template.ts'), 
  'utf8'
);

// Replace placeholders with environment variables
const envContent = template
  .replace('${FIREBASE_API_KEY}', process.env.FIREBASE_API_KEY || '')
  .replace('${FIREBASE_AUTH_DOMAIN}', process.env.FIREBASE_AUTH_DOMAIN || '')
  .replace('${FIREBASE_PROJECT_ID}', process.env.FIREBASE_PROJECT_ID || '')
  .replace('${FIREBASE_STORAGE_BUCKET}', process.env.FIREBASE_STORAGE_BUCKET || '')
  .replace('${FIREBASE_MESSAGING_SENDER_ID}', process.env.FIREBASE_MESSAGING_SENDER_ID || '')
  .replace('${FIREBASE_APP_ID}', process.env.FIREBASE_APP_ID || '')  
  .replace('${FIREBASE_MEASUREMENT_ID}', process.env.FIREBASE_MEASUREMENT_ID || '');

// Create environment.ts
fs.writeFileSync(
  path.resolve(__dirname, '../src/environments/environment.ts'),
  envContent
);

// Create environment.prod.ts with production flag set to true
fs.writeFileSync(
  path.resolve(__dirname, '../src/environments/environment.prod.ts'),
  envContent.replace('production: false', 'production: true')
);

console.log('Environment files generated!');