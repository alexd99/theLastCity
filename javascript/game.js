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

function onStart() {
    goldCount = 200;
    foodCount = 0;
    ammoCount = 25;
    populationCount = 11;
    idleCount =  populationCount;
    farmerCount = 0;
    soldierCount = 0;
    minerCount = 0;

    displayTotalSupplies();
    displayTotalPopulation();
}

function jobChanger( currentJob, futureJob ) {
    if(currentJob === 'idle' && idleCount > 0){
        if(futureJob === 'farmer'){
            farmerCount += 1
        }
        else if(futureJob === 'soldier'){
            soldierCount += 1
        }
        else if(futureJob === 'miner'){
            minerCount += 1
        }
        idleCount -= 1
    }
    if(currentJob === 'farmer' && farmerCount > 0){
        if(futureJob === 'soldier'){
            soldierCount += 1
        }
        else if(futureJob === 'miner'){
            minerCount += 1
        }
        farmerCount -= 1
    }
    if(currentJob === 'soldier' && soldierCount > 0){
        if(futureJob === 'farmer'){
            farmerCount += 1
        }
        else if(futureJob === 'miner'){
            minerCount += 1
        }
        soldierCount -= 1
    }
    if(currentJob === 'miner' && minerCount > 0){
        if(futureJob === 'farmer'){
            farmerCount += 1
        }
        else if(futureJob === 'soldier'){
            soldierCount += 1
        }
        minerCount -= 1
    }

    displayTotalPopulation();
}

function personDied() {
    if(populationCount > 0) {
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
        displayTotalPopulation();
    }
}

function advanceDay() {
    if (populationCount <= 0){
        //game over
        $('#gameOverModal').modal('show');
        $('.mainGameBtn').prop('disabled', true);
        $('.storeBtn').prop('disabled', true);
    }
    else{
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

        if((dayCount % 20)===0){
            zombieArmyNumberParam1 = zombieArmyNumberParam1 * 2;
            zombieArmyNumberParam2 = zombieArmyNumberParam2 * 2;
        }
        if((dayCount % 100)===0){
            zombieArmyNumberParam1 = zombieArmyNumberParam1 * 4;
            zombieArmyNumberParam2 = zombieArmyNumberParam2 * 4;
        }
        if((dayCount % 500)===0){
            zombieArmyNumberParam1 = zombieArmyNumberParam1 * 8;
            zombieArmyNumberParam2 = zombieArmyNumberParam2 * 8;
        }
    }
}

