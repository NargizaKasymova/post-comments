const $usersList = document.querySelector('.users-list')
const baseURL='https://jsonplaceholder.typicode.com'

async function renderUsers() {  //renderИть
    try {
        const users = await getUsers()
        console.log("Полученные пользователи: ", users)
        $usersList.innerHTML = users.map(createUserCard).join("")
    } catch (e) {
        console.log(e.message)
    }
}
function createUserCard(user) {
    return `<span class="user" data-userid="${user.id}">${user.name}</span>`
}

renderUsers()

async function getUsers() {
    try{
        const response = await fetch(baseURL+'/posts', {  //fetch функция браузера для работы с HTTP
            method: "GET"
        })
        if(response.ok) {  //ok содержит либо тру либо фолс
            const data = await response.json();
            // console.log(data)
            return data;
        } else {
            console.log("Запрос прошел неудачно")
            console.log(response.status)
            console.log(response.statusText)
        }


    } catch(e) {
        console.log("Ошибка пользователя: ", e.message)
    }
}
getUsers()

$usersList.addEventListener('click', renderUserInfo)

const $userDetails = document.querySelector('.user-details')

async function renderUserInfo(event) {
    try {
    console.log(event.target);
    // console.log(event.target.dataset) //показывает айди
    console.log(event.target.dataset.userid)
    // console.log(event.target.dataset.username)
    const user = await getUserInfoById(event.target.dataset.userid)
    // console.log(user)

    $userDetails.innerHTML = createUserProfileTemplate(user)
    } catch(e) {
        console.log(e.message)
    }
}

function createUserProfileTemplate(user) {
    return `
    <div class="user-profile">
    <p>Пользователь: ${user.name}</p>
    <p>Эмейл: ${user.email}</p>
    <p>Адрес: ${user.address.street}</p>
    </div>`
}

async function getUserInfoById(userId) {
    try {
        const response = await fetch(baseURL+`/users/${userId}`, {
            method: 'GET'
        })

        if(response.ok) {
            const data = await response.json()
            return data
        }
        
    } catch(e) {
        console.log('Ошибка при поиске пользователя по ID: ', e.message)
    }
}
