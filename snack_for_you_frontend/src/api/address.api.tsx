export class AddressApi {
    async getAddress(user_id: number) {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/address/${user_id}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
                },
            });

            if (!response.ok) {
                throw new Error(`error ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (e) {
            console.error(e);
        }
    }

    async postAddress(inputData: any) {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/address`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
                },
                credentials: 'include',
                body: JSON.stringify({
                    user_id: inputData.user_id,
                    name: inputData.name,
                    road_name: inputData.address,
                    detail_address: inputData.detailAddress,
                    request: inputData.request,
                    basic_address: inputData.basicAddress,
                }),
            });

            if (!response.ok) {
                throw new Error(`error ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (e) {
            console.error(e);
        }
    }

    async putAddress(address_id: number, user_id: number) {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/address/${user_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
                },
                body: JSON.stringify({
                    address_id: address_id,
                }),
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`error ${response.status}`);
            }

            const data = await response.json();

            return data;
        } catch (e) {
            console.error(e);
        }
    }

    async deleteAddress(address_data: any) {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/address`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
                },
                credentials: 'include',
                body: JSON.stringify({
                    address_id: address_data,
                }),
            });

            if (!response.ok) {
                throw new Error(`error ${response.status}`);
            }

            const data = await response.json();

            return data;
        } catch (e) {
            console.error(e);
        }
    }
}