function foodCalculator() {
    foodCount += farmerCount * 4;
    foodCount -= populationCount;

    if(foodCount <= 0){
        daysWithoutFood ++;
        foodCount = 0;
        gameWarningsInsert.html('You Ran Out Of Food')
    }
    if(foodCount > 0){
        daysWithoutFood = 0;
    }
    if(daysWithoutFood % 2 ){
        personDied();
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

    if(dayCount % 4){
        if (zombieAttackChance === 1){
           zombiesAttack();
        }
    }
}

let zombieArmyNumberParam1 = 8;
let zombieArmyNumberParam2 = 1;

let peopleKilled = 10;

function zombiesAttack() {

    let amountOfZombies = Math.floor(Math.random() * zombieArmyNumberParam1) + zombieArmyNumberParam2;
    let townDefense = soldierCount * 2;
    let zombieAttack = amountOfZombies;

    if(townDefense < zombieAttack){
        let loopRun = Math.floor((zombieAttack - townDefense) / 5);
        console.log('loop Run: ' + loopRun);

        for(let i = 1; i <= loopRun; i++){
            personDied();
            peopleKilled++;
            makeTombstone()
        }
    }

    let zombieAttackMessage = `You Were Attacked! Amount of zombies: ${amountOfZombies},  People killed: ${peopleKilled}`;
    mainGameTextInsert.html(zombieAttackMessage);
}

function makeTombstone(){
    let soldierFirstNamesList = [
        'Aaliyah', 'Abigail', 'Addison', 'Aiden', 'Alex', 'Alexa', 'Allison', 'Amelia', 'Andrew', 'Anna', 'Anthony', 'Aria', 'Ariana', 'Aubrey', 'Audrey', 'Ava', 'Avery', 'Benjamin', 'Brooklyn', 'Caleb', 'Camila', 'Carter', 'Charles', 'Charlotte', 'Chloe', 'Christian', 'Christopher', 'Claire', 'Colton', 'Daniel', 'David', 'Dylan', 'Elijah', 'Elizabeth', 'Ella', 'Ellie', 'Emily', 'Emma', 'Ethan', 'Evelyn', 'Gabriel', 'Grace', 'Grayson', 'Hannah', 'Harper', 'Henry', 'Hunter', 'Isaac', 'Isabella', 'Isaiah', 'Jack', 'Jackson', 'Jacob', 'James', 'Jayden', 'John', 'Jonathan', 'Joseph', 'Joshua', 'Julian', 'Landon', 'Layla', 'Leah', 'Levi', 'Liam', 'Lillian', 'Lily', 'Logan', 'Lucas', 'Luke', 'Madison', 'Mason', 'Matthew', 'Mia', 'Michael', 'Natalie', 'Nathan', 'Noah', 'Nora', 'Oliver', 'Olivia', 'Owen', 'Paisley', 'Penelope', 'Riley', 'Ryan', 'Samantha', 'Samuel', 'Savannah', 'Scarlett', 'Sebastian', 'Skylar', 'Sofia', 'Sophia', 'Victoria', 'Violet', 'William', 'Wyatt', 'Zoe', 'Zoey'
    ];
    let soldierLastNamesList = [
        'Adams', 'Alexander', 'Allen', 'Anderson', 'Bailey', 'Baker', 'Barnes', 'Bell', 'Bennett', 'Brooks', 'Brown', 'Bryant', 'Butler', 'Campbell', 'Carter', 'Clark', 'Coleman', 'Collins', 'Cook', 'Cooper', 'Cox', 'Dahl', 'Diaz', 'Edwards', 'Evans', 'Flores', 'Foster', 'Garcia', 'Gonzales', 'Gonzalez', 'Gray', 'Green', 'Griffin', 'Hall', 'Harris', 'Hayes',
        'Henderson', 'Hernandez', 'Hill', 'Howard', 'Hughes', 'Jackson', 'James', 'Jenkins', 'Johnson', 'Jones', 'Kelly', 'King', 'Lee', 'Lewis', 'Long', 'Lopez', 'Martin', 'Martinez', 'Miller', 'Mitchell', 'Moore', 'Morgan', 'Morris', 'Murphy', 'Nelson', 'Parker', 'Patterson', 'Perez', 'Perry', 'Peterson', 'Phillips', 'Powell', 'Price', 'Ramirez', 'Reed', 'Richardson', 'Rivera', 'Roberts', 'Robinson', 'Rodriguez', 'Rogers', 'Ross', 'Russell', 'Sanchez', 'Sanders', 'Scott', 'Simmons', 'Smith', 'Stewart', 'Taylor', 'Thomas', 'Thompson', 'Torres', 'Turner', 'Walker', 'Ward', 'Washington', 'Watson', 'White', 'Williams', 'Wilson', 'Wood', 'Wright', 'Young'
    ];

    let soldierFirstName = Math.floor(Math.random() * soldierFirstNamesList.length);
    let selectedFirstName = soldierFirstNamesList[soldierFirstName];
    let soldierLastName = Math.floor(Math.random() * soldierLastNamesList.length);
    let selectedLastName = soldierLastNamesList[soldierLastName];

    let finalName = (selectedFirstName + ' ' + selectedLastName);

    let tombstone = `<div class="tombstone" style=" margin-right: 20px; margin-left: 20px;"><img src="images/tombstone.png" class="tombstone"> <p class="tombstoneText">Here Lies ${finalName}</p></div>`;

    // //<div class="tombstone">
    // <img src="images/tombstone.png" class="tombstone"> <p class="tombstoneText">Here Lies '+finalName+'</p>
    // </div>


    $('.tombstoneContainer').append(tombstone);
}




