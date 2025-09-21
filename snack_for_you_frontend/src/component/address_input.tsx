import { useEffect, useState } from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';
import { useAuth } from '../context/context.tsx';

export const AddressInput = ({ isOpen, setIsOpen } = { isOpen: false, setIsOpen: () => {} }) => {
    const { user } = useAuth();
    const [addressInputOpen, setAddressInputOpen] = useState<boolean>(false);
    const [address, setAddress] = useState<string>('');
    const [name, setName] = useState<string>(user.name);
    const [detailAddress, setDetailAddress] = useState<string>('');
    const [request, setRequest] = useState<string>('');
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
        setAddress(address + ' ' + buildingName);
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
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="modal_overlay">
            <div>
                {isOpen && (
                    <div>
                        <div>
                            <p>이름</p>
                            <input
                                type="text"
                                placeholder="이름"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <p>주소</p>
                            <p>{address}</p>
                            <button onClick={handleOpen}>주소 검색</button>
                        </div>
                        <div>
                            <p>상세 주소</p>
                            <input
                                value={detailAddress}
                                onChange={(e) => setDetailAddress(e.target.value)}
                                type="text"
                                placeholder="상세주소"
                            />
                        </div>
                        <div>
                            <p>요청사항</p>
                            <input
                                value={request}
                                onChange={(e) => setRequest(e.target.value)}
                                type="text"
                                placeholder="요청사항"
                            />
                        </div>
                        <div>
                            <input type="checkbox" checked={basicAddress} onChange={handleBasicAddress} />
                        </div>
                        <div>
                            <button onClick={handleAddress}>배송지 저장하기</button>
                        </div>
                    </div>
                )}
                {addressInputOpen && <DaumPostcodeEmbed onComplete={completeHandler} autoClose />}
            </div>
        </div>
    );
};
