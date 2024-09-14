// let loggedInUser;

// async function fetchLoggedInUserData() {
//     try {
//         const url = `http://127.0.0.1:8000/api/user`; 
//         const token = localStorage.getItem('token');
        
//         const response = await fetch(url, {
//             method: 'GET',
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         });
    
//         if (response.status === 200) {
//             loggedInUser = await response.json();
//             console.log('Logged-in user:', loggedInUser);
//         } else {
//             throw new Error('Failed to fetch logged-in user data');
//         }
    
//     } catch (error) {
//         console.error('Error fetching logged-in user data:', error);
//     }
// };


async function deletePost(postId) {
  
     
  try {
    
  
    const url = `http://127.0.0.1:8000/api/post/destroy?post_id=${postId}`;
    const token = localStorage.getItem('token');
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response)
       {
      console.log('Post deleted successfully');
      document.querySelector('.center-block-content').innerHTML="";
      mounted();
      
    }
    else{
      alert("You can not delete other user post.")
    }

    if (!response.ok) {
      throw new Error('Failed to delete post');
    }

  } catch (error) {
    console.error('Error deleting post:', error);
  }
}


function showDeleteModal(postId) {
  toggleModalBtns('Yes');
  $('#profileModal').modal('show');

  // Set the data-post-id attribute
  document.querySelector('.deleteBtn').setAttribute('data-post-id', postId);
  console.log(`Set data-post-id attribute: ${postId}`);
}



document.querySelector('body').addEventListener('click', async function(event) {
  if (event.target && event.target.classList.contains('deleteBtn')) {
    event.preventDefault();

    const postId = event.target.getAttribute('data-post-id');
    console.log(`Retrieved data-post-id attribute: ${postId}`);

    await deletePost(postId);

    $('#profileModal').modal('hide');
  }
});

