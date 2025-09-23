import { useEffect, useState } from 'react';
import DaumPostCode from 'react-daum-postcode';
import { AddressInput } from '../component/address_input.tsx';
import { useAuth } from '../context/context.tsx';

export const AddessInfo = () => {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [addressList, setAddressList] = useState<any>([]);

    const handleOpen = () => {
        if (isOpen === false) {
            setIsOpen(true);
            console.log(isOpen);
        } else {
            setIsOpen(false);
        }
    };

    const userAddress = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/address/${user.user_id}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
                },
            });
            console.log(response);
            const data = await response.json();
            console.log(data);
            setAddressList(data);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        userAddress();
    }, []);

    return (
        <div>
            <h3>주소 정보</h3>
            <div>
                <button onClick={handleOpen}>주소 등록하기</button>
            </div>
            <div>
                {addressList.length > 0 ? (
                    <div>
                        {addressList.map((item: any) => {
                            return (
                                <div key={item.address_id}>
                                    <p>{item.name}</p>
                                    <p>{item.road_name}</p>
                                    <p>{item.detail_address}</p>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div>
                        <p>주소를 등록해 주세요.</p>
                    </div>
                )}
            </div>
            <AddressInput isOpen={isOpen} setIsOpen={handleOpen} />
        </div>
    );
};
