var name = "";
var hp = 0;
var attack = 0;
var counter = 0;
var img;
var charArr = [];

function Setup(charName, hp, attack, counter, picSource) {
    this.name = charName;
    this.hp = hp;
    this.attack = attack;
    this.counter = counter;
    this.picSource = picSource;
    charArr.push(this);
}

function initialize() {
    var mouse = new Setup("mouse",120,25,20, "assets/images/mouse-droid.jpeg");
    var willrow = new Setup("willrow",150,20,15, "assets/images/willrow-hood.jpg");
    var porkins = new Setup("porkins", 100,20,10, "assets/images/porkins-2.webp");
    var figrin = new Setup("figrin", 160,35,20, "assets/images/figrin-dan.jpg");    
}

initialize();

console.log(charArr[3].picSource);







$(".character").on("click", function() {
    console.log('you have clicked on ' + $("this.hp") + '!');
})