



window.onload = function () {
    if (!localStorage.getItem('token')) {
        window.location.href = 'login.html';
    }

}
const token = localStorage.getItem('token');
console.log('Token no:', token);

     //users api //
     let allUsers=[];
   
     let loggedInUser;

     async function fetchLoggedInUserData() {
         try {
             const url = 'http://127.0.0.1:8000/api/user'; 
             const token = localStorage.getItem('token');
     
             // Check if token is available
             if (!token) {
                 console.warn('No token found in localStorage. Redirecting to login.');
                 // Redirect to login or handle token retrieval
                 window.location.href = 'login.html'; // Adjust the path as needed
                 return;
             }
     
             const response = await fetch(url, {
                 method: 'GET',
                 headers: {
                     'Content-Type': 'application/json',
                     'Accept': 'application/json',
                     'Authorization': `Bearer ${token}`
                 }
             });
     
             if (response.ok) {
                 loggedInUser = await response.json();
                 console.log('Logged-in user:', loggedInUser);
             } else if (response.status === 401) {
                 // Unauthorized, token might be expired
                 console.warn('Token expired or invalid. Redirecting to login.');
                 localStorage.removeItem('token');
                 window.location.href = 'login.html'; // Adjust the path as needed
             } else {
                 // Other errors
                 const errorText = await response.text();
                 throw new Error(`Failed to fetch logged-in user data. Status: ${response.status}. Message: ${errorText}`);
             }
     
         } catch (error) {
             console.error('Error fetching logged-in user data:', error);
         }
     }

 

async function fetchAllUsersData() {
    try {
        const url = 'http://127.0.0.1:8000/api/users';
        const token = localStorage.getItem('token');
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    
        if (response.status === 200) {
            console.log('All users data retrieved successfully');
            allUsers = await response.json();
            console.log('All users:', allUsers);

            // Process the data as needed
         
        } else {
            throw new Error('Failed to fetch all users data');
        }
    
    } catch (error) {
        console.error('Error fetching all users data:', error);
    }
}
function processUsers(postUserId) {
    const index = allUsers.findIndex(user=>user.id==postUserId)
    return index>-1 ? allUsers[index].name: 'Unknown User';
}

  //users api end //


fetchLoggedInUserData();


let objectData;
let userImage;
function filteredDataFromNavbar(data){
    const mapedData= data.posts.data.map(data=> { return({
        ...data,
        media:[],
        comments:[]
    })})
    objectData={posts:mapedData};
    generateTable();
};

