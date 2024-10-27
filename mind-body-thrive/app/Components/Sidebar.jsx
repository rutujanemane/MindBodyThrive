// src/components/Sidebar.js
import Link from 'next/link';
import { useAuthInfo, useLogoutFunction } from '@propelauth/react'; // Use PropelAuth hooks

export default function Sidebar() {
  const { user, isLoggedIn, loading } = useAuthInfo(); // Add loading state from PropelAuth
  const logout = useLogoutFunction(); // PropelAuth logout function
  const authUrl = process.env.NEXT_PUBLIC_PROPELAUTH_AUTH_URL;

  const handleLogout = () => {
    logout(false); // Log out the user
  };

  return (
    <aside className="bg-gray-800 text-white w-64 h-screen fixed top-0 left-0 flex flex-col p-4">
      {/* Logo / Home Link */}
      <Link href="/" className="text-2xl font-bold text-teal-600">
        MindBodyThrive
      </Link>

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-4">
        <Link href="/dashboard" className="text-lg hover:text-teal-600 p-5 mb-1 hover:bg-gray-100 hover:rounded-lg hover:text-xl">
          Dashboard
        </Link>
        <Link href="/tracking" className="text-lg hover:text-teal-600 p-5 mb-1 hover:bg-gray-100 hover:rounded-lg hover:text-xl">
          Tracking
        </Link>
        <Link href="/groups" className="text-lg hover:text-teal-600 p-5 mb-1 hover:bg-gray-100 hover:rounded-lg hover:text-xl">
          Groups
        </Link>
        <Link href="/support" className="text-lg hover:text-teal-600 p-5 mb-1 hover:bg-gray-100 hover:rounded-lg hover:text-xl">
          Support
        </Link>

        {/* Custom User Info and Logout */}
        {loading ? (
          <p className="text-sm text-gray-300">Loading...</p> // Show a loading indicator
        ) : isLoggedIn ? (
          <div className="flex flex-col space-y-2 mt-8">
            <p className="text-sm text-gray-300">Hello, {user?.name || "User"}</p>
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">
              Logout
            </button>
          </div>
        ) : (
          <Link href={`${authUrl}/login`} className="text-lg hover:text-teal-600 p-5 mb-1">
            Login
          </Link>
        )}
      </nav>
    </aside>
  );
}
