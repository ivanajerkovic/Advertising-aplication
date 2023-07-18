import { getUserByUsernameAndPassword } from '../api/usersApi.js'

const usernameInput = document.getElementById('username-input')
const passwordInput = document.getElementById('password-input')

async function loadData() {
    const btnLogin = document.getElementById('btn-login')
    btnLogin.addEventListener('click', login)
}
window.addEventListener('load', loadData)

 async function login() {
    const username = usernameInput.value
    const password = passwordInput.value

    // validation-start
    const message = document.querySelector('.message')
    if (username == '' || password == '') {
        message.innerHTML = 'Please, fill in all the fields.'
        return
    }
   
    const user = await getUserByUsernameAndPassword(username, password)
    
    if (Object.keys(user).length == 0) {
        message.innerHTML = "Wrong username or password!"
        return
    }
    // validation-end
    
    if (user[0].admin) {
        window.open(`/pages/admin.html?userId=${user[0].id}`, '_self')
    } else {
        window.open(`/pages/user.html?userId=${user[0].id}`, '_self')
    }
}