jQuery(function($){

	var carousels = $('.posts_box').find('.carousel');

	carousels.on('init', function() {

		if (typeof Carousel !== 'function') {
			return;
		}

		var args = {
			infinite: true,
			center: false,
			transition: 'slide',
			slidesPerPage: 1,
			classes: {
				container: 'carousel',
				viewport: 'carousel-viewport',
				track: 'carousel-track',
				slide: 'item'
			},
			Dots: {
				classes: {
					list: 'carousel-dots',
					isDynamic: 'is-dynamic',
					hasDots: 'has-dots',
					dot: 'dot',
					isBeforePrev: 'is-before-prev',
					isPrev: 'is-prev',
					isCurrent: 'is-current',
					isNext: 'is-next',
					isAfterNext: 'is-after-next'
				},
				dotTpl: '<button type="button" data-carousel-page="%i" aria-label="{{GOTO}}"></button>'
			},
			Navigation: {
				classes: {
					container: 'carousel-nav',
					button: 'carousel-button',
					isNext: 'is-next',
					isPrev: 'is-prev'
				},
				nextTpl: '',
				prevTpl: ''
			}
		};

		var carousel = new Carousel(this, args);

		$(this).data('carousel', carousel);

	});

	carousels.trigger('init');

});