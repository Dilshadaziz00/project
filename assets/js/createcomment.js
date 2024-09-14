const showComment = (postId) => {
    document.querySelector(`#comments${postId}`).classList.toggle('d-none');
    document.querySelector(`#commentSection${postId}`).classList.toggle('d-none');
};


async function makeComment(postId, userId) {
    try {
        let comment = document.querySelector(`#item${postId}`).value;

        const url =`http://127.0.0.1:8000/api/post/create-comment?post_id=${postId}&user_id=${userId}&comment=${comment}`;
        
        const token = localStorage.getItem('token');
        if (!userId) {
            throw new Error('User ID is required to create a comment');
        }
       
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization':` Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error('Failed to create comment');
        }
      
        console.log('Comment created successfully');

        // Clear the input field after successful comment creation
        document.querySelector(`#item${postId}`).value = '';

        // Call mounted() to refresh the component or page
        mounted( showComment(postId));

        // Call showComment() to display the comments section
       ;

    } catch (error) {
        console.error('Error creating comment:', error);
    }
}