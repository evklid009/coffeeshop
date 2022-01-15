
/* slider */

$(document).ready(function(){
	$('.slider ul').bxSlider({
		pager: false,
		controls: true,
		auto: false,
		pause: 10000,
		minSlides: 3,
		maxSlides: 3,
		slideMargin: 20,   
		slideWidth: 300       
	});
});

/* button up */

$(function() {
 
	$(window).scroll(function() {  
		if($(this).scrollTop() != 0) {
			$('#toTop').fadeIn();     
    } else { 
		$('#toTop').fadeOut();     
    }     
    });     
    $('#toTop').click(function() { 
		$('body,html').animate({scrollTop:0},500);     
    });     
});

/* otline cards */


const btnBrazil = document.querySelector(".brazil");
const cardBrazil = document.querySelectorAll(".brc");

btnBrazil.addEventListener("click", function () {
    cardBrazil.forEach((element) => {
        element.classList.add("class-b");
    });
});


const btnKenya = document.querySelector(".kenya");
const cardKenya = document.querySelectorAll(".ken");

btnKenya.addEventListener("click", function () {
    cardKenya.forEach((element) => {
        element.classList.add("class-k");

    });
});

const btnColumbia = document.querySelector(".columbia");
const cardColumbia = document.querySelectorAll(".columb");

btnColumbia.addEventListener("click", function () {
    cardColumbia.forEach((element) => {
        element.classList.add("class-c");
    });
});


/* popup */

var delay_popup = 100000;
setTimeout("document.getElementById('overlay').style.display='block'", delay_popup);

/* timer */

window.addEventListener('DOMContentLoaded', () => {

    timer('.timer', '2022-03-15');
	calculator();

	function timer(id, deadline) {


		function getTimeRemaining(endtime) {
			const t = Date.parse(endtime) - Date.parse(new Date()),
				days = Math.floor( (t/(1000*60*60*24)) ),
				seconds = Math.floor( (t/1000) % 60 ),
				minutes = Math.floor( (t/1000/60) % 60 ),
				hours = Math.floor( (t/(1000*60*60) % 24) );
	
			return {
				'total': t,
				'days': days,
				'hours': hours,
				'minutes': minutes,
				'seconds': seconds
			};
		}
	
		function getZero(num){
			if (num >= 0 && num < 10) { 
				return '0' + num;
			} else {
				return num;
			}
		}
	
		function setClock(selector, endtime) {
	
			const timer = document.querySelector(selector),
				days = timer.querySelector("#days"),
				hours = timer.querySelector('#hours'),
				minutes = timer.querySelector('#minutes'),
				seconds = timer.querySelector('#seconds'),
				timeInterval = setInterval(updateClock, 1000);
	
			updateClock();
	
			function updateClock() {
				const t = getTimeRemaining(endtime);
	
				days.innerHTML = getZero(t.days);
				hours.innerHTML = getZero(t.hours);
				minutes.innerHTML = getZero(t.minutes);
				seconds.innerHTML = getZero(t.seconds);
	
				if (t.total <= 0) {
					clearInterval(timeInterval);
				}
			}
		}
	
		setClock(id, deadline);
	}

	// calculator

	function calculator() {

		const result = document.querySelector('.calculating__result span');
	
	
		let sex, height, weight, age, ratio;
	
		if(localStorage.getItem('sex')) {
			sex = localStorage.getItem('sex');
		}else {
			sex = 'female';
			localStorage.setItem('sex', 'female');
		}
	
		if(localStorage.getItem('ratio')) {
			ratio = localStorage.getItem('ratio');
		}else {
			ratio = 1.175;
			localStorage.setItem('ratio', 1.175);
		}
	
		function initLocalSettings(selector,activeClass) {
			const elements = document.querySelectorAll(selector);
	
			elements.forEach(elem => {
				elem.classList.remove(activeClass);
				if(elem.getAttribute('id') === localStorage.getItem('sex')) {
					elem.classList.add(activeClass);
				}
				if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
					elem.classList.add(activeClass);
				}
	
			});            
			
		}
		initLocalSettings('#gender div', 'calculating__choose-item_active');
		initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
	
	
		function calcTotal() {
			if(!sex || !height || !weight || !age || !ratio) {
				result.textContent = '0000';
				return;
			}
	
			if (sex === 'female') {
				result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
			} else {
				result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
			}
		}
	
		calcTotal();
	
		function getStaticInformation(selector, activeClass) {
			const elements = document.querySelectorAll(selector);
	
			elements.forEach(elem => {
				elem.addEventListener('click', (e) => {
					if (e.target.getAttribute('data-ratio')) {
						ratio = +e.target.getAttribute('data-ratio');
						localStorage.setItem('ratio',+e.target.getAttribute('data-ratio'));
					} else {
						sex = e.target.getAttribute('id');
						localStorage.setItem('sex',e.target.getAttribute('id'));
					}
		
					elements.forEach(elem => {
						elem.classList.remove(activeClass);
					});
		
					e.target.classList.add(activeClass);
		
					calcTotal();
				});
			});
		}
	
		getStaticInformation('#gender div', 'calculating__choose-item_active');
		getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');
	
	
		function getDynamicInformation(selector) {
			const input = document.querySelector(selector);
	
			input.addEventListener('input', () => {
				if(input.value.match(/\D/g)) {
					input.style.background = 'red';
				} else {
					input.style.background = 'none';
					
				}
	
				switch(input.getAttribute('id')) {
					case "height":
						height = +input.value;
						break;
					case "weight":
						weight = +input.value;
						break;
					case "age":
						age = +input.value;
						break;
				}
	
				calcTotal();
			});
		}
	
		getDynamicInformation('#height');
		getDynamicInformation('#weight');
		getDynamicInformation('#age');
	}

});

