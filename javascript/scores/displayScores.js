// variables for displaying the scores.
let localScoreTableRow;
let globalScoreTableRow;

let game;
let displayedGame = [];
let scoresArray = [];
let displayedScoresArray = [];

let globalVariableCallCount = 0;

let localStartRef = 0;
let localEndRef = 10;

let globalStartRef = 0;
let globalEndRef = 10;

let localPageNumber = 1;
let globalPageNumber = 1;
let globalPageNumberMaxPage = 0;

// display high scores when the page loads
function onLoad () {
    displayGlobalHighScores(0,10);
    displayLocalHighScores(0,10);
    displayLocalTotalPages();
}

// displays high scores from local storage
function displayLocalHighScores(forLoopStarNumber, forLoopEndNumber) {

    game = JSON.parse(localStorage.getItem('game')) || [];

    game.sort((a, b) => {
        if (a.score > b.score) {
            return -1;
        }
        else if (a.score < b.score) {
            return 1
        }
        else {
            return 0
        }
    });

    // adds a space every third character
    for (let i = 0; i < game.length; i++) {
        JSON.stringify(game[i].score);
        displayedGame.push(
            {
                name: game[i].name,
                scoreDate: game[i].scoreDate,
                score: game[i].score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
            }
        );
    }

    $('.localHighScoreTableRow').html('');

    if(game.length < 10){
        forLoopEndNumber = game.length;
    }
    if (forLoopEndNumber > game.length){
        forLoopEndNumber = game.length;
    }

    //loops through scores and displays them, if score is in place 1-3 display a medal
    for (let i = forLoopStarNumber; i < forLoopEndNumber; i++) {

         if(i === 0){
            localScoreTableRow = `
            <tr class="localScoreTableRow">
                <td class="localPlace"><div class="medalContainer"><img class="medalImage" src="assets/images/gold-medal.png">${i+1}</div></td>
                <td class="localName">${displayedGame[i].name}</td>
                <td class="localDate">${displayedGame[i].scoreDate}</td>
                <td class="localScore">${displayedGame[i].score}</td>
            </tr>
        `;
        }
        else if(i === 1){
            localScoreTableRow = `
            <tr class="localScoreTableRow">
                <td class="localPlace"><div class="medalContainer"><img class="medalImage" src="assets/images/silver-medal.png">${i+1}</div></td>
                <td class="localName">${displayedGame[i].name}</td>
                <td class="localDate">${displayedGame[i].scoreDate}</td>
                <td class="localScore">${displayedGame[i].score}</td>
            </tr>
        `;
        }
        else if(i === 2){
            localScoreTableRow = `
            <tr class="localScoreTableRow">
                <td class="localPlace"><div class="medalContainer"><img class="medalImage" src="assets/images/bronze-medal.png">${i+1}</div></td>
                <td class="localName">${displayedGame[i].name}</td>
                <td class="localDate">${displayedGame[i].scoreDate}</td>
                <td class="localScore">${displayedGame[i].score}</td>
            </tr>
        `;
        }
        else{
            localScoreTableRow = `
            <tr class="localScoreTableRow">
                <td class="localPlace">${i+1}</td>
                <td class="localName">${displayedGame[i].name}</td>
                <td class="localDate">${displayedGame[i].scoreDate}</td>
                <td class="localScore">${displayedGame[i].score}</td>
            </tr>
        `;
        }
        $('#localHighScoreTable').append(localScoreTableRow);

    }
}

// displays scores from the data base
function displayGlobalHighScores(forLoopStarNumber, forLoopEndNumber) {

    if(globalVariableCallCount === 0) {

        globalVariableCallCount ++;

        $.get('https://thelastcity-ad.firebaseio.com/highScores/.json', function (data, status) {
            let scores = data;

            for (let scoresAndNames in scores) {
                scoresArray.push(scores[scoresAndNames]);
                globalPageNumberMaxPage ++;
            }

            scoresArray.sort((a, b) => {
                if (a.score > b.score) {
                    return -1;
                }
                else if (a.score < b.score) {
                    return 1
                }
                else {
                    return 0
                }
            });

            // adds a space every third character
            for (let i = 0; i < scoresArray.length; i++) {
                JSON.stringify(scoresArray[i].score);
                displayedScoresArray.push(
                    {
                        userName: scoresArray[i].userName,
                        date: scoresArray[i].date,
                        score: scoresArray[i].score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                    }
                );
            }

            globalScoresForLoop(forLoopStarNumber, forLoopEndNumber);
            displayGlobalTotalPages();

        });
    }
    else{
        globalScoresForLoop(forLoopStarNumber, forLoopEndNumber);
    }
}

