import { useEffect, useState } from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';
import { useAuth } from '../context/context.tsx';
import '../css/address_input.css';

export const AddressInput = (
    { isOpen, setIsOpen, onSuccess } = { isOpen: false, setIsOpen: () => {}, onSuccess: () => {} }
) => {
    const { user } = useAuth();
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
        setAddress(address + ' ' + '(' + buildingName + ')');
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
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/address`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
                },
                credentials: 'include',
                body: JSON.stringify({
                    user_id: user.user_id,
                    name: name,
                    road_name: address,
                    detail_address: detailAddress,
                    request: request,
                    basic_address: basicAddress,
                }),
            });

            if (response.ok) {
                const data = await response.json();

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
                <div className="modal_overlay">
                    <div className="modal-content">
                        <div className="close-button">
                            <button onClick={setIsOpen}>X</button>
                        </div>
                        <div className="input-content">
                            <label>이름</label>
                            <input
                                type="text"
                                placeholder="이름"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="input-content">
                            <label>주소</label>
                            <div className={`address-box ${address ? 'active' : 'no-active'} `}>
                                {address ? address : '주소를 입력해 주세요'}
                            </div>
                            <button onClick={handleOpen}>주소 검색</button>
                        </div>
                        <div className="input-content">
                            <label>상세 주소</label>
                            <input
                                value={detailAddress}
                                onChange={(e) => setDetailAddress(e.target.value)}
                                type="text"
                                placeholder="상세주소"
                            />
                        </div>
                        <div className="input-content">
                            <label>요청사항</label>
                            <input
                                value={request}
                                onChange={(e) => setRequest(e.target.value)}
                                type="text"
                                placeholder="요청사항"
                                onFocus={() => {
                                    setRequest('');
                                }}
                                onBlur={() => {
                                    if (request === '') {
                                        setRequest('택배기사님 안전 운전해  주세요!');
                                    }
                                }}
                            />
                        </div>
                        <div className="input-content">
                            <label>기본 주소로 저장하기</label>
                            <input type="checkbox" checked={basicAddress} onChange={handleBasicAddress} />
                        </div>
                        <div className="input-button">
                            <button onClick={handleAddress}>배송지 저장하기</button>
                        </div>
                    </div>
                    {addressInputOpen && (
                        <div className="address-modal">
                            <div>
                                <button onClick={handleOpen}>X</button>
                            </div>
                            <DaumPostcodeEmbed onComplete={completeHandler} autoClose />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
