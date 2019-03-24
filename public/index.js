
$("#inputButton").click(function() {
  var $inputs = $('#inputEmail:input');
  var values = {};
  $inputs.each(function() {
      values[this.name] = $(this).val();
  });

  $("#inputEmail").val('');

  if (!values.email) {
    alert("Please input a proper email.");
    return;
  }

  var emailValue = values.email;
  var re = /\S+@\S+\.\S+/;

  if (!re.test(emailValue)) {
    alert("Please Email Address in a proper format.");
    return;
  }

  $.post('https://angularmk.xyz/api/email', {email : emailValue}).done(function(response){
      if (response === "Already Reported") {
        alert("Email already exists.");
      } else if (response === "OK") {
        alert("Sucess");
      } else {
        alert("Internal Server Error.");
      }
  });
});
