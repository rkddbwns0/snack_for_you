import { useLocation, useNavigate } from 'react-router-dom';
import { OrderApi } from '../api/order.api.tsx';
import { useEffect, useState } from 'react';
import '../css/common.css';

export const Receipt = () => {
    const location = useLocation();
    const navigation = useNavigate();
    const order_id = location.state.order_id;
    const orderApi = new OrderApi();
    const [order, setOrder] = useState<any>(null);
    const [order_items, setOrderItems] = useState<any>(null);

    const getReceipt = async () => {
        const data = await orderApi.getOrder(order_id);
        setOrder(data?.result?.order);
        console.log(data);
        setOrderItems(data?.result?.order_items);
    };

    useEffect(() => {
        getReceipt();
    }, []);

    return (
        <div className="page-wrapper">
            <div className="content-box">
                <div className="page-container">
                    <div className="page-content-wrapper">
                        <div className="page-card">
                            <div className="receipt-header">
                                <h1 className="page-title">주문 상세내역</h1>
                            </div>

                            <div className="receipt-section">
                                <h4>주문 정보</h4>
                                <div className="receipt-info">
                                    <p>
                                        <strong>주문 번호:</strong> {order?.order_id}
                                    </p>
                                    <p>
                                        <strong>주문일:</strong> {order?.order_date}
                                    </p>
                                    <p>
                                        <strong>주문 상태:</strong> {order?.status}
                                    </p>
                                </div>
                            </div>

                            <div className="receipt-section">
                                <h4>배송 정보</h4>
                                <div className="receipt-info">
                                    <p>
                                        <strong>받는 사람:</strong> {order?.name}
                                    </p>
                                    <p>
                                        <strong>주소:</strong> {order?.address}
                                    </p>
                                    <p>
                                        <strong>요청사항:</strong> {order?.request}
                                    </p>
                                </div>
                            </div>

                            <div className="receipt-section">
                                <h4>주문 상품</h4>
                                <div className="receipt-item-list">
                                    {order_items?.map((item: any) => (
                                        <div key={item?.order_item_id} className="receipt-item">
                                            <img 
                                                src={item?.product_image} 
                                                className="receipt-item-image"
                                                alt={item.name}
                                            />
                                            <div className="receipt-item-info">
                                                <span className="receipt-item-name">
                                                    {item.name} (x{item.quantity}) {item.price.toLocaleString()}원
                                                </span>
                                            </div>
                                            <div className="receipt-item-action">
                                                {item?.review_status ? (
                                                    <button className="receipt-review-btn disabled" disabled>
                                                        리뷰 작성 완료
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="receipt-review-btn"
                                                        disabled={order?.status !== '배송 완료'}
                                                        onClick={() =>
                                                            navigation('/review', {
                                                                state: {
                                                                    order_item_id: item?.order_item_id,
                                                                    snack_id: item?.snack_id,
                                                                    name: item?.name,
                                                                    image: item?.product_image,
                                                                    quantity: item?.quantity,
                                                                },
                                                            })
                                                        }
                                                    >
                                                        리뷰 작성
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="receipt-total">
                                <p>
                                    <strong>결제 방식:</strong> {order?.payment_method}
                                </p>
                                <p>총 결제금액: {order?.total_price.toLocaleString()}원</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
