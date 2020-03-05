var link = document.getElementById("back-to-top");
//var amountScrolled = 250;
//var footamountScrolled = 2000;

window.addEventListener('scroll', function(e) {
    //if ( window.pageYOffset > amountScrolled) {
    //    link.classList.add('show');
    //} else {
    //    link.className = 'back-to-top';
    //}
    link.classList.add('show');
});

//var messagelink = document.getElementById("back-to-top-message");
//window.addEventListener('scroll', function (e) {
//    messagelink.classList.add('show');
//});

//<!-- Scrolls to Top -->
  //link.addEventListener('click', function(e) {
  //    e.preventDefault();

  //    var distance = 0 - window.pageYOffset;
  //    var increments = distance/(500/16);
  //    function animateScroll() {
  //        window.scrollBy(0, increments);
  //        if (window.pageYOffset <= document.body.offsetTop) {
  //            clearInterval(runAnimation);
  //        }
  //    };
  //    // Loop the animation function
  //    var runAnimation = setInterval(animateScroll, 16);
  //});