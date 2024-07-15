

const goLive = () => {
    $('#liveModal').modal('show');
};
const uploadData = () => {
    console.log("jjjjjjj")
    let card = document.querySelector('.popup-card');
    card.classList.remove('d-none');
    $('#uploadDataModal').modal('show');
};
const hideCard = () => {
    let card = document.querySelector('.popup-card');
    card.classList.add('d-none');
    console.log("ggg");
};

   

   
let input = document.querySelector('.modal-input');
let nextButton = document.querySelector('.next-button');

input.addEventListener('keyup', (event) => {
    const inputValue = input.value.trim();
    console.log("input", inputValue);
    if (inputValue.length > 0) {
        nextButton.style.background = '#0861F2';
        nextButton.style.cursor = 'pointer';
        nextButton.style.color = '#fff';
    } else {
        nextButton.style.background = '#D8DADF';
        nextButton.style.cursor = 'not-allowed '; 
        nextButton.style.color = '#8b8e9a'; 
    
    }
});

function triggerFileUpload() {
    document.getElementById('profile_media_input').click();
}

function previewMedia(event) {
    const file = event.target.files[0];
    const previewImage = document.getElementById('profile_pic_preview');
    const previewVideo = document.getElementById('profile_video_preview');
    const addMediaText = document.querySelector('.add_media_text');
    const videoSourceMp4 = document.getElementById('profile_video_source_mp4');
    const videoSourceOgg = document.getElementById('profile_video_source_ogg');

    if (file) {
        const fileType = file.type.split('/')[0];

        if (fileType === 'image') {
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImage.src = e.target.result;
                previewImage.classList.remove('d-none');
                previewVideo.classList.add('d-none');
            };
            reader.readAsDataURL(file);
        } else if (fileType === 'video') {
            const reader = new FileReader();
            reader.onload = function(e) {
                const videoUrl = URL.createObjectURL(file);
                videoSourceMp4.src = videoUrl;
                videoSourceOgg.src = videoUrl; 
                previewVideo.load();
                previewVideo.classList.remove('d-none');
                previewImage.classList.add('d-none');
            };
            reader.readAsDataURL(file);
        }
        nextButton.style.background = '#0861F2';
        nextButton.style.cursor = 'pointer';
        nextButton.style.color = '#fff';
        addMediaText.classList.add('d-none');
    } else {
        nextButton.style.background = '#D8DADF';
        nextButton.style.cursor = 'not-allowed '; 
        nextButton.style.color = '#8b8e9a';
        previewImage.classList.add('d-none');
        previewVideo.classList.add('d-none');
        addMediaText.classList.remove('d-none');
    }
}
   



//  //



async function postApiCall() {
    try {
        const payload = {
            title: 'laravel',
            content: 'hiii',
            userId: 33
        };
        
        const response = await fetchCall('api/post/store', 'post', payload);
        console.log("postApiCall response:", response);
        
        if (response && response.status === 'success') {
            console.log('Post added successfully:', response.data);
        } else {
            console.error('Failed to add post. Response:', response);
        }
    } catch (error) {
        console.error('Error during postApiCall:', error);
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

const addPost = () => {
    console.log("Adding a post...");
    postApiCall();
};

document.querySelector('.addPostButton').addEventListener('click', addPost);

// let createPost;
// async function fetchDataApiCall() {
//     try {
//         const response = await fetch('https://jsonplaceholder.typicode.com/todos/')
//         const contentType = response.headers.get('content-type');
//         if (contentType && contentType.includes('application/json')) {
//             createPost = await response.json();
//         } else {
//             throw new Error('Received non-JSON response');
//         }
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
// }

// const addPost = () => {
//     createPost.forEach(user => {

//         console.log(user)
        
//     });
//     console.log(createPost);
//     console.log("Adding a post...");
//     fetchDataApiCall()
// }
