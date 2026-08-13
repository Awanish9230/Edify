import React from 'react';

export default function WelcomeMessage({ name }) {
  // Safe: React automatically sanitizes variables rendered like this to prevent XSS
  return (
    <div className="p-4 bg-white rounded-md shadow">
      <h1 className="text-xl font-bold">Welcome back, {name}!</h1>
      <p>We are glad to see you again.</p>
    </div>
  );
}
