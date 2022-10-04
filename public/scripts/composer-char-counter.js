$(document).ready(function() {

  $("textarea").on('input', function () {
    this.style.height = 'auto';
              
    this.style.height =  (this.scrollHeight + 5) + 'px';
  });

  $(".tweet-text").on("input", function () {
    const maxLength = 140;
    let counter = Number($('.counter').val());
    let textLength = $(this).val().length;

    counter = maxLength - textLength;
    $('.counter').html(counter);

    if (counter < 0) {
      $('.counter').css("color", "red");
      $(this).css("color", "red")
    } else {
      $('.counter').css("color", "#545149");
      $(this).css("color", "#545149")
    }
  });
})

