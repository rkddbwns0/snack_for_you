export class OrderApi {
    async insertOrder(data: any) {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
                },
                credentials: 'include',
                body: JSON.stringify({
                    cart: data.cart,
                    user_id: data.user_id,
                    address_id: data.address_id,
                    total_price: data.totalPrice,
                    payment_method: data.payment_method,
                    items: data.items,
                }),
            });

            if (!response.ok) {
                throw new Error(`error ${response.status}`);
            }

            const result = await response.json();
            return { status: 200, order_id: result?.order_id };
        } catch (e) {
            console.error(e);
        }
    }

    async getOrder(order_id: number) {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/order/${order_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
                },
            });

            if (!response.ok) {
                throw new Error(`error ${response.status}`);
            }

            const result = await response.json();
            return { result };
        } catch (e) {
            console.error(e);
        }
    }

    async getAllOrder(user_id: number) {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/order/list/${user_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`error ${response.status}`);
            }

            const result = await response.json();
            return result;
        } catch (e) {
            console.error(e);
        }
    }
}
