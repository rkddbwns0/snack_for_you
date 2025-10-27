import { useLocation, useNavigate } from 'react-router-dom';
import { SnackApi } from '../api/snack.api.tsx';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/context.tsx';
import { FavoriteApi } from '../api/favorite.api.tsx';
import { HiOutlineHeart } from 'react-icons/hi';
import { MdOutlineRateReview } from 'react-icons/md';
import '../css/search.css';

export const Search = () => {
    const navigation = useNavigate();
    const location = useLocation();
    const { user } = useAuth();
    const keyword = location.state?.keyword;
    const snackApi = new SnackApi();
    const favoriteApi = new FavoriteApi();
    const [searchResult, setSearchResult] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [userFavorite, setUserFavorite] = useState<any[]>([]);

    const searchSnack = async () => {
        setLoading(true);
        try {
            const data = await snackApi.searchSnack(keyword);
            setSearchResult(data || []);
        } catch (e) {
            console.error(e);
            setSearchResult([]);
        } finally {
            setLoading(false);
        }
    };

    const getFavorite = async () => {
        if (!user) return;
        try {
            const data = await favoriteApi.getFavorite(user.user_id);
            setUserFavorite(data || []);
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
                getFavorite();
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        if (keyword) {
            searchSnack();
            getFavorite();
        }
    }, [keyword]);

    return (
        <div className="page-wrapper">
            <div className="content-box">
                <div className="search-list-container">
                    <div className="search-list-content">
                        {/* 검색 결과 헤더 */}
                        <div className="search-header">
                            <h2 className="search-list-title">
                                검색 결과
                            </h2>
                            <p className="search-keyword">
                                "{keyword}" 검색 결과
                            </p>
                        </div>

                        {/* 결과 표시 */}
                        {loading ? (
                            <div className="search-loading">
                                <p>검색 중...</p>
                            </div>
                        ) : searchResult && searchResult.length > 0 ? (
                            <div className="search-results">
                                <p className="search-count">
                                    검색 결과 {searchResult.length}개
                                </p>
                                <div className="search-grid-container">
                                    {searchResult.map((item: any) => {
                                        const isFavorite = user && userFavorite && 
                                            userFavorite.some((favorite: any) => favorite.snack_id === item.snack_id);
                                        
                                        return (
                                            <div key={item.snack_id} className="search-grid-item">
                                                <div
                                                    className="search-item-content"
                                                    onClick={() =>
                                                        navigation(`/snack_detail/${item.snack_id}`)
                                                    }
                                                >
                                                    <img 
                                                        src={item.product_image} 
                                                        className="search-item-image"
                                                        alt={item.name}
                                                    />
                                                    <div className="search-item-name">
                                                        {item.name}
                                                    </div>
                                                    <div className="search-item-category">
                                                        {item.category_name || '일반'}
                                                    </div>
                                                    <div className="search-item-price">
                                                        {item.price?.toLocaleString()}원
                                                    </div>
                                                </div>
                                                <div className="search-item-actions">
                                                    <button
                                                        className="search-favorite-button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleFavorite(item.snack_id);
                                                        }}
                                                    >
                                                        <HiOutlineHeart 
                                                            className={`favorite-icon ${isFavorite ? 'active' : ''}`}
                                                        />
                                                        <span>{Number(item.favorite_count) || 0}</span>
                                                    </button>
                                                    <div className="search-review-info">
                                                        <MdOutlineRateReview />
                                                        <span>{Number(item.review_count) || 0}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ) : (
                            <div className="search-empty">
                                <div className="search-empty-content">
                                    <h2>검색 결과가 없습니다.</h2>
                                    <p>다른 키워드로 검색해보세요.</p>
                                    <button 
                                        className="search-back-button"
                                        onClick={() => navigation('/')}
                                    >
                                        홈으로 돌아가기
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};