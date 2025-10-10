import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/context.tsx';
import { useEffect, useState } from 'react';
import { AddressApi } from '../api/address.api.tsx';
import { AddressModal } from '../component/address_modal.tsx';

export const Order = () => {
    const navigation = useNavigate();
    const { user } = useAuth();
    const addressApi = new AddressApi();
    const location = useLocation();
    const order_items = location.state;
    const [address, setAddress] = useState<any>(null);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [isOpen, setIsOpen] = useState<boolean>(false);
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
        if (isOpen === false) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
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
        order_items.map((item: any) => {
            total += item.price;
        });
        setTotalPrice(total);
    };

    useEffect(() => {
        basic_address();
        order_total_price();
    }, []);

    return (
        <div>
            <div>
                <h3>주문</h3>
            </div>
            <div>
                <div>
                    <p>주문자 : {user.nickname}</p>
                </div>
                <div>
                    {address !== null ? (
                        <div>
                            <div>
                                <p>받는 사람 : {address.name}</p>
                            </div>
                            <div>
                                <p>
                                    주소 : {address.road_name} {address.detail_address}
                                </p>
                            </div>
                            <div>
                                <button>주소 변경하기</button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <p>기본 주소를 등록해 주세요.</p>
                            <div>
                                <button>기본 주소 등록하기</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div>
                {order_items.map((item: any) => {
                    return (
                        <div key={item.cart_item_id}>
                            <div>
                                <img src={item.product_image} style={{ width: '100px', height: '100px' }} />
                            </div>
                            <div>
                                <p>제품명 : {item.name}</p>
                                <p>수량 : {item.quantity}개</p>
                                <p>가격 : {item.price}원</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div>
                <h3>총 구매금액: {totalPrice}원</h3>
            </div>
            <div>
                <h4>결제 방식</h4>
                <div>
                    {payment.map((item: any) => {
                        return (
                            <div key={item.id}>
                                <button>
                                    <img src={item.image} style={{ width: '100px', height: '100px' }} />
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div>
                <button>주문하기</button>
            </div>
            <AddressModal isOpen={isOpen} setIsOpen={handleOpen} />
        </div>
    );
};
