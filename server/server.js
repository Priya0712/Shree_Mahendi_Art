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
  process.env.CLIENT_URL,
  'http://localhost:3000',
  'http://localhost:5173',
  'https://shree-mahendi-art.vercel.app',
  'https://shree-mahendi.vercel.app'
].filter(Boolean).map(url => url.replace(/\/$/, ''));

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    const normalizedOrigin = origin.replace(/\/$/, '');
    if (allowedOrigins.includes(normalizedOrigin) || process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }
    return callback(null, true); // Permissive CORS for smooth deployment experience
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes — Support both /api/* and root /* paths so no request ever 404s
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');
const settingsRoutes = require('./routes/settingsRoutes');

app.use(['/api/auth', '/auth'], authRoutes);
app.use(['/api/categories', '/categories'], categoryRoutes);
app.use(['/api/services', '/services'], serviceRoutes);
app.use(['/api/gallery', '/gallery'], galleryRoutes);
app.use(['/api/testimonials', '/testimonials'], testimonialRoutes);
app.use(['/api/inquiries', '/inquiries'], inquiryRoutes);
app.use(['/api/settings', '/settings'], settingsRoutes);

// Base health check route
app.get(['/api/health', '/health'], (req, res) => {
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
