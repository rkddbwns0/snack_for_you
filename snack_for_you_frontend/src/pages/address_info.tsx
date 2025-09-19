import { useState } from 'react';
import DaumPostCode from 'react-daum-postcode';
import { AddressInput } from '../component/address_input.tsx';

export const AddessInfo = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleOpen = () => {
        if (isOpen === false) {
            setIsOpen(true);
            console.log(isOpen);
        } else {
            setIsOpen(false);
        }
    };

    return (
        <div>
            <h3>주소 정보</h3>
            <div>
                <button onClick={handleOpen}>주소 등록하기</button>
            </div>

            <AddressInput isOpen={isOpen} setIsOpen={handleOpen} />
        </div>
    );
};
