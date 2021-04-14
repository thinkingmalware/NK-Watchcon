/**
 * Main theme Javascript - (c) Greg Priday, freely distributable under the terms of the GPL 2.0 license.
*/

jQuery(function($) {
	
	// GLOBAL


	// INIT

	smooth_scroll();
	scroll_top();

	navi();
	sticky();

	nav_open();
	nav_toggle();

	// motion_with_class();
	subpage_title_motion();

	faq();


	// ON LOAD

    $(window).load(function() {
	    
		$('body').addClass('load');
		
	});


	// ON RESIZE



	// 부드러운 페이지 스크롤

	function smooth_scroll() {

		var $window = $(window);
		var scrollTime = 1;
		var scrollDistance = $window.height() / 2.5;

		$window.on('mousewheel DOMMouseScroll', function(event) {

			event.preventDefault ? event.preventDefault() : event.returnValue = false;

			var delta = event.originalEvent.wheelDelta/120 || -event.originalEvent.detail/3;
			var scrollTop = $window.scrollTop();
			var finalScroll = scrollTop - parseInt(delta*scrollDistance);

			TweenMax.to($window, scrollTime, {
			
				scrollTo : { y: finalScroll, autoKill:true },
				ease: Power1.easeOut,
				overwrite: 5							
				
			});

		});

	}


	// TOP으로 가기

	function scroll_top() {

		if( !$('body').hasClass('mobile-device') || $('nav.site-navigation.primary').hasClass('mobile-navigation') ) {

			$(window).scroll( function() {
				if($(window).scrollTop() > 150) {
					$('#scroll_to_top').addClass('displayed');
				} else {
					$('#scroll_to_top').removeClass('displayed');
				}
			});

			$('#scroll_to_top').on('click', function() {
				$('html, body').animate( { scrollTop: '0px' } );
				return false;
			});

		}

	}


    // 네비

	function navi() {

		$('#masthead').on('mouseenter focusin', '.main-navigation ul li', function() {
				
			var $$ = $(this);
			var $ul = $$.find('> ul');
				
			$ul.css({
		 
				'display' : 'block',
				'opacity' : 0
			
			}).clearQueue().animate({opacity: 1}, 250);
				
			$ul.data('final-opacity', 1);
		 
		 }).on('mouseleave focusout', '.main-navigation ul li', function() {

			var $$ = $(this);
			var $ul = $$.find('> ul');
				
			$ul.clearQueue().animate( {opacity: 0}, 250, function() {
			
				if( $ul.data('final-opacity') == 0 ) {
					$ul.css('display', 'none');
				}
				
			});
				
			$ul.data('final-opacity', 0);
			
		});

	}

    
	// 스티커 메뉴

	function sticky() {
    
		if( ($('nav.site-navigation.primary').hasClass('use-sticky-menu') && !$('body').hasClass('mobile-device')) || ($('body').hasClass('mobile-device') && $('nav.site-navigation.primary').hasClass('mobile-navigation')) ) {
			
			// wpadminbar

			var adminBarHeight = $('body').hasClass('admin-bar') ? $('#wpadminbar').outerHeight() : 0;
			var $mc = null;
			var resetStickyMenu = function() {
			
				var $$ = $('nav.site-navigation.primary');

				if( $$.position().top <= $(window).scrollTop() + adminBarHeight ) { // 현재 위치
					if( $mc == null ) {
						$mc = $$;
						$$ = $$.clone().insertBefore($$);

						$mc.css({
							'position' : 'fixed',
							'top' : adminBarHeight,
							'left' : $$.position().left,
							'z-index' : 999,
							'width' : $$.outerWidth()					
						}).addClass('sticky').insertAfter($$);
					} else {
						$mc.css({
							'width' : $$.outerWidth(),
							'left' : $$.position().left
						});
					}
				} else {
					if( $mc !== null ) {
						$mc.remove();
						$mc = null;
					}
				}
			}
		   
			$(window).scroll( resetStickyMenu ).resize( resetStickyMenu );
			resetStickyMenu();
		}

	}


	// 모바일 메뉴

	function nav_open() {

		$('.sub_menu > li > .mobile_item > .txt').unwrap(); // 부모 태그 제거
		$('.sub_menu > li > .txt > a').unwrap();
		$('.sub_menu > li > .icon').remove(); // 태그 삭제

		var electron = 0; // 초기값

		$('.mobile_selector').on('click', function() {
		
			if(electron == 0) {

				$(this).parent().addClass('on');
				$(this).next().stop().slideDown(300);
				$(this).find('.icon').find('img').attr({
					// src: $(this).find('.icon').find('img').attr('src').replace('.png', '_on.png'),
					alt: '열림'
				});

				electron = 1;

			} else {

				$(this).parent().removeClass('on');
				$(this).next().stop().slideUp(300);
				$(this).find('.icon').find('img').attr({
					// src: $(this).find('.icon').find('img').attr('src').replace('_on.png', '.png'),
					alt: '닫힘'
				});

				electron = 0;

			}

		});

	}


	//

	function nav_toggle() {

		var part = -1;

		$('#mobile_menu > li').each( function(q) {

			$(this).find('.mobile_item').on('click', function() {
			
				if(q != part) {

					$('#mobile_menu > li').eq(part).removeClass('on');
					$('#mobile_menu > li').eq(part).find('.mobile_item').next().stop().slideUp(300);
					$('#mobile_menu > li').eq(part).find('.mobile_item').find('.icon').find('img').attr({

						src: $('#mobile_menu > li').eq(part).find('.mobile_item').find('.icon').find('img').attr('src').replace('_on.png', '.png'),
						alt: '닫힘'

					});

					part = q;

					$(this).parent().addClass('on');
					$(this).next().stop().slideDown(300);
					$(this).find('.icon').find('img').attr({

						src: $(this).find('.icon').find('img').attr('src').replace('.png', '_on.png'),
						alt: '열림'

					});

				} else {

					$('#mobile_menu > li').eq(part).removeClass('on');
					$('#mobile_menu > li').eq(part).find('.mobile_item').next().stop().slideUp(300);
					$('#mobile_menu > li').eq(part).find('.mobile_item').find('.icon').find('img').attr({

						src: $('#mobile_menu > li').eq(part).find('.mobile_item').find('.icon').find('img').attr('src').replace('_on.png', '.png'),
						alt: '닫힘'

					});

					part = -1;
				
				}

			});

		});

	}


	//

    if( $('body').hasClass('home') ) {

		// VISUAL

		$('.main_lolling').bxSlider({
			auto: true,
			autoControls: true,
			mode: 'fade'
		});

		// 태그 제거

		$( '#visual .bx-controls-direction' ).remove();

	}

	
	// 검색

	$('#searchsubmit').on('click', function(event) {
		
		var usersearch = $('#s').val();

		if( !$.trim( usersearch ) ) {

			alert( '검색어를 입력해주세요' );

			$('#s').focus();

			event.preventDefault ? event.preventDefault() : event.returnValue = false;

			return;

		} 

	});


	// 햄버거메뉴 제어

	$("#headerGnb, #closeGnb").on('click', function(e) {
		e.preventDefault();

		var gnbStatus = $("#allMenuGnb").attr("data-allgnb");
		var scrHight = $(window).height();
		var re_height = $(window).height() - $(".gnbtop").outerHeight() - "50";
		if(gnbStatus === "close"){
			
			$("body").css("height", +scrHight+ "px").addClass("overhd");
			$("#allMenuGnb").attr("data-allgnb","open");
			$("#allMenuGnb").bPopup({
				modalClose: true,
				speed: 250,
				position: [0, 0],
				positionStyle: 'fixed',
				transition: 'slideIn',
				transitionClose: 'slideIn',
				onClose: function(){
					$("body").css({"height": "auto"}).removeClass("overhd");
					$("#allMenuGnb").attr("data-allgnb","close");
				}
			});
			$("#allMenuGnb .allmenu_scrollwrap").css({"height":re_height});
		} else {
			$("body").css({"height": "auto"}).removeClass("overhd");
			$("#allMenuGnb").attr("data-allgnb","close");
		}
	});


	//

	$(window).resize(function(argument) {
		var re_height =$(window).height() - $(".gnbtop").outerHeight() - "50";
		$("#allMenuGnb .allmenu_scrollwrap").css({"height":re_height});
	});


	//

	$("#allMenuGnb .depth1 > li > a").on('click',function(e){
		if($(this).closest(".depth1 li").hasClass("active") === false){
			$("#allMenuGnb .depth1 li").removeClass("active");
			$(this).closest(".depth1 li").addClass("active");
		} else {
			$("#allMenuGnb .depth1 li").removeClass("active");
		}
	});


	//

	// $('.depth1 > li > a').attr("href","javascript:");
	$('.depth2 li a i').remove();

	$('.depth1 > li:nth-child(1)').addClass("depth_hd");
	$('.depth1 > li:nth-child(2)').addClass("depth_ns");
	$('.depth1 > li:nth-child(3)').addClass("depth_cc");
	$('.depth1 > li:nth-child(4)').addClass("depth_dc");


	// 슬라이더
	
    var $slider = $('#main_visual_slider');

    if( !$slider.length ){ return; }

    // pre init
    $(document).on('cycle-pre-initialize', $slider, function( event, opts ){

        if($(event.target).hasClass('main_visual_slider')) {
            // init motion
            slide_motion($slider.find('.main_visual_item:eq(0)')[0], true);
        }

    });

	// Run cycle
	$slider.cycle({
        slides          : '> div',
        timeout         : 5000,
		speed           : 1000,
        swipe           : true,
		log			    : false,
		prev            : '#main_visual_control .cycle_prev',
		next            : '#main_visual_control .cycle_next',
        caption         : "#main_visual_caption",
        captionTemplate : "<span class='main_caption_text current'>{{slideNum}}</span><span class='main_caption_text slug'>/</span><span class='main_caption_text total'>{{slideCount}}</span>"
	});

    // cycle-before
    $slider.on( 'cycle-before', function(event, opts, currEl, nextEl, fwdFlag) {
        slide_motion(nextEl, false);
    })

    // motion
    function slide_motion(el, flag) {

        var $el_txt = $(el).find('.main_visual_content');
        var y_pos = 50;

        if(flag) {
            TweenMax.set('.main_visual_content', {autoAlpha:1});
        }

        TweenMax.fromTo($el_txt.find('h2'), 1.5, {y:y_pos, autoAlpha:0}, {y:0, autoAlpha:1, force3D:true, ease:Power0.easeOut});
        TweenMax.fromTo($el_txt.find('p'), 1.5, {y:y_pos, autoAlpha:0}, {y:0, autoAlpha:1, force3D:true, ease:Power0.easeOut, delay:0.3});
        TweenMax.fromTo($el_txt.find('a'), 1.5, {y:y_pos, autoAlpha:0}, {y:0, autoAlpha:1, force3D:true, ease:Power0.easeOut, delay:0.5});

    }


    var $slider = $('.main_sellers_slider');
    var $img_slider = $('.main_sellers_img_slider');
    var $txt_slider = $('.main_sellers_txt_slider');

    if( !$slider.length ){ return; }

    $slider.cycle({
        slides          : '> div',
        timeout         : 4000,
		speed           : 600,
        log			    : false,
        prev            : '#main_sellers_control .cycle_prev',
        next            : '#main_sellers_control .cycle_next',
        swipe           : false
    });

    // cycle-before
    $txt_slider.on('cycle-before', function(event, opts, currEl, nextEl, fwdFlag)  {

        var $current_el = $(currEl).find('.main_sellers_txt'),
            $next_el = $(nextEl).find('.main_sellers_txt');

        TweenMax.fromTo($current_el, .5, {autoAlpha:1}, {autoAlpha:0, force3D:true, ease:Sine.easeNone});
        TweenMax.staggerFromTo($next_el.children(), 1.2, {y:30, autoAlpha:0}, {y:0, autoAlpha:1, force3D:true, ease:Power1.easeOut, delay:0.4, onStart: function() {TweenMax.set($next_el, {autoAlpha:1})}}, 0.1);

    });

    // Pause on mouseover
	$('.main_sellers_txt').hover(function() {
	    $slider.cycle('pause');
	}, function(){
        $slider.cycle('resume');
	});


	// Pause on mouseover
	$('.main_visual .jt_btn').hover(function() {
	    $slider.cycle('pause');
	}, function(){
        $slider.cycle('resume');
	});


	// WAYPOINT

	function motion_with_class() {

		// Title (h2 h3 ...)
		/* $(".link1, .link2, .link3, .main_sellers_txt_slider").each(function() { */

			var $this = $(this);
			var $link1 = $(".link1");
			var $link2 = $(".link2");
			var $link3 = $(".link3");
			var $main_sellers_txt_slide = $(".main_sellers_container");
			
			var tl = new TimelineLite({paused:true});
			TweenMax.set(".link1", {autoAlpha:0, y:50});
			TweenMax.set(".link2", {autoAlpha:0, y:50}); 
			TweenMax.set(".link3", {autoAlpha:0, y:50}); 
			TweenMax.set(".main_sellers_container", {autoAlpha:0, y:50}); 

			// 순차적으로 재생

			tl.to(".link1", 0.8, {autoAlpha:1, y:0, ease:Back.easeOut})
			.to(".main_sellers_container", 0.8, {autoAlpha:1, y:0, ease:Back.easeOut})
			.to(".link2", 0.8, {autoAlpha:1, y:0, ease:Back.easeOut})
			.to(".link3", 0.8, {autoAlpha:1, y:0, ease:Back.easeOut});
			
			$('.bx_container').waypoint(function() {
				tl.play();
				this.destroy();
			}, {
				offset: "100%"
			});

		/* }); */

	}


	//

	function subpage_title_motion() {

		if( !$('body').hasClass('home') ) {

			var tl = new TimelineLite({delay:0.5});

			if($('.article_title').length > 0 ) {
				var title = new SplitText($('.article_title'), {type:"chars"});
				var title_chars = title.chars;

				tl.staggerFrom(title_chars, 1.2, motion_args({force3D:true, autoAlpha:0, y:10, ease:Back.easeOut,onComplete:function() {
						$('.article_title').addClass('completed');
					}
				}), 0.02, "+=0")
			}

			if($('.article_sub_title').length > 0 ) {
				var subtitle = new SplitText($('.article_sub_title'), {type:"chars"});
				var subtitle_chars = subtitle.chars;
				
				tl.staggerFrom(subtitle_chars, 1.8, motion_args({force3D:true, autoAlpha:0, y:-10, ease:Power3.easeOut}), 0.05, "-=1.2")
			}

			if($('.article_desc').length > 0 ) {
				var $desc = $('.article_desc');
				var desc_txt_original = $desc.html();
				var desc = new SplitText($desc, {type:"lines"});
				var desc_lines = desc.lines;
				
				tl.staggerFrom(desc_lines, 2.5, motion_args({force3D:true, autoAlpha:0, y:10, ease:Power3.easeOut, onComplete : function() {
				   $desc.html(desc_txt_original);
				}}), 0.05, "-=1.8");
			}

		}

	}


	// FAQ

	function faq() {

		var faq = -1; // 초기값

		$('#faq > li').each( function(q) {
			
			$(this).find('.faq_list').on('click', function() {
			
				if(faq == -1) {
					
					$(this).parent().addClass('on');

					$(this).next().stop().slideDown(300, function() {
						$('html, body').stop().animate({scrollTop:$(this).parent().offset().top}, 600);
					});
					
					faq = q;
				
				} else {
				
					if(q != faq) {
					
						$('#faq > li').eq(faq).removeClass('on');
						$('#faq > li').eq(faq).find('.faq_list').next().stop().slideUp(300);

						faq = q;
						
						$(this).parent().addClass('on');
			
						$(this).next().stop(true, true).slideDown(300, function() {
							$('html, body').stop().animate({scrollTop:$(this).parent().offset().top}, 600);
						});
					
					} else { 
						
						$('#faq > li').eq(faq).removeClass('on');
						$('#faq > li').eq(faq).find('.faq_list').next().stop().slideUp(300);

						faq = -1;
					
					}
			
				}

			});

		});

	}

});

// Debug ie not smoothy text motion

function motion_args(args) {

	args.rotation = 0.1;
	return args

}
