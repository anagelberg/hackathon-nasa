api_key = "NfrtX26rhNzjyIfRcalbFEaBQta2hTLMnSQAHrJS";


const display = (urlArray, parentContainer) => {
    urlArray.forEach((url) => {
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('hero__images');
        imageContainer.style.backgroundImage = `url('${url}')`;
        parentContainer.appendChild(imageContainer);
    })
}


const formatArray = (apiRes) => {
    let images_array = [];
    for (imageIndex = 0; imageIndex < 15; imageIndex++) {
        let image = apiRes.data.collection.items[imageIndex].links[0].href;
        images_array.push(image);
    }
    return images_array;
}

const form = document.querySelector('.planet-form');
const heroEl = document.querySelector('.hero');
console.log()

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const search = 'planet ' + event.target.name.value;
    console.log(search)

    /* pipe search into axios */
    axios.get(`https://images-api.nasa.gov/search?q=${search}&media_type=image`)
        .then((response) => {
            images = formatArray(response)
            heroEl.innerText = "";
            display(images, heroEl);
        }).catch(err => {
            console.log('invalid search')
        })

})

