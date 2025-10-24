import { useEffect, useState } from 'react';
import { AddressInput } from '../component/address_input.tsx';
import { useAuth } from '../context/context.tsx';
import '../css/common.css';
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
        <div className="page-wrapper">
            <div className="content-box">
                <div className="address-container">
                    <div className="address-content-wrapper">
                        <div className="address-header">
                            <h1 className="address-title">배송지 관리</h1>
                            <div className="address-actions">
                                <button className="address-action-btn" onClick={handleOpen}>
                                    + 주소 등록하기
                                </button>
                                <button 
                                    className="address-action-btn delete" 
                                    onClick={handleAddressDelete}
                                >
                                    - 주소 삭제하기
                                </button>
                            </div>
                        </div>
                        
                        {addressList.length > 0 ? (
                            <div className="address-list-container">
                                {addressList.map((item: any) => {
                                    return (
                                        <div key={item.address_id} className="address-item-card">
                                            <div className="address-item-header">
                                                <input
                                                    type="checkbox"
                                                    className="address-item-checkbox"
                                                    id={item.address_id}
                                                    checked={checkAddress.includes(item.address_id)}
                                                    onChange={(e) => checkHandler(e, item.address_id)}
                                                />
                                            </div>
                                            <div className="address-item-info">
                                                <div className="address-item-label">주소</div>
                                                <div className="address-item-value">{item.address}</div>
                                            </div>
                                            <div className="address-item-info">
                                                <div className="address-item-label">수령자</div>
                                                <div className="address-item-value">{item.name}</div>
                                            </div>
                                            <div className="address-item-info">
                                                <div className="address-item-label">요청사항</div>
                                                <div className="address-item-value">{item.request}</div>
                                            </div>
                                            <div className="address-item-info">
                                                <div className="address-item-label">등록일</div>
                                                <div className="address-item-value">{item.created_at}</div>
                                            </div>
                                            <div className="address-item-basic">
                                                {item.basic_address === true ? (
                                                    <span className="address-basic-badge">기본주소</span>
                                                ) : (
                                                    <button 
                                                        className="address-set-basic-btn"
                                                        onClick={() => handleAlert(item.address_id)}
                                                    >
                                                        기본주소로 설정
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="address-empty-message">
                                <h3>등록된 주소가 없습니다.</h3>
                                <p>새로운 배송지를 등록해주세요.</p>
                            </div>
                        )}
                        
                        <AddressInput
                            isOpen={isOpen}
                            setIsOpen={handleOpen}
                            onSuccess={() => {
                                setIsOpen(false);
                                userAddress();
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
