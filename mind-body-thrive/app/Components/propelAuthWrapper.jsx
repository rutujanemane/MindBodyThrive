"use client";

import { AuthProvider } from "@propelauth/react";

export default function PropelAuthWrapper({ children }) {
    return (
        <AuthProvider authUrl={process.env.NEXT_PUBLIC_PROPELAUTH_AUTH_URL}>
            {children}
        </AuthProvider>
    );
}
