const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Clean up previous builds
if (fs.existsSync('dist')) {
  fs.rmSync('dist', { recursive: true, force: true });
}
if (fs.existsSync('web-build')) {
  fs.rmSync('web-build', { recursive: true, force: true });
}

console.log('Building web app...');
execSync('npx expo export --platform web --output-dir dist', { stdio: 'inherit' });

console.log('Build completed successfully!');