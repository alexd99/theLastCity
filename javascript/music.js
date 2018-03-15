// toggles the music between mute and un mute

let timesClicked = 2;
let mute = true;

let muteButton = $('#mute');
let unMuteButton = $('#unMute');

let musicPlayer = document.getElementById("gameMusic");

//unMuteButton.hide();
muteButton.hide();

function toggleMute() {
    if (timesClicked % 2 === 0){
        mute = true
    }
    else {
        mute = false;
    }

    timesClicked ++;

    if(mute === false){
        //mute music
        muteButton.show();
        unMuteButton.hide();
        musicPlayer.muted = true;

    }
    else if( mute === true){
        //play
        muteButton.hide();
        unMuteButton.show();
        musicPlayer.muted = false;
    }
}
