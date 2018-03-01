$('.researchBreakDown').hide();
$('.hideBreakDown').hide();

function showModalBreakDown(breakdownId, showId, hideId){
  $('#'+breakdownId).show();
  $('#'+showId).hide();
  $('#'+hideId).show();
}

function hideModalBreakDown(breakdownId, showId, hideId){
  $('#'+breakdownId).hide();
  $('#'+showId).show();
  $('#'+hideId).hide();
}
