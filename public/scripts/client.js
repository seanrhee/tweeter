/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const escapeFx = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

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
      <p>${escapeFx(tweet.content.text)}</p>
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

  console.log(`${$tweet} has been created`)

  return $tweet;
};

// append tweets returned by createTweetElement()
const renderLatestTweet = function(tweets) {
  const latestTweet = tweets[tweets.length - 1]
  // loop through tweet database and convert them into article elements
  $('.tweets').prepend(createTweetElement(latestTweet));
  console.log(`${latestTweet} has been prepended`)
};

// append tweets returned by createTweetElement()
const renderTweets = function(tweets) {
  // loop through tweet database and convert them into article elements
  for (const tweet of tweets) {
    $('.tweets').prepend(createTweetElement(tweet));
    console.log(`${tweet} has been prepended`)
  }
};

// loadTweets from json
const loadTweets = function() {
  console.log("loadTweets called")
  
  // get tweets from /tweets and render using renderTweets()
   $.get("/tweets", (data) => {
    console.log("printing data", data);
    renderTweets(data);
  })
};

// loadTweets from json
const loadLatestTweet = function() {
  console.log("loadLatestTweet called")
  
  // get tweets from /tweets and render using renderTweets()
   $.get("/tweets", (data) => {
    console.log("printing data", data);
    renderLatestTweet(data);
  })
};

// disable/enable button depending on empty form
const checkTextArea = () => {
  const $textarea = $('.tweet-text');

  if($textarea.val().length > 140) {
    $('#tweet-button').prop('disabled', true);
    $('#tweet-button').removeAttr('style');
  } else {
    $('#tweet-button').prop('disabled', false);
    $('#tweet-button').css('background-color', "#4056A1")
  }
};

// load tweets on page load
console.log("page load")
loadTweets();

// document ready
$(document).ready(() => {
  // disables/enables submit button based on character count
  $(document).on('input', '.tweet-text', checkTextArea);

  // form submit
  $("form").submit(function (e) { 
    e.preventDefault();

    // check for empty tweet and display an error
    if (Number($('.counter').val()) === 140) {
      $('#empty').slideDown().fadeOut(1000);
      return;
    }

    // serialize data from textarea
    const $tweetContent = $('form').serialize();

    // POST request to /tweets, then call loadTweets() on success
    $.post('/tweets', $tweetContent, (data) => {
      console.log('success')

          // reset form
    $('.tweet-text').val('');
    $('.counter').html('140');
    // $('#tweet-button').removeAttr('style');
    $("textarea").on('input', function () {
      this.style.height = 'auto';
                
      this.style.height =  (this.scrollHeight + 5) + 'px';
    });
    // end reset form

      loadLatestTweet();
    })
  });
});