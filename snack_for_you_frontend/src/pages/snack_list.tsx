import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SnackApi } from '../api/snack.api.tsx';
import { HiOutlineHeart } from 'react-icons/hi';
import { FavoriteApi } from '../api/favorite.api.tsx';
import { useAuth } from '../context/context.tsx';

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
        try {
            const data = await snackApi.getSnack(Number(category_id));
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
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        snackList();
        favoriteList();
    }, [category_id]);

    return (
        <div className="page-container">
            <div>
                <h3>Snack</h3>
            </div>
            <div className="grid-container">
                {snacks.length > 0 ? (
                    snacks.map((item: any) => {
                        return (
                            <div key={item.snack_id} className="grid-item">
                                <div
                                    onClick={() =>
                                        navigation(`/snack_detail/${item.snack_id}`, {
                                            state: { category_id: category_id },
                                        })
                                    }
                                >
                                    <img src={item.product_image} style={{ width: '100px', height: '100px' }} />
                                    <p>{item.name}</p>
                                    <p>{item.category_name}</p>
                                    <p>{item.price}</p>
                                </div>
                                <div>
                                    <button
                                        style={{ zIndex: '1', backgroundColor: 'transparent', border: 'none' }}
                                        onClick={() => handleFavorite(item.snack_id)}
                                    >
                                        {user ? (
                                            userFavorite &&
                                            userFavorite.some(
                                                (favorite: any) => favorite.snack_id === item.snack_id
                                            ) ? (
                                                <HiOutlineHeart style={{ color: 'red' }} />
                                            ) : (
                                                <HiOutlineHeart />
                                            )
                                        ) : (
                                            <HiOutlineHeart />
                                        )}
                                    </button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div>
                        <h3>해당 카테고리에 상품이 없습니다.</h3>
                    </div>
                )}
            </div>
        </div>
    );
};
