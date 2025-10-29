import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export const authContext = createContext<any | null>(null);

export function AuthProvider({ children }: any) {
    const navigation = useNavigate();
    const [user, setUser] = useState<any>(null);
    const [userType, setUserType] = useState<'user' | 'admin' | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const auth = async () => {
        try {
            const storedUserType = sessionStorage.getItem('userType');

            // userType에 따라 다른 엔드포인트 호출
            const endpoint =
                storedUserType === 'admin'
                    ? `${process.env.REACT_APP_SERVER_URL}/admin/auth/me`
                    : `${process.env.REACT_APP_SERVER_URL}/auth/me`;

            let response = await fetch(endpoint, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
                },
            });

            if (storedUserType === 'user' && response.status === 401) {
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
                    setUserType(null);
                    setLoading(false);
                    return;
                }

                const refreshData = await refreshRes.json();
                sessionStorage.setItem('access_token', refreshData.access_token);

                response = await fetch(endpoint, {
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
                setUserType(storedUserType as 'user' | 'admin');
            } else {
                sessionStorage.clear();
                Cookies.remove('resfresh_token');
                setUser(null);
                setUserType(null);
            }
        } catch (e) {
            sessionStorage.clear();
            Cookies.remove('resfresh_token');
            setUser(null);
            setUserType(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = sessionStorage.getItem('access_token');
        const storedUserType = sessionStorage.getItem('userType');

        if (token && storedUserType) {
            setUserType(storedUserType as 'user' | 'admin');
            auth();
        } else {
            setLoading(false);
        }
    }, [navigation]);

    return (
        <authContext.Provider value={{ user, userType, setUser, setUserType, loading }}>
            {children}
        </authContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
};
