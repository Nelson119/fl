'use strict';
/*eslint-disable new-cap, no-unused-vars, 
	no-use-before-define, no-trailing-spaces, 
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,
	key-spacing */
/*global  $, BloomingMenu, TweenMax, google, Marker */

$(function(){

	if($('#menu >ul').length){
		var left = document.createElement('div');
		$(left).addClass('left-menu').append($('#menu ul:eq(0)').clone().addClass('menu'));
		$(left).addClass('left-menu').append($('footer .social ul').clone().addClass('social'));
		$(left).appendTo($('body'));
		$('.left-menu').prepend($('.close-menu').removeClass('hide'));
		$('#menu >ul').superfish({
			animation:   {opacity:'show', height:'show'}, 
			animationOut:   {opacity:'hide', height:'hide'}
		});

		var mul = 
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
				$('.left-menu >ul.menu'),
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
				$('.left-menu >ul.menu'),
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
	var page = $('.page').attr('class').replace(/page/, '');
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
    $('.social-container').addClass(page);
    $('.locale-container').addClass(page);

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


	(function(){
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




	function initialize() {
    	var markerInfoWindow = new google.maps.InfoWindow();

		var map = new google.maps.Map(document.getElementById('map-canvas'), {
			zoom: 14,
			scrollwheel: false,
		//  (24.974891028984523, 121.52769804000853) 
			center: new google.maps.LatLng(24.974891028984523, 121.52769804000853)
		});



        // Initialize JSONP request
        var script = document.createElement('script');
        var url = ['https://www.googleapis.com/fusiontables/v1/query?'];
        url.push('sql=');
        var query = 'SELECT * FROM ' +
        '15FsqLyGDUOflrGelPOyEoF3D5937VLar3QHj2hoF';
        var encodedQuery = encodeURIComponent(query);
        url.push(encodedQuery);
        url.push('&callback=drawMap');
        url.push('&key=AIzaSyBf_sGPZtgUPenHRRZ-8nBUp7rZYru0bBo');
        script.src = url.join('');
        var body = document.getElementsByTagName('body')[0];
        body.appendChild(script);

        function drawMap(data) {
            var rows = data.rows;
            for (var i in rows) {
	            var pos =  {lat:rows[i][2].geometry.coordinates[1], lng:rows[i][2].geometry.coordinates[0]};
	            var marker = new Marker({
				    map: map,
				    position: pos,
				    icon: {
				        path: ''
				    },
				    map_icon_label: '<span class="map-icon"><img src=\'' + rows[i][3] + '\'></span>'
				});
				marker.name = rows[i][1];
				marker.description = rows[i][0];
				marker.icon = rows[i][3];

                google.maps.event.addListener(marker, 'click', function(event) {



		            var container = $('<div></div>');

		            var aside = $('<aside class=\'inmap\'></aside>');

		            aside.append('<h3 class=\'fontsize-16 font-default\'>' + this.name + '</h3>');

		            aside.append('<p class=\'fontsize-13 font-default\'>' + this.description + '</p>');

		            container.append(aside);

		            $('.inmap').remove();

		            // goto(place.index);
		            var latLng = {lat: this.getPosition().lat() + 0.0009, lng: this.getPosition().lng()};
		            map.setCenter(this.getPosition());
		            markerInfoWindow.setPosition(latLng);

		            markerInfoWindow.setContent(container.html());
		            markerInfoWindow.open(map);

                });
            }
        }

        window.drawMap = drawMap;

		google.maps.event.addDomListener(map, 'dragend', function(){
			console.log(map.getCenter());
		});

	}

	if($('#map-canvas').length){
		google.maps.event.addDomListener(window, 'load', initialize);
	}

	if($('.page.contact .contact-list').length){
    	(function(slide){

    		var slideM = slide.clone()
    			.addClass('hidden-lg')
    			.removeClass('hidden-xs')
    			.removeClass('hidden-md')
    			.removeClass('hidden-sm')

    			.insertAfter(slide);

			slide.slick({
				dots: true,
				infinite: true,
				slidesToShow: 4,
				slidesToScroll: 4,
				variableWidth: false,
				// autoplay: true,
				autoplaySpeed: 3000,
				pauseOnHover: true,
				speed: 750
			});
		}($('.page.contact .contact-list')));
    }

	$('.checkradios').checkradios();

	if($('.dropdown').length){

	    $('.dropdown-menu li a').click(function(){
	    	var container = $(this).parents('.dropdown');
			$('.btn:first-child', container).text($(this).text());
			$('.btn:first-child', container).val($(this).text());
			$(this).parents('li').addClass('selected').siblings().removeClass('selected');
	   });
	}

	if($('.albums .box-list .box').length){
		var boxes = $('.albums .box-list .box');

		$(boxes).each(function(i, d){
			$(d).on('click', function(){
				var photosetId = $(this).attr('data-photoset-id');
				var url = 'https://api.flickr.com/services/rest/' +
					'?method=flickr.photosets.getPhotos&api_key=17bf984278b8a7f246b178dd183bcdcf' +
				    '&photoset_id=' + photosetId + '&user_id=24472667%40N00&format=json';
				var s = document.createElement('script');
				s.src = url;
				$('body').append(s);
			});
		});

		window.jsonFlickrApi = function(data){
			var photos = null;
			photos = data.photoset.photo;
			var pho = [];
			$(photos).each(function(i, item){
				pho.push({
					src: 'http://farm' + item.farm + '.static.flickr.com/' + item.server + '/' + item.id + '_' + item.secret + '.jpg',
					type: 'image/jpeg',
					thumb: 'http://farm' + item.farm + '.static.flickr.com/' + item.server + '/' + item.id + '_' + item.secret + '_m.jpg'
				});

			});
			$('body').lightGallery({
				dynamic: true,
				dynamicEl: pho
			});
		};
	}

	if($('.gotop').length){
		$('.gotop').on('click', function(ev){
			// $('.gotop .fly ').attr('style', 'animation-name:\'\'');
			TweenMax.set('.gotop .fly', {
				top: ev.clientY,
				position: 'fixed'
			});
			$('.gotop .fly').fadeOut(1000, function(){
				$('.gotop .fly').removeAttr('style');
			});
			TweenMax.to('html,body', 1, {
				scrollTop: 0
			});

		});
	}

	/*
	* Replace all SVG images with inline SVG
	*/
	var count = $('img.svg').length;
	var cursor = 0;
	var dot = '...';
	// $('body').append('<style class=\'progress\'>html:after{height:' + $(window).height() + 'px;line-height:' + ($(window).height() + 62) + 'px;content:\'' + 0 + '%\';}</style>');
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

			cursor++;

			if(cursor === count){
				$('html').addClass('image-ready');
				// $('#progress').remove();
				// clearInterval(dotdotdot);
			}

		}, 'xml');

	});


	//homepage effect
	if($('.page.home').length ){
		var slideupBnr = function(){
			var winHeight = $(window).height();

			var showupArr = [];
			showupArr.push($('.home .concept li').eq(0).addClass('showup delay-1'));
			showupArr.push($('.home .concept li').eq(1).addClass('showup delay-2'));
			showupArr.push($('.home .concept li').eq(2).addClass('showup delay-3'));
			showupArr.push($('.home .bulletin li').eq(0).addClass('showup delay-1'));
			showupArr.push($('.home .bulletin li').eq(1).addClass('showup delay-2'));
			showupArr.push($('.home .bulletin li').eq(2).addClass('showup delay-3'));
			showupArr.push($('.home .news li').eq(0).addClass('showup delay-1'));
			showupArr.push($('.home .news li').eq(1).addClass('showup delay-2'));
			showupArr.push($('.home .news li').eq(2).addClass('showup delay-3'));
			showupArr.push($('.home .news li').eq(3).addClass('showup delay-1'));
			showupArr.push($('.home .news li').eq(4).addClass('showup delay-2'));
			showupArr.push($('.home .news li').eq(5).addClass('showup delay-3'));
			showupArr.push($('.home .news li').eq(6).addClass('showup delay-1'));
			showupArr.push($('.home .news li').eq(7).addClass('showup delay-2'));
			showupArr.push($('.home .news li').eq(8).addClass('showup delay-3'));
			showupArr.push($('.home .life li').eq(0).addClass('showup delay-1'));
			showupArr.push($('.home .life li').eq(1).addClass('showup delay-2'));
			showupArr.push($('.home .life li').eq(2).addClass('showup delay-3'));
			showupArr.push($('.home .life li').eq(3).addClass('showup delay-1'));
			showupArr.push($('.home .life li').eq(4).addClass('showup delay-2'));
			showupArr.push($('.home .life li').eq(5).addClass('showup delay-3'));
			showupArr.push($('.home .life li').eq(6).addClass('showup delay-1'));
			showupArr.push($('.home .life li').eq(7).addClass('showup delay-2'));
			showupArr.push($('.home .life li').eq(8).addClass('showup delay-3'));
			showupArr.push($('.home .blog li').eq(0).addClass('showup delay-1'));
			showupArr.push($('.home .blog li').eq(1).addClass('showup delay-2'));
			showupArr.push($('.home .blog li').eq(2).addClass('showup delay-3'));
			showupArr.push($('.home .blog li').eq(3).addClass('showup delay-4'));
			showupArr.push($('.home .blog li').eq(4).addClass('showup delay-5'));

			if($(window).width() >= 768){
				$.each(showupArr, function(i, d){
					if( $(window).scrollTop() + winHeight - 100 > d.offset().top){
						d.addClass('on');
					}
				});
				// if( $(window).scrollTop() + winHeight - 100 > $bnr01.offset().top){
				// 	$bnr01.addClass('on');
				// }
				// if($bnr20[0])
			}

		};
		$(window).on({
			'resize': function(){slideupBnr(); },
			'scroll': function(){slideupBnr(); }
		}).trigger('resize');

	}

});

