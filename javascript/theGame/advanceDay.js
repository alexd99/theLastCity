//sets all the variable to correct values for the beginning of a game
function onStart() {
    goldCount = 0;
    foodCount = 0;
    ammoCount = 25;
    metalCount = 10;
    oreCount = 0;
    coalCount = 0;
    wireCount = 10;
    woodCount = 10;
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
    $('.storeItems').hide();
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

    //next day
    attacked = false;

    gameWarningsInsert.html('');
    mainGameTextInsert.html('');

    dayCount += 1;
    $('#dayCount').html(dayCount);

    //zombieArmyNumberParam1 starts at 8 and zombieArmyNumberParam2 starts at 1
    if ((dayCount % 40) === 0) {
        zombieArmyNumberParam1 = zombieArmyNumberParam1 * 2;
        zombieArmyNumberParam2 = zombieArmyNumberParam2 * 2;
    }
    if ((dayCount % 100) === 0) {
        zombieArmyNumberParam1 = zombieArmyNumberParam1 * 6;
        zombieArmyNumberParam2 = zombieArmyNumberParam2 * 6;
    }
    if ((dayCount % 300) === 0) {
        zombieArmyNumberParam1 = zombieArmyNumberParam1 * 10;
        zombieArmyNumberParam2 = zombieArmyNumberParam2 * 10;
    }

    // checks if it should be winter or not
    if(dayCount % 275 === 0){
        winterTime = true;
        toastr["info"]("It is now winter, crops can no longer grow");
    }
    if(winterTime === true){
        daysOfWinter ++;
    }
    if(daysOfWinter === 90){
        winterTime = false;
        daysOfWinter = 0;
        toastr["info"]("Winter is over, crops can grow again");
    }

    // functions associated with next day
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
    preaching();

    // game over
    if(populationCount <= 0){
        gameOver('lost');
    }
}

// runs functions associated with losing the game.
function gameOver(winBy) {
    $('#gameOverModal').modal({backdrop: 'static', keyboard: false});
    $('.mainGameBtn').prop('disabled', true);
    $('.storeBtn').prop('disabled', true);
    $('#playAgain').show();
    generateScore(winBy);
    setAchievements(winBy);
}

// displays all messages for the next day, can display multiple messages.
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
