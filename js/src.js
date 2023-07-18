import { getCategories } from '../api/categoriesApi.js'

let currentIndex = 0
let sliderCategories = document.getElementById('slider-categories')
async function loadData() {
    const categories = await getCategories()
    console.log(categories)
    
    showCategory(categories[currentIndex], sliderCategories)
   
    const btnPrevious = document.getElementById('btn-previous')
    const btnNext = document.getElementById('btn-next')
    btnPrevious.addEventListener('click', function () {
        currentIndex = changeCategory(currentIndex, -1, categories, sliderCategories)
    })
    btnNext.addEventListener('click', function () {
        currentIndex = changeCategory(currentIndex, 1, categories, sliderCategories)
    })
}

function showCategory(category, slider) {
    slider.innerHTML = ''

    const categoryWrapper = document.createElement('div')
    categoryWrapper.classList.add('category-wrapper')
    slider.appendChild(categoryWrapper)

    const image = document.createElement('img')
    image.src = category.image
    image.classList.add('category-image')
    categoryWrapper.appendChild(image)

    const categoryName = document.createElement('div')
    categoryName.innerHTML = category.name
    categoryName.classList.add('category-name')
    categoryWrapper.appendChild(categoryName)
}

function changeCategory(currentIndex, value, categories, slider) {
    currentIndex += value
    switch (currentIndex) {
        case -1:
            currentIndex = categories.length - 1
            break
        case categories.length:
            currentIndex = 0
            break
    }
    showCategory(categories[currentIndex], slider)
    return currentIndex
}
window.addEventListener('load', loadData)