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
        let villagePreachChance = Math.floor((Math.random() * 100) + 1);

        if(villagePreachChance === 1){
            //open village preach chance
            $('#villagePreachModal').modal({backdrop: 'static', keyboard: false});
        }

        preachedModalOpened = true;
    }

    if (dayCount > 100){

        let lastStandChance = Math.floor((Math.random() * 2) + 1);

        if(lastStandChance === 1){
            //open last stand chance
            $('#lastStandModal').modal({backdrop: 'static', keyboard: false});
        }

    }

    if(totalResearchCenters >= 1){

        if(cureModalShowed === false) {
            $('#cureModal').modal({backdrop: 'static', keyboard: false});
            cureModalShowed = true;
        }
        daysWithResearchCenter += totalResearchCenters;
    }
    if (daysWithResearchCenter >= 66){
        $('#theCureContainer').show();
    }
}

function win() {

    if(wallLevel === 5 && totalFortifications >= 10){
        gameOver('fortifications');
    }

}

function lastStandChoice(choice) {
    $('#lastStandModal').modal('hide');
    $('#lastStandModal2').modal({backdrop: 'static', keyboard: false});

    if(choice === 'flee'){
    $('#lastStandText2').html(`<p>You are still a coward and flee. As you run you hear the screams of the citizens behind you. You soldiers are shocked by your actions but continue to fight bravely. As you near the north wall, the wall opposite from the breached one, you see it break and zombies pour into the city. There is nowhere to run. You can't live with the thought of being one of those monsters. You reach for your rifle, but don't feel it, it must have dropped sometime when you were running. All you have is a knife. You grab it and quickly slit your throat. "one less zombie" is your final words. </p><button onclick="gameOver('lost');$('#lastStandModal2').modal('hide');">Next</button>`)
    }
    else{
        $('#lastStandText2').html(`<p>You grab your rifle and quickly unload your first clip, then your second, third... You are shooting as fast as you can, trying to save as many citizens as possible, but it is not enough. You remember what the General before you did, you soon realize you must do the same if anyone is to survive. You run back inside your house and next to the doorway is your beloved pair of short swords. You grab them both and run back outside and charge the hoard. You don't last long before getting bit, but you still fight. You feel the virus taking effect as you kill you the 10th zombie. You know you need to end the virus soon so that the villagers don't have to worry about killing you. as the 20th zombie falls you fall on your sword, stopping the virus from spreading. The town pulls through this attack, but not unscathed. The town has a new leader now, hopefully, he is luckier than you. Your sacrifice will always be remembered by the citizens of ${ document.title}.</p>
<button onclick="gameOver('courage');$('#lastStandModal2').modal('hide');">Next</button>`)
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

