import { editCategory, getCategoryById } from '../api/categoriesApi.js'

const search = window.location.search
const params = search.split('=')
const id = Number(params[1]) 

const categoryNameInput = document.getElementById('category-name-input')
const imageInput = document.getElementById('image-input')

let category

async function loadData() {
    category = await getCategoryById(id)
    console.log(category)
    categoryNameInput.value = category.name
    imageInput.value = category.image

    const btnEdit = document.getElementById('btn-edit-category')
    btnEdit.addEventListener('click', edit)

    const btnDiscard = document.getElementById('btn-discard')
    btnDiscard.addEventListener('click', function () {
        window.history.back()
    })
}

window.addEventListener('load', loadData)

async function edit() {
    const categoryName = categoryNameInput.value
    const image = imageInput.value

    // validation-start
    const message = document.querySelector('.message')

    if (categoryName == '' || image == '') {
        message.innerHTML = 'Please, fill in all the fields.'
        return
    }
    // validation-end 

    await editCategory(id, categoryName, image)
    window.history.back()
}