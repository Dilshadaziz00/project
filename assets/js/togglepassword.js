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

