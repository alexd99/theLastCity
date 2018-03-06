// sets global variables for supplies
let goldCount;
let goldCountInsert = $('#goldCount');

let foodCount;
let foodCountInsert = $('#foodCount');

let ammoCount;
let ammoCountInsert = $('#ammoCount');

let metalCount;
let metalCountInsert = $('#metalCount');

let wireCount;
let wireCountInsert = $('#wireCount');

let oreCount;
let oreCountInsert = $('#oreCount');

let woodCount;
let woodCountInsert = $('#woodCount');

//set up global variables for population
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

let lumberjackCount;
let lumberJackCountInsert = $('.lumberjackCount');

// legendary item counts
let goldWireCount = 0;
let steelPlateCount = 0;
let qualityToolsCount = 0;

// building variables
let availableBuildingSpace = 10;
let usedBuildingSpace = 0;
let maxBuildingSpace = 2;
let populationCap = 20;
let foodCap = 20;
let totalShelters = 0;
let totalHouses = 0;
let totalSilos = 0;
let claimingLand = false;
let soldiersClaiming = 0;

// other global variables
let dayCount = 0;
let daysWithoutFood = 0;
let radioLevel = 0;
let wallLevel = 0;
let farmLevel = 0;
let score;
let clearMessage = false;
let zombieArmyNumberParam1 = 8;
let zombieArmyNumberParam2 = 1;
let peopleKilled = 0;
let totalPeopleKilled = 0;
let finalDate;
let attacked = false;

let gameWarningsInsert = $('#gameWarnings');
let mainGameTextInsert = $('#gameMainText');

//function that displays total supplies
function displayTotalSupplies() {
    goldCountInsert.html(goldCount);
    foodCountInsert.html(foodCount);
    ammoCountInsert.html(ammoCount);
    metalCountInsert.html(metalCount);
    wireCountInsert.html(wireCount);
    oreCountInsert.html(oreCount);
    woodCountInsert.html(woodCount);
}

//function that displays total population, and jobs
function displayTotalPopulation() {
    populationCountInsert.html(populationCount);
    idleCountInsert.html(idleCount);
    farmerCountInsert.html(farmerCount);
    soldierCountInsert.html(soldierCount);
    minerCountInsert.html(minerCount);
    lumberJackCountInsert.html(lumberjackCount);
}
