const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const userRoutes = require('./routes/userRoutes');
const sourceRoutes = require('./routes/sourceRoutes');
const questRoutes = require('./routes/questRoutes');
const answerRoutes = require('./routes/answerRoutes');
const questLibraryRoutes = require('./routes/questLibraryRoutes');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

// Print the connection string to the console
const connectionString = process.env.MONGO_URI;
console.log('MongoDB Connection String:', connectionString);

// MongoDB connection
mongoose.connect(connectionString, {
  dbName: process.env.MONGO_DB_NAME,
})
  .then(() => console.log('MongoDB verbunden!'))
  .catch((err) => console.error('MongoDB-Verbindungsfehler:', err));

app.use('/users', userRoutes);
app.use('/quests', questRoutes);
app.use('/sources', sourceRoutes);
app.use('/answers', answerRoutes);
app.use('/questLibrary', questLibraryRoutes);

app.get('/', (req, res) => {
  res.send('Willkommen bei der reQUEST API!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
