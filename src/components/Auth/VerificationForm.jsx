import React, { useState } from 'react';
import { Phone, Mail, Check } from 'lucide-react';

function VerificationForm({ onVerify }) {
  const [method, setMethod] = useState('phone');
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onVerify(method, value);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md z-20">
      <h2 className="text-2xl font-bold mb-6">Verify Your Account</h2>
      
      <div className="flex gap-4 mb-6">
        <button
          type="button"
          onClick={() => setMethod('phone')}
          className={`flex-1 p-3 rounded-lg flex items-center justify-center gap-2 ${
            method === 'phone'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          <Phone className="w-5 h-5" />
          Phone
        </button>
        <button
          type="button"
          onClick={() => setMethod('email')}
          className={`flex-1 p-3 rounded-lg flex items-center justify-center gap-2 ${
            method === 'email'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          <Mail className="w-5 h-5" />
          Email
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {method === 'phone' ? 'Phone Number' : 'Email Address'}
          </label>
          <input
            type={method === 'phone' ? 'tel' : 'email'}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={method === 'phone' ? '+91  000-0000' : 'you@example.com'}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600"
        >
          <Check className="w-5 h-5" />
          Verify Account
        </button>
      </form>
    </div>
  );
}

export default VerificationForm;