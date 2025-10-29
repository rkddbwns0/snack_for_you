import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './css/App.css';
import './css/global.css';
import './css/page.css';
import './css/admin.css';
import './css/search.css';
import { AppHeader } from './component/app-header.tsx';
import { Main } from './pages/main.tsx';
import { MenuBar } from './component/menu-bar.tsx';
import { Login } from './pages/login.tsx';
import { AdminLogin } from './pages/admin_login.tsx';
import { Admin } from './pages/admin.tsx';
import { SnackList } from './pages/snack_list.tsx';
import { Signup } from './pages/signup.tsx';
import ProtectedRoute from './context/protectedRoute.tsx';
import AdminProtectedRoute from './context/adminProtectedRoute.tsx';
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
import { Search } from './pages/search.tsx';

// 사용자 페이지 레이아웃
const UserLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <AppHeader />
            <MenuBar />
            {children}
        </>
    );
};

// 관리자 페이지 레이아웃
const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>;
};

const AppContent = () => {
    const location = useLocation();
    const isAdminPath = location.pathname.startsWith('/admin');

    return (
        <Routes>
            {/* 관리자 라우트 */}
            <Route
                path="/admin/login"
                element={
                    <AdminLayout>
                        <AdminLogin />
                    </AdminLayout>
                }
            />
            <Route
                path="/admin/*"
                element={
                    <AdminLayout>
                        <AdminProtectedRoute>
                            <Admin />
                        </AdminProtectedRoute>
                    </AdminLayout>
                }
            />

            {/* 사용자 라우트 */}
            <Route
                path="/"
                element={
                    <UserLayout>
                        <Main />
                    </UserLayout>
                }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
                path="/snack_list/:category_id"
                element={
                    <UserLayout>
                        <SnackList />
                    </UserLayout>
                }
            />
            <Route
                path="/snack_detail/:snack_id"
                element={
                    <UserLayout>
                        <SnackDetail />
                    </UserLayout>
                }
            />
            <Route
                path="/cart"
                element={
                    <UserLayout>
                        <ProtectedRoute>
                            <Cart />
                        </ProtectedRoute>
                    </UserLayout>
                }
            />
            <Route
                path="/order"
                element={
                    <UserLayout>
                        <ProtectedRoute>
                            <Order />
                        </ProtectedRoute>
                    </UserLayout>
                }
            />
            <Route
                path="/receipt"
                element={
                    <UserLayout>
                        <ProtectedRoute>
                            <Receipt />
                        </ProtectedRoute>
                    </UserLayout>
                }
            />
            <Route
                path="/myPage"
                element={
                    <UserLayout>
                        <ProtectedRoute>
                            <MyPage />
                        </ProtectedRoute>
                    </UserLayout>
                }
            />
            <Route
                path="/orderList"
                element={
                    <UserLayout>
                        <ProtectedRoute>
                            <OrderList />
                        </ProtectedRoute>
                    </UserLayout>
                }
            />
            <Route
                path="/review"
                element={
                    <UserLayout>
                        <ProtectedRoute>
                            <Review />
                        </ProtectedRoute>
                    </UserLayout>
                }
            />
            <Route
                path="/reviewList"
                element={
                    <UserLayout>
                        <ProtectedRoute>
                            <ReviewList />
                        </ProtectedRoute>
                    </UserLayout>
                }
            />
            <Route
                path="/edit_user/:user_id"
                element={
                    <UserLayout>
                        <ProtectedRoute>
                            <EditUser />
                        </ProtectedRoute>
                    </UserLayout>
                }
            />
            <Route
                path="/address_info"
                element={
                    <UserLayout>
                        <ProtectedRoute>
                            <AddessInfo />
                        </ProtectedRoute>
                    </UserLayout>
                }
            />
            <Route
                path="/favorite"
                element={
                    <UserLayout>
                        <ProtectedRoute>
                            <Favorite />
                        </ProtectedRoute>
                    </UserLayout>
                }
            />
            <Route
                path="/search"
                element={
                    <UserLayout>
                        <Search />
                    </UserLayout>
                }
            />
        </Routes>
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
