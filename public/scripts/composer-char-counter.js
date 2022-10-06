$(document).ready(function() {
  $("textarea").on('input', function () {
    this.style.height = 'auto';
              
    this.style.height =  (this.scrollHeight + 5) + 'px';
  });

  $(".tweet-text").on("input", function () {
    // validation for going over 140 character limit
    const maxLength = 140;
    let counter = Number($('.counter').val());
    let textLength = $(this).val().length;

    counter = maxLength - textLength;
    $('.counter').html(counter);

    // display counter number as red when it hits negative numbers
    if (counter < 0) {
      $('.counter').css("color", "red");
      $(this).css("color", "red")
    } else {
      $('.counter').css("color", "#545149");
      $(this).css("color", "#545149")
    }

    // appending an error message when character count hits over 140
    if (counter < 0 && !$('.error').length) {
      const $error = $('<span class="error">Tweet is too long.</span>')
      $('.submit-area').append($error);
    } else if (counter >= 0 && $('.error').length) {
      $('.error').remove();
    }
  });
})


