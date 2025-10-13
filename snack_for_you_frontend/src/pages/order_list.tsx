import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/context.tsx';
import { OrderApi } from '../api/order.api.tsx';
import { useEffect, useState } from 'react';

export const OrderList = () => {
    const navigation = useNavigate();
    const { user } = useAuth();
    const orderApi = new OrderApi();
    const [orderList, setOrderList] = useState<any[]>([]);

    const getAllOrder = async () => {
        const data = await orderApi.getAllOrder(user.user_id);

        setOrderList(data);
    };

    useEffect(() => {
        getAllOrder();
    }, []);

    return (
        <div>
            <div>
                <h3>주문내역</h3>
            </div>
            <div>
                {orderList &&
                    orderList.map((item: any) => {
                        return (
                            <div
                                key={item.order_id}
                                onClick={() => navigation('/receipt', { state: { order_id: item.order_id } })}
                            >
                                <p>주문상태 : {item.name}</p>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};
