function getScores() {

    $.get('https://thelastcity-ad.firebaseio.com/highScores/.json', function (data, status) {
        let scores = data;
        let scoresArray = [];


        for (let scoresAndNames in scores) {
            scoresArray.push( scores[scoresAndNames]);
        }

        scoresArray.sort((a, b) => {
            if (a.score > b.score) {
                return -1;
            }
            else if (a.score < b.score) {
                return 1
            }
            else {
                return 0
            }
        });

        console.log(scoresArray);
    });
}