async function fetchDataApiCall() {
    
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://127.0.0.1:8000/api/all/posts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        objectData=[];
        const contentType = response.headers.get('content-type');
        if (response.ok && contentType && contentType.includes('application/json')) {
            objectData = await response.json();
        } else {
            throw new Error('Received non-JSON response');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function mounted(){
    
    await fetchAllUsersData();
    await fetchDataApiCall();
    generateTable();
    
}

async function generateTable() {
  
    let mainDiv = document.querySelector('.center-block-content');
    mainDiv.innerHTML="";
    console.log("main", objectData);
    objectData.posts.forEach((post) => {
        const postDiv = document.createElement('div')
        postDiv.classList.add( 'card', 'mb-4', 'px-2')
        postDiv.innerHTML = `
        <div class="card-body content-container">
            <div class="d-flex  pt-2">
                <div class="pt-2">
                  ${post.media.map(media => {
                  return`
        <img id="image" class="image-with-title" src="http://192.168.100.17:8000/post_media/${media.file}" alt="" onError="this.onerror=null; this.src='http://127.0.0.1:8000/post_media/${media.file}';">`
                
            }).join('')}</div> 
                <div class=" title-content  d-flex flex-column pl-2">
                  <h6 class=" mt-2">${processUsers(post.user_id)}</h6>
                    <p class="update-date">${formatDate(post.updated_at)}</p>
                </div>
           <div class="ml-auto mt-4 d-none"  id="post-${post.id}">
            <!-- Use a proper icon class for delete, assuming Font Awesome is loaded -->
           <div  class="hover-effect" mr-3  onclick="showDeleteModal(${post.id})"> <svg style="cursor: pointer; background:hover \"viewBox="0 0 20 20" width="20" height="20" fill="currentColor" class="x19dipnz x1lliihq x1tzjh5l x1k90msu x2h7rmj x1qfuztq" style="--color: var(--secondary-icon);"><g fill-rule="evenodd" transform="translate(-446 -350)"><path d="M458 360a2 2 0 1 1-4 0 2 2 0 0 1 4 0m6 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0m-12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0"></path></g></svg></div>
          
        </div>
                </div>
            <div class="">
                  <h6 class=" mt-3" style="font-size: 15px;">${post.title}</h6>
          <p>${post.content}</p>
        ${post.media.map(media => {
            // console.log('Rendering media:', media);
            return `
             ${media.file_type === 'image' ? `<img class="main-image w-100 my-3" src="http://192.168.100.17:8000/post_media/${media.file}" alt="" onError="this.onerror=null; this.src='http://127.0.0.1:8000/post_media/${media.file}';">` : ''}
                ${media.file_type === 'video' ? `
                    <video class="main-video  w-100 my-3" controls >
                        <source src="http://127.0.0.1:8000/post_media/${media.file }" type="video/mp4" >
                        Your browser does not support the video tag.
                    </video>` : ''}
            `;
        }).join('')}
            </div>
          
        </div>
            <div class="comments-section">
            <div class="d-flex justify-content-center text-center">
          
                 
            <h6  class="comments d-flex" style="width: 32%; gap: 5px;"  onclick="showComment(${post.id})" style="cursor: pointer;" ><div><i data-visualcompletion="css-img" class="x1b0d499 x1d69dk1" style="background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v3/yR/r/d37oeqVDaKw.png?_nc_eui2=AeGk4WKZ5swwS_zPlhVSUVQZCLBfmXT4-lUIsF-ZdPj6VcZ0amikyKxPwlCn5G7EBXmbgCOcYGL_ZuJr59kBCXg-&quot;); background-position: 0px -550px; background-size: auto; width: 20px; height: 20px; background-repeat: no-repeat; display: inline-block;"></i> </div> Comments ${post.comments.length} </h6>    </div>

          
            </div>   <div class="postCommentSection" style="max-height:300px;" >  <ul class="list-unstyled d-none" id="comments${post.id}">
            ${post.comments.map(comment => `
                <div class="d-flex gap-3">
                    <img class="image-with-comment mb-4"  src="${post.image ? post.image : 'css.jpeg'}" alt="">
                    <li class="mb-0"><div class="text-black" style="font-weight: 500;"> ${processUsers(comment.user_id)}</div> <span class="pl-2 ">${comment.content}</span></li> 
                </div>
                <div class="mb-3 pl-5 text-black-50" style="font-size:12px;padding-left: 70px !important;">${formatDate(comment.created_at)}</div> `).join('')}
            
            </ul></div>
          <div class=" d-none" id="commentSection${post.id}">
        <div class="d-flex">
            <img class="image-with-comment mb-4"  src="${post.image ? post.image : 'css.jpeg'}" alt="">
          <div class="input-wrapper">
    <input class="commentInput " type="text" id="item${post.id}" placeholder="Write something here...">
    <span class="check-icon" onclick="makeComment(${post.id},${loggedInUser.id})">
        <svg class="svgPath" title="Comment" fill="#3276c3" height="24px" width="24px" version="1.1"
            id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 32 32" xml:space="preserve">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <path
                    d="M29.3,2.6c-0.3-0.2-0.7-0.3-1-0.2L3,11.7c-0.4,0.1-0.7,0.5-0.7,0.9c0,0.4,0.3,0.8,0.7,0.9l10.2,3.8l10-10 c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-9.8,9.8l6.6,10.6c0.2,0.3,0.5,0.5,0.8,0.5c0.1,0,0.1,0,0.2,0c0.4-0.1,0.7-0.4,0.8-0.7l6.2-25.2 C29.7,3.3,29.6,2.9,29.3,2.6z">
                </path>
            </g>
        </svg>
    </span>
</div></div>  

         </div>
        `;
      
        mainDiv.prepend(postDiv);
        if( post.user_id === loggedInUser.id){
            document.getElementById(`post-${post.id}`).classList.remove('d-none')
        }
    });


};
function formatDate(dateString) {
    const date = new Date(dateString);
    const currentDate = new Date();
    

    if (date.toDateString() === currentDate.toDateString()) {
        return "Today";
    } else {
      
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
    }
}


const date1 = "2024-07-20T10:41:29.000000Z";
// console.log(formatDate(date1));

mounted();


// const inputData = () => {


//     const inputTex = document.querySelector("#item").addEventListener('input', (event) => {
//         const checkIcon = document.querySelector('.check-icon');

//         const inputValue = inputTex.value.trim();

//         checkIcon.style.color = inputValue.length > 0 ? 'blue' : 'red';

//         console('hii')
//     });
// }
// inputData();
 // console.log("hhhhhhhhhh", objectData)
    // get user image
    //     objectData.posts.forEach((user) =>{
    //         userImage=user.image;
    //         // console.log("user",userImage)
    //     });

    //     const mainDiv = document.querySelector('.center-block-content');
    //     const rowDiv = document.createElement('div');

    //     rowDiv.innerHTML = `
    //         <div class="card h-25 col-md-6 col-lg-12 mb-4">
    // <div class="d-flex gap-3 align-items-center  mt-3 ">
    // <img class="image-with-comment mb-4 " src="${userImage  ? post.image : 'css.jpeg'}" alt="">
    // <div class="post-data ml-2 ">
    //     <input  onclick="uploadData()" type="text" id="item" placeholder="What's on your mind,">
    // </div>
    // </div>
    // <div class="d-flex justify-content-between mt-2"> 
    // <button class="upload-button " onclick="goLive()">
    //     <span class="pr-2 x3nfvp2 x1c4vz4f x2lah0s x1emribx"><img height="24" width="24" alt="" class="xz74otr" referrerpolicy="origin-when-cross-origin" src="https://static.xx.fbcdn.net/rsrc.php/v3/yr/r/c0dWho49-X3.png?_nc_eui2=AeHfTBw4pv1edFvkjGzWm9v4VnUPE18ZZ-dWdQ8TXxln5-1MEI7wV-8-ONOl9_SqgS07R1_Gg2-xy9_U5zu0PvNx"></span>Live video
    // </button>
    // <button class="upload-button "  onclick="uploadData()">
    //     <span class="pr-2 x3nfvp2 x1c4vz4f x2lah0s x1emribx">
    //         <img height="24" width="24" alt="" class="xz74otr" referrerpolicy="origin-when-cross-origin" src="https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/Ivw7nhRtXyo.png?_nc_eui2=AeEtOYpPakBSK4uNhgNJHxwKPL4YoeGsw5I8vhih4azDklN5Gn5i2IkBlImqQg3mgNLalFPGmRjwyu299q-TvTCM">
    //     </span>Photo/video
    // </button>
    // <button class="upload-button">
    //   <span class="pr-2  x3nfvp2 x1c4vz4f x2lah0s x1emribx"><img height="24" width="24" alt="" class="xz74otr" referrerpolicy="origin-when-cross-origin" src="https://static.xx.fbcdn.net/rsrc.php/v3/y-/r/t2NS5_5UwDb.png?_nc_eui2=AeEuY3FKKSr7elsHWvPC_d2JYGYEKrJ98ZZgZgQqsn3xlrRBWKkiRRSFH59EyiD0AYhpSBtXqKigc56JXSCK3uR5"></span>  Reals
    // </button>
    // </div>
    // </div>


    //     `;
    //     mainDiv.appendChild(rowDiv);
  
















    