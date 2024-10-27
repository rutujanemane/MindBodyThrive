// import { SignIn } from '@clerk/nextjs'

// export default function SignInPage() {
//   return  <SignIn />
// }


"use client";

import { AuthProvider } from "@propelauth/react";

export default function LoginPage() {
    const authUrl = process.env.NEXT_PUBLIC_PROPELAUTH_AUTH_URL;
    const handleLogin = () => {
        window.location.href = `${authUrl}/login`; // Redirect to the login page directly
    };

    const handleLogout = () => {
        const authUrl = process.env.NEXT_PUBLIC_PROPELAUTH_AUTH_URL;
        
        // Force logout and redirect
        fetch("/api/logout")
            .then(() => {
                // Force reload to bypass cache
                window.location.href = "http://localhost:3000";
            })
            .catch(err => console.log("Logout error:", err));
    };
    
    

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Login to MindBodyThrive</h2>
            <button 
                onClick={handleLogin}
                className="bg-teal-600 text-white py-2 px-6 rounded hover:bg-teal-500"
            >
                Login with PropelAuth
            </button>
            <button 
                onClick={handleLogout}
                className="mt-4 bg-red-600 text-white py-2 px-6 rounded hover:bg-red-500"
            >
                Logout
            </button>
        </div>
    );
}
