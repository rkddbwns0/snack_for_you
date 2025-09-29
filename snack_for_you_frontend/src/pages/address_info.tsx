import { useEffect, useState } from 'react';
import { AddressInput } from '../component/address_input.tsx';
import { useAuth } from '../context/context.tsx';
import '../css/address_info.css';

export const AddessInfo = () => {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [addressList, setAddressList] = useState<any>([]);
    const [checkAddress, setCheckAddress] = useState<number[]>([]);

    const handleOpen = () => {
        if (isOpen === false) {
            setIsOpen(true);
            console.log(isOpen);
        } else {
            setIsOpen(false);
        }
    };

    const handleItemCheck = (value: number, checked: boolean) => {
        if (checked) {
            setCheckAddress((prev) => [...prev, value]);
            return;
        } else {
            setCheckAddress((prev) => prev.filter((item) => item !== value));
            return;
        }
    };

    const checkHandler = (e: React.ChangeEvent<HTMLInputElement>, value: number) => {
        handleItemCheck(value, e.target.checked);
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

    const handleChageBasicAddress = async (address_id: number) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/address/${user.user_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
                },
                body: JSON.stringify({
                    address_id: address_id,
                }),
                credentials: 'include',
            });
            console.log(response);

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                userAddress();
                return;
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleAlert = (address_id: number) => {
        if (window.confirm('기본 주소로 설정하시겠습니까?')) {
            handleChageBasicAddress(address_id);
        }
    };
    const handleAddressDelete = async () => {
        if (checkAddress.length === 0) {
            alert('삭제할 주소를 선택해 주세요.');
            return;
        }
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/address`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
                },
                credentials: 'include',
                body: JSON.stringify({
                    address_id: checkAddress,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                setCheckAddress([]);
                userAddress();
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        userAddress();
    }, []);

    return (
        <div className="address-info-container">
            <div className="address-info-title">
                <div></div>
                <h3>주소 정보</h3>
                <div className="address-info-button">
                    <button onClick={handleOpen}>+ 주소 등록하기</button>
                    <button onClick={handleAddressDelete}>- 주소 삭제하기</button>
                </div>
            </div>
            <div style={{ width: '100%' }}>
                {addressList.length > 0 ? (
                    <div className="address-list-container">
                        {addressList.map((item: any) => {
                            return (
                                <div key={item.address_id} className="address-item-container">
                                    <div className="address-item">
                                        <div>
                                            <input
                                                type="checkbox"
                                                id={item.address_id}
                                                checked={checkAddress.includes(item.address_id)}
                                                onChange={(e) => checkHandler(e, item.address_id)}
                                            />
                                        </div>
                                        <div className="item-info">
                                            <p>주소 : {item.road_name + ' ' + item.detail_address}</p>
                                        </div>
                                        <div className="item-info">
                                            <p>수령자 : {item.name}</p>
                                        </div>
                                        <div className="item-info">
                                            <p>요청사항 : {item.request}</p>
                                        </div>
                                        <div className="item-info">
                                            <p>등록일 : {item.created_at}</p>
                                        </div>

                                        <div className="item-info-basic-address">
                                            {item.basic_address === true ? (
                                                <p>기본주소</p>
                                            ) : (
                                                <button onClick={() => handleAlert(item.address_id)}>
                                                    기본주소로 설정
                                                </button>
                                            )}
                                        </div>
                                    </div>
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
            <AddressInput
                isOpen={isOpen}
                setIsOpen={handleOpen}
                onSuccess={() => {
                    setIsOpen(false);
                    userAddress();
                }}
            />
        </div>
    );
};
