
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

    timer('.timer', '2022-01-15');
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


