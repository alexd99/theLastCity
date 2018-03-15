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
        else if (futureJob === 'lumberjack') {
            lumberjackCount += 1
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
        else if (futureJob === 'lumberjack') {
            lumberjackCount += 1
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
        else if (futureJob === 'lumberjack') {
            lumberjackCount += 1
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
        else if (futureJob === 'lumberjack') {
            lumberjackCount += 1
        }
        minerCount -= 1
    }
    if (currentJob === 'lumberjack' && lumberjackCount > 0) {
        if (futureJob === 'farmer') {
            farmerCount += 1
        }
        else if (futureJob === 'soldier') {
            soldierCount += 1
        }
        else if (futureJob === 'miner') {
            minerCount += 1
        }
        lumberjackCount -= 1
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
        else if (lumberjackCount > 0) {
          lumberjackCount -= 1;
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
    let personArrived = Math.floor(Math.random() * randomMax) + 1;

    if (personArrived === 1){
        if( populationCount < populationCap) {
            populationCount += 1;
            idleCount += 1;
            displayTotalPopulation();
            displayDayMessage(true, 'Person Arrived In Your Town');
        }
        else {
            displayDayMessage(true, 'Person Arrived In Your Town, But You Had No Room For Them');
        }
    }
}

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

    let tombstone = `<div class="tombstone" style=" margin-right: 20px; margin-left: 20px;"><img src="assets/images/tombstone.png" class="tombstone"> <p class="tombstoneText">Here Lies ${finalName}</p></div>`;

    $('.tombstoneContainer').append(tombstone);
}

function foodCalculator() {

    foodCount -= populationCount;

    if(foodCount < foodCap && winterTime === false) {

        switch (farmLevel) {
            case 0:
                foodCount += farmerCount * 4;
                break;
            case 1:
                foodCount += farmerCount * 5;
                break;
            case 2:
                foodCount += farmerCount * 6;
                break;
            case 3:
                foodCount += farmerCount * 7;
                break;
            case 4:
                foodCount += farmerCount * 8
        }

        if(foodCount > foodCap){
            foodCount = foodCap;
        }
    }

    if (foodCount <= 0) {
        daysWithoutFood++;
        foodCount = 0;
        gameWarningsInsert.html('You Ran Out Of Food');
    }
    if (foodCount > 0) {
        daysWithoutFood = 0;
    }
    if (daysWithoutFood % 2) {
        personDied(false);
    }
}

function gatherResources() {
    if(minerCount > 0) {
        goldCount += minerCount * Math.floor(Math.random() * 2) + 1;
        oreCount += minerCount * Math.floor(Math.random() * 10) + 1;
        coalCount += minerCount * Math.floor(Math.random() * 2) + 1;
    }
    if(lumberjackCount > 0) {
        woodCount += lumberjackCount * Math.floor(Math.random() * 6) + 5;
        lumberJackDeath();
        minerDeath()
    }
}

//calculates if a lumberjack dies
function lumberJackDeath() {
    let deathChance = Math.floor(Math.random() * 30) + 1;

    if (deathChance === 1){
        personDied(false);
        displayDayMessage(true, 'A lumberjack died')
    }
}

//calculates if a miner dies
function minerDeath() {
    let deathChance = Math.floor(Math.random() * 45) + 1;

    if (deathChance === 1){
        personDied(false);
        displayDayMessage(true, 'A miner died')
    }
}
