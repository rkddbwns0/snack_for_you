import React, { useEffect, useState } from 'react';
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
    const [review, setReview] = useState<any>(null);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(1);
    const [userFavorite, setUserFavorite] = useState<any[]>([]);

    const snack_info = async () => {
        try {
            const data = await snackApi.SnackDeatil(category_id, Number(snack_id));
            console.log(data);
            setSnack(data.snack);
            setReview(data.review);
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
                snack_info();
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
        <div className="page-wrapper">
            <div className="content-box">
                <div className="snack-detail-page-container">
                    <div className="snack-detail-content-wrapper">
                        {/* 메인 상품 정보 섹션 */}
                        <div className="snack-detail-main">
                            <div className="snack-detail-image-section">
                                <img
                                    src={
                                        snack?.product_image && snack?.product_image.startsWith('http')
                                            ? snack?.product_image
                                            : `${process.env.REACT_APP_SERVER_URL}/${snack?.product_image}`
                                    }
                                    className="snack-detail-image"
                                    alt={snack?.name}
                                />
                            </div>
                            <div className="snack-detail-info-section">
                                <div>
                                    <h1 className="snack-detail-title">{snack?.name}</h1>
                                    <div className="snack-detail-info">
                                        <div className="snack-detail-info-item">
                                            <span className="snack-detail-info-label">카테고리</span>
                                            <span className="snack-detail-info-value">{snack?.category_name}</span>
                                        </div>
                                        <div className="snack-detail-info-item">
                                            <span className="snack-detail-info-label">브랜드</span>
                                            <span className="snack-detail-info-value">{snack?.brand}</span>
                                        </div>
                                        <div className="snack-detail-info-item">
                                            <span className="snack-detail-info-label">구성</span>
                                            <span className="snack-detail-info-value">{snack?.composition}</span>
                                        </div>
                                        <div className="snack-detail-info-item">
                                            <span className="snack-detail-info-label">중량</span>
                                            <span className="snack-detail-info-value">{snack?.weight}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="snack-detail-price-section">
                                    <div className="snack-detail-price">{totalPrice}원</div>
                                    <div className="snack-detail-quantity-controls">
                                        <span className="snack-detail-quantity-label">수량</span>
                                        <div className="snack-detail-quantity-buttons">
                                            <button className="snack-detail-quantity-btn" onClick={decrease}>
                                                -
                                            </button>
                                            <input
                                                type="number"
                                                min={1}
                                                value={quantity}
                                                className="snack-detail-quantity-input"
                                                onChange={(e) => {
                                                    const value = Number(e.target.value);
                                                    setQuantity(value < 1 ? 1 : value);
                                                }}
                                            />
                                            <button
                                                className="snack-detail-quantity-btn"
                                                onClick={() => increase(snack?.quantity)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <div className="snack-detail-actions">
                                        <div className="snack-detail-favorite-section">
                                            <button
                                                className="snack-detail-favorite-btn"
                                                onClick={() => handleFavorite(snack?.snack_id)}
                                            >
                                                <HiOutlineHeart
                                                    className={`favorite-icon ${
                                                        user && favoriteCheck(snack?.snack_id) ? 'active' : ''
                                                    }`}
                                                />
                                            </button>
                                            <span className="snack-detail-favorite-count">{snack?.favorite_count}</span>
                                        </div>
                                        <button className="snack-detail-cart-btn" onClick={handleCart}>
                                            장바구니
                                        </button>
                                        <button
                                            className="snack-detail-buy-btn"
                                            onClick={() =>
                                                navigation('/order', {
                                                    state: {
                                                        items: [
                                                            {
                                                                snack_id: snack?.snack_id,
                                                                quantity: quantity,
                                                                price: totalPrice,
                                                                product_image: snack?.product_image,
                                                            },
                                                        ],
                                                        cart: false,
                                                    },
                                                })
                                            }
                                        >
                                            구매하기
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 리뷰 섹션 */}
                        <div className="snack-detail-reviews-section">
                            <div className="snack-detail-reviews-header">
                                <h2 className="snack-detail-reviews-title">리뷰</h2>
                                <div className="snack-detail-reviews-summary">
                                    <span className="snack-detail-review-score">{snack?.review_score || 0}점</span>
                                    <span className="snack-detail-review-count">({snack?.review_count || 0}개)</span>
                                </div>
                            </div>

                            {review && review.length > 0 ? (
                                <div className="snack-detail-reviews-list">
                                    {review.map((item: any) => (
                                        <div key={item?.review_id} className="snack-detail-review-item">
                                            <div className="snack-detail-review-header">
                                                <span className="snack-detail-review-author">
                                                    {item?.user_nickname}
                                                </span>
                                                <span className="snack-detail-review-date">
                                                    {item?.review_writed_at}
                                                </span>
                                            </div>
                                            <div className="snack-detail-review-meta">
                                                <span className="snack-detail-review-score-badge">
                                                    {item?.review_score}점
                                                </span>
                                                <span>구매 수량: {item?.order_quantity}개</span>
                                            </div>
                                            <div className="snack-detail-review-content">
                                                {item?.block_at ? (
                                                    <span className="snack-detail-blocked-review">
                                                        비공개 처리된 리뷰입니다.
                                                    </span>
                                                ) : (
                                                    item?.review_content
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="snack-detail-no-reviews">
                                    <h3>현재 등록된 리뷰가 없습니다.</h3>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
