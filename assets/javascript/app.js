window.onload = function () {

//Global Variables
var qTimer;
var qTimerPause = false;
var totalCorrectAns = 0;
var totalWrongAns = 0;
var thisRndAns = [];
var thisRndCorrect = "";
var totalQ = 0;
var newTime = 0;

function qCreate(qQuest, cAns, wAns0, wAns1, wAns2) {
    output = {};
    output.question = qQuest;
    output.correctAns = cAns;
    output.wrong0 = wAns0;
    output.wrong1 = wAns1;
    output.wrong2 = wAns2;
    output.usedQ = false;
    return output;
}

// Questions and Answers 
    var Q01 = qCreate("In what year did Disney buy Marvel Comics?", "2009", "2006", "2011", "2013")
    var Q02 = qCreate("What flagship comic title launched in 1961 and led the way for Marvel after their rebranding?", "Fantastic 4", "X-Men", "Spider-Man", "DareDevil")
    var Q03 = qCreate("Stan Lee is known as the father of all things Marvel, who was his main partner?", "Jack Kirby", "Bob Kane", "Frank Miller", "Lee Falk")
    var Q04 = qCreate("Of the following titles, which is not mainly set in New York?", "the Hulk", "Spider-Man", "Luke Cage", "Captain America")
    var Q05 = qCreate("Superman's Metropolis was originally patterend after which US City?", "Cleveland, OH", "New York City, NY", "Chicago, IL", "Atlanta, GA")
    var Q06 = qCreate("Who was the first Marvel super hero to appear on the cover of a comic book? (hint: 1939)", "Human Torch", "Captain America", "Doctor Strange", "Cyclops")
    var Q07 = qCreate("In the DC universe: who holds the alter ego 'the Oracle'?", "Barbara Gordon", "Selena Kyle", "Harleen Quinzel", "Julie Newmar")
    var Q08 = qCreate("Which Robin died at the hands of The Joker in the 'A Death in the Family' storyline?", "Jason Todd", "Alfred Pennyworth", "Dick Grayson", "Tim Drake")
    var Q09 = qCreate("To what color is the Green Lantern weak to?", "yellow", "brown", "puce (yes, that's a color)", "umber")
    var Q10 = qCreate("Wolverine, America's favorite Canadian, first appeared in which comic book?", "The Incredible Hulk", "DareDevil", "X-Men", "Alpha Flight")
    var Q11 = qCreate("Superman is known for his weakness to Kryptonite. What else is he known for having problems facing?", "Magic", "Null-Kryptonite", "Riddles", "Plasma")
    var Q12 = qCreate("(with hints to befuddle and throw you off!) The Punisher was a quick 'cash grab' comic idea, meant to ride the coat-tails of which famous action movie?", "Death Wish (Two words: Charles Bronson)", 'Sudden Impact ("Go ahead, make my day")', "Serpico (Best Actor, best adapted screenplay)", "Die Hard (first movie coined a 'blockbuster')")
    var Q13 = qCreate("What is the name of  Marvel's 'cleaner' squad, created to fix damages and clean up after super powered fights? (soon to be a movie!)", "Damage Control", "S.H.E.I.L.D.", "Wolfe Construction", "Omni-Tech Corp.")
    var Q14 = qCreate("Batman originally appeared in which Comic title?", "Detective Comics", "Action Comics", "Batman", "the Adventures of Batman and Robin")
    var Q15 = qCreate("Who was the first superhero to fly?", "Namor", "Superman", "Shazam!", "Human Torch")
    var Q16 = qCreate("Wonder Woman's original name was slated to be...?", "Suprema", "Excelsior", "Wondara", "Dy'ann the Warrior Priestess")
    var Q17 = qCreate("The Hulk, in his first issue, was originally this color: but the printers of the time were challenged by the hue and he was chanaged to green.", "Grey", "White", "Black", "Brown")
    var Q18 = qCreate("Deadpool is known for breaking the 'fourth wall' which of these real world reference references has he NOT made?", "'ALF is on!'", "'Leroy Jenkins!' ", "'Rob Liefield & pouches' ", "'Five Minutes Alone by Pantera'")
    var Q19 = qCreate("Name a Crossover that has *not* happened", "Iron Man/Star Trek", "G.I. Joe/Transformers", "Transformers/Iron Man", "X-Men/Star Trek")
    var Q20 = qCreate("Alan Moore has been behind many famous comic book titles. Which of the following is not his work?", "Y: the Last Man", "Watchmen", "V for Vendetta", "Batman: the Killing Joke")
    var Q21 = qCreate("J.K. Rowling approved the first-ever 'Harry Potter' comic — for a great reason. The comic's proceeds go toward the victims and survivors of the Pulse nightclub shooting. Who will be the publisher?", "DC", "Image", "Marvel", "Darkhorse")


var qArray = [Q01, Q02, Q03, Q04, Q05, Q06, Q07, Q08, Q09, Q10, Q11, Q12, Q13, Q14, Q15, Q16, Q17, Q18, Q19, Q20, Q21];

var thisRndQ = 0;

function setUp () {
    //resert Global Variables
    qTimer;
    qTimerPause = false;
    totalCorrectAns = 0;
    totalWrongAns = 0;
    thisRndAns = [];
    thisRndCorrect = "";
    totalQ = 0;
    thisRndQ = 0;

    shuffle(qArray);

    $(".qRow").html("<h2>how many do you think you can get right?</h2>");
    $(".answersRow").html("<p>game rules: for each question you will have 21 seconds to select the correct answer.</p>" + 
    "<p>If you get all 21 right, you are a comic book trivia master!</p>");
    $(".goGameBtn").html("go!");
    $(".goGameBtn").show();
    $(".scoreRow").html("<h2>correct answers: 0 -- wrong answers: 0</h2>");
    $(".timer").html("");
    $(".goAgain").html("Try again?");
    $(".goAgain").hide();
}

setUp();

//bind go button to loadQuestion
$(".goGameBtn").on("click", function(ev){
    loadQuestion(ev);
});

function startTimer() {
    var target = $(".timer");
    var timer = 21;
    target.html(timer.toString() + " seconds remaining");
    qTimer = setInterval(function(){
        timer --;
        target.html(timer.toString() + " seconds remaining");
        if(timer < 1){
            //clear the answer timer
            clearInterval(qTimer);

            // wrongAns(thisRndCorrect)
            checkAns(null);
        };
    }, 1000);
};

function loadQuestion() {

    //hide "go" button, scores
    $(".goGameBtn").hide();
    $(".scoreRow").hide();
    
    //start the timer
    qTimerPause = false;
    startTimer();
    
    //if (!qArray[rndNum].usedQ) {

    qArray[thisRndQ]

        //add to the total Q's asked so far
        totalQ++;
        //console.log("total Q's so far: " + totalQ);

        //set the right answer
        thisRndCorrect = qArray[thisRndQ].correctAns;
        //double check to see if working: 
        //console.log("this round's correct Ans: " + thisRndCorrect);

        //get the answers into an array
        var possibleAns = thisRndAns.concat(qArray[thisRndQ].correctAns, qArray[thisRndQ].wrong0, qArray[thisRndQ].wrong1, qArray[thisRndQ].wrong2);
        //double check to see if working: console.log(possibleAns);

        //get to da shuffle
        shuffle(possibleAns);
        //double check to see if working: console.log(possibleAns);

        $(".qRow").html("<div><p>" + qArray[thisRndQ].question + "</p></div>");
        
        $(".answersRow").html(
            "<div><button class='btn btn-lg btn-primary answer' id='guessA'>" + possibleAns[0] + "</button></div>" +
            "<div><button class='btn btn-lg btn-primary answer' id='guessB'>" + possibleAns[1] + "</button></div>" +
            "<div><button class='btn btn-lg btn-primary answer' id='guessC'>" + possibleAns[2] + "</button></div>" +
            "<div><button class='btn btn-lg btn-primary answer' id='guessD'>" + possibleAns[3] + "</button></div>"
        ); 
        
        //answer class divs check the answer
        $(".answer").on("click", function(ev){
            checkAns(ev);
        });

};

function rightAns(){
    totalCorrectAns ++;
    //console.log("total right: " + totalCorrectAns);

    //display message
    $(".timer").html("<h2>That's Correct!</h2>");
 };

function wrongAns(thisRndCorrect){
    totalWrongAns ++;
    //console.log("total wrong: " + totalWrongAns);

    //display message
    $(".timer").html("<h2>No, the right answer was: " + thisRndCorrect +"</h2>");
};


function checkAns(ev) {
    $(".answer").unbind("click");
    //grab the "answer"
    var userGuess;
    if (ev == null) {
        userGuess = "null"
    } else {
        userGuess = $("#" + ev.currentTarget.id).html();
    }
    //console.log("this guess: " + userGuess);
    thisRndQ ++;

    //clear the answer timer
    clearTimeout(qTimer);
    clearTimeout(newTime);

    if(!qTimerPause){
        qTimerPause = true;
        
        //check if guess is equal to the correct answer
        if(userGuess == thisRndCorrect){
            rightAns();
        } else {
            wrongAns(thisRndCorrect);
        };
    };

    if (thisRndQ == 21) {
        results();
    } else {
    //wait 1.5 seconds, then restart the answer timer and display next question
    newTime = setTimeout(function(){
        loadQuestion();
        }, 2000);
        $(".answer").unbind("click");
    };

};

//stolen from stack!
function shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    };
};

//answer class divs check the answer
$(".answer").on("click", function(ev){
    // console.log("answer button clicked");
    checkAns(ev);
});

function results () {
    $(".goAgain").show();
    $(".scoreRow").show();
    $(".scoreRow").html("<h2>correct answers: " + totalCorrectAns + " -- wrong answers: " + totalWrongAns + "</h2>");
}

//bind go button to loadQuestion
$(".goAgain").on("click", function(){
    setUp();
});



}