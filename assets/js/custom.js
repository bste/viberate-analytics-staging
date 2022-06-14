//Global vars
var windowWidth = window.innerWidth;
var oldWindowWidth = windowWidth;

var currency = 'usd';
var timeframe = 'year';

var desktopAnimationOffset = (windowWidth < 750) ?  0 : 150;

var anim1 = true;
var anim2 = true;
var anim3_0 = true;
var anim3_1 = true;
var anim3_2 = true;
var anim3_3 = true;
var anim3_4 = true;
var anim3_5 = true;
var anim4 = true;
var anim5 = true;
var anim6 = true;
var anim7 = true;
var anim9_0 = true;
var anim9_1 = true;
var anim10_0 = true;
var anim10_1 = true;

var lottieAnimationGraph;
var lottieAnimationStars;
var lottieAnimationStarsLoaded = false;
var swiperFeatureReviews;


//Functions
$.easing.custom = function (x, t, b, c, d) {
	if ((t/=d/2) < 1) return c/2*t*t + b;
	return -c/2 * ((--t)*(t-2) - 1) + b;
}

$.fn.isOnScreen = function(ifMiddlePos, elOffset){
	if (elOffset == null) {
		elOffset = 0;
	};
	var win = $(window);

	var viewport = {
		top : win.scrollTop(),
		left : win.scrollLeft()
	};

	viewport.right = viewport.left + win.width();

	if (ifMiddlePos) {
		viewport.bottom = viewport.top + win.height()/1.5;
	} else {
		viewport.bottom = viewport.top + (win.height() - elOffset);
	}

	var bounds = this.offset();
	bounds.right = bounds.left + this.outerWidth();
	bounds.bottom = bounds.top + this.outerHeight();

	return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
};


function starsOnScrollAnimation(classname) {
	let windowH = $(window).height();
	let scrollPos = $(document).scrollTop();
	let targetPos = $(classname).offset().top;

	let totalFrames = lottieAnimationStars.totalFrames;
	let animationStartPos = targetPos - windowH + 100;
	let animationHeight = 1400;
	let animationProgress = 0;

	let scrollPercentage = Math.abs((animationStartPos - scrollPos) / animationHeight)*100;

	if (scrollPos >= animationStartPos) {
		if (scrollPos > animationStartPos + animationHeight) {
			animationProgress = 100;
		} else {
			animationProgress = Math.round(scrollPercentage / totalFrames * 100);
		}
	}  else {
		animationProgress = 0;
	}

	lottieAnimationStars.goToAndStop(animationProgress, true);
}


function changePaymentTimeframe(timeframe, currency) {
	let pUsd = ['<span class="old-price">189$</span><span class="currency">$</span>117<small>/month</small>', '<span class="old-price">229$</span><span class="currency">$</span>140<small>/month</small>'];
	let pEur = ['<span class="old-price">169€</span><span class="currency">€</span>108<small>/month</small>', '<span class="old-price">199€</span><span class="currency">€</span>129<small>/month</small>'];
	let benefit = ['2 months FREE', 'Get 2 months FREE'];
	let billed = ['Billed annually', 'Billed monthly'];

	if (timeframe == 'year') {
		if (currency == 'eur') {
			$('.js-billed-price').html(pEur[0]);
		} else {
			$('.js-billed-price').html(pUsd[0]);
		}
		$('.js-billed-timeframe').text(billed[0]);
		$('.js-billed-benefit').text(benefit[0]);
	} else {
		if (currency == 'eur') {
			$('.js-billed-price').html(pEur[1]);
		} else {
			$('.js-billed-price').html(pUsd[1]);
		}
		$('.js-billed-timeframe').text(billed[1]);
		$('.js-billed-benefit').text(benefit[1]);
	}
}


function transitionBg() {
	 if ($('.js-transition-bg').isOnScreen()) {
		$('body').addClass('bg-dark');
	} else {
		$('body').removeClass('bg-dark');
	}
}


$(document).on('click', 'a[href^="#"]', function (event) {
	event.preventDefault();

	$('html, body').animate({
		scrollTop: $($.attr(this, 'href')).offset().top
	}, 1000, 'custom');
});


