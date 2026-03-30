var allSections = document.querySelectorAll('section[id]');
var allNavLinks = document.querySelectorAll('.menu a');

var sectionObserver = new IntersectionObserver(function (entries) {

  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      var activeSectionId = entry.target.getAttribute('id');

      allNavLinks.forEach(function (link) {
        link.classList.remove('active-link');
        if (link.getAttribute('href') === '#' + activeSectionId) {
          link.classList.add('active-link');
        }
      });
    }
  });

}, {
  rootMargin: '-40% 0px -50% 0px'
});


allSections.forEach(function (section) {
  sectionObserver.observe(section);
});


var allFooter= document.querySelectorAll('footer[id]');
var allNavLinks = document.querySelectorAll('.menu a');

var footerObserver = new IntersectionObserver(function (entries) {

  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      var activeFooterId = entry.target.getAttribute('id');

      allNavLinks.forEach(function (link) {
        link.classList.remove('active-link');
        if (link.getAttribute('href') === '#' + activeFooterId) {
          link.classList.add('active-link');
        }
      });
    }
  });

}, {
  rootMargin: '-40% 0px -50% 0px'
});


allFooter.forEach(function (section) {
  footerObserver.observe(section);
});


var fadeElements = document.querySelectorAll('.fade-in');

var fadeObserver = new IntersectionObserver(function (entries) {

  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target); 
    }
  });

}, {
  threshold: 0.12
});

fadeElements.forEach(function (element) {
  fadeObserver.observe(element);
});




var modelCards = document.querySelectorAll('.model-card');

modelCards.forEach(function (card) {

  var video = card.querySelector('.card-video');
  if (!video) return;

  card.addEventListener('mouseenter', function () {
    video.play().catch(function () {
     
    });
  });

  card.addEventListener('mouseleave', function () {
    video.pause();
    video.currentTime = 0;
  });

});




var trailerVideo = document.getElementById('main-video');
var playButton   = document.getElementById('play-button');

if (trailerVideo && playButton) {

  playButton.textContent = '▶';

  playButton.addEventListener('click', function () {
    if (trailerVideo.paused) {
      trailerVideo.play();
      playButton.textContent = '⏸';
    } else {
      trailerVideo.pause();
      playButton.textContent = '▶';
    }
  });

  trailerVideo.addEventListener('click', function () {
    playButton.click();
  });


  trailerVideo.addEventListener('ended', function () {
    trailerVideo.currentTime = 0;
    playButton.textContent = '↺';
  });

}




var thumbnailButtons = document.querySelectorAll('.thumb-button');

thumbnailButtons.forEach(function (thumbnail) {

  thumbnail.addEventListener('click', function () {

    var newVideoSrc  = thumbnail.getAttribute('data-video');
    var newPosterSrc = thumbnail.getAttribute('data-poster');

   
    thumbnailButtons.forEach(function (btn) {
      btn.classList.remove('active-thumb');
    });

    thumbnail.classList.add('active-thumb');

  
    if (trailerVideo) {
      trailerVideo.pause();
      trailerVideo.src    = newVideoSrc;
      trailerVideo.poster = newPosterSrc;
      trailerVideo.load();
      trailerVideo.play().catch(function () {});

      if (playButton) {
        playButton.textContent = '⏸';
      }
    }

  });

});

var aboutVideo = document.getElementById('aboutVideo');
var aboutModel = document.getElementById('aboutModel');
var aboutTitle = document.getElementById('aboutTitle');
var aboutSpecs = document.getElementById('aboutSpecs');
var aboutDesc1 = document.getElementById('aboutDesc1');
var aboutDesc2 = document.getElementById('aboutDesc2');


var modelDescriptions = {
  'McLaren 570S': {
    desc1: 'McLaren 570S Sport Series ailesinin en dengeli süper otomobillerinden biridir. Hafif karbon fiber şasi ve çift turbo V8 motoru ile yüksek performans ve günlük sürüş konforunu birleştirir.',
    desc2: 'Aerodinamik tasarımı ve yarış teknolojilerinden gelen mühendisliği sayesinde sürücüye hem pistte hem yolda üst düzey kontrol sunar.'
  },
  'McLaren 720S': {
    desc1: 'McLaren 720S Super Series ailesinin en güçlü modellerinden biridir. Aktif aerodinamik yapısı ve agresif tasarımı ile maksimum hız ve kontrol sunar.',
    desc2: '720 beygir gücündeki motoru sayesinde süper otomobil dünyasında en hızlı hızlanma değerlerinden birine sahiptir.'
  },
  'McLaren P1': {
    desc1: 'McLaren P1 hibrit hiper otomobil teknolojisinin en ikonik örneklerinden biridir. Formula 1 teknolojisinden ilham alan hibrit güç sistemi kullanır.',
    desc2: 'Elektrik motoru ve V8 motorunun birleşimi ile hem yüksek performans hem de gelişmiş enerji yönetimi sağlar.'
  },
  'McLaren GT': {
    desc1: 'McLaren GT uzun yol performansı ve lüks sürüş deneyimi için tasarlanmış bir grand tourer modelidir.',
    desc2: 'Yüksek performanslı V8 motoru ile uzun mesafelerde bile konforlu ve güçlü bir sürüş sunar.'
  }
};

modelCards.forEach(function (card) {

  var btn = card.querySelector('.card-link');
  if (!btn) return;

  btn.addEventListener('click', function (e) {
    e.preventDefault();

   
    var name      = card.querySelector('.card-name').textContent;
    var videoSrc  = card.querySelector('video').src;
    var specItems = card.querySelectorAll('.card-specs li');


    if (aboutVideo) {
      aboutVideo.src = videoSrc;
      aboutVideo.load();
    }

    
    if (aboutModel) aboutModel.textContent = name;
    if (aboutTitle) {
      aboutTitle.innerHTML = 'McLaren <span class="orange-text">' + name.replace('McLaren ', '') + '</span>';
    }

    
    if (aboutSpecs) {
      aboutSpecs.innerHTML = '';
      specItems.forEach(function (spec) {
        var label = spec.querySelector('.spec-label').textContent;
        var value = spec.querySelector('.spec-value').textContent;
        var li = document.createElement('li');
        li.textContent = '◈ ' + label + ': ' + value;
        aboutSpecs.appendChild(li);
      });
    }


    var descriptions = modelDescriptions[name];
    if (descriptions) {
      if (aboutDesc1) aboutDesc1.textContent = descriptions.desc1;
      if (aboutDesc2) aboutDesc2.textContent = descriptions.desc2;
    }

  
    var aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }

  });

});



