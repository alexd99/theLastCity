let goldCount;
let goldCountInsert = $('#goldCount');

let foodCount;
let foodCountInsert = $('#foodCount');

let ammoCount;
let ammoCountInsert = $('#ammoCount');

let populationCount;
let populationCountInsert = $('.populationCount');

let idleCount;
let idleCountInsert = $('.idleCount');

let farmerCount;
let farmerCountInsert = $('.farmerCount');

let soldierCount;
let soldierCountInsert = $('.soldierCount');

let minerCount;
let minerCountInsert = $('.minerCount');

function displayTotalSupplies() {
    goldCountInsert.html(goldCount);
    foodCountInsert.html(foodCount);
    ammoCountInsert.html(ammoCount);
}

function displayTotalPopulation() {
    populationCountInsert.html(populationCount);
    idleCountInsert.html(idleCount);
    farmerCountInsert.html(farmerCount);
    soldierCountInsert.html(soldierCount);
    minerCountInsert.html(minerCount);
}

let dayCount = 0;
let daysWithoutFood = 0;

let gameWarningsInsert = $('#gameWarnings');
let mainGameTextInsert = $('#gameMainText');

toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "1000",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};

function onStart() {
    goldCount = 200;
    foodCount = 0;
    ammoCount = 25;
    populationCount = 11;
    idleCount = populationCount;
    farmerCount = 0;
    soldierCount = 0;
    minerCount = 0;

    $('.mainGameBtn').prop('disabled', false);
    $('.storeBtn').prop('disabled', false);
    $('#playAgain').hide();
    $('.tombstoneContainer').html('');

    displayTotalSupplies();
    displayTotalPopulation();
    displayHighScores();
}


function jobChanger(currentJob, futureJob) {
    if (currentJob === 'idle' && idleCount > 0) {
        if (futureJob === 'farmer') {
            farmerCount += 1
        }
        else if (futureJob === 'soldier') {
            soldierCount += 1
        }
        else if (futureJob === 'miner') {
            minerCount += 1
        }
        idleCount -= 1
    }
    if (currentJob === 'farmer' && farmerCount > 0) {
        if (futureJob === 'soldier') {
            soldierCount += 1
        }
        else if (futureJob === 'miner') {
            minerCount += 1
        }
        farmerCount -= 1
    }
    if (currentJob === 'soldier' && soldierCount > 0) {
        if (futureJob === 'farmer') {
            farmerCount += 1
        }
        else if (futureJob === 'miner') {
            minerCount += 1
        }
        soldierCount -= 1
    }
    if (currentJob === 'miner' && minerCount > 0) {
        if (futureJob === 'farmer') {
            farmerCount += 1
        }
        else if (futureJob === 'soldier') {
            soldierCount += 1
        }
        minerCount -= 1
    }

    displayTotalPopulation();
}

function personDied(sentAway) {
    if (populationCount > 0) {
        if (idleCount > 0) {
            idleCount -= 1
        }
        else if (farmerCount > 0) {
            farmerCount -= 1
        }
        else if (soldierCount > 0) {
            soldierCount -= 1
        }
        else if (minerCount > 0) {
            minerCount -= 1
        }
        populationCount -= 1;
    }

    if (sentAway === false) {
        makeTombstone();
    }
    displayTotalPopulation();
}

function turnAllToIdle() {
    idleCount = populationCount;
    farmerCount = 0;
    soldierCount = 0;
    minerCount = 0;
    displayTotalPopulation();
}

function confirmSendAway() {

    let makeSure = confirm("Are You Sure You Want To Send A Person Away?");
    if (makeSure === true) {
        personDied(true)
    } else {
    }

    // if(confirm === true){
    //     personDied(true);
    // }
}

function advanceDay() {
    if (populationCount <= 0) {
        //game over
        $('#gameOverModal').modal('show');
        $('.mainGameBtn').prop('disabled', true);
        $('.storeBtn').prop('disabled', true);
        generateScore();
        $('#playAgain').show();
    }
    else {
        //next day
        mainGameTextInsert.html('Nothing Happened Today');
        gameWarningsInsert.html('');

        dayCount += 1;
        $('#dayCount').html(dayCount);

        foodCalculator();
        findGold();
        zombieAttackChance();

        displayTotalPopulation();
        displayTotalSupplies();

        if ((dayCount % 20) === 0) {
            zombieArmyNumberParam1 = zombieArmyNumberParam1 * 2;
            zombieArmyNumberParam2 = zombieArmyNumberParam2 * 2;
        }
        if ((dayCount % 100) === 0) {
            zombieArmyNumberParam1 = zombieArmyNumberParam1 * 4;
            zombieArmyNumberParam2 = zombieArmyNumberParam2 * 4;
        }
        if ((dayCount % 500) === 0) {
            zombieArmyNumberParam1 = zombieArmyNumberParam1 * 8;
            zombieArmyNumberParam2 = zombieArmyNumberParam2 * 8;
        }
    }
}

