var currentSubtitle = getSubtitle();

function showOnYoutube() {
  shouldStopVideo = true;

  player.seekTo(currentSubtitle[startTime]);
  player.playVideo();
}

//--------------------

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
  LoadNewSubtitle();
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  //   event.target.playVideo();
}

var shouldStopVideo = true;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && shouldStopVideo) {
    setTimeout(pauseVideo, currentSubtitle[duration] * 1000);
    shouldStopVideo = false;
  }
}
function pauseVideo() {
  player.pauseVideo();
}

//--------------

function setupActions() {
  // <img class="actionImage" onclick="submitAction('CheckingSomething')" onmouseover="DemoClippyAction('CheckingSomething')" src="images/CheckingSomething.png"/>

  var gestures = [
    "NoAction",
    "Searching",
    "CheckingSomething",
    "GetAttention",
    "Congratulate",
    "EmptyTrash",
    "GestureRight",
    "GestureUp",
    "GestureLeft",
    "GestureDown",
    "GetArtsy",
    "GetTechy",
    "Hearing_1",
    "Print",
    "Processing",
    "Save",
    "Writing",
    "RandomQuote"
  ];

  gestures.forEach(element => {
    var action = $("<img class='actionImage'>");
    action.attr("src", "images/" + element + ".png");
    action.attr("title", element);
    action.click(function() {
      submitAction(element);
    });
    action.mouseover(function() {
      DemoClippyAction(element);
    });

    $("#clippyActionsDiv").append(action);
  });
}

var submittedActions = 0;

function increaseSubmittedActions() {
  submittedActions++;
  document.getElementById("sentActions").innerText = submittedActions;
}

function submitAction(action) {
  clippyAgent.stop();
  clippyAgent.play("SendMail");
  $("#clippyActionsDiv").fadeOut();
  $("#subtitleText").fadeOut({
    complete: function() {
      $("#spinner").show();
    }
  });

  var jqxhr = $.ajax({
    url:
      "https://script.google.com/macros/s/AKfycby5oxHtiPWAem7RRnSb8HjyXpQRn46WmcP_aEyLqWAzK3TNaho/exec",
    method: "GET",
    dataType: "json",
    data: {
      youtubeId: currentSubtitle[youtubeId],
      subTitleId: currentSubtitle[srtId],
      Action: action
    },
    success: function() {
      increaseSubmittedActions();
      LoadNewSubtitle();
      $("#spinner").hide();

      $("#clippyActionsDiv").fadeIn("fast");
      $("#subtitleText").fadeIn();
    },
    error: function() {
      alert(
        "Din request försvann i ett svart hål på internet :( \nVar vänlig försök igen."
      );
      $("#spinner").hide();

      $("#clippyActionsDiv").fadeIn("fast");
      $("#subtitleText").fadeIn();
    }
  });
}

var player;
function LoadNewSubtitle() {
  currentSubtitle = getSubtitle();

  if (!player) {
    player = new YT.Player("player", {
      height: "270",
      width: "480",
      videoId: currentSubtitle[youtubeId],
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange
      }
    });
  } else {
    player.pauseVideo();
    shouldStopVideo = false;
  }

  if (player.videoId !== currentSubtitle.youtubeId) {
    player.loadVideoById(
      currentSubtitle[youtubeId],
      currentSubtitle[startTime]
    );
  }

  document.getElementById("subtitleText").innerText =
    currentSubtitle[subTitleText];
}

//fields in data
const youtubeId = 0;
const srtId = 1;
const startTime = 2;
const duration = 3;
const subTitleText = 4;

function getSubtitle() {

  return subtitles[getRandomInt(subtitles.length)];
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

//---- clippy
var clippyAgent;

function LoadClippy() {
  clippy.load("Clippy", function(agent) {
    clippyAgent = agent;
    clippyAgent.show();
    // clippyAgent.moveTo(window.innerWidth-200,40);
  });
}

function DemoClippyAction(actionName) {
  clippyAgent.stopCurrent();
  clippyAgent.stop();

  if (actionName === "RandomQuote") {
    clippyAgent.speak("Random citat ifrån t.ex. Hackers the movie");
  } else {
    clippyAgent.play(actionName);
  }
}
