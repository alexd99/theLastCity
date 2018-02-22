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
        dayCount += 1;
        $('#dayCount').html(dayCount);

        foodCalculator();
        findGold();
        zombieAttackChance();

        displayTotalPopulation();
        displayTotalSupplies();
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
    if(foodCount < 0){
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
    let zombieAttackChance = Math.floor(Math.random() * 5) + 1;

    if(dayCount % 3){
        if (zombieAttackChance === 1){
           zombiesAttack();
        }
    }
}

function zombiesAttack() {
    let amountOfZombies = Math.floor(Math.random() * 10) + 1;
    let townDefense = soldierCount * 2;
    let zombieAttack = amountOfZombies;

    if(townDefense < zombieAttack){
        let loopRun = Math.floor((zombieAttack - townDefense) / 5);
        console.log('loop Run: ' + loopRun);

        for(let i = 1; i <= loopRun; i++){
            personDied();
            console.log('person died');
        }
    }

    console.log('zombie Attack: ' + zombieAttack );
    console.log('defense: ' + townDefense );
}