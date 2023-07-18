// get all categories
async function getCategories() {
    const response = await fetch('http://localhost:3000/categories', {method: 'GET'})
    const data = await response.json()
    return data
}

//  get category by id
async function getCategoryById(id) {
    const response = await fetch(`http://localhost:3000/categories/${id}`, {method: 'GET'})
    const data = await response.json()
    return data
}

//  delete category by id
async function deleteCategory(id) {
    const response = await fetch(`http://localhost:3000/categories/${id}`, {method: 'DELETE'})
    const data = await response.json()
    return data
}

//  add new category
async function addCategory(name, image) {
    const response = await fetch('http://localhost:3000/categories', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            image: image
        })
    })
    const data = await response.json()
    return data
}

//   edit category
async function editCategory(id, name, image) {
    const response = await fetch(`http://localhost:3000/categories/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            image: image
        })
    })
    const data = await response.json()
    return data
}

export { getCategories, getCategoryById, deleteCategory, addCategory, editCategory }