function foodCalculator() {
    foodCount += farmerCount * 4;
    foodCount -= populationCount;

    if (foodCount <= 0) {
        daysWithoutFood++;
        foodCount = 0;
        gameWarningsInsert.html('You Ran Out Of Food')
    }
    if (foodCount > 0) {
        daysWithoutFood = 0;
    }
    if (daysWithoutFood % 2) {
        personDied(false);
    }
}

function findGold() {
    goldCount += minerCount * Math.floor(Math.random() * 5) + 1;
}

function closeModal() {
    $('#gameOverModal').modal('hide')
}

function zombieAttackChance() {
    let zombieAttackChance = Math.floor(Math.random() * 3) + 1;

    console.log(zombieAttackChance);

    if (dayCount % 4) {
        if (zombieAttackChance === 1) {
            zombiesAttack();
        }
    }
}

let zombieArmyNumberParam1 = 8;
let zombieArmyNumberParam2 = 1;

let totalPeopleKilled = 10;

function zombiesAttack() {

    let amountOfZombies = Math.floor(Math.random() * zombieArmyNumberParam1) + zombieArmyNumberParam2;
    let townDefense;
    let zombieAttack = amountOfZombies;

    let peopleKilled = 0;

    if (ammoCount <= 0) {
        ammoCount = 0;
        townDefense = soldierCount;
    }
    else if (ammoCount < amountOfZombies && ammoCount > 0) {
        townDefense = (Math.floor(ammoCount * .75) + soldierCount);
        ammoCount = 0;
    }
    else {
        townDefense = soldierCount * 1.75;
        ammoCount -= amountOfZombies;
    }

    if (townDefense < zombieAttack) {
        let loopRun = Math.floor((zombieAttack - townDefense) / 5);

        for (let i = 1; i <= loopRun; i++) {
            personDied(false);
            peopleKilled++;
        }
    }

    let zombieAttackMessage = `You Were Attacked! Amount of zombies: ${amountOfZombies},  People killed: ${peopleKilled}`;
    mainGameTextInsert.html(zombieAttackMessage);
}

