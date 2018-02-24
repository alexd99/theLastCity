// sets global variables for supplies
let goldCount;
let goldCountInsert = $('#goldCount');

let foodCount;
let foodCountInsert = $('#foodCount');

let ammoCount;
let ammoCountInsert = $('#ammoCount');

let metalCount;
let metalCountInsert = $('#metalCount');

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

//function that displays total supplies
function displayTotalSupplies() {
    goldCountInsert.html(goldCount);
    foodCountInsert.html(foodCount);
    ammoCountInsert.html(ammoCount);
    metalCountInsert.html(metalCount);
}

//function that displays total population, and jobs
function displayTotalPopulation() {
    populationCountInsert.html(populationCount);
    idleCountInsert.html(idleCount);
    farmerCountInsert.html(farmerCount);
    soldierCountInsert.html(soldierCount);
    minerCountInsert.html(minerCount);
}

// other global variables
let dayCount = 0;
let daysWithoutFood = 0;

let gameWarningsInsert = $('#gameWarnings');
let mainGameTextInsert = $('#gameMainText');

// sets up the toaster settings
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

//function for start or restart
function onStart() {
    goldCount = 200;
    foodCount = 0;
    ammoCount = 25;
    metalCount = 1000000;
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

// changes villagers current job status
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

// confirms if user wants to send villager away
function confirmSendAway() {

    let makeSure = confirm("Are You Sure You Want To Send A Person Away?");
    if (makeSure === true) {
        personDied(true)
    } else {
    }
}

// advances the day and runs all function associated with day advancement. Also checks if the game is over
function advanceDay() {
    if (populationCount <= 0) {
        //game over
        $('#gameOverModal').modal('show');
        $('.mainGameBtn').prop('disabled', true);
        $('.storeBtn').prop('disabled', true);
        $('#playAgain').show();
        generateScore();
        displayHighScores();
    }
    else {
        //next day
        gameWarningsInsert.html('');
        mainGameTextInsert.html('');

        dayCount += 1;
        $('#dayCount').html(dayCount);

        foodCalculator();
        findGold();
        zombieAttackChance();
        displayStore();
        personArrival();
        displayDayMessage(false, false);

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
let clearMessage = false;

function displayDayMessage(somethingHappened, message) {
    if(somethingHappened === true){
        if(clearMessage === true){
            mainGameTextInsert.html('');
            clearMessage = false
        }
        mainGameTextInsert.append(message + '. ');
    }
    else{
        mainGameTextInsert.html('Nothing Happened Today');
        clearMessage = true;
    }
}

//caluctlates how much food is made and ate
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

function personArrival() {
    let randomMax;
    switch (radioLevel) {
        case 0:
            randomMax = 20;
            break;
        case 1:
            randomMax = 17;
            break;
        case 2:
            randomMax = 15;
            break;
        case 3:
            randomMax = 12;
            break;
        case 4:
            randomMax = 9;
            break;
        case 5:
            randomMax = 6;
            break;
    }
    let personArrived = 1;//Math.floor(Math.random() * randomMax) + 1;

    if (personArrived === 1){
        populationCount += 1;
        idleCount+= 1;
        displayTotalPopulation();
        displayDayMessage(true, 'Person Arrived In Your Town');
    }
}

// calculates if zombies are going to attack
function zombieAttackChance() {
    let zombieAttackChance = Math.floor(Math.random() * 3) + 1;

    if (dayCount % 4) {
        if (zombieAttackChance === 1) {
            zombiesAttack();
        }
    }
}

let zombieArmyNumberParam1 = 8;
let zombieArmyNumberParam2 = 1;

let totalPeopleKilled = 10;

// calculates how much defense your town has and how much attack the zombies have.
function zombiesAttack() {

    let amountOfZombies = Math.floor(Math.random() * zombieArmyNumberParam1) + zombieArmyNumberParam2;
    let townDefense;
    let zombieAttack = amountOfZombies;

    let peopleKilled = 0;

    if(soldierCount <= 0){
        townDefense = 0;
    }
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
        let loopRun;
        if(townDefense === 0){
            loopRun = zombieAttack;
        }
        else{
            loopRun = Math.floor((zombieAttack - townDefense) / 5);
        }
        for (let i = 1; i <= loopRun; i++) {
            personDied(false);
            peopleKilled++;
        }
    }

    let zombieAttackMessage = `You Were Attacked! Amount of zombies: ${amountOfZombies},  People killed: ${peopleKilled}`;
    displayDayMessage(true, zombieAttackMessage);
}

// displays a villagers tombstone
function makeTombstone() {
    let soldierFirstNamesList = [
        'Aaliyah', 'Abigail', 'Addison', 'Aiden', 'Alex', 'Alexa', 'Allison', 'Amelia', 'Andrew', 'Anna', 'Anthony', 'Aria', 'Ariana', 'Aubrey', 'Audrey', 'Ava', 'Avery', 'Benjamin', 'Brooklyn', 'Caleb', 'Camila', 'Carter', 'Charles', 'Charlotte', 'Chloe', 'Christian', 'Christopher', 'Claire', 'Colton', 'Daniel', 'David', 'Dylan', 'Elijah', 'Elizabeth', 'Ella', 'Ellie', 'Emily', 'Emma', 'Ethan', 'Evelyn', 'Gabriel', 'Grace', 'Grayson', 'Hannah', 'Harper', 'Henry', 'Hunter', 'Isaac', 'Isabella', 'Isaiah', 'Jack', 'Jackson', 'Jacob', 'James', 'Jayden', 'JJ', 'John', 'Joseph', 'Joshua', 'Julian', 'Landon', 'Layla', 'Leah', 'Levi', 'Liam', 'Lillian', 'Lily', 'Logan', 'Lucas', 'Luke', 'Mario', 'Mason', 'Matthew', 'Mia', 'Michael', 'Natalie', 'Nathan', 'Noah', 'Nora', 'Oliver', 'Olivia', 'Owen', 'Paisley', 'Penelope', 'Riley', 'Ryan', 'Sammie', 'Samuel', 'Savannah', 'Scarlett', 'Sebastian', 'Skylar', 'Sofia', 'Sophia', 'Victoria', 'Violet', 'William', 'Wyatt', 'Zoe', 'Zoey'
    ];
    let soldierLastNamesList = [
        'Adams', 'Alexander', 'Allen', 'Anderson', 'Bailey', 'Baker', 'Barnes', 'Bell', 'Bennett', 'Brooks', 'Brown', 'Bryant', 'Butler', 'Campbell', 'Carlson', 'Clark', 'Coleman', 'Collins', 'Cook', 'Cooper', 'Cox', 'Dahl', 'Diaz', 'Edwards', 'Evans', 'Flores', 'Foster', 'Garcia', 'Gonzales', 'Gonzalez', 'Gray', 'Green', 'Griffin', 'Hall', 'Harris', 'Hayes', 'Henderson', 'Hernandez', 'Hill', 'Howard', 'Hughes', 'Jackson', 'James', 'Jenkins', 'Johnson', 'Jones', 'Kelly', 'King', 'Lee', 'Lewis', 'Long', 'Lopez', 'Martin', 'Martinez', 'Miller', 'Mitchell', 'Moore', 'Morgan', 'Morris', 'Murphy', 'Nelson', 'Parker', 'Patterson', 'Perez', 'Perry', 'Peterson', 'Phillips', 'Powell', 'Price', 'Ramirez', 'Reed', 'Richardson', 'Rivera', 'Roberts', 'Robinson', 'Rodriguez', 'Rogers', 'Ross', 'Russell', 'Sanchez', 'Sanders', 'Scott', 'Simmons', 'Smith', 'Stewart', 'Taylor', 'Thomas', 'Thompson', 'Torres', 'Turner', 'Walker', 'Ward', 'Washington', 'Watson', 'White', 'Williams', 'Wilson', 'Wood', 'Wright', 'Young'
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
// closes on screen game over modal
function closeModal() {
    $('#gameOverModal').modal('hide')
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

    for (let i = 0; i < game.length; i++) {
        let highScoreBoardText = `<h3 class="highScoreText">${game[i].name} ..... ${game[i].score}</h3><br>`;
        $('#highScoreBoard').append(highScoreBoardText);
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

// purchases items.
function theStore(quantity, name, step, price) {
    quantity = Number($('#'+quantity).val());

    let totalPrice = quantity / price;

    if (quantity % step === 0){
        if(goldCount < price){
            toastr['error']('You Do Not Have Enough Gold');
        }
        else {
            toastr['success'](`You Successfully Bought ${quantity} ${name} For ${totalPrice} Gold`);
            if (name === 'Ammo'){
                ammoCount += quantity;
            }
            if (name === 'Food'){
                foodCount += quantity;
            }
            else {
                return false;
            }
            goldCount -= totalPrice;
        }
    }
    else{
        toastr['error'](`Must Be Bought In Sets Of ${step}`);
    }
    displayTotalSupplies();
}

// function for opening and choosing the store.
function displayStore() {
    let storeTitle = $('#storeTitle');

    let generalStore = $('#generalStore');
    generalStore.hide();

    let open = 1;//Math.floor((Math.random() * 2) + 1);

    if(open === 1) {
        let openedStore = Math.floor((Math.random() * 2) + 1);

        console.log(openedStore);

        switch (openedStore) {
            case 1:
                generalStore.show();
                storeTitle.html('GENERAL STORE');
                break;
        }
    }
}

let radioLevel = 0;
// handles research and upgrades
function upgradeRadio() {

    let radioUpgradeText = $('#upgradeRadioText');

    if(radioLevel === 0 && metalCount >= 200){
        radioLevel ++;
        metalCount -= 200;
        radioUpgradeText.html('Upgrade Radio: 400 metal')
    }
    else if(radioLevel === 1 && metalCount >= 400){
        radioLevel ++;
        metalCount -= 400;
        radioUpgradeText.html('Upgrade Radio: 600 metal')
    }
    else if(radioLevel === 2 && metalCount >= 600){
        radioLevel ++;
        metalCount -= 600;
        radioUpgradeText.html('Upgrade Radio: 1000 metal')
    }
    else if(radioLevel === 3 && metalCount >= 1000){
        radioLevel ++;
        metalCount -= 1000;
        radioUpgradeText.html('Upgrade Finished?')
    }

    displayTotalSupplies();
    $('#radioName').html(`Radio Level: ${radioLevel}`);
}
