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
let serumCount = 0;

// building variables
let availableBuildingSpace = 0;
let usedBuildingSpace = 4;
let maxBuildingSpace = 100;
let populationCap = 16;
let foodCap = 20;
let totalShelters = 0;
let totalHouses = 4;
let totalSilos = 0;
let totalFortifications = 0;
let totalResearchCenters = 0;
let daysWithResearchCenter = 0;
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
let daysPreached = 0;
let preachedModalOpened = false;
let winterTime = false;
let daysOfWinter = 0;
let searchingForCure = false;
let daysSearching = 0;
let cureModalShowed = false;

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
