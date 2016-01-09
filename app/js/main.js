'use strict';
/*eslint-disable new-cap, no-unused-vars, 
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,
	key-spacing */
/*global  $, BloomingMenu, TweenMax, TimelineMax, google, Marker */

$(function(){

	function imageReady(){


		//blooms 
		(function(window){
			var page = $('.page').attr('class').replace(/page/, '');
			$('body').append('<div id=\'bloom-container\'></div>');
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
		    $('.locale-item-btn:eq(0)').attr('onclick','doGTranslate(\'zh-TW|zh-CN\')');
		    $('.locale-item-btn:eq(1)').attr('onclick','doGTranslate(\'zh-TW|zh-TW\')');
		    $('.social-item-btn:eq(0)').on('click', function(i, d){
		    	var url = location.href ;
		    	var title = $('h1').text();
		    	window.open('https://www.facebook.com/sharer.php?u='+encodeURIComponent(url)+'&t='+encodeURIComponent(title));
		    });
		    $('.social-item-btn:eq(1)').on('click', function(i, d){
		    	var url = location.href ;
		    	var title = $('h1').text();
		    	window.open('https://plus.google.com/share?url='+encodeURIComponent(url)+'&title='+encodeURIComponent(title));
		    });
		    $('.social-item-btn:eq(2)').on('click', function(i, d){
		    	var url = location.href ;
		    	var title = $('h1').text();
		    	window.open('http://line.me/R/msg/text/?'+encodeURIComponent(url+'\r\n'+title));
		    });
		    $('.social-item-btn:eq(3)').on('click', function(i, d){
		    	window.open('https://www.youtube.com/user/filexkids');
		    });
		    $('.social-item-btn:eq(4)').on('click', function(i, d){
		    	var url = location.href ;
		    	var title = $('h1').text();
		    	window.open('http://share.baidu.com/s?type=text&searchPic=1&sign=on&to=tsina&url='+url+'&title='+title+'&key=595885820');
		    });

		    $('#bloom-container').append($('.social-container, .locale-container'));
		    $('#bloom-container').addClass(page);
	    	var offset = $('#bloom-container').offset().top - 220;
	    	var butt = $(document).height() - 710;
	    	var offsetButt = butt - 220;
	    	$('body').append('<style>#bloom-container.butt{top:' + butt + 'px!important}</style>');
		    $(window).on('scroll resize', function(){
		    	var st = $(window).scrollTop();
		    	if(st > offset){
		    		$('#bloom-container').addClass('fixed');
		    	}else{
		    		$('#bloom-container').removeClass('fixed');
		    	}
		    	if(st > offsetButt){
		    		$('#bloom-container').addClass('butt');
		    	}else{
		    		$('#bloom-container').removeClass('butt');
		    	}
		    });


		}(window));

	}


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
			speed: 2000,
			cssEase: 'ease-out'
		});
		$('#kvm ul').slick({
			infinite: true,
			slidesToShow: 1,
			variableWidth: true,
			centerMode: true,
			autoplaySpeed: 3000,
			pauseOnHover: true,
			speed: 750,
			cssEase: 'ease-in-out'
		});
	}

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

		var mapicon = $('.map-icon').clone();
		$('.map-icon').remove();

        function drawMap(data) {
            var rows = data.rows;
            for (var i in rows) {
	            var pos =  {lat:rows[i][2].geometry.coordinates[1], lng:rows[i][2].geometry.coordinates[0]};
	            var pin = $('<div></div').append(mapicon.clone());
	            $('img', pin).attr('src', $('img', pin).attr('src') + rows[i][3]);
	            var marker = new Marker({
				    map: map,
				    position: pos,
				    icon: {
				        path: ''
				    },
				    map_icon_label: pin.html()
				});
				marker.name = rows[i][1];
				marker.description = rows[i][0];
				marker.icon = rows[i][3];

				marker.addListener('click', function() {
		            var container = $('<div></div>');

		            var aside = $('<aside class=\'inmap\'></aside>');

		            aside.append('<h3 class=\'fontsize-16 font-default\'>' + this.name + '</h3>');

		            aside.append('<p class=\'fontsize-13 font-default\'>' + this.description + '</p>');

		            container.append(aside);

		            $('.inmap').remove();
		            var latLng = {lat: this.getPosition().lat() + 0.0009, lng: this.getPosition().lng()};
		            markerInfoWindow.setPosition(latLng);
		            markerInfoWindow.setContent(container.html());
		            markerInfoWindow.open(map);
					$('.gm-style-iw').parent().css('margin-top', '-55px');
				});

				// assuming you also want to hide the infowindow when user mouses-out
				// marker.addListener('mouseout', function() {
				//     markerInfoWindow.close();
				// });
            }
			$('html').addClass('image-ready');
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

			if(cursor === count) {
				if(!$('#map-canvas').length || $(window).width() < 1170) {
					$('html').addClass('image-ready');
				}
				imageReady();
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

			if($(window).width() >= 1170){
				$.each(showupArr, function(i, d){
					try{
						if( $(window).scrollTop() + winHeight - 100 > d.offset().top){
							d.addClass('on');
						}

					}finally{
						return true;
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
		});

	}
	if($('.gotop').length){
		$('.gotop').on('click', function(ev){
			// $('.gotop .fly ').attr('style', 'animation-name:\'\'');
			var tl = new TimelineMax({
				paused: true
			});

			tl.set('.gotop .fly', {
				top: ev.clientY,
				position: 'fixed'
			});
			tl.add([
				function(){
					$('.gotop').removeClass('showup');
			}]);
			tl.add([
				TweenMax.to('body', 1, {
					scrollTop: 0
				})
			]);
			tl.add([
				TweenMax.to('.gotop .fly', 0.25, {
					opacity: 0
				})
			]);
			tl.add([
				function(){
					$('.gotop .fly').removeAttr('style');
					$('.gotop').addClass('showup');
			}]);
			tl.play();

		});

		$('.gotop').addClass('showup delay-1');
		var scrollGotoTop = function(){
			var winHeight = $(window).height();

			if($(window).width() >= 768){
				var d = $('.gotop');
				if( $(window).scrollTop() + winHeight - 100 > d.offset().top){
					d.addClass('on');
				}else{
					d.removeClass('on');
				}
			}

		};
		$(window).on({
			'resize': function(){scrollGotoTop(); },
			'scroll': function(){scrollGotoTop(); }
		});
	}

	if($('.filter-dropdown').length){
		$('.filter-dropdown li').on('click', function(){
			console.log($('#dropdownSchool').val() && $('#dropdownYear').val());
			console.log($('#dropdownSchool').val());
			console.log($('#dropdownYear').val());
			if($('#dropdownSchool').val() && $('#dropdownYear').val()){
				location.href = $('.filter-link').attr('href') + $('#dropdownSchool').val() + '/' + $('#dropdownYear').val() + '/';
			}
		});
	}

	$(window).trigger('resize');
});

