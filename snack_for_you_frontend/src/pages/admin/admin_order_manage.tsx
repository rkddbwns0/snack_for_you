import { useEffect, useState } from 'react';
import { AdminApi } from '../../api/admin.api.tsx';
import { OrderDetail } from '../../component/order_detail.tsx';

export const AdminOrderManage = () => {
    const adminApi = new AdminApi();
    const [orderList, setOrderList] = useState<any>([]);
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const getAllOrderList = async () => {
        const data = await adminApi.getAllOrderList();
        setOrderList(data);
    };

    const handleOrderStatus = async (order_id: number, status: string) => {
        const data = await adminApi.changeOrderStatus(order_id, status);

        if (data?.status === 200) {
            alert(data.data.message);
            getAllOrderList();
        }
    };

    const handleOpenModal = (order: any) => {
        setSelectedOrder(order);
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedOrder(null);
        setIsOpen(false);
    };

    useEffect(() => {
        getAllOrderList();
    }, []);

    return (
        <div className="admin-content-wrapper admin-order-manage">
            <div className="admin-content-header">
                <h1>주문 관리</h1>
                <p>모든 주문 현황을 확인하고 관리하세요</p>
            </div>

            <div className="admin-table-container">
                {orderList && orderList.length > 0 ? (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>주문번호</th>
                                <th>상품명</th>
                                <th>주문자</th>
                                <th>수령자</th>
                                <th>가격</th>
                                <th>주문날짜</th>
                                <th>상태</th>
                                <th>관리</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderList.map((item: any, index: number) => (
                                <tr key={`order-${item?.order_id}-${index}`}>
                                    <td>{item?.order_id}</td>
                                    <td className="admin-order-snack-name">
                                        <img
                                            src={item.snack_image}
                                            alt={item.snack_name}
                                            className="admin-table-image"
                                        />
                                        <span className="admin-snack-name-text">
                                            {item.snack_name.length > 6
                                                ? item.snack_name.substring(0, 6) + '...'
                                                : item.snack_name}
                                        </span>
                                    </td>
                                    <td>{item.user_nickname}</td>
                                    <td>{item.recipient_name}</td>
                                    <td className="admin-order-price">{item.total_price?.toLocaleString()}원</td>
                                    <td>{item.order_date}</td>
                                    <td>
                                        <select
                                            defaultValue={item.status}
                                            onChange={(e) => handleOrderStatus(item.order_id, e.target.value)}
                                        >
                                            <option
                                                disabled={item.status === '주문 완료' ? true : false}
                                                value="주문 완료"
                                            >
                                                주문 완료
                                            </option>
                                            <option
                                                disabled={item.status === '배송 준비' ? true : false}
                                                value="배송 준비"
                                            >
                                                배송 준비
                                            </option>
                                            <option disabled={item.status === '배송 중' ? true : false} value="배송 중">
                                                배송 중
                                            </option>
                                            <option
                                                disabled={item.status === '배송 완료' ? true : false}
                                                value="배송 완료"
                                            >
                                                배송 완료
                                            </option>
                                            <option
                                                disabled={item.status === '주문 취소' ? true : false}
                                                value="주문 취소"
                                            >
                                                주문 취소
                                            </option>
                                        </select>
                                    </td>
                                    <td>
                                        <button onClick={() => handleOpenModal(item)}>상세 정보</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="admin-empty-message">
                        <p>주문 데이터가 없습니다.</p>
                    </div>
                )}
            </div>
            <OrderDetail isOpen={isOpen} setIsOpen={handleCloseModal} orderData={selectedOrder} />
        </div>
    );
};
