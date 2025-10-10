import { useEffect, useState } from 'react';
import { AddressApi } from '../api/address.api.tsx';
import { useAuth } from '../context/context.tsx';

export const AddressModal = ({ isOpen, setIsOpen } = { isOpen: false, setIsOpen: () => {} }) => {
    const { user } = useAuth();
    const addressApi = new AddressApi();
    const [address, setAddress] = useState<any[]>([]);

    const getAddress = async () => {
        try {
            const data = await addressApi.getAddress(user.user_id);
            setAddress(data);
            console.log(data);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        getAddress();
    }, []);

    return (
        <div className="address-modal-overlay">
            {isOpen && (
                <div className="address-modal-container">
                    <div>
                        {address && address.length > 0 ? (
                            <div>
                                {address.map((item: any) => {
                                    return (
                                        <div key={item.address_id}>
                                            <div>
                                                <input type="checkbox" />
                                            </div>
                                            <div>
                                                <p>받는사람 : {item.name}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div>
                                <div>
                                    <p>새로운 주소를 추가해 주세요.</p>
                                </div>
                                <div>
                                    <button>주소 등록하기</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
