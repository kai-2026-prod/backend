const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const pinRoute = require('./routes/pins');
const userRoute = require('./routes/users');
const commentRoute = require('./routes/comments');

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Could not connect to MongoDB', err));

app.use('/api/pins', pinRoute);
app.use('/api/users', userRoute);
app.use('/api/comments', commentRoute);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});