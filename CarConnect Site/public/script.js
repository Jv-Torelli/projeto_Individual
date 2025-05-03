let count = 1;
document.getElementById("radio1").checked = true;
let nav = document.getElementById('navBar');
let lastScrollTop = 0;

setInterval( function(){
    nextImage();
}, 5000)

function nextImage(){
    count++
    if(count > 4){
        count = 1;
    }

    document.getElementById("radio"+count).checked = true;

}


window.addEventListener('scroll', function(){
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if(scrollTop > lastScrollTop){
        // Scroll pra baixo → esconde nav
        nav.style.top = "-100px";
    } else {
        // Scroll pra cima → mostra nav
        nav.style.top = "0";
    }
    lastScrollTop = scrollTop;
});