export class AdminApi {
    // 대시보드 데이터 조회 (총 주문 수, 총 상품 수, 총 사용자 수, 총 리뷰 수, 최근 주문 상품 및 리뷰 -> 당일을 기준으로 7일 이전 데이터만 추출)
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

    // 상품 목록 조회
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

    // 주문 목록 조회
    async getAllOrderList() {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/admin/order`, {
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

    // 주문 상세 조회
    async getOrderDetail(order_id: number) {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/admin/order/${order_id}`, {
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

    // 리뷰 목록록 조회
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

    // 사용자 목록 조회
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

    // 주문 상태 변경
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

    // 상품 삭제
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
