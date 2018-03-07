function buildBuilding(type) {

    availableBuildingSpace = maxBuildingSpace - usedBuildingSpace;

    if(type === 'house' && woodCount >= 200 && availableBuildingSpace >= 1){
        totalHouses ++;
        usedBuildingSpace ++;
        woodCount -= 200;
        populationCap += 4;

    }
    if(type === 'shelter' && woodCount >= 100 && availableBuildingSpace >= 1){
        totalShelters++;
        usedBuildingSpace ++;
        woodCount -= 100;
        populationCap += 2;


    }
    if(type === 'silo' && woodCount >= 1000 && metalCount > 500 && availableBuildingSpace >= 4){
        totalSilos++;
        usedBuildingSpace += 4;
        woodCount -= 1000;
        metalCount -= 500;
        foodCap += 100;
    }
    if(type === 'fortification' && metalCount >= 1500 &&  availableBuildingSpace >= 4){
        totalFortifications++;
        usedBuildingSpace += 4;
        metalCount -= 1500;
    }
    displayTotalSupplies();
    displayBuildingFacts();
}

function destroyBuilding(type) {

    if(type === 'house' && totalHouses > 0){
        let houseConfirm = window.confirm('Are you sure you want to destroy a house? All citizens assigned to this house will be sent away.');
        if(houseConfirm === true) {
            totalHouses--;
            usedBuildingSpace--;
            populationCap -= 4;

            for(let i = 0; i< 4; i++){
                personDied(true);
            }
        }
    }
    if(type === 'shelter' && totalShelters > 0 ){
        let shelterConfirm = window.confirm('Are you sure you want to destroy a shelter? All citizens assigned to this shelter will be sent away.');
        if(shelterConfirm === true) {
            totalShelters--;
            usedBuildingSpace--;
            populationCap -= 2;

            for(let i = 0; i< 2; i++){
                personDied(true);
            }
        }
    }
    if(type === 'silo' && totalSilos > 0 ){
        let siloConfirm = window.confirm('Are you sure you want to destroy a Silo?');
        if(siloConfirm === true) {
            totalSilos--;
            usedBuildingSpace -= 4;
            foodCap -= 100;
        }
    }
    if(type === 'fortification' && totalFortifications > 0 ){
        let fortificationConfirm = window.confirm('Are you sure you want to destroy a fortification?');
        if(fortificationConfirm === true) {
            totalFortifications--;
            usedBuildingSpace -= 4;
        }
    }

    displayTotalSupplies();
    displayBuildingFacts()
}


function displayBuildingFacts() {
    availableBuildingSpace = maxBuildingSpace - usedBuildingSpace;

    $('#buildingSpaceUsedText').html(`${usedBuildingSpace} out of ${maxBuildingSpace} building space used`);
    $('#populationCap').html(`${populationCount} out of ${populationCap} house spaces used`);
    $('#foodCap').html(`${foodCount} out of ${foodCap} food storage used`);
    $('#totalSheltersBuilt').html(`${totalShelters} Shelter(s) Built`);
    $('#totalHousesBuilt').html(`${totalHouses} House(s) Built`);
    $('#totalSilosBuilt').html(`${totalSilos} Silo(s) Built`);
    $('#totalFortificationsBuilt').html(`${totalFortifications} fortifications(s) Built`);
}

function claimLand(nextDay) {

    let amountOfSoldiers = Number($('#claimLandSoldiers').val());

    if(amountOfSoldiers > 0 && nextDay === false) {

        if (amountOfSoldiers > soldierCount) {
            toastr['error']('You do not have enough soldiers');
        }
        else if (claimingLand === false) {
            claimingLand = true;
            soldiersClaiming = amountOfSoldiers;
            soldierCount -= amountOfSoldiers;
            displayTotalPopulation();
            toastr['success']('Soldiers claiming land');
        }
        else {
            toastr['error']('Soldiers already claiming land');
        }
    }

    if(nextDay === true && claimingLand === true){

        let soldiersKilled = 0;

        let deathChance = Math.floor(Math.random() * 10) + 1;

        if(deathChance === 1){
            soldiersKilled = Math.floor(Math.random() * soldiersClaiming) + 1;
        }

        let livingSoldiers = soldiersClaiming -= soldiersKilled;

        soldierCount += livingSoldiers;
        maxBuildingSpace += livingSoldiers;

        displayDayMessage(true, `soldiers successfully claimed ${livingSoldiers} land. Soldiers killed: ${soldiersKilled}`);

        soldiersClaiming = 0;
        claimingLand = false;
    }
}
