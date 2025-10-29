import { JSX, useEffect } from 'react';
import { useAuth } from './context.tsx';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: JSX.Element;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { user, userType, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    // user만 접근 가능 (admin은 접근 불가)
    if (!user || userType !== 'user') return <Navigate to="/" />;

    return children;
}
