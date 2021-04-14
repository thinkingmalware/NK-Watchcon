jQuery(function($) {

	// GLOBAL

	// INIT

	scramble_number();
	effect_class();


	// ON LOAD

	// ON RESIZE


	// Scramble with tweenmax plugin

	function scramble_number() {

		$('.scramble_number').each(function() {

			var $this = $(this);
			var tl = new TimelineLite({paused:true});
			tl.from($this, 1.0, {scrambleText:{text:"0,000", chars:"0123456789",  ease:Power3.easeNone}})

			$this.waypoint(function() {
				tl.play();
				this.destroy();
			}, {
				offset: "95%"
			});

		});
	}


	//

	function effect_class() { 

		// 인사제도 Title

		$('.person h2.heading').each(function() {

			var $this = $(this);
			var tl = new TimelineLite({paused:true});
			TweenMax.set($this, {autoAlpha:0, y:50}); // avoid ie fouc
			tl.to($this, 1.4, motion_args({ autoAlpha:1, y:0, ease:Back.easeOut}));

			$this.waypoint(function() {
				tl.play();
				this.destroy();
			}, {
				offset: "90%"
			});

		});


		// 복리후생

		$('#benefit_box ul li').each(function(index) {

			var $this = $(this);
			var off_set = $this.attr('data-offset');
			var tl = new TimelineLite({paused:true, delay: index * .35});

			if(off_set == undefined) {
				off_set = '100%';
			}

			TweenMax.set($this, {css:{transformPerspective:400, transformStyle:"preserve-3d"}});
			tl.from($this, 1.6, {y:'40%', z: 40, rotationX:4,force3D:true, ease:Power3.easeOut});

			tl.from($this, 0.5, {autoAlpha:0, ease:Power3.easeOut},"-=1.6");

			$this.waypoint(function() {
				tl.play();
				this.destroy();
			}, {
				offset: off_set
			});

		});


		// 비전

		TweenMax.set('.vision_list li',{autoAlpha:0});

		$('.vision_list').waypoint(function() {
			$('.vision_list li').each(function(index) {

				var $this = $(this);
				TweenMax.set($this,{autoAlpha:0, y:30});
				
				var tl = new TimelineLite({delay: index * .35});
				tl.to($this, 1.8, {autoAlpha:1, y:0, ease:Back.easeOut})

			});

			this.destroy();
		}, {
			offset: "80%"
		});

	}

});
