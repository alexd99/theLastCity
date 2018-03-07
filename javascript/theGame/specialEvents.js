function specialEvents() {
    if(attacked === false) {
        if (dayCount === 49) {
            zombiesAttack();
        }
    }
    if (dayCount === 50){
        $('#oneChanceStoreModal').modal({backdrop: 'static', keyboard: false});
    }

    if(totalFortifications === 2 ){
        $('#fortificationsModal').modal({backdrop: 'static', keyboard: false});
    }

    if(dayCount > 50 && preachedModalOpened === false){
        let villagePreachChance = Math.floor((Math.random() * 55) + 1);

        if(villagePreachChance === 1){
            //open village preach chance
            $('#villagePreachModal').modal({backdrop: 'static', keyboard: false});
        }

        preachedModalOpened = true;
    }
}

function win() {

    if(wallLevel === 5 && totalFortifications >= 10){
        gameOver('fortifications');
    }

}

function preachChoice(preach) {

    if(preach === false){

        $('#villagePreach1Modal').modal('show');
    }

    else if( preach === true){
        daysPreached ++;
    }

    $('#villagePreachModal').modal('hide');

}

function preaching() {
    if (daysPreached >=1){
        daysPreached ++;

        if(daysPreached % 10 ===0){
            personDied(false);
            displayDayMessage(true, 'The preacher has convinced someone to walk out of your city and become a zombie');
        }

        if(populationCount <=0 ){
            gameOver('zombies');
        }
    }
}

