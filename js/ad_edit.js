import { getAdById, editAd } from '../api/adsApi.js'
import { getCategories } from '../api/categoriesApi.js'

const search = window.location.search
const params = search.split('=')
const adId = Number(params[1])

const categorySelect = document.getElementById('select-categories')
const titleInput = document.getElementById('ad-title')
const descriptionInput = document.getElementById('ad-description')
const priceInput = document.getElementById('ad-price')
const imageInput = document.getElementById('ad-image')

let ad, categories
async function loadData() {
    ad = await getAdById(adId)
    categories = await getCategories()
    showAd(ad)

    const btnUpdate = document.getElementById('btn-update')
    btnUpdate.addEventListener('click', adUpdate)
    
    const btnDiscard = document.getElementById('btn-discard')
    btnDiscard.addEventListener('click', function () {
        window.history.back()
    })

    document.querySelector('.back-page').addEventListener('click', () => window.history.back())

}
window.addEventListener('load', loadData)

function showAd(ad) {
    for (let i = 0; i < categories.length; i++) {
        const option = document.createElement('option')
        option.innerHTML = categories[i].name
        categorySelect.appendChild(option)

        if (categories[i].id == ad.categoryId) {
            option.selected = true
        }
    }
    titleInput.value = ad.title
    descriptionInput.value = ad.description
    priceInput.value = ad.price
    imageInput.value = ad.image
}

async function adUpdate() {
    console.log(ad)
    const categoryName = categorySelect.value
    const title = titleInput.value
    const description = descriptionInput.value
    const price = priceInput.value
    const image = imageInput.value

    console.log(categoryName, title, description, price, image)

    // validation-start
    const message = document.querySelector('.message')
    if (categoryName == '' || title == '' || description == '' || price == '' || image == '') {
        message.innerHTML = 'Please, fill in all the fields.'
        return
    }
    // validation-end

    const category = categories.find(category => category.name == categoryName) 
    await editAd(ad.id, title, description, price, image, ad.likes, category.id, ad.userId)

    window.open(`/pages/user.html?userId=${ad.userId}`, '_self')
}