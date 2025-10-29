export class UserAuthApi {
    async logout() {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/logout`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
                },
            });

            if (response.ok) {
                sessionStorage.clear();
                return { status: response.status };
            }
        } catch (e) {
            console.error(e);
        }
    }
}
