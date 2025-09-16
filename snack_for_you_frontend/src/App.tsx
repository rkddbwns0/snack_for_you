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

const AppContent = () => {
    const location = useLocation();
    const hideContent = ['/admin', '/admin/login'];

    const shouleHide = !hideContent.includes(useLocation().pathname);

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
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin" element={<AdminMain />} />
                </Routes>
            </div>
        </>
    );
};
function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <AppContent />
            </BrowserRouter>
        </div>
    );
}

export default App;
