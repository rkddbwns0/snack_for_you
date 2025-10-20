import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/context.tsx';
import { SnackApi } from '../api/snack.api.tsx';
import { CartApi } from '../api/cart.api.tsx';
import { HiOutlineHeart } from 'react-icons/hi';
import '../css/snack_detail.css';
import { FavoriteApi } from '../api/favorite.api.tsx';

export const SnackDetail = () => {
    const navigation = useNavigate();
    const { user } = useAuth();
    const snackApi = new SnackApi();
    const cartApi = new CartApi();
    const favoriteApi = new FavoriteApi();
    const snack_id = window.location.pathname.split('/')[2];
    const location = useLocation();
    const category_id = location.state?.category_id;
    const [snack, setSnack] = useState<any>(null);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(1);
    const [userFavorite, setUserFavorite] = useState<any[]>([]);

    const snack_info = async () => {
        try {
            const data = await snackApi.SnackDeatil(category_id, Number(snack_id));
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
            const data = await cartApi.insertCart({
                user_id: user.user_id,
                snack_id: Number(snack_id),
                quantity: quantity,
                totalPrice: totalPrice,
            });

            if (data?.status === 200) {
                alert('장바구니에 등록되었습니다.');
                return;
            }
        } catch (e) {
            console.error(e);
        }
    };

    const favoriteList = async () => {
        if (!user) {
            return;
        }
        try {
            const data = await favoriteApi.getFavorite(user.user_id);
            setUserFavorite(data);
        } catch (e) {
            console.error(e);
        }
    };

    const favoriteCheck = (snack_id: number) => {
        console.log(snack_id);
        return userFavorite?.some((item: any) => item.snack_id === snack_id) ?? false;
    };

    const handleFavorite = async (snack_id: number) => {
        if (!user) {
            alert('로그인 후 사용할 수 있습니다.');
            return;
        }
        try {
            const data = await favoriteApi.favorite(user.user_id, snack_id);
            if (data?.status === 200) {
                favoriteList();
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

    useEffect(() => {
        favoriteList();
    }, [user]);

    return (
        <div className="page-container centered-page">
            <div className="snack-detail-container">
                <div className="snack-detail-image">
                    <img src={snack?.product_image} />
                </div>
                <div className="snack-detail-content">
                    <div className="snack-detail-info">
                        <p>제품명 : {snack?.name}</p>
                        <p>카테고리 : {snack?.category_name}</p>
                        <p>브랜드명 : {snack?.brand}</p>
                        <p>구성 : {snack?.composition}</p>
                        <p>중량 : {snack?.weight}</p>
                    </div>
                    <div>
                        <div className="price-quantity-container">
                            <h3>{totalPrice}원</h3>
                            <div className="quantity-controls">
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
                        <div className="action-buttons">
                            <button className="btn-favorite" onClick={() => handleFavorite(snack.snack_id)}>
                                {user && favoriteCheck(snack?.snack_id) ? (
                                    <HiOutlineHeart color="red" />
                                ) : (
                                    <HiOutlineHeart />
                                )}
                            </button>
                            <button className="btn-cart" onClick={handleCart}>
                                장바구니
                            </button>
                            <button className="btn-buy">구매하기</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
