// generates final score
function generateScore(winBy) {

    // if you win the game you get an additional 1,000,000 points
    if(winBy !== 'lost'){
        score = (totalAmmoCount + (totalGoldCount * 5) + totalFoodCount + 1000000) - (totalPeopleKilled * 3);
    }
    else {
        score = (totalAmmoCount + (totalGoldCount * 5) + totalFoodCount) - (totalPeopleKilled * 3);
    }

    // checks what you one by and wets game over modal text
    if(winBy === 'fortifications'){
        $('.modalText').html(`Game won by fortification. Your score was ${score}`);
    }
    if(winBy === 'zombies'){
        $('.modalText').html(`Game won/lost by everyone turning into zombies. Your score was ${score}`);
    }
    if(winBy === 'cure'){
        $('.modalText').html(`Game won by finding the cure. Your score was ${score}`);
    }
    if(winBy === 'courage'){
        $('.modalText').html(`Game won by being a hero. Your score was ${score}`);
    }
    else if(winBy === 'lost') {
        $('.modalText').html(`Thank you for playing. Your score was ${score}`);
    }
}
// gets current date
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

//push score to data base
function pushScore() {
    let name = $('#userNameInput').val();

    setDate();

    if(name === ''){
        toastr["error"]("Please Include A Username");
    }
    else{
        let database = firebase.database();
        let databaseRef = database.ref('highScores');
        databaseRef.push({score: score, userName: name, date: finalDate});
        $('#gameOverModal').modal('hide');
        toastr["success"]("Score Added");
    }
}

// stores your score in local storage
function storeScore() {

    setDate();

    let cityName = $(document).find("title").text();

    let game = JSON.parse( localStorage.getItem('game')) || [];


    game.push({name: cityName, score: score, scoreDate: finalDate});

    localStorage.setItem('game', JSON.stringify(game));

    toastr["success"]("Score Added");
}

// push to the data base and local storage
function submitAsBoth() {

    let name = $('#userNameInput').val();

    setDate();

    if(name === ''){
        toastr["error"]("Please Include A Username");
    }
    else{
        let database = firebase.database();
        let databaseRef = database.ref('highScores');
        databaseRef.push({score: score, userName: name, date: finalDate});

        setDate();

        let cityName = $(document).find("title").text();

        let game = JSON.parse( localStorage.getItem('game')) || [];


        game.push({name: cityName, score: score, scoreDate: finalDate});

        localStorage.setItem('game', JSON.stringify(game));

        toastr["success"]("Score Added");

        $('#gameOverModal').modal('hide');
    }
}

// clears high scores in local storage
function clearHighScores() {
    let makeSure = window.confirm('Are You Sure You Want To Clear All High Scores? This Action Can Not Be Undone!');

    if (makeSure === true) {
        localStorage.removeItem('game');
        $('.localScoreTableRow').html('');
    }
}
