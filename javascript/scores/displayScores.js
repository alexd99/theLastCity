let localScoreTableRow;
let globalScoreTableRow;

let game;
let scoresArray = [];

let globalVariableCallCount = 0;

let localStartRef = 0;
let localEndRef = 10;

let globalStartRef = 0;
let globalEndRef = 10;

$( document ).ready(function() {
    displayGlobalHighScores(0,10);
    displayLocalHighScores(0,10);
});
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

    $('.localHighScoreTableRow').html('');

    for (let i = forLoopStarNumber; i < forLoopEndNumber; i++) {

         if(i === 0){
            localScoreTableRow = `
            <tr class="localScoreTableRow">
                <td class="localPlace"><div class="medalContainer"><img class="medalImage" src="assets/images/gold-medal.png">${i+1}</div></td>
                <td class="localName">${game[i].name}</td>
                <td class="localDate">${game[i].scoreDate}</td>
                <td class="localScore">${game[i].score}</td>
            </tr>
        `;
        }
        else if(i === 1){
            localScoreTableRow = `
            <tr class="localScoreTableRow">
                <td class="localPlace"><div class="medalContainer"><img class="medalImage" src="assets/images/silver-medal.png">${i+1}</div></td>
                <td class="localName">${game[i].name}</td>
                <td class="localDate">${game[i].scoreDate}</td>
                <td class="localScore">${game[i].score}</td>
            </tr>
        `;
        }
        else if(i === 2){
            localScoreTableRow = `
            <tr class="localScoreTableRow">
                <td class="localPlace"><div class="medalContainer"><img class="medalImage" src="assets/images/bronze-medal.png">${i+1}</div></td>
                <td class="localName">${game[i].name}</td>
                <td class="localDate">${game[i].scoreDate}</td>
                <td class="localScore">${game[i].score}</td>
            </tr>
        `;
        }
        else{
            localScoreTableRow = `
            <tr class="localScoreTableRow">
                <td class="localPlace">${i+1}</td>
                <td class="localName">${game[i].name}</td>
                <td class="localDate">${game[i].scoreDate}</td>
                <td class="localScore">${game[i].score}</td>
            </tr>
        `;
        }
        $('#localHighScoreTable').append(localScoreTableRow);

    }

    console.log(localScoreTableRow);
}

function displayGlobalHighScores(forLoopStarNumber, forLoopEndNumber) {

    if(globalVariableCallCount === 0) {

        globalVariableCallCount ++;

        $.get('https://thelastcity-ad.firebaseio.com/highScores/.json', function (data, status) {
            let scores = data;


            for (let scoresAndNames in scores) {
                scoresArray.push(scores[scoresAndNames]);
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

            globalScoresForLoop(forLoopStarNumber, forLoopEndNumber);

        });
    }
    else{
        globalScoresForLoop(forLoopStarNumber, forLoopEndNumber);
    }
}

function nextLocalScores() {
    if(localEndRef <= game.length){
        $('.localScoreTableRow').html('');
        localStartRef += 10;
        localEndRef += 10;
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
    $('.localScoreTableRow').html('');
    displayLocalHighScores(localStartRef, localEndRef);

}

function nextGlobalScores() {
    if(globalEndRef <= scoresArray.length){
        $('.globalScoreTableRow').html('');
        globalStartRef += 10;
        globalEndRef += 10;
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
    $('.globalScoreTableRow').html('');
    displayGlobalHighScores(globalStartRef, globalEndRef);

}

function globalScoresForLoop( forLoopStarNumber, forLoopEndNumber) {
    for (let i = forLoopStarNumber; i < forLoopEndNumber; i++) {

        if (i === 0) {
            globalScoreTableRow = `
            <tr class="globalScoreTableRow">
                <td class="globalPlace"><div class="medalContainer"><img class="medalImage" src="assets/images/gold-medal.png">${i + 1}</div></td>
                <td class="globalName">${scoresArray[i].userName}</td>
                <td class="globalDate">${scoresArray[i].date}</td>
                <td class="globalScore">${scoresArray[i].score}</td>
            </tr>
        `;
        }
        else if (i === 1) {
            globalScoreTableRow = `
            <tr class="globalScoreTableRow">
                <td class="globalPlace"><div class="medalContainer"><img class="medalImage" src="assets/images/silver-medal.png">${i + 1}</div></td>
                <td class="globalName">${scoresArray[i].userName}</td>
                <td class="globalDate">${scoresArray[i].date}</td>
                <td class="globalScore">${scoresArray[i].score}</td>
            </tr>
        `;
        }
        else if (i === 2) {
            globalScoreTableRow = `
            <tr class="globalScoreTableRow">
                <td class="globalPlace"><div class="medalContainer"><img class="medalImage" src="assets/images/bronze-medal.png">${i + 1}</div></td>
                <td class="globalName">${scoresArray[i].userName}</td>
                <td class="globalDate">${scoresArray[i].date}</td>
                <td class="globalScore">${scoresArray[i].score}</td>
            </tr>
        `;
        }
        else {

            globalScoreTableRow = `
            <tr class="globalScoreTableRow">
                <td class="globalPlace">${i + 1}</td>
                <td class="globalName">${scoresArray[i].userName}</td>
                <td class="globalDate">${scoresArray[i].date}</td>
                <td class="globalScore">${scoresArray[i].score}</td>
            </tr>
        `;
        }

        $('#publicHighScoreTable').append(globalScoreTableRow);

    }
}