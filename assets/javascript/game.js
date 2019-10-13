var name = "";
var hp = 0;
var attack = 0;
var counter = 0;
var charArr = [];

function Setup(charName, hp, attack, counter) {
    this.name = charName;
    this.hp = hp;
    this.attack = attack;
    this.counter = counter
    charArr.push(this);
}

function initialize() {
    var mouse = new Setup("mouse",120,25,20);
    var willrow = new Setup("willrow",150,20,15);
    var porkins = new Setup("porkins", 100,20,10);
    var figrin = new Setup("figrin", 160,35,20);    
}

initialize();

console.log(charArr[0]);







$(".character").on("click", function() {
    alert("you've clicked the mouse!");
})