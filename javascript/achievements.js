function setAchievements(winBy) {

    if (winBy === 'zombies'){
        let moralityCheck = localStorage.getItem('morality');

        if(moralityCheck === null)
        {
            localStorage.setItem('morality', 'false');
            setAchievements('zombies');
        }

        if (moralityCheck === 'false') {
            localStorage.setItem('morality', 'true')
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
            localStorage.setItem('fortifications', 'true')
        }
    }

}

function showAchievements() {
    let moralityAchievement = localStorage.getItem('morality');
    if (moralityAchievement === 'true'){$('.moralityAchievement').addClass('gold');}

    let fortificationsAchievement = localStorage.getItem('fortifications');
    if (fortificationsAchievement === 'true'){$('.invincibleAchievement').addClass('gold');}
}