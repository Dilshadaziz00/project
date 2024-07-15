async function logOutApiCall() {
    try {
        const response = await fetchCall('api/logout', 'post');
        console.log("API response:", response);
       
        if (response && response.ok) {
            console.log("Logout successful, redirecting to login page...");
            localStorage.removeItem('token');
            window.location.href = 'login.html'; 
        } else {
            console.error('Logout failed. No valid response received.');
        }
    } catch (error) {
        console.error('Error during logout:', error);
    }
}

async function fetchCall(url = '', method = 'post', payload = null) {
    const requestOptions = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (payload) {
        requestOptions.body = JSON.stringify(payload);
    }

    try {
        const response = await fetch('http://127.0.0.1:8000/' + url, requestOptions);
        
        // Check if response status is not ok
        if (!response.ok) {
            console.error('Network response was not ok:', response.statusText);
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        console.log("Fetch response data:", data);
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

document.querySelector('.logoutButton').addEventListener('click', function() {
    console.log("Initiating logout...");
    logOutApiCall();
});
