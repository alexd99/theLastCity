// upgrades radio, checks if you have the necessary supplies
function upgradeRadio() {

    let radioUpgradeText = $('#upgradeRadioText');

    if(radioLevel === 0 && metalCount >= 200){
        radioLevel ++;
        metalCount -= 200;
        radioUpgradeText.html('Upgrade Radio: 400 metal');
    }
    else if(radioLevel === 1 && metalCount >= 400){
        radioLevel ++;
        metalCount -= 400;
        radioUpgradeText.html('Upgrade Radio: 600 metal and 50 wire');
    }
    else if(radioLevel === 2 && metalCount >= 600 && wireCount >= 50){
        radioLevel ++;
        metalCount -= 600;
        wireCount -= 50;
        radioUpgradeText.html('Upgrade Radio: 1000 metal and 100 wire');
    }
    else if(radioLevel === 3 && metalCount >= 1000 && wireCount >= 100){
        radioLevel ++;
        metalCount -= 1000;
        wireCount -= 100;
        radioUpgradeText.html('Final Upgrade: 1000 metal, 100 wire, and 1 gold wire');
    }
    else if(radioLevel === 4 && metalCount >= 1000 && wireCount >= 100 && goldWireCount >= 1){
        radioLevel ++;
        metalCount -= 1000;
        wireCount -= 100;
        goldWireCount -=1;
        radioUpgradeText.html('Upgrade Finished');
        $('.goldWire').hide();
    }

    displayTotalSupplies();
    $('#radioName').html(`Radio Level: ${radioLevel}`);
}

// upgrades walls, checks if you have the necessary supplies
function upgradeWalls(){
    let wallUpgradeText = $('#upgradeWallText');
    let wallName = $('#wallName');

    if(wallLevel === 0 && woodCount >= 100){
        wallLevel ++;
        woodCount -= 100;
        wallUpgradeText.html('Reinforced Hard Wood: 100 wood and 50 metal');
        wallName.html('Hard Wood Walls (1)');
    }
    else if(wallLevel === 1 && woodCount >= 100 && metalCount >= 50){
        wallLevel ++;
        woodCount -= 100;
        metalCount -= 50;
        wallUpgradeText.html('Additional Wall: 150 wood');
        wallName.html('Reinforced Hard Wood Walls (2)');
    }
    else if(wallLevel === 2 && woodCount >= 150){
        wallLevel ++;
        woodCount -= 150;
        wallUpgradeText.html('Reinforce Second Wall: 200 wood and 100 metal');
        wallName.html('2 Walls (3)');
    }
    else if(wallLevel === 3 && woodCount>= 200 && metalCount >= 100){
        wallLevel ++;
        woodCount -= 200;
        metalCount -= 100;
        wallUpgradeText.html('Final Upgrade: 200 wood, 100 metal, and 1 steel plate');
        wallName.html('2 Reinforce Walls (4)');
    }
    else if(wallLevel === 4 && woodCount>= 200 && metalCount >= 100 && steelPlateCount >= 1){
        wallLevel ++;
        woodCount -= 200;
        metalCount -= 100;
        steelPlateCount -= 1;
        wallUpgradeText.html('Upgrade finished');
        wallName.html('2 steel plated reinforced walls (5)');
        $('.steelPlate').hide();
    }

    displayTotalSupplies();
}

// upgrades farm, checks if you have the necessary supplies
function upgradeFarm(){
    let farmUpgradeText = $('#upgradeFarmText');
    let farmName = $('#farmName');

    if(farmLevel === 0 && woodCount >= 50){
      farmLevel ++;
      woodCount -= 50;
      farmUpgradeText.html('Sprinklers: 50 metal');
      farmName.html('Fence (1)');
    }
    else if(farmLevel === 1 && metalCount >=50){
      farmLevel ++;
      metalCount -= 50;
      farmUpgradeText.html('Quality fence and Sprinklers: 100 wood and 100 metal');
      farmName.html('Sprinklers (2)');
    }
    else if (farmLevel === 2 && woodCount >=100 && metalCount >= 100) {
      farmLevel ++;
      woodCount -=100;
      metalCount -= 100;
      farmUpgradeText.html('Final Upgrade: 100 wood, 100 metal, and quality tools');
      farmName.html('Quality Fence and Sprinklers (3)');
    }
    else if (farmLevel === 3 && woodCount >=100 && metalCount >= 100 && qualityToolsCount >= 1) {
        farmLevel ++;
        woodCount -=100;
        metalCount -= 100;
        qualityToolsCount -= 1;
        $('.qualityTools').hide();
        farmUpgradeText.html('Upgrade Finished');
        farmName.html('Quality Farm (4)');
    }
}

// starts the search for the cure, checks if you have the necessary supplies
function theCure() {
    if(serumCount > 0 && populationCount >= 2){
        serumCount = 0;
        personDied(false);
        personDied(false);
        searchingForCure = true;
        toastr["success"]("You started looking for the cure!")
    }
}
// calculates how long you have been searching for the cure
function searchingForTheCure() {
    if(searchingForCure === true){
        daysSearching ++;
    }
    if (daysSearching >= 55){
       gameOver('cure')
    }
}

// research can only be done if a research center is built, this checks that
function researchCenters() {
    if(totalResearchCenters <= 0){
        $('.researchBtn').prop('disabled', true);
    }
    else {
        $('.researchBtn').prop('disabled', false);
    }
}