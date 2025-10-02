import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const SnackList = () => {
    const navigation = useNavigate();
    const location = useLocation();
    const category_id = location.pathname.split('/')[2];
    const [snacks, setSnacks] = useState<any[]>([]);

    const snackList = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/snack/${category_id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });

            const data = await response.json();
            setSnacks(data);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        snackList();
    }, [category_id]);

    return (
        <div>
            <div>
                <h3>Snack</h3>
            </div>
            <div className="snack-list-container">
                {snacks.length > 0 ? (
                    <div className="snack-list">
                        {snacks.map((item: any) => {
                            return (
                                <div
                                    key={item.snack_id}
                                    className="snack-item"
                                    onClick={() =>
                                        navigation(`/snack_detail/${item.snack_id}`, {
                                            state: { category_id: category_id },
                                        })
                                    }
                                >
                                    <div>
                                        <img src={item.product_image} style={{ width: '100px', height: '100px' }} />
                                        <p>{item.name}</p>
                                        <p>{item.category_name}</p>
                                        <p>{item.price}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div>
                        <h3>해당 카테고리에 상품이 없습니다.</h3>
                    </div>
                )}
            </div>
        </div>
    );
};
