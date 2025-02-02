'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function InviteFriendsPage() {
  const [emails, setEmails] = useState([]); // Array to store multiple emails
  const [currentEmail, setCurrentEmail] = useState(''); // For the email input
  const [formData, setFormData] = useState({ subject: '', message: '' });
  const [status, setStatus] = useState('');

  const handleEmailAdd = () => {
    if (currentEmail.trim() !== '' && !emails.includes(currentEmail)) {
      setEmails([...emails, currentEmail]);
      setCurrentEmail('');
    }
  };

  const handleEmailRemove = (emailToRemove) => {
    setEmails(emails.filter((email) => email !== emailToRemove));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (emails.length === 0) {
      setStatus('Please add at least one email.');
      return;
    }

    setStatus('Sending...');

    try {
      const response = await fetch('/api/sendinvite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to: emails, ...formData }), // Include email array in the payload
      });

      if (1) {
        setStatus('Email sent successfully!');
        setFormData({ subject: '', message: '' });
        setEmails([]); // Clear emails after successful submission
      } else {
        setStatus('Failed to send email. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('Failed to send email. Please try again.');
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-green-400 to-white-400">
      {/* Navbar */}
      <div className="flex items-center justify-between px-8 py-4 bg-transparent">
        <div className="flex items-center">
          <span className="ml-2 text-white text-lg font-bold">VibeSync</span>
        </div>
        <div className="flex space-x-6">
          <a href="/about" className="text-white hover:underline">
            About
          </a>
          <a href="/demo" className="text-white hover:underline">
            Demo
          </a>
          <a href="/contact" className="text-white hover:underline">
            Contact Us
          </a>
          <a href="/logout" className="text-white hover:underline">
            Sign out
          </a>
        </div>
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex-1 flex flex-col items-center justify-center"
      >
        <div className="bg-gradient-to-b from-white to-green-300 p-8 rounded-2xl shadow-lg w-[90%] md:w-[50%]">
          <h1 className="text-center text-3xl font-bold text-black mb-6">Invite Friends</h1>

          {/* Email Input */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-black text-lg font-medium mb-2">
              To
            </label>
            <div className="flex space-x-2">
              <input
                id="email"
                name="email"
                type="email"
                value={currentEmail}
                onChange={(e) => setCurrentEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault(); // Prevent form submission
                    handleEmailAdd(); // Add email on pressing Enter
                  }
                }}
                placeholder="Enter recipient's email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 shadow-md"
              />
              <button
                onClick={handleEmailAdd}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
              >
                Add
              </button>
            </div>
            {/* Email Chips */}
            <div className="mt-4 flex flex-wrap gap-2">
              {emails.map((email, index) => (
                <div
                  key={index}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full shadow-md flex items-center space-x-2"
                >
                  <span>{email}</span>
                  <button
                    onClick={() => handleEmailRemove(email)}
                    className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-700 transition"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="subject" className="block text-black text-lg font-medium mb-2">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Enter subject"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 shadow-md"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-black text-lg font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here"
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 shadow-md"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-white text-green-600 py-2 px-4 rounded-lg hover:bg-green-600 hover:text-white transition"
            >
              Send Invite
            </button>
          </form>
          {status && <p className="text-center mt-4 text-white">{status}</p>}
        </div>
      </motion.div>
    </div>
  );
}