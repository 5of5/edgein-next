const fs = require('fs');

function exportEnvVariables() {
  const envData = [];

  for (const key in process.env) {
    if (process.env.hasOwnProperty(key)) {
      const envLine = `${key}=${process.env[key]}`;
      envData.push(envLine);
    }
  }

  const envContent = envData.join('\n');
  fs.writeFileSync('.env', envContent);

  console.log('Environment variables exported to .env file.');
}

exportEnvVariables();
