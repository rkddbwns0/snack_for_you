import { useLocation, useNavigate } from 'react-router-dom';
import { OrderApi } from '../api/order.api.tsx';
import { useEffect, useState } from 'react';

export const Receipt = () => {
    const navigation = useNavigate();
    const location = useLocation();
    const order_id = location.state.order_id;
    const orderApi = new OrderApi();
    const [order, setOrder] = useState<any>(null);
    const [order_items, setOrderItems] = useState<any>(null);

    const getReceipt = async () => {
        const data = await orderApi.getOrder(order_id);
        console.log(data);
        setOrder(data?.result?.order);
        setOrderItems(data?.result?.order_items);
    };

    useEffect(() => {
        getReceipt();
    }, []);

    return (
        <div>
            <div>
                <h3>주문 상세내역</h3>
            </div>
            <div>
                <div>
                    <p>주문상태 : {order?.status}</p>
                </div>
                <div>
                    <p>받는 사람 : {order?.name}</p>
                    <p>주소 : {order?.address}</p>
                    <p>요청사항 : {order?.request}</p>
                </div>
                <div>
                    {order_items?.map((item: any) => {
                        return (
                            <div key={item?.order_item_id}>
                                <div>
                                    <img src={item.product_image} style={{ width: '50px', height: '50px' }} />
                                </div>
                                <div>
                                    <p>상품명 : {item.name}</p>
                                    <p>수량 : {item.quantity}</p>
                                    <p>가격 : {item.price}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div>
                    <div>
                        <p>결제일 : {order?.order_date}</p>
                        <p>결제 방식 : {order?.payment_method}</p>
                        <h4>총 금액 : {order?.total_price}원</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};
