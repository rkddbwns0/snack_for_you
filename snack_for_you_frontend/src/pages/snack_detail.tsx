import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/context.tsx';

export const SnackDetail = () => {
    const navigation = useNavigate();
    const { user } = useAuth();
    const snack_id = window.location.pathname.split('/')[2];
    const location = useLocation();
    const category_id = location.state?.category_id;
    const [snack, setSnack] = useState<any>(null);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(1);

    const snack_info = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/snack/${category_id}/${snack_id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });

            const data = await response.json();

            setSnack(data);
        } catch (e) {
            console.error(e);
        }
    };

    const increase = (snack_quantity: number) => {
        if (quantity >= snack_quantity) {
            alert('재고가 부족합니다.');
            return;
        }
        setQuantity(quantity + 1);
    };

    const decrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleCart = async () => {
        if (!user) {
            alert('로그인 후 사용할 수 있습니다.');
            return;
        }
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/cart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
                },
                credentials: 'include',
                body: JSON.stringify({
                    user_id: user.user_id,
                    snack_id: snack_id,
                    quantity: quantity,
                    price: totalPrice,
                }),
            });

            if (response.ok) {
                alert('장바구니에 저장되었습니다.');
                return;
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        if (snack?.price) {
            setTotalPrice(snack?.price * quantity);
        }
    }, [snack?.price, quantity]);

    useEffect(() => {
        snack_info();
    }, [navigation]);
    return (
        <div>
            <div>
                <div>
                    <img src={snack?.product_image} style={{ width: '200px', height: '200px' }} />
                </div>
                <div>
                    <p>{snack?.name}</p>
                    <p>{snack?.category_name}</p>
                    <p>{snack?.brand}</p>
                    <p>{snack?.composition}</p>
                    <p>{snack?.weight}</p>
                    <p>{snack?.price}원</p>
                </div>
            </div>

            <div>
                <div>
                    <h3>총 가격</h3>
                    <h3>{totalPrice}원</h3>
                </div>
                <div>
                    <button onClick={decrease}>-</button>
                    <input
                        type="number"
                        min={1}
                        value={quantity}
                        onChange={(e) => {
                            const value = Number(e.target.value);
                            setQuantity(value < 1 ? 1 : value);
                        }}
                    />
                    <button onClick={() => increase(snack?.quantity)}>+</button>
                </div>
            </div>
            <div>
                <button onClick={handleCart}>장바구니</button>
                <button>구매하기</button>
            </div>
        </div>
    );
};
