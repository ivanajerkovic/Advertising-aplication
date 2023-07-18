import { getCategories } from '../api/categoriesApi.js'
import { addAd } from '../api/adsApi.js'

const search = window.location.search
const params = search.split('=')
const userId = Number(params[1])

const categorySelect = document.getElementById('select-categories')
const titleInput = document.getElementById('ad-title')
const descriptionInput = document.getElementById('ad-description')
const priceInput = document.getElementById('ad-price')
const imageInput = document.getElementById('ad-image')

let categories
async function loadData() {
    categories = await getCategories()
    showCategories(categories)

    const btnAdd = document.getElementById('btn-add')
    btnAdd.addEventListener('click', adAdd)

    const btnDiscard = document.getElementById('btn-discard')
    btnDiscard.addEventListener('click', function () {
        window.history.back()
    })
}
window.addEventListener('load', loadData)

function showCategories(categories) {
    for (let i = 0; i < categories.length; i++) {
        const option = document.createElement('option')
        option.value = categories[i].name
        option.innerHTML = categories[i].name
        categorySelect.appendChild(option)
    }
}

async function adAdd() {
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
    await addAd(title, description, price, image, 0, category.id, userId)

    window.open(`/pages/user.html?userId=${userId}`, '_self')
}