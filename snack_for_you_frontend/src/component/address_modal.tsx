import { useEffect, useState } from 'react';
import { AddressApi } from '../api/address.api.tsx';
import { useAuth } from '../context/context.tsx';
import { AddressInput } from './address_input.tsx';
import '../css/common.css';

export const AddressModal = (
    { isOpen, setIsOpen, address_id } = { isOpen: false, setIsOpen: () => {}, address_id: 0 }
) => {
    const { user } = useAuth();
    const addressApi = new AddressApi();
    const [address, setAddress] = useState<any[]>([]);
    const [checkAddress, setCheckAddress] = useState<any>(address_id);
    const [showAddressInput, setShowAddressInput] = useState<boolean>(false);

    const getAddress = async () => {
        try {
            const data = await addressApi.getAddress(user.user_id);
            setAddress(data);
            console.log(data);
        } catch (e) {
            console.error(e);
        }
    };

    const handleChangeAddress = () => {};

    const handleAddressInputClose = () => {
        setShowAddressInput(false);
        getAddress(); // 주소 목록 새로고침
    };

    useEffect(() => {
        getAddress();
    }, []);

    return (
        <div>
            {isOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="modal-close-btn" onClick={setIsOpen}>×</button>
                        <h2 className="modal-title">배송지 선택</h2>
                        
                        {address && address.length > 0 ? (
                            <div>
                                <div className="modal-form-group">
                                    <button 
                                        className="modal-submit-btn" 
                                        style={{ marginBottom: '20px' }}
                                        onClick={() => setShowAddressInput(true)}
                                    >
                                        주소 등록하기
                                    </button>
                                </div>
                                
                                <div className="address-list-container">
                                    {address.map((item: any) => {
                                        return (
                                            <div key={item.address_id} className="address-item-card">
                                                <div className="address-item-header">
                                                    <input
                                                        type="radio"
                                                        className="address-item-checkbox"
                                                        onChange={(e) => setCheckAddress(item.address_id)}
                                                        checked={checkAddress === item.address_id}
                                                        value={item.address_id}
                                                    />
                                                </div>
                                                <div className="address-item-info">
                                                    <div className="address-item-label">받는사람</div>
                                                    <div className="address-item-value">{item.name}</div>
                                                </div>
                                                <div className="address-item-info">
                                                    <div className="address-item-label">주소</div>
                                                    <div className="address-item-value">{item.address}</div>
                                                </div>
                                                {item.basic_address && (
                                                    <div className="address-item-basic">
                                                        <span className="address-basic-badge">기본 주소</span>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                                
                                <div className="modal-form-group">
                                    <button className="modal-submit-btn">
                                        해당 주소로 변경하기
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="address-empty-message">
                                <h3>등록된 주소가 없습니다.</h3>
                                <p>새로운 주소를 추가해주세요.</p>
                                <button 
                                    className="modal-submit-btn" 
                                    style={{ marginTop: '20px' }}
                                    onClick={() => setShowAddressInput(true)}
                                >
                                    주소 등록하기
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
            
            {showAddressInput && (
                <AddressInput 
                    isOpen={showAddressInput} 
                    setIsOpen={handleAddressInputClose}
                />
            )}
        </div>
    );
};
