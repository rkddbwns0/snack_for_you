import { useEffect, useState } from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';
import { useAuth } from '../context/context.tsx';
import '../css/common.css';
import { AddressApi } from '../api/address.api.tsx';

export const AddressInput = (
    { isOpen, setIsOpen, onSuccess } = { isOpen: false, setIsOpen: () => {}, onSuccess: () => {} }
) => {
    const { user } = useAuth();
    const addressApi = new AddressApi();
    const [addressInputOpen, setAddressInputOpen] = useState<boolean>(false);
    const [address, setAddress] = useState<string>('');
    const [name, setName] = useState<string>(user.name);
    const [detailAddress, setDetailAddress] = useState<string>('');
    const [request, setRequest] = useState<string>('택배기사님 안전 운전 해주세요!');
    const [basicAddress, setBasicAddress] = useState<boolean>(false);

    const handleOpen = () => {
        if (addressInputOpen === false) {
            setAddressInputOpen(true);
        } else {
            setAddressInputOpen(false);
        }
    };

    const completeHandler = (data: any) => {
        const { address, buildingName }: any = data;
        setAddress(address + ' ' + (buildingName ? ` (${buildingName})` : ''));
        setAddressInputOpen(false);
    };

    const handleBasicAddress = () => {
        if (basicAddress === false) {
            setBasicAddress(true);
        } else {
            setBasicAddress(false);
        }
    };

    const handleAddress = async () => {
        if (address === '') {
            alert('주소를 입력해 주세요.');
            return;
        }
        if (detailAddress === '') {
            alert('상세주소를 입력해 주세요.');
            return;
        }
        try {
            const data = await addressApi.postAddress({
                user_id: user.user_id,
                name: name,
                address: address,
                detailAddress: detailAddress,
                request: request,
                basicAddress: basicAddress,
            });

            if (data) {
                alert(data.message);
                setIsOpen();
                setAddress('');
                setDetailAddress('');
                setRequest('');
                onSuccess();
                setBasicAddress(false);
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            {isOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="modal-close-btn" onClick={setIsOpen}>×</button>
                        <h2 className="modal-title">배송지 등록</h2>
                        
                        <div className="modal-form-group">
                            <label className="modal-form-label">이름</label>
                            <input
                                type="text"
                                className="modal-form-input"
                                placeholder="받는 사람 이름"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        
                        <div className="modal-form-group">
                            <label className="modal-form-label">주소</label>
                            <div className={`modal-address-display ${address ? 'active' : ''}`}>
                                {address || '주소를 검색해주세요'}
                            </div>
                            <button className="modal-search-btn" onClick={handleOpen}>
                                주소 검색
                            </button>
                        </div>
                        
                        <div className="modal-form-group">
                            <label className="modal-form-label">상세 주소</label>
                            <input
                                value={detailAddress}
                                onChange={(e) => setDetailAddress(e.target.value)}
                                className="modal-form-input"
                                type="text"
                                placeholder="상세주소를 입력하세요"
                            />
                        </div>
                        
                        <div className="modal-form-group">
                            <label className="modal-form-label">요청사항</label>
                            <input
                                value={request}
                                onChange={(e) => setRequest(e.target.value)}
                                className="modal-form-input"
                                type="text"
                                placeholder="배송 요청사항"
                                onFocus={() => {
                                    setRequest('');
                                }}
                                onBlur={() => {
                                    if (request === '') {
                                        setRequest('택배기사님 안전 운전해주세요!');
                                    }
                                }}
                            />
                        </div>
                        
                        <div className="modal-checkbox-container">
                            <input 
                                type="checkbox" 
                                className="modal-checkbox"
                                checked={basicAddress} 
                                onChange={handleBasicAddress} 
                            />
                            <label className="modal-checkbox-label">기본 주소로 저장하기</label>
                        </div>
                        
                        <button className="modal-submit-btn" onClick={handleAddress}>
                            배송지 저장하기
                        </button>
                    </div>
                    
                    {addressInputOpen && (
                        <div className="modal-address-search">
                            <div className="modal-address-search-content">
                                <button className="modal-close-btn" onClick={handleOpen}>×</button>
                                <DaumPostcodeEmbed onComplete={completeHandler} autoClose />
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
