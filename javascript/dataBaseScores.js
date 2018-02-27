function getScores() {

    $.get('https://thelastcity-ad.firebaseio.com/highScores', function (data, status) {
        let scores = data;
        console.log(scores);
    });
}