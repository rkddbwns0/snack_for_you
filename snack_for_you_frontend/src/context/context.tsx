import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const authContext = createContext<any | null>(null);

export function AuthProvider({ children }: any) {
    const navigation = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const auth = async () => {
        try {
            let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/me`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
                },
            });

            if (response.status === 401) {
                const refreshRes = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/refresh`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!refreshRes.ok) {
                    sessionStorage.clear();
                    setUser(null);
                    setLoading(false);
                    return;
                }

                const refreshData = await refreshRes.json();
                sessionStorage.setItem('access_token', refreshData.access_token);

                response = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/me`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
                    },
                });
            }

            if (response.ok) {
                const data = await response.json();
                sessionStorage.setItem('user', JSON.stringify(data));
                setUser(data);
            } else {
                sessionStorage.clear();
                setUser(null);
            }
        } catch (e) {
            sessionStorage.clear();
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        auth();
    }, [navigation]);

    return <authContext.Provider value={{ user, setUser, loading }}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
};
