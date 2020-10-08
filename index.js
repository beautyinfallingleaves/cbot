require('dotenv').config();

const app = require('./app.js');

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`(ngrok port ${PORT} to fulfill webhook requests)\n`);
});

// CLI chat agent
require('./cbot');
