export class ReviewApi {
    async insertReview(reviewData: {
        user_id: number;
        snack_id: number;
        order_item_id: number;
        content: string;
        score: number;
    }) {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/review`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
                },
                credentials: 'include',
                body: JSON.stringify({
                    user_id: reviewData.user_id,
                    snack_id: reviewData.snack_id,
                    order_item_id: reviewData.order_item_id,
                    content: reviewData.content,
                    score: reviewData.score,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to insert review');
            }

            return response.status;
        } catch (e) {
            console.error(e);
        }
    }

    async userReview(user_id: number) {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/review/${user_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to get user review');
            }

            const data = await response.json();
            return data;
        } catch (e) {
            console.error(e);
        }
    }
}
