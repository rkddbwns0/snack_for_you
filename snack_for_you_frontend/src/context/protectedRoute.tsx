import { JSX, useEffect } from 'react';
import { useAuth } from './context.tsx';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: JSX.Element;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { user, loading, login } = useAuth();
    if (loading) return <div>Loading...</div>;
    if (!user && !login) return <Navigate to="/" />;
    return children;
}
