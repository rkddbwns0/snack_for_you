export class SnackApi {
    async getSnack(category_id: number) {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/snack/${category_id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
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

    async SnackDeatil(category_id: number, snack_id: number) {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/snack/${category_id}/${snack_id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
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

    async getRandomSnack() {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/snack`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            console.log(response);

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
