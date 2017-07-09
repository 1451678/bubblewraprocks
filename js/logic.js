$(document).ready(function(){
	$(window).load(function() {
         $('.loader-wrapper').hide();
         $('.page-wrapper').show();
    });
	var app = {
		bubbleCount: 85,
		bubbleCounter: 0,
		counter: 0,
		audio: [],
		init: function() {
			app.loadBubbles();
			app.loadCounter();
			app.loadAudio();
			app.clickHandlers();
		},
		loadBubbles: function() {
			for(i = 0; i < app.bubbleCount; i ++) {
				$('.bubbles').append('<div class="bubble"></div>');
			}
		},
		loadCounter: function() {
			$.ajax({
				type: 'GET',
				url: 'counter/counter.json',
				dataType: 'JSON',
				cache: false,
				success: function (data) {
					app.counter = data.counter;
					app.updateCounter(data.counter);
				}
			});
        },
		loadAudio: function() {
			for(i = 1; i <= 3; i ++) {
				var audio = new Audio('audio/pop-' + i + '.mp3');				
				app.audio[i] = audio;
			}			
		},
		clickHandlers: function() {
			$('.bubble').on('click', function() {
				if (!($(this).hasClass('popped'))) {
					app.pop($(this));
					app.incCounters();
					if (app.bubbleCounter == app.bubbleCount) {
						$('.overlay').addClass('open');
					}
				}
			});
			$('.overlay').on('click', function(){
				$('.overlay').removeClass('open');
				$('.overlay').addClass('close');
			});
		},
		incCounters: function() {
			app.bubbleCounter++;
			app.counter++;
			app.updateCounter(app.counter);
			 $.post('counter/counter.php', {ajax: true});
		},
		updateCounter: function(count) {
			$('.counter-numbers').html(count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));			
		},
		pop: function(bubble) {
			bubble.addClass('popped');
			var randomNumber = Math.floor(Math.random() * 3) + 1;
			app.audio[randomNumber].play();
		}
	};
	app.init();
});
