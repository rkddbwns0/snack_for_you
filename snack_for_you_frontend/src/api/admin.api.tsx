export class AdminApi {
    async getDashboardData() {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/admin/dashboard`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
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
}
