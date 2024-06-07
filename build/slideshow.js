
const slides = document.querySelectorAll(".slide") ;

console.log(slides) ;
var counter = 0 ;

slides.forEach(
    (slide,index) =>{
        slide.style.left =  `${index*100}%`;
    }
)

function goPrev(){
   counter--;
   slideImage();
}

function goNext(){
    counter++;
   slideImage();
}

function slideImage(){
    if(counter>slides.length-1){
        counter=0 ;
    }
    slides.forEach(
        (slide) => {
            slide.style.transform = `translateX(-${counter*100}%)`
        }
    )
}



function goNext1(){
    counter++;
   slideImage();
   setTimeout(goNext1,4000)
}

setTimeout(goNext1,2000)

