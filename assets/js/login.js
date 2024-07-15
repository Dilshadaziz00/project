// function checkPassword(value) {
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|:"<>?~`-]).{8,}$/;
//     const isValidPassword = passwordRegex.test(value);


//     if (isValidPassword) {
//         document.querySelector('.login-btn').disabled = false
//     } else {
//         document.querySelector('.login-btn').disabled = true
//     }
// }
function togglePassword(inputElement) {
    const eyeElements = document.querySelectorAll('.eye-btn')
    eyeElements.forEach(eye => {
        eye.classList.toggle('d-none')
    })
    // currentElement.classList.toggle('d-none')
    inputElement.type = inputElement.type == 'password' ? 'text' : 'password'
}
// var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
// var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
// return new bootstrap.Tooltip(tooltipTriggerEl)
// })







async function loginApiCall(email, password) {
    let userLoginData = { email: email, password: password };
    // let userLoginData = { email: "alikhan@gmail.com", password: "11223344" };

    try {
        const response = await fetchCall('api/login', 'post', userLoginData);
        console.log("response", response);
        console.log("response", response.token);

        if (response &&  response.token) {
            localStorage.setItem('token', response.token);
            console.log('Login successful. Token stored:', response.token);
            window.location.href = 'index.html'; 
        } else {
           
            displayError(response)
            console.log("response", response);
           
            console.error('Login failed. No token received.');
        }
    } catch (error) {
        displayError({ email: ['Network error. Please try again.'] }); 
        console.error('Error during login:', error);
    }
};




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
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

function displayError(response) {
    let emptyDiv = document.querySelector('.invalid-div');
    emptyDiv.innerHTML = ''; 
        response.email.forEach(errorMsg => {
            let errorMessage = document.createElement('span');
            errorMessage.textContent = errorMsg;
            emptyDiv.appendChild(errorMessage);
               errorMessage.textContent = 'Invalid email or password.';
        emptyDiv.appendChild(errorMessage);
        });
   
};

const loginUser = (e) => {
    e.preventDefault();
    let email = document.querySelector('.input-email').value;
    let password = document.querySelector('.input-password').value;
    loginApiCall(email, password);
};

document.querySelector('.login-form').addEventListener('submit', loginUser);
























// let tokenValue = localStorage.getItem('token');
// let userps = document.querySelector('#signUpPassword')
// let input = document.querySelector('#signUpEmail')
// const userLoginData={ email:'email.value', password:'password.value'  }
// console.log(tokenValue);

    // const loginUser=()=>{
    //     if(tokenValue && input.value !="") {
           

    //     }
    //     else{
    //         console.log("User is not logged in.");
    //     }
    // }
   