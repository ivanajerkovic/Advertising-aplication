// get all comments
async function getComments() {
    const response = await fetch('http://localhost:3000/comments', {method: 'GET'})
    const data = await response.json()
    return data
}

//  get comments by ad id
async function getCommentsByAdId(adId) {
    const response = await fetch(`http://localhost:3000/comments?adId=${adId}`, {method: 'GET'})
    const data = await response.json()
    return data
}

//  add new comment
async function addComment(text, adId, userId) {
    const response = await fetch('http://localhost:3000/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text: text,
            adId: adId,
            userId: userId
        })
    })
    const data = await response.json()
    return data
}

export { getComments, getCommentsByAdId, addComment }