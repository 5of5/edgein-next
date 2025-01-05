import { useState } from 'react';

export const SendReferralEmail = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const sendEmail = async () => {
    setStatus('Sending...');
    try {
      const response = await fetch('/api/send-referral-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('Email sent successfully!');
        setEmail('');
      } else {
        const errorData = await response.json();
        setStatus(errorData.message || 'Failed to send email.');
      }
    } catch (error) {
      setStatus('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold">Send Referral Email</h2>
      <input
        type="email"
        placeholder="Enter recipient's email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded mb-2"
      />
      <button
        onClick={sendEmail}
        className="bg-blue-500 text-white px-4 py-2 rounded">
        Send Email
      </button>
      {status && <p className="mt-2 text-sm">{status}</p>}
    </div>
  );
};
