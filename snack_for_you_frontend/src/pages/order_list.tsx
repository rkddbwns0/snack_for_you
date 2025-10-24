import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/context.tsx';
import { OrderApi } from '../api/order.api.tsx';
import { useEffect, useState } from 'react';
import '../css/common.css';

export const OrderList = () => {
    const navigation = useNavigate();
    const { user } = useAuth();
    const orderApi = new OrderApi();
    const [orderList, setOrderList] = useState<any[]>([]);

    const getAllOrder = async () => {
        const data = await orderApi.getAllOrder(user.user_id);
        console.log(data);
        setOrderList(data);
    };

    useEffect(() => {
        getAllOrder();
    }, []);

    return (
        <div className="page-wrapper">
            <div className="content-box">
                <div className="page-container">
                    <div className="page-content-wrapper">
                        <div className="page-card">
                            <h1 className="page-title">주문내역</h1>
                            
                            {orderList && orderList.length > 0 ? (
                                <div className="order-list-container">
                                    {orderList.map((item: any) => {
                                        return (
                                            <div key={item.order_id} className="order-list-item">
                                                <div 
                                                    className="order-list-content"
                                                    onClick={() => navigation('/receipt', { state: { order_id: item.order_id } })}
                                                >
                                                    <div className="order-list-info">
                                                        <h3 className="order-list-title">주문 #{item.order_id}</h3>
                                                        <p className="order-list-status">주문상태: {item.name}</p>
                                                        <p className="order-list-date">주문일: {item.order_date}</p>
                                                    </div>
                                                    <div className="order-list-arrow">
                                                        →
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="snack-empty-message">
                                    <h3>주문내역이 없습니다.</h3>
                                    <p>상품을 주문해보세요!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
