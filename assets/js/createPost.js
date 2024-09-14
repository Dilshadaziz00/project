

let nextButton = document.querySelector('.next-button');
let addMediaText = document.querySelector('.add_media_text');
let modalData=document.querySelector('.modal-data');
let message=document.querySelector('.post-message')
  let postContentInputs = document.querySelectorAll('.post-content');
const goLive = () => {
    $('#liveModal').modal('show');
};
const uploadData = () => {
    nextButton.style.background = '#D8DADF';
    nextButton.style.cursor = 'not-allowed';
    document.querySelector('.inputTitle').value="";
    document.querySelector('.content').value="";
    document.getElementById('profile_pic_preview').src="";
      addMediaText.classList.remove('d-none');
    let card = document.querySelector('.popup-card');
    modalData.classList.remove('d-none');
    message.classList.add('d-none');
    card.classList.remove('d-none');
    $('#uploadDataModal').modal('show');
};
const hideCard = () => {
    let card = document.querySelector('.popup-card');
   document.getElementById('profile_pic_preview').src="";
   addMediaText.classList.remove('d-none');
    card.classList.add('d-none');
    nextButton.style.background = '#D8DADF';
    nextButton.style.cursor = 'not-allowed';
    nextButton.style.color = '#8b8e9a';
    // console.log("ggg");
};

   

document.addEventListener('DOMContentLoaded', function() {
    postContentInputs.forEach(input => {
        input.addEventListener('keyup', updateButtonStyle);
    });

    function updateButtonStyle(event) {
        let anyFilled = false;

        postContentInputs.forEach(input => {
            const inputValue = input.value.trim();
            console.log(`${input.classList}: ${inputValue}`);

            if (inputValue.length > 0) {
                anyFilled = true;
            }
        });

        if (anyFilled) {
            nextButton.style.background = '#0861F2';
            nextButton.style.cursor = 'pointer';
            nextButton.style.color = '#fff';
        } else {
            nextButton.style.background = '#D8DADF';
            nextButton.style.cursor = 'not-allowed';
            nextButton.style.color = '#8b8e9a';
        }
    }
});


function triggerFileUpload() {
    document.getElementById('profile_media_input').click();
}

function previewMedia(event) {
    const file = event.target.files[0];
    const previewImage = document.getElementById('profile_pic_preview');
    const previewVideo = document.getElementById('profile_video_preview');
  
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
   



//  create post api //
  
document.getElementById('postForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    modalData.classList.add('d-none');
    message.classList.remove('d-none');
    const form = document.getElementById('postForm');
    const formData = new FormData(form);
    
    console.log('Form Data:');
    for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }
    
    try {
        const response = await postApiCall(formData);
        console.log("postApiCall response:", response);
        
        if (response && response.status === 200) {
            console.log('Post added successfully:', response.message);
          
            document.querySelector('.center-block-content').innerHTML="";
            setTimeout(() => {
                $('#uploadDataModal').modal('hide');
               
                mounted();
            }, 100);
        } else {
            console.error('Failed to add post. Response:', response);
        }
    } catch (error) {
        console.error('Error during postApiCall:', error);
    }
});

async function postApiCall(formData) {
    const token = localStorage.getItem('token');
    const requestOptions = {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        method: 'POST',
        body: formData
    };

    try {
        const response = await fetch('http://127.0.0.1:8000/api/post/store', requestOptions);
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const responseData = await response.json();
            console.log('Response data:', responseData);
            return responseData;
        } else {
            const responseText = await response.text();
            console.warn('Non-JSON response:', responseText);
            return { error: 'Non-JSON response received' };
        }
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}
//  create post api  end//