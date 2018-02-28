function theStore(inputId, name, step, price) {
    inputId = Number($('#'+inputId).val());

    let totalPrice = inputId / price;

    if (inputId % step === 0){
        if(goldCount < price){
            toastr['error']('You Do Not Have Enough Gold');
        }
        else {
            toastr['success'](`You Successfully Bought ${inputId} ${name} For ${totalPrice} Gold`);
            if (name === 'ammo'){
                ammoCount += inputId;
            }
            if (name === 'food'){
                foodCount += inputId;
            }
            goldCount -= totalPrice;
        }
    }
    else{
        toastr['error'](`Must Be Bought In Sets Of ${step}`);
    }
    displayTotalSupplies();
}

// function for the forge and making metal
function theForge(fuel) {

    if(fuel === 'wood') {
        if (woodCount >= 1 && oreCount >= 2) {
            metalCount += 1;
            woodCount -= 1;
            oreCount -= 2;
            toastr['success'](`You Successfully Smelted 2 Metal`);
        }
        else {
            if ( woodCount < 1){
                toastr['error']('You Do Not Have Enough Wood');
            }
            else if(oreCount < 2){
                toastr['error']('You Do Not Have Enough Ore');
            }
            else {
                toastr['error']('You Do Not Have Enough Wood and Ore');
            }
        }
    }

    displayTotalSupplies();

}

// function for opening and choosing the store.
function displayStore() {
    let storeTitle = $('#storeTitle');

    let generalStore = $('.generalStore');
    generalStore.hide();

    let open = Math.floor((Math.random() * 2) + 1);

    if(open === 1) {
        let openedStore = Math.floor((Math.random() * 2) + 1);

        switch (openedStore) {
            case 1:
                generalStore.show();
                storeTitle.html('GENERAL STORE');
                break;
        }
    }
}