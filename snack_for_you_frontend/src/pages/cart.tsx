import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/context.tsx';
import { useEffect, useState } from 'react';

export const Cart = () => {
    const navigation = useNavigate();
    const { user } = useAuth();
    const [cartItems, setCartItems] = useState<any>([]);
    const [checkItems, setCheckItems] = useState<any>([]);

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

    const handleCheckItems = (value: any, checked: boolean) => {
        console.log(checkItems);
        if (checked) {
            setCheckItems((prev: any[]) => [...prev, value]);
            return;
        } else {
            setCheckItems((prev: any[]) => prev.filter((item: any) => item.cart_item_id !== value.cart_item_id));
            return;
        }
    };

    const handleDeleteCart = async (cart_item_id: number[]) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/cart`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
                },
                credentials: 'include',
                body: JSON.stringify({
                    cart_item_id: cart_item_id,
                }),
            });

            if (response.ok) {
                setCheckItems([]);
                cart_items();
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleDeleteAlert = (id?: number) => {
        if (window.confirm('선택한 제품을 삭제하시겠습니까?')) {
            if (checkItems.length > 0) {
                handleDeleteCart(checkItems.map((item: any) => item.cart_item_id));
            } else {
                handleDeleteCart([id!]);
            }
        }
    };

    const handleIncreaseOrDecreaseQuantity = async (inde: boolean, cart_item_id: number) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/cart/${cart_item_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
                },
                credentials: 'include',
                body: JSON.stringify({ inde: inde }),
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
            <h3>장바구니</h3>

            <div>
                {cartItems.length > 0 ? (
                    <div>
                        {cartItems.map((item: any) => (
                            <div key={item.snack_id}>
                                <div>
                                    <input
                                        type="checkbox"
                                        id={item.cart_item_id}
                                        checked={checkItems.some(
                                            (checkItem: any) => checkItem.cart_item_id === item.cart_item_id
                                        )}
                                        onChange={(e) =>
                                            handleCheckItems(
                                                {
                                                    cart_item_id: item.cart_item_id,
                                                    name: item.name,
                                                    price: item.price,
                                                    quantity: item.quantity,
                                                    product_image: item.product_image,
                                                },
                                                e.target.checked
                                            )
                                        }
                                    />
                                </div>
                                <div>
                                    <img src={item.product_image} style={{ width: '100px', height: '100px' }} />
                                    <div>{item.name}</div>
                                </div>
                                <div>
                                    <button
                                        onClick={() => handleIncreaseOrDecreaseQuantity(false, item.cart_item_id)}
                                        disabled={item.quantity === 1}
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => handleIncreaseOrDecreaseQuantity(true, item.cart_item_id)}>
                                        +
                                    </button>
                                </div>
                                <div>{item.price}원</div>
                                <div>
                                    <button
                                        onClick={() => {
                                            handleDeleteAlert(item.cart_item_id);
                                        }}
                                    >
                                        X
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div>
                            <button
                                onClick={() => navigation('/order', { state: checkItems })}
                                disabled={checkItems.length === 0}
                            >
                                주문하기
                            </button>
                        </div>
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
