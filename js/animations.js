
$(document).ready( function() {

  jQuery("time.timeago").timeago();

  $("#tweet-submit, #char-count").css("display", "none");
  $(".tweet-actions").css("visibility", "hidden");
  $(".stats").css("display", "none");

  $(".tweet-compose").on("click", function() {
    $(this).css("height", "5em");
    $("#tweet-submit, #char-count").css("display", "inline-block");
  }).on("keyup", function() {
    var tweetCharCount = $(".tweet-compose").val().length;
    var remainingCharCount = 140 - tweetCharCount;
    $("#char-count").html(remainingCharCount);

    if(remainingCharCount <= 10) {
      $("#char-count").css("color", "red");
    } else {
      $("#char-count").css("color", "#999");
    }

    if(remainingCharCount > 0) {
      $("#tweet-submit").attr("disabled", false);
    } else {
      $("#tweet-submit").attr("disabled", true);
    }


  });


  $("#tweet-submit").on("click", function() {
    //var newTweet = $(".tweet").prop("outerHTML");
    var tweetId = "pd_" + Date.now();
    //var myTweet = new MyTweet(tweetId, $(".tweet-compose").val());
    var myTweet = new MyTweet(tweetId, $(".tweet-compose").val());
    var newTweet = createTweetHtml(myTweet.tweetId, myTweet.tweet, myTweet.tweetDate);

    // newTweet = newTweet.replace(/damenleeturks.jpg/, "alagoon.jpg")
    //   .replace(/My BFF/, "Sammy Sam")
    //   .replace(/@mybff/g, "@sammysam")
    //   .replace(/Today is an amazing day./, myTweet.tweet)
    //   .replace(/3 years ago/, $.timeago(new Date(myTweet.tweetDate)))
    //   .replace(/datetime="2013-09-19T13:04:00Z"/, "id=\"" + myTweet.tweetId + "\" datetime=\"" + (new Date(myTweet.tweetDate)).toISOString() + "\"");
    $("#stream").prepend(newTweet);
    saveTweet(myTweet);
    setDisplayControls();
  });

  var saveTweet = function(myTweetObj) {
    if(myTweetObj) {
      var tweetObjStr = JSON.stringify(myTweetObj);
      localStorage.setItem(myTweetObj.tweetId, tweetObjStr);
    }
  }

  var retrieveSavedTweets = function() {
    var storedTweets = [];
    for(var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      if(key.indexOf("pd_") !== -1) {
        storedTweets.push(localStorage.getItem(key));
      }
    }
    return storedTweets;
  }

  var mySavedTweets = retrieveSavedTweets();
  for(var i = 0; i < mySavedTweets.length; i++) {
    var tweetObj = JSON.parse(mySavedTweets[i]);
    if(tweetObj && tweetObj instanceof MyTweet) {
      var myTweetHtml = createTweetHtml(tweetObj.tweetid, twetObj.tweet, tweetObj.tweetDate);
      $("#stream").prepend(myTweetHtml);
    }
  }


  var setDisplayControls = function() {
    $(".tweet").mouseover( function() {
      $(".tweet-actions", this).css("visibility", "visible");
    })
    .mouseout( function() {
      $(".tweet-actions", this).css("visibility", "hidden");
    })
    .on("click", function() {
      $(".stats", this).slideDown("fast");
    });

  };

  setDisplayControls(); // so this is executed when the document is ready.



  function MyTweet(tweetId, tweet) {
    this.tweetId = tweetId;
    this.tweet = tweet;
    this.tweetDate = new Date();
  }

  function createTweetHtml(tweetId, tweet, tweetDate) {
    var newTweet = $(".tweet").prop("outerHTML");
    newTweet = newTweet.replace(/damenleeturks.jpg/, "alagoon.jpg")
      .replace(/My BFF/, "Sammy Sam")
      .replace(/@mybff/g, "@sammysam")
      .replace(/Today is an amazing day./, tweet)
      .replace(/3 years ago/, $.timeago(tweetDate))
      .replace(/datetime="2013-09-19T13:04:00Z"/, "id=\"" + tweetId + "\" datetime=\"" + tweetDate.toISOString() + "\"");
    return newTweet;
  }

});
