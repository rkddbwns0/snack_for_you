import { useEffect, useState } from 'react';
import { FavoriteApi } from '../api/favorite.api.tsx';
import { useAuth } from '../context/context.tsx';
import { HiOutlineHeart } from 'react-icons/hi';

export const Favorite = () => {
    const { user } = useAuth();
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
        <div>
            <div>
                <h4>좋아요 한 제품</h4>
            </div>
            <div>
                {favoriteList && favoriteList.length > 0 ? (
                    <div>
                        {favoriteList.map((item: any) => {
                            return (
                                <div key={item.snack_id}>
                                    <div>
                                        <img src={item.snack_image} style={{ width: '50px', height: '50px' }} />
                                    </div>
                                    <div>{item.snack_name}</div>
                                    <div>
                                        <div>
                                            <h5>{item.snack_price}원</h5>
                                        </div>
                                        <div>
                                            <button onClick={() => handleFavorite(item.snack_id)}>
                                                {favoriteList.some((item: any) => item.snack_id === item.snack_id) ? (
                                                    <HiOutlineHeart style={{ color: 'red' }} />
                                                ) : (
                                                    <HiOutlineHeart />
                                                )}
                                            </button>
                                            <h5>{item.favorite_count}</h5>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div>
                        <h4>좋아요 한 제품이 없습니다.</h4>
                    </div>
                )}
            </div>
        </div>
    );
};
