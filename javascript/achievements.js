// hides all trophies
$('.fa-trophy').hide();

// sets the achievements in local storage
function setAchievements(winBy) {

    if (winBy === 'zombies'){
        let moralityCheck = localStorage.getItem('morality');

        if(moralityCheck === null)
        {
            localStorage.setItem('morality', 'false');
            setAchievements('zombies');
        }

        if (moralityCheck === 'false') {
            localStorage.setItem('morality', 'true');
            toastr['success']('You earned the Morality achievement');
        }

    }

    if (winBy === 'fortifications'){
        let fortificationsCheck = localStorage.getItem('fortifications');

        if(fortificationsCheck === null)
        {
            localStorage.setItem('fortifications', 'false');
            setAchievements('fortifications');
        }

        if (fortificationsCheck === 'false') {
            localStorage.setItem('fortifications', 'true');
            toastr['success']('You earned the Invincible achievement');
        }
    }

    if (winBy === 'cure'){
        let cureCheck = localStorage.getItem('cure');

        if(cureCheck === null)
        {
            localStorage.setItem('cure', 'false');
            setAchievements('cure');
        }

        if (cureCheck === 'false') {
            localStorage.setItem('cure', 'true');
            toastr['success']('You earned the Medical Warfare achievement');
        }
    }

    if (winBy === 'courage'){
        let courageCheck = localStorage.getItem('courage');

        if(courageCheck === null)
        {
            localStorage.setItem('courage', 'false');
            setAchievements('courage');
        }

        if (courageCheck === 'false') {
            localStorage.setItem('courage', 'true');
            toastr['success']('You earned the Heroic Monument achievement');
        }
    }

    if(lumberjackCount >= 20){
        let lumberjackCheck = localStorage.getItem('lumberjackShirts');

        if(lumberjackCheck === null)
        {
            localStorage.setItem('lumberjackShirts', 'false');
            setAchievements();
        }

        if (lumberjackCheck === 'false') {
            localStorage.setItem('lumberjackShirts', 'true');
            toastr['success']('You earned the Shirtless Jacks achievement');
        }
    }

    if(farmerCount >= 20){
        let farmerCheck = localStorage.getItem('shovelry');

        if(farmerCheck === null)
        {
            localStorage.setItem('shovelry', 'false');
            setAchievements();
        }

        if (farmerCheck === 'false') {
            localStorage.setItem('shovelry', 'true');
            toastr['success']('You earned the shovelry achievement');
        }
    }

}

// grabs achievements from local storage and checks if there true
function showAchievements() {
    let moralityAchievement = localStorage.getItem('morality');
    if (moralityAchievement === 'true'){$('.moralityAchievement').addClass('gold');$('#moralityAchievementTrophy').show() }


    let fortificationsAchievement = localStorage.getItem('fortifications');
    if (fortificationsAchievement === 'true'){$('.invincibleAchievement').addClass('gold'); $('#invincibleAchievementTrophy').show()}

    let medicalWarfareAchievement = localStorage.getItem('cure');
    if (medicalWarfareAchievement === 'true'){$('.medicalWarfareAchievement').addClass('gold'); $('#medicalWarfareAchievementTrophy').show()}

    let heroicMonumentAchievement = localStorage.getItem('courage');
    if (heroicMonumentAchievement === 'true'){$('.heroicMonumentAchievement').addClass('gold'); $('#heroicMonumentAchievementTrophy').show()}

    let shirtlessJacksAchievement = localStorage.getItem('lumberjackShirts');
    if (shirtlessJacksAchievement === 'true'){$('.shirtlessJacksAchievement').addClass('gold');$('#shirtlessJacksAchievementTrophy').show()}

    let shovelryAchievement = localStorage.getItem('shovelry');
    if (shovelryAchievement === 'true'){$('.shovelryAchievement').addClass('gold');$('#shovelryAchievementTrophy').show()}
}