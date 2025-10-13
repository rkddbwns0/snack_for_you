import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/context.tsx';
import { useEffect, useState } from 'react';
import { CartApi } from '../api/cart.api.tsx';

export const Cart = () => {
    const navigation = useNavigate();
    const { user } = useAuth();
    const cartApi = new CartApi();
    const [cartItems, setCartItems] = useState<any>([]);
    const [checkItems, setCheckItems] = useState<any>([]);

    const cart_items = async () => {
        try {
            const data = await cartApi.getCart(user.user_id);
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
            const data = await cartApi.deleteCart(cart_item_id);

            if (data?.status === 200) {
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
            const data = await cartApi.putCart(cart_item_id, inde);

            if (data?.status === 200) {
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
                                                    snack_id: item.snack_id,
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
                                onClick={() => navigation('/order', { state: { items: checkItems, cart: true } })}
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
