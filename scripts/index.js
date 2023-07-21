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

        imageContainer.addEventListener('click', (event) => {
            event.preventDefault();
            console.log('clicked');
            event.target.classList.add('.hero__images--hidden');
        })

        parentContainer.appendChild(imageContainer);


    })
}

const formatArray = (apiRes) => {
    let images_array = [];
    let resArr = apiRes.data.collection.items;
    resArr = resArr.filter(res => {
        return res.data[0].center === 'JPL' || res.data[0].center === 'JSC';
    })

    console.log("result Array", resArr);
    for (imageIndex = 0; imageIndex < resArr.length; imageIndex++) {
        let image = resArr[imageIndex].links[0].href;
        images_array.push(image);
    }
    return images_array;
}



form.addEventListener('submit', (event) => {
    event.preventDefault();
    const search = 'planet ' + event.target.name.value;

    axios.get(`https://images-api.nasa.gov/search?q=${search}&media_type=image`)
        .then((response) => {
            imgArr = formatArray(response);
            arrSize = imgArr.length;

            if (arrSize === 0) {
                alert('Could not find any photos')
            }
            display(imgArr.slice(currentPos, 9), heroEl);
            event.target.reset();
        }).catch(err => {
            alert('api error:', err);
        })

})




let planets = document.querySelectorAll('.solarsystem__planet');

planets.forEach((planet) => {
    planet.addEventListener("click", () => {
        console.log(planet.id);
        let search;
        if (planet.id !== "sun") {
            search = "planet " + planet.id;
        } else {
            search = planet.id;
        }


        axios.get(`https://images-api.nasa.gov/search?q=${search}&media_type=image`)
            .then((response) => {
                imgArr = formatArray(response);
                arrSize = imgArr.length;
                display(imgArr.slice(currentPos, 9), heroEl);
            }).catch(err => {
                alert('invalid search or api error', err);
            })

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