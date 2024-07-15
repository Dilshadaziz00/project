async function apiCall(name, email, password) {
    const userInputs = { name: name, email: email, password: password };
    // const userInputs = { name: "Ali khan", email: "alikhan11@gmail.com", password: "66778899" };
    const messageDiv = document.querySelector('#message');

    try {
        const response = await fetchCall('api/register', 'post', userInputs);
        console.log("response", response);

        if (response ) {
        
             document.querySelector('.register-page').classList.add('d-none');
            messageDiv.innerHTML = "Your registration was successful!";
            messageDiv.style.color = "green";
            messageDiv.classList.remove('d-none')
            setTimeout(() => {
            window.location.href = 'login.html';
            }, 1500);
        }
    } catch (error) {
        console.error("Error during API call", error);
        messageDiv.innerHTML = "An error occurred during registration. Please try again.";
        messageDiv.style.color = "red";
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
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
};

const userRegister =(e) => {
    e.preventDefault();
    console.log("Form submitted");
    const name = document.querySelector('.registerName').value;
    const email = document.querySelector('.registerEmail').value;
    const password = document.querySelector('.registerPassword').value;

    apiCall(name, email, password);
};

document.querySelector('.registerForm').addEventListener('submit', userRegister);
