import { useEffect, useState } from 'react';
import { FaShoppingCart, FaBox, FaUsers, FaStar } from 'react-icons/fa';

export const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalProducts: 0,
        totalUsers: 0,
        totalReviews: 0,
    });

    useEffect(() => {
        // TODO: API에서 통계 데이터 조회
        setStats({
            totalOrders: 0,
            totalProducts: 0,
            totalUsers: 0,
            totalReviews: 0,
        });
    }, []);

    const StatCard = ({ icon: Icon, label, value, color }: any) => (
        <div className="admin-stat-card">
            <div className="admin-stat-icon" style={{ color }}>
                <Icon />
            </div>
            <div className="admin-stat-info">
                <h3>{label}</h3>
                <p className="admin-stat-value">{value}</p>
            </div>
        </div>
    );

    return (
        <div className="admin-content-wrapper">
            <div className="admin-content-header">
                <h1>대시보드</h1>
                <p>전체 통계 및 주요 지표를 확인하세요</p>
            </div>

            <div className="admin-stats-grid">
                <StatCard
                    icon={FaShoppingCart}
                    label="총 주문 수"
                    value={stats.totalOrders}
                    color="#f7a815"
                />
                <StatCard
                    icon={FaBox}
                    label="등록된 상품"
                    value={stats.totalProducts}
                    color="#3498db"
                />
                <StatCard
                    icon={FaUsers}
                    label="총 사용자"
                    value={stats.totalUsers}
                    color="#2ecc71"
                />
                <StatCard
                    icon={FaStar}
                    label="총 리뷰"
                    value={stats.totalReviews}
                    color="#e74c3c"
                />
            </div>

            <div className="admin-dashboard-sections">
                <div className="admin-dashboard-section">
                    <h2>최근 주문</h2>
                    <div className="admin-empty-message">
                        <p>최근 주문 데이터가 없습니다.</p>
                    </div>
                </div>

                <div className="admin-dashboard-section">
                    <h2>최근 리뷰</h2>
                    <div className="admin-empty-message">
                        <p>최근 리뷰 데이터가 없습니다.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
