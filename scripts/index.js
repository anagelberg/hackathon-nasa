


const display = (imageUrl, container) => {
    container.style.backgroundImage = imageUrl;
}


const form = document.querySelector('.form');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(event.target.input.value);
    //search the axios
})