$(document).ready(function() {

	$.get('https://ipapi.co/currency/', function(data){
		currency = data.toLowerCase();
		changePaymentTimeframe(timeframe, currency);
	});

	lottieAnimationStars = lottie.loadAnimation({
		container: document.getElementById("lottie-stars"),
		renderer: "svg",
		loop: false,
		autoplay: false,
		path: "https://assets9.lottiefiles.com/packages/lf20_jqpkvasn.json",
		//path: "https://viberate-sfo.sfo3.cdn.digitaloceanspaces.com/landing-d/assets/lottie/lottie-stars.json",
	});

	lottieAnimationGraph = lottie.loadAnimation({
		container: document.getElementById("lottie-graph"),
		renderer: "svg",
		loop: true,
		autoplay: false,
		path: "https://assets7.lottiefiles.com/packages/lf20_jfcdgkyz.json",
		//path: "https://viberate-sfo.sfo3.cdn.digitaloceanspaces.com/landing-d/assets/lottie-graph.json",
	});

	lottieAnimationStars.addEventListener('DOMLoaded', () => {
		lottieAnimationStarsLoaded = true;
	});

	setTimeout(function() {
		lottieAnimationGraph.play();
	}, 2000);


	//Reviews swiper
	swiperFeatureReviews = new Swiper ('.js-swiper-feature-reviews', {
		spaceBetween: 24,
		roundLengths: true,
		slidesPerView: 'auto',
		freeMode: false,
		loop: false,
		centeredSlides: true,
		pagination: {
			el: '.swiper-pagination',
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		breakpoints: {
			320: {
				loop: false,
			},
			768: {
				loop: true,
				centeredSlides: false,
				freeMode: false,
				spaceBetween: 24,
				slidesPerView: 2,
				roundLengths: true,
			},
			1024: {
				loop: true,
				spaceBetween: 48,
				slidesPerView: 3,
				centeredSlides: true,
				freeMode: false,
				roundLengths: true,
			},
		},
		on: {
			breakpoint: function() {
				let currentWindowWidth = window.innerWidth;
				
				if (currentWindowWidth < 767 && oldWindowWidth > 767) {
					//console.log('from BIG TO SMALL');
					this.loopDestroy();
					this.updateSlides();
					this.updateSlidesClasses();
				} else if (currentWindowWidth > 767 && oldWindowWidth < 767) {
					//console.log('from SMALL TO BIG');
					this.loopCreate();
					this.updateSlides();
					this.updateSlidesClasses();
				}
				oldWindowWidth = currentWindowWidth;
			}
		}
	});


	//Payment packages
	$('body').on('click', '.js-btn-toggle-monthly', function() {
		$('.js-subscription-toggle').removeClass('active');
		$('.js-custom-toggle-payment').prop('checked',false);

		timeframe = 'month';
		changePaymentTimeframe(timeframe, currency);
	});

	$('body').on('click', '.js-btn-toggle-yearly', function() {
		$('.js-subscription-toggle').addClass('active');
		$('.js-custom-toggle-payment').prop('checked',true);

		timeframe = 'year';
		changePaymentTimeframe(timeframe, currency);
	});

	$('body').on('click', '.js-custom-toggle-payment', function() {
		$('.js-subscription-toggle').toggleClass('active');

		if (timeframe == 'year') {
			timeframe = 'month';
		} else {
			timeframe = 'year';
		}

		changePaymentTimeframe(timeframe, currency);
	});

	//Payment feature comparison
	$('body').on('click', '.js-btn-pricing-plan-comparison', function() {
		$('.js-compare-plan-table').slideToggle();
		$(this).toggleClass('open');
	});


	//Problem solving cards
	$('body').on('click', '.js-problem-solving-card', function() {
		let el = $(this);
		let elIndex = el.attr('data-item');

		if (!el.hasClass('open')) {
			el.closest('.problem-solving-main').find('.open').removeClass('open initial-open').find('.js-hotspot-wrapper').slideUp('fast');
			el.toggleClass('open');
			el.find('.js-hotspot-wrapper').slideToggle('fast');
		} else {
			el.toggleClass('open');
			el.find('.js-hotspot-wrapper').slideToggle('fast');
		}

		el.closest('.problem-solving-main').find('.js-problem-solving-card').removeClass('initial-open');
		$('.js-problem-solving-main-gradient').removeClass('g-0 g-1 g-2 g-3').addClass('g-' + elIndex);
		$('.js-problem-category').removeClass('active').eq(elIndex).addClass('active');
	});

	$('body').on('click', '.js-problem-category', function() {
		let el = $(this);
		let els = $('.js-problem-category');
		let elIndex = el.index();
		let elCard = $('.js-problem-solving-card');

		els.removeClass('active');
		elCard.removeClass('open initial-open');
		el.toggleClass('active');
		$('.js-problem-solving-card[data-item="' + elIndex + '"]').addClass('open');
		$('.js-problem-solving-main-gradient').removeClass('g-0 g-1 g-2 g-3').addClass('g-' + elIndex);
	});


	//Video
	if ($('.js-transition-bg').length) {
		transitionBg('js-transition-bg');
	}

	$('body').on('click', '.js-video', function() {
		let video = $(this).get(0);

		if (video.paused) {
			video.play();
			$(".js-btn-video").fadeOut();
		} else {
			video.pause();
			$(".js-btn-video").fadeIn();
		}

		return false;
	});


	//Reviews custom navigation
	$('body').on('click', '.js-prev', function() {
		$('.swiper-button-prev').trigger('click');
	});

	$('body').on('click', '.js-next', function() {
		$('.swiper-button-next').trigger('click');
	});


	//FAQ questions
	$('body').on('click', '.js-faq-item', function() {
		let el = $(this);

		if (el.hasClass('open')) {
			el.toggleClass('open').find('.js-faq-item-content').slideToggle().css('opacity', 1).animate({opacity: 0}, {queue: false, duration: 800});
		} else {
			el.toggleClass('open').find('.js-faq-item-content').slideToggle().css('opacity', 0).animate({opacity: 1}, {queue: false, duration: 800});
		}
	});


	//Footer
	$('body').on('click', '.js-footer-menu-header', function() {
		$(this).parent().toggleClass('open');
	});
});


$(window).scroll(function() {
	if ($('.section-why-viberate .js-animated-title').isOnScreen(true) && anim1) {
		$('.section-why-viberate .js-animated-title').addClass('animated');
		anim1 = false;
	}

	if ($('.section-get-important-data .js-fade-in-slide-up').isOnScreen(false, 0 + desktopAnimationOffset) && anim2) {
		$('.section-get-important-data .js-fade-in-slide-up').addClass('animated');
		anim2 = false;
	}

	$('.section-get-important-data .js-fade-in').each(function(index){

		if ($(this).isOnScreen(false, 100 + desktopAnimationOffset) && window['anim3_' + index]) {
			$(this).addClass('animated');
			window['anim3_' + index] = false;
		}
	});

	if ($('.section-solving-your-problems .js-fade-in-slide-up').isOnScreen(false, 100 + desktopAnimationOffset) && anim4) {
		$('.section-solving-your-problems .js-fade-in-slide-up').addClass('animated');
		anim4 = false;
	}

	if ($('.section-payment-landing .js-fade-in-slide-up').isOnScreen(false, 50 + desktopAnimationOffset) && anim5) {
		$('.section-payment-landing .js-fade-in-slide-up').addClass('animated');
		anim5 = false;
	}

	if ($('.section-payment-landing .js-payment-plan-grid').isOnScreen(true) && anim6) {
		$('.section-payment-landing .js-payment-plan-grid').addClass('animated');
		anim6 = false;
	}

	if ($('.section-reviews .lottie-container').isOnScreen(false, 0 + desktopAnimationOffset) && anim7) {
		if (lottieAnimationStarsLoaded) {
			lottieAnimationStars.play();
			anim7 = false;
		}
	}

	$('.section-breaking-through .js-fade-in-slide-up').each(function(index){
		if ($(this).isOnScreen(false, 0 + desktopAnimationOffset) && window['anim9_' + index]) {
			$(this).addClass('animated');
			window['anim9_' + index] = false;
		}
	});

	/*$('.section-breaking-through .js-slide-up').each(function(index){
		if ($(this).isOnScreen(false, 0 + desktopAnimationOffset) && window['anim10_' + index]) {
			$(this).addClass('animated');
			window['anim10_' + index] = false;
		}
	});*/

	if ($('.js-transition-bg').length) {
		transitionBg('js-transition-bg');
	}

	if ($('.section-breaking-through .mobile-icons.js-slide-up').isOnScreen(false, 0 + desktopAnimationOffset) && anim10_0) {
		$('.section-breaking-through .mobile-icons.js-slide-up').addClass('animated');
		anim10_0 = false;
	}

	if ($('.section-breaking-through .bg-icons.js-slide-up').isOnScreen(true, 0 + desktopAnimationOffset) && anim10_1) {
		$('.section-breaking-through .bg-icons.js-slide-up').addClass('animated');
		anim10_1 = false;
	}

	if ($('.js-footer').isOnScreen(false, 0) && windowWidth < 700) {
		$('body').addClass('footer-visible');
	} else {
		$('body').removeClass('footer-visible');
	}

	//starsOnScrollAnimation('#lottie-stars');
});