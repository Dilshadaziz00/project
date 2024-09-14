
document.getElementById('nav').innerHTML = `

<nav class="navbar navbar-expand-lg p-0 w-100 navbar-dark bg-dark fixed-top">
<div class="d-flex flex-wrap">
<a href="">
<img src="css.jpeg" style="border-radius: 50%; width: 55px; height:55px;" class="navbar-brand ml-2">
</a>
<input class="searchInput d-flex flex-wrap bg-dark text-white p-2 rounded-0 border-0" type="search" placeholder="Search here">
 </div> <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav mr-auto">
       
    </ul>
    <ul class="navbar-nav">
      <li class="nav-item dropdown bg-dark">
        <a class="nav-link dropdown-toggle mt-3 " href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <i class="fas fa-user"></i> User Profile
        </a>
        <div class="dropdown-menu dropdown-menu-right "  aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="" id="user-profile">View Profile</a>
          <span class="dropdown-item"  id="logoutButton" >Logout</span>
          <span class="dropdown-item" id="UpdatePassword" type="button" >Update Password</span>
          </div>
      </li>
    </ul>
  </div>
</nav>
<div class="modal fade" id="userProfileModal" tabindex="-1" aria-labelledby="userProfileModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="userProfileModalLabel">User Profile</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <div>
       <div class="form-group">
        <label for="userProfileName">Name:</label>
        <input type="text" class="form-control" id="userProfileName" readonly>
    </div>
    <div class="form-group">
        <label for="userProfileEmail">Email:</label>
        <input type="email" class="form-control" id="userProfileEmail" readonly>
    </div>
    </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
 
<!-- Button to trigger modal -->


<!-- Modal -->
<div class="modal fade" id="passwordChangeModal" tabindex="-1" role="dialog" aria-labelledby="passwordChangeModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="passwordChangeModalLabel">Change Password</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <!-- Password change form -->
        <form id="passwordChangeForm">
          <div class="form-group">
            <label for="currentPassword">Current Password:</label>
            <input type="password" class="form-control" id="currentPassword" required>
          </div>
          <div class="form-group">
            <label for="newPassword">New Password:</label>
            <input type="password" class="form-control" id="newPassword" required>
          </div>
          <div class="form-group">
            <label for="confirmPassword">Confirm Password:</label>
            <input type="password" class="form-control" id="confirmPassword" required>
          </div>
          <button type="submit" class="btn btn-primary" >Update</button>
        </form>
      </div>
    </div>
  </div>
</div>
     <!-- user profile modal -->
<div class="modal fade" tabindex="-1" id="profileModal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title logout-text d-none">Logout Confirmation</h5>
                <h5 class="modal-title deleteConfirm d-none">Delete Post Confirmation</h5>
                <button class="close" data-bs-dismiss="modal" onclick="$('#profileModal').modal('hide')" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p class="logout-text d-none">Are you sure you want to log out?</p>
                <p class="deleteConfirm d-none">Are you sure you want to delete this post?</p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-danger logout-text logOutConfirm d-none">Yes</button>
                <button class="btn btn-danger deleteBtn deleteConfirm d-none" data-post-id="">Yes</button>
                <button class="btn btn-secondary" onclick="$('#profileModal').modal('hide')">No</button>
            </div>
        </div>
    </div>
</div>

 `
// ; document.getElementById('user-profile').addEventListener('click', function(event) {
//   event.preventDefault();
//   const userData = JSON.parse(localStorage.getItem('login'));
//   if (userData) {
//     const user = userData[0];
//     document.getElementById('userProfileName').value = user.name;
//     document.getElementById('userProfileEmail').value = user.email;
//     $('#userProfileModal').modal('show');
//   }
// });

// document.getElementById('UpdatePassword').addEventListener('click', function(event) {
//   event.preventDefault();
//   $('#passwordChangeModal').modal('show');
// });

// document.getElementById('passwordChangeForm').addEventListener('submit', async function(event) {
//   event.preventDefault();
//   // console.log(localStorage.getItem('login'));
//   const user = JSON.parse(localStorage.getItem('login'))[0];
//   // if (user) {
//     const currentPassword = document.getElementById('currentPassword').value;
//     const newPassword = document.getElementById('newPassword').value;
//     const confirmPassword = document.getElementById('confirmPassword').value;

//     if (newPassword != confirmPassword) {
//       alert("New password and confirm password don't match.");
//       return;
//     }

