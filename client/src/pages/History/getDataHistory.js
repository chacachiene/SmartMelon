export const getAll = async (feed) => {
    try {
        const response = await fetch(`http://localhost:5000/history`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        return data;
        }
    catch (error) {
        console.error(error);
    }
}

export const createHistory = async (history) => {
    try {
        const response = await fetch(`http://localhost:5000/history`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(history),
        });
        const data = await response.json();
        return data;
        }
    catch (error) {
        console.error(error);
    }
}