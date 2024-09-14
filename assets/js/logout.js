// async function logOutApiCall() {
//     try {
//         const response = await fetchCall('api/logout', 'POST');
//         console.log("API response:", response);

//         if (response) {
//             localStorage.removeItem('token');
//             setTimeout(() => {
//                 window.location.href = 'login.html';
//             }, 1500);
//         } else {
//             console.error('Logout failed. No valid response received.');
//         }
//     } catch (error) {
//         console.error('Error during logout:', error);
//     }
// }

// async function fetchCall(url = '', method = 'POST', payload = null) {
//     const token = localStorage.getItem('token');
//     if (!token) {
//         console.error('No token found. User might not be logged in.');
//         return; // Stop further execution if there's no token
//     }
//     console.log('token', token);

//     const requestOptions = {
//         method: method,
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json',
//             'Authorization': `Bearer ${token}`
//         },
//     };

//     if (payload) {
//         requestOptions.body = JSON.stringify(payload);
//     }

//     try {
//         const response = await fetch('http://127.0.0.1:8000/' + url, requestOptions);

//         if (!response.ok) {
//             console.error('Network response was not ok:', response.statusText);
//             throw new Error('Network response was not ok');
//         }

//         const contentType = response.headers.get('content-type');
//         if (contentType && contentType.includes('application/json')) {
//             const data = await response.json();
//             console.log("Fetch response data:", data);
//             return data;
//         } else {
//             const text = await response.text();
//             console.warn("Non-JSON response received:", text);
//             return text; // or handle as needed
//         }
//     } catch (error) {
//         console.error('Fetch error:', error);
//         throw error;
//     }
// }

// document.querySelector('.logOutConfirm').addEventListener('click', function(event) {
//     event.preventDefault();
//     logOutApiCall();
//     $('#profileModal').modal('hide');
// });


// document.querySelector('.logoutButton').addEventListener('click', function() {
//     console.log("Initiating logout...");
//     if (confirm("Are you sure you want to log out?")) {
//     logOutApiCall();
// }
// });
// document.getElementById('logoutButton').addEventListener('click', function(event) {
//     event.preventDefault();
//     if (confirm("Are you sure you want to log out?")) {
//       localStorage.removeItem('login');
//       window.location.href = 'loginpage.html';
//     }
//   });