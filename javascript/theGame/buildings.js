function buildBuilding(type) {

    availableBuildingSpace = maxBuildingSpace - usedBuildingSpace;

    if(type === 'house' && woodCount >= 200 && availableBuildingSpace >= 1){
        totalHouses ++;
        usedBuildingSpace ++;
        woodCount -= 200;
        populationCap += 4;

        $('#totalHousesBuilt').html(`${totalHouses} House(s) Built`);
    }

    $('#buildingSpaceUsedText').html(`${usedBuildingSpace} out of ${maxBuildingSpace} building space used`);
    displayTotalSupplies();
}