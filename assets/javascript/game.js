var name = "";
var hp = 0;
var attack = 0;
var counter = 0;
var img;
var charArr = [];


class Character {
    constructor(name,hp,ap,ca,picSrc){
        this.name = name;
        this.hp = hp;
        this.ap = ap;
        this.ca = ca;
        this.picSrc = picSrc;
        charArr.push(this);
    }
}

var mouse = new Character('mouse',120,25,20,"assets/images/mouse-droid.jpeg");
var willrow = new Character("willrow",150,20,15, "assets/images/willrow-hood.jpg");
var porkins = new Character("porkins", 100,20,10, "assets/images/porkins-2.webp");
var figrin = new Character("figrin", 160,35,20, "assets/images/figrin-dan.jpg"); 

console.log(mouse.picSrc);

charArr.forEach(element => {
    console.log("wow")
    var charImg = $("<img>");
    charImg.addClass("character");
    charImg.attr("src", element.picSrc);
    $("#characters-div").append(charImg);
});



// console.log(mouse);

// console.log(charArr);

var attackTally = 0;
$(".character").on("click", function() {
    attackTally += 10;
    console.log('you have dealt ' + attackTally + ' damage!');
})