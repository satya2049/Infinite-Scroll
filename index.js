const apiAccessKey = 'AcURv4JSgiKHjnXUDJvAIvfUSVEDMzGO27ATngSJrnc';
const count = 10;
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiAccessKey}&count=${count}`;
const imgContainer = document.getElementById('img-container');
const loader = document.getElementById('loader');

let imagesLoaded = 0;
let totalImages = 0;
let ready = false;
let photosArray = [];

function imageLoaded(){
    imagesLoaded++;
    console.log(imagesLoaded);
    if(imagesLoaded == totalImages){
        ready = true;
        loader.hidden = true;
        console.log("ready");
    }
}
function setAttribute(element,attributes){
    for(key in attributes){
        element.setAttribute(key,attributes[key]);
    }
}
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log("ToatalImages",totalImages);
    photosArray.forEach(photo => {
        const anchorTag = document.createElement('a');
        setAttribute(anchorTag,{
            'href':photo.links.html,
            'target':'_blank'
        });
        const imgTag = document.createElement('img');
        setAttribute(imgTag,{
            'src':photo.urls.regular,
            'alt':photo.alt_description,
            'title':photo.description
        });
        imgTag.style.borderRadius = '10px'

        const divTag = document.createElement('div');
        divTag.innerHTML = '<i class="far fa-heart"></i>' + photo.likes;
        divTag.style.color = 'red';

        anchorTag.appendChild(imgTag);
        imgContainer.appendChild(anchorTag);
        imgContainer.appendChild(divTag);

        imgTag.addEventListener('load',imageLoaded);
    });

}

async function getPhotos(){
    try{
    const response = await fetch(apiUrl);
     photosArray = await response.json();
    displayPhotos();
    }
    catch(error){
        console.log(error);
    }
}

getPhotos();

window.addEventListener('scroll',function(){
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        loader.hidden = false;
        getPhotos();
        console.log('called');

    }
})
