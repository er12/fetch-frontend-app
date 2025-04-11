// components/ClientLayout.tsx
'use client';

import { UserProvider } from "../api/context/UserContext";
import NavBar from "./NavBar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <UserProvider>
            <NavBar />
            {children}
        </UserProvider>
    );
}
