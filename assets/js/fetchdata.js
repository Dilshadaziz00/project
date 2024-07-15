
let objectData;
let userImage;
async function fetchDataApiCall() {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/all/posts');

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            objectData = await response.json();
        } else {
            throw new Error('Received non-JSON response');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function generateTable() {
    await fetchDataApiCall();
     console.log("hhhhhhhhhh",objectData)
    // get user image
    objectData.posts.forEach((user) =>{
        userImage=user.image;
        console.log("user",userImage)
    });
    
    const mainDiv = document.querySelector('.center-block-content');
    const rowDiv = document.createElement('div');
   
    rowDiv.innerHTML = `
        <div class="card h-25 col-md-6 col-lg-12 mb-4">
<div class="d-flex gap-3 align-items-center  mt-3 ">
<img class="image-with-comment mb-4 " src="${userImage  ? post.image : 'css.jpeg'}" alt="">
<div class="post-data ml-2 ">
    <input  onclick="uploadData()" type="text" id="item" placeholder="What's on your mind,">
</div>
</div>
<div class="d-flex justify-content-between mt-2"> 
<button class="upload-button " onclick="goLive()">
    <span class="pr-2 x3nfvp2 x1c4vz4f x2lah0s x1emribx"><img height="24" width="24" alt="" class="xz74otr" referrerpolicy="origin-when-cross-origin" src="https://static.xx.fbcdn.net/rsrc.php/v3/yr/r/c0dWho49-X3.png?_nc_eui2=AeHfTBw4pv1edFvkjGzWm9v4VnUPE18ZZ-dWdQ8TXxln5-1MEI7wV-8-ONOl9_SqgS07R1_Gg2-xy9_U5zu0PvNx"></span>Live video
</button>
<button class="upload-button "  onclick="uploadData()">
    <span class="pr-2 x3nfvp2 x1c4vz4f x2lah0s x1emribx">
        <img height="24" width="24" alt="" class="xz74otr" referrerpolicy="origin-when-cross-origin" src="https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/Ivw7nhRtXyo.png?_nc_eui2=AeEtOYpPakBSK4uNhgNJHxwKPL4YoeGsw5I8vhih4azDklN5Gn5i2IkBlImqQg3mgNLalFPGmRjwyu299q-TvTCM">
    </span>Photo/video
</button>
<button class="upload-button">
  <span class="pr-2  x3nfvp2 x1c4vz4f x2lah0s x1emribx"><img height="24" width="24" alt="" class="xz74otr" referrerpolicy="origin-when-cross-origin" src="https://static.xx.fbcdn.net/rsrc.php/v3/y-/r/t2NS5_5UwDb.png?_nc_eui2=AeEuY3FKKSr7elsHWvPC_d2JYGYEKrJ98ZZgZgQqsn3xlrRBWKkiRRSFH59EyiD0AYhpSBtXqKigc56JXSCK3uR5"></span>  Reals
</button>
</div>
</div>

          
    `;
    mainDiv.appendChild(rowDiv);
    console.log("main", objectData);
    objectData.posts.forEach((post) => {

        const postDiv = document.createElement('div')
        postDiv.classList.add('card', 'mb-4', 'px-2')
        postDiv.innerHTML = `
        <div class="card-body content-container">
            <div class="d-flex  pt-2">
                <div class="pt-2">
                    <img class="image-with-title "src="${post.image ? post.image : 'css.jpeg'}" alt="">
                </div>
                <div class=" title-content  d-flex flex-column pl-2">
                    <h6 class=" mt-3">${post.title}</h6>
                    <p class="update-date">${post.updated_at}</p>
                </div>
            </div>
            <div class="">
                <p>${post.content.substr(0, 150)}...</p>
                <img class="main-image my-3" src="${post.image ? post.image : 'css.jpeg'}" alt="">
            </div>
          
        </div>
            <div class="comments-section">
            <h6>Comments:</h6>
            <ul class="list-unstyled">
                ${post.comments.map(comment => `
                <div class="d-flex gap-3">
                   <img class="image-with-comment mb-4"  src="${post.image ? post.image : 'css.jpeg'}" alt=""> <li>${comment.content}</li>
                 </div> `).join('')}
            </ul>

        <div class="">
            <img class="image-with-comment mb-4"  src="${post.image ? post.image : 'css.jpeg'}" alt="">
            <div class="input-wrapper">
                <input type="text" id="item"  placeholder="Write something here...">
                <span class="check-icon "><svg  title="Comment" class="" fill="#3276c3" height="24px" width="24px" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M29.3,2.6c-0.3-0.2-0.7-0.3-1-0.2L3,11.7c-0.4,0.1-0.7,0.5-0.7,0.9c0,0.4,0.3,0.8,0.7,0.9l10.2,3.8l10-10 c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-9.8,9.8l6.6,10.6c0.2,0.3,0.5,0.5,0.8,0.5c0.1,0,0.1,0,0.2,0c0.4-0.1,0.7-0.4,0.8-0.7l6.2-25.2 C29.7,3.3,29.6,2.9,29.3,2.6z"></path> </g></svg></span>
            </div>
         </div>

        `;
        mainDiv.appendChild(postDiv);
    });


};
generateTable();


// const inputData = () => {


//     const inputTex = document.querySelector("#item").addEventListener('input', (event) => {
//         const checkIcon = document.querySelector('.check-icon');

//         const inputValue = inputTex.value.trim();

//         checkIcon.style.color = inputValue.length > 0 ? 'blue' : 'red';

//         console('hii')
//     });
// }
// inputData();

