const addAlbum = document.getElementById('create-album')
const createBtn = document.getElementById('create')
const cancelBtn = document.getElementById('cancel')

addAlbum.addEventListener('click', ()=>{
    const modal = document.getElementById('modal-create')
    modal.style.display = 'block'
})

createBtn.addEventListener('click', ()=>{
    const modal = document.getElementById('modal-create')
    const name = document.getElementById('name-album').value
    localStorage.setItem('album', name)
    modal.style.display = 'none'

   async function searchImages(){
        const apiUrl = 'https://pixabay.com/api/?key=31983115-d97d5a6a0252325048edde80f&q=' + localStorage.getItem('album').toLowerCase().replaceAll(' ', '+') + '&image_type=photo'
        const imageSelector = await fetch(apiUrl)

        const result =  await imageSelector.json()

        return result;
    }
    console.log(searchImages())

    async function createAlbum(){
        const data = await searchImages()
        const albumArea = document.getElementById('albuns')

        albumArea.innerHTML += '<div id="album-picture" class="'+ localStorage.getItem('album').toLowerCase().replaceAll(' ', '-') +'" onclick="showPictures()"></div><h3>'+ localStorage.getItem('album') +'</h3>'
        const albumProfile = document.querySelector('.' + localStorage.getItem('album').toLowerCase().replaceAll(' ', '-'));
        albumProfile.style.backgroundImage = 'url(' + data.hits[0].largeImageURL + ')'
        const images = data.hits
        for (let i = 0; i < images.length; i++){
            albumArea.innerHTML += '<img src="' + data.hits[i].largeImageURL + '" class="images" id="' + localStorage.getItem('album').toLowerCase().replaceAll(' ', '-')  + '" alt="">'
        }
        albumArea.innerHTML += "<hr>"

    }
    setTimeout(createAlbum, 1000*1)

})

cancelBtn.addEventListener('click', ()=>{
    const modal = document.getElementById('modal-create')
    modal.style.display = 'none'

})

//Show Pictures


document.getElementById('albuns').addEventListener('click', (e)=>{
    const element = e.target
    var clickName = element.classList[0]

    const images = document.querySelectorAll('#' + clickName)
    const imageLength = images.length
    
    if(images[0].style.display == 'none'){
        for(let i = 0; i < imageLength; i++){
            images[i].style.display = 'inline-block'
        }    
    }else{
        for(let i = 0; i < imageLength; i++){
            images[i].style.display = 'none'
        }    
    }
})




document.addEventListener('DOMContentLoaded', ()=>{
    
})