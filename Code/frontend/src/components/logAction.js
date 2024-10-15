export const logAction = async (message) => {
    try {
        const response = await fetch('http://localhost:3030/api/log', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
                message,
                timestamp: new Date().toISOString(),
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to log action');
        }

        //console.log('Action logged:', message);
    } catch (error) {
        console.error('Error logging action:', error);
    }
};
