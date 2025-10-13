import { useEffect, useState } from 'react';
import { AddressApi } from '../api/address.api.tsx';
import { useAuth } from '../context/context.tsx';
import '../css/address_modal.css';

export const AddressModal = (
    { isOpen, setIsOpen, address_id } = { isOpen: false, setIsOpen: () => {}, address_id: 0 }
) => {
    const { user } = useAuth();
    const addressApi = new AddressApi();
    const [address, setAddress] = useState<any[]>([]);
    const [checkAddress, setCheckAddress] = useState<any>(address_id);

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

    useEffect(() => {
        getAddress();
    }, []);

    return (
        <div>
            {isOpen && (
                <div className="address-modal-overlay">
                    <div className="address-modal-container">
                        <div>
                            <button onClick={setIsOpen}>X</button>
                        </div>
                        <div>
                            {address && address.length > 0 ? (
                                <div>
                                    <div>
                                        <button>주소 등록하기</button>
                                    </div>
                                    {address.map((item: any) => {
                                        return (
                                            <div key={item.address_id}>
                                                <div>
                                                    <input
                                                        type="radio"
                                                        onChange={(e) => setCheckAddress(item.address_id)}
                                                        checked={checkAddress === item.address_id}
                                                        value={item.address_id}
                                                    />
                                                </div>
                                                <div>
                                                    <p>받는사람 : {item.name}</p>
                                                </div>
                                                <div>
                                                    <p>주소 : {item.address}</p>
                                                </div>
                                                {item.basic_address ? (
                                                    <div>
                                                        <p>기본 주소</p>
                                                    </div>
                                                ) : null}
                                            </div>
                                        );
                                    })}
                                    <div>
                                        <button>해당 주소로 변경하기</button>
                                    </div>
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
                </div>
            )}
        </div>
    );
};
