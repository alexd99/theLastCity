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

}

function showAchievements() {
    let moralityAchievement = localStorage.getItem('morality');
    if (moralityAchievement === 'true'){$('.moralityAchievement').addClass('gold');}
}