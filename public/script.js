const coll = document.getElementsByClassName("collapsible");

for (let e of coll) {
    e.addEventListener('click', function() {
        // this.classList.toggle('something');
        const content = this.nextElementSibling;

        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}