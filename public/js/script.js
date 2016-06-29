$(document).ready(function(){

  $('#patientselect').on('click', function(){
    $('.patientinfo').show();
    $('.providerpassword').hide();
    $('#profilesubmit').removeAttr('disabled');
    $('#profilesubmit').css('color','black');
  });

  $('#providerselect').on('click', function(){
    $('.providerpassword').show();
    $('.patientinfo').hide();
    $('#profilesubmit').attr('disabled','disabled');
    $('#profilesubmit').css('color','gray');
  });

  $('#verify').on('click', function(){
    if($('#providerpassword').val()== 1234){
      $('#profilesubmit').removeAttr('disabled');
      $('#profilesubmit').css('color','black');
    }
    else {
      alert('Invalid Verification Code. If you are a patient, please select "Patient" above. If you are a provider, contact your IT department for the correct access code.');
    }
  });

  //triggered when modal is about to be shown
  $('#editModal').on('show.bs.modal', function(event) {

      //get data-id attribute of the clicked element
      var description = $(event.relatedTarget).data('description');
      var physical_location = $(event.relatedTarget).data('physical-location');
      var dose = $(event.relatedTarget).data('dose');
      var id = $(event.relatedTarget).data('bleed-id');

      //populate the input area
      $(event.currentTarget).find('input[name="description"]').val(description);
      $(event.currentTarget).find('input[name="physical_location"]').val(physical_location);
      $(event.currentTarget).find('input[name="dose"]').val(dose);
      $(event.currentTarget).find('input[name="bleed_id"]').val(id);

  });

});
