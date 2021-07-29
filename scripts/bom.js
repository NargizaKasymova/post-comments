
const $postsList = document.querySelector('.posts-list')
const $postDetails = document.querySelector('.post-details')
const $postComments = document.querySelector('.post-comments')

const baseURL = "https://jsonplaceholder.typicode.com/posts"

async function getPosts() {
    try{
        const response = await fetch(baseURL, {  
            method: "GET"
        })
        if(response.ok) {  
            const data = await response.json();
            
            return data;
        } else {
            console.log("Запрос поста прошел неудачно")
            console.log(response.status)
            console.log(response.statusText)
        }


    } catch(e) {
        console.log("Ошибка пользователя: ", e.message)
    }
}
getPosts()
$postsList.addEventListener('click', renderPostData)
$postsList.addEventListener('click', renderPostComments)


function createPostCard(post) {
    return `<span class="post" data-id="${post.id}">${post.title} </br></br>${post.body}</span>`
}
// data-userId="${post.userId}"
async function renderPosts() {  //renderИть
    try {
        const posts = await getPosts()
        console.log("Полученные посты: ", posts)
        $postsList.innerHTML = posts.map(createPostCard).join("")
    } catch (e) {
        console.log(e.message)
    }
}
renderPosts()


function createPostData(post) {
    return `
    <div class="post-details">
    <p>userId: ${post.userId}</p>
    <p>postid: ${post.id}</p>
    <p>title: ${post.title}</p>
    <p>body: ${post.body}</p>

    </div>`
}

async function renderPostData(event) {
    try {
    console.log(event.target);
    
    const post = await getPostById(event.target.dataset.id)
    
    $postDetails.innerHTML = createPostData(post)
    } catch(e) {
        console.log(e.message)
    }
}

async function getPostById(id) {
    try {
        const response = await fetch(baseURL+`/${id}`, {
            method: 'GET'
        })

        if(response.ok) {
            const data = await response.json()
            return data
        }
        
    } catch(e) {
        console.log('Ошибка при поиске поста по ID: ', e.message)
    }
}

function showPostComments(comment) {
    return `
    <div class="post-comments">
    <p>postId: ${comment.postId}</p>
    <p>commentid: ${comment.id}</p>
    <p>name: ${comment.name}</p>
    <p>email: ${comment.email}</p>
    <p>body: ${comment.body}</p>

    </div>`
}

async function renderPostComments(event) {
    try {
    console.log(event.target);
    
    const comment = await getCommentsByPostId(event.target.dataset.id)
    
    $postComments.innerHTML = showPostComments(comment)
    } catch(e) {
        console.log(e.message)
    }
}

async function getCommentsByPostId(id) {
    try {
        const response = await fetch(baseURL+`/${id}/comments`, {
            method: 'GET'
        })

        if(response.ok) {
            const data = await response.json()
            return data
        }
        
    } catch(e) {
        console.log('Ошибка при поиске комментария по postID: ', e.message)
    }
}
