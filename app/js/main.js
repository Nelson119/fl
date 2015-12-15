'use strict';
/*eslint-disable new-cap, no-unused-vars, 
	no-use-before-define, no-trailing-spaces, 
	no-mixed-spaces-and-tabs, no-multi-spaces,
	key-spacing */
/*global  $, BloomingMenu, TweenMax */


$(function(){
	if($('#menu >ul').length){
		var left = document.createElement('div');
		$(left).addClass('left-menu').append($('#menu ul:eq(0)').clone());
		$(left).appendTo($('body'));
		$('.left-menu').prepend($('.close-menu'));
		$('#menu >ul').superfish({
			animation:   {opacity:'show', height:'show'}, 
			animationOut:   {opacity:'hide', height:'hide'}
		});
		$('#slidedown-menu').on('click', function(ev){
			TweenMax.set('html,body', {scrollTop: 0});
			$('body').addClass('menuon');
			$('.left-menu').css('height', 'auto');
			$('.left-menu').fadeIn(550);
			$('.left-menu >ul').hide().fadeIn(550);
			TweenMax.set(
				$('.left-menu >ul >li >a'),
				{
					lineHeight:'11em',
					opacity:0.01
				}
			);
			TweenMax.set(
				$('.left-menu >ul'),
				{
					marginTop:'200px'
				}
			);
			TweenMax.to(
				$('.left-menu >ul >li >a'),
				0.75,
				{
					lineHeight:'3em',
					opacity: 1,
					onComplete: function(){
						$('header, footer, .page, #kv, #kvm').css('position', 'fixed');
					}
				}
			);
			TweenMax.to(
				$('.left-menu >ul'),
				0.55,
				{
					marginTop:'70px'
				}
			);

		});
		$('.close-menu').on('click', function(){
			$('.left-menu').fadeOut(550);
			$('.left-menu >ul').fadeOut(550, function(){
				$('.left-menu').css('height', 'auto');
				$('body').removeClass('menuon');
				$('header, footer, .page, #kv, #kvm, body').removeAttr('style');
				$('header .mobile-menu li').removeClass('on');
			});
		});

		$('.left-menu >ul >li ul').each(function(i, d){
			var o = $(this).parent();
			o.addClass('child-closed');
			$('>a', o).on('click', function(){
				if(!o.hasClass('child-opened')){					
					o.addClass('child-opened');
					TweenMax.set(
						$('li a', o),
						{
							lineHeight: '11em',
							opacity: 0.01
						}
					);
					TweenMax.to(
						$('li a', o),
						0.55,
						{
							lineHeight: '3em',
							opacity: 1
						}
					);
					$('ul', o).fadeIn(550);
				}else{
					$('ul', o).slideUp(250);
					o.removeClass('child-opened');
				}
			});
		});
	}
	if($('#kv').length){
		$('#kv').clone().attr('id', 'kvm').removeAttr('class').insertAfter($('#kv'));
		$('#kv ul').slick({
			dots: true,
			infinite: true,
			slidesToShow: 1,
			centerMode: true,
			variableWidth: true,
			autoplay: true,
			autoplaySpeed: 3000,
			pauseOnHover: true,
			speed: 750
		});
		$('#kvm ul').slick({
			// dots: true,
			infinite: true,
			slidesToShow: 1,
			variableWidth: true,
			centerMode: true,
			// autoplay: true,
			autoplaySpeed: 3000,
			pauseOnHover: true,
			speed: 750
		});
	}

    var socialMenu = new BloomingMenu({
      startAngle: 90,
      endAngle: 270,
      radius: 100,
      itemsNum: 5,
      itemAnimationDelay: 0.08,
      CSSClassPrefix: 'social-'
    });
    socialMenu.render();
    var localeMenu = new BloomingMenu({
      startAngle: 200,
      endAngle: 160,
      radius: 100,
      itemsNum: 2,
      itemAnimationDelay: 0.08,
      CSSClassPrefix: 'locale-'
    });
    localeMenu.render();
    $('.locale-item, .social-item').each(function(i, d){
    	var o = this;

    	var imgURL = $('button', o).css('background-image').replace(/url\(|\)|'|"/ig, '');

    	$.get(imgURL, function(data) {
			// Get the SVG tag, ignore the rest
			var $svg = $(data).find('svg');

			// Remove any invalid XML tags as per http://validator.w3.org
			$svg = $svg.removeAttr('xmlns:a');

			// Replace image with new SVG
			$('button', o).append($svg);

			$('button', o).css('background-image', 'url()');

			$('button', o).eq(0).on('click', function(){

			});

		}, 'xml');
    });

    $(window).on('scroll', function(){
    	var st = $(window).scrollTop();
    	if(st > 500){
    		$('.social-container, .locale-container').addClass('fixed');
    	}else{
    		$('.social-container, .locale-container').removeClass('fixed');
    	}
    });

    if($('.page.home .life .slide-container')){
    	(function(slide){

    		var slideM = slide.clone()
    			.addClass('slide-container-mobile')
    			.removeClass('slide-container')

    			.insertAfter(slide);

    		$('ul', slide).slick({
				dots: true,
				infinite: true,
				slidesToShow: 3,
				slidesToScroll: 3,
				variableWidth: false,
				// autoplay: true,
				autoplaySpeed: 3000,
				pauseOnHover: true,
				speed: 750
    		});

    		$('ul', slideM).slick({
				dots: true,
				infinite: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				// variableWidth: true,
				// autoplay: true,
				autoplaySpeed: 3000,
				pauseOnHover: true,
				speed: 250
    		});

    	}($('.page.home .life .slide-container')));
    }


	$(function(){
		var arr = [];
		if($('.page.home .concept li a').length){
			$('.page.home .concept li a').each(function(){
				arr.push(this);
			});			
		}

		$(window).on('scroll resize', function(){
			if($(window).width() >= 1170){
				return;
			}
			var headerH = $('.header').height();
			var scrollTop = $(window).scrollTop();
			$(arr).each(function(i, d){
				if( 
					scrollTop > $(d).offset().top - $(window).height() + $(d).height() / 2 
					&& scrollTop < $(d).offset().top 
				){
					$(d).addClass('on');
				}else{
					$(d).removeClass('on');
				}
			});
		});
	}());
	/*
	* Replace all SVG images with inline SVG
	*/
	$('img.svg').each(function(){
		var $img = $(this);
		var imgID = $img.attr('id');
		var imgClass = $img.attr('class');
		var imgURL = $img.attr('src');

		$.get(imgURL, function(data) {
			// Get the SVG tag, ignore the rest
			var $svg = $(data).find('svg');

			// Add replaced image's ID to the new SVG
			if(typeof imgID !== 'undefined') {
				$svg = $svg.attr('id', imgID);
			}
			// Add replaced image's classes to the new SVG
			if(typeof imgClass !== 'undefined') {
				$svg = $svg.attr('class', imgClass + ' replaced-svg');
			}

			// Remove any invalid XML tags as per http://validator.w3.org
			$svg = $svg.removeAttr('xmlns:a');

			// Replace image with new SVG
			$img.replaceWith($svg);

		}, 'xml');

	});
});

