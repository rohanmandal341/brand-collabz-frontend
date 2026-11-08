import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-5 py-32 text-center">
      <h1 className="text-4xl font-extrabold">Page not found</h1>
      <p className="mt-3 text-[#5d5877]">The page you are looking for does not exist or has moved.</p>
      <Link to="/campaigns" className="btn btn-primary mt-8">Browse campaigns</Link>
    </div>
  );
}
