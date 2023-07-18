import { getAds } from '../api/adsApi.js'
import { getCategories } from '../api/categoriesApi.js'
import { getUsers, getUserById } from '../api/usersApi.js'
import { getLikes } from '../api/likesApi.js'

const search = window.location.search
const params = search.split('=')
const userId = Number(params[1])

document.getElementById('user-link').addEventListener('click', function () {
    window.open(`/pages/user.html?userId=${userId}`, '_self')
})

let categories, select, divAds

async function loadData() {
    const user = await getUserById(userId)

    if(user[0].admin == true) {
        const btnAdmin = document.getElementById('btn-admin')
        btnAdmin.style = 'display: block'
        btnAdmin.addEventListener('click', function(){
            window.open(`/pages/admin.html?userId=${userId}`, '_self')
        })
    }

    const ads = await getAds()
    categories = await getCategories()
    divAds = document.getElementById('ads')
    showAds(ads)

    select = document.getElementById('select-categories')
    showCategories(categories)

    const minPrice = Math.min(...ads.map(ad => Number(ad.price)))
    const maxPrice = Math.max(...ads.map(ad => Number(ad.price)))
    const minInput = document.getElementById('min-price') 
    const maxInput = document.getElementById('max-price')
    minInput.placeholder = `from ${minPrice}`
    minInput.min = minPrice
    minInput.max = maxPrice
    maxInput.placeholder = `to ${maxPrice}`
    maxInput.min = minPrice
    maxInput.max = maxPrice

    let selectAtribute, selectDirection
    const filterBtn = document.getElementById('btn-filter')
    filterBtn.addEventListener('click', function () {
        const message = document.getElementById('message-filter')
        message.innerHTML = ''

        if (minInput.value == '' || Number(minInput.value) < minPrice || Number(minInput.value) > maxPrice) {
            minInput.value = minPrice 
        }
        if (maxInput.value == '' || Number(maxInput.value) > maxPrice || Number(maxInput.value) < minPrice) {
            maxInput.value = maxPrice 
        }
        if (Number(minInput.value) > Number(maxInput.value)) {
            minInput.value = minPrice 
            maxInput.value = maxPrice 
        }

        const categoryName = select.value

        selectAtribute = document.getElementById('select-atributes')
        selectDirection = document.getElementById('select-direction')

        const selectedAtribute = selectAtribute.value
        const selectedDirection = selectDirection.value
        console.log(selectedAtribute, selectedDirection)

        let filtredAds
        if (categoryName == 'All categories') {
            filtredAds = ads.filter(ad => Number(ad.price) >= minInput.value && Number(ad.price) <= maxInput.value)
        } else {
            const category = categories.find(category => category.name == categoryName)
            filtredAds = ads.filter(ad => ad.categoryId == category.id && Number(ad.price) >= minInput.value && Number(ad.price) <= maxInput.value)
        }
        
        if (selectedAtribute == 'price' && selectedDirection == 'ASC') {
            filtredAds.sort((a,b) => a.price - b.price)
        }
        if (selectedAtribute == 'price' && selectedDirection == 'DESC') {
            filtredAds.sort((a,b) => b.price - a.price)
        }
        if (selectedAtribute == 'title' && selectedDirection == 'ASC') {
            filtredAds.sort((a,b) => a.title < b.title? -1: 1)
        }
        if (selectedAtribute == 'title' && selectedDirection == 'DESC') {
            filtredAds.sort((a,b) => a.title < b.title? 1: -1)
        }
        if (filtredAds.length > 0 ) {
            showAds(filtredAds)
        } else {
                divAds.innerHTML = ''
                message.innerHTML = 'No ads in this category and/or price range'
        } 
    })

    const resetBtn = document.getElementById('btn-reset')
    resetBtn.addEventListener('click', function () {
        select.value = 'All categories'
        minInput.placeholder = `from ${minPrice}`
        minInput.value = ''
        maxInput.placeholder = `from ${maxPrice}`
        maxInput.value = ''
        selectAtribute.value = ''
        selectDirection.value = ''
        showAds(ads)
    })

}
window.addEventListener('load', loadData)

async function showAds(ads) { 
    divAds.innerHTML = ''
    divAds.style = 'width: unset'
    if (ads.length == 1) {
        divAds.style = 'width: min(100%, 400px)'
    }
    if (ads.length == 2) {
        divAds.style = 'width: min(100%, 800px)'
    }
    const users = await getUsers()
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

        const user = users.find(user => user.id == ads[i].userId)
        const divUser = document.createElement('div')
        divUser.innerHTML = `Ad by ${user.firstName} ${user.lastName}`
        divUser.classList.add('div-user')
        divAd.appendChild(divUser)
    }
}

function showCategories(categories) {
    for (let i = 0; i < categories.length; i++) {
        const option = document.createElement('option')
        option.value = categories[i].name
        option.innerHTML = categories[i].name
        select.appendChild(option)
    }
}