
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
    var newTweet = $(".tweet").prop("outerHTML");
    var tweetDate = Date.now();
    var tweetId = "pd_" + tweetDate;
    newTweet = newTweet.replace(/damenleeturks.jpg/, "alagoon.jpg")
      .replace(/My BFF/, "Sammy Sam")
      .replace(/@mybff/g, "@sammysam")
      .replace(/Today is an amazing day./, $(".tweet-compose").val())
      .replace(/3 years ago/, $.timeago(new Date(tweetDate)))
      .replace(/datetime="2013-09-19T13:04:00Z"/, "id=\"" + tweetId + "\" datetime=\"" + (new Date(tweetDate)).toISOString() + "\"");
    $("#stream").prepend(newTweet);
    setDisplayControls();
  });

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


});
