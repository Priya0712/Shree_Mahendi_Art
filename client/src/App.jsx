import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import WhatsAppFloat from './components/common/WhatsAppFloat';
import { AuthProvider } from './context/AuthContext';
import { SiteSettingsProvider } from './context/SiteSettingsContext';
import SplashScreen from './components/common/SplashScreen';

// Public Pages
import Home from './pages/Home';

// Admin Pages
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ManageGallery from './pages/admin/ManageGallery';
import ManageCategories from './pages/admin/ManageCategories';
import ManageServices from './pages/admin/ManageServices';
import ManageTestimonials from './pages/admin/ManageTestimonials';
import Inquiries from './pages/admin/Inquiries';
import Settings from './pages/admin/Settings';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';

const adminPath = import.meta.env.VITE_ADMIN_PATH || '/secure-yk-admin';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/secure-yk-admin') || 
                       location.pathname.startsWith('/admin') || 
                       location.pathname.startsWith(adminPath);
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAppReady(true), 600);
    return () => clearTimeout(t);
  }, []);

  if (!appReady) return <SplashScreen />;

  return (
    <SiteSettingsProvider>
    <div className="flex flex-col min-h-screen">
      {!isAdminRoute && <Navbar />}
      
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Navigate to="/#about" replace />} />
          <Route path="/services" element={<Navigate to="/#services" replace />} />
          <Route path="/gallery" element={<Navigate to="/#gallery" replace />} />
          <Route path="/testimonials" element={<Navigate to="/#testimonials" replace />} />
          <Route path="/contact" element={<Navigate to="/#contact" replace />} />
          
          {/* Primary Admin Routes */}
          <Route path="/secure-yk-admin/login" element={<Login />} />
          <Route path="/secure-yk-admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="gallery" element={<ManageGallery />} />
            <Route path="categories" element={<ManageCategories />} />
            <Route path="services" element={<ManageServices />} />
            <Route path="testimonials" element={<ManageTestimonials />} />
            <Route path="inquiries" element={<Inquiries />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Fallback & Aliases for /admin & custom adminPath */}
          <Route path="/admin" element={<Navigate to="/secure-yk-admin/login" replace />} />
          <Route path="/admin/*" element={<Navigate to="/secure-yk-admin" replace />} />
          {adminPath !== '/secure-yk-admin' && (
            <>
              <Route path={`${adminPath}/login`} element={<Login />} />
              <Route path={adminPath} element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="gallery" element={<ManageGallery />} />
                <Route path="categories" element={<ManageCategories />} />
                <Route path="services" element={<ManageServices />} />
                <Route path="testimonials" element={<ManageTestimonials />} />
                <Route path="inquiries" element={<Inquiries />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </>
          )}
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <WhatsAppFloat />}
    </div>
    </SiteSettingsProvider>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}
