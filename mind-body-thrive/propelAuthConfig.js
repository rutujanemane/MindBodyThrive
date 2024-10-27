import { AuthProvider } from "@propelauth/react";

export const PropelAuthProvider = ({ children }) => (
    <AuthProvider authUrl={process.env.NEXT_PUBLIC_PROPELAUTH_AUTH_URL}>
        {children}
    </AuthProvider>
);
