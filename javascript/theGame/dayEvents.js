function dayEvents() {
    if(attacked === false) {
        if (dayCount === 49) {
            zombiesAttack();
        }
    }
    if (dayCount === 50){
        $('#oneChanceStoreModal').modal({backdrop: 'static', keyboard: false});
    }
}

