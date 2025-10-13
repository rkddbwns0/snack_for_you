import { useEffect, useState } from 'react';
import { AddressInput } from '../component/address_input.tsx';
import { useAuth } from '../context/context.tsx';
import '../css/address_info.css';
import { AddressApi } from '../api/address.api.tsx';

export const AddessInfo = () => {
    const { user } = useAuth();
    const addressApi = new AddressApi();
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
            const data = await addressApi.getAddress(user.user_id);
            setAddressList(data);
        } catch (e) {
            console.error(e);
        }
    };
    const handleChageBasicAddress = async (address: number) => {
        try {
            const data = await addressApi.putAddress(address, user.user_id);
            if (data) {
                alert(data.message);
                userAddress();
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
            const data = await addressApi.deleteAddress(checkAddress);
            if (data) {
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
                                            <p>주소 : {item.address}</p>
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
