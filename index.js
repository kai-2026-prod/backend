const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;



mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Connected to MongoDB')}).catch((err) => console.log('Could not connect to MongoDB', err));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});