import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './css/App.css';
import './css/global.css';
import './css/page.css';
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
import { EditUser } from './pages/edit_user.tsx';
import { AddessInfo } from './pages/address_info.tsx';
import { SnackDetail } from './pages/snack_detail.tsx';
import { Cart } from './pages/cart.tsx';
import { Order } from './pages/order.tsx';
import { Receipt } from './pages/receipt.tsx';
import { OrderList } from './pages/order_list.tsx';
import { Favorite } from './pages/favorite.tsx';
import { Review } from './pages/review.tsx';
import { ReviewList } from './pages/review_list.tsx';

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
                    <Route path="/snack_detail/:snack_id" element={<SnackDetail />} />
                    <Route
                        path="/cart"
                        element={
                            <ProtectedRoute>
                                <Cart />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/order"
                        element={
                            <ProtectedRoute>
                                <Order />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/receipt"
                        element={
                            <ProtectedRoute>
                                <Receipt />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/myPage"
                        element={
                            <ProtectedRoute>
                                <MyPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/orderList"
                        element={
                            <ProtectedRoute>
                                <OrderList />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/review"
                        element={
                            <ProtectedRoute>
                                <Review />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/reviewList"
                        element={
                            <ProtectedRoute>
                                <ReviewList />
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

                    <Route
                        path="/favorite"
                        element={
                            <ProtectedRoute>
                                <Favorite />
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
