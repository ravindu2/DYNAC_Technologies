const express = require('express');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const clientRoutes = require('./routes/clientRoutes');
const packageRoute = require('./routes/packageRoutes');
const trainerRoute = require('./routes/trainerRoutes');
const dashboardRoute = require('./routes/dashboardRoutes');
const { firebaseApp} = require('./services/firebaseService');
const connectDB = require('./services/db');
const cors = require('cors');
const { default: Dashboard } = require('./controllers/dashboardController');

const PORT = process.env.PORT || 8080;

const app = express();

connectDB();

app.use(cors());


// Middleware for JSON parsing
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/clients', clientRoutes);
app.use('/packages', packageRoute);
app.use('/trainers', trainerRoute);
app.use('/dashboard',dashboardRoute)


// Start the server
app.listen(PORT, () => {
  console.log('Firebase App Initialized:', firebaseApp.name);
  console.log(`Listening on port ${PORT}`);
 
});
