// src/pages/BankTransfer.jsx
import React from 'react';

export default function BankTransfer() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Bank Transfer Payment</h1>
      <p>Please follow the instructions below to complete your bank transfer:</p>

      <div style={{
        marginTop: '2rem',
        border: '1px solid #ccc',
        padding: '1rem',
        borderRadius: '8px',
        display: 'inline-block',
        textAlign: 'left',
        minWidth: '300px'
      }}>
        <p><strong>Account Name:</strong> GFSSGA Impact Network</p>
        <p><strong>Account Number:</strong> 1234567890</p>
        <p><strong>Bank Name:</strong> Example Bank</p>
        <p><strong>Amount:</strong> Enter your donation amount</p>
      </div>

      <p style={{ marginTop: '1.5rem' }}>
        After completing the transfer, click the confirmation button in the app to notify us.
      </p>
    </div>
  );
}
