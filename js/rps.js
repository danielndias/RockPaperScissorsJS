/*
 * rps.js: May 2017
 * Daniel Dias
 */

// DON'T TOUCH, Just Read  --------------
// array of moves/ids
var pics = ["rock", "paper", "scissors"];
// load the page elements
document.addEventListener("DOMContentLoaded", init, false);
// --------------------------------------

//Variables: add the following variables to your JavaScript file (put them at the top, 
//under the document.addEventListener("DOMContentLoaded", init); statement).
var results = ["You Win!", "You Lose!", "It's a Tie!"];
var compScore = 0;
var playerScore = 0;

//Method that will be initiated after the page loads
function init() {
    // imgContainer Variable moved to inside the init funtion
    var imgContainer = document.getElementById("img-container");
    
    //Creating a variable and using it to create an header element
    var elem = document.createElement("header");
    
    //Inserting the header element previously created in the page, before the imgContainer
    document.body.insertBefore(elem, imgContainer);
    
    //To decrease the number of variables that the program creates, 
    //We will use the elem variable already created to create a h1 element
    elem = document.createElement("h1");
    
    //Inserting a text content in the h1 element recently created
    elem.appendChild(document.createTextNode("Play Rock, Paper, Scissors!"));
    
    //Inserting the h1 element in the page, inside the header element
    document.body.firstElementChild.appendChild(elem);
    
    elem = document.createElement("div");
    elem.className = "game-header";
    elem.appendChild(document.createTextNode("Choose your method of destruction:"));
    document.body.insertBefore(elem, imgContainer);
    
    

    
    //Using a for loop to insert the 3 images from the Image Array
    for (i = 0; i < pics.length; i++) {
        elem = document.createElement("img");
        elem.className = "rps-img no-img-border";
        elem.src = "images/"+pics[i]+".png";
        elem.id = pics[i];
        imgContainer.appendChild(elem);
        
        /* The init() Function: make the following addition:
         * Each of the 3 images the user will click on needs to be registered with an event handler (the move()
         * method you'll write below). Register each of the 3 images using addEventListener(). 
         * This should be done in the most efficient way possible with no redundant code. */
        elem.addEventListener("click", move);
    }
    
    
    elem = document.createElement("div");
    
    //Assigning a class to the div element recently created
    elem.className = "game-header";
    elem.appendChild(document.createTextNode("The computer chooses:"));
    document.body.appendChild(elem);
    
    //Creating a new variable to store the table element to simplify adding childrens to it.
    elem = document.createElement("table");    
    document.body.appendChild(elem);
    elem = document.createElement("tr");
    document.body.lastElementChild.appendChild(elem);
    elem = document.createElement("td");
    document.body.lastElementChild.lastElementChild.appendChild(elem);
    elem = document.createElement("img");
    
    //Assigning a class to the img element recently created
    elem.className = "rps-img";
    
    //Assigning an id to the img element recently created
    elem.id = "comp-img";
    document.body.lastElementChild.lastElementChild.lastElementChild.appendChild(elem);
    elem = document.createElement("td");
    elem.className = "vert-center";
    document.body.lastElementChild.lastElementChild.appendChild(elem);
    elem = document.createElement("div");
    
    //Assigning an id to the div element recently created
    elem.id = "output";
    document.body.lastElementChild.lastElementChild.lastElementChild.appendChild(elem);
    
    //Using the document.body.lastElementChild variable previouly created to simplify adding childrens to the div.
    elem = document.createElement("div");
    
    //Assigning an id to the div element recently created
    elem.id = "score";
    document.body.appendChild(elem);
    elem = document.createElement("div");
    elem.appendChild(document.createTextNode("Score:"));
    document.body.lastElementChild.appendChild(elem);
    elem = document.createElement("div");
    elem.appendChild(document.createTextNode("You:"));
    document.body.lastElementChild.appendChild(elem);
    elem = document.createElement("span");
    elem.id = "user-score";
    document.body.lastElementChild.lastElementChild.appendChild(elem);
    
    
    
    elem = document.createElement("div");
    elem.appendChild(document.createTextNode("Computer:"));
    document.body.lastElementChild.appendChild(elem);
    elem = document.createElement("span");
    elem.id = "comp-score";
    document.body.lastElementChild.lastElementChild.appendChild(elem);
    
    
    elem = document.createElement("footer");
    elem.appendChild(document.createTextNode("© 2017, Daniel Dias"));
    document.body.appendChild(elem);
       
}

