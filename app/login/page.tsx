'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const LoginPage = () => {
  const [emailid, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [loginError, setLoginError] = useState(false); // State for login error
  const router = useRouter();

  const validateEmail = (email: string) => {
    // Allow empty email input without showing error
    if (email === '') {
      setIsEmailValid(true);
      return true;
    }

    const isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    setIsEmailValid(isValid);
    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateEmail(emailid)) {
      return; // Prevent submission if email is invalid
    }

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ emailid, password }),
    });

    if (response.ok) {
      const data = await response.json();
      router.push('/dashboard');
    } else {
      setLoginError(true); // Show error message
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row">
      {/* Left Section */}
      <div className="flex-1 flex flex-col items-center justify-center bg-white px-8 py-12">
        <h2 className="text-2xl font-bold text-black text-center mb-4">Back for more good vibes?</h2>
        <p className="text-center text-2xl text-black font-bold mb-8">
          VibeSync makes your next party even better!
        </p>
        <img
          src="/WhatsApp_Image_2025-02-02_at_07.44.36-removebg-preview.png"
          alt="Party Illustration"
          className="w-9/10 md:w-4/5 lg:w-3/4 bg-white"
        />
      </div>

      {/* Right Section */}
      <div className="flex-1 flex items-center justify-center bg-green-500 rounded-l-[40px] min-h-screen">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          {loginError && (
            <p className="text-red-600 text-center font-medium mb-4">
              Invalid email ID or password. Please try again!
            </p>
          )}
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">Welcome Back!</h1>
          <p className="text-center text-gray-700 mb-4">
            Continue with Google or enter your details.
          </p>
          <button className="w-full flex items-center justify-center bg-white text-gray-700 border border-gray-300 rounded-lg py-2 px-4 mb-4 shadow-sm hover:bg-gray-100">
            <img
              src="/google-lens-icon-logo-symbol-free-png.webp"
              alt="Google Icon"
              className="w-5 h-5 mr-2"
            />
            Login with Google
          </button>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="emailid" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="emailid"
                type="text"
                value={emailid}
                onChange={(e) => {
                  setEmailId(e.target.value);
                  validateEmail(e.target.value);
                  setLoginError(false); // Reset error on input change
                }}
                className={`mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none ${
                  isEmailValid && !loginError
                    ? 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                    : 'border-red-500 focus:ring-red-500 focus:border-red-500'
                }`}
                placeholder="Enter your email"
                required
              />
              {!isEmailValid && emailid !== '' && (
                <p className="text-sm text-red-600 mt-1">Please enter a valid email address.</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setLoginError(false); // Reset error on input change
                }}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="text-right">
              <Link href="/forgot-password" className="text-sm text-purple-600 hover:underline">
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1"
            >
              Login
            </button>
          </form>
          <div className="text-center mt-4">
            <p className="text-sm, text-black">
              Don’t have an account?{' '}
              <Link href="/signup" className="text-purple-600 hover:underline">
                Register!
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
