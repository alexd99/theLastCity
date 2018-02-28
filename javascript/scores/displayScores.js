
let localScoreTableRow;
let publicScoreTableRow;
// displays high scores from local storage
function displayLocalHighScores() {

    let game = JSON.parse(localStorage.getItem('game')) || [];

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

    for (let i = 0; i < game.length; i++) {

        localScoreTableRow = `
            <tr class="localScoreTableRow">
                <td class="localPlace">${i+1}</td>
                <td class="localName">${game[i].name}</td>
                <td class="localDate">${game[i].scoreDate}</td>
                <td class="localScore">${game[i].score}</td>
            </tr>
        `;

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
        if(i === 1){
            localScoreTableRow = `
            <tr class="localScoreTableRow">
                <td class="localPlace"><div class="medalContainer"><img class="medalImage" src="assets/images/silver-medal.png">${i+1}</div></td>
                <td class="localName">${game[i].name}</td>
                <td class="localDate">${game[i].scoreDate}</td>
                <td class="localScore">${game[i].score}</td>
            </tr>
        `;
        }
        if(i === 2){
            localScoreTableRow = `
            <tr class="localScoreTableRow">
                <td class="localPlace"><div class="medalContainer"><img class="medalImage" src="assets/images/bronze-medal.png">${i+1}</div></td>
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

function displayPublicHighScores() {

    $.get('https://thelastcity-ad.firebaseio.com/highScores/.json', function (data, status) {
        let scores = data;
        let scoresArray = [];


        for (let scoresAndNames in scores) {
            scoresArray.push( scores[scoresAndNames]);
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

        console.log(scoresArray);

        for (let i = 0; i < scoresArray.length; i++) {

            localScoreTableRow = `
            <tr class="localScoreTableRow">
                <td class="localPlace">${i+1}</td>
                <td class="localName">${scoresArray[i].userName}</td>
                <td class="localDate">${scoresArray[i].date}</td>
                <td class="localScore">${scoresArray[i].score}</td>
            </tr>
        `;

            if(i === 0){
                localScoreTableRow = `
            <tr class="localScoreTableRow">
                <td class="localPlace"><div class="medalContainer"><img class="medalImage" src="assets/images/gold-medal.png">${i+1}</div></td>
                <td class="localName">${scoresArray[i].userName}</td>
                <td class="localDate">${scoresArray[i].date}</td>
                <td class="localScore">${scoresArray[i].score}</td>
            </tr>
        `;
            }
            if(i === 1){
                localScoreTableRow = `
            <tr class="localScoreTableRow">
                <td class="localPlace"><div class="medalContainer"><img class="medalImage" src="assets/images/silver-medal.png">${i+1}</div></td>
                <td class="localName">${scoresArray[i].userName}</td>
                <td class="localDate">${scoresArray[i].date}</td>
                <td class="localScore">${scoresArray[i].score}</td>
            </tr>
        `;
            }
            if(i === 2){
                localScoreTableRow = `
            <tr class="localScoreTableRow">
                <td class="localPlace"><div class="medalContainer"><img class="medalImage" src="assets/images/bronze-medal.png">${i+1}</div></td>
                <td class="localName">${scoresArray[i].userName}</td>
                <td class="localDate">${scoresArray[i].date}</td>
                <td class="localScore">${scoresArray[i].score}</td>
            </tr>
        `;
            }
            $('#publicHighScoreTable').append(localScoreTableRow);

        }

    });
}