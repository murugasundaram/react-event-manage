const useHttp = async (configData) => {
    const baseUrl = 'https://node-expenses.onrender.com/';
    //const baseUrl = 'http://localhost:8001/';

    try {
        const apiUrl = baseUrl + configData.url;

        const response = await fetch(apiUrl, {
            method : configData.method || 'GET',
            body : configData.body ? JSON.stringify(configData.body) : null,
            headers: {
                'Content-Type': 'application/json', // Use 'Content-Type' here
            },
        })

        if (!response.ok) {
            throw new Error('Request failed!');
        }
    
        const data = await response.json();

        return {
            error: false,
            data: data
        };

    } catch (err) {

        return {
            error: true,
            msg: err
        };
    } 
}

export default useHttp;