function makeTombstone() {
    let soldierFirstNamesList = [
        'Aaliyah', 'Abigail', 'Addison', 'Aiden', 'Alex', 'Alexa', 'Allison', 'Amelia', 'Andrew', 'Anna', 'Anthony', 'Aria', 'Ariana', 'Aubrey', 'Audrey', 'Ava', 'Avery', 'Benjamin', 'Brooklyn', 'Caleb', 'Camila', 'Carter', 'Charles', 'Charlotte', 'Chloe', 'Christian', 'Christopher', 'Claire', 'Colton', 'Daniel', 'David', 'Dylan', 'Elijah', 'Elizabeth', 'Ella', 'Ellie', 'Emily', 'Emma', 'Ethan', 'Evelyn', 'Gabriel', 'Grace', 'Grayson', 'Hannah', 'Harper', 'Henry', 'Hunter', 'Isaac', 'Isabella', 'Isaiah', 'Jack', 'Jackson', 'Jacob', 'James', 'Jayden', 'John', 'Jonathan', 'Joseph', 'Joshua', 'Julian', 'Landon', 'Layla', 'Leah', 'Levi', 'Liam', 'Lillian', 'Lily', 'Logan', 'Lucas', 'Luke', 'Madison', 'Mason', 'Matthew', 'Mia', 'Michael', 'Natalie', 'Nathan', 'Noah', 'Nora', 'Oliver', 'Olivia', 'Owen', 'Paisley', 'Penelope', 'Riley', 'Ryan', 'Samantha', 'Samuel', 'Savannah', 'Scarlett', 'Sebastian', 'Skylar', 'Sofia', 'Sophia', 'Victoria', 'Violet', 'William', 'Wyatt', 'Zoe', 'Zoey'
    ];
    let soldierLastNamesList = [
        'Adams', 'Alexander', 'Allen', 'Anderson', 'Bailey', 'Baker', 'Barnes', 'Bell', 'Bennett', 'Brooks', 'Brown', 'Bryant', 'Butler', 'Campbell', 'Carter', 'Clark', 'Coleman', 'Collins', 'Cook', 'Cooper', 'Cox', 'Dahl', 'Diaz', 'Edwards', 'Evans', 'Flores', 'Foster', 'Garcia', 'Gonzales', 'Gonzalez', 'Gray', 'Green', 'Griffin', 'Hall', 'Harris', 'Hayes', 'Henderson', 'Hernandez', 'Hill', 'Howard', 'Hughes', 'Jackson', 'James', 'Jenkins', 'Johnson', 'Jones', 'Kelly', 'King', 'Lee', 'Lewis', 'Long', 'Lopez', 'Martin', 'Martinez', 'Miller', 'Mitchell', 'Moore', 'Morgan', 'Morris', 'Murphy', 'Nelson', 'Parker', 'Patterson', 'Perez', 'Perry', 'Peterson', 'Phillips', 'Powell', 'Price', 'Ramirez', 'Reed', 'Richardson', 'Rivera', 'Roberts', 'Robinson', 'Rodriguez', 'Rogers', 'Ross', 'Russell', 'Sanchez', 'Sanders', 'Scott', 'Simmons', 'Smith', 'Stewart', 'Taylor', 'Thomas', 'Thompson', 'Torres', 'Turner', 'Walker', 'Ward', 'Washington', 'Watson', 'White', 'Williams', 'Wilson', 'Wood', 'Wright', 'Young'
    ];

    let soldierFirstName = Math.floor(Math.random() * soldierFirstNamesList.length);
    let selectedFirstName = soldierFirstNamesList[soldierFirstName];
    let soldierLastName = Math.floor(Math.random() * soldierLastNamesList.length);
    let selectedLastName = soldierLastNamesList[soldierLastName];

    let finalName = (selectedFirstName + ' ' + selectedLastName);

    let tombstone = `<div class="tombstone" style=" margin-right: 20px; margin-left: 20px;"><img src="images/tombstone.png" class="tombstone"> <p class="tombstoneText">Here Lies ${finalName}</p></div>`;

    $('.tombstoneContainer').append(tombstone);
}

let score;

function generateScore() {
    score = ((dayCount * 2) + ammoCount + (goldCount * 5) + foodCount) - (totalPeopleKilled * 3);
    $('.modalText').html(`Thank you for playing. Your score was ${score}`);

    storeScore();
}

function storeScore() {
    let cityName = $(document).find("title").text();

    let game = JSON.parse( localStorage.getItem('game')) || [];


    game.push({name: cityName, score: score});

    localStorage.setItem('game', JSON.stringify(game));
}

function displayHighScores() {

    let game = JSON.parse(localStorage.getItem('game')) || [];

    game.sort((a, b) => {
        if (a.score > b.score) {
            return 1;
        }
        else if (a.score < b.score) {
            return -1
        }
        else {
            return 0
        }
    });

    console.log(game[1]);

    for (let i = 0; i < game.length; i++)
    $('#highScoreBoard').append(game[i].name + ' ' + game[i].score + '<br>');
}

function clearHighScores() {
    let makeSure = window.confirm('Are You Sure You Want To Clear All High Scores? This Action Can Not Be Undone!');

    if (makeSure === true) {
        localStorage.clear();
        toastr["info"]("Scores Reset")
    }
}

// the store

function buyAmmo(){
    //1 gold for 5 ammo
    let ammoQuantity = Number($('.ammoQuantity').val());
    let ammoPrice = ammoQuantity / 5;

    console.log(ammoQuantity);
    if (ammoQuantity % 5 !== 0){
        toastr['error']('Must Be Bought In Sets Of 5');
    }
    if(goldCount < ammoPrice){
        toastr['error']('You Do Not Have Enough Gold');
    }
    else {
        toastr['success'](`You Successfully Bought ${ammoQuantity} Ammo For ${ammoPrice} Gold`);
        ammoCount += ammoQuantity;
    }
    displayTotalSupplies();
}
function buyFood() {

}