// finds how many page there are for the local high scores and displays that number
function displayLocalTotalPages() {
    let localPageNumberMaxPage = Math.ceil(game.length /10);

    $('.localPageInsert').html(`${localPageNumber}/${localPageNumberMaxPage}`)
}

//displays local next a previous scores

function nextLocalScores() {
    if(localEndRef <= game.length){
        $('.localScoreTableRow').html('');
        localStartRef += 10;
        localEndRef += 10;
        localPageNumber ++;
        displayLocalTotalPages();
        displayLocalHighScores(localStartRef, localEndRef);
    }
}
function previousLocalScores() {
    localStartRef -= 10;
    localEndRef -= 10;
    if(localStartRef <= 0){
        localStartRef = 0;
        localEndRef = 10;
    }
    if(localPageNumber !== 1) {
        localPageNumber--;
        displayLocalTotalPages();
    }
    $('.localScoreTableRow').html('');
    displayLocalHighScores(localStartRef, localEndRef);
}

// finds how many page there are for the global high scores and displays that number
function displayGlobalTotalPages() {
    let globalPageNumberMaxPage = Math.ceil(scoresArray.length /10);

    $('.globalPageInsert').html(`${globalPageNumber}/${globalPageNumberMaxPage}`)
}

//displays global next a previous scores
function nextGlobalScores() {
    if(globalEndRef <= scoresArray.length){
        $('.globalScoreTableRow').html('');
        globalStartRef += 10;
        globalEndRef += 10;
        globalPageNumber ++;
        displayGlobalTotalPages();
        displayGlobalHighScores(globalStartRef, globalEndRef);
    }
}
function previousGlobalScores() {
    globalStartRef -= 10;
    globalEndRef -= 10;
    if (globalStartRef <= 0) {
        globalStartRef = 0;
        globalEndRef = 10;
    }
    if(globalPageNumber !== 1) {
        globalPageNumber--;
        displayGlobalTotalPages();
    }
    $('.globalScoreTableRow').html('');
    displayGlobalHighScores(globalStartRef, globalEndRef);

}

//loops through scores and displays them, if score is in place 1-3 display a medal
function globalScoresForLoop( forLoopStarNumber, forLoopEndNumber) {
    for (let i = forLoopStarNumber; i < forLoopEndNumber; i++) {

        if (i === 0) {
            globalScoreTableRow = `
            <tr class="globalScoreTableRow">
                <td class="globalPlace"><div class="medalContainer"><img class="medalImage" src="assets/images/gold-medal.png">${i + 1}</div></td>
                <td class="globalName">${displayedScoresArray[i].userName}</td>
                <td class="globalDate">${displayedScoresArray[i].date}</td>
                <td class="globalScore">${displayedScoresArray[i].score}</td>
            </tr>
        `;
        }
        else if (i === 1) {
            globalScoreTableRow = `
            <tr class="globalScoreTableRow">
                <td class="globalPlace"><div class="medalContainer"><img class="medalImage" src="assets/images/silver-medal.png">${i + 1}</div></td>
                <td class="globalName">${displayedScoresArray[i].userName}</td>
                <td class="globalDate">${displayedScoresArray[i].date}</td>
                <td class="globalScore">${displayedScoresArray[i].score}</td>
            </tr>
        `;
        }
        else if (i === 2) {
            globalScoreTableRow = `
            <tr class="globalScoreTableRow">
                <td class="globalPlace"><div class="medalContainer"><img class="medalImage" src="assets/images/bronze-medal.png">${i + 1}</div></td>
                <td class="globalName">${displayedScoresArray[i].userName}</td>
                <td class="globalDate">${displayedScoresArray[i].date}</td>
                <td class="globalScore">${displayedScoresArray[i].score}</td>
            </tr>
        `;
        }
        else {

            globalScoreTableRow = `
            <tr class="globalScoreTableRow">
                <td class="globalPlace">${i + 1}</td>
                <td class="globalName">${displayedScoresArray[i].userName}</td>
                <td class="globalDate">${displayedScoresArray[i].date}</td>
                <td class="globalScore">${displayedScoresArray[i].score}</td>
            </tr>
        `;
        }

        $('#publicHighScoreTable').append(globalScoreTableRow);

    }
}