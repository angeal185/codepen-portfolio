
$.getJSON("app/json/data.json", function(data){

var _createClass = function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var max_particles = 1000;

var tela = document.createElement('canvas');
tela.width = $(window).width();
tela.height = $(window).height();
$('body').prepend(tela);
var canvas = tela.getContext('2d');

var Particle = function() {
  function Particle(canvas, progress) {
    _classCallCheck(this, Particle);

    var random = Math.random();
    this.progress = 0;
    this.canvas = canvas;

    this.x = $(window).width() / 2 + (Math.random() * 200 - Math.random() * 200);
    this.y = $(window).height() / 2 + (Math.random() * 200 - Math.random() * 200);
    this.s = Math.random() * 1;
    this.a = 0;
    this.w = $(window).width();
    this.h = $(window).height();
    this.radius = random > .2 ? Math.random() * 1 : Math.random() * 1;
    this.color = random > .2 ? "#2E4765" : "#ff0048";
    this.radius = random > .8 ? Math.random() * 2 : this.radius;
    this.color = random > .8 ? "#2E4765" : this.color;

    // this.color  = random > .1 ? "#ffae00" : "#f0ff00" // Alien
    this.variantx1 = Math.random() * 300;
    this.variantx2 = Math.random() * 400;
    this.varianty1 = Math.random() * 100;
    this.varianty2 = Math.random() * 120;
  }

  _createClass(Particle, [{
    key: 'render',
    value: function render() {
      this.canvas.beginPath();
      this.canvas.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      this.canvas.lineWidth = 2;
      this.canvas.fillStyle = this.color;
      this.canvas.fill();
      this.canvas.closePath();
    }
  }, {
    key: 'move',
    value: function move() {
      this.x += Math.cos(this.a) * this.s;
      this.y += Math.sin(this.a) * this.s;
      this.a += Math.random() * 0.8 - 0.4;

      if (this.x < 0 || this.x > this.w - this.radius) {
        return false;
      }

      if (this.y < 0 || this.y > this.h - this.radius) {
        return false;
      }
      this.render();
      this.progress++;
      return true;
    }
  }]);

  return Particle;
}();

var particles = [];
var init_num = popolate(max_particles);

function popolate(num) {
  for (var i = 0; i < num; i++) {
    setTimeout(function() {
      particles.push(new Particle(canvas, i));
    }.bind(this), i * 20);
  }
  return particles.length;
}

function clear() {
  canvas.globalAlpha = 0.05;
  canvas.fillStyle = '#000155';
  canvas.fillStyle = '#000021'; // Alien
  canvas.fillRect(0, 0, tela.width, tela.height);
  canvas.globalAlpha = 1;
}

function update() {
  particles = particles.filter(function(p) {
    return p.move();
  });
  if (particles.length < init_num) {
    popolate(1);
  }
  clear();
  requestAnimationFrame(update.bind(this));
}
update();



var nav = '<div class="navbar-fixed"><nav><div class="nav-wrapper"><div class="container"><a href="#!" class="brand-logo center">'+data.title+'</a></div></div></nav></div>';
var footer = '<footer class="page-footer"><div class="footer-copyright"><div id="links" class="container">© '+data.year+' Ben eaves</div></div></footer>';

var pages= data.pages;
$('title').text(data.title);

$(tela).after(footer).after('<div id="contentData" class="row"></div><div id="modalData"></div><ul id="pagination" class="pagination center"></ul>').after(nav);

$.each(data.links, function (i,e) {
  $('#links').append('<a class="grey-text icon-'+e.icon+' right mr-30 shrink" href="'+e.href+'" target="_blank"></a>')
});

$.each(pages, function (i) {

  //console.log($(data[0]).index())
  var paginationTpl = '<li class="waves-effect"><a class="pageNum" href="#!">'+i+'</a></li>';

  $('#pagination').append(paginationTpl);


});


function loadData(page){

  $("#contentData,#modalData").empty();

  var filteredNames = $(data.codepenData).filter(function( idx ) {
      return data.codepenData[idx].href === 'page-'+page;
  });

  $(filteredNames).each(function(i,e){
    var cardTpl = '<div class="col s12 m6 l3"><div class="card shrink"><div class="card-image"><img src="'+e.img+'"> <a href="#'+e.hash+'" class="btn-floating halfway-fab waves-effect waves-light black shrink"><i class="icon-codepen"></i></a></div><div class="card-content"><p>'+e.title+'</p></div></div></div>';

    var modalTpl = '<div id="'+e.hash+'" class="modal bottom-sheet"><div class="modal-footer"></div><div class="modal-content"><p data-height="600" data-theme-id="dark" data-slug-hash="'+e.hash+'" data-default-tab="" data-user="angeal185" data-embed-version="2" data-pen-title="'+e.title+'" data-preview="true" class="codepen"></p></div></div>';
    $("#contentData").prepend(cardTpl);
    $("#modalData").prepend(modalTpl);
  });
$('#thebody').css('border','none');
  $.get("app/js/codepen.min.js"),$(".modal").modal();

}
loadData('0');


$(".pageNum").click(function(){
  var loadPage = this.text;
  loadData(loadPage);
});

setTimeout(function(){ $('canvas').css('z-index',0) }, 8000);

});


/*
$.getJSON("http://cpv2api.com/pens/public/angeal185?page=3", function(data){
  console.log(data)
});

*/
//   Random Javascript password generator
