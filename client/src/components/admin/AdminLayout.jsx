import React from 'react';
import Sidebar from './Sidebar';
import AdminNavbar from './AdminNavbar';
import ProtectedRoute from './ProtectedRoute';

export default function AdminLayout({ children }) {
  return (
    <ProtectedRoute>
      <div className="flex bg-cream min-h-screen">
        <Sidebar />
        <div className="flex-grow flex flex-col">
          <AdminNavbar />
          <main className="flex-grow bg-cream">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
