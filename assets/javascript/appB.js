window.onload = function () {
    
    //Global Variables
    var qTimer;
    var qTimerPause = false;
    var totalCorrectAns = 0;
    var totalWrongAns = 0;
    var thisRndAns = [];
    var thisRndCorrect = "";
    var totalQ = 0;
    
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
    
        //console.log(Q01);
    
    var qArray = [Q01, Q02, Q03, Q04, Q05, Q06, Q07, Q08, Q09, Q10, Q11, Q12, Q13, Q14, Q15, Q16, Q17, Q18, Q19, Q20, Q21];
    
    function setUp () {
    
        $(".qRow").html("<h2>how many do you think you can get right?</h2>");
        $(".answersRow").html("<p>game rules: for each question you will have 21 seconds to select the correct answer.</p>" + 
        "<p>If you get all 21 right, you are a comic book trivia master!</p>");
        $(".goGameBtn").html("go!");
        $(".scoreRow").html("<h2>correct answers: 0 -- wrong answers: 0</h2>");
        $(".goAgain").html("Try again?");
        $(".goAgain").hide();
        for (i=0; i<qArray.length; i++) {
            qArray[i].usedQ = false;
        }
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
        qTimer = setTimeout(function(){
            timer --;
            target.html(timer.toString() + " seconds remaining");
            if(timer < 1){wrongAns(thisRndCorrect)};
        }, 1000);
    };
    
    function loadQuestion() {
    
        //hide "go" button, scores
        $(".goGameBtn").hide();
        $(".scoreRow").hide();
        
        //start the timer
        qTimerPause = false;
        startTimer();
        
        
        //pick a question
        var rndNum = Math.floor(Math.random()*20);
        //double check to see if working: console.log(qArray[rndNum]);
    
        if (!qArray[rndNum].usedQ) {
    
            //add to the total Q's asked so far
            totalQ++;
            console.log("total Q's so far: " + totalQ);
    
            if (totalQ > qArray.length) {
                results();
            }
    
            //set the right answer
            thisRndCorrect = qArray[rndNum].correctAns;
            //double check to see if working: 
            console.log("this round's correct Ans: " + thisRndCorrect);
    
            //get the answers into an array
            var possibleAns = thisRndAns.concat(qArray[rndNum].correctAns, qArray[rndNum].wrong0, qArray[rndNum].wrong1, qArray[rndNum].wrong2);
            //double check to see if working: console.log(possibleAns);
    
            //get to da shuffle
            shuffle(possibleAns);
            //double check to see if working: console.log(possibleAns);
    
            $(".qRow").html("<div><p>" + qArray[rndNum].question + "</p></div>");
            
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
    
            //finally, set this question to be "used up"
            setTimeout(setToUsed, 500);
            function setToUsed() {
                qArray[rndNum].usedQ = true;
                //double check to see if working: console.log(qArray[rndNum]);
            };
        } else {
            //here is where we do it again, hopefully getting a new number
            loadQuestion();
        }
    };
    
    function rightAns(){
        totalCorrectAns ++;
        
        //clear the answer timer
        clearTimeout(qTimer);
    
        //display message
        $(".timer").html("<h2>That's Correct!</h2>");
    
        //wait 1.5 seconds, then restart the answer timer and display next question
        setTimeout(function(){
            loadQuestion();
        }, 1500);
    };
    
    function wrongAns(thisRndCorrect){
        totalWrongAns ++;
    
        //clear the answer timer
        clearTimeout(qTimer);
    
        //display message
        $(".timer").html("<h2>No, the right answer was: " + thisRndCorrect +"</h2>");
    
        //wait 1.5 seconds, then restart the answer timer and display next question
        setTimeout(function(){
            loadQuestion();
        }, 1500);
    };
    
    
    function checkAns(ev) {
        //grab the "answer"
        var userGuess = $("#" + ev.currentTarget.id).html();
        console.log("this guess: " + userGuess);
    
        if(!qTimerPause){
            qTimerPause = true;
            
            //check if guess is equal to the correct answer
            if(userGuess == thisRndCorrect){
                rightAns();
            } else {
                wrongAns(thisRndCorrect);
            };
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
        $(".scoreRow").html("<h2>correct answers: " + totalCorrectAns + " -- wrong answers: " + totalWrongAns + "</h2>");
    }
    
    
    
    
    
    }