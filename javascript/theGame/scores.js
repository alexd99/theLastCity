// generates final score
function generateScore() {
    score = ((dayCount * 2) + ammoCount + (goldCount * 5) + foodCount) - (totalPeopleKilled * 3);
    $('.modalText').html(`Thank you for playing. Your score was ${score}`);

    storeScore();
}
//push score to data base
function pushScore() {
    let name = $('#userNameInput').val();

    if(name === ''){
        toastr["error"]("Please Include A Username");
    }
    // else{
    //     let database = firebase.database();
    //     let databaseRef = database.ref('highScores');
    //     databaseRef.push({score: score, userName: name});
    //     toastr["success"]("Score Added");
    //     $('#gameOverModal').modal('hide');
    // }
    else{
        db.collection("scores").add({
            userName: name,
            score: score
        })
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
    }
}

// stores your score in local storage
function storeScore() {
    let cityName = $(document).find("title").text();

    let game = JSON.parse( localStorage.getItem('game')) || [];


    game.push({name: cityName, score: score});

    localStorage.setItem('game', JSON.stringify(game));
}

// displays high scores from local storage
function displayHighScores() {

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

    $('#highScoreBoard').html('');

    if(game.length < 10){
        for (let i = 0; i < game.length; i++) {
            let highScoreBoardText = `<h3 class="highScoreText">${game[i].name} ..... ${game[i].score}</h3><br>`;
            $('#highScoreBoard').append(highScoreBoardText);
        }
    }
    else {
        for (let i = 0; i < 10; i++) {
            let highScoreBoardText = `<h3 class="highScoreText">${game[i].name} ..... ${game[i].score}</h3><br>`;
            $('#highScoreBoard').append(highScoreBoardText);
        }
    }
}
// clears local storage
function clearHighScores() {
    let makeSure = window.confirm('Are You Sure You Want To Clear All High Scores? This Action Can Not Be Undone!');

    if (makeSure === true) {
        localStorage.clear();
        toastr["info"]("Scores Reset");
        $('#highScoreBoard').html('');
    }
}