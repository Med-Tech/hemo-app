$(document).ready(function(){

  $('#patientselect').on('click', function() {
    $('.patientinfo').show();
    $('.providerpassword').hide();
    $('#profilesubmit').show();
  });

  $('#providerselect').on('click', function() {
    $('.providerpassword').show();
    $('.patientinfo').hide();
    $('#profilesubmit').hide();
  });

  $('#providerpassword').blur(function() {
    if($('#providerpassword').val()== 1234){
      $('#profilesubmit').show();
      $('#profilesubmit').css('color','black');
      $('#providerpassword').removeClass('red-border');
      $('#check-mark').show();
    } else {
      $('#profilesubmit').hide();
      $('#profilesubmit').css('color','grey');
      $('#providerpassword').addClass('red-border');
    }
  });

  // Triggered when modal is about to be shown
  $('#editModal').on('show.bs.modal', function(event) {
    var relatedTarget = $(event.relatedTarget);
    var currentTarget = $(event.currentTarget);
    // Get data-id attribute of the clicked element
    var event_date = relatedTarget.data('event-date');
    var description = relatedTarget.data('description');
    var physical_location = relatedTarget.data('physical-location');
    var medicine = relatedTarget.data('medicine');
    var dose = relatedTarget.data('dose');
    var prioritize = relatedTarget.data('prioritize');
    var id = relatedTarget.data('bleed-id');
    // Format event date with slice and moment.js
    var dateStr = event_date.toString().slice(3);
    event_date = moment(dateStr, 'MMM-DD-YYYY').format('YYYY-MM-DD');
    // Populate the input area
    currentTarget.find('input[name=event_date]').val(event_date);
    currentTarget.find('input[name="description"]').val(description);
    currentTarget.find('input[name="physical_location"]').val(physical_location);
    currentTarget.find('select[name="medicine"]').find("option[value='" + medicine + "']").prop('selected', 'selected');
    currentTarget.find('input[name="dose"]').val(dose);
    currentTarget.find("input[value='" + prioritize + "']").prop('checked', true);
    currentTarget.find('input[name="bleed_id"]').val(id);
  });
  // Same as above but for pre-populating the original add-bleed event with medicine the patient takes
  $('#myModal').on('show.bs.modal', function(event) {
    var medicine = $(event.relatedTarget).data('medicine');
    var date = moment().format('YYYY-MM-DD');
    $(event.currentTarget).find('select[name="medicine"]').find("option[value='" + medicine + "']").prop('selected', 'selected');
    $(event.currentTarget).find('input[name=event_date]').val(date);
  });

  // Contact info modal in the footer
  $('.contactLink').on('click', function(){
    $('#contactModal').modal('show');
  });

  // About info modal in the footer
  $('.aboutLink').on('click', function(){
    $('#aboutModal').modal('show');
  });

});
