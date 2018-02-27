function getScores() {

    $.get('https://thelastcity-ad.firebaseio.com/highScores/.json', function (data, status) {
        let scores = data;
        console.log(scores);
    });
}