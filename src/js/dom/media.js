function generateMedia() {
    let tags = document.getElementsByTagName('a');
    for(let i = 0; i < tags.length; i++) {
        renderSingleSource(tags[i].getAttribute('href'));
    }
}