import { getUsers, addUser, getUserByUsernameAndPassword } from '../api/usersApi.js'

const firstNameInput = document.getElementById('first-name-input')
const lastNameInput = document.getElementById('last-name-input')
const addressInput = document.getElementById('address-input')
const phoneInput = document.getElementById('phone-input')
const usernameInput = document.getElementById('username-input')
const passwordInput = document.getElementById('password-input')
const confirmPasswordInput = document.getElementById('confirm-password-input')
const maleInput = document.getElementById('male')
const femaleInput = document.getElementById('female')
const adminInput = document.getElementById('admin-input')

let users

async function loadData() {
    users = await getUsers()

    const btnRegister = document.getElementById('btn-register')
    btnRegister.addEventListener('click', register)
}

window.addEventListener('load', loadData)

async function register() {
    const firstName = firstNameInput.value
    const lastName = lastNameInput.value
    const address = addressInput.value
    const phone = phoneInput.value
    const username = usernameInput.value
    const password = passwordInput.value
    const confirmedPassword = confirmPasswordInput.value
    const isMale = maleInput.checked
    const isFemale = femaleInput.checked
    const isAdmin = adminInput.checked

    // validation-start
    const message = document.querySelector('.message')
    if (firstName == '' || lastName == '' || address == '' || phone == '' || username == '' || password == '' || confirmedPassword == '' || (isMale == false) && (isFemale == false)) {
        message.innerHTML = 'Please, fill in all the fields.'
        return
    }
    if (username.length < 5 || password.length < 5) {
        message.innerHTML = 'Username and/or password have less then 5 caracters'
        return
    }
    if (users.map(user => user.username).includes(username)) {
        message.innerHTML = 'Username already exists'
        return
    }
    if (password != confirmedPassword) {
        message.innerHTML = "Password and confirmed password doesn't match"
        return
    }
    // validation-end 
    
    const gender = (isMale) ? 'M' : 'F'  
    await addUser(firstName, lastName, username, password, address, phone, gender, isAdmin)
    const newUser = await getUserByUsernameAndPassword(username, password)
    window.open(`/pages/ads.html?userId=${newUser[0].id}`, '_self')
}

