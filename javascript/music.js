let timesClicked = 1;
let mute = false;

let muteButton = $('#mute');
let unMuteButton = $('#unMute');

let musicPlayer = document.getElementById("gameMusic");

unMuteButton.hide();

//muteButton.hide();

function toggleMute() {
    if (timesClicked % 2 === 0){
        mute = false
    }
    else {
        mute = true;
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

// toggle mute if m is pressed
$('body').on('keyup',function(e){
    if(e.which===77){
        toggleMute();
    }
});