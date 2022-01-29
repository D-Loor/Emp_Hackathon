
$(document).ready(function() {
  
    cargar();

  var content = $('.content');
  var currentItem = content.filter('.activo');
  var steps = $('.carta').filter('.steps');
  var inactive1 = $('.inactive-1');
  var inactive2 = $('.inactive-2');

  $('.boton').click(function() {
      var nextItem = currentItem.next();
      var lastItem = content.last();
      var contentFirst = content.first();
    
      currentItem.removeClass('activo');

      if (currentItem.is(lastItem)) {
          currentItem = contentFirst.addClass('activo');
          currentItem.css({'right': '10%', 'opacity': '1'});
          $('.step').animate({width: '33%'});
          inactive1.animate({height: '8px', marginLeft:'20px', marginRight:'20px'}, 100);
          inactive2.animate({height: '8px', marginLeft:'10px', marginRight:'10px'}, 100);
        
      } else if (currentItem.is(contentFirst)) {
          currentItem.animate({opacity: 0}, 1000);
          currentItem = nextItem.addClass('activo');
          $('.step').animate({width: '66%'});
          inactive2.animate({height: '0', marginLeft:'0px', marginRight:'0px'}, 100);
        
      } else {
          currentItem = nextItem.addClass('activo');
          $('.step').animate({width: '100%'});
          inactive1.animate({height: '0', marginLeft:'0px', marginRight:'0px'}, 100);
      } 
  });

});

window.onscroll = function() {myFunction()};

function myFunction() {
    var navbar = document.getElementById("myNavbar");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        navbar.className = "w3-bar" + " w3-card-2" + " w3-animate-top" + " w3-white";
    } else {
        navbar.className = navbar.className.replace(" w3-card-2 w3-animate-top w3-white", "");
    }
}

function toggleFunction() {
    var x = document.getElementById("navDemo");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}

const items = document.querySelectorAll(".accordion button");

function toggleAccordion() {
  const itemToggle = this.getAttribute('aria-expanded');
  
  for (i = 0; i < items.length; i++) {
    items[i].setAttribute('aria-expanded', 'false');
  }
  
  if (itemToggle == 'false') {
    this.setAttribute('aria-expanded', 'true');
  }
}

items.forEach(item => item.addEventListener('click', toggleAccordion));


function cargar(){

    var eventos = document.getElementById("n-eventos");
    var participantes = document.getElementById("n-participantes");
    var proyectos = document.getElementById("n-proyectos");

    
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:8000/api/info_Hackathon",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {   
            if(data['code']=="201"){

                eventos.innerHTML = data['eventos'];
                participantes.innerHTML = data['participantes'];
                proyectos.innerHTML = data['proyectos'];
                
                
            }else{
                
                eventos.innerHTML = 0;
                participantes.innerHTML = 0;
                proyectos.innerHTML =0;

            }  

        }
    });

    
}