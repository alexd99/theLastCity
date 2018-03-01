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
        radioUpgradeText.html('Upgrade Radio: 600 metal');
    }
    else if(radioLevel === 2 && metalCount >= 600){
        radioLevel ++;
        metalCount -= 600;
        radioUpgradeText.html('Upgrade Radio: 1000 metal');
    }
    else if(radioLevel === 3 && metalCount >= 1000){
        radioLevel ++;
        metalCount -= 1000;
        radioUpgradeText.html('Upgrade Finished?');
    }

    displayTotalSupplies();
    $('#radioName').html(`Radio Level: ${radioLevel}`);
}



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
        metalCount -= 2500;
        wallUpgradeText.html('Upgrade finished');
        wallName.html('2 Reinforce Walls (4)');
    }

    displayTotalSupplies();
}

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
      farmUpgradeText.html('Upgrade Finished');
      farmName.html('Quality Fence and Sprinklers (3)');
    }
}
