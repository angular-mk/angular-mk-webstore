$(window).on('load', function() {
  var transition = $(".head-secondary").offset().top;
  var navbar = $("#mainNav");

  $(window).scroll(function (){
    if ($(window).scrollTop() > transition) {
      navbar.addClass("nav-bg-op");
    } else {
      navbar.removeClass("nav-bg-op");
    }
  });
});
