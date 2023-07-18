// get all users
async function getUsers() {
    const response = await fetch('http://localhost:3000/users', {method: 'GET'})
    const data = await response.json()
    return data
}

//  get user by username and password
async function getUserByUsernameAndPassword(username, password) {
    const response = await fetch(`http://localhost:3000/users?username=${username}&password=${password}`, {method: 'GET'})
    const data = await response.json()
    return data
}

//  get user by id
async function getUserById(id) {
    const response = await fetch(`http://localhost:3000/users?id=${id}`, {method: 'GET'})
    const data = await response.json()
    return data
}

// add new user
async function addUser(firstName, lastName, username, password, address, phoneNumber, gender, admin) {
    const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password,
            address: address,
            phoneNumber: phoneNumber,
            gender: gender,
            admin: admin
        })
    })
    const data = await response.json()
    return data
}

export { getUsers, getUserByUsernameAndPassword, getUserById, addUser }