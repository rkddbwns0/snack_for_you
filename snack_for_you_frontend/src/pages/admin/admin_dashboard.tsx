import { useEffect, useState } from 'react';
import React from 'react';
import { FaShoppingCart, FaBox, FaUsers, FaStar } from 'react-icons/fa';
import { AdminApi } from '../../api/admin.api.tsx';

export const AdminDashboard = () => {
    const adminApi = new AdminApi();
    const [dashboardData, setDashboardData] = useState<any>(null);
    const [recentOrders, setRecentOrders] = useState<any>(null);
    const [recentReviews, setRecentReviews] = useState<any>(null);

    const getDashboardData = async () => {
        const data = await adminApi.getDashboardData();
        console.log(data);
        setDashboardData(data?.dashboardData);
        setRecentOrders(data?.recentData?.orders);
        setRecentReviews(data?.recentData?.reviews);
    };

    useEffect(() => {
        getDashboardData();
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
                <StatCard icon={FaShoppingCart} label="총 주문 수" value={dashboardData?.orders} color="#f7a815" />
                <StatCard icon={FaBox} label="등록된 상품" value={dashboardData?.snacks} color="#3498db" />
                <StatCard icon={FaUsers} label="총 사용자" value={dashboardData?.users} color="#2ecc71" />
                <StatCard icon={FaStar} label="총 리뷰" value={dashboardData?.reviews} color="#e74c3c" />
            </div>

            <div className="admin-dashboard-sections">
                <div className="admin-dashboard-section">
                    <h2>최근 주문</h2>
                    <div className="admin-orders-container">
                        {recentOrders ? (
                            <div className="admin-orders-list">
                                {recentOrders.map((item: any) => (
                                    <div key={item.order_id} className="admin-order-item">
                                        <div className="admin-order-left">
                                            <div className="admin-order-image-container">
                                                <img
                                                    src={item.snack_image}
                                                    alt={item.snack_name}
                                                    className="admin-order-image"
                                                />
                                                <span className="admin-order-quantity-badge">
                                                    {item.order_quantity}개
                                                </span>
                                            </div>
                                        </div>
                                        <div className="admin-order-middle">
                                            <h3>{item.snack_name}</h3>
                                            <div className="admin-order-basic-info">
                                                <p className="admin-order-user">
                                                    <strong>주문자:</strong> {item.user_nickname}
                                                </p>
                                            </div>
                                            <div className="admin-order-address-section">
                                                <div className="admin-address-box">
                                                    <p className="admin-address-receiver">
                                                        <strong>수령인:</strong> {item.address_name}
                                                    </p>
                                                    <p className="admin-address-line">
                                                        <strong>배송지:</strong> {item.address_road_name}{' '}
                                                        {item.address_detail_address}
                                                    </p>
                                                    {item.address_request && (
                                                        <p className="admin-address-request">
                                                            💬 {item.address_request}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="admin-order-right">
                                            <div className={`admin-order-status admin-status-${item.status}`}>
                                                {item.status}
                                            </div>
                                            <p className="admin-order-price">{item.total_price.toLocaleString()}원</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="admin-empty-message">
                                <p>최근 주문 데이터가 없습니다.</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="admin-dashboard-section">
                    <h2>최근 리뷰</h2>
                    <div className="admin-reviews-container">
                        {recentReviews ? (
                            <div className="admin-reviews-list">
                                {recentReviews.map((item: any) => (
                                    <div key={item.review_id} className="admin-review-item">
                                        <div className="admin-review-header">
                                            <div className="admin-review-user-info">
                                                <div className="admin-review-avatar">
                                                    {item.user_nickname.charAt(0)}
                                                </div>
                                                <div className="admin-review-user-detail">
                                                    <p className="admin-review-username">{item.user_nickname}</p>
                                                    <p className="admin-review-date">{item.review_writed_at}</p>
                                                </div>
                                            </div>
                                            <div className="admin-review-score-badge">{item.review_score}★</div>
                                        </div>
                                        <div className="admin-review-content-section">
                                            <div className="admin-review-product">
                                                <img
                                                    src={item.snack_image}
                                                    alt={item.snack_name}
                                                    className="admin-review-image"
                                                />
                                                <div className="admin-review-product-info">
                                                    <p className="admin-review-product-name">{item.snack_name}</p>
                                                    <p className="admin-review-product-quantity">
                                                        ({item.order_quantity}개)
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="admin-review-text">{item.review_content}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="admin-empty-message">
                                <p>최근 리뷰 데이터가 없습니다.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
