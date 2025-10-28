import React, { useEffect, useState } from 'react';
import { FaBox, FaList, FaStar, FaUsers, FaChartBar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import logoImg from '../img/snack_for_you_logo.png';
import '../css/admin.css';
import { AdminDashboard } from './admin/admin_dashboard.tsx';
import { AdminProductRegister } from './admin/admin_product_register.tsx';
import { AdminProductManage } from './admin/admin_product_manage.tsx';
import { AdminReviewManage } from './admin/admin_review_manage.tsx';
import { AdminUserManage } from './admin/admin_user_manage.tsx';

export const Admin = () => {
    const navigation = useNavigate();
    const [activeMenu, setActiveMenu] = useState<string>('dashboard');

    const menuItems = [
        { id: 'dashboard', label: '대시보드', icon: FaChartBar },
        { id: 'product-register', label: '제품 등록', icon: FaBox },
        { id: 'product-manage', label: '제품 관리', icon: FaList },
        { id: 'review-manage', label: '리뷰 관리', icon: FaStar },
        { id: 'user-manage', label: '사용자 관리', icon: FaUsers },
    ];

    const renderContent = () => {
        switch (activeMenu) {
            case 'dashboard':
                return <AdminDashboard />;
            case 'product-register':
                return <AdminProductRegister />;
            case 'product-manage':
                return <AdminProductManage />;
            case 'review-manage':
                return <AdminReviewManage />;
            case 'user-manage':
                return <AdminUserManage />;
            default:
                return <AdminDashboard />;
        }
    };

    return (
        <div className="admin-wrapper">
            {/* 관리자 헤더 */}
            <header className="admin-header">
                <div className="admin-header-left">
                    <img src={logoImg} alt="logo" className="admin-logo" />
                    <h2 className="admin-header-title">Snack For You 관리자</h2>
                </div>
                <div className="admin-header-right">
                    {/* {user ? (
                        <div className="admin-header-user">
                            <span className="admin-user-name">{user?.nickname}님</span>
                            <button className="admin-logout-btn" onClick={handleLogout}>
                                <FaSignOutAlt />
                                로그아웃
                            </button>
                        </div>
                    ) : (
                        <button 
                            className="admin-login-btn"
                            onClick={() => navigation('/admin_login')}
                        >
                            관리자 로그인
                        </button>
                    )}
                        */}
                </div>
                <button className="admin-login-btn" onClick={() => navigation('/admin/login')}>
                    관리자 로그인
                </button>
            </header>

            <div className="admin-container">
                <div className="admin-sidebar">
                    <div className="admin-sidebar-header">
                        <h2>메뉴</h2>
                    </div>
                    <nav className="admin-sidebar-menu">
                        {menuItems.map((item) => {
                            const IconComponent = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    className={`admin-menu-item ${activeMenu === item.id ? 'active' : ''}`}
                                    onClick={() => setActiveMenu(item.id)}
                                >
                                    <IconComponent className="admin-menu-icon" />
                                    <span>{item.label}</span>
                                </button>
                            );
                        })}
                    </nav>
                </div>

                <div className="admin-content">{renderContent()}</div>
            </div>
        </div>
    );
};
