import { useEffect, useState } from 'react';
import { SnackApi } from '../api/snack.api.tsx';
import { useAuth } from '../context/context.tsx';
import { FavoriteApi } from '../api/favorite.api.tsx';
import { HiOutlineHeart } from 'react-icons/hi';
import { HiHeart } from 'react-icons/hi';
import '../css/main.css';
import { useNavigate } from 'react-router-dom';

export const Main = () => {
    const snackApi = new SnackApi();
    const favoriteApi = new FavoriteApi();
    const navigation = useNavigate();
    const { user } = useAuth();
    const [randomSnack, setRandomSnack] = useState<any>([]);
    const [userFavorite, setUserFavorite] = useState<any[]>([]);
    const [allSnacks, setAllSnacks] = useState<any>([]);

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
            setUserFavorite(data);
        } catch (e) {
            console.error(e);
        }
    };

    const toggleFavorite = async (snackId: number) => {
        if (!user) {
            alert('로그인 후 이용해주세요.');
            return;
        }
        try {
            const isFavorite = userFavorite.some((fav) => fav.snack_id === snackId);
            if (isFavorite) {
                await favoriteApi.favorite(user.user_id, snackId);
                setUserFavorite(userFavorite.filter((fav) => fav.snack_id !== snackId));
            } else {
                await favoriteApi.favorite(user.user_id, snackId);
                await favoriteList();
            }
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

    const SnackCard = ({ item }: { item: any }) => {
        const isFavorite =
            user && userFavorite && userFavorite.some((favorite: any) => favorite.snack_id === item.snack_id);

        return (
            <div className="snack-card">
                <div className="snack-image-container" onClick={() => navigation(`/snack_detail/${item.snack_id}`)}>
                    <img src={item.product_image} className="snack-image" alt={item.name} />
                </div>
                <div className="snack-name">{item.name}</div>
                <div className="snack-price">{item.price?.toLocaleString()}원</div>
                <div className="snack-card-footer">
                    <button className="favorite-button" onClick={() => toggleFavorite(item.snack_id)}>
                        {isFavorite ? (
                            <HiHeart className="favorite-icon active" />
                        ) : (
                            <HiOutlineHeart className="favorite-icon" />
                        )}
                    </button>
                    <button className="detail-button" onClick={() => navigation(`/snack_detail/${item.snack_id}`)}>
                        상세보기
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="page-wrapper">
            <div className="content-box">
                <div className="main-container">
                    {/* 환영 섹션 */}
                    <div className="welcome-section">
                        <h1 className="welcome-title">
                            맛있는 간식, <span className="highlight">Snack For You</span>
                        </h1>
                        <p className="welcome-subtitle">당신의 취향에 맞는 최고의 간식을 추천해드립니다</p>
                    </div>

                    {/* 추천 상품 섹션 */}
                    {randomSnack && randomSnack?.length > 0 && (
                        <div className="main-content">
                            <div className="section-header">
                                <h2 className="main-title">🎯 당신을 위한 추천 과자</h2>
                                <p className="section-description">매일 새로운 추천을 받아보세요!</p>
                            </div>
                            <div className="snack-scroll-container">
                                {randomSnack.map((item: any) => (
                                    <SnackCard key={item.snack_id} item={item} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 모든 상품 섹션 */}
                    {allSnacks.length > 0 && (
                        <div className="main-content featured-section">
                            <div className="section-header">
                                <h2 className="main-title">⭐ 전체 인기 상품</h2>
                                <p className="section-description">지금 가장 인기있는 간식들을 확인해보세요</p>
                            </div>
                            <div className="snack-grid-container">
                                {allSnacks.slice(0, 8).map((item: any) => (
                                    <SnackCard key={item.snack_id} item={item} />
                                ))}
                            </div>
                            <div className="view-all-button-container">
                                <button className="view-all-button" onClick={() => navigation('/snack_list')}>
                                    전체 상품 보기
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
