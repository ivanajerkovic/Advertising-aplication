import { addCategory, getCategories } from '../api/categoriesApi.js'

const categoryNameInput = document.getElementById('category-name-input')
const imageInput = document.getElementById('image-input')

let categories

async function loadData() {
    categories = await getCategories()

    const btnAdd = document.getElementById('btn-add-category')
    btnAdd.addEventListener('click', add)

    const btnDiscard = document.getElementById('btn-discard')
    btnDiscard.addEventListener('click', function () {
        window.history.back()
    })
}

window.addEventListener('load', loadData)

async function add() {
    const categoryName = categoryNameInput.value
    const image = imageInput.value

    // validation-start
    const message = document.querySelector('.message')

    if (categoryName == '' || image == '') {
        message.innerHTML = 'Please, fill in all the fields.'
        return
    }

    if (categories.map(category => category.name.toLowerCase()).includes(categoryName.toLowerCase())) {
        message.innerHTML = 'Category already exists'
        return
    }
    // validation-end 

    await addCategory(categoryName, image)
    window.history.back()
}