// снежинки
let snowmax=40
 
let snowcolor=new Array("#b9dff5","#7fc7ff","#7fb1ff","#7fc7ff","#b9dff5")
 
let snowtype=new Array("Times")
 
let snowletter="&#10052;"
 
let sinkspeed=0.4
 
let snowmaxsize=40
 
let snowminsize=10
 
// Зона для снежинок
// 1 для всей страницы, 2 в левой части страницы
// 3 в центральной части, 4 в правой части страницы
let snowingzone=1
 
 
let snow=new Array();
let marginbottom;
let marginright;
let timer;
let i_snow=0;
let x_mv=new Array();
let crds=new Array();
let lftrght=new Array();
function randommaker(range) {
    rand=Math.floor(range*Math.random());
    return rand;
}
function initsnow() {
    marginbottom = document.documentElement.clientHeight+50
    marginright = document.body.clientWidth-15
    let snowsizerange=snowmaxsize-snowminsize
    for (i=0;i<=snowmax;i++) {
        crds[i] = 0;
        lftrght[i] = Math.random()*15;
        x_mv[i] = 0.03 + Math.random()/10;
        snow[i]=document.getElementById("s"+i)
        snow[i].style.fontFamily=snowtype[randommaker(snowtype.length)]
        snow[i].size=randommaker(snowsizerange)+snowminsize
        snow[i].style.fontSize=snow[i].size+'px';
        snow[i].style.color=snowcolor[randommaker(snowcolor.length)]
        snow[i].style.zIndex=1000
        snow[i].sink=sinkspeed*snow[i].size/5
        if (snowingzone==1) {snow[i].posx=randommaker(marginright-snow[i].size)}
        if (snowingzone==2) {snow[i].posx=randommaker(marginright/2-snow[i].size)}
        if (snowingzone==3) {snow[i].posx=randommaker(marginright/2-snow[i].size)+marginright/4}
        if (snowingzone==4) {snow[i].posx=randommaker(marginright/2-snow[i].size)+marginright/2}
        snow[i].posy=randommaker(2*marginbottom-marginbottom-2*snow[i].size)
        snow[i].style.left=snow[i].posx+'px';
        snow[i].style.top=snow[i].posy+'px';
    }
    movesnow()
}
function movesnow() {
    for (i=0;i<=snowmax;i++) {
        crds[i] += x_mv[i];
        snow[i].posy+=snow[i].sink
        snow[i].style.left=snow[i].posx+lftrght[i]*Math.sin(crds[i])+'px';
        snow[i].style.top=snow[i].posy+'px';
        
        if (snow[i].posy>=marginbottom-2*snow[i].size || parseInt(snow[i].style.left)>(marginright-3*lftrght[i])){
            if (snowingzone==1) {snow[i].posx=randommaker(marginright-snow[i].size)}
            if (snowingzone==2) {snow[i].posx=randommaker(marginright/2-snow[i].size)}
            if (snowingzone==3) {snow[i].posx=randommaker(marginright/2-snow[i].size)+marginright/4}
            if (snowingzone==4) {snow[i].posx=randommaker(marginright/2-snow[i].size)+marginright/2}
            snow[i].posy=0
        }
    }
    let timer=setTimeout("movesnow()",50)
}
 
for (i=0;i<=snowmax;i++) {
    document.body.insertAdjacentHTML('beforeend', "<span id='s"+i+"' style='user-select:none;position:fixed;top:-"+snowmaxsize+"'>"+snowletter+"</span>")
}
window.onload=initsnow  



