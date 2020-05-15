$(document).ready(function(){

  $('select').styler();

  $(".contact-us").on("click","a", function (event) {
    event.preventDefault();
    let id  = $(this).attr('href');
    let top = $(id).offset().top;
    $('body, html').animate({scrollTop: top}, 1500);
  });

  $('body').on('click', '.burger', function(){
    
      $('.nav').toggleClass('opened');
      $('body').toggleClass('scroll-off');
  });

  $(document).mouseup(function (e){
    let block = $('.nav');

    if (!block.is(e.target) && block.has(e.target).length === 0) {
        block.removeClass('opened');
        $('body').removeClass('scroll-off');
    };
  });

  $('.grid__wrapper').masonry({
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    percentPosition: true,
    gutter: 12,
  });

});