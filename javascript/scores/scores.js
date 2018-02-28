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

function setDate() {
    let date  = new Date().getDate();
    let month = new Date().getMonth();
    let year = new Date().getFullYear();

    switch(month)
    {
        case 0:
            month="January";
            break;
        case 1:
            month="February";
            break;
        case 2:
            month="March";
            break;
        case 3:
            month="April";
            break;
        case 4:
            month="May";
            break;
        case 5:
            month="June";
            break;
        case 6:
            month="July";
            break;
        case 7:
            month="August";
            break;
        case 8:
            month="September";
            break;
        case 9:
            month="October";
            break;
        case 10:
            month="November";
            break;
        case 11:
            month="December";
            break;
    }

    finalDate = `${month}/${date}/${year}`;
}

// stores your score in local storage
function storeScore() {

    setDate();

    let cityName = $(document).find("title").text();

    let game = JSON.parse( localStorage.getItem('game')) || [];


    game.push({name: cityName, score: score, scoreDate: finalDate});

    localStorage.setItem('game', JSON.stringify(game));
}

// clears local storage
function clearHighScores() {
    let makeSure = window.confirm('Are You Sure You Want To Clear All High Scores? This Action Can Not Be Undone!');

    if (makeSure === true) {
        localStorage.clear();
        $('.localScoreTableRow').html('');
    }
}