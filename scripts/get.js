let search = 'mars';
api_key = "NfrtX26rhNzjyIfRcalbFEaBQta2hTLMnSQAHrJS";



// let clickSearch = (id) => {
//     console.log(id);
// }

let planets = document.querySelectorAll('.solarsystem__planet');

planets.forEach((planet) => {
    planet.addEventListener("click", () => {
        console.log(planet.id);
        if (planet.id !== "sun") {
            let search = "planet " + planet.id;
        } else {
            let search = planet.id;
        }


        axios.get(`https://images-api.nasa.gov/search?q=${search}&media_type=image`)
        .then((response) => {
            let images_array = [];
            for (imageIndex = 0; imageIndex < response.data.collection.items.length; imageIndex++) {
                let image = response.data.collection.items[imageIndex].links[0].href;
                images_array.push(image);   
    }
            console.log(images_array);
            console.log(response.data.collection);
        })
    })
} )