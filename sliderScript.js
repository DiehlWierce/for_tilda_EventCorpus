let vid = [
    // Хотите добавить еще видео в слайдер, то
    // скопируйте весь выделенный блок ниже
    // и вставьте свое видео.
    ///////////////////////////////////
    {                               ///
        'videoId': 'CzdtAfpQmE8',   /// - код видео https://youtu.be/****
        'startSeconds': 30,         /// - не трогаем
        'endSeconds': 300,          /// - не трогаем
        'suggestedQuality': 'hd720' /// - можно заменить на hd1080
    },                              ///
    ///////////////////////////////////
    ///////////////////////////////////
    {                               ///
        'videoId': 'M8RD5h5SyB8',   /// - код видео https://youtu.be/****
        'startSeconds': 30,         /// - не трогаем
        'endSeconds': 300,          /// - не трогаем
        'suggestedQuality': 'hd720' /// - можно заменить на hd1080
    },                              ///
    ///////////////////////////////////
    ///////////////////////////////////
    {                               ///
        'videoId': 'ZJ59ip0_nDM',   /// - код видео https://youtu.be/****
        'startSeconds': 30,         /// - не трогаем
        'endSeconds': 300,          /// - не трогаем
        'suggestedQuality': 'hd720' /// - можно заменить на hd1080
    },                              ///
    ///////////////////////////////////
    ///////////////////////////////////
    {                               ///
        'videoId': 'I0_Mwi5KXYw',   /// - код видео https://youtu.be/****
        'startSeconds': 30,         /// - не трогаем
        'endSeconds': 300,          /// - не трогаем
        'suggestedQuality': 'hd720' /// - можно заменить на hd1080
    },                              ///
    ///////////////////////////////////
];


$('.screen').css('z-index','-99');
$("<div/>",
  {
  "class": 'tv',
  append: "<div id='tv' class='screen'></div>",
  appendTo: ".invite-you1"
});

let text1 = 'Содержимое текстового блока №';

$('<div/>',{"class": "text_store"}).appendTo('.invite-you1');
for(let i=1;i<=4;i++){
	$('<div/>', {
  	"class": "ts1",
    id: "text_slide"+i,
    })
  .appendTo('.text_store')
//   .text(text1+i);
}
$('.ts1').css({"color":"#fff", "position": "absolute", "left": "150px", "opacity": "0"});

$('.tv').appendTo('.invite-you1');
$('[href = "#leftsld1"]').addClass("leftslider1 buttsld");
$('[href = "#rightsld1"]').addClass("rightslider1 buttsld");
$('[href = "#pagenumber1"]').addClass("pagenumber1");

var number = $('.pagenumber1');

var tag = document.createElement('script');
tag.async = true;
tag.defer = true;
tag.src = 'https://www.youtube.com/player_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var tv,
  playerDefaults = {
    autoplay: 0, // Auto-play the video on load
    controls: 0, // Show pause/play buttons in player
    showinfo: 0, // Hide the video title
    modestbranding: 0, // Hide the Youtube Logo
    loop: 0, // Run the video in a loop
    fs: 0, // Hide the full screen button
    cc_load_policy: 0, // Hide closed captions
    iv_load_policy: 3, // Hide the Video Annotations
    autohide: 1, // Hide video controls when playing
    rel: 0, // would be play same videos
    disablekb: 1, // Disable control by space or arrows
    enablejsapi: 1, // Enable API JavaScript
    mute: 1, // Mute video
    origin: "https://www.youtube.com" // For Security
  };

var pastId = 0;
var text_slide_cur=0;
var howMany = $('.ts1').length;

number.text('0' + (pastId + 1) + ' | ' + '0' + (vid.length))
$('#text_slide'+(text_slide_cur+1))
.css({opacity: 1});

function onYouTubePlayerAPIReady() {
  tv = new YT.Player('tv', {
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    },
    playerVars: playerDefaults
  });
}

function onPlayerReady() {
  tv.loadVideoById(vid[pastId]);
  tv.mute();
}

function onPlayerStateChange(e) {
  /** YouTube API
  -1 (unstarted)
  0 (ended)
  1 (playing)
  2 (paused)
  3 (buffering)
  5 (video cued)
  **/
  if (e.data === 1) {
    $('#tv').addClass('active');
  } else if (e.data === 2) {
    $('#tv').removeClass('active');
    tv.loadVideoById(vid[pastId]);
  } else if (e.data === 0) {
    tv.loadVideoById(vid[nextVid]);
  } else if (e.data === 2) {
    onPlayerReady();
    tv.seekTo(vid[pastId].startSeconds);
  }
}

function vidRescale() {

  var w = $(window).width() + 200;
  var h = $(window).height() + 200;

  if (w / h > 16 / 9) {
    tv.setSize(w, (w / 16 * 9));
    $('.tv .screen').css({
      'left': '0px'
    });
  } else {
    tv.setSize(h / 9 * 16, h);
    $('.tv .screen').css({
      'left': -($('.tv .screen').outerWidth() - w) / 2
    });
  }
}

$(window).on('load resize', function() {
  vidRescale();
})

function numberChanger(i) {
  /* console.log("начало функции: " + pastId); */
  var nvd = 0;
  var ind = pastId;
  if (i) {
    nvd = nextVid();
    tv.loadVideoById(vid[nvd]);
    prev = 1;
  } else {
    nvd = prevVid();
    tv.loadVideoById(vid[nvd]);
  }

  function nextVid() {
    if (pastId + 1 > vid.length - 1) {
      pastId = 0;
    } else {
      pastId += 1;
    }
    /* console.log("Кнопка ВПРАВО нажата: " + pastId); */
    return pastId;
  }

  function prevVid() {
    if (pastId - 1 < 0) {
      pastId = vid.length - 1;
    } else {
      pastId -= 1;
    }
    /* console.log("Кнопка ВЛЕВО нажата: " + pastId); */
    return pastId;
  }

  function textSlider(i, ind) {
/*     console.log(i + ' , ' + ind) */
    $('#text_slide'+(ind+1))
      .css({opacity: 1})
      .animate({opacity: 0}, 1000);

    $('#text_slide'+i)
      .css({opacity: 0})
      .animate({opacity: 1.0});
  }

  number.text('0' + (nvd + 1) + ' | ' + '0' + (vid.length))
  textSlider((pastId+1), ind);
}

$('.rightslider1').on('click', function() {
  numberChanger(1);
})

$('.leftslider1').on('click', function() {
  numberChanger(0);
})