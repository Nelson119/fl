'use strict';
/*eslint-disable new-cap, no-unused-vars, 
	no-use-before-define, no-trailing-spaces, 
	no-mixed-spaces-and-tabs, no-multi-spaces,
	key-spacing */
/*global  $, BloomingMenu */

$(function(){
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
	if($('#menu >ul').length){
		$('body').append($('#menu ul:eq(0)').clone().addClass('left-menu'));
		$('#menu >ul').superfish({
			animation:   {opacity:'show', height:'show'}, 
			animationOut:   {opacity:'hide', height:'hide'}
		});
		$('#slidedown-menu').on('click', function(ev){
			if($('header').hasClass('on')){
				$('header').removeClass('on');
				$('body').removeClass('menuon');
				$('header .mobile-menu li').removeClass('on');
			}else{
				TweenMax.set('html,body', {scrollTop: 0});
				$('header').addClass('on');
				$('body').addClass('menuon');
			}
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
			variableWidth: false,
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

		}, 'xml');
    });
});

