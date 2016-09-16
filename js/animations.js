
$(document).ready( function() {
  $("#tweet-submit, #char-count").css("display", "none");
  $(".tweet-actions").css("display", "none");
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
    newTweet = newTweet.replace(/damenleeturks.jpg/, "alagoon.jpg")
      .replace(/My BFF/, "Sammy Sam")
      .replace(/@mybff/g, "@sammysam")
      .replace(/Today is an amazing day./, $(".tweet-compose").val());
    $("#stream").prepend(newTweet);
    setDisplayControls();
  });

  var setDisplayControls = function() {
    $(".tweet").mouseover( function() {
      $(".tweet-actions", this).css("display", "inline");
    });

    $(".tweet").mouseout( function() {
      $(".tweet-actions", this).css("display", "none");
    })
    .on("click", function() {
      //$(".stats", this).css("display", "inline");
      $(".stats", this).slideDown("fast");
    });

  };

  setDisplayControls(); // so this is executed when the document is ready.


});