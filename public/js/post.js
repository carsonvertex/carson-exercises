const createPost = document.querySelector("$postForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData();

    //append key to the form values
    formData.append("title", form.title.value);
    formData.append("content", form.content.value);
    const imageFiles = form.image.files;
    for (let i = 0; i < imageFiles.length; i++) {
        formData.append("image", imageFiles[i]);
    };

    const res = await fetch(`/post/postPost`,{
        method:"post",
        body:formData
    });
})

async function getPost(){
    try{
        const response = await fetch ('/post/getPost');
        const data = await response.json();
        const postArray = data.posts

    }catch(e){
        throw error;
    }
}