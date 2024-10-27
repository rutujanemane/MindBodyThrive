'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthInfo, useRedirectFunctions, useLogoutFunction } from "@propelauth/react"; // Import necessary hooks

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  
  // Get authentication information
  const { isLoggedIn } = useAuthInfo();
  
  // Use `useRedirectFunctions` to get redirect methods for login and signup
  const { redirectToLoginPage, redirectToSignupPage } = useRedirectFunctions();
  
  // Get logout function
  const logout = useLogoutFunction();

  const handleSignup = () => {
    redirectToSignupPage(); // PropelAuth-specific signup redirect
  };

  const handleLogin = () => {
    redirectToLoginPage(); // PropelAuth-specific login redirect
  }

  const handleLogout = () => {
    logout(false); // Call the logout function from PropelAuth
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Adjust scroll value as needed
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`p-4 fixed top-0 left-0 w-full z-10 transition-all duration-300 ${isScrolled ? 'bg-white' : 'bg-transparent'} text-black`}>
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link href="/" className="text-3xl font-bold hover:text-teal-600">
            MindBodyThrive
          </Link>
        </div>

        <div className="hidden md:flex space-x-6">
          {/* Display options based on authentication status */}
          {isLoggedIn ? (
            <>
              <Link href="/dashboard" className="hover:text-teal-600">Dashboard</Link>
              <button className='border border-teal-600 text-teal-600 px-4 py-2 rounded hover:bg-teal-600 hover:text-white transition' onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <button className='bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition' onClick={handleSignup}>Signup</button>
              <button className='border border-teal-600 text-teal-600 px-4 py-2 rounded hover:bg-teal-600 hover:text-white transition' onClick={handleLogin}>Login</button>
            </>
          )}
        </div>

        <div className="md:hidden">
          <button className="text-gray-500 hover:text-teal-600 focus:outline-none">
            {/* Mobile menu icon can be added here */}
          </button>
        </div>
      </div>
    </nav>
  );
}
