export class CartApi {
    async getCart(user_id: number) {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/cart/${user_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`장바구니 데이터 요청 error ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (e) {
            console.error(e);
        }
    }

    async insertCart(insert_data: any) {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/cart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
                },
                credentials: 'include',
                body: JSON.stringify({
                    user_id: insert_data.user_id,
                    snack_id: insert_data.snack_id,
                    quantity: insert_data.quantity,
                    price: insert_data.totalPrice,
                }),
            });

            if (!response.ok) {
                throw new Error(`error ${response.status}`);
            }

            return { status: 200 };
        } catch (e) {
            console.error(e);
        }
    }

    async deleteCart(cart_item_id: number[]) {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/cart`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
                },
                credentials: 'include',
                body: JSON.stringify({
                    cart_item_id: cart_item_id,
                }),
            });

            if (!response.ok) {
                throw new Error(`error ${response.status}`);
            }

            return { status: 200 };
        } catch (e) {
            console.error(e);
        }
    }

    async putCart(cart_item_id: number, inde: boolean) {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/cart/${cart_item_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
                },
                credentials: 'include',
                body: JSON.stringify({ inde: inde }),
            });

            if (!response.ok) {
                throw new Error(`수량 변경 error ${response.status}`);
            }

            return { status: 200 };
        } catch (e) {
            console.error(e);
        }
    }
}