//     if (user.password != currentPassword) {
//       alert("Current password is incorrect.");
//       return;
//     }

//     user.password = newPassword;
//     async function updateUser(user) {
//       // console.log(user)
//       if (user.userType=='student'){
//         const updatedStudent  = await apiCall('students/'+user.id, 'put', user);

//           localStorage.setItem('login', JSON.stringify([updatedStudent]));
//           alert('Password updated successfully for student!');

//       } else if (user.userType == 'employee'){

//         const updatedEmployee  = await apiCall('users/'+user.id, 'put', user);
//         localStorage.setItem('login', JSON.stringify([updatedEmployee]));
//         alert('Password updated successfully for employee!');
//       }
//       else {
//         alert('Unknown user type. Password update failed.');
//       }
//       $('#passwordChangeModal').modal('hide');
//   }
//     updateUser(user);
//   // }
// });

// async function apiCall(url = '', method = 'get', payload = null) {
//   const requestOptions = {
//       method: method,
//       headers: {
//           'Content-Type': 'application/json',
//       },
//   };

//   if (payload) {
//       requestOptions.body = JSON.stringify(payload);
//   }

//   return await fetch('http://localhost:3000/' + url, requestOptions)
//       .then((data) => data.json())
//       .then((data) => data);
// };


  


  ///filter api //


  async function fetchFilteredPosts(perPage, searchQuery) {

  try {
      const token = localStorage.getItem('token'); 
      const requestOptions = {
          method: 'GET', 
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${token}`
          },
      };
     
      const response = await fetch(`http://127.0.0.1:8000/api/post/filter?per_page=${perPage}&search=${searchQuery}`, requestOptions);

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      const data= await response.json();
      console.log('Filtered Posts:', data);
      // Call function to display filtered posts, e.g., update UI
      // displayFilteredPosts(data);
      filteredDataFromNavbar(data);
  } catch (error) {
      console.error('Error fetching filtered posts:', error);
  }
}

document.querySelector('.searchInput').addEventListener('input', (event) => {
 
  const searchQuery = event.target.value.trim();
  const perPage = 2000;

  if (searchQuery !== "") {
      fetchFilteredPosts(perPage, searchQuery);
  } else {
       mounted();
  }
});




const toggleModalBtns = (visibleBtn) => {
  const logoutTextElements = document.querySelectorAll('.logout-text');
  const deleteConfirmElements = document.querySelectorAll('.deleteConfirm');

  if (visibleBtn === 'Yes') {
    logoutTextElements.forEach(el => el.classList.add('d-none'));
    deleteConfirmElements.forEach(el => el.classList.remove('d-none'));
  } else {
    logoutTextElements.forEach(el => el.classList.remove('d-none'));
    deleteConfirmElements.forEach(el => el.classList.add('d-none'));
  }
};

document.getElementById('logoutButton').addEventListener('click', function(event) {
  event.preventDefault();
  toggleModalBtns('No');
  $('#profileModal').modal('show');
  console.log("Initiating logout...");
});





//  logout api ///
async function logOutApiCall() {
  try {
      const response = await fetchCall('api/logout', 'POST');
      console.log("API response:", response);

      if (response) {
          localStorage.removeItem('token');
          setTimeout(() => {
              window.location.href = 'login.html';
          }, 1500);
      } else {
          console.error('Logout failed. No valid response received.');
      }
  } catch (error) {
      console.error('Error during logout:', error);
  }
}

async function fetchCall(url = '', method = 'POST', payload = null) {
  const token = localStorage.getItem('token');
  if (!token) {
      console.error('No token found. User might not be logged in.');
      return; // Stop further execution if there's no token
  }
  console.log('token', token);

  const requestOptions = {
      method: method,
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
      },
  };

  if (payload) {
      requestOptions.body = JSON.stringify(payload);
  }

  try {
      const response = await fetch('http://127.0.0.1:8000/' + url, requestOptions);

      if (!response.ok) {
          console.error('Network response was not ok:', response.statusText);
          throw new Error('Network response was not ok');
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          console.log("Fetch response data:", data);
          return data;
      } else {
          const text = await response.text();
          console.warn("Non-JSON response received:", text);
          return text;
      }
  } catch (error) {
      console.error('Fetch error:', error);
      throw error;
  }
}

document.querySelector('.logOutConfirm').addEventListener('click', function(event) {
  event.preventDefault();
  logOutApiCall();
  $('#profileModal').modal('hide');
});

//  logout api  end///
