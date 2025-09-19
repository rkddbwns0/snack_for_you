import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './css/App.css';
import { AppHeader } from './component/app-header.tsx';
import { Main } from './pages/main.tsx';
import { MenuBar } from './component/menu-bar.tsx';
import { Login } from './pages/login.tsx';
import { AdminLogin } from './pages/admin_login.tsx';
import { AdminMain } from './pages/admin_main.tsx';
import { SnackList } from './pages/snack_list.tsx';
import { Signup } from './pages/signup.tsx';
import ProtectedRoute from './context/protectedRoute.tsx';
import { AuthProvider } from './context/context.tsx';
import { MyPage } from './pages/myPage.tsx';
import { EditUser } from './pages/edti_user.tsx';
import { AddessInfo } from './pages/address_info.tsx';

const AppContent = () => {
    const location = useLocation();
    const hideContent = ['/admin', '/admin/login'];
    const shouleHide = !hideContent.includes(location.pathname);

    return (
        <>
            {shouleHide && (
                <>
                    <AppHeader />
                    <MenuBar />
                </>
            )}
            <div style={{ paddingTop: shouleHide ? '' : 'calc(10vmin)' }}>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/snack_list/:category_id" element={<SnackList />} />
                    <Route
                        path="/myPage"
                        element={
                            <ProtectedRoute>
                                <MyPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/edit_user/:user_id"
                        element={
                            <ProtectedRoute>
                                <EditUser />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/address_info"
                        element={
                            <ProtectedRoute>
                                <AddessInfo />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute>
                                <AdminMain />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </div>
        </>
    );
};
function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <AuthProvider>
                    <AppContent />
                </AuthProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
