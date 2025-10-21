export class FavoriteApi {
    async getFavorite(user_id: number) {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/favorite/${user_id}`, {
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

    async favorite(user_id: number, snack_id: number) {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/favorite`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
                },
                credentials: 'include',
                body: JSON.stringify({
                    user_id: user_id,
                    snack_id: snack_id,
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

    async favoriteList(user_id: number) {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/favorite/list/${user_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
                },
                credentials: 'include',
            });

            const data = await response.json();

            return data;
        } catch (e) {
            console.error(e);
        }
    }
}
