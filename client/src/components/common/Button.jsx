import React from 'react';

export default function Button({ children, variant = 'gold', className = '', ...props }) {
  const baseStyle = "inline-block font-bold py-2.5 px-6 rounded-full shadow-md transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 text-center cursor-pointer";
  
  const variants = {
    gold: "bg-gradient-to-r from-accent to-accent-light text-primary-dark hover:shadow-gold-glow",
    maroon: "bg-primary text-cream hover:shadow-maroon-glow hover:bg-primary-light",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-cream shadow-none"
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
