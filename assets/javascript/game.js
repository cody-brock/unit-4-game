var name = "";
var hp = 0;
var attack = 0;
var counter = 0;
var img;
var charArr = [];
var playerChosen = false;
var defenderSelected = false;
var player;
var defender;

//Constructor to give characters their attributes
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

//gives the constructor the info it needs
var mouse = new Character("mouse",120,25,20,"assets/images/mouse-droid.jpeg");
var willrow = new Character("willrow",150,20,15, "assets/images/willrow-hood.jpg");
var porkins = new Character("porkins", 100,20,10, "assets/images/porkins-2.webp");
var figrin = new Character("figrin", 160,35,20, "assets/images/figrin-dan.jpg"); 

//pushes the character images onto the page, adds class and id
function makeImgDiv (x, destination) {
    x.forEach(element => {
        var charImg = $("<img>");
        charImg.addClass("characters");
        charImg.attr("src", element.picSrc);
        charImg.attr("id", element.name);
        // $("#characters-div").append(charImg);
        $(destination).append(charImg);
        charImg.append(element.name + "<br>")
        // console.log(charImg);
        charImg.append()
    });
}

makeImgDiv(charArr, "#characters-div")

//Choose character and move others into Enemies div
$(".characters").on("click", function () {
    if (!playerChosen) {
        for (let i=0; i<charArr.length; i++) {
            if (charArr[i].name === this.id) {
                playerChosen = true;
                player = charArr[i];
                charArr.splice(i, 1);
                $("#your-character").append(this);
            }
        }

        for (let i=0; i<charArr.length; i++) {
            var charImg = $("<img>")
            charImg.removeClass("characters");
            charImg.addClass("enemies");
            charImg.attr("src", charArr[i].picSrc);
            charImg.attr("id", charArr[i].name)
            $("#enemies-div").append(charImg);
            $("#characters-div").empty();
        }    
    }   

    //choose defender, move to Defender div
    $(".enemies").on("click", function () {
        if (!defenderSelected) {
            for (let i=0; i<charArr.length; i++) {
                if (charArr[i].name === this.id) {
                    var charImg = $("<img>")
                    charImg.removeClass("enemies");
                    charImg.addClass("defender");
                    $("#defender-div").append(this);
                    defenderSelected = true;
                    defender = charArr[i];
                }
            }
        }
    })
})


var attackFun = function(player, defender) {
    if (player.hp > 0 && defender.hp > 0) {
        defender.hp - player.ap;
        if (defender.hp > 0) {
            player.hp - defender.ca;
        }
    }
    console.log(player.hp, defender.hp);
}

$("#fight-button").on("click", function () {
    if (playerChosen && defenderSelected) {
        console.log("fighting", player.hp);
        attackFun(player, defender);
    }
})




    
    
        
            
   


//moves characters from place to place



// console.log(charArr[0]);
// console.log("outside click", mouse.ap);

//Choose character
// $(".characters").on("click", function() {
//     console.log("inside click", $( this ).ap);
//     console.log(($(this).attr("name")));
// });

// // console.log(mouse.name)


// $(".character").on("click", function() {
//     // let attackPoints = ${this.name};
//     console.log("${this.name}");
//     // attackTally += this.ap;
//     // console.log('you have dealt ' + attackTally + ' damage!');
// });

