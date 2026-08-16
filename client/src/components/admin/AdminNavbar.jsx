import React from 'react';

export default function AdminNavbar() {
  return (
    <header className="bg-white border-b border-primary/10 h-16 px-6 flex items-center justify-between shadow-sm">
      <span className="font-bold text-primary font-heading text-lg">શ્રી મહેંદી વ્યવસ્થાપન પેનલ</span>
      <div className="flex items-center gap-2 text-sm text-dark-light">
        <span>પ્રણામ, એડમિન!</span>
      </div>
    </header>
  );
}
