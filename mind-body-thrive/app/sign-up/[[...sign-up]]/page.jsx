// // app/sign-up/[[...sign-up]]/page.jsx

// import { SignUp } from '@clerk/nextjs';

// export default function signUpPage() {
//   return (
//     <div>
//       <h1>Create an Account</h1>
//       <SignUp />
//     </div>
//   );
// }


"use client";

export default function SignupPage() {
    const authUrl = process.env.NEXT_PUBLIC_PROPELAUTH_AUTH_URL;

    const handleSignup = () => {
        window.location.href = `${authUrl}/signup`;
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Create Your Account</h2>
            <button 
                onClick={handleSignup}
                className="bg-teal-600 text-white py-2 px-6 rounded hover:bg-teal-500"
            >
                Signup with PropelAuth
            </button>
        </div>
    );
}
