data = {
    container: {}
};

function generateDOM() {
    document.body.classList.add('fslightbox-open');
    let container = document.createElement('div');
    container.classList.add('fslightbox-container');
    data.container = container;
    document.body.appendChild(container);

    window.addEventListener('scroll', function (event) {
        event.preventDefault();
        console.log(event);
    })

}