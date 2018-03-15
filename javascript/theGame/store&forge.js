function theStore(inputId, name, step, price) {
    inputId = Number($('#'+inputId).val());

    let totalPrice = inputId / price;

    if(inputId > 0) {

        if (inputId % step === 0) {
            if (goldCount < price) {
                toastr['error']('You Do Not Have Enough Gold');
            }
            else {
                toastr['success'](`You Successfully Bought ${inputId} ${name} For ${totalPrice} Gold`);
                if (name === 'ammo') {
                    ammoCount += inputId;
                }
                if (name === 'food') {
                    foodCount += inputId;
                }
                if (name === 'wire') {
                    wireCount += inputId;
                }
                if (name === 'ore') {
                    oreCount += inputId;
                }
                goldCount -= totalPrice;
            }
        }
        else {
            toastr['error'](`Must Be Bought In Sets Of ${step}`);
        }
    }
    displayTotalSupplies();
}

// function for the forge and making metal
function theForge(fuel) {

    if(fuel === 'wood') {
        if (woodCount >= 2 && oreCount >= 2) {
            metalCount += 1;
            woodCount -= 2;
            oreCount -= 2;
            toastr['success'](`You Successfully Smelted 2 Metal`);
        }
        else {
            toastr['error']('You Do Not Have Enough Supplies');
        }
    }
    else if(fuel === 'coal'){
        if (coalCount >= 1 && oreCount >= 2) {
            metalCount += 1;
            coalCount -= 1;
            oreCount -= 2;
            toastr['success'](`You Successfully Smelted 2 Metal`);
        }
        else {
            toastr['error']('You Do Not Have Enough Supplies');
        }
    }

    displayTotalSupplies();

}

function forgeBullets(fuel) {
    if(fuel === 'wood') {
        if (woodCount >= 2 && metalCount >= 2) {
            woodCount -= 2;
            metalCount -= 2;
            ammoCount += 5;
            toastr['success']('You forged 5 ammo');
        }
        else {
            toastr['error']('You Do Not Have Enough Supplies');
        }
    }
    else if(fuel === 'coal') {

        if (coalCount >= 1 && metalCount >= 2) {
            coalCount -= 1;
            metalCount -= 2;
            ammoCount += 5;
            toastr['success']('You forged 5 ammo');
        }
        else {
            toastr['error']('You Do Not Have Enough Supplies');
        }
    }


    displayTotalSupplies();
}

// function for opening and choosing the store.
function displayStore() {
    let storeTitle = $('#storeTitle');

    let generalStore = $('.generalStore');
    generalStore.hide();

    let metalStore = $('.metalStore');
    metalStore.hide();

    let open = Math.floor((Math.random() * 5) + 1);

    if(open === 1) {
        toastr['info']('The store is opened');
        let openedStore = Math.floor((Math.random() * 2) + 1);

        switch (openedStore) {
            case 1:
                generalStore.show();
                storeTitle.html('GENERAL STORE');
                break;
            case 2:
                metalStore.show();
                storeTitle.html('METAL STORE');
                break;
        }
    }
}

function oneChanceStore(itemSelected){
    let itemNameInput =  $('.itemTextBoxRight');
    let itemCountInsert = $('.itemTextBoxLeft');

    if(itemSelected === 'goldWire'){
        goldWireCount += 1;
      itemNameInput.append(`<h3 class="legendaryItem goldWire">Gold Wire:</h3>`);
      itemCountInsert.append(`<h3 id="goldWire" class="goldWire legendaryItem">${goldWireCount}</h3>`)
    }

    if(itemSelected === 'steelPlate'){
        steelPlateCount += 1;
        itemNameInput.append(`<h3 class="legendaryItem steelPlate">Steel Plate:</h3>`);
        itemCountInsert.append(`<h3 id="steelPlate" class="steelPlate legendaryItem">${steelPlateCount}</h3>`)
    }

    if(itemSelected === 'qualityTools'){
        qualityToolsCount += 1;
        itemNameInput.append(`<h3 class="legendaryItem qualityTools">Quality Tools:</h3>`);
        itemCountInsert.append(`<h3 id="steelPlate" class="qualityTools legendaryItem">${qualityToolsCount}</h3>`)
    }
    if(itemSelected === 'serum'){
        serumCount += 1;
        itemNameInput.append(`<h3 class="legendaryItem qualityTools">The Serum:</h3>`);
        itemCountInsert.append(`<h3 id="steelPlate" class="qualityTools legendaryItem">${serumCount}</h3>`)
    }

    $('#oneChanceStoreModal').modal('hide');
}