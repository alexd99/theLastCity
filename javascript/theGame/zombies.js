// calculates if the zombies are going to attack or not
function zombieAttackChance() {
    let zombieAttackChance = Math.floor(Math.random() * 2) + 1;

        if (zombieAttackChance === 1) {
            zombiesAttack();
        }
}


// calculates how much defense your town has and how much attack the zombies have.
function zombiesAttack() {

    peopleKilled = 0;

    if (attacked === false) {

        let amountOfZombies = Math.floor(Math.random() * zombieArmyNumberParam1) + zombieArmyNumberParam2;
        let townDefense;
        let zombieAttack = amountOfZombies;

        if (soldierCount <= 0) {
            townDefense = 0;
        }
        if (ammoCount <= 0) {
            ammoCount = 0;
            townDefense = soldierCount;
        }
        else if (ammoCount < amountOfZombies && ammoCount > 0) {
            townDefense = (Math.floor(ammoCount * .75) + soldierCount);
            ammoCount = 0;
        }
        else {
            townDefense = soldierCount * 1.75;
            ammoCount -= amountOfZombies;
        }

        switch (wallLevel) {
            case 1:
                townDefense += 1;
                break;
            case 2:
                townDefense += 2;
                break;
            case 3:
                townDefense += 4;
                break;
            case 4:
                townDefense += 6;
                break;
            case 5:
                townDefense += 8;
                break;
        }

        townDefense += totalFortifications * 1.5;

        if (townDefense < zombieAttack) {
            let loopRun = 0;
            if (townDefense === 0) {
                loopRun = zombieAttack;
            }
            else {
                loopRun = Math.floor((zombieAttack - townDefense) / 5);
            }
            for (let i = 1; i <= loopRun; i++) {
                personDied(false);
                peopleKilled++;
                totalPeopleKilled++;
            }
        }

        let zombieAttackMessage = `You Were Attacked! Amount of zombies: ${amountOfZombies},  People killed: ${peopleKilled}`;
        displayDayMessage(true, zombieAttackMessage);

        attacked = true;
    }
}