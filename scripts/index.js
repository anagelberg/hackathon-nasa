api_key = "NfrtX26rhNzjyIfRcalbFEaBQta2hTLMnSQAHrJS";

const form = document.querySelector('.planet-form');
const heroEl = document.querySelector('.hero');
let imgArr;
let arrSize;
let currentPos = 0;

const display = (urlArray, parentContainer) => {
    heroEl.innerText = "";
    urlArray.forEach((url) => {
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('hero__images');
        imageContainer.style.backgroundImage = `url('${url}')`;
        parentContainer.appendChild(imageContainer);
    })
}

const formatArray = (apiRes) => {
    let images_array = [];
    const resArr = apiRes.data.collection.items;
    console.log(resArr);
    for (imageIndex = 0; imageIndex < resArr.length; imageIndex++) {
        let image = resArr[imageIndex].links[0].href;
        images_array.push(image);
    }
    return images_array;
}



form.addEventListener('submit', (event) => {
    event.preventDefault();
    const search = 'planet ' + event.target.name.value;
    console.log('search term', search)

    /* pipe search into axios */
    axios.get(`https://images-api.nasa.gov/search?q=${search}&media_type=image`)
        .then((response) => {
            imgArr = formatArray(response);
            arrSize = imgArr.length;
            console.log('array size', arrSize);
            display(imgArr.slice(currentPos, 9), heroEl);
        }).catch(err => {
            console.log('invalid search')
        })

})

const scrollForEl = document.querySelector('.scroll-forward');
scrollForEl.addEventListener('click', event => {
    event.preventDefault();
    if (currentPos + 9 < imgArr.length) {
        currentPos += 9;
    } else {
        currentPos = 0;
    }
    let images = imgArr.slice(currentPos, currentPos + 9);
    display(images, heroEl);
})

const scrollBackEl = document.querySelector('.scroll-back');
scrollBackEl.addEventListener('click', event => {
    event.preventDefault();
    if (currentPos - 9 > 0) {
        currentPos -= 9;
    } else {
        currentPos = 0;
    }
    let images = imgArr.slice(currentPos, currentPos + 9);
    display(images, heroEl);
})