import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SnackApi } from '../api/snack.api.tsx';
import { HiOutlineHeart } from 'react-icons/hi';
import { MdOutlineRateReview } from 'react-icons/md';
import { FavoriteApi } from '../api/favorite.api.tsx';
import { useAuth } from '../context/context.tsx';
import '../css/snack_list.css';

export const SnackList = () => {
    const { user } = useAuth();
    const navigation = useNavigate();
    const location = useLocation();
    const snackApi = new SnackApi();
    const favoriteApi = new FavoriteApi();
    const category_id = location.pathname.split('/')[2];
    const [snacks, setSnacks] = useState<any[]>([]);
    const [userFavorite, setUserFavorite] = useState<any[]>([]);

    const snackList = async () => {
        console.log('api1');
        try {
            const data = await snackApi.getSnack(Number(category_id));
            console.log(data);
            setSnacks(data);
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
            console.log(data);
            setUserFavorite(data);
        } catch (e) {
            console.error(e);
        }
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
                snackList();
                return;
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        snackList();
    }, [category_id]);

    useEffect(() => {
        favoriteList();
    }, [user]);

    return (
        <div className="page-wrapper">
            <div className="content-box">
                <div className="snack-list-container">
                    <div className="snack-list-content">
                        <h2 className="snack-list-title">
                            과자 목록
                        </h2>
                        {snacks.length > 0 ? (
                            <div className="snack-grid-container">
                                {snacks.map((item: any) => {
                                    const isFavorite = user && userFavorite && 
                                        userFavorite.some((favorite: any) => favorite.snack_id === item.snack_id);
                                    
                                    return (
                                        <div key={item.snack_id} className="snack-grid-item">
                                            <div
                                                className="snack-item-content"
                                                onClick={() =>
                                                    navigation(`/snack_detail/${item.snack_id}`, {
                                                        state: { category_id: category_id },
                                                    })
                                                }
                                            >
                                                <img 
                                                    src={item.product_image} 
                                                    className="snack-item-image"
                                                    alt={item.name}
                                                />
                                                <div className="snack-item-name">
                                                    {item.name}
                                                </div>
                                                <div className="snack-item-category">
                                                    {item.category_name}
                                                </div>
                                                <div className="snack-item-price">
                                                    {item.price}원
                                                </div>
                                            </div>
                                            <div className="snack-item-actions">
                                                <button
                                                    className="snack-favorite-button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleFavorite(item.snack_id);
                                                    }}
                                                >
                                                    <HiOutlineHeart 
                                                        className={`favorite-icon ${isFavorite ? 'active' : ''}`}
                                                    />
                                                    <span>{Number(item.favorite_count)}</span>
                                                </button>
                                                <div className="snack-review-info">
                                                    <MdOutlineRateReview />
                                                    <span>{Number(item.review_count)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="snack-empty-message">
                                <h3>해당 카테고리에 상품이 없습니다.</h3>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
