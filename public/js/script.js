$(document).ready(function(){
  $('#patientselect').on('click', function(){
    $('.patientinfo').show();
    $('.providerpassword').hide();
    $('#profilesubmit').removeAttr('disabled');
    $('#profilesubmit').css('color','black');
  })
  $('#providerselect').on('click', function(){
    $('.providerpassword').show();
    $('.patientinfo').hide();
    $('#profilesubmit').attr('disabled','disabled');
    $('#profilesubmit').css('color','gray');
  })
  $('#verify').on('click', function(){
    if($('#providerpassword').val()== 1234){
      $('#profilesubmit').removeAttr('disabled');
      $('#profilesubmit').css('color','black');
    }
    else {
      alert('Invalid Verification Code. If you are a patient, please select "Patient" above. If you are a provider, contact your IT department for the correct access code.')
    }
  })
})
