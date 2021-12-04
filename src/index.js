import express from 'express';
// Initialise Express as an instance
const app = express();

// Set Port and Host
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Start Server
app.listen(PORT, HOST, () => {
  console.log(`-- Server running on ${PORT} --`);
});