/* getComputerMove() function: this function generates a random computer move. 
 * We'll use this in the main move() function. The function should:
 * Generate a random integer from 0 to 2
 * Change the computer's image ("comp-img") to the picture corresponding to the random number generated 
 * (use the pics array that was given to you in the Assignment 2 CodePen).
 * Return the random number that ws generated. */
function getComputerMove() {
    var computerChoise = Math.floor(Math.random() * 3);
    document.getElementById("comp-img").src = "images/"+pics[computerChoise]+".png";
    return computerChoise;
}

/* move() function: this function is executed every time the user clicks an image (chooses rock, paper, or scissors
 * It compares the user's move to the computer's move and determines a winner. It also adjusts the player's score 
 * and the computer's score and updates the web page's CSS. Your move() function should perform the following tasks: */
function move() {
    
    //Get the computer's move using the getComputerMove() function you just wrote.
    var computerMove = getComputerMove();
    
    /*When the user clicks an image of their choice, it will add a border so that it's clear which move they chose. 
     * It's possible that if this is the 2nd or subsequent move, there is a border around their previous selection. 
     * Use a loop to iterate through the player images and turn off the borders. Hint: See the CSS code you were given 
     * in Assignment 2 - there are classes for no-img-border and img-border. */
    for (i = 0; i < pics.length; i++) {
        document.getElementsByTagName("img")[i].className = "rps-img no-img-border";
    }
    /* Now write the single statement to turn on the border on the image just clicked (remember you can access it with this.
     * Make sure you include the "rps-img" class, don't accidentally overwrite that. 
     * Inside the move() event handler, the this keyword refers to the image element the user just clicked on. */
    this.className = "rps-img img-border";
    
    /* Get the id of the image that was just clicked (this will be a string: see the HTML you were given in Assignment 2). 
     * Use the pics array's indexOf() method (it works just like String.indexOf() in Java) to find the index corresponding to 
     * the image that was clicked. For example, if the user clicked the "paper" image, the index will be 1. This is done in 
     * one single line of code, you don't need any if statements for this.*/
    var userMove = pics.indexOf(this.id);
    
    /* Write the necessary if-statements to determine the result of the player's chosen move and the computer's random move:
    * If player and computer choose the same thing, it's a tie.
    * If player chose rock, the computer wins if the computer chose paper, and the player wins if the computer chose scissors.
    * If the player chose paper, the computer wins if the computer chose scissors, and the player wins if the computer chose rock.
    * If the player chose scissors, the computer wins if the computer chose rock, and the player wins if the computer chose paper.
    * When it's a tie, no one gets a point.
    * When the computer wins, the compScore variable gets an additional point.
    * When the player wins, the playerScore variable gets an additional point.
    * Use variables and indexes for the logic that determines the winner. For example, when it's a tie, I set a result variable to 2,
    * which happens to be the index of "It's a Tie!" in the results array.
    * Use the conditional (?:) operator when determining the winning move. For example:
    * If user chooses rock
    * result = (computer chooses paper) ? 1 : 0
    * The 1 and the 0 correspond to the "You Lose!" and "You Win!" values in the results array. */ 
    if (userMove === computerMove) {
        result = 2;
    } else if (userMove === 0) {
        result = (computerMove === 1) ? 1 : 0;
    } else if (userMove === 1) {
        result = (computerMove === 2) ? 1 : 0;
    } else {
        result = (computerMove === 0) ? 1 : 0;
    }
    if (result === 0) {
        playerScore++;
    } else if (result === 1) {
        compScore++;
    } 
    
    /* After the result is determined, update the elements that display the results and score:
    * Update the "output" element's HTML content: it should display the appropriate value from the results array. You should do this in one single line of code.
    * Update the "user-score" element's HTML content: it should display the the new player score. You should do this in one single line of code.
    * Update the "comp-score" element's HTML content: it should display the the new computer score. You should do this in one single line of code.
    * */   
    document.getElementById("output").innerHTML = results[result];
    document.getElementById("user-score").innerHTML = playerScore;
    document.getElementById("comp-score").innerHTML = compScore;
    
}
    