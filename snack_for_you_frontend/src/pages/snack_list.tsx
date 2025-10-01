import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const SnackList = () => {
    const navigation = useNavigate();
    const location = useLocation();
    const category_id = location.pathname.split('/')[2];
    const [snacks, setSnacks] = useState<any[]>([]);

    const snackList = async () => {
        console.log(category_id);
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/snack/${category_id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });

            const data = await response.json();
            setSnacks(data);
            console.log(data);
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
            <div>
                {snacks.length > 0 ? (
                    <div>
                        {snacks.map((item: any) => {
                            return (
                                <div key={item.snack_id}>
                                    <div>
                                        <p>{item.name}</p>
                                        <img src={item.product_image} style={{ width: '100px', height: '100px' }} />
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
