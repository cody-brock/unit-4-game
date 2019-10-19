$(document).ready(function initialize() {

    //global variables
    var charArr = [];
    var playerChosen = false;
    var defenderSelected = false;
    var player;
    var defender;

    //empties the messages for re-setting the game cleanly
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

    //imgUpdate is a reusable function that updates the cards with hp each attack
    let imgUpdate = function(element, destination, classer) {
        let card = 
            `<div class="characters player cards ${classer}" style="width: 170px;" id="${element.name}">
                <div>${element.name}</div>
                <div><img class="characters-img" src="${element.picSrc}"></div>
                <div>${element.hp}</div>
            </div>`
            $(destination).append(card);
    }

    //pushes the character images onto the page, adds class and id
    function makeImgDiv (x, destination) {
        x.forEach(element => {
            let card = 
            `<div class="characters player cards" style="width: 170px;" id="${element.name}">
                <div>${element.name}</div>
                <div><img class="characters-img" src="${element.picSrc}"></div>
                <div>${element.hp}</div>
            </div>`
            $(destination).append(card);
        });
    }

    makeImgDiv(charArr, "#characters-div");

    //Choose character and move others into Enemies div
    $(".characters").on("click", function () {
        if (!playerChosen) {
            for (let i=0; i<charArr.length; i++) {
                if (charArr[i].name === this.id) {
                    playerChosen = true;
                    player = charArr[i];
                    apIncrement = charArr[i].ap;
                    charArr.splice(i, 1);
                    $("#your-character").append(this);
                }
            }

            for (let i=0; i<charArr.length; i++) {
                imgUpdate(charArr[i], "#enemies-div", "enemies");
            }    
            $("#characters-div").empty();
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

    //function for handling the logic behind the attack button conditions
    var attackFun = function(player, defender) {
        //if both characters have hp left...
        if (player.hp > 0 && defender.hp > 0) {
            //first player attacks defender
            defender.hp = defender.hp - player.ap;
            //if defender still has hp...
            if (defender.hp > 0) {
                player.hp = player.hp - defender.ca;
            } 

            //This updates the defender's hp on card
            $("#defender-div").empty();
            imgUpdate(defender, "#defender-div", "enemies");

            //this updates the character's hp on card
            $("#your-character").empty();
            imgUpdate(player, "#your-character", "cards-characters-div");
    
            
            //if the player has no more health...
            if (player.hp <= 0) {
                $("#messages").empty();
                $("#messages").text("You have been defeated...GAME OVER!!!");
                $("#restart-button").css("display", "block");
                playerChosen = false;
                return;
            }
            //if defender has no hp, victory conditions met, remove defender, prompts message, and allow new one to be selected
             if (defender.hp <= 0) {
                $("#messages").empty();
                $("#messages").text("You have defeated " + defender.name + ". You can choose to fight another enemy.")
                $("#defender-div").empty();
                defenderSelected = false;
                //if there are no more enemies...
                if ($("#enemies-div").is(":empty") && $("#defender-div").is(":empty")) {
                    //FULL victory condition
                    $("#messages").text("You Won!!!! GAME OVER!!!");
                    $("#restart-button").css("display", "block");
                    return;
                } 
                //but if there are more enemies, carry on
                else return;
            }
        }

        //prompts messages mid-battle to update user on attacks
        $("#messages").html("You attacked " + defender.name + " for " + player.ap + " damage. <br>" + defender.name + " attacked you back for " + defender.ca + " damage.");
        //increments the player's attack power
        playerAttackIncrease(player);
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