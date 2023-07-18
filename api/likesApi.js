// get all likes
async function getLikes() {
    const response = await fetch('http://localhost:3000/likes', {method: 'GET'})
    const data = await response.json()
    return data
}

//  add new like
async function addLike(adId, userId) {
    const response = await fetch('http://localhost:3000/likes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            adId: adId,
            userId: userId
        })
    })
    const data = await response.json()
    return data
}

//  delete like by id
async function deleteLike(id) {
    const response = await fetch(`http://localhost:3000/likes/${id}`, {method: 'DELETE'})
    const data = await response.json()
    return data
}

export { getLikes, addLike, deleteLike }