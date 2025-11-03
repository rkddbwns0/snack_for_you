export class AdminApi {
    async getDashboardData() {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/admin/dashboard`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
                },
                credentials: 'include',
            });

            console.log(response);

            if (!response.ok) {
                throw new Error(`error ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
            return data;
        } catch (e) {
            console.error(e);
        }
    }

    async getAllSnackList() {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/admin/snack`, {
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

            const data = await response.json();
            return data;
        } catch (e) {
            console.error(e);
        }
    }

    async getAllReviewList() {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/admin/review`, {
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

            const data = await response.json();
            return data;
        } catch (e) {
            console.error(e);
        }
    }

    async getAllUserList() {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/admin/user`, {
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

            const data = await response.json();
            return data;
        } catch (e) {
            console.error(e);
        }
    }

    async changeOrderStatus(order_id: number, status: string) {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/admin/order/${order_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
                },
                credentials: 'include',
                body: JSON.stringify({ status: status }),
            });

            if (!response.ok) {
                throw new Error(`error ${response.status}`);
            }

            const responseStatus = response.status;
            const data = await response.json();
            return { status: responseStatus, data };
        } catch (e) {
            console.error(e);
        }
    }

    async deleteSnack(snack_id: number) {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/admin/snack/${snack_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`error ${response.status}`);
            }

            const data = await response.json();
            const responseStatus = response.status;

            return { status: responseStatus, data };
        } catch (e) {
            console.error(e);
        }
    }
}
