$(document).ready(function initialize() {
    console.log("ready");

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
$("#characters-div").empty();
$("#your-character").empty();
$("#enemies-div").empty();
$("#defender-div").empty();
$("#messages").empty();
$("#restart-button").css("display", "none");



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
    var mouse = new Character("Mouse",120,15,20,"assets/images/mouse-droid.jpeg");
    var willrow = new Character("Willrow",150,10,15, "assets/images/willrow-hood.jpg");
    var porkins = new Character("Porkins", 100,10,10, "assets/images/porkins-2.webp");
    var figrin = new Character("Figrin", 160,15,70, "assets/images/figrin-dan.jpg"); 

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
                    apIncrement = charArr[i].ap;
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
                        $("#messages").empty();
                    }
                }
            }
        })
    })


    //function to increment player's attack power
    var playerAttackIncrease = function(player) {
        player.ap = player.ap + apIncrement;
    }

    $.fn.multiline = function(text){
        this.text(text);
        this.html(this.html().replace(/\n/g,'<br/>'));
        return this;
    }

    //function for handling the logic behind the attack button conditions
    var attackFun = function(player, defender) {
        //clear messages thing?????????
        //if both characters have hp left...
        if (player.hp > 0 && defender.hp > 0) {
            //first player attacks defender
            defender.hp = defender.hp - player.ap;
            //increments the player's attack power
            playerAttackIncrease(player);
            //if defender still has hp...
            if (defender.hp > 0) {
                player.hp = player.hp - defender.ca;
            } 
            //if the player has no more health...
            if (player.hp <= 0) {
                console.log("losing");
                $("#messages").empty();
                $("#messages").text("You have been defeated...GAME OVER!!!");
                $("#restart-button").css("display", "block");
                return;
            }
            //if defender has no hp, victory conditions met, remove defender
            //and allow new one to be selected
            else if (defender.hp <= 0) {
                $("#messages").empty();
                $("#messages").text("You have defeated " + defender.name + ". You can choose to fight another enemy.")
                $("#defender-div").empty();
                defenderSelected = false;
            }
            //if there are no more enemies...
            if ($("#enemies-div").is(":empty")) {
                //Victory condition
                $("#messages").text("You Won!!!! GAME OVER!!!");
                $("#restart-button").css("display", "block");
                return;
            }
        }
        $("#messages").multiline("You attacked " + defender.name + " for " + player.ap + " damage. \n" + defender.name + " attacked you back for " + defender.ca + " damage.");

        console.log(player.hp, defender.hp);
    }

    //when "attack" button is pressed...
    $("#fight-button").on("click", function () {
        if (playerChosen && defenderSelected) {
            attackFun(player, defender);
        }
    })

    //restart button event handler
    $("#restart-button").on("click", function() {
        initialize();
    })




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

