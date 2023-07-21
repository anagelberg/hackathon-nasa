const display = (imageUrl, container) => {
    container.style.backgroundImage = imageUrl;
}


form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(event.target.name.value);

})

