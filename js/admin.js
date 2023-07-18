import { getUserById  } from '../api/usersApi.js'
import { getCategories, deleteCategory } from '../api/categoriesApi.js'

const search = window.location.search
const params = search.split('=')
const userId = Number(params[1])

async function loadData() {
    const user = await getUserById(userId)
    document.querySelector('.title').innerHTML = `Admin: ${user[0].firstName} ${user[0].lastName}`
    showUser(user[0])

    const categories = await getCategories()
    showCategories(categories)

    const adAddLink = document.getElementById('link-ad-add')
    adAddLink.addEventListener('click', function () {
        window.open(`/pages/ad_add.html?userId=${userId}`, '_self')
    })

    const allAdsLink = document.getElementById('link-all-ads')
    allAdsLink.addEventListener('click', function () {
        window.open(`/pages/ads.html?userId=${userId}`, '_self')
    })
}
window.addEventListener('load', loadData)

function showUser(user) {
    // const firstName = document.getElementById('first-name-input')
    // const lastName = document.getElementById('last-name-input')
    const address = document.getElementById('address-input')
    const phone = document.getElementById('phone-input')
    const username = document.getElementById('username-input')
    const password = document.getElementById('password-input')
    const gender = document.getElementById('gender-input')

    // firstName.value = user.firstName
    // lastName.value = user.lastName
    address.value = user.address
    phone.value = user.phoneNumber
    username.value = user.username
    password.value = user.password
    gender.value = (user.gender == 'M') ? 'Male' : 'Female'
}

function showCategories(categories) {
    const table = document.getElementById('table')

    for (let i = 0; i < categories.length; i++) {
        const tr = document.createElement('tr')
        table.appendChild(tr)

        const tdName = document.createElement('td')
        tdName.innerHTML = categories[i].name
        tdName.classList.add('name-category')
        tr.appendChild(tdName)

        const tdImage = document.createElement('td')
        tr.appendChild(tdImage)

        const btnImage = document.createElement('button')
        btnImage.innerHTML = 'show image'
        tdImage.appendChild(btnImage)
        const image = document.getElementById('category-image')
        btnImage.addEventListener('click', function () {
            document.getElementById('image-wrapper').style = 'display: grid'
            image.src = `${categories[i].image}`
        })
        const close = document.querySelector('.close')
        close.addEventListener('click', function () {
            document.getElementById('image-wrapper').style = 'display: none'
        })

        const tdDelete = document.createElement('td')
        tr.appendChild(tdDelete)

        const btnDelete = document.createElement('button')
        btnDelete.innerHTML = 'delete'
        tdDelete.appendChild(btnDelete)
        btnDelete.addEventListener('click', async function() {
            const messageDelete = document.querySelector('.message-delete')
            messageDelete.style = 'display: grid'

            const btnYes = document.getElementById('btn-yes')
            btnYes.addEventListener('click', async function () {
                await deleteCategory(categories[i].id)
                window.location.reload()
                return
            })
    
            const btnNo = document.getElementById('btn-no')
            btnNo.addEventListener('click', function () {
                messageDelete.style = 'display: none'
                return
            })
            
        })

        const tdEdit = document.createElement('td')
        tr.appendChild(tdEdit)

        const btnEdit = document.createElement('button')
        btnEdit.innerHTML = 'edit'
        tdEdit.appendChild(btnEdit)
        btnEdit.addEventListener('click', function () {
            window.open(`/pages/category_edit.html?id=${categories[i].id}`, '_self')
        })
    }
}

