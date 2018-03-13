//function for start or restart
function onStart() {
    goldCount = 200;
    foodCount = 0;
    ammoCount = 25;
    metalCount = 1000000;
    oreCount = 8;
    wireCount = 1000000;
    woodCount = 1000000;
    populationCount = 11;
    idleCount = populationCount;
    farmerCount = 0;
    soldierCount = 0;
    minerCount = 0;
    lumberjackCount = 0;

    preachedModalOpened = false;

    dayCount = 0;
    $('#dayCount').html(dayCount);

    $('.mainGameBtn').prop('disabled', false);
    $('.storeBtn').prop('disabled', false);
    $('#playAgain').hide();
    $('#theCureContainer').hide();
    $('.tombstoneContainer').html('');

    displayBuildingFacts();
    displayTotalSupplies();
    displayTotalPopulation();
    researchCenters();
}

// advances the day and runs all function associated with day advancement. Also checks if the game is over
function advanceDay() {

    attacked = false;

    //next day
    gameWarningsInsert.html('');
    mainGameTextInsert.html('');

    dayCount += 1;
    $('#dayCount').html(dayCount);

    displayDayMessage(false, false);
    foodCalculator();
    gatherResources();
    zombieAttackChance();
    displayStore();
    personArrival();
    specialEvents();
    setAchievements();
    researchCenters();
    claimLand(true);
    displayTotalPopulation();
    displayTotalSupplies();
    displayBuildingFacts();
    searchingForTheCure();
    win();

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


    if(dayCount % 270 === 0){
        winterTime = true;
    }
    if(winterTime === true){
        daysOfWinter ++;
    }
    if(daysOfWinter === 90){
        winterTime = false;
        daysOfWinter = 0;
    }

    // game over
    if(populationCount <= 0){
       gameOver('lost');
    }

    preaching();
}

function gameOver(winBy) {
    $('#gameOverModal').modal({backdrop: 'static', keyboard: false});
    $('.mainGameBtn').prop('disabled', true);
    $('.storeBtn').prop('disabled', true);
    $('#playAgain').show();
    generateScore(winBy);
    setAchievements(winBy);
}

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
