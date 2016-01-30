'use strict';
/*eslint-disable new-cap, no-unused-vars, 
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native*/
/*global  $, BloomingMenu, TweenMax, TimelineMax, google, Marker, _, highlightDates */

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
		    $('.social-item-btn:eq(4)').on('click', function(i, d){
		    	var url = location.href;
		    	var title = $('h1').text();
		    	window.open('https://www.facebook.com/sharer.php?u='+encodeURIComponent(url)+'&t='+encodeURIComponent(title));
		    });
		    $('.social-item-btn:eq(3)').on('click', function(i, d){
		    	var url = location.href;
		    	var title = $('h1').text();
		    	window.open('https://plus.google.com/share?url='+encodeURIComponent(url)+'&title='+encodeURIComponent(title));
		    });
		    $('.social-item-btn:eq(2)').on('click', function(i, d){
		    	var url = location.href;
		    	var title = $('h1').text();
		    	window.open('http://line.me/R/msg/text/?'+encodeURIComponent(url+'\r\n'+title));
		    });
		    $('.social-item-btn:eq(1)').on('click', function(i, d){
		    	window.open('https://www.youtube.com/user/filexkids');
		    });
		    $('.social-item-btn:eq(0)').on('click', function(i, d){
		    	var url = location.href;
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

	var mesos = [
	    '一月',
	    '二月',
	    '三月',
	    '四月',
	    '五月',
	    '六月',
	    '七月',
	    '八月',
	    '九月',
	    '十月',
	    '十一月',
	    '十二月'
	];

	var dies = [
	    '星期日',
	    '星期一',
	    '星期二',
	    '星期三',
	    '星期四',
	    '星期五',
	    '星期六'
	];

	var dies_abr = [
	    '日',
	    '一',
	    '二',
	    '三',
	    '四',
	    '五',
	    '六'
	];

	Number.prototype.pad = function(num) {
	    var str = '';
	    for(var i = 0; i < (num-this.toString().length); i++)
	        str += '0';
	    return str += this.toString();
	};

	function calendari(widget, data)
	{
		var postType = $('body').attr('data-archive-post-type');
		var school = /.*[?|&]school=(.*)[&|#]+.*/ig.test(location.href) ? decodeURIComponent(location.href.replace(/.*[?|&]school=(.*)[&|#]+.*/ig,'$1')) : '';
		var pagename = $('body').attr('data-archive-pagename');
	    var siteUrl = $('h1 a').attr('href');

	    if(!pagename && !postType){
	    	postType = 'post';
	    }

	    var original = widget.getElementsByClassName('actiu')[0];

	    if(typeof original === 'undefined')
	    {
	        original = document.createElement('table');
	        original.setAttribute('data-actual',
				      data.getFullYear() + '/' +
				      data.getMonth().pad(2) + '/' +
				      data.getDate().pad(2));
	        widget.appendChild(original);
	    }

	    var diff = data - new Date(original.getAttribute('data-actual'));

	    diff = new Date(diff).getMonth();

	    var e = document.createElement('table');

	    e.className = diff  === 0 ? 'amagat-esquerra' : 'amagat-dreta';
	    e.innerHTML = '';

	    widget.appendChild(e);

	    e.setAttribute('data-actual',
	                   data.getFullYear() + '/' +
	                   data.getMonth().pad(2) + '/' +
	                   data.getDate().pad(2));

	    var fila = document.createElement('tr');
	    var titol = document.createElement('th');
	    titol.setAttribute('colspan', 7);

	    var boto_prev = document.createElement('button');
	    boto_prev.className = 'boto-prev';
	    boto_prev.innerHTML = '&#9666;';

	    var boto_next = document.createElement('button');
	    boto_next.className = 'boto-next';
	    boto_next.innerHTML = '&#9656;';

	    titol.appendChild(boto_prev);

	    var anyUrl = '';
	    if(!pagename){
	    	anyUrl = siteUrl + '?post_type=' + postType + '&filter_year=' + data.getFullYear();
	    }else{
	    	anyUrl = siteUrl + '?pagename=' + pagename + '&school=' + school + '&filter_year=' + data.getFullYear();
	    }
	    titol.appendChild(document.createElement('a')).innerHTML = 

	        mesos[data.getMonth()] + '<a class="any" href="'+anyUrl+'">' + data.getFullYear() + '</a>';

	    titol.appendChild(boto_next);

	    boto_prev.onclick = function() {
	        data.setMonth(data.getMonth() - 1);
	        calendari(widget, data);
	    };

	    boto_next.onclick = function() {
	        data.setMonth(data.getMonth() + 1);
	        calendari(widget, data);
	    };

	    fila.appendChild(titol);
	    e.appendChild(fila);

	    fila = document.createElement('tr');

	    for(var i = 1; i < 7; i++)
	    {
	        fila.innerHTML += '<th>' + dies_abr[i] + '</th>';
	    }

	    fila.innerHTML += '<th>' + dies_abr[0] + '</th>';
	    e.appendChild(fila);

	    /* Obtinc el dia que va acabar el mes anterior */
	    var inici_mes =
	        new Date(data.getFullYear(), data.getMonth(), -1).getDay();

	    var actual = new Date(data.getFullYear(),
				  data.getMonth(),
				  -inici_mes);

	    /* 6 setmanes per cobrir totes les posiblitats
	     *  Quedaria mes consistent alhora de mostrar molts mesos 
	     *  en una quadricula */
	    for(var s = 0; s < 6; s++)
	    {
	        var fila = document.createElement('tr');

	        for(var d = 1; d < 8; d++)
	        {
		    var cela = document.createElement('td');
		    var a = document.createElement('a');

		    var celaUrl = '';
		    if(!pagename){
		    	celaUrl = siteUrl + '?post_type=' + postType + '&filter_year=' + 
	    		actual.getFullYear() +
	    		'&filter_month=' + (actual.getMonth() + 1) +
	    		'&filter_day=' + actual.getDate();
		    }else{
		    	celaUrl = siteUrl + '?pagename=' + pagename + '&school=' + school + 
		    	'&filter_year=' + actual.getFullYear() +
	    		'&filter_month=' + (actual.getMonth() + 1) +
	    		'&filter_day=' + actual.getDate();
		    }
	    	var dateStr = actual.getFullYear() + '/' + (actual.getMonth() + 1).pad(2) + '/' + actual.getDate().pad(2);
		    a.href = 
		    cela.appendChild(a);

	            a.innerHTML = actual.getDate();
	            a.href = celaUrl;

	            if(actual.getMonth() !== data.getMonth())
	                cela.className = 'fora';

	            /* Si es avui el decorem */
	            if(new Date().getDate() == actual.getDate() &&
				       new Date().getMonth() == actual.getMonth() &&
				       new Date().getFullYear() == actual.getFullYear())
					cela.className = 'avui';

		    	if(typeof highlightDates != 'undefined'){
		    		try{
		    			var hl = $.parseJSON(highlightDates);
		    			if(_.contains(hl, dateStr)){
							$(a).addClass('highlight');
							console.log(dateStr);
		    			}

		    		}catch(e){}
		    	}
			    actual.setDate(actual.getDate()+1);
	            fila.appendChild(cela);
	        }

	        e.appendChild(fila);
	    }

	    setTimeout(function() {
	        e.className = 'actiu';
	        original.className +=
	        diff === 0 ? ' amagat-dreta' : ' amagat-esquerra';
	    }, 20);

	    original.className = 'inactiu';

	    setTimeout(function() {
	        var inactius = document.getElementsByClassName('inactiu');
	        for(var i = 0; i < inactius.length; i++)
	            widget.removeChild(inactius[i]);
	    }, 1000);



	}

	if($('#calendari').length){


		calendari(document.getElementById('calendari'), new Date());

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

	if($('.form').length){
		var wpcf7 = $('div[id^=wpcf7]');
		var form = $('.form form');
		$('button', form).unbind('click').on('click', function(e){
		  e.preventDefault();
		  e.stopPropagation();
		  $('input', form).each(function(i,d){
		    $('input[name='+d.name+']', wpcf7).val(d.value);
		  });
			$('.options input').each(function(i,d){
			  if(d.checked){
			    $('input[name='+d.name+']').val(d.value);
			  }
			});
		  $('textarea',form).each(function(i,d){
		    $('textarea[name='+d.name+']', wpcf7).val($(d).val());
		  });
		  $('.wpcf7-form').submit();
		});
	}
	if($('.filter-dropdown').length){
		$('.filter-dropdown li').on('click', function(){
			var postType = $('body').attr('data-archive-post-type');
			var pagename = $('body').attr('data-archive-pagename');
			var school = _.contains($('#dropdownSchool').val(),'全部') ? '' : $('#dropdownSchool').val();
			var year = _.contains($('#dropdownYear').val(),'全部') ? '' : $('#dropdownYear').val();
		    var siteUrl = $('h1 a').attr('href');
			if($('#dropdownSchool').val() && $('#dropdownYear').val()){
				// var url = siteUrl + '?pagename=' + $('body').attr('data-archive-pagename') + 
				// 	'&school=' + school + 
				// 	'&filter_year=' + year;
				// 	console.log(url);
				location.href = siteUrl + '?pagename=' + $('body').attr('data-archive-pagename') + 
					'&school=' + school + 
					'&filter_year=' + year;
			}
		});
	}
	
	$('.sidebar.newsgreen *.orange').removeClass('orange').addClass('newsgreen');

	$(window).trigger('resize');

	if($('footer .link ul').length){
		var minimum = 8;
		var slides = $('footer .link ul li').length;

		while((minimum-=slides)>0){
		  $('footer .link ul li').clone().appendTo($('footer .link ul'));
		}
		$('footer .link ul').slick({
			dots:false,
			arrows:false,
			infinite: true,
			slidesToShow: 4,
			slidesToScroll: 1,
			variableWidth: true,
			autoplaySpeed: 5000,
			autoplay: true,
			pauseOnHover: true,
			speed: 750,
			cssEase: 'ease-in-out'
		});

	}
	if($('.ib-crumb a[href*=category][href*=anounce]').length){
		$('.ib-crumb a[href*=category][href*=anounce]').attr('href',$('.ib-crumb a[href*=category][href*=anounce]').attr('href').replace(/\/category/ig,''));	
	}
});

