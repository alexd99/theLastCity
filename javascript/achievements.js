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

}

function showAchievements() {
    let moralityAchievement = localStorage.getItem('morality');
    if (moralityAchievement === 'true'){$('.moralityAchievement').addClass('gold');}

    let fortificationsAchievement = localStorage.getItem('fortifications');
    if (fortificationsAchievement === 'true'){$('.invincibleAchievement').addClass('gold');}

    let shirtlessJacksAchievement = localStorage.getItem('lumberjackShirts');
    if (shirtlessJacksAchievement === 'true'){$('.shirtlessJacksAchievement').addClass('gold');}
}