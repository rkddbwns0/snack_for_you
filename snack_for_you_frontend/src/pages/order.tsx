import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/context.tsx';
import { useEffect, useState } from 'react';
import { AddressApi } from '../api/address.api.tsx';
import { AddressModal } from '../component/address_modal.tsx';
import { OrderApi } from '../api/order.api.tsx';
import '../css/order.css';

export const Order = () => {
    const navigation = useNavigate();
    const { user } = useAuth();
    const addressApi = new AddressApi();
    const orderApi = new OrderApi();
    const location = useLocation();
    const order_items = location.state.items;
    const cart = location.state.cart;
    const [address, setAddress] = useState<any>(null);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [checkPayment, setCheckPayment] = useState<string>('');
    const payment = [
        {
            id: 0,
            image: '../img/tosspay.png',
            value: 'tosspay',
        },
        {
            id: 1,
            name: '카카오페이',
            value: 'kakaopay',
        },
        {
            id: 2,
            name: '네이버페이',
            value: 'naverpay',
        },
    ];

    const handleOpen = () => {
        setIsOpen(!isOpen);
    };

    const basic_address = async () => {
        try {
            const data = await addressApi.basicAddress(user.user_id);
            setAddress(data);
        } catch (e) {
            console.error(e);
        }
    };

    const order_total_price = () => {
        let total = 0;
        order_items.forEach((item: any) => {
            total += item.price;
        });
        setTotalPrice(total);
    };

    const handleOrder = async () => {
        if (!address) {
            alert('배송지를 선택해주세요.');
            return;
        }
        if (checkPayment === '') {
            alert('결제 방식을 선택해주세요.');
            return;
        }
        try {
            const data = await orderApi.insertOrder({
                cart: cart,
                user_id: user.user_id,
                address_id: address.address_id,
                totalPrice: totalPrice,
                payment_method: checkPayment,
                items: order_items,
            });

            if (data?.status === 200) {
                alert('구매가 완료되었습니다.');
                navigation('/receipt', { state: { order_id: data.order_id } });
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        basic_address();
        order_total_price();
    }, []);

    return (
        <div className="page-container">
            <div className="order-container">
                <h2>주문/결제</h2>

                <div className="order-section">
                    <h3>배송 정보</h3>
                    <div className="orderer-details">
                        <p><strong>주문자:</strong> {user.nickname}</p>
                    </div>
                    <hr />
                    <div className="address-details">
                        {address ? (
                            <div>
                                <p><strong>받는 사람:</strong> {address.name}</p>
                                <p><strong>주소:</strong> {address.address}</p>
                                <button onClick={handleOpen}>주소 변경하기</button>
                            </div>
                        ) : (
                            <div>
                                <p>기본 배송지를 등록해주세요.</p>
                                <button onClick={handleOpen}>배송지 선택</button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="order-section">
                    <h3>주문 상품</h3>
                    <div className="order-item-list">
                        {order_items.map((item: any) => (
                            <div key={item.cart_item_id || item.snack_id} className="order-item">
                                <img src={item.product_image} alt={item.name} />
                                <div className="order-item-details">
                                    <p><strong>{item.name}</strong></p>
                                    <p>수량: {item.quantity}개</p>
                                </div>
                                <p>{item.price}원</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="order-section">
                    <h3>결제 방식</h3>
                    <div className="payment-options">
                        {payment.map((item: any) => (
                            <button
                                key={item.id}
                                onClick={() => setCheckPayment(item.value)}
                                className={`payment-btn ${checkPayment === item.value ? 'selected' : ''}`}
                            >
                                {item.name || <img src={item.image} alt={item.value} style={{ width: '80px'}} />}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="total-price">
                    <p>총 결제금액: {totalPrice}원</p>
                </div>

                <button className="order-action-btn" onClick={handleOrder}>결제하기</button>
            </div>
            <AddressModal isOpen={isOpen} setIsOpen={handleOpen} address_id={address?.address_id} />
        </div>
    );
};
