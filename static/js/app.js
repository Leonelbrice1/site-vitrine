var typed = new Typed('#autocomplete', {
    strings: ['Que recherchez vous?','Une information ?','Un service ?'],
    typeSpeed: 50,
    backSpeed: 20,
    backDelay: 1000,
    loop: true,
    showCursor: true,
    cursorChar: '|',
    attr: 'placeholder',
    contentType: 'text',
});

/* bouton toggle */

const btn = document.querySelector(".hamburger-box")

btn.addEventListener("click",()=>{
    querySelector(".hamburger-inner").classList.toggle("active")
    
})