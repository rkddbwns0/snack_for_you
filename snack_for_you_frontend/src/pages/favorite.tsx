import { useEffect, useState } from 'react';
import { FavoriteApi } from '../api/favorite.api.tsx';
import { useAuth } from '../context/context.tsx';
import { HiOutlineHeart } from 'react-icons/hi';
import '../css/common.css';
import { useNavigate } from 'react-router-dom';

export const Favorite = () => {
    const { user } = useAuth();
    const navigation = useNavigate();
    const favroiteApi = new FavoriteApi();
    const [favoriteList, setFavoriteList] = useState<any>([]);

    const getFavortieList = async () => {
        try {
            const data = await favroiteApi.favoriteList(user.user_id);
            setFavoriteList(data);
        } catch (e) {
            console.error(e);
        }
    };

    const handleFavorite = async (snack_id: number) => {
        try {
            const data = await favroiteApi.favorite(user.user_id, snack_id);
            if (data?.status === 200) {
                getFavortieList();
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        getFavortieList();
    }, []);

    return (
        <div className="page-wrapper">
            <div className="content-box">
                <div className="page-container">
                    <div className="page-content-wrapper">
                        <div className="page-card">
                            <h1 className="page-title">좋아요 한 제품</h1>
                            
                            {favoriteList && favoriteList.length > 0 ? (
                                <div className="snack-grid-container">
                                    {favoriteList.map((item: any) => {
                                        return (
                                            <div key={item.snack_id} className="snack-grid-item">
                                                <div className="snack-item-content" onClick={() => navigation(`/snack_detail/${item.snack_id}`)}>
                                                    <img 
                                                        src={item.snack_image} 
                                                        className="snack-item-image"
                                                        alt={item.snack_name}
                                                    />
                                                    <div className="snack-item-name">
                                                        {item.snack_name}
                                                    </div>
                                                    <div className="snack-item-price">
                                                        {item.snack_price.toLocaleString()}원
                                                    </div>
                                                </div>
                                                <div className="snack-item-actions">
                                                    <button 
                                                        className="snack-favorite-button"
                                                        onClick={() => handleFavorite(item.snack_id)}
                                                    >
                                                        <HiOutlineHeart 
                                                            className="favorite-icon active"
                                                        />
                                                        <span>{item.favorite_count}</span>
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="snack-empty-message">
                                    <h3>좋아요 한 제품이 없습니다.</h3>
                                    <p>마음에 드는 상품에 좋아요를 눌러보세요!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
