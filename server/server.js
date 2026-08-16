const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB().then(() => {
  const { seedDefaultAdmin } = require('./controllers/authController');
  seedDefaultAdmin();
});

// Middleware
const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:3000',
  'http://localhost:5173', // Fallback Vite default
  'https://shree-mahendi.vercel.app' // Vercel production hosting url placeholder
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }
    return callback(new Error('CORS Policy block: Origin not allowed'), false);
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/gallery', require('./routes/galleryRoutes'));
app.use('/api/testimonials', require('./routes/testimonialRoutes'));
app.use('/api/inquiries', require('./routes/inquiryRoutes'));
app.use('/api/settings', require('./routes/settingsRoutes'));

// Base health check route in Gujarati
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'શ્રી મહેંદી બેકએન્ડ સર્વર સફળતાપૂર્વક ચાલુ છે.',
    timestamp: new Date()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'સર્વરમાં કોઈ ભૂલ આવી છે.'
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
