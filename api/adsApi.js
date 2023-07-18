// get all ads
async function getAds() {
    const response = await fetch('http://localhost:3000/ads', {method: 'GET'})
    const data = await response.json()
    return data
}

//  get ad by id
async function getAdById(id) {
    const response = await fetch(`http://localhost:3000/ads/${id}`, {method: 'GET'})
    const data = await response.json()
    return data
}

//  get ads by user id
async function getAdsByUserId(userId) {
    const response = await fetch(`http://localhost:3000/ads?userId=${userId}`, {method: 'GET'})
    const data = await response.json()
    return data
}

//  delete ad by id
async function deleteAd(id) {
    const response = await fetch(`http://localhost:3000/ads/${id}`, {method: 'DELETE'})
    const data = await response.json()
    return data
}

//  add new ad
async function addAd(title, description, price, image, likes, categoryId, userId) {
    const response = await fetch('http://localhost:3000/ads', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            description: description,
            price: price,
            image: image,
            likes: likes,
            categoryId: categoryId,
            userId: userId
        })
    })
    const data = await response.json()
    return data
}
//   edit ad
async function editAd(id, title, description, price, image, likes, categoryId, userId) {
    const response = await fetch(`http://localhost:3000/ads/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            description: description,
            price: price,
            image: image,
            likes: likes,
            categoryId: categoryId,
            userId: userId
        })
    })
    const data = await response.json()
    return data
}
export { getAds, getAdById, getAdsByUserId, deleteAd, addAd, editAd }