const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Setting up NextEra Workforce frontend...');

// Install dependencies
console.log('Installing dependencies...');
execSync('npm install', { stdio: 'inherit' });

// Create .env file if it doesn't exist
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.log('Creating .env file...');
  fs.writeFileSync(envPath, 'VITE_API_URL=http://localhost:8000/api/v1\n');
}

console.log('Setup complete! You can now run the application with:');
console.log('npm run dev');
