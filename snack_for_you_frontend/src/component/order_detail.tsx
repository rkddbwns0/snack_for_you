import { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { AdminApi } from '../api/admin.api.tsx';
import '../css/order_detail.css';

interface OrderData {
    order_id: number;
    user_nickname: string;
    recipient_name: string;
    road_name: string;
    detail_address: string;
    request: string;
    payment_method: string;
    total_price: number;
    order_date: string;
    status: string;
}

export const OrderDetail = ({
    isOpen,
    setIsOpen,
    orderData,
}: {
    isOpen: boolean;
    setIsOpen: () => void;
    orderData?: OrderData;
}) => {
    const adminApi = new AdminApi();
    const [orderItems, setOrderItems] = useState<any>([]);

    const getOrderItems = async () => {
        if (orderData && orderData.order_id) {
            const data = await adminApi.getOrderDetail(orderData.order_id);

            setOrderItems(data);
        }
    };

    useEffect(() => {
        if (orderData && orderData.order_id) {
            getOrderItems();
        }
    }, [orderData?.order_id]);

    if (!isOpen || !orderData) return null;

    return (
        <div className="order-detail-overlay" onClick={setIsOpen}>
            <div className="order-detail-modal" onClick={(e) => e.stopPropagation()}>
                <div className="order-detail-header">
                    <h2>주문 상세보기</h2>
                    <button className="order-detail-close-btn" onClick={setIsOpen}>
                        <FaTimes />
                    </button>
                </div>

                <div className="order-detail-body">
                    {/* 주문 정보 섹션 */}
                    <div className="order-detail-section">
                        <h3>주문 정보</h3>
                        <div className="order-info-grid">
                            <div className="order-info-item">
                                <label>주문번호</label>
                                <p>{orderData.order_id}</p>
                            </div>
                            <div className="order-info-item">
                                <label>주문날짜</label>
                                <p>{orderData.order_date}</p>
                            </div>
                            <div className="order-info-item">
                                <label>주문상태</label>
                                <p>
                                    <span className={`order-status-badge order-status-${orderData.status}`}>
                                        {orderData.status}
                                    </span>
                                </p>
                            </div>
                            <div className="order-info-item">
                                <label>총 주문금액</label>
                                <p className="order-total-price">{orderData.total_price?.toLocaleString()}원</p>
                            </div>
                        </div>
                    </div>

                    {/* 주문 상품 섹션 */}
                    {orderItems && orderItems.length > 0 && (
                        <div className="order-detail-section">
                            <h3>주문 상품</h3>
                            <div className="order-items-list">
                                {orderItems.map((item: any, index: number) => (
                                    <div key={index} className="order-item-card">
                                        <img
                                            src={item.snack_image}
                                            alt={item.snack_name}
                                            className="order-item-image"
                                        />
                                        <div className="order-item-details">
                                            <p className="order-item-name">{item.snack_name}</p>
                                            <p className="order-item-qty">수량: {item.order_quantity}개</p>
                                            <p className="order-item-price">{item.price * item.order_quantity} 원</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 배송 정보 섹션 */}
                    <div className="order-detail-section">
                        <h3>배송 정보</h3>
                        <div className="order-address-box">
                            <div className="address-row">
                                <strong>수령인:</strong>
                                <span>{orderData.recipient_name}</span>
                            </div>
                            <div className="address-row">
                                <strong>주소:</strong>
                                <span>
                                    {orderData.road_name} {orderData.detail_address}
                                </span>
                            </div>
                            {orderData.request && (
                                <div className="address-row">
                                    <strong>요청사항:</strong>
                                    <span className="order-request-text">💬 {orderData.request}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 결제 정보 섹션 */}
                    <div className="order-detail-section">
                        <h3>결제 정보</h3>
                        <div className="order-payment-box">
                            <p>{orderData.payment_method}</p>
                        </div>
                    </div>
                </div>

                <div className="order-detail-footer">
                    <button className="order-close-button" onClick={setIsOpen}>
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
};
