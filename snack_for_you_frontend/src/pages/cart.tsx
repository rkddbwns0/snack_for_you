import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/context.tsx';
import { useEffect, useState } from 'react';

export const Cart = () => {
    const navigation = useNavigate();
    const { user } = useAuth();
    const [cartItems, setCartItems] = useState<any>([]);

    const cart_items = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/cart/${user.user_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
                },
                credentials: 'include',
            });

            const data = await response.json();
            console.log(data);
            setCartItems(data);
        } catch (e) {
            console.error(e);
        }
    };

    const handleDeleteCart = async (cart_item_id: number) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/cart/${cart_item_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
                },
                credentials: 'include',
            });

            if (response.ok) {
                cart_items();
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        if (!user) {
            navigation('/login');
        }
        cart_items();
    }, [user]);

    return (
        <div>
            <h3>자장바구니</h3>
            <div>
                {cartItems.length > 0 ? (
                    <div>
                        {cartItems.map((item: any) => (
                            <div key={item.snack_id}>
                                <img src={item.product_image} style={{ width: '100px', height: '100px' }} />
                                <div>{item.name}</div>
                                <div>{item.quantity}</div>
                                <div>{item.price}원</div>
                                <div>
                                    <button onClick={() => handleDeleteCart(item.cart_item_id)}>X</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>
                        <div>자장바구니에 상품이 없습니다.</div>
                    </div>
                )}
            </div>
        </div>
    );
};
