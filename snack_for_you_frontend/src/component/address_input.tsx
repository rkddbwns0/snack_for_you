import { useState } from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';

export const AddressInput = ({ isOpen, setIsOpen } = { isOpen: false, setIsOpen: () => {} }) => {
    const [addressInputOpen, setAddressInputOpen] = useState<boolean>(false);
    const [address, setAddress] = useState<string>('');

    const handleOpen = () => {
        if (addressInputOpen === false) {
            setAddressInputOpen(true);
        } else {
            setAddressInputOpen(false);
        }
    };

    const completeHandler = (data: any) => {
        console.log(data);
        const { address, buildingName }: any = data;
        setAddress(address + ' ' + '(' + buildingName + ')');
    };

    return (
        <div>
            {isOpen && (
                <div>
                    <div>
                        <div>이름</div>
                        <input type="text" placeholder="이름" />
                    </div>
                    <div>
                        <div>주소</div>
                        <div>{address}</div>
                        <button onClick={handleOpen}>주소 검색</button>
                    </div>
                    <div>
                        <div>상세 주소</div>
                        <input type="text" placeholder="상세주소" />
                    </div>
                    <div>
                        <div>요청사항</div>
                        <input type="text" />
                    </div>
                </div>
            )}
            {addressInputOpen && <DaumPostcodeEmbed onComplete={completeHandler} autoClose />}
        </div>
    );
};
