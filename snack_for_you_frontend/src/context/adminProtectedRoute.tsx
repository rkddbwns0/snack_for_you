import { JSX } from 'react';
import { useAuth } from './context.tsx';
import { Navigate } from 'react-router-dom';

interface AdminProtectedRouteProps {
    children: JSX.Element;
}

export default function AdminProtectedRoute({ children }: AdminProtectedRouteProps) {
    const { user, userType, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    // admin만 접근 가능 (user는 접근 불가)
    if (!user || userType !== 'admin') return <Navigate to="/admin/login" />;

    return children;
}
