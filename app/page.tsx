'use client';

import { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const originalError = console.error;
    const originalWarn = console.warn;
    
    console.error = (...args) => {
      const errorMsg = args[0]?.toString() || '';
      if (errorMsg.includes('MetaMask') || errorMsg.includes('Failed to connect')) {
        return;
      }
      originalError.apply(console, args);
    };

    window.addEventListener('error', (event) => {
      if (event.message?.includes('MetaMask') || event.message?.includes('Failed to connect')) {
        event.preventDefault();
      }
    });

    window.addEventListener('unhandledrejection', (event) => {
      if (event.reason?.toString().includes('MetaMask') || event.reason?.toString().includes('Failed to connect')) {
        event.preventDefault();
      }
    });

    return () => {
      console.error = originalError;
    };
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert(`Login attempt with ${email}`);
    }, 1000);
  };

  const handleFarcasterLogin = () => {
    alert('✓ Farcaster connected successfully!\n\nNote: In production, this will trigger Farcaster authentication.');
  };

  const handleCoinbaseLogin = () => {
    alert('✓ Coinbase Wallet connected successfully!\n\nNote: In production, this will trigger Coinbase Wallet (Base) authentication.');
  };

  return (
    <div className="min-h-screen bg-white flex overflow-hidden">
      {/* Left Side - Wavy Background with Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 relative overflow-hidden items-end justify-start p-8">
        {/* Wavy SVG Background */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 500 900"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#93c5fd', stopOpacity: 0.3 }} />
              <stop offset="100%" style={{ stopColor: '#1e40af', stopOpacity: 0.5 }} />
            </linearGradient>
            <filter id="blur">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
            </filter>
          </defs>

          {/* Curved shapes for wavy effect */}
          <path
            d="M 0 100 Q 150 50 300 100 T 600 100 L 600 0 Q 300 -50 0 0 Z"
            fill="url(#waveGradient)"
            opacity="0.4"
            filter="url(#blur)"
          />
          <path
            d="M 0 200 Q 150 150 300 200 T 600 200 L 600 100 Q 300 50 0 100 Z"
            fill="#3b82f6"
            opacity="0.3"
            filter="url(#blur)"
          />
          <path
            d="M 0 350 Q 150 300 300 350 T 600 350 L 600 250 Q 300 200 0 250 Z"
            fill="#60a5fa"
            opacity="0.25"
          />

          {/* Circular accent */}
          <circle
            cx="150"
            cy="350"
            r="200"
            fill="none"
            stroke="#1e3a8a"
            strokeWidth="8"
            opacity="0.3"
          />
          <circle
            cx="150"
            cy="350"
            r="180"
            fill="none"
            stroke="#1e3a8a"
            strokeWidth="4"
            opacity="0.2"
          />
        </svg>

        {/* Logo and Text */}
        <div className="relative z-10 text-white">
          <div className="mb-12 flex items-center gap-4">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center border-4 border-white/40 backdrop-blur-sm">
              <span className="text-4xl font-bold">X</span>
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
            INDONESIA RUPIAH-<br />
            BACKED STABLECOIN
          </h1>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-6 py-12 sm:px-12">
        {/* Language Selector */}
        <div className="absolute top-6 right-6 border border-gray-300 rounded-full px-4 py-2 flex items-center gap-2 text-sm font-medium">
          <span className="text-lg">🇺🇸</span>
          <span>EN</span>
        </div>

        {/* Mobile Logo */}
        <div className="lg:hidden mb-8 flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-xl font-bold text-white">X</span>
          </div>
          <span className="font-semibold text-gray-900">IDRX</span>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-blue-600 text-center mb-2">
            Welcome Back
          </h2>
          <p className="text-center text-gray-600 mb-8">
            New to IDRX? Create a{' '}
            <a href="#" className="text-blue-600 hover:underline font-semibold">
              Personal Account
            </a>
            {' '}or{' '}
            <a href="#" className="text-blue-600 hover:underline font-semibold">
              Business Account
            </a>
          </p>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Your Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-gray-900">
                  Your Password
                </label>
                <a href="#" className="text-sm font-semibold text-gray-900 hover:underline">
                  Forgot Password
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-full transition duration-200 mt-8"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Social Login */}
          <div className="mt-8">
            <p className="text-center text-gray-600 text-sm mb-4">Or login with</p>
            <div className="flex flex-col gap-3">
              <div className="flex gap-3">
                <button className="flex-1 border border-gray-300 rounded-lg py-3 px-4 font-semibold text-gray-700 hover:bg-gray-50 transition flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </button>
                <button className="flex-1 border border-gray-300 rounded-lg py-3 px-4 font-semibold text-gray-700 hover:bg-gray-50 transition flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <rect fill="#0052FF" width="24" height="24" rx="4" />
                    <text x="50%" y="50%" textAnchor="middle" dy=".3em" fill="white" fontSize="14" fontWeight="bold">
                      W3
                    </text>
                  </svg>
                  Web3 Wallet
                </button>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleFarcasterLogin}
                  className="flex-1 border-2 border-purple-500 rounded-lg py-3 px-4 font-semibold text-purple-700 hover:bg-purple-50 transition flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
                    <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Farcaster
                </button>
                <button
                  onClick={handleCoinbaseLogin}
                  className="flex-1 border-2 border-blue-700 rounded-lg py-3 px-4 font-semibold text-blue-700 hover:bg-blue-50 transition flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="3" y="3" width="18" height="18" rx="2" fill="#1652F0"/>
                    <circle cx="12" cy="12" r="6" fill="white"/>
                  </svg>
                  Coinbase
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
