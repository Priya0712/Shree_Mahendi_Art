import React from 'react';

export default function SectionHeading({ title, subtitle, className = '' }) {
  return (
    <div className={`text-center max-w-xl mx-auto my-8 ${className}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-primary font-heading">
        {title}
      </h2>
      <div className="ornate-divider">
        <span className="ornate-divider-dot"></span>
      </div>
      {subtitle && (
        <p className="text-sm md:text-base text-dark-light mt-2 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
