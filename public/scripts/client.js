/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// convert JSON info into HTML
const createTweetElement = function(tweet) {
  const $tweet = $(`<article class="tweet-container">
  <header>
      <div class="tweet-header-left">
        <img src="${tweet.user.avatars}" alt="${tweet.user.handle}'s avatar" class="pfp">
        <h5>${tweet.user.name}</h5>
      </div>
      <div class="tweet-header-right">
        <h5>${tweet.user.handle}</h5>
      </div>
    </header>
    <div class="tweet-body-container">
      <p>${tweet.content.text}</p>
    </div>
    <footer>
      <div class="tweet-date">
        <p>${timeago.format(tweet.created_at)}</p>
      </div>
      <div class="tweet-icons">
        <i class="fa-solid fa-comment-dots fa-sm"></i>
        <i class="fa-solid fa-retweet fa-sm"></i>
        <i class="fa-solid fa-heart fa-sm"></i>
        <i class="fa-solid fa-flag fa-sm"></i>
      </div>
    </footer>
  </article>`);

  return $tweet;
};

// append tweets returned by createTweetElement()
const renderTweets = function(tweets) {
  console.log("rendertweet called")
  for (const tweet of tweets) {
    $('.tweets').prepend(createTweetElement(tweet));
  }
};

// loadTweets from json
const loadTweets = function() {
  console.log("loadTweet called");
   $.get("/tweets", (data) => {
    console.log("printing data", data);
    renderTweets(data);

    // reset form
    $('.tweet-text').val('');
    $('.counter').html('140');
    $('#tweet-button').prop('disabled', true);
    $('#tweet-button').removeAttr('style');
    $("textarea").on('input', function () {
      this.style.height = 'auto';
                
      this.style.height =  (this.scrollHeight + 5) + 'px';
    });
    // end reset form

    // load tweets.js for css hover effects
    const script = document.createElement('script');
    script.src = '/scripts/tweets.js';
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);
  })
};

// disable/enable button depending on empty form
const checkTextArea = () => {
  const $textarea = $('.tweet-text');

  if ($textarea.val() === '') {
    $('#tweet-button').prop('disabled', true);
    $('#tweet-button').removeAttr('style');
  } else if($textarea.val().length > 140) {
    $('#tweet-button').prop('disabled', true);
    $('#tweet-button').removeAttr('style');
  } else {
    $('#tweet-button').prop('disabled', false);
    $('#tweet-button').css('background-color', "#4056A1")
  }
};

// load tweets on page load
loadTweets();

// document ready
$(document).ready(() => {

  // disables/enables submit button based on character count
  $(document).on('input', '.tweet-text', checkTextArea);


  $("form").submit(function (e) { 
    e.preventDefault();

    const $tweetContent = $('form').serialize();
    console.log($tweetContent)

    $.post('/tweets', $tweetContent, (data) => {
      console.log('success')
      loadTweets();
    })
  });
});