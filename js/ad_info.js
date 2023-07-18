import { getAdById, deleteAd } from '../api/adsApi.js'
import { getCategoryById } from '../api/categoriesApi.js'
import { getUsers } from '../api/usersApi.js'
import { getCommentsByAdId, addComment } from '../api/commentsApi.js'
import { getLikes, addLike, deleteLike } from '../api/likesApi.js'

const search = window.location.search
const pairs = search.split('&')
const paramsAd = pairs[0].split('=')
const adId = Number(paramsAd[1])
const paramsUser = pairs[1].split('=')
const userId = Number(paramsUser[1])

let users
async function loadData() {
    const ad = await getAdById(adId)
    users = await getUsers()
    const userAd = users.find(user => user.id == ad.userId)
    const categoryAd = await getCategoryById(ad.categoryId)
    
    showAd(ad, categoryAd, userAd)

    showLikes()

    const comments = await getCommentsByAdId(adId)
    showComments(comments)

    const btnPost = document.getElementById('post-comment')
    btnPost.addEventListener('click', postNewComment)

    const btnDelete = document.querySelector('.btn-delete')
    if (userId != userAd.id) {
        btnDelete.style = 'display: none'
    }
    btnDelete.addEventListener('click', function () {
        const messageDelete = document.querySelector('.message-delete')
        messageDelete.style = 'display: grid'
    
        const btnYes = document.getElementById('btn-yes')
        btnYes.addEventListener('click', async function () {
            await deleteAd(adId)
            window.open(`/pages/user.html?userId=${userId}`, '_self')
            return
        })
        
        const btnNo = document.getElementById('btn-no')
        btnNo.addEventListener('click', function () {
            messageDelete.style = 'display: none'
            return
        })
    })

    document.querySelector('.back-page').addEventListener('click', () => window.history.back())
}
window.addEventListener('load', loadData)

function showAd(ad, categoryAd, userAd) {
    document.querySelector('.title').innerHTML = ad.title
    const divAd = document.querySelector('.div-ad')

    const imageWrapper = document.createElement('div')
    imageWrapper.classList.add('image-wrapper')
    divAd.appendChild(imageWrapper)

    const image = document.createElement('img')
    image.src = ad.image
    image.classList.add('image-ad')
    imageWrapper.appendChild(image)

    const adDescription = document.createElement('div')
    adDescription.innerHTML = `Description: ${ad.description}` 
    divAd.appendChild(adDescription)

    const adPrice = document.createElement('div')
    adPrice.innerHTML = `Price: ${ad.price} EUR`
    divAd.appendChild(adPrice)

    const adCategory = document.createElement('div')
    adCategory.innerHTML = `Category: ${categoryAd.name}`
    divAd.appendChild(adCategory)

    const divUser = document.createElement('div')
    divUser.innerHTML = `Posted by ${userAd.firstName} ${userAd.lastName}`
    divAd.appendChild(divUser)
}

async function showLikes() {
    const likes = await getLikes()
    const adLikes = likes.filter(like => like.adId == adId)
    const divLikes = document.getElementById('div-likes')
    
    const numberLikes = document.createElement('div')
    numberLikes.innerHTML = adLikes.length
    divLikes.appendChild(numberLikes)

    const divIcon = document.getElementById('like-ikon')
    if (adLikes.map(like => like.userId).includes(userId)) {
        divIcon.classList.add('fa-solid')
    } else {
        divIcon.classList.add('fa-regular')
    }

    divIcon.addEventListener('click', async function() {
        const likes = await getLikes()
        const adLikes = likes.filter(like => like.adId == adId)
        if (divIcon.classList.contains('fa-regular')) {
            divIcon.classList.replace('fa-regular','fa-solid')
            numberLikes.innerHTML = adLikes.length + 1
            await addLike(adId, userId)
            return
        } 
        if (divIcon.classList.contains('fa-solid')) {
            divIcon.classList.replace('fa-solid', 'fa-regular')
            numberLikes.innerHTML = adLikes.length - 1
            await deleteLike(adLikes.find(like => like.userId == userId).id)
            return
        }
    })
}

async function showComments(comments) {
    const divComments = document.getElementById('comments')
    for (let i = 0; i < comments.length; i++) {
        const divComment = document.createElement('div')
        divComment.classList.add('comment')
        divComments.appendChild(divComment)

        const userComment = users.find(user => user.id == comments[i].userId)
        const divUser = document.createElement('div')
        divUser.innerHTML = `${userComment.firstName} ${userComment.lastName}: `
        divComment.appendChild(divUser)

        const divUserComment = document.createElement('div')
        divUserComment.innerHTML = comments[i].text
        divComment.appendChild(divUserComment)
    }
}

async function postNewComment() {
    const newCommentInput = document.getElementById('input-comment')
    const newComment = newCommentInput.value
    await addComment(newComment, adId, userId)
    window.location.reload()
    newCommentInput.value = ''
}