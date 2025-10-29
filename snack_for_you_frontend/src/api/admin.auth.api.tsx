export class AdminAuthApi {
    async adminLogin(id: string, password: string) {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/admin/auth/login`, {
                method: 'POST',
                body: JSON.stringify({
                    id,
                    password,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => {});
                alert(errorData.message || '오류가 발생했습니다 다시 시도해 주세요.');
                return;
            }

            const status = response.status;
            const data = await response.json();
            console.log(response);

            return { status, data };
        } catch (e) {
            console.error(e);
        }
    }
}
