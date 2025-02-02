'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const facts = [
  "Did you know? Curate the perfect (or most chaotic) playlist, organize activities, and vibe with your guests like never before.",
  "Did you know? One of our lead developers wrote the code for this App while competing in a national swim meet!",
  "Did you know? Our AI (powered by Fetch.AI) can ‘talk to’ other AIs and make your party planning even more precise and tailored."
];

const SignupPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [randomFact, setRandomFact] = useState('');
  const router = useRouter();

  useEffect(() => {
    setRandomFact(facts[Math.floor(Math.random() * facts.length)]);
  }, []);

  const validateEmail = (email: string) => {
    const isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    setIsEmailValid(isValid);
    return isValid;
  };

  const validatePassword = (confirmPasswordInput: string) => {
    const isMatch = password === confirmPasswordInput;
    setIsPasswordMatch(isMatch);
    return isMatch;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateEmail(email) || !isPasswordMatch) {
      return; // Prevent form submission if validations fail
    }

    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });

    if (response.ok) {
      router.push('/login'); // Redirect to login after signup
    } else {
      alert('Failed to create an account. Please try again!');
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row">
      {/* Left Section */}
      <div className="flex-1 flex flex-col justify-center bg-green-500 px-8 py-12 rounded-r-[40px]">
      <h2 className="text-xl font-semibold text-white italic mb-4 text-center md:text-left">{randomFact}</h2>
        
        <img
          src="/WhatsApp_Image_2025-02-02_at_07.44.36-removebg-preview.png"
          alt="Party Illustration"
          className="w-3/4 mx-auto"
        />
      </div>

      {/* Right Section */}
      <div className="flex-1 flex items-center justify-center bg-white px-8 py-12">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">Create Account</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex space-x-4">
              <div className="flex-1">
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  id="first-name"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="First Name"
                  required
                />
              </div>
              <div className="flex-1">
                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  id="last-name"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Last Name"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateEmail(e.target.value);
                }}
                className={`mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none ${
                  isEmailValid
                    ? 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    : 'border-red-500 focus:ring-red-500 focus:border-red-500'
                }`}
                placeholder="Enter your email"
                required
              />
              {!isEmailValid && (
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
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  validatePassword(e.target.value);
                }}
                className={`mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none ${
                  isPasswordMatch
                    ? 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    : 'border-red-500 focus:ring-red-500 focus:border-red-500'
                }`}
                placeholder="Re-type your password"
                required
              />
              {!isPasswordMatch && (
                <p className="text-sm text-red-600 mt-1">Passwords do not match.</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1"
            >
              Create Account
            </button>
          </form>
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="px-4 text-gray-500">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>
          <button className="w-full flex items-center justify-center bg-red-500 text-white border border-gray-300 rounded-lg py-2 px-4 mb-4 shadow-sm hover:bg-red-600">
            <img
              src="/google-lens-icon-logo-symbol-free-png.webp"
              alt="Google Icon"
              className="w-5 h-5 mr-2"
            />
            Sign up with Google
          </button>
          
          <p className="text-center mt-4 text-sm text-black">
            Already have an account?{' '}
            <a href="/login" className="text-purple-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
export default SignupPage;
