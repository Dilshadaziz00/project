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


window.onload = function () {
    if (localStorage.getItem('token')) {
        // window.location.href = 'login.html';
        window.location.href = 'index.html';
    }
  
    
}

let responseData;


async function loginApiCall(email, password) {
    let userLoginData = { email: email, password: password };

 
    try {
        const response = await fetchCall('api/login', 'post', userLoginData);
        console.log("response", response);
        responseData = response;
    } catch (error) {
        displayError({ email: ['Network error. Please try again.'] });
        console.error('Error during login:', error);
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
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

const loginUser = async (e) => {
    e.preventDefault();
    let email = document.querySelector('.input-email').value;
    let password = document.querySelector('.input-password').value;

    await loginApiCall(email, password);

    if (responseData && responseData.token) {


        localStorage.setItem('token', responseData.token);
        console.log('Login successful. Token stored:', responseData.token);
        window.location.href = 'index.html';
    } else {
        displayError(responseData);
        console.log("response", responseData);
        console.error('Login failed. No token received.');
    }
};

document.querySelector('.login-form').addEventListener('submit', loginUser);

function displayError(responseData) {
    let emptyDiv = document.querySelector('.invalid-div');
    emptyDiv.innerHTML = '';
    
    if (responseData && responseData.email) {
        responseData.email.forEach(errorMsg => {
            let errorMessage = document.createElement('span');
            errorMessage.textContent = errorMsg;
            emptyDiv.appendChild(errorMessage);
        });
    } else {
        let errorMessage = document.createElement('span');
        errorMessage.textContent = 'Invalid email or password.';
        emptyDiv.appendChild(errorMessage);
    }
}



loginUser()















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
   