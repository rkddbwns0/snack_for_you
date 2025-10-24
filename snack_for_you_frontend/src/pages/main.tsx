import { useEffect, useState } from 'react';
import { MainSwiper } from '../component/main-swiper.tsx';
import { SnackApi } from '../api/snack.api.tsx';
import { useAuth } from '../context/context.tsx';
import { FavoriteApi } from '../api/favorite.api.tsx';
import { HiOutlineHeart } from 'react-icons/hi';
import '../css/main.css';
import { useNavigate } from 'react-router-dom';

export const Main = () => {
    const snackApi = new SnackApi();
    const favoriteApi = new FavoriteApi();
    const navigation = useNavigate();
    const { user } = useAuth();
    const [randomSnack, setRandomSnack] = useState<any>([]);
    const [userFavorite, setUserFavorite] = useState<any[]>([]);

    const getRandomSnack = async () => {
        try {
            const data = await snackApi.getRandomSnack();

            setRandomSnack(data);

            localStorage.setItem(
                'randomSanck',
                JSON.stringify({
                    timestamp: Date.now(),
                    data,
                })
            );
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

    useEffect(() => {
        favoriteList();
        const saved = localStorage.getItem('randomSanck');
        if (saved) {
            const { timestamp, data } = JSON.parse(saved);
            const now = Date.now();

            if (now - timestamp < 10 * 60 * 1000) {
                setRandomSnack(data);
                return;
            }
        }
        getRandomSnack();
    }, []);

    return (
        <div className="page-wrapper">
            <div className="content-box">
                <div className="main-container">
                    {randomSnack.length > 0 ? (
                        <div className="main-content">
                            <h2 className="main-title">
                                추천 과자
                            </h2>
                            <div className="snack-scroll-container">
                                {randomSnack.map((item: any) => {
                                    const isFavorite = user && userFavorite && 
                                        userFavorite.some((favorite: any) => favorite.snack_id === item.snack_id);
                                    
                                    return (
                                        <div key={item.snack_id} className="snack-card">
                                            <div className="snack-image-container" onClick={() => navigation(`/snack_detail/${item.snack_id}`)}>
                                                <img 
                                                    src={item.product_image} 
                                                    className="snack-image"
                                                    alt={item.name}
                                                />
                                            </div>
                                            <div className="snack-name">
                                                {item.name}
                                            </div>
                                            <div className="snack-price">
                                                {item.price}원
                                            </div>
                                            <div>
                                                <button className="favorite-button">
                                                    <HiOutlineHeart 
                                                        className={`favorite-icon ${isFavorite ? 'active' : ''}`}
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};
