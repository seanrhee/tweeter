$(() => {
  console.log("tweets.js loaded")
  $(".tweet-container").hover(function () {
      // over
      console.log("hovering")
      $(this).css("box-shadow", "5px 5px gray")
    }, function () {
      // out
      $(this).css("box-shadow", "")
    }
  );

  $(".fa-comment-dots").hover(function () {
      // over
      $(this).css("color", "steelblue");
    }, function () {
      // out
      $(this).css("color", "");
    }
  );

  $(".fa-retweet").hover(function () {
      // over
      $(this).css("color", "limegreen");
    }, function () {
      // out
      $(this).css("color", "");
    }
  );

  $(".fa-heart").hover(function () {
      // over
      $(this).css("color", "red");
    }, function () {
      // out
      $(this).css("color", "");
    }
  );

  $(".fa-flag").hover(function () {
    // over
    $(this).css("color", "gold");
  }, function () {
    // out
    $(this).css("color", "");
  }
);
})

