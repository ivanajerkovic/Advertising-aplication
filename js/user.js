import { getUserById  } from '../api/usersApi.js'
import { getAdsByUserId, deleteAd } from '../api/adsApi.js'
import { getCategories } from '../api/categoriesApi.js'
import { getLikes } from '../api/likesApi.js'

const search = window.location.search
const params = search.split('=')
const userId = Number(params[1])

let divAds

async function loadData() {
    const user = await getUserById(userId)
    document.querySelector('.title').innerHTML = `User: ${user[0].firstName} ${user[0].lastName}`

    if(user[0].admin == true) {
        const btnAdmin = document.getElementById('btn-admin')
        btnAdmin.style = 'display: block'
        btnAdmin.addEventListener('click', function() {
            window.open(`/pages/admin.html?userId=${userId}`, '_self')
        })
    }
    
    showUser(user[0])
    
    const ads = await getAdsByUserId(userId)
    divAds = document.getElementById('user-ads')

    showAds(ads)

    const categories = await getCategories()
    showCategories(categories)
    const select = document.getElementById('select-categories')

    const filterBtn = document.getElementById('btn-filter')
    filterBtn.addEventListener('click', function () {
        document.getElementById('mesage-filter').innerHTML = ''
        const categoryName = document.getElementById('select-categories').value
        if (categoryName == 'All categories') {
            showAds(ads)
            return
        }
        const category = categories.find(category => category.name == categoryName)
        const filtredAds = ads.filter(ad => ad.categoryId == category.id)
        if (filtredAds.length > 0 ) {
            showAds(filtredAds)
        } else {
                divAds.innerHTML = ''
                document.getElementById('mesage-filter').innerHTML = 'No ads in this category'
            } 
    })
 
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

async function showAds(ads) { 
    divAds.innerHTML = ''
    divAds.style = 'width: unset'
    if (ads.length == 1) {
        divAds.style = 'width: min(100%, 400px)'
    }
    if (ads.length == 2) {
        divAds.style = 'width: min(100%, 800px)'
    }
    const categories = await getCategories()
    const likes = await getLikes()
    for (let i = 0; i < ads.length; i++) {
        const divAd = document.createElement('div')
        divAd.classList.add('div-ad')
        divAds.appendChild(divAd)

        const linkAdInfo = document.createElement('a')
        linkAdInfo.classList.add('link-ad-info')
        linkAdInfo.href = `ad_info.html?adId=${ads[i].id}&userId=${userId}`
        divAd.appendChild(linkAdInfo)

        const adTitle = document.createElement('div')
        adTitle.innerHTML = ads[i].title
        adTitle.classList.add('ad-title')
        divAd.appendChild(adTitle)

        const imageWrapper = document.createElement('div')
        imageWrapper.classList.add('image-wrapper')
        divAd.appendChild(imageWrapper)

        const image = document.createElement('img')
        image.src = ads[i].image
        image.classList.add('image-ad')
        imageWrapper.appendChild(image)

        const adLikes = document.createElement('div')
        adLikes.innerHTML = `<i class="fa-regular fa-thumbs-up"></i> ${likes.filter(like => like.adId == ads[i].id).length}`
        divAd.appendChild(adLikes)

        const adDescription = document.createElement('div')
        adDescription.innerHTML = `Description: ${ads[i].description}` 
        divAd.appendChild(adDescription)

        const adPrice = document.createElement('div')
        adPrice.innerHTML = `Price: ${ads[i].price} EUR`
        divAd.appendChild(adPrice)

        const adCategory = document.createElement('div')
        adCategory.innerHTML = `Category: ${categories.find(category => category.id == ads[i].categoryId).name}`
        divAd.appendChild(adCategory)

        const deleteLinkWrapper = document.createElement('div')
        deleteLinkWrapper.classList.add('delete-edit-wrapper')
        divAd.appendChild(deleteLinkWrapper)

        const btnDelete = document.createElement('button')
        btnDelete.innerHTML = 'Delete ad'
        btnDelete.classList.add('btn-link-delete')
        deleteLinkWrapper.appendChild(btnDelete)

        const linkEdit = document.createElement('a')
        linkEdit.href = `ad_edit.html?adId=${ads[i].id}`
        linkEdit.classList.add('btn-link-delete')
        deleteLinkWrapper.appendChild(linkEdit)

        const btnEdit = document.createElement('button')
        btnEdit.innerHTML = 'Edit ad'
        linkEdit.appendChild(btnEdit)

        const message = document.createElement('div')
        message.classList.add('message-delete')
        message.id = `messageDelete${i}`
        divAd.appendChild(message)

        btnDelete.addEventListener('click', function () {
            const messageDelete = document.getElementById(`messageDelete${i}`)
            messageDelete.style = 'display: grid'
            messageDelete.innerHTML = 'Are you sure you want to delete this ad?'

            const buttons = document.createElement('div')
            buttons.classList.add('buttons')
            message.appendChild(buttons)

            const btnYes = document.createElement('button')
            btnYes.innerHTML = 'Yes'
            buttons.appendChild(btnYes)
            btnYes.addEventListener('click', async function () {
                this.parentNode.parentNode.parentNode.remove()
                await deleteAd(ads[i].id)
                return
            })
            
            const btnNo = document.createElement('button')
            btnNo.innerHTML = 'No'
            buttons.appendChild(btnNo)
            btnNo.addEventListener('click', function () {
                messageDelete.style = 'display: none'
                this.parentNode.parentNode.innerHTML = ''
                return
            })
        })
    }
}

function showCategories(categories) {
    const select = document.getElementById('select-categories')

    for (let i = 0; i < categories.length; i++) {
        const option = document.createElement('option')
        option.value = categories[i].name
        option.innerHTML = categories[i].name
        select.appendChild(option)
    